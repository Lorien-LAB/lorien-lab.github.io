import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, expectation-variance-covariance\]$/m;

function assertInterviewChecks(text, id) {
  assert.match(text, /^## Interview Checks$/m, `${id} missing Interview Checks`);
}

function assertS3(text, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, topicLine);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(text.includes(heading), `${id} missing ${heading}`);
  }
  assert.ok((text.match(/<details>/g) ?? []).length >= 2, `${id} needs two progressive hints`);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|source page|PDF page|source item/i);
}

test('expectation Knowledge separates linearity from independence', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-linearity-indicators.md');
  assert.match(text, topicLine);
  assert.match(text, /discrete.*expectation|sum.*x.*P/i);
  assert.match(text, /continuous.*expectation|integral/i);
  assert.match(text, /LOTUS|E\[g\(X\)\]/i);
  assert.match(text, /linearity/i);
  assert.match(text, /does not require independence|without.*independence/i);
  assert.match(text, /E\[I|indicator/i);
  assert.match(text, /E\[XY\]|product.*expectation/i);
  assert.match(text, /existence|finite expectation/i);
  assertInterviewChecks(text, 'expectation-linearity-indicators');
  assert.match(text, /fair die|six-sided die/i);
  assert.match(text, /overlap|dependent indicator/i);
});

test('conditional expectation Knowledge teaches total expectation and tower property', async () => {
  const text = await read('src/content/knowledge/concepts/conditional-expectation-tower-property.md');
  assert.match(text, topicLine);
  assert.match(text, /E\[X\s*\|\s*A\]|conditional expectation/i);
  assert.match(text, /E\[X\s*\|\s*Y\]/i);
  assert.match(text, /law of total expectation|total expectation/i);
  assert.match(text, /tower property/i);
  assert.match(text, /E\[E\[X.*Y.*\]\].*E\[X\]|E\[X\].*tower/i);
  assert.match(text, /first-step|recurs/i);
  assert.match(text, /Markov|stochastic process/i);
  assertInterviewChecks(text, 'conditional-expectation-tower-property');
});

test('variance covariance Knowledge owns scalar algebra but not matrix PSD', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-variance-covariance-algebra.md');
  assert.match(text, topicLine);
  assert.match(text, /Var\(X\).*E\[X\^2\]|E\[X\^2\].*E\[X\]/i);
  assert.match(text, /Cov\(X,Y\)|Cov\(X,\s*Y\)/i);
  assert.match(text, /E\[XY\].*E\[X\].*E\[Y\]/i);
  assert.match(text, /bilinear|bilinearity/i);
  assert.match(text, /Var\(X\+Y\)|2.*Cov/i);
  assert.match(text, /independ.*zero covariance|zero covariance.*independ/i);
  assert.match(text, /does not imply independence|not.*converse/i);
  assert.match(text, /correlation/i);
  assert.match(text, /matrix|PSD|positive semidefinite/i);
  assertInterviewChecks(text, 'expectation-variance-covariance-algebra');
});

test('moments MGF Knowledge includes existence conditions and Normal example', async () => {
  const text = await read('src/content/knowledge/concepts/moments-moment-generating-functions.md');
  assert.match(text, topicLine);
  assert.match(text, /raw moment/i);
  assert.match(text, /central moment/i);
  assert.match(text, /M_X|moment generating function|MGF/i);
  assert.match(text, /derivative|M_X.*0/i);
  assert.match(text, /neighborhood.*zero|exist.*near.*zero/i);
  assert.match(text, /Cauchy/i);
  assert.match(text, /Normal|Gaussian/i);
  assertInterviewChecks(text, 'moments-moment-generating-functions');
});

test('pattern-count Problem uses indicators without requiring independence', async () => {
  const text = await read('src/content/problems/probability/expected-pattern-count-by-indicators.md');
  assertS3(text, 'expectation-variance-covariance-001');
  assert.match(text, /indicator/i);
  assert.match(text, /overlap/i);
  assert.match(text, /does not require independence|linearity.*independ/i);
  assert.match(text, /n\s*-\s*m\s*\+\s*1|starting positions/i);
});

test('first-special Problem derives the general expected position', async () => {
  const text = await read('src/content/problems/probability/expected-position-of-first-special-card.md');
  assertS3(text, 'expectation-variance-covariance-002');
  assert.match(text, /1\s*\+\s*m\s*\/\s*\(n\s*\+\s*1\)|m\+n\+1/i);
  assert.match(text, /10\.6/);
  assert.match(text, /symmetr|indicator/i);
});

test('coupon collector Problem contains both canonical expectations', async () => {
  const text = await read('src/content/problems/probability/coupon-collector-expectations.md');
  assertS3(text, 'expectation-variance-covariance-003');
  assert.match(text, /H_N|harmonic/i);
  assert.match(text, /N.*H_N|N H_N/i);
  assert.match(text, /1\s*-\s*\(1\s*-\s*1\s*\/\s*N\).*k|distinct/i);
  assert.match(text, /geometric/i);
  assert.match(text, /indicator/i);
});

test('fair-box Problem derives the general fair price and explains stopping boundary', async () => {
  const text = await read('src/content/problems/probability/fair-box-opening-price-by-expectation.md');
  assertS3(text, 'expectation-variance-covariance-012');
  assert.match(text, /\(n\s*\+\s*1\)\s*\/\s*2/);
  assert.match(text, /2\s*V\s*\/\s*\(n\s*\+\s*1\)|fair/i);
  assert.match(text, /continue|continuation/i);
  assert.match(text, /optimal stopping/i);
});

test('recursive dice Problem solves a fixed-point expectation with value seven', async () => {
  const text = await read('src/content/problems/probability/recursive-dice-game-expected-payoff.md');
  assertS3(text, 'expectation-variance-covariance-004');
  assert.match(text, /self-consistency|fixed-point|recurs/i);
  assert.match(text, /7/);
  assert.match(text, /conditional-dice-expectation|one-step/i);
});

test('random-pairing Problem derives the odd-harmonic expectation recurrence', async () => {
  const text = await read('src/content/problems/probability/expected-loops-from-random-pairings.md');
  assertS3(text, 'expectation-variance-covariance-005');
  assert.match(text, /E_n|E\[.*n.*\]/i);
  assert.match(text, /2n\s*-\s*1|2\s*n\s*-\s*1/i);
  assert.match(text, /1\/3|odd.*harmonic|sum/i);
  assert.match(text, /n\s*-\s*1|smaller/i);
});

test('geometric moment Problem derives mean and variance by two routes', async () => {
  const text = await read('src/content/problems/probability/geometric-waiting-time-mean-variance.md');
  assertS3(text, 'expectation-variance-covariance-006');
  assert.match(text, /1\s*\/\s*p/);
  assert.match(text, /1\s*-\s*p.*p\^?2|variance/i);
  assert.match(text, /series|generating/i);
  assert.match(text, /first-step|recurs/i);
});
