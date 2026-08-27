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

const exactPrerequisites = {
  'bayes-rule-base-rates': ['conditioning'],
  'bounded-monotone-convergence-and-fixed-points': ['monotonicity-convexity-critical-points-and-inflection'],
  'common-probability-distributions': ['random-variables-cdf-pmf-pdf'],
  'conditional-expectation-tower-property': ['conditioning', 'expectation-linearity-indicators'],
  conditioning: [],
  'correlation-matrix': [],
  'counting-permutations-combinations': [],
  'derivative-definition-and-core-rules': [],
  'eigenbasis-decomposition': ['eigenvalues-eigenvectors'],
  'eigenvalues-eigenvectors': [],
  'expectation-linearity-indicators': [],
  'expectation-variance-covariance-algebra': ['expectation-linearity-indicators'],
  'finite-combinatorial-probability-modeling': ['counting-permutations-combinations'],
  'finite-state-markov-chains': [],
  'first-step-analysis': ['finite-state-markov-chains', 'conditioning'],
  'gaussian-lognormal-structure': ['common-probability-distributions'],
  'identity-swapping-invariance': [],
  'inclusion-exclusion-derangements': ['counting-permutations-combinations'],
  'indeterminate-limits-and-growth-rates': ['derivative-definition-and-core-rules'],
  'joint-extremes-and-range': ['order-statistics-basics'],
  'limit-theorems-lln-clt': ['moments-moment-generating-functions'],
  'linear-independence-span-basis-rank': ['vector-geometry-inner-products'],
  'linear-systems-consistency': ['linear-independence-span-basis-rank'],
  'logarithmic-differentiation': ['derivative-definition-and-core-rules'],
  'lu-cholesky-decomposition': ['linear-independence-span-basis-rank'],
  'markov-chain-state-compression': ['finite-state-markov-chains'],
  'matrix-spectral-invariants': ['eigenvalues-eigenvectors'],
  'modular-arithmetic': [],
  'modular-invariants': ['modular-arithmetic'],
  'moments-moment-generating-functions': ['expectation-linearity-indicators', 'expectation-variance-covariance-algebra'],
  'monotonicity-convexity-critical-points-and-inflection': ['derivative-definition-and-core-rules'],
  'no-arbitrage-principle': [],
  'option-price-convexity-in-strike': ['no-arbitrage-principle', 'static-arbitrage-construction'],
  'order-statistics-basics': [],
  'positive-semidefinite-matrix': [],
  'positive-series-convergence': [],
  'principal-minor-feasibility': ['positive-semidefinite-matrix'],
  'probability-axioms-derived-rules': ['probability-spaces-events'],
  'probability-spaces-events': [],
  'problem-framing-clarification-assumption-management': [],
  'qr-decomposition': ['vector-geometry-inner-products', 'linear-independence-span-basis-rank'],
  'random-variable-transformations-convolution': ['random-variables-cdf-pmf-pdf', 'common-probability-distributions'],
  'random-variables-cdf-pmf-pdf': [],
  'recursion-problem-solving': [],
  'related-rates-and-implicit-differentiation': ['derivative-definition-and-core-rules'],
  'singular-value-decomposition': ['eigenvalues-eigenvectors', 'vector-geometry-inner-products'],
  'static-arbitrage-construction': ['no-arbitrage-principle'],
  'structured-think-aloud-reasoning': ['problem-framing-clarification-assumption-management'],
  'symmetry-equiprobability-geometric-probability': ['probability-axioms-derived-rules'],
  'vector-geometry-inner-products': [],
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
  assert.equal(repositoryCatalog.modules.filter((module) => module.status === 'published').length, 50);
  assert.deepEqual(
    repositoryCatalog.modules.filter((module) => module.status === 'planned').map((module) => module.slug).sort(),
    [],
  );
  assert.deepEqual(
    Object.fromEntries(repositoryCatalog.modules.map((module) => [module.slug, module.prerequisites])),
    exactPrerequisites,
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
  assert.deepEqual(result.totals, { published: 50, planned: 0 });
  assert.equal(result.topics.length, 10);
  const interview = result.topics.find((topic) => topic.id === 'interview-strategy-communication');
  const reasoning = interview.children.find((topic) => topic.id === 'reasoning-communication');
  assert.deepEqual(reasoning.modules.map((module) => [module.slug, module.status, module.href]), [
    ['problem-framing-clarification-assumption-management', 'published', '/knowledge/problem-framing-clarification-assumption-management/'],
    ['structured-think-aloud-reasoning', 'published', '/knowledge/structured-think-aloud-reasoning/'],
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

test('internal directory renders only active and complete workstreams', () => {
  const model = buildInternalDirectoryModel({
    ...internalFixture,
    workstreams: [
      ...internalFixture.workstreams,
      { id: 'child-topic-000', status: 'complete', canonicalTopics: ['root-topic', 'child-topic'], sourceScopes: [] },
      { id: 'child-topic-999', status: 'planned', canonicalTopics: ['root-topic', 'child-topic'], sourceScopes: [] },
    ],
  });

  assert.deepEqual(model.topics[0].children[0].workstreams, [
    { id: 'child-topic-000', status: 'complete' },
    { id: 'child-topic-001', status: 'active' },
  ]);
});

test('internal directory rejects unknown coverage taxonomy topics before projection', () => {
  const invalidFixture = {
    ...internalFixture,
    coverageLedgers: {
      ...internalFixture.coverageLedgers,
      'green-book': {
        entries: [{ ...internalFixture.coverageLedgers['green-book'].entries[0], canonicalTopics: ['missing-topic'] }],
      },
    },
  };
  assert.throws(
    () => buildInternalDirectoryModel(invalidFixture),
    /unknown coverage taxonomy topic: missing-topic/,
  );
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

test('directory CLI preserves non-missing output read errors in check mode', async () => {
  const outputDirectory = await mkdtemp(path.join(os.tmpdir(), 'knowledge-directory-invalid-output-'));
  const script = 'scripts/generate-quant-interview-knowledge-directory.mjs';
  const result = spawnSync(
    process.execPath,
    [script, '--check', '--repo-root', process.cwd(), '--output', outputDirectory],
    { encoding: 'utf8' },
  );

  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.stderr, /Knowledge directory is stale/);
  assert.match(result.stderr, /EISDIR|illegal operation on a directory|is a directory/i);
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

test('topic Problem counts aggregate descendants without leaking across siblings', () => {
  const siblingCountTaxonomy = {
    version: 1,
    topics: [{
      id: 'root', title: 'Root', order: 1,
      children: [
        { id: 'a', title: 'A', order: 1 },
        { id: 'b', title: 'B', order: 2 },
      ],
    }],
  };
  const siblingCountCatalog = {
    version: 1,
    modules: [{
      slug: 'module-a',
      title: 'Module A',
      canonicalTopics: ['root', 'a'],
      primaryTopic: 'a',
      learningOrder: 10,
      status: 'published',
      prerequisites: [],
    }],
  };
  const result = buildPublicKnowledgeDirectory({
    catalog: siblingCountCatalog,
    taxonomy: siblingCountTaxonomy,
    knowledgeRecords: [{ slug: 'module-a', title: 'Module A', canonicalTopics: ['root', 'a'] }],
    problemRecords: [{
      slug: 'problem-a',
      canonicalTopics: ['root', 'a'],
      concepts: [],
      techniques: [],
      prerequisites: [],
    }],
  });

  assert.deepEqual({
    root: result.topics[0].problemCount,
    a: result.topics[0].children[0].problemCount,
    b: result.topics[0].children[1].problemCount,
  }, { root: 1, a: 1, b: 0 });
});

test('catalog projects ordered sibling classifications with the final topic as primary', () => {
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
  const siblingKnowledgeRecords = [{
    slug: 'sibling-module',
    title: 'Sibling Module',
    canonicalTopics: ['root-topic', 'child-topic', 'sibling-topic'],
  }];
  assert.equal(validateKnowledgeCatalog(siblingCatalog, siblingTaxonomy, siblingKnowledgeRecords), true);
  const result = buildPublicKnowledgeDirectory({
    catalog: siblingCatalog,
    taxonomy: siblingTaxonomy,
    knowledgeRecords: siblingKnowledgeRecords,
    problemRecords: [],
  });
  assert.deepEqual(result.topics[0].children[1].modules[0].canonicalTopics, [
    { id: 'root-topic', title: 'Root Topic' },
    { id: 'child-topic', title: 'Child Topic' },
    { id: 'sibling-topic', title: 'Sibling Topic' },
  ]);
});

test('public directory sorts taxonomy siblings recursively by order', () => {
  const shuffledTaxonomy = {
    version: 1,
    topics: [
      { id: 'second-root', title: 'Second Root', order: 2 },
      {
        id: 'first-root', title: 'First Root', order: 1,
        children: [
          { id: 'second-child', title: 'Second Child', order: 2 },
          { id: 'first-child', title: 'First Child', order: 1 },
        ],
      },
    ],
  };
  const result = buildPublicKnowledgeDirectory({
    catalog: { version: 1, modules: [] },
    taxonomy: shuffledTaxonomy,
    knowledgeRecords: [],
    problemRecords: [],
  });

  assert.deepEqual(result.topics.map((topic) => topic.id), ['first-root', 'second-root']);
  assert.deepEqual(result.topics[0].children.map((topic) => topic.id), ['first-child', 'second-child']);
});

const invalidCases = [
  ['duplicate slug', { ...catalog, modules: [catalog.modules[0], catalog.modules[0]] }, /duplicate catalog slug: published-module/],
  ['invalid slug', { ...catalog, modules: [{ ...catalog.modules[0], slug: 'Not Valid' }, catalog.modules[1]] }, /invalid catalog slug: Not Valid/],
  ['invalid status', { ...catalog, modules: [{ ...catalog.modules[0], status: 'draft' }, catalog.modules[1]] }, { message: 'module published-module field status must be planned or published; received draft' }],
  ['unknown topic', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['missing'], primaryTopic: 'missing' }] }, { message: 'module published-module field canonicalTopics must contain only known taxonomy topics; unknown missing' }],
  ['unknown primary topic', { ...catalog, modules: [{ ...catalog.modules[0], primaryTopic: 'missing' }, catalog.modules[1]] }, { message: 'module published-module field primaryTopic must reference a known taxonomy topic; unknown missing' }],
  ['non-parent-first topics', { ...catalog, modules: [{ ...catalog.modules[0], canonicalTopics: ['child-topic', 'root-topic'] }, catalog.modules[1]] }, /canonicalTopics must list ancestors before descendants: published-module/],
  ['primary topic absent', { ...catalog, modules: [{ ...catalog.modules[0], primaryTopic: 'root-topic' }] }, /primaryTopic must be the deepest canonical topic/],
  ['non-positive order', { ...catalog, modules: [{ ...catalog.modules[0], learningOrder: 0 }, catalog.modules[1]] }, /learningOrder must be a positive integer: published-module/],
  ['duplicate order', { ...catalog, modules: [catalog.modules[0], { ...catalog.modules[1], learningOrder: 10 }] }, { message: 'module planned-module field learningOrder must be unique within primaryTopic child-topic; duplicate 10' }],
  ['unknown prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['missing'] }, catalog.modules[1]] }, { message: 'module published-module field prerequisites must reference catalog modules; unknown missing' }],
  ['self prerequisite', { ...catalog, modules: [{ ...catalog.modules[0], prerequisites: ['published-module'] }, catalog.modules[1]] }, { message: 'module published-module field prerequisites must not reference the module itself' }],
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
