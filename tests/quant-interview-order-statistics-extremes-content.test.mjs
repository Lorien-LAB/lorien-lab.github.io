import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, order-statistics-extremes\]$/m;

function assertS3(text, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, topicLine);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) assert.ok(text.includes(heading), `${id} missing ${heading}`);
  assert.ok((text.match(/<details>/g) ?? []).length >= 2, `${id} needs two hints`);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|source page|PDF page|source item/i);
}

test('order statistics basics contains max min kth and Beta identities', async () => {
  const text = await read('src/content/knowledge/concepts/order-statistics-basics.md');
  assert.match(text, topicLine);
  assert.match(text, /F\(x\)\^n|F\(x\).*n/);
  assert.match(text, /1-\[1-F\(x\)\]\^n|minimum CDF/i);
  assert.match(text, /kth Order Statistic/i);
  assert.match(text, /Beta\(k,n\+1-k\)|Beta/i);
  assert.match(text, /k\/(n\+1)|k.*n\+1/);
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /Brownian/i);
});

test('joint extremes Knowledge contains joint density range and dependence boundary', async () => {
  const text = await read('src/content/knowledge/concepts/joint-extremes-and-range.md');
  assert.match(text, topicLine);
  assert.match(text, /n\(n-1\)|joint density/i);
  assert.match(text, /n-1.*n\+1|range/i);
  assert.match(text, /YZ=X_1X_2|product identity/i);
  assert.match(text, /marginal.*not.*enough|not.*enough.*covariance/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('uniform extrema Problem derives max min and range expectations', async () => {
  const text = await read('src/content/problems/probability/uniform-sample-extremes-and-range.md');
  assertS3(text, 'order-statistics-extremes-001');
  assert.match(text, /x\^n/);
  assert.match(text, /n\/(n\+1)|n.*n\+1/);
  assert.match(text, /1\/(n\+1)|1.*n\+1/);
  assert.match(text, /n-1.*n\+1|range/i);
});

test('joint min max Problem derives correlation one half', async () => {
  const text = await read('src/content/problems/probability/joint-min-max-correlation-of-uniforms.md');
  assertS3(text, 'order-statistics-extremes-002');
  assert.match(text, /1\/36/);
  assert.match(text, /1\/18/);
  assert.match(text, /1\/2/);
  assert.match(text, /YZ=X_1X_2|YZ.*X_1X_2/);
});

test('random ants Problem reduces collision dynamics to a Uniform maximum', async () => {
  const text = await read('src/content/problems/probability/random-ants-last-fall-time.md');
  assertS3(text, 'order-statistics-extremes-003');
  assert.match(text, /ghost/i);
  assert.match(text, /identity|label/i);
  assert.match(text, /T_n=.*max|max\(D_1/i);
  assert.match(text, /n\/(n\+1)|n.*n\+1/);
  assert.match(text, /500\/501/);
  assert.match(text, /ants-crossing-line/);
});

test('kth order statistic Problem derives CDF PDF and Beta representation', async () => {
  const text = await read('src/content/problems/probability/kth-order-statistic-distribution.md');
  assertS3(text, 'order-statistics-extremes-004');
  assert.match(text, /Binomial/i);
  assert.match(text, /j=k|at least.*k/i);
  assert.match(text, /n!|factorial|\(k-1\)!/i);
  assert.match(text, /Beta\(k,n\+1-k\)|Beta/i);
  assert.match(text, /k\/(n\+1)|k.*n\+1/);
});

test('existing ant puzzle remains a distinct invariance Problem', async () => {
  const text = await read('src/content/problems/logic/ants-crossing-line.md');
  assert.match(text, /^problemId:\s*logic-invariance-001$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[logic-brainteasers-discrete-reasoning, invariants-state-transformations\]$/m);
  assert.match(text, /identity-swapping-invariance/);
});
