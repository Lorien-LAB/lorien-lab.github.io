import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const expectedCommit = '2a7c7c7e245e9d6c4959640394e28eb0d2f2edf5';
const expectedRunId = 32633618700;

test('order statistics extremes workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.equal(workstream.verification?.commit, expectedCommit);
  assert.equal(workstream.verification?.runId, expectedRunId);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records workstream 010 as durable history', async () => {
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /probability-statistics-order-statistics-extremes-010/);
  assert.match(handoff, new RegExp(expectedCommit));
  assert.match(handoff, new RegExp(String(expectedRunId)));
  for (const slug of [
    'order-statistics-basics',
    'joint-extremes-and-range',
    'uniform-sample-extremes-and-range',
    'joint-min-max-correlation-of-uniforms',
    'random-ants-last-fall-time',
    'kth-order-statistic-distribution',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /5[^\n]*(?:claimed|terminal|source|coverage)/i);
  assert.match(handoff, /4[^\n]*canonical-problem/i);
  assert.match(handoff, /1[^\n]*merged-duplicate/i);
  assert.match(handoff, /59 canonical Problems/i);
  assert.match(handoff, /39 explicitly topic-classified|39 topic-classified/i);
  assert.match(handoff, /Random Ants|collision relabeling/i);
  assert.match(handoff, /150[^\n]*(?:no new|no independent|no.*ownership)/i);

  assert.match(handoff, /Historical transition marker:[^\n]*Order Statistics & Extremes[^\n]*fully closed/i);
  assert.match(handoff, /does not authorize reopening|records lineage only/i);
});
