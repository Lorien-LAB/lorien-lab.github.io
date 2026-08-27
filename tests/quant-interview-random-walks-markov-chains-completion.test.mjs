import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('workstream 011 closes only with real exact verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('HANDOFF records exact 011 closure and advances only to 012', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  if (workstream.status !== 'complete') {
    assert.equal(workstream.status, 'active');
    return;
  }
  assert.match(handoff, /stochastic-processes-random-walks-markov-chains-011/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'finite-state-markov-chains',
    'markov-chain-state-compression',
    'twelve-before-consecutive-sevens',
    'coin-pattern-hitting-times',
    'random-recoloring-consensus-time',
    'random-walk-return-time-on-cube',
    'random-walk-boundary',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /8[^\n]*(?:terminal|claimed|coverage|source)/i);
  assert.match(handoff, /5[^\n]*canonical-problem/i);
  assert.match(handoff, /2[^\n]*merged-duplicate/i);
  assert.match(handoff, /1[^\n]*knowledge-only/i);
  assert.match(handoff, /63 canonical Problems/i);
  assert.match(handoff, /41 explicitly topic-classified|41 topic-classified/i);
  assert.match(handoff, /150[^\n]*(?:reviewed-no-new-ownership|no new ownership|no new coverage)/i);
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
  const workstream012 = await readJson(
    'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json',
  );
  assert.match(workstream012.status, /^(?:active|complete)$/);
  if (workstream012.status === 'active') {
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
  } else {
    assert.match(workstream012.preClosureActiveGate?.commit ?? '', /^[0-9a-f]{40}$/);
    assert.equal(workstream012.verification?.commit, workstream012.preClosureActiveGate.commit);
    assert.ok(Number.isInteger(workstream012.verification?.runId) && workstream012.verification.runId > 0);
    assert.match(handoff, new RegExp(workstream012.verification.commit));
    assert.match(handoff, new RegExp(String(workstream012.verification.runId)));
    assert.match(handoff, /76[^\n]*Problems[^\n]*48[^\n]*Knowledge/i);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
    const workstream013 = await readJson(
      'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json',
    );
    if (workstream013.status === 'active') {
      assert.match(current, /Interview Strategy & Communication/i);
      assert.match(current, /Reasoning & Communication/i);
      assert.match(coordination, /remaining integration queue[^\n]*013/i);
    } else {
      assert.equal(workstream013.status, 'complete');
      assert.match(current, /No bounded topic is active.*011.*012.*013.*queue is closed/is);
      assert.match(current, /A later workstream requires its own approved design and evidence audit/i);
      assert.doesNotMatch(coordination, /remaining integration queue[^\n]*013/i);
      assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012[^\n]*013/i);
    }
  }
});

test('temporary 011 CI is absent from the completed tree', async () => {
  await assert.rejects(access('.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'));
});
