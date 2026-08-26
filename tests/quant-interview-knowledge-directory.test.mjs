import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import {
  buildPublicKnowledgeDirectory,
  validateKnowledgeCatalog,
} from '../src/lib/quantInterviewKnowledgeDirectory.mjs';
import {
  buildInternalDirectoryModel,
  renderInternalDirectoryMarkdown,
} from '../scripts/generate-quant-interview-knowledge-directory.mjs';

async function readRepositoryKnowledgeRecords() {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const records = [];
  for (const file of files.filter((name) => String(name).endsWith('.md'))) {
    const fullPath = `src/content/knowledge/${String(file).replaceAll('\\', '/')}`;
    const text = await readFile(fullPath, 'utf8');
    const title = text.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? '';
    const topicText = text.match(/^quantInterviewTopics:\s*\[([^\]]*)\]$/m)?.[1] ?? '';
    const canonicalTopics = topicText.split(',').map((item) => item.trim()).filter(Boolean);
    if (canonicalTopics.length > 0) {
      records.push({ slug: path.basename(String(file), '.md'), title, canonicalTopics });
    }
  }
  return records.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function readRepositoryProblemRecords() {
  const files = await readdir('src/content/problems', { recursive: true });
  const records = [];
  for (const file of files.filter((name) => String(name).endsWith('.md'))) {
    const fullPath = `src/content/problems/${String(file).replaceAll('\\', '/')}`;
    const text = await readFile(fullPath, 'utf8');
    const readArray = (field) => {
      const value = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '';
      return value.split(',').map((item) => item.trim()).filter(Boolean);
    };
    records.push({
      slug: path.basename(String(file), '.md'),
      canonicalTopics: readArray('quantInterviewTopics'),
      concepts: readArray('concepts'),
      techniques: readArray('techniques'),
      prerequisites: readArray('prerequisites'),
    });
  }
  return records;
}

const exactOrder = {
  'reasoning-communication': [
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  'logic-brainteasers-discrete-reasoning': ['recursion-problem-solving'],
  'modular-arithmetic': ['modular-arithmetic'],
  'invariants-state-transformations': ['identity-swapping-invariance', 'modular-invariants'],
  'limits-derivatives': [
    'derivative-definition-and-core-rules',
    'logarithmic-differentiation',
    'monotonicity-convexity-critical-points-and-inflection',
    'indeterminate-limits-and-growth-rates',
    'related-rates-and-implicit-differentiation',
    'bounded-monotone-convergence-and-fixed-points',
    'positive-series-convergence',
  ],
  'vectors-linear-systems': [
    'vector-geometry-inner-products',
    'linear-independence-span-basis-rank',
    'linear-systems-consistency',
  ],
  'determinants-eigenvalues': ['eigenvalues-eigenvectors', 'matrix-spectral-invariants'],
  'matrix-decompositions': [
    'eigenbasis-decomposition',
    'lu-cholesky-decomposition',
    'qr-decomposition',
    'singular-value-decomposition',
  ],
  'covariance-correlation-matrices': ['correlation-matrix'],
  'positive-semidefinite-matrices': ['positive-semidefinite-matrix', 'principal-minor-feasibility'],
  'probability-foundations': [
    'probability-spaces-events',
    'probability-axioms-derived-rules',
    'symmetry-equiprobability-geometric-probability',
  ],
  'combinatorial-probability': [
    'counting-permutations-combinations',
    'finite-combinatorial-probability-modeling',
    'inclusion-exclusion-derangements',
  ],
  'conditional-probability-bayes': ['conditioning', 'bayes-rule-base-rates'],
  'random-variables-distributions': [
    'random-variables-cdf-pmf-pdf',
    'common-probability-distributions',
    'random-variable-transformations-convolution',
    'gaussian-lognormal-structure',
    'limit-theorems-lln-clt',
  ],
  'expectation-variance-covariance': [
    'expectation-linearity-indicators',
    'conditional-expectation-tower-property',
    'expectation-variance-covariance-algebra',
    'moments-moment-generating-functions',
  ],
  'order-statistics-extremes': ['order-statistics-basics', 'joint-extremes-and-range'],
  'random-walks-markov-chains': [
    'finite-state-markov-chains',
    'markov-chain-state-compression',
    'first-step-analysis',
  ],
  'no-arbitrage-option-properties': [
    'no-arbitrage-principle',
    'static-arbitrage-construction',
    'option-price-convexity-in-strike',
  ],
};

test('repository catalog contains the exact published corpus and planned 013 modules', async () => {
  const [catalogText, taxonomyText, knowledgeRecords] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'),
    readRepositoryKnowledgeRecords(),
  ]);
  const repositoryCatalog = JSON.parse(catalogText);
  const repositoryTaxonomy = JSON.parse(taxonomyText);
  assert.equal(validateKnowledgeCatalog(repositoryCatalog, repositoryTaxonomy, knowledgeRecords), true);
  assert.equal(repositoryCatalog.modules.length, 50);
  assert.equal(repositoryCatalog.modules.filter((module) => module.status === 'published').length, 48);
  assert.deepEqual(
    repositoryCatalog.modules.filter((module) => module.status === 'planned').map((module) => module.slug).sort(),
    ['problem-framing-clarification-assumption-management', 'structured-think-aloud-reasoning'],
  );
  for (const [topic, slugs] of Object.entries(exactOrder)) {
    const actual = repositoryCatalog.modules
      .filter((module) => module.primaryTopic === topic)
      .sort((a, b) => a.learningOrder - b.learningOrder)
      .map((module) => module.slug);
    assert.deepEqual(actual, slugs, topic);
  }
});

test('repository public projection exposes the complete source-neutral curriculum', async () => {
  const [catalogText, taxonomyText, knowledgeRecords, problemRecords] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/data/quant-interview/topics/taxonomy.json', 'utf8'),
    readRepositoryKnowledgeRecords(),
    readRepositoryProblemRecords(),
  ]);
  const result = buildPublicKnowledgeDirectory({
    catalog: JSON.parse(catalogText),
    taxonomy: JSON.parse(taxonomyText),
    knowledgeRecords,
    problemRecords,
    base: '/',
  });
  assert.deepEqual(result.totals, { published: 48, planned: 2 });
  assert.equal(result.topics.length, 10);
  const interview = result.topics.find((topic) => topic.id === 'interview-strategy-communication');
  const reasoning = interview.children.find((topic) => topic.id === 'reasoning-communication');
  assert.deepEqual(reasoning.modules.map((module) => [module.slug, module.status, module.href]), [
    ['problem-framing-clarification-assumption-management', 'planned', null],
    ['structured-think-aloud-reasoning', 'planned', null],
  ]);
  const logic = result.topics.find((topic) => topic.id === 'logic-brainteasers-discrete-reasoning');
  assert.equal(logic.modules.some((module) => module.slug === 'recursion-problem-solving'), true);
  assert.equal(result.topics.some((topic) => topic.id === 'fixed-income-rates-general-finance'), true);
  assert.equal(JSON.stringify(result).match(/green-book|red-book|150-most|coverage|sourceSection|pageRange|workstream/gi), null);
});

test('directory route imports no hidden curriculum state', async () => {
  const route = await readFile('src/pages/knowledge/quant-interview/directory.astro', 'utf8');
  assert.match(route, /buildPublicKnowledgeDirectory/);
  assert.doesNotMatch(route, /quant-interview\/coverage|quantInterviewCoverage|source-topic-map|workstreams/);
});

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

const internalFixture = {
  publicDirectory: buildPublicKnowledgeDirectory({
    catalog, taxonomy, knowledgeRecords, problemRecords, base: '/',
  }),
  problemRecords,
  sourceTopicMap: {
    entries: [
      { source: 'green-book', sourceSection: '1.1', role: 'content', canonicalTopics: ['child-topic'] },
      { source: 'red-book', sourceSection: '2.1', role: 'content', canonicalTopics: ['child-topic'] },
    ],
  },
  coverageLedgers: {
    'green-book': { entries: [{ sourceSection: '1.1', sourceItem: null, canonicalTopics: ['child-topic'], state: 'knowledge-only', canonicalProblems: [], canonicalKnowledge: ['published-module'], resolutionNote: 'Resolved.' }] },
    'red-book': { entries: [{ sourceSection: '2.1', sourceItem: null, canonicalTopics: ['child-topic'], state: 'pending', canonicalProblems: [], canonicalKnowledge: [] }] },
    '150-most-frequently-asked': { entries: [] },
  },
  workstreams: [{ id: 'child-topic-001', status: 'active', canonicalTopics: ['root-topic', 'child-topic'], sourceScopes: [] }],
};

test('internal directory joins exact source coverage and workstream state', () => {
  const model = buildInternalDirectoryModel(internalFixture);
  const child = model.topics[0].children[0];
  assert.deepEqual(child.sources, {
    'green-book': ['1.1'],
    'red-book': ['2.1'],
    '150-most-frequently-asked': [],
  });
  assert.deepEqual(child.coverage, {
    'green-book': { 'knowledge-only': 1 },
    'red-book': { pending: 1 },
    '150-most-frequently-asked': {},
  });
  assert.deepEqual(child.workstreams, [{ id: 'child-topic-001', status: 'active' }]);
});

test('internal Markdown is deterministic and contains no completion percentage', () => {
  const model = buildInternalDirectoryModel(internalFixture);
  const first = renderInternalDirectoryMarkdown(model);
  const second = renderInternalDirectoryMarkdown(model);
  assert.equal(first, second);
  assert.match(first, /^# Quant Interview Knowledge Directory$/m);
  assert.match(first, /Green Book sections: `1\.1`/);
  assert.match(first, /Red Book sections: `2\.1`/);
  assert.match(first, /`knowledge-only`: 1/);
  assert.match(first, /`pending`: 1/);
  assert.match(first, /`child-topic-001` \(active\)/);
  assert.doesNotMatch(first, /\d+(?:\.\d+)?%|percent complete|completion rate/i);
  assert.equal(first.endsWith('\n'), true);
});

test('directory CLI detects and repairs a stale generated file', async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'knowledge-directory-'));
  const output = path.join(tempRoot, 'KNOWLEDGE_DIRECTORY.md');
  await writeFile(output, 'stale\n', 'utf8');
  const script = 'scripts/generate-quant-interview-knowledge-directory.mjs';
  const stale = spawnSync(process.execPath, [script, '--check', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.notEqual(stale.status, 0);
  assert.match(stale.stderr, /Knowledge directory is stale/);
  const write = spawnSync(process.execPath, [script, '--write', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.equal(write.status, 0, write.stderr);
  const fresh = spawnSync(process.execPath, [script, '--check', '--repo-root', process.cwd(), '--output', output], { encoding: 'utf8' });
  assert.equal(fresh.status, 0, fresh.stderr);
});

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

test('catalog accepts ordered sibling classifications with the final topic as primary', () => {
  const siblingTaxonomy = {
    version: 1,
    topics: [{
      id: 'root-topic', title: 'Root Topic', order: 1,
      children: [
        { id: 'child-topic', title: 'Child Topic', order: 1 },
        { id: 'sibling-topic', title: 'Sibling Topic', order: 2 },
      ],
    }],
  };
  const siblingCatalog = {
    version: 1,
    modules: [{
      ...catalog.modules[0],
      slug: 'sibling-module',
      title: 'Sibling Module',
      canonicalTopics: ['root-topic', 'child-topic', 'sibling-topic'],
      primaryTopic: 'sibling-topic',
    }],
  };
  assert.equal(validateKnowledgeCatalog(siblingCatalog, siblingTaxonomy, [{
    slug: 'sibling-module',
    title: 'Sibling Module',
    canonicalTopics: ['root-topic', 'child-topic', 'sibling-topic'],
  }]), true);
});

const invalidCases = [
  ['duplicate slug', { ...catalog, modules: [catalog.modules[0], catalog.modules[0]] }, /duplicate catalog slug: published-module/],
  ['invalid slug', { ...catalog, modules: [{ ...catalog.modules[0], slug: 'Not Valid' }, catalog.modules[1]] }, /invalid catalog slug: Not Valid/],
  ['invalid status', { ...catalog, modules: [{ ...catalog.modules[0], status: 'draft' }, catalog.modules[1]] }, /invalid module status: draft/],
  ['unknown topic', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['missing'], primaryTopic: 'missing' }] }, /unknown taxonomy topic: missing/],
  ['non-parent-first topics', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['child-topic', 'root-topic'] }, catalog.modules[1]] }, /canonicalTopics must list ancestors before descendants: published-module/],
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

test('catalog rejects malformed module fields before semantic validation', () => {
  assert.throws(
    () => validateKnowledgeCatalog({
      ...catalog,
      modules: [{ ...catalog.modules[1], title: undefined }, catalog.modules[0]],
    }, taxonomy, knowledgeRecords),
    /module title must be a non-empty string: planned-module/,
  );
  assert.throws(
    () => validateKnowledgeCatalog({
      ...catalog,
      modules: [{ ...catalog.modules[1], prerequisites: '' }, catalog.modules[0]],
    }, taxonomy, knowledgeRecords),
    /prerequisites must be an array: planned-module/,
  );
});
