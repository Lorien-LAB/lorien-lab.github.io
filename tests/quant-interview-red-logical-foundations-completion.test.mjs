import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const id = 'logic-brainteasers-discrete-reasoning-red-logical-foundations-021';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
const workflow = '.github/workflows/quant-interview-red-logical-foundations-021-temporary.yml';
const commands = [
  'npm test',
  'npm run knowledge:directory:check',
  'npm run master:directory:check',
  'npm run check',
  'npm run build',
];
const activeSha = '73720d3a743e0312d2ceeeb63e5bb918c2df242a';
const runId = 33916517774;
const ciUrl = 'https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/33916517774';
const completeCurrent = `**No bounded topic is active. Workstream 021 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 022 is not active or authorized by this closure.`;
const completeMaster = `**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: \`red-book::8::8.11\`

Workstream 022 is not active or authorized.`;
const repeatedIndexSnapshot = [
  ['red-book::10.2::3.2', 'pending', [], [], null, null],
  ['red-book::10.2::2.9', 'pending', [], [], null, null],
  ['red-book::10.2::2.13', 'pending', [], [], null, null],
  ['red-book::10.2::2.34', 'pending', [], [], null, null],
  ['red-book::10.2::2.37', 'pending', [], [], null, null],
  ['red-book::10.2::2.1', 'pending', [], [], null, null],
  ['red-book::10.2::2.4', 'pending', [], [], null, null],
  ['red-book::10.2::2.50', 'pending', [], [], null, null],
  ['red-book::10.2::5.1', 'pending', [], [], null, null],
  ['red-book::10.2::7.10', 'pending', [], [], null, null],
];

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'im'))[1]?.split(/^## /m)[0] ?? '';
const currentBlock = (handoff) => handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0]?.trim() ?? '';
const repeatedState = (row) => [
  row.key,
  row.state,
  row.canonicalProblems,
  row.canonicalKnowledge,
  row.workstream,
  row.resolutionNote,
];

function assertLifecycleEvidence(manifest) {
  assert.match(manifest.status, /^(?:active|complete)$/);
  assert.equal('workflow' in manifest, false);
  if (manifest.status === 'active') {
    for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) {
      assert.equal(field in manifest, false, `${field} must be absent while active`);
    }
    return;
  }

  assert.deepEqual(manifest.preClosureActiveGate, {
    status: 'active',
    commit: activeSha,
    environment: 'wsl-native-lf-node24',
    commands,
    conclusion: 'success',
  });
  assert.deepEqual(manifest.verification, {
    commit: activeSha,
    runId,
    commands,
    conclusion: 'success',
    temporaryArtifacts: [workflow],
  });
  assert.deepEqual(manifest.finalTreeGate, {
    environment: 'wsl-native-lf-node24',
    commands,
    conclusion: 'success',
    temporaryArtifactsAbsent: true,
  });
}

function assertClosureIdentity(closure, manifestId) {
  for (const fact of [manifestId, activeSha, String(runId), ciUrl]) {
    assert.ok(closure.includes(fact), `missing completion fact ${fact}`);
  }
}

function assertRepeatedIndexState(directory) {
  const observed = directory.items
    .filter((row) => row.source === 'red-book' && row.sourceSection === '10.2' && row.kind === 'question')
    .map(repeatedState);
  assert.deepEqual(observed, repeatedIndexSnapshot);
}

test('021 lifecycle is evidence-free while active and pins exact immutable evidence when complete', () => {
  assert.doesNotThrow(() => assertLifecycleEvidence({ status: 'active' }));
  for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate', 'workflow']) {
    const mutated = { status: 'active', [field]: {} };
    assert.throws(() => assertLifecycleEvidence(mutated), { name: 'AssertionError' }, field);
  }

  const complete = {
    status: 'complete',
    preClosureActiveGate: {
      status: 'active',
      commit: activeSha,
      environment: 'wsl-native-lf-node24',
      commands,
      conclusion: 'success',
    },
    verification: {
      commit: activeSha,
      runId,
      commands,
      conclusion: 'success',
      temporaryArtifacts: [workflow],
    },
    finalTreeGate: {
      environment: 'wsl-native-lf-node24',
      commands,
      conclusion: 'success',
      temporaryArtifactsAbsent: true,
    },
  };
  assert.doesNotThrow(() => assertLifecycleEvidence(complete));

  const coordinatedFake = structuredClone(complete);
  const fakeSha = 'a'.repeat(40);
  const fakeRunId = 1;
  const fakeUrl = 'https://github.com/Lorien-LAB/lorien-lab.github.io/actions/runs/1';
  coordinatedFake.preClosureActiveGate.commit = fakeSha;
  coordinatedFake.verification.commit = fakeSha;
  coordinatedFake.verification.runId = fakeRunId;
  assert.throws(() => assertLifecycleEvidence(coordinatedFake), { name: 'AssertionError' });
  const fakeClosure = `${id}\n${fakeSha}\n${fakeRunId}\n${fakeUrl}`;
  assert.throws(() => assertClosureIdentity(fakeClosure, id), { name: 'AssertionError' });

  const unexpectedEvidence = structuredClone(complete);
  unexpectedEvidence.verification.unexpected = true;
  assert.throws(() => assertLifecycleEvidence(unexpectedEvidence), { name: 'AssertionError' });
});

test('021 current manifest is complete with exact evidence and no temporary workflow or 022', async () => {
  const [manifest, workstreamFiles] = await Promise.all([
    readJson(manifestPath),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  assert.equal(manifest.status, 'complete');
  assertLifecycleEvidence(manifest);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(workstreamFiles.some((file) => /-022\.json$/.test(file)), false);
});

test('021 HANDOFF records exact workflow-free completion and no active topic', async () => {
  const [manifest, handoff] = await Promise.all([
    readJson(manifestPath),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.equal(section(handoff, 'Master directory ingestion state').trim(), completeMaster);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 21$/m);
  assert.match(handoff, /^## Completed cross-book workstream 21$/m);
  assert.match(handoff, /Workstream 022 is not active or authorized\./);
  const closure = section(handoff, 'Completed cross-book workstream 21');
  assertClosureIdentity(closure, manifest.id);
});

test('021 current repository is exactly 96/59 with 262/488 master state and Red 8.11 next', async () => {
  const [directory, generated, catalog, problemFiles, workstreamFiles] = await Promise.all([
    readJson('src/data/quant-interview/master-directory.json'),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
    readJson('src/data/quant-interview/topics/knowledge-catalog.json'),
    readdir('src/content/problems', { recursive: true }),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state));
  const pending = directory.items.filter(({ state }) => ['pending', 'needs-review'].includes(state));
  assert.equal(problemFiles.filter((file) => String(file).endsWith('.md')).length, 96);
  assert.equal(catalog.modules.length, 59);
  assert.equal(terminal.length, 262);
  assert.equal(pending.length, 488);
  assert.equal(pending[0]?.key, 'red-book::8::8.11');
  assert.equal(workstreamFiles.some((file) => /-022\.json$/.test(file)), false);
  assert.match(generated, /Published Knowledge: 59/);
  assert.match(generated, /Canonical Problems: 96/);
  assert.match(generated, /Terminal master records: 262/);
  assert.match(generated, /Pending master records: 488/);
  assert.match(generated, /First pending: `red-book::8::8\.11`/);
});

test('Red 10.2 repeated-question rows retain their complete pre-021 state', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  assertRepeatedIndexState(directory);
});

test('Red 10.2 preservation rejects terminalizing any referenced question', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  assertRepeatedIndexState(directory);
  const mutated = structuredClone(directory);
  const row = mutated.items.find(({ key }) => key === repeatedIndexSnapshot[0][0]);
  row.state = 'interview-guidance';
  row.workstream = id;
  row.resolutionNote = 'Incorrectly terminalized through the repeated-question index.';
  assert.throws(() => assertRepeatedIndexState(mutated), { name: 'AssertionError' });
});
