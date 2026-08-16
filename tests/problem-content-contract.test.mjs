import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const sources = [
  'src/content/problem-sources/green-book.md',
  'src/content/problem-sources/red-book.md',
];
const techniques = [
  'src/content/knowledge/concepts/conditioning.md',
  'src/content/knowledge/concepts/first-step-analysis.md',
  'src/content/knowledge/concepts/recursion-problem-solving.md',
];
const seeds = [
  'src/content/problems/original/conditional-dice-expectation.md',
  'src/content/problems/original/random-walk-boundary.md',
];

test('phase 1 contains truthful source containers and original seed problems', async () => {
  for (const file of [...sources, ...techniques, ...seeds]) await access(file);

  for (const file of sources) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /sourceType:\s*book/);
    assert.doesNotMatch(source, /https?:\/\/example\./);
  }

  for (const file of seeds) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /originType:\s*original/);
    assert.match(source, /mathDifficulty:\s*[1-5]/);
    assert.match(source, /insightDifficulty:\s*[1-5]/);
    assert.match(source, /interviewDifficulty:\s*[1-5]/);
    assert.match(source, /<details>/);
    assert.match(source, /<summary>[^<]*Hint/i);
    assert.match(source, /<summary>[^<]*Solution/i);
    assert.doesNotMatch(source, /source:\s*(green-book|red-book)/);
  }
});

test('problem-solving techniques reuse the knowledge concept model', async () => {
  for (const file of techniques) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /type:\s*concept/);
    assert.match(source, /category:\s*["']?Problem Solving Techniques["']?/);
  }
});

test('problem layout requires no client framework', async () => {
  const layout = await readFile('src/layouts/ProblemLayout.astro', 'utf8');
  assert.match(layout, /ProblemDifficulty/);
  assert.doesNotMatch(layout, /client:/);
});

test('README documents the quant interview authoring contract', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /Quant Interview Problem Bank/);
  assert.match(readme, /independent formulation/i);
  assert.match(readme, /do not.*PDF/i);
  assert.match(readme, /Problem Solving Techniques/);
});
