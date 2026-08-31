import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const expectedModules = [
  { slug: constraint, title: 'Logical Deduction, Constraint Propagation & Case Elimination', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 10, status: 'published', prerequisites: [] },
  { slug: trees, title: 'Decision Trees, Information Bounds & Adaptive Testing', canonicalTopics: topics, primaryTopic: 'logical-deduction', learningOrder: 20, status: 'published', prerequisites: [constraint] },
];

async function metadata(slug) {
  const text = await readFile(`src/content/knowledge/concepts/${slug}.md`, 'utf8');
  return parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
}

test('Logical Deduction Knowledge modules have exact catalog order', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  const recursionIndex = catalog.modules.findIndex(({ slug }) => slug === 'recursion-problem-solving');
  assert.notEqual(recursionIndex, -1);
  assert.deepEqual(catalog.modules.slice(recursionIndex + 1, recursionIndex + 3), expectedModules);
  assert.deepEqual(catalog.modules.filter(({ primaryTopic }) => primaryTopic === 'logical-deduction').slice(0, 2), expectedModules);
});

test('Logical Deduction Knowledge exposes the exact reciprocal graph', async () => {
  const [newConstraint, newTrees, smallCases, problemFraming] = await Promise.all([
    metadata(constraint),
    metadata(trees),
    metadata('small-cases-recurrence-and-structural-simplification'),
    metadata('problem-framing-clarification-assumption-management'),
  ]);
  assert.deepEqual(newConstraint.related, ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees, 'constraint-reframing-and-latent-state']);
  assert.deepEqual(newTrees.related, [constraint, 'small-cases-recurrence-and-structural-simplification', 'constraint-reframing-and-latent-state']);
  assert.deepEqual(smallCases.related, ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', 'fermi-estimation-assumption-decomposition', constraint, trees]);
  assert.deepEqual(problemFraming.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', 'small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition', constraint, 'constraint-reframing-and-latent-state']);
});

test('019 Logical Deduction Knowledge modules remain registered', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  const modules = new Map(catalog.modules.map((module) => [module.slug, module]));
  assert.deepEqual(expectedModules.map(({ slug }) => modules.get(slug)), expectedModules);
});
