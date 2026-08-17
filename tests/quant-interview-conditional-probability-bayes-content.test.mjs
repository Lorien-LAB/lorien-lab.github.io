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

async function assertConditionalBayesKnowledge(slug) {
  const text = await readKnowledge(slug);
  assert.match(text, /^type:\s*concept$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
  assert.match(text, /^## Interview Checks$/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Questions|Q3\.\d+|source page|page \d+/i);
  return text;
}

async function assertSourceNeutralSolvedProblem(slug, problemId) {
  const file = await findProblem(slug);
  const text = await readFile(file, 'utf8');
  assert.match(text, new RegExp(`^problemId:\\s*${problemId}$`, 'm'));
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
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

test('hidden coin posterior problem updates a general prior and exposes model ambiguity', async () => {
  const text = await assertSourceNeutralSolvedProblem('hidden-coin-posterior-after-heads', 'conditional-probability-bayes-001');
  assert.match(text, /π|pi/i);
  assert.match(text, /2\^\{-?n\}|2\^-n|2\^{-n\}/i);
  assert.match(text, /8\s*\/\s*17/);
  assert.match(text, /1024\s*\/\s*2023/);
  assert.match(text, /without (?:a )?prior|prior.*not.*specified|model class/i);
  assert.match(text, /posterior odds/i);
  assert.match(text, /^concepts:\s*\[conditioning, bayes-rule-base-rates\]$/m);
});

test('two-child problem makes the information-generation protocol part of the model', async () => {
  const text = await assertSourceNeutralSolvedProblem('two-children-information-protocol', 'conditional-probability-bayes-002');
  assert.match(text, /1\s*\/\s*3/);
  assert.match(text, /1\s*\/\s*2/);
  assert.match(text, /at least one/i);
  assert.match(text, /eldest|older/i);
  assert.match(text, /uniformly selected|randomly selected|randomly observed/i);
  assert.match(text, /named|name/i);
  assert.match(text, /protocol|information generation|observation mechanism/i);
  assert.match(text, /not uniquely|not enough information|model-dependent|depends on/i);
  assert.match(text, /^concepts:\s*\[conditioning\]$/m);
});

test('Monty Hall problem states the informed-host policy before the 2/3 switch result', async () => {
  const text = await assertSourceNeutralSolvedProblem('monty-hall-switching', 'conditional-probability-bayes-003');
  assert.match(text, /1\s*\/\s*3/);
  assert.match(text, /2\s*\/\s*3/);
  assert.match(text, /host.*knows|knows.*prize/i);
  assert.match(text, /always.*open|always.*reveal/i);
  assert.match(text, /always.*offer|offer.*switch/i);
  assert.match(text, /random.*open|uninformed/i);
  assert.match(text, /^concepts:\s*\[conditioning\]$/m);
});

test('Russian roulette problem conditions on survival before comparing spin and no-spin actions', async () => {
  const text = await assertSourceNeutralSolvedProblem('russian-roulette-after-survival', 'conditional-probability-bayes-004');
  assert.match(text, /1\s*\/\s*3/);
  assert.match(text, /1\s*\/\s*4/);
  assert.match(text, /adjacent|consecutive/i);
  assert.match(text, /condition.*surviv|surviv.*condition/i);
  assert.match(text, /do not spin|don't spin/i);
  assert.match(text, /four.*empty|4.*empty/i);
  assert.match(text, /^concepts:\s*\[conditioning\]$/m);
});

test('candies problem conditions on mutually exclusive last-color orderings and obtains 7/12', async () => {
  const text = await assertSourceNeutralSolvedProblem('candies-last-color-ordering', 'conditional-probability-bayes-005');
  assert.match(text, /T_r/);
  assert.match(text, /T_b/);
  assert.match(text, /T_g/);
  assert.match(text, /7\s*\/\s*12/);
  assert.match(text, /30\s*\/\s*60/);
  assert.match(text, /20\s*\/\s*30/);
  assert.match(text, /20\s*\/\s*60/);
  assert.match(text, /30\s*\/\s*40/);
  assert.match(text, /mutually exclusive/i);
  assert.match(text, /^concepts:\s*\[conditioning\]$/m);
});

test('golden-face problem reweights latent objects after conditioning on the observed face', async () => {
  const text = await assertSourceNeutralSolvedProblem('golden-face-posterior', 'conditional-probability-bayes-006');
  assert.match(text, /GG/);
  assert.match(text, /GB/);
  assert.match(text, /BB/);
  assert.match(text, /2\s*\/\s*3/);
  assert.match(text, /visible.*face|observed.*face/i);
  assert.match(text, /selection.*bias|size[- ]bias|reweight/i);
  assert.match(text, /^concepts:\s*\[conditioning, bayes-rule-base-rates\]$/m);
});

export { findKnowledge, findProblem, readKnowledge, assertConditionalBayesKnowledge, assertSourceNeutralSolvedProblem };
