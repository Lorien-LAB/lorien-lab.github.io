import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const currentProblemSlugs = [
  'put-quotes-zero-cost-static-portfolio',
  'missing-digit-power-of-two',
  'ants-crossing-line',
  'correlation-matrix-parameter-range',
  'conditional-dice-expectation',
  'random-walk-boundary',
];

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((path) => String(path).endsWith(`/${slug}.md`) || String(path) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

test('public Problem schema is source-neutral', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  const problemsSchema = config.split('const problems = defineCollection({')[1]?.split('const reproductionScore =')[0] ?? '';
  assert.ok(problemsSchema, 'unable to isolate problems schema');
  for (const field of ['originType', 'source', 'sourceSection', 'sourceChapter', 'sourceProblem', 'sourceReference', 'sourceUrl']) {
    assert.doesNotMatch(problemsSchema, new RegExp(`\\b${field}\\s*:`), `Problem schema still exposes ${field}`);
  }
  assert.doesNotMatch(problemsSchema, /Source-derived problems require a source slug/);
});

test('all current interview problems have canonical topics and no source provenance', async () => {
  for (const slug of currentProblemSlugs) {
    const path = await findProblem(slug);
    const text = await readFile(path, 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[[^\]]+\]$/m, `${slug} missing canonical topics`);
    assert.doesNotMatch(text, /^originType:/m, `${slug} still exposes originType`);
    assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference|Url)?:/m, `${slug} still exposes source provenance`);
    assert.doesNotMatch(path, /150-most-frequently-asked|\/original\//, `${slug} still lives in a source-oriented directory`);
  }
});

test('current source-derived items remain auditable in hidden coverage', async () => {
  const ledger = JSON.parse(await readFile('src/data/quant-interview/coverage/150-most-frequently-asked.json', 'utf8'));
  const items = new Map(ledger.entries.filter((entry) => entry.sourceItem).map((entry) => [entry.sourceItem, entry]));
  const expected = new Map([
    ['1', 'put-quotes-zero-cost-static-portfolio'],
    ['2', 'missing-digit-power-of-two'],
    ['4', 'ants-crossing-line'],
    ['5', 'correlation-matrix-parameter-range'],
  ]);
  for (const [id, slug] of expected) {
    const entry = items.get(id);
    assert.equal(entry?.state, 'canonical-problem', `source item ${id} is not terminal canonical-problem coverage`);
    assert.deepEqual(entry?.canonicalProblems, [slug], `source item ${id} is not mapped to ${slug}`);
  }
});
