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

async function readKnowledge(slug) {
  return readFile(await findKnowledge(slug), 'utf8');
}

async function assertCombinatorialKnowledge(slug) {
  const text = await readKnowledge(slug);
  assert.match(text, /^type:\s*concept$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, combinatorial-probability\]$/m);
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|source page|page \d+/i);
  return text;
}

test('counting Knowledge separates ordered and unordered finite counting models', async () => {
  const text = await assertCombinatorialKnowledge('counting-permutations-combinations');
  assert.match(text, /product rule|multiplication principle/i);
  assert.match(text, /n!/i);
  assert.match(text, /n!\s*\/\s*\(n-r\)!|P\(n,r\)/i);
  assert.match(text, /C\(n,r\)|binomial coefficient/i);
  assert.match(text, /ordered/i);
  assert.match(text, /unordered/i);
  assert.match(text, /binomial theorem/i);
});

test('finite combinatorial probability Knowledge owns sampling, complements, and low-complexity source checks', async () => {
  const text = await assertCombinatorialKnowledge('finite-combinatorial-probability-modeling');
  assert.match(text, /favorable.*total|total.*favorable/i);
  assert.match(text, /equiprobable/i);
  assert.match(text, /with replacement/i);
  assert.match(text, /without replacement/i);
  assert.match(text, /complement/i);
  assert.match(text, /sock/i);
  assert.match(text, /ace/i);
  assert.match(text, /4\s*\/\s*52/i);
  assert.match(text, /3\s*\/\s*51/i);
});

test('inclusion-exclusion Knowledge derives derangements rather than memorizing one five-object answer', async () => {
  const text = await assertCombinatorialKnowledge('inclusion-exclusion-derangements');
  assert.match(text, /inclusion-exclusion/i);
  assert.match(text, /fixed point/i);
  assert.match(text, /derangement/i);
  assert.match(text, /n!.*sum|sum.*n!/i);
  assert.match(text, /44/);
  assert.match(text, /11\s*\/\s*30/);
});

export { findKnowledge, findProblem, assertCombinatorialKnowledge };
