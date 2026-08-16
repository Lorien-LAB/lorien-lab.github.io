function requireObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

function requireNonEmptyString(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
}

function flattenValidated(taxonomy) {
  requireObject(taxonomy, 'Topic taxonomy');
  if (!Array.isArray(taxonomy.topics) || taxonomy.topics.length === 0) {
    throw new Error('Topic taxonomy requires a non-empty topics array.');
  }

  const ids = new Set();
  const seenObjects = new WeakSet();
  const records = [];

  const visitSiblings = (nodes, parentId) => {
    if (!Array.isArray(nodes)) throw new Error('Topic children must be an array.');
    const siblingOrders = new Set();

    for (const node of nodes) {
      requireObject(node, 'Topic node');
      if (seenObjects.has(node)) throw new Error(`Topic object reused or cyclic near ${node.id ?? '<unknown>'}.`);
      seenObjects.add(node);

      requireNonEmptyString(node.id, 'Topic id');
      requireNonEmptyString(node.title, `Topic ${node.id} title`);
      if (!Number.isInteger(node.order) || node.order < 1) {
        throw new Error(`Topic ${node.id} requires a positive integer order.`);
      }
      if (ids.has(node.id)) throw new Error(`Duplicate topic id: ${node.id}`);
      if (siblingOrders.has(node.order)) throw new Error(`Duplicate sibling topic order ${node.order} under ${parentId ?? 'root'}.`);
      ids.add(node.id);
      siblingOrders.add(node.order);
      records.push({ id: node.id, title: node.title, order: node.order, parentId });

      if (node.children !== undefined) {
        if (!Array.isArray(node.children)) throw new Error(`Topic ${node.id} children must be an array.`);
        visitSiblings(node.children, node.id);
      }
    }
  };

  visitSiblings(taxonomy.topics, null);
  return records;
}

function flattenTocSections(toc) {
  requireObject(toc, 'Source TOC');
  if (!Array.isArray(toc.sections)) throw new Error('Source TOC requires sections.');
  const records = [];
  const ids = new Set();
  const visit = (nodes) => {
    for (const node of nodes) {
      requireObject(node, 'Source TOC node');
      requireNonEmptyString(node.id, 'Source TOC node id');
      if (ids.has(node.id)) throw new Error(`Duplicate source TOC section id: ${node.id}`);
      ids.add(node.id);
      records.push(node);
      if (node.children !== undefined) {
        if (!Array.isArray(node.children)) throw new Error(`Source TOC node ${node.id} children must be an array.`);
        visit(node.children);
      }
    }
  };
  visit(toc.sections);
  return records;
}

export function validateTopicTaxonomy(taxonomy) {
  flattenValidated(taxonomy);
  return true;
}

export function flattenTopics(taxonomy) {
  return flattenValidated(taxonomy);
}

export function getTopicById(taxonomy, id) {
  return flattenValidated(taxonomy).find((topic) => topic.id === id);
}

export function validateSourceTopicMap(map, taxonomy, tocBySource) {
  requireObject(map, 'Source-topic map');
  if (!Array.isArray(map.entries)) throw new Error('Source-topic map requires an entries array.');
  requireObject(tocBySource, 'TOC registry');

  const topicIds = new Set(flattenValidated(taxonomy).map((topic) => topic.id));
  const sourceIds = new Set(Object.keys(tocBySource));
  const expectedKeys = new Set();
  const sectionIdsBySource = new Map();

  for (const [source, toc] of Object.entries(tocBySource)) {
    const ids = new Set(flattenTocSections(toc).map((node) => node.id));
    sectionIdsBySource.set(source, ids);
    for (const id of ids) expectedKeys.add(`${source}::${id}`);
  }

  const seen = new Set();
  const allowedRoles = new Set(['content', 'container', 'non-content']);
  for (const entry of map.entries) {
    requireObject(entry, 'Source-topic map entry');
    requireNonEmptyString(entry.source, 'Source-topic map source');
    requireNonEmptyString(entry.sourceSection, 'Source-topic map sourceSection');
    if (!sourceIds.has(entry.source)) throw new Error(`Unknown source in source-topic map: ${entry.source}`);
    if (!sectionIdsBySource.get(entry.source)?.has(entry.sourceSection)) {
      throw new Error(`Unknown source section in source-topic map: ${entry.source}::${entry.sourceSection}`);
    }
    const key = `${entry.source}::${entry.sourceSection}`;
    if (seen.has(key)) throw new Error(`Duplicate source-topic map entry: ${key}`);
    seen.add(key);

    if (!allowedRoles.has(entry.role)) throw new Error(`Invalid source-topic role at ${key}: ${entry.role}`);
    if (!Array.isArray(entry.canonicalTopics)) throw new Error(`canonicalTopics must be an array at ${key}`);
    if (entry.role === 'content' && entry.canonicalTopics.length === 0) {
      throw new Error(`Content source-topic entry requires canonical topics: ${key}`);
    }
    if (entry.role !== 'content' && entry.canonicalTopics.length !== 0) {
      throw new Error(`Container/non-content source-topic entry must not have canonical topics: ${key}`);
    }
    for (const topic of entry.canonicalTopics) {
      if (!topicIds.has(topic)) throw new Error(`Unknown canonical topic ${topic} at ${key}`);
    }
  }

  const missing = [...expectedKeys].filter((key) => !seen.has(key));
  if (missing.length) throw new Error(`Source-topic map is missing TOC nodes: ${missing.join(', ')}`);
  const extra = [...seen].filter((key) => !expectedKeys.has(key));
  if (extra.length) throw new Error(`Source-topic map contains unexpected nodes: ${extra.join(', ')}`);
  return true;
}
