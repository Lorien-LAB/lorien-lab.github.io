import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

async function readKnowledge(slug) {
  return readFile(await findKnowledge(slug), 'utf8');
}

async function assertConditionalBayesKnowledge(slug) {
  const text = await readKnowledge(slug);
  assert.match(text, /^type:\s*concept$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|source page|page \d+/i);
  return text;
}

test('conditioning Knowledge owns conditional probability, partitions, and information protocols', async () => {
  const text = await assertConditionalBayesKnowledge('conditioning');
  assert.match(text, /P\(A\s*\|\s*B\)/);
  assert.match(text, /P\(A\s*(?:∩|intersection)\s*B\)|intersection probability/i);
  assert.match(text, /multiplication rule/i);
  assert.match(text, /chain rule/i);
  assert.match(text, /law of total probability/i);
  assert.match(text, /partition/i);
  assert.match(text, /observation protocol|information protocol/i);
  assert.match(text, /independence|independent/i);
  assert.match(text, /at least one child/i);
  assert.match(text, /randomly observed child|uniformly selected child/i);
  assert.match(text, /first[- ]step conditioning/i);
});

test('Bayes Knowledge owns priors, likelihoods, base rates, odds, and model ambiguity', async () => {
  const text = await assertConditionalBayesKnowledge('bayes-rule-base-rates');
  assert.match(text, /Bayes/i);
  assert.match(text, /prior/i);
  assert.match(text, /likelihood/i);
  assert.match(text, /evidence/i);
  assert.match(text, /posterior/i);
  assert.match(text, /posterior odds/i);
  assert.match(text, /prior odds/i);
  assert.match(text, /likelihood ratio/i);
  assert.match(text, /base[- ]rate/i);
  assert.match(text, /without (?:a )?prior|prior.*required|need.*prior/i);
  assert.match(text, /double-headed/i);
  assert.match(text, /P\(A\s*\|\s*B\)/);
  assert.match(text, /P\(B\s*\|\s*A\)/);
  assert.match(text, /2\^\{-?n\}|2\^-n|2\^{-n\}/i);
});

export { findKnowledge, readKnowledge, assertConditionalBayesKnowledge };
