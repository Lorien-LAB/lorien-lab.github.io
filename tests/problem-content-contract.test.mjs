import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const sources = [
  'src/content/problem-sources/green-book.md',
  'src/content/problem-sources/red-book.md',
];
const techniques = [
  'src/content/knowledge/concepts/conditioning.md',
  'src/content/knowledge/concepts/first-step-analysis.md',
  'src/content/knowledge/concepts/recursion-problem-solving.md',
];

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((path) => String(path).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(path) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

test('phase 1 retains truthful source containers and canonical seed problems', async () => {
  for (const file of [...sources, ...techniques]) await access(file);

  for (const file of sources) {
    const source = await readFile(file, 'utf8');
    assert.match(source, /sourceType:\s*book/);
    assert.doesNotMatch(source, /https?:\/\/example\./);
  }

  for (const slug of ['conditional-dice-expectation', 'random-walk-boundary']) {
    const file = await findProblem(slug);
    const source = await readFile(file, 'utf8');
    assert.match(source, /mathDifficulty:\s*[1-5]/);
    assert.match(source, /insightDifficulty:\s*[1-5]/);
    assert.match(source, /interviewDifficulty:\s*[1-5]/);
    assert.match(source, /<details>/);
    assert.match(source, /<summary>[^<]*Hint/i);
    assert.match(source, /<summary>[^<]*Solution/i);
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
