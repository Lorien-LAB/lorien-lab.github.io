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
const active020Current = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 020 is active across the exact eight-record Green Book 2.3 scope. Its public delta is +7 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const complete020Current = `**No bounded topic is active. Workstream 020 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 021 is not active or authorized by this closure.`;
const active021Current = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 021 is active across the exact six-record Red logical-foundations scope. Its public delta is +3 Problems / +0 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const complete021Current = `**No bounded topic is active. Workstream 021 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 022 is not active or authorized by this closure.`;

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

test('019 lifecycle is evidence-free while active and remains factually strict after 020 starts', async () => {
  const [manifest, handoff, workstreams] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    readdir('src/data/quant-interview/workstreams'),
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
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 19$/m);
  assert.match(handoff, /^## Completed cross-book workstream 19$/m);
  const closure = section(handoff, 'Completed cross-book workstream 19');
  for (const fact of [manifest.id, activeSha, String(runId), ciUrl]) {
    assert.ok(closure.includes(fact));
  }
  const workstream020File = workstreams.find((file) => /-020\.json$/.test(file));
  if (!workstream020File) {
    assert.equal(currentBlock(handoff), completeCurrent);
    assert.match(handoff, /First pending master record: `green-book::2\.3::theory`/i);
    return;
  }
  const workstream020 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream020File}`,
    'utf8',
  ));
  assert.match(workstream020.status, /^(?:active|complete)$/);
  if (workstream020.status === 'active') {
    assert.equal(workstreams.some((file) => /-021\.json$/.test(file)), false);
    assert.equal(currentBlock(handoff), active020Current);
    assert.match(handoff, /^## Active cross-book workstream 20$/m);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 20$/m);
    assert.match(handoff, /First pending master record after the active 020 scope: `red-book::8::theory`/i);
  } else {
    assert.match(handoff, /^## Completed cross-book workstream 20$/m);
    const workstream021File = workstreams.find((file) => /-021\.json$/.test(file));
    if (!workstream021File) {
      assert.equal(currentBlock(handoff), complete020Current);
      assert.match(handoff, /First pending master record: `red-book::8::theory`/i);
      return;
    }
    const workstream021 = JSON.parse(await readFile(
      `src/data/quant-interview/workstreams/${workstream021File}`,
      'utf8',
    ));
    assert.match(workstream021.status, /^(?:active|complete)$/);
    if (workstream021.status === 'active') {
      assert.equal(currentBlock(handoff), active021Current);
      assert.match(handoff, /^## Active cross-book workstream 21$/m);
      assert.match(handoff, /First pending master record after the active 021 scope: `red-book::8::8\.11`/i);
    } else {
      assert.equal(currentBlock(handoff), complete021Current);
      assert.match(handoff, /^## Completed cross-book workstream 21$/m);
      assert.match(handoff, /First pending master record: `red-book::8::8\.11`/i);
    }
    assert.match(handoff, /Workstream 022 is not active or authorized/i);
  }
});

test('019 exact corpus remains derivable after 020 advances current contracts', async () => {
  const [directory, generated, workstreams, catalog, problemFiles] = await Promise.all([
    readFile('src/data/quant-interview/master-directory.json', 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
    readdir('src/data/quant-interview/workstreams'),
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8').then(JSON.parse),
    readdir('src/content/problems', { recursive: true }),
  ]);
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  const workstream020File = workstreams.find((file) => /-020\.json$/.test(file));
  assert.ok(workstream020File);
  const workstream020 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream020File}`,
    'utf8',
  ));
  const workstream021File = workstreams.find((file) => /-021\.json$/.test(file));
  assert.ok(workstream021File);
  const workstream021 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream021File}`,
    'utf8',
  ));
  const currentProblemCount = problemFiles.filter((file) => String(file).endsWith('.md')).length;
  assert.equal(currentProblemCount - workstream020.publicDelta.problems - workstream021.publicDelta.problems, 86);
  assert.equal(catalog.modules.length - workstream020.publicDelta.knowledge - workstream021.publicDelta.knowledge, 58);
  assert.equal(terminal - workstream020.masterItemKeys.length - workstream021.masterItemKeys.length, 248);
  assert.equal(directory.items.length - terminal + workstream020.masterItemKeys.length + workstream021.masterItemKeys.length, 502);
  assert.match(generated, /Published Knowledge: 59/);
  assert.match(generated, /Canonical Problems: 96/);
  assert.match(generated, /Terminal master records: 262/);
  assert.match(generated, /Pending master records: 488/);
  assert.match(generated, /First pending: `red-book::8::8\.11`/);
  assert.match(workstream021.status, /^(?:active|complete)$/);
});

test('019 final tree remains complete and workflow-free while 021 owns current state', async () => {
  const [manifest, handoff, workstream020, workstream021] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    readFile('src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json', 'utf8').then(JSON.parse),
    readFile('src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-red-logical-foundations-021.json', 'utf8').then(JSON.parse),
  ]);
  assert.equal(manifest.status, 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 19$/m);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 19$/m);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(workstream020.status, 'complete');
  assert.match(workstream021.status, /^(?:active|complete)$/);
  if (workstream021.status === 'active') {
    assert.equal(currentBlock(handoff), active021Current);
    assert.match(handoff, /^## Active cross-book workstream 21$/m);
    assert.match(handoff, /First pending master record after the active 021 scope: `red-book::8::8\.11`/i);
  } else {
    assert.equal(currentBlock(handoff), complete021Current);
    assert.match(handoff, /^## Completed cross-book workstream 21$/m);
    assert.match(handoff, /First pending master record: `red-book::8::8\.11`/i);
  }
});
