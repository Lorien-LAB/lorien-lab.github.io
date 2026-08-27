import { flattenTopics } from './quantInterviewTopics.mjs';

export const SOURCE_ORDER = Object.freeze([
  'green-book',
  'red-book',
  '150-most-frequently-asked',
]);

export const TERMINAL_STATES = new Set([
  'canonical-problem',
  'merged-duplicate',
  'variant',
  'knowledge-only',
  'interview-guidance',
  'non-content-frontmatter',
  'non-content-backmatter',
]);

const STATES = new Set(['pending', ...TERMINAL_STATES]);
const PROBLEM_STATES = new Set(['canonical-problem', 'merged-duplicate', 'variant']);
const ITEM_KINDS = new Set(['question', 'guidance', 'theory', 'non-content']);
const NODE_KINDS = new Set(['topic', 'source-section', 'source-subsection']);
const SORT_KEY = /^\d{2}\.\d{2}\|0[1-3]\|\d{4}\|.+$/;

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function validateRanges(ranges, label) {
  if (!Array.isArray(ranges)) throw new Error(`${label} must be an array.`);
  let previousEnd = 0;
  for (const range of ranges) {
    if (!Number.isInteger(range?.startPage)
      || !Number.isInteger(range?.endPage)
      || range.startPage < 1
      || range.endPage < range.startPage) {
      throw new Error(`${label} contains an invalid page range.`);
    }
    if (range.startPage <= previousEnd) {
      throw new Error(`${label} page ranges overlap or are unsorted.`);
    }
    previousEnd = range.endPage;
  }
}

export function makeMasterItemKey(record) {
  const unit = record.sourceItem ?? (record.kind === 'question' ? 'question' : record.kind);
  return `${record.source}::${record.sourceSection}::${unit}`;
}

export function compareMasterItems(left, right) {
  return left.sortKey.localeCompare(right.sortKey);
}

export function sortMasterItems(items = []) {
  return [...items].sort(compareMasterItems);
}

export function getNextPendingItem(directory) {
  return sortMasterItems(directory?.items).find((item) => item.state === 'pending') ?? null;
}

export function validateMasterDirectory(directory, context) {
  requireObject(directory, 'Master directory');
  requireObject(context, 'Master directory context');
  if (directory.version !== 1) throw new Error('Master directory version must be 1.');
  if (JSON.stringify(directory.sourceOrder) !== JSON.stringify(SOURCE_ORDER)) {
    throw new Error('Master sourceOrder is not canonical.');
  }
  if (!Array.isArray(directory.nodes) || !Array.isArray(directory.items)) {
    throw new Error('Master directory requires nodes and items arrays.');
  }

  const topics = flattenTopics(context.taxonomy);
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const nodeIds = new Set();

  for (const node of directory.nodes) {
    requireObject(node, 'Master node');
    requireString(node.id, 'Master node id');
    requireString(node.title, `Master node ${node.id} title`);
    if (nodeIds.has(node.id)) throw new Error(`Duplicate master node id: ${node.id}`);
    nodeIds.add(node.id);
    if (!NODE_KINDS.has(node.kind)) throw new Error(`Invalid master node kind: ${node.kind}`);
    if (!Number.isInteger(node.order) || node.order < 1) {
      throw new Error(`Invalid master node order: ${node.id}`);
    }
    if (node.parentId !== null
      && !directory.nodes.some((candidate) => candidate.id === node.parentId)) {
      throw new Error(`Missing master parent node: ${node.parentId}`);
    }
    if (node.canonicalTopic && !topicById.has(node.canonicalTopic)) {
      throw new Error(`Unknown master node topic: ${node.canonicalTopic}`);
    }
  }

  const canonicalTopicNodes = directory.nodes
    .filter((node) => node.kind === 'topic')
    .map((node) => node.canonicalTopic);
  if (JSON.stringify(canonicalTopicNodes) !== JSON.stringify(topics.map(({ id }) => id))) {
    throw new Error('Master topic nodes must exactly match canonical taxonomy order.');
  }

  const keys = new Set();
  const sortKeys = new Set();
  for (const item of directory.items) {
    requireObject(item, 'Master item');
    requireString(item.key, 'Master item key');
    if (keys.has(item.key)) throw new Error(`Duplicate master item key: ${item.key}`);
    keys.add(item.key);
    if (item.key !== makeMasterItemKey(item)) throw new Error(`Stable key mismatch: ${item.key}`);
    if (!ITEM_KINDS.has(item.kind)) throw new Error(`Invalid master item kind at ${item.key}`);
    if (!context.sourceIds.has(item.source)) throw new Error(`Unknown master source at ${item.key}`);
    requireString(item.sourceSection, `Master sourceSection at ${item.key}`);
    if (item.sourceItem !== null
      && (typeof item.sourceItem !== 'string' || !item.sourceItem.trim())) {
      throw new Error(`Master sourceItem must be null or a non-empty string at ${item.key}`);
    }
    if (!context.sourceSections.get(item.source)?.has(item.sourceSection)) {
      throw new Error(`Unknown master source section at ${item.key}`);
    }
    validateRanges(item.questionPages, `${item.key} questionPages`);
    validateRanges(item.solutionPages, `${item.key} solutionPages`);
    if (item.kind !== 'non-content' && item.questionPages.length === 0) {
      throw new Error(`Reviewable master item requires questionPages at ${item.key}`);
    }
    const isNonContent = item.kind === 'non-content';
    if (isNonContent) {
      if (item.primaryTopic !== null
        || !Array.isArray(item.canonicalTopics)
        || item.canonicalTopics.length !== 0) {
        throw new Error(`Non-content master item must have no canonical topic at ${item.key}`);
      }
    } else {
      if (!topicById.has(item.primaryTopic)) throw new Error(`Unknown primaryTopic at ${item.key}`);
      if (!Array.isArray(item.canonicalTopics)
        || !item.canonicalTopics.includes(item.primaryTopic)) {
        throw new Error(`primaryTopic must be present in canonicalTopics at ${item.key}`);
      }
      for (const topicId of item.canonicalTopics) {
        if (!topicById.has(topicId)) throw new Error(`Unknown canonical topic ${topicId} at ${item.key}`);
      }
    }
    if (!SORT_KEY.test(item.sortKey) || sortKeys.has(item.sortKey)) {
      throw new Error(`Invalid or duplicate sortKey at ${item.key}`);
    }
    sortKeys.add(item.sortKey);

    const [topicRank, sourceRank] = item.sortKey.split('|');
    const topic = topicById.get(item.primaryTopic);
    let root = topic;
    while (root?.parentId) root = topicById.get(root.parentId);
    const expectedTopicRank = isNonContent
      ? '99.99'
      : `${String(root.order).padStart(2, '0')}.${String(topic.order).padStart(2, '0')}`;
    const expectedSourceRank = String(SOURCE_ORDER.indexOf(item.source) + 1).padStart(2, '0');
    if (topicRank !== expectedTopicRank) {
      throw new Error(`sortKey topic rank mismatch at ${item.key}`);
    }
    if (sourceRank !== expectedSourceRank) {
      throw new Error(`sortKey source rank mismatch at ${item.key}`);
    }

    if (!STATES.has(item.state)) throw new Error(`Invalid master state at ${item.key}`);
    if (!Array.isArray(item.canonicalProblems) || !Array.isArray(item.canonicalKnowledge)) {
      throw new Error(`Canonical targets must be arrays at ${item.key}`);
    }
    if (item.state === 'pending'
      && (item.canonicalProblems.length
        || item.canonicalKnowledge.length
        || item.workstream !== null
        || item.resolutionNote !== null)) {
      throw new Error(`Pending record contains completion claims at ${item.key}`);
    }
    if (TERMINAL_STATES.has(item.state)
      && (typeof item.resolutionNote !== 'string' || !item.resolutionNote.trim())) {
      throw new Error(`Terminal resolutionNote is required at ${item.key}`);
    }
    if (PROBLEM_STATES.has(item.state) && item.canonicalProblems.length === 0) {
      throw new Error(`Problem state requires canonical Problem at ${item.key}`);
    }
    if (item.state === 'knowledge-only' && item.canonicalKnowledge.length === 0) {
      throw new Error(`Knowledge-only state requires canonical Knowledge at ${item.key}`);
    }
    if (['interview-guidance', 'non-content-frontmatter', 'non-content-backmatter'].includes(item.state)
      && (item.canonicalProblems.length || item.canonicalKnowledge.length)) {
      throw new Error(`Non-public state has canonical targets at ${item.key}`);
    }
    for (const slug of item.canonicalProblems) {
      if (!context.problemSlugs.has(slug)) {
        throw new Error(`Unresolved canonical Problem ${slug} at ${item.key}`);
      }
    }
    for (const slug of item.canonicalKnowledge) {
      if (!context.knowledgeSlugs.has(slug)) {
        throw new Error(`Unresolved canonical Knowledge ${slug} at ${item.key}`);
      }
    }
    if (item.workstream !== null && !context.workstreamIds.has(item.workstream)) {
      throw new Error(`Unknown workstream ${item.workstream} at ${item.key}`);
    }
  }

  const ordered = sortMasterItems(directory.items);
  if (ordered.some((item, index) => item !== directory.items[index])) {
    throw new Error('Master items are not stored in canonical order.');
  }
  return true;
}

export function validateSequentialScope(directory, itemKeys) {
  if (!Array.isArray(itemKeys) || itemKeys.length === 0) {
    throw new Error('Sequential scope requires at least one item key.');
  }
  const ordered = sortMasterItems(directory?.items);
  const firstPending = ordered.findIndex((item) => item.state === 'pending');
  if (firstPending < 0) {
    throw new Error('Sequential scope cannot start because no pending item exists.');
  }
  if (itemKeys[0] !== ordered[firstPending].key) {
    throw new Error(`Sequential scope must start at first pending ${ordered[firstPending].key}.`);
  }
  const scoped = ordered.slice(firstPending, firstPending + itemKeys.length);
  if (scoped.some((item) => item.state !== 'pending')) {
    throw new Error('Sequential scope cannot include a terminal master record.');
  }
  if (JSON.stringify(itemKeys) !== JSON.stringify(scoped.map(({ key }) => key))) {
    throw new Error('Sequential scope item keys must be consecutive.');
  }
  return true;
}
