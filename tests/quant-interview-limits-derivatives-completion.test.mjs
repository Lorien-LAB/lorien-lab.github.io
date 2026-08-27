import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const workflowName = 'quant-interview-limits-derivatives-012-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const expectedActiveCommit = "666cacb1b4832b5aab43c8f146696a4681425f76";
const expectedRunId = 32807218682;
const expectedEnvironment = "wsl-native-lf-node24";
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function handoffSection(handoff, heading) {
  return handoff.split(new RegExp(`## ${heading}`, 'i'))[1]?.split(/\n## /)[0] ?? '';
}

test('012 completion contract is phase-safe and pins factual active-gate evidence', async () => {
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

  assert.equal(workstream.status, 'complete');
  const currentTitle = current.split(/\r?\n/).find((line) => /\*\*/.test(line)) ?? '';
  assert.deepEqual(workstream.preClosureActiveGate, {
    commit: expectedActiveCommit,
    environment: expectedEnvironment,
    commands,
    conclusion: 'success',
  });
  assert.deepEqual(workstream.verification, {
    commit: expectedActiveCommit,
    runId: expectedRunId,
    commands,
    conclusion: 'success',
  });
  assert.equal(workstream.verification.commit, workstream.preClosureActiveGate.commit);
  assert.match(workstream.preClosureActiveGate.commit, /^[0-9a-f]{40}$/);
  assert.match(workstream.preClosureActiveGate.environment, /^(?:linux-native-lf-node24|wsl-native-lf-node24)$/);
  assert.ok(Number.isInteger(workstream.verification.runId) && workstream.verification.runId > 0);

  const closure = handoffSection(handoff, 'Completed cross-book workstream 12');
  assert.match(closure, new RegExp(expectedActiveCommit));
  assert.match(closure, new RegExp(String(expectedRunId)));
  assert.match(closure, new RegExp(expectedEnvironment));
  assert.match(closure, new RegExp('head_sha[^\\n]*' + expectedActiveCommit, 'i'));
  assert.match(closure, /Ubuntu[^\n]*Node 24|Node 24[^\n]*Ubuntu/i);
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.ok(commandPositions.every((position) => position >= 0));
  assert.ok(commandPositions.every((position, index) => index === 0 || position > commandPositions[index - 1]));
  assert.match(closure, /conclusion[^\n]*success/i);
  assert.match(closure, /76[^\n]*canonical Problems[^\n]*48[^\n]*explicitly topic-classified Knowledge/i);
  assert.match(closure, /20[^\n]*12[^\n]*canonical-problem[^\n]*6[^\n]*merged-duplicate[^\n]*2[^\n]*knowledge-only/i);
  assert.match(closure, /Green[^\n]*4[^\n]*Red[^\n]*10[^\n]*150[^\n]*6/i);
  assert.match(closure, /red-book::6\.2\.2[^\n]*limits-derivatives[^\n]*integration/i);
  assert.match(closure, /red-book::6\.3\.2[^\n]*limits-derivatives[^\n]*integration/i);
  assert.doesNotMatch(currentTitle, /Limits & Derivatives/i);
  assert.match(reservation012, /\|\s*complete\s*\|/i);
  assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
  assert.doesNotMatch(coordination, /remaining integration queue[^\n]*012/i);
  const workstream013 = await readJson(workstream013Path);
  assert.match(workstream013.status, /^(?:active|complete)$/);
  if (workstream013.status === 'active') {
    assert.match(current, /Interview Strategy & Communication/i);
    assert.match(current, /Reasoning & Communication/i);
    assert.match(coordination, /remaining integration queue[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^\n]*013/i);
  } else {
    assert.equal(workstream013.status, 'complete');
    assert.match(current, /No bounded topic is active.*011.*012.*013.*queue is closed/is);
    assert.match(current, /A later workstream requires its own approved design and evidence audit/i);
    assert.doesNotMatch(coordination, /remaining integration queue[^\n]*013/i);
    assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012[^\n]*013/i);
  }
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
