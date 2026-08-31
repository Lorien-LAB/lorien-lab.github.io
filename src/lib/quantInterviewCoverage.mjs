import { flattenTopics } from './quantInterviewTopics.mjs';

const STATES = new Set([
  'pending',
  'needs-review',
  'canonical-problem',
  'merged-duplicate',
  'variant',
  'knowledge-only',
  'interview-guidance',
  'non-content-frontmatter',
]);
const PROBLEM_STATES = new Set(['canonical-problem', 'merged-duplicate', 'variant']);

function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object.`);
}

function requireNonEmptyString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string.`);
}

function topicFallsUnderMappedBranch(topicId, mappedTopics, topicById) {
  let current = topicById.get(topicId);
  while (current) {
    if (mappedTopics.has(current.id)) return true;
    current = current.parentId ? topicById.get(current.parentId) : null;
  }
  return false;
}

export function validateCoverageLedger(ledger, context) {
  requireObject(ledger, 'Coverage ledger');
  requireObject(context, 'Coverage context');
  requireNonEmptyString(ledger.source, 'Coverage ledger source');
  if (!Array.isArray(ledger.entries)) throw new Error('Coverage ledger requires an entries array.');
  if (!context.sourceTopicMap || !Array.isArray(context.sourceTopicMap.entries)) throw new Error('Coverage context requires sourceTopicMap.');

  const flatTopics = flattenTopics(context.taxonomy);
  const topicIds = new Set(flatTopics.map((topic) => topic.id));
  const topicById = new Map(flatTopics.map((topic) => [topic.id, topic]));
  const mapEntries = context.sourceTopicMap.entries.filter((entry) => entry.source === ledger.source);
  if (mapEntries.length === 0) throw new Error(`Coverage ledger source has no source-topic mappings: ${ledger.source}`);
  const mapBySection = new Map(mapEntries.map((entry) => [entry.sourceSection, entry]));
  const seen = new Set();
  const problemSlugs = context.problemSlugs instanceof Set ? context.problemSlugs : new Set(context.problemSlugs ?? []);
  const knowledgeSlugs = context.knowledgeSlugs instanceof Set ? context.knowledgeSlugs : new Set(context.knowledgeSlugs ?? []);
  const allowUnresolved = context.allowUnresolvedCanonicalRefs === true;

  for (const entry of ledger.entries) {
    requireObject(entry, 'Coverage entry');
    requireNonEmptyString(entry.sourceSection, 'Coverage sourceSection');
    if (entry.sourceItem !== null && (typeof entry.sourceItem !== 'string' || !entry.sourceItem.trim())) {
      throw new Error(`Coverage sourceItem must be null or a non-empty string at ${entry.sourceSection}.`);
    }
    const key = `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
    if (seen.has(key)) throw new Error(`Duplicate coverage key: ${key}`);
    seen.add(key);

    const mapEntry = mapBySection.get(entry.sourceSection);
    if (!mapEntry) throw new Error(`Coverage section has no source-topic mapping: ${entry.sourceSection}`);
    if (!Array.isArray(entry.canonicalTopics)) throw new Error(`Coverage canonicalTopics must be an array at ${key}`);
    const mappedTopics = new Set(mapEntry.canonicalTopics);
    let requiresTopicOverride = false;
    for (const topic of entry.canonicalTopics) {
      if (!topicIds.has(topic)) throw new Error(`Unknown canonical topic ${topic} at ${key}`);
      const isAllowed = entry.sourceItem === null
        ? mappedTopics.has(topic)
        : topicFallsUnderMappedBranch(topic, mappedTopics, topicById);
      if (!isAllowed) requiresTopicOverride = true;
    }
    if (entry.sourceItem !== null && requiresTopicOverride) {
      if (typeof entry.topicOverrideReason !== 'string' || !entry.topicOverrideReason.trim()) {
        throw new Error(`Coverage item-level topic override requires a topic override reason at ${key}.`);
      }
    }
    if (entry.sourceItem === null) {
      const mapped = [...mapEntry.canonicalTopics].sort();
      const covered = [...entry.canonicalTopics].sort();
      if (JSON.stringify(mapped) !== JSON.stringify(covered)) {
        if (typeof entry.topicOverrideReason !== 'string' || !entry.topicOverrideReason.trim()) {
          throw new Error(`Coverage section-level topic override requires a topic override reason at ${key}.`);
        }
      }
    }

    if (!STATES.has(entry.state)) throw new Error(`Invalid coverage state at ${key}: ${entry.state}`);
    if (!Array.isArray(entry.canonicalProblems) || !Array.isArray(entry.canonicalKnowledge)) {
      throw new Error(`Coverage canonical targets must be arrays at ${key}.`);
    }
    if (PROBLEM_STATES.has(entry.state) && entry.canonicalProblems.length === 0) {
      throw new Error(`Coverage state ${entry.state} requires a canonical problem target at ${key}.`);
    }
    if (entry.state === 'knowledge-only' && entry.canonicalKnowledge.length === 0) {
      throw new Error(`Coverage state knowledge-only requires a canonical knowledge target at ${key}.`);
    }
    if (!allowUnresolved) {
      for (const slug of entry.canonicalProblems) {
        if (!problemSlugs.has(slug)) throw new Error(`Unresolved canonical problem ${slug} at ${key}`);
      }
      for (const slug of entry.canonicalKnowledge) {
        if (!knowledgeSlugs.has(slug)) throw new Error(`Unresolved canonical knowledge ${slug} at ${key}`);
      }
    }
  }

  return true;
}
