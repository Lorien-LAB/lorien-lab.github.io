import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-problem-simplification-018.json';
const workflow = '.github/workflows/quant-interview-problem-simplification-018-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const activeSha = 'f63bf8529e1833f2e122c59cc29dc44843168edc';
const runId = 33305049381;
const ciUrl = 'https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33305049381';
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Problem Simplification.**

Workstream 018 is active across the exact eleven-record cross-book Problem Simplification scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 018 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 019 is not active or authorized by this closure.`;
const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'im'))[1]?.split(/^## /m)[0] ?? '';
const currentBlock = (handoff) => handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0]?.trim() ?? '';

test('018 lifecycle is evidence-free while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([readFile(manifestPath, 'utf8').then(JSON.parse), readFile('docs/quant-interview/HANDOFF.md', 'utf8')]);
  assert.match(manifest.status, /^(?:active|complete)$/);
  if (manifest.status === 'active') {
    for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) assert.equal(field in manifest, false);
    assert.equal(currentBlock(handoff), activeCurrent);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 18$/m);
    assert.match(handoff, /First pending master record after the active 018 scope: `green-book::2\.2::theory`/i);
    return;
  }
  const { preClosureActiveGate: gate, verification, finalTreeGate } = manifest;
  assert.deepEqual(gate, {
    status: 'active', commit: activeSha, environment: 'wsl-native-lf-node24',
    commands, conclusion: 'success',
  });
  assert.deepEqual(verification, {
    commit: activeSha, runId, commands, conclusion: 'success',
    temporaryArtifacts: [workflow],
  });
  assert.deepEqual(finalTreeGate, { environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true });
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  const closure = section(handoff, 'Completed cross-book workstream 18');
  for (const fact of [activeSha, String(runId), ciUrl]) assert.ok(closure.includes(fact));
  assert.match(handoff, /First pending master record: `green-book::2\.2::theory`/i);
});

test('018 alone advances the exact public and master contracts without 019', async () => {
  const directory = JSON.parse(await readFile('src/data/quant-interview/master-directory.json', 'utf8'));
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  assert.equal(terminal, 239);
  assert.equal(directory.items.length - terminal, 511);
  const workstreams = await readdir('src/data/quant-interview/workstreams');
  assert.equal(workstreams.some((file) => /-019\.json$/.test(file)), false);
});

test('018 final tree is complete and workflow-free', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.equal(manifest.status, 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  assert.equal(currentBlock(handoff), completeCurrent);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
});
