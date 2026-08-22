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

async function assertSourceNeutralSolvedProblem(slug, problemId) {
  const file = await findProblem(slug);
  const text = await readFile(file, 'utf8');
  assert.match(text, new RegExp(`^problemId:\\s*${problemId}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, combinatorial-probability\]$/m);
  assert.match(text, /^status:\s*solved$/m);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.match(text, /<summary>Hint 1<\/summary>/);
  assert.match(text, /<summary>Hint 2<\/summary>/);
  assert.match(text, /<summary>Show Solution<\/summary>/);
  assert.match(text, /^## Solution$/m);
  assert.match(text, /^## Why This Problem Matters$/m);
  assert.match(text, /^## Common Mistakes$/m);
  assert.match(text, /^## Extensions & Variants$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|First Look|source page|page \d+/i);
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

test('poker hand probabilities use one consistent unordered sample space', async () => {
  const text = await assertSourceNeutralSolvedProblem('poker-hand-probabilities', 'combinatorial-probability-001');
  assert.match(text, /C\(52,5\)/);
  assert.match(text, /624/);
  assert.match(text, /3744/);
  assert.match(text, /123552/);
  assert.match(text, /four of a kind/i);
  assert.match(text, /full house/i);
  assert.match(text, /two pairs?/i);
});

test('knockout final problem reduces the bracket to relative placement', async () => {
  const text = await assertSourceNeutralSolvedProblem('top-two-meet-in-knockout-final', 'combinatorial-probability-002');
  assert.match(text, /N\s*=\s*2\^n|N\s*=\s*2\*\*n/i);
  assert.match(text, /opposite half/i);
  assert.match(text, /N\s*\/\s*\(?2\s*\*\s*\(?N\s*-\s*1\)?\)?|2\^\(n-1\)\s*\/\s*\(2\^n\s*-\s*1\)/i);
});

test('five-letter misaddressing problem derives the five-object derangement probability', async () => {
  const text = await assertSourceNeutralSolvedProblem('five-letters-all-misaddressed', 'combinatorial-probability-003');
  assert.match(text, /derangement/i);
  assert.match(text, /44/);
  assert.match(text, /120/);
  assert.match(text, /11\s*\/\s*30/);
  assert.match(text, /inclusion-exclusion/i);
});

test('birthday collision threshold uses the no-collision complement and finds 23', async () => {
  const text = await assertSourceNeutralSolvedProblem('birthday-collision-threshold', 'combinatorial-probability-004');
  assert.match(text, /no collision|all birthdays.*distinct/i);
  assert.match(text, /365\s*\/\s*365/);
  assert.match(text, /364\s*\/\s*365/);
  assert.match(text, /23/);
  assert.match(text, /greater than 1\s*\/\s*2|>\s*1\s*\/\s*2/i);
});

test('no-consecutive-heads problem connects valid strings to Fibonacci counting', async () => {
  const text = await assertSourceNeutralSolvedProblem('no-consecutive-heads-in-n-tosses', 'combinatorial-probability-005');
  assert.match(text, /a_n\s*=\s*a_\{?n-1\}?\s*\+\s*a_\{?n-2\}?/i);
  assert.match(text, /a_0\s*=\s*1/i);
  assert.match(text, /a_1\s*=\s*2/i);
  assert.match(text, /F_\{?n\+2\}?/i);
  assert.match(text, /2\^n|2\*\*n/i);
});

test('random subset containment uses four elementwise membership states', async () => {
  const text = await assertSourceNeutralSolvedProblem('random-subsets-containment-probability', 'combinatorial-probability-006');
  assert.match(text, /\(0,0\)/);
  assert.match(text, /\(0,1\)/);
  assert.match(text, /\(1,0\)/);
  assert.match(text, /\(1,1\)/);
  assert.match(text, /forbid|forbidden/i);
  assert.match(text, /\(3\s*\/\s*4\)\^n|\(3\/4\)\^n/i);
});

export { findKnowledge, findProblem, assertCombinatorialKnowledge, assertSourceNeutralSolvedProblem };
