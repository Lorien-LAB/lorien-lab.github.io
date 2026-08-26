import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPublicKnowledgeDirectory,
  validateKnowledgeCatalog,
} from '../src/lib/quantInterviewKnowledgeDirectory.mjs';

const taxonomy = {
  version: 1,
  topics: [{
    id: 'root-topic', title: 'Root Topic', order: 1,
    children: [{ id: 'child-topic', title: 'Child Topic', order: 1 }],
  }],
};

const catalog = {
  version: 1,
  modules: [
    {
      slug: 'published-module',
      title: 'Published Module',
      canonicalTopics: ['root-topic', 'child-topic'],
      primaryTopic: 'child-topic',
      learningOrder: 10,
      status: 'published',
      prerequisites: [],
    },
    {
      slug: 'planned-module',
      title: 'Planned Module',
      canonicalTopics: ['root-topic', 'child-topic'],
      primaryTopic: 'child-topic',
      learningOrder: 20,
      status: 'planned',
      prerequisites: ['published-module'],
    },
  ],
};

const knowledgeRecords = [{
  slug: 'published-module',
  title: 'Published Module',
  canonicalTopics: ['root-topic', 'child-topic'],
}];

const problemRecords = [{
  slug: 'practice-one',
  canonicalTopics: ['root-topic', 'child-topic'],
  concepts: ['published-module'],
  techniques: [],
  prerequisites: [],
}];

test('public directory projects published and planned modules without private state', () => {
  const result = buildPublicKnowledgeDirectory({
    catalog, taxonomy, knowledgeRecords, problemRecords, base: '/',
  });
  assert.deepEqual(result.totals, { published: 1, planned: 1 });
  const child = result.topics[0].children[0];
  assert.equal(child.anchor, 'topic-child-topic');
  assert.equal(child.problemCount, 1);
  assert.deepEqual(child.modules.map((module) => ({
    slug: module.slug,
    href: module.href,
    problemCount: module.problemCount,
  })), [
    { slug: 'published-module', href: '/knowledge/published-module/', problemCount: 1 },
    { slug: 'planned-module', href: null, problemCount: null },
  ]);
  assert.deepEqual(child.modules[1].prerequisites, [{
    slug: 'published-module',
    title: 'Published Module',
    status: 'published',
    href: '/knowledge/published-module/',
  }]);
  assert.equal(JSON.stringify(result).match(/source|coverage|workstream|pageRange/gi), null);
});

const invalidCases = [
  ['duplicate slug', { ...catalog, modules: [catalog.modules[0], catalog.modules[0]] }, /duplicate catalog slug: published-module/],
  ['invalid slug', { ...catalog, modules: [{ ...catalog.modules[0], slug: 'Not Valid' }, catalog.modules[1]] }, /invalid catalog slug: Not Valid/],
  ['invalid status', { ...catalog, modules: [{ ...catalog.modules[0], status: 'draft' }, catalog.modules[1]] }, /invalid module status: draft/],
  ['unknown topic', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['missing'], primaryTopic: 'missing' }] }, /unknown taxonomy topic: missing/],
  ['non-parent-first topics', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['child-topic', 'root-topic'] }, catalog.modules[1]] }, /canonicalTopics must equal taxonomy path: published-module/],
  ['primary topic absent', { ...catalog, modules: [{ ...catalog.modules[0], primaryTopic: 'root-topic' }] }, /primaryTopic must be the deepest canonical topic/],
  ['non-positive order', { ...catalog, modules: [{ ...catalog.modules[0], learningOrder: 0 }, catalog.modules[1]] }, /learningOrder must be a positive integer: published-module/],
  ['duplicate order', { ...catalog, modules: [catalog.modules[0], { ...catalog.modules[1], learningOrder: 10 }] }, /duplicate learningOrder 10 in child-topic/],
  ['unknown prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['missing'] }, catalog.modules[1]] }, /unknown prerequisite: missing/],
  ['self prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['published-module'] }, catalog.modules[1]] }, /self prerequisite: published-module/],
];

for (const [name, candidate, expected] of invalidCases) {
  test(`catalog rejects ${name}`, () => {
    assert.throws(
      () => validateKnowledgeCatalog(candidate, taxonomy, knowledgeRecords),
      expected,
    );
  });
}

test('catalog rejects prerequisite cycles', () => {
  const cyclic = {
    ...catalog,
    modules: catalog.modules.map((module) => ({
      ...module,
      prerequisites: module.slug === 'published-module'
        ? ['planned-module']
        : ['published-module'],
    })),
  };
  assert.throws(
    () => validateKnowledgeCatalog(cyclic, taxonomy, knowledgeRecords),
    /prerequisite cycle: planned-module -> published-module -> planned-module|prerequisite cycle: published-module -> planned-module -> published-module/,
  );
});

test('catalog rejects published metadata drift and missing classified Knowledge', () => {
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [{ ...knowledgeRecords[0], title: 'Wrong' }]),
    /published title mismatch: published-module/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [{ ...knowledgeRecords[0], canonicalTopics: ['root-topic'] }]),
    /published topic mismatch: published-module/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [
      ...knowledgeRecords,
      { slug: 'uncatalogued', title: 'Uncatalogued', canonicalTopics: ['root-topic'] },
    ]),
    /classified Knowledge missing from catalog: uncatalogued/,
  );
  assert.throws(
    () => validateKnowledgeCatalog(catalog, taxonomy, [
      ...knowledgeRecords,
      { slug: 'planned-module', title: 'Planned Module', canonicalTopics: ['root-topic', 'child-topic'] },
    ]),
    /planned module already has a public page: planned-module/,
  );
});
