import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-random-variables-distributions-008.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('random variables distributions workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, [
    'npm run test',
    'npm run check',
    'npm run build',
  ]);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records workstream 008 and advances to expectation variance covariance', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');

  assert.match(handoff, /probability-statistics-random-variables-distributions-008/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'random-variables-cdf-pmf-pdf',
    'common-probability-distributions',
    'random-variable-transformations-convolution',
    'gaussian-lognormal-structure',
    'limit-theorems-lln-clt',
    'exponential-race-probability',
    'exponential-memoryless-bus-wait',
    'density-under-random-variable-transform',
    'sum-of-two-uniforms-triangular-density',
    'joint-normal-quadrant-conditioning',
    'when-is-a-product-lognormal',
  ]) assert.match(handoff, new RegExp(slug));

  assert.match(handoff, /14[^\n]*(?:claimed|terminal|source|coverage)/i);
  assert.match(handoff, /42 canonical Problems/i);
  assert.match(handoff, /33 explicitly topic-classified|33 topic-classified/i);
  assert.match(handoff, /memoryless/i);
  assert.match(handoff, /order statistics/i);
  assert.match(handoff, /normal moments|expectation-heavy/i);
  assert.match(handoff, /LLN|law of large numbers/i);
  assert.match(handoff, /CLT|central limit theorem/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Historical transition marker/i);
  assert.match(nextAction, /Expectation, Variance & Covariance/i);
  assert.doesNotMatch(nextAction, /Random Variables & Distributions[\s\S]{0,180}(?:execute|next|continue)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
