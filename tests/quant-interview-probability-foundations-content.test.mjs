import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findKnowledge(slug) {
  const files = await readdir('src/content/knowledge', { recursive: true });
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing knowledge ${slug}`);
  return `src/content/knowledge/${match}`;
}

async function findProblem(slug) {
  const files = await readdir('src/content/problems', { recursive: true });
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing problem ${slug}`);
  return `src/content/problems/${match}`;
}

async function assertSourceNeutralSolvedProblem(slug, problemId) {
  const file = await findProblem(slug);
  const text = await readFile(file, 'utf8');
  assert.match(text, new RegExp(`^problemId:\\s*${problemId}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /^status:\s*solved$/m);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.match(text, /<summary>Show Solution<\/summary>/);
  assert.match(text, /^## Why This Problem Matters$/m);
  assert.match(text, /^## Common Mistakes$/m);
  assert.match(text, /^## Extensions & Variants$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|First Look/i);
}

test('probability spaces Knowledge owns source-derived event and set language', async () => {
  const file = await findKnowledge('probability-spaces-events');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  for (const pattern of [/sample space/i, /event/i, /union/i, /intersection/i, /complement/i, /mutually exclusive/i, /indicator/i]) assert.match(text, pattern);
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /^## (?:Expectation|Conditional Probability|Bayes)/mi);
});

test('probability axioms Knowledge derives event rules and distinguishes exclusivity from independence', async () => {
  const file = await findKnowledge('probability-axioms-derived-rules');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /P\(Omega\)\s*=\s*1/i);
  assert.match(text, /countable additivity|pairwise disjoint/i);
  assert.match(text, /P\(A\^c\)\s*=\s*1\s*-\s*P\(A\)/i);
  assert.match(text, /P\(A union B\).*P\(A intersection B\)/i);
  assert.match(text, /independent/i);
  assert.match(text, /mutually exclusive/i);
  assert.match(text, /positive probability/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('symmetry geometric probability Knowledge unifies finite and continuous uniform models', async () => {
  const file = await findKnowledge('symmetry-equiprobability-geometric-probability');
  const text = await readFile(file, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  assert.match(text, /equiprobable/i);
  assert.match(text, /symmetry/i);
  assert.match(text, /tie/i);
  assert.match(text, /unit square|area/i);
  assert.match(text, /uniform in a disk|area-uniform/i);
  assert.match(text, /fourth business day|weekday/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('extra coin comparison is one canonical source-neutral problem', async () => {
  await assertSourceNeutralSolvedProblem('more-heads-with-one-extra-coin', 'probability-foundations-001');
  const text = await readFile(await findProblem('more-heads-with-one-extra-coin'), 'utf8');
  assert.match(text, /2p\s*\+\s*q\s*=\s*1/i);
  assert.match(text, /p\s*\+\s*q\s*\/\s*2\s*=\s*1\s*\/\s*2/i);
});

test('higher card comparison removes ties before symmetry', async () => {
  await assertSourceNeutralSolvedProblem('higher-card-by-symmetry', 'probability-foundations-002');
  const text = await readFile(await findProblem('higher-card-by-symmetry'), 'utf8');
  assert.match(text, /3\s*\/\s*51/);
  assert.match(text, /8\s*\/\s*17/);
});

test('displaced passenger problem resolves through two special seats', async () => {
  await assertSourceNeutralSolvedProblem('drunk-passenger-last-seat', 'probability-foundations-003');
  const text = await readFile(await findProblem('drunk-passenger-last-seat'), 'utf8');
  assert.match(text, /seat 1|first passenger.?s seat/i);
  assert.match(text, /last passenger.?s seat|last seat/i);
  assert.match(text, /1\s*\/\s*2/);
});

test('semicircle problem uses mutually exclusive candidate starts', async () => {
  await assertSourceNeutralSolvedProblem('random-points-in-a-semicircle', 'probability-foundations-004');
  const text = await readFile(await findProblem('random-points-in-a-semicircle'), 'utf8');
  assert.match(text, /N\s*\/\s*2\^?\(?N-1\)?|N\s*\/\s*2\s*\*\*/i);
  assert.match(text, /mutually exclusive|disjoint/i);
  assert.match(text, /N\s*x\^?\(?N-1\)?/i);
});

test('minimum trial problem uses complement and independence and returns 149', async () => {
  await assertSourceNeutralSolvedProblem('minimum-trials-for-at-least-one-hit', 'probability-foundations-005');
  const text = await readFile(await findProblem('minimum-trials-for-at-least-one-hit'), 'utf8');
  assert.match(text, /1\s*-\s*0\.98\^N/i);
  assert.match(text, /149/);
  assert.match(text, /independ/i);
});

test('meeting problem converts arrival times to unit-square geometry', async () => {
  await assertSourceNeutralSolvedProblem('romeo-juliet-meeting-probability', 'probability-foundations-006');
  const text = await readFile(await findProblem('romeo-juliet-meeting-probability'), 'utf8');
  assert.match(text, /\|x-y\|\s*<=\s*1\/4|\|x-y\|\s*≤\s*1\/4/);
  assert.match(text, /7\s*\/\s*16/);
  assert.match(text, /unit square/i);
});

export { findKnowledge, findProblem, assertSourceNeutralSolvedProblem };
