import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019.json';
const workflow = '.github/workflows/quant-interview-logical-deduction-green-core-019-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const activeSha = 'b7a21f5beb17ceb3bb62875ee6736d9eaf651b92';
const runId = 33355185200;
const ciUrl = 'https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33355185200';
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 019 is active across the exact nine-record Green Book 2.2 core scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 019 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 020 is not active or authorized by this closure.`;

const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'im'))[1]?.split(/^## /m)[0] ?? '';
const currentBlock = (handoff) => handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0]?.trim() ?? '';

function assertLifecycleEvidence(manifest) {
  assert.match(manifest.status, /^(?:active|complete)$/);
  if (manifest.status === 'active') {
    for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) {
      assert.equal(field in manifest, false);
    }
    return;
  }

  const { preClosureActiveGate: gate, verification, finalTreeGate } = manifest;
  assert.deepEqual(gate, {
    status: 'active', commit: activeSha, environment: 'wsl-native-lf-node24', commands, conclusion: 'success',
  });
  assert.deepEqual(verification, {
    commit: activeSha, runId, commands, conclusion: 'success', temporaryArtifacts: [workflow],
  });
  assert.deepEqual(finalTreeGate, {
    environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true,
  });
}

test('completion evidence rejects extra fields while the active phase stays evidence-free', () => {
  assert.doesNotThrow(() => assertLifecycleEvidence({ status: 'active' }));
  const complete = {
    status: 'complete',
    preClosureActiveGate: {
      status: 'active', commit: activeSha, environment: 'wsl-native-lf-node24', commands, conclusion: 'success',
    },
    verification: {
      commit: activeSha, runId, commands, conclusion: 'success', temporaryArtifacts: [workflow],
    },
    finalTreeGate: {
      environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true,
    },
  };
  assert.doesNotThrow(() => assertLifecycleEvidence(complete));
  const mutated = structuredClone(complete);
  mutated.verification.unexpected = true;
  assert.throws(() => assertLifecycleEvidence(mutated), { name: 'AssertionError' });
});

test('019 lifecycle is evidence-free while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assertLifecycleEvidence(manifest);

  if (manifest.status === 'active') {
    assert.equal(currentBlock(handoff), activeCurrent);
    assert.match(handoff, /^## Active cross-book workstream 19$/m);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 19$/m);
    assert.match(handoff, /First pending master record after the active 019 scope: `green-book::2\.3::theory`/i);
    return;
  }

  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 19$/m);
  assert.match(handoff, /^## Completed cross-book workstream 19$/m);
  const closure = section(handoff, 'Completed cross-book workstream 19');
  for (const fact of [manifest.id, activeSha, String(runId), ciUrl]) {
    assert.ok(closure.includes(fact));
  }
  assert.match(handoff, /First pending master record: `green-book::2\.3::theory`/i);
});

test('019 advances the exact public and master contracts without 020', async () => {
  const [directory, generated, workstreams] = await Promise.all([
    readFile('src/data/quant-interview/master-directory.json', 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  assert.equal(terminal, 248);
  assert.equal(directory.items.length - terminal, 502);
  assert.match(generated, /Published Knowledge: 58/);
  assert.match(generated, /Canonical Problems: 86/);
  assert.match(generated, /Terminal master records: 248/);
  assert.match(generated, /Pending master records: 502/);
  assert.match(generated, /First pending: `green-book::2\.3::theory`/);
  assert.equal(workstreams.some((file) => /-020\.json$/.test(file)), false);
});

test('019 final tree is complete and workflow-free', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.equal(manifest.status, 'complete');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.match(handoff, /^## Completed cross-book workstream 19$/m);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 19$/m);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.match(handoff, /First pending master record: `green-book::2\.3::theory`/i);
});
