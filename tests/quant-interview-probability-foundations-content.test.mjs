import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

test('probability spaces Knowledge owns source-derived event and set language', async () => {
  const file = await findKnowledge('probability-spaces-events');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  for (const pattern of [/sample space/i, /event/i, /union/i, /intersection/i, /complement/i, /mutually exclusive/i, /indicator/i]) {
    assert.match(text, pattern);
  }
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /^## (?:Expectation|Conditional Probability|Bayes)/mi);
});

export { findKnowledge, findProblem };
