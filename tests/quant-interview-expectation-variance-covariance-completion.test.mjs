import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('expectation variance covariance workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.equal(workstream.verification?.commit, '19064a55b4bbc6b7136b0494b0002e6c1113ca70');
  assert.equal(workstream.verification?.runId, 32509048173);
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records workstream 009 and advances to order statistics extremes', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /probability-statistics-expectation-variance-covariance-009/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'expectation-linearity-indicators',
    'conditional-expectation-tower-property',
    'expectation-variance-covariance-algebra',
    'moments-moment-generating-functions',
    'expected-pattern-count-by-indicators',
    'expected-position-of-first-special-card',
    'coupon-collector-expectations',
    'recursive-dice-game-expected-payoff',
    'expected-loops-from-random-pairings',
    'geometric-waiting-time-mean-variance',
    'normal-mgf-and-moments',
    'expected-normal-cdf-of-normal-variable',
    'optimal-hedge-ratio-by-variance-minimization',
    'bernoulli-default-correlation-bounds',
    'expected-radius-of-uniform-disk-point',
    'fair-box-opening-price-by-expectation',
    'multiplicative-wealth-expected-growth',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /18[^\n]*(?:claimed|terminal|source|coverage)/i);
  assert.match(handoff, /55 canonical Problems/i);
  assert.match(handoff, /37 explicitly topic-classified|37 topic-classified/i);
  assert.match(handoff, /indicator/i);
  assert.match(handoff, /tower property|conditional expectation/i);
  assert.match(handoff, /scalar covariance|variance.*covariance/i);
  assert.match(handoff, /order statistics/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Probability & Statistics/i);
  assert.match(nextAction, /Order Statistics & Extremes/i);
  assert.doesNotMatch(nextAction, /Expectation, Variance & Covariance[\s\S]{0,180}(?:execute|next|continue)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
