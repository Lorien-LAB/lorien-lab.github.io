import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('order statistics extremes workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.match(workstream.status, /^(?:active|complete)$/);
  if (workstream.status === 'active') {
    assert.equal(workstream.verification, undefined);
    return;
  }
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records workstream 010 and advances to random walks and Markov chains', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  if (workstream.status === 'active') {
    assert.doesNotMatch(handoff, /probability-statistics-order-statistics-extremes-010/);
    return;
  }
  assert.match(handoff, /probability-statistics-order-statistics-extremes-010/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
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

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Stochastic Processes & Stochastic Calculus/i);
  assert.match(nextAction, /Random Walks & Markov Chains/i);
  assert.doesNotMatch(nextAction, /Order Statistics & Extremes[\s\S]{0,180}(?:execute|next|continue|current bounded topic)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
