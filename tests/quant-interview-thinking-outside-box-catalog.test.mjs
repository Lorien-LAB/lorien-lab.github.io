import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const reframing = 'constraint-reframing-and-latent-state';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const expected = [
  { slug: constraint, title: 'Logical Deduction, Constraint Propagation & Case Elimination', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 10, status: 'published', prerequisites: [] },
  { slug: trees, title: 'Decision Trees, Information Bounds & Adaptive Testing', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 20, status: 'published', prerequisites: [constraint] },
  { slug: reframing, title: 'Constraint Reframing & Latent State', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 30, status: 'published', prerequisites: [constraint] },
];
const newProblemSlugs = [
  'pack-length-four-bricks-in-six-cube',
  'two-cube-calendar-digit-labeling',
  'two-guards-one-question',
  'message-delivery-with-independent-padlocks',
  'last-ball-color-by-parity-invariant',
  'four-switches-one-room-entry',
  'private-average-with-canceling-mask',
];

function parseMetadata(text) {
  return parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
}

async function knowledgeMetadata(slug) {
  return parseMetadata(await readFile(`src/content/knowledge/concepts/${slug}.md`, 'utf8'));
}

async function problemMetadata(slug) {
  return parseMetadata(await readFile(`src/content/problems/logic/${slug}.md`, 'utf8'));
}

test('020 registers exact Logical Deduction catalog order', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.deepEqual(catalog.modules.filter(({ primaryTopic }) => primaryTopic === 'logical-deduction'), expected);
  assert.equal(catalog.modules.length, 59);
});

test('020 exposes the exact reciprocal Knowledge graph', async () => {
  const [reframingMeta, constraintMeta, treesMeta, modularMeta, framingMeta] = await Promise.all([
    knowledgeMetadata(reframing),
    knowledgeMetadata(constraint),
    knowledgeMetadata(trees),
    knowledgeMetadata('modular-invariants'),
    knowledgeMetadata('problem-framing-clarification-assumption-management'),
  ]);

  assert.deepEqual(reframingMeta.related, [constraint, trees, 'modular-invariants', 'problem-framing-clarification-assumption-management']);
  assert.deepEqual(constraintMeta.related, ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees, reframing]);
  assert.deepEqual(treesMeta.related, [constraint, 'small-cases-recurrence-and-structural-simplification', reframing]);
  assert.deepEqual(modularMeta.related, ['modular-arithmetic', reframing]);
  assert.deepEqual(framingMeta.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', 'small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition', constraint, reframing]);
});

test('020 Problems reference existing Knowledge and use unique ids 005 through 011', async () => {
  const knowledgeFiles = (await readdir('src/content/knowledge', { recursive: true }))
    .filter((file) => String(file).endsWith('.md'));
  const knowledgeSlugs = new Set(knowledgeFiles.map((file) => path.basename(String(file), '.md')));
  const problemMetadataEntries = await Promise.all(newProblemSlugs.map(problemMetadata));

  for (const [index, metadata] of problemMetadataEntries.entries()) {
    assert.equal(metadata.problemId, `logic-logical-deduction-${String(index + 5).padStart(3, '0')}`);
    for (const concept of metadata.concepts) {
      assert.ok(knowledgeSlugs.has(concept), `${newProblemSlugs[index]} references missing Knowledge ${concept}`);
    }
  }
  assert.equal(new Set(problemMetadataEntries.map(({ problemId }) => problemId)).size, 7);
});
