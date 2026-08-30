import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const small = 'small-cases-recurrence-and-structural-simplification';
const fermi = 'fermi-estimation-assumption-decomposition';
const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];

async function metadata(path) {
  const text = await readFile(path, 'utf8');
  return parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
}

test('Problem Simplification Knowledge modules have exact catalog order', async () => {
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.deepEqual(catalog.modules.filter(({ primaryTopic }) => primaryTopic === 'problem-simplification'), [
    { slug: small, title: 'Small Cases, Recurrence & Structural Simplification', canonicalTopics: topics, primaryTopic: 'problem-simplification', learningOrder: 10, status: 'published', prerequisites: [] },
    { slug: fermi, title: 'Fermi Estimation & Assumption Decomposition', canonicalTopics: topics, primaryTopic: 'problem-simplification', learningOrder: 20, status: 'published', prerequisites: [small] },
  ]);
  assert.equal(catalog.modules.length, 58);
});

test('new and existing Knowledge pages expose the exact reciprocal graph', async () => {
  const pages = {
    [small]: await metadata(`src/content/knowledge/concepts/${small}.md`),
    [fermi]: await metadata(`src/content/knowledge/concepts/${fermi}.md`),
    recursion: await metadata('src/content/knowledge/concepts/recursion-problem-solving.md'),
    framing: await metadata('src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md'),
  };
  assert.deepEqual(pages[small].related, ['recursion-problem-solving', 'problem-framing-clarification-assumption-management', fermi, 'logical-deduction-constraint-propagation-and-case-elimination', 'decision-trees-information-bounds-and-adaptive-testing']);
  assert.deepEqual(pages[fermi].related, [small, 'problem-framing-clarification-assumption-management']);
  assert.deepEqual(pages.recursion.related, [small]);
  assert.deepEqual(pages.framing.related, ['structured-think-aloud-reasoning', 'quant-interview-preparation-breadth-and-practice', 'quant-interview-formats-and-assessment-strategy', 'behavioral-interview-evidence-and-authenticity', small, fermi, 'logical-deduction-constraint-propagation-and-case-elimination']);
});

test('public corpus contains exactly 86 Problems and 58 classified Knowledge nodes', async () => {
  const problemFiles = (await readdir('src/content/problems', { recursive: true })).filter((file) => String(file).endsWith('.md'));
  const catalog = JSON.parse(await readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'));
  assert.equal(problemFiles.length, 86);
  assert.equal(catalog.modules.length, 58);
});
