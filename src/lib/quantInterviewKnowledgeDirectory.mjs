const URL_SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** @param {object} taxonomy */
export function flattenTaxonomy(taxonomy) {
  const flat = [];
  const visit = (nodes, parentPath = []) => {
    for (const node of nodes) {
      const path = [...parentPath, node.id];
      flat.push({ id: node.id, title: node.title, order: node.order, path, node });
      visit(node.children ?? [], path);
    }
  };
  visit(taxonomy.topics);
  return flat;
}

function requireCatalogShape(catalog, taxonomy) {
  if (!catalog || catalog.version !== 1) throw new Error('catalog version must be 1');
  if (!Array.isArray(catalog.modules)) throw new Error('catalog modules must be an array');
  if (!taxonomy || !Array.isArray(taxonomy.topics)) throw new Error('taxonomy topics must be an array');
}

export function validateKnowledgeCatalog(catalog, taxonomy, knowledgeRecords) {
  requireCatalogShape(catalog, taxonomy);
  const flat = flattenTaxonomy(taxonomy);
  const topicById = new Map();
  for (const topic of flat) topicById.set(topic.id, topic);

  for (const module of catalog.modules) {
    if (!module || typeof module !== 'object') throw new Error('catalog module must be an object');
    if (typeof module.slug !== 'string' || !module.slug) throw new Error('module slug must be a non-empty string');
    if (typeof module.title !== 'string' || !module.title.trim()) throw new Error(`module title must be a non-empty string: ${module.slug}`);
    if (!Array.isArray(module.canonicalTopics)) throw new Error(`canonicalTopics must be an array: ${module.slug}`);
    if (typeof module.primaryTopic !== 'string' || !module.primaryTopic) throw new Error(`primaryTopic must be a non-empty string: ${module.slug}`);
    if (!Array.isArray(module.prerequisites)) throw new Error(`prerequisites must be an array: ${module.slug}`);
  }

  const modulesBySlug = new Map();
  for (const module of catalog.modules) {
    if (modulesBySlug.has(module.slug)) throw new Error(`duplicate catalog slug: ${module.slug}`);
    modulesBySlug.set(module.slug, module);
  }

  const ordersByTopic = new Map();
  for (const module of catalog.modules) {
    if (!URL_SAFE_SLUG.test(module.slug)) throw new Error(`invalid catalog slug: ${module.slug}`);
    if (!['planned', 'published'].includes(module.status)) throw new Error(`invalid module status: ${module.status}`);
    if (!Number.isInteger(module.learningOrder) || module.learningOrder <= 0) {
      throw new Error(`learningOrder must be a positive integer: ${module.slug}`);
    }
    const topics = Array.isArray(module.canonicalTopics) ? module.canonicalTopics : [];
    for (const topicId of topics) {
      if (!topicById.has(topicId)) throw new Error(`unknown taxonomy topic: ${topicId}`);
    }
    const primary = topicById.get(module.primaryTopic);
    if (!primary) throw new Error(`unknown taxonomy topic: ${module.primaryTopic}`);
    const followsPrimaryPath = primary.path.slice(0, topics.length).every((id, index) => topics[index] === id);
    if (followsPrimaryPath && topics.includes(module.primaryTopic) && topics.at(-1) !== module.primaryTopic) {
      throw new Error(`primaryTopic must be the deepest canonical topic: ${module.slug}`);
    }
    if (JSON.stringify(topics) !== JSON.stringify(primary.path)) {
      throw new Error(`canonicalTopics must equal taxonomy path: ${module.slug}`);
    }
    if (!ordersByTopic.has(module.primaryTopic)) ordersByTopic.set(module.primaryTopic, new Map());
    const orders = ordersByTopic.get(module.primaryTopic);
    if (orders.has(module.learningOrder)) throw new Error(`duplicate learningOrder ${module.learningOrder} in ${module.primaryTopic}`);
    orders.set(module.learningOrder, module.slug);
  }

  for (const module of catalog.modules) {
    for (const prerequisite of module.prerequisites ?? []) {
      if (!modulesBySlug.has(prerequisite)) throw new Error(`unknown prerequisite: ${prerequisite}`);
      if (prerequisite === module.slug) throw new Error(`self prerequisite: ${module.slug}`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  const walk = (slug, trail = []) => {
    if (visiting.has(slug)) {
      const start = trail.indexOf(slug);
      throw new Error(`prerequisite cycle: ${[...trail.slice(start), slug].join(' -> ')}`);
    }
    if (visited.has(slug)) return;
    visiting.add(slug);
    const module = modulesBySlug.get(slug);
    for (const prerequisite of module.prerequisites ?? []) walk(prerequisite, [...trail, slug]);
    visiting.delete(slug);
    visited.add(slug);
  };
  for (const module of catalog.modules) walk(module.slug);

  const knowledgeBySlug = new Map();
  for (const record of knowledgeRecords ?? []) {
    if (knowledgeBySlug.has(record.slug)) throw new Error(`duplicate Knowledge slug: ${record.slug}`);
    knowledgeBySlug.set(record.slug, record);
  }
  for (const module of catalog.modules) {
    const record = knowledgeBySlug.get(module.slug);
    if (module.status === 'published') {
      if (!record) throw new Error(`published module missing Knowledge: ${module.slug}`);
      if (record.title !== module.title) throw new Error(`published title mismatch: ${module.slug}`);
      if (JSON.stringify(record.canonicalTopics) !== JSON.stringify(module.canonicalTopics)) {
        throw new Error(`published topic mismatch: ${module.slug}`);
      }
    } else if (record) {
      throw new Error(`planned module already has a public page: ${module.slug}`);
    }
  }
  for (const record of knowledgeRecords ?? []) {
    if (!modulesBySlug.has(record.slug)) throw new Error(`classified Knowledge missing from catalog: ${record.slug}`);
  }
  return true;
}

export function buildPublicKnowledgeDirectory({ catalog, taxonomy, knowledgeRecords, problemRecords, base = '/' }) {
  validateKnowledgeCatalog(catalog, taxonomy, knowledgeRecords);
  const normalizedBase = `${String(base).replace(/\/+$/, '')}/`;
  const moduleBySlug = new Map(catalog.modules.map((module) => [module.slug, module]));
  const publishedModules = catalog.modules.filter((module) => module.status === 'published');
  const problemCountByModule = new Map(publishedModules.map((module) => [module.slug, 0]));
  for (const problem of problemRecords ?? []) {
    const related = new Set([...(problem.concepts ?? []), ...(problem.techniques ?? []), ...(problem.prerequisites ?? [])]);
    for (const module of publishedModules) if (related.has(module.slug)) problemCountByModule.set(module.slug, problemCountByModule.get(module.slug) + 1);
  }
  const flat = flattenTaxonomy(taxonomy);
  const topicById = new Map(flat.map((topic) => [topic.id, topic]));
  const topicProblems = new Map(flat.map((topic) => [topic.id, 0]));
  for (const problem of problemRecords ?? []) {
    const ids = problem.canonicalTopics ?? [];
    for (const topic of flat) {
      const includesTopicOrDescendant = ids.some((id) => {
        const recordTopic = topicById.get(id);
        return id === topic.id || (recordTopic && recordTopic.path.slice(0, topic.path.length).every((part, index) => part === topic.path[index]));
      });
      if (includesTopicOrDescendant) topicProblems.set(topic.id, topicProblems.get(topic.id) + 1);
    }
  }
  const hrefFor = (module) => module.status === 'published' ? `${normalizedBase}knowledge/${module.slug}/` : null;
  const publicPrerequisites = (module) => (module.prerequisites ?? []).map((slug) => {
    const prerequisite = moduleBySlug.get(slug);
    return { slug, title: prerequisite.title, status: prerequisite.status, href: hrefFor(prerequisite) };
  });
  const project = (node) => {
    const modules = catalog.modules
      .filter((module) => module.primaryTopic === node.id)
      .sort((a, b) => a.learningOrder - b.learningOrder)
      .map((module) => ({
        slug: module.slug,
        title: module.title,
        status: module.status,
        learningOrder: module.learningOrder,
        href: hrefFor(module),
        problemCount: module.status === 'published' ? problemCountByModule.get(module.slug) : null,
        prerequisites: publicPrerequisites(module),
      }));
    return {
      id: node.id,
      title: node.title,
      order: node.order,
      anchor: `topic-${node.id}`,
      problemCount: topicProblems.get(node.id),
      modules,
      children: (node.children ?? []).map(project),
    };
  };
  return {
    totals: { published: publishedModules.length, planned: catalog.modules.length - publishedModules.length },
    topics: taxonomy.topics.map(project),
  };
}
