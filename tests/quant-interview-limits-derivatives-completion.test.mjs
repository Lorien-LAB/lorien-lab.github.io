import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const workflowName = 'quant-interview-limits-derivatives-012-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function handoffSection(handoff, heading) {
  return handoff.split(new RegExp(`## ${heading}`, 'i'))[1]?.split(/\n## /)[0] ?? '';
}

test('012 completion contract is phase-safe and serialized after completed 011', async () => {
  const workstream = await readJson(workstreamPath);
  const workstream011 = await readJson(workstream011Path);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const coordination = handoffSection(handoff, 'Parallel workstream coordination');
  const reservation012 = coordination.split(/\r?\n/).find((line) => /\|\s*012\s*\|/.test(line)) ?? '';

  assert.equal(workstream011.status, 'complete');
  assert.match(workstream.status, /^(?:active|complete)$/);
  if (workstream.status === 'active') {
    assert.equal(Object.hasOwn(workstream, 'preClosureActiveGate'), false);
    assert.equal(Object.hasOwn(workstream, 'verification'), false);
    assert.match(current, /Calculus & Differential Equations/i);
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication|Random Walks & Markov Chains/i);
    assert.match(reservation012, /\|\s*active\s*\|/i);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^.\n]*012/i);
    await assert.rejects(access(workstream013Path));
    return;
  }

  assert.fail('complete 012 must be sealed by the factual-constants branch in Task 18');
});

test('only the named 012 temporary workflow can exist before closure', async () => {
  const workstream = await readJson(workstreamPath);
  const workflowFiles = await readdir('.github/workflows');
  const candidates = workflowFiles.filter((file) => /(?:limits[-_]derivatives|012)/i.test(file));
  const alternates = candidates.filter((file) => file !== workflowName);
  assert.deepEqual(alternates, []);
  if (workstream.status === 'complete') assert.deepEqual(candidates, []);
});

export { commands };
