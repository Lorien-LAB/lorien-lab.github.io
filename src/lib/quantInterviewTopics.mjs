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
