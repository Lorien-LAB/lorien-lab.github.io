import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json';
const workflow = '.github/workflows/quant-interview-thinking-outside-box-green-core-020-temporary.yml';
const commands = ['npm test', 'npm run knowledge:directory:check', 'npm run master:directory:check', 'npm run check', 'npm run build'];
const shaPattern = /^[0-9a-f]{40}$/;
const activeCurrent = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 020 is active across the exact eight-record Green Book 2.3 scope. Its public delta is +7 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 020 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 021 is not active or authorized by this closure.`;
const completeMaster = `**No bounded ingestion workstream is active. The three-book master directory migration remains complete.**

First pending master record: \`red-book::8::theory\`

Workstream 021 is not active or authorized.`;
const newProblemPaths = [
  'src/content/problems/logic/pack-length-four-bricks-in-six-cube.md',
  'src/content/problems/logic/two-cube-calendar-digit-labeling.md',
  'src/content/problems/logic/two-guards-one-question.md',
  'src/content/problems/logic/message-delivery-with-independent-padlocks.md',
  'src/content/problems/logic/last-ball-color-by-parity-invariant.md',
  'src/content/problems/logic/four-switches-one-room-entry.md',
  'src/content/problems/logic/private-average-with-canceling-mask.md',
];
const expectedModule = {
  slug: 'constraint-reframing-and-latent-state',
  title: 'Constraint Reframing & Latent State',
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  primaryTopic: 'logical-deduction',
  learningOrder: 30,
  status: 'published',
  prerequisites: ['logical-deduction-constraint-propagation-and-case-elimination'],
};

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
  const commit = gate?.commit ?? '';
  const runId = verification?.runId;
  assert.match(commit, shaPattern);
  assert.equal(Number.isInteger(runId) && runId > 0, true);
  assert.deepEqual(gate, {
    status: 'active', commit, environment: 'wsl-native-lf-node24', commands, conclusion: 'success',
  });
  assert.deepEqual(verification, {
    commit, runId, commands, conclusion: 'success', temporaryArtifacts: [workflow],
  });
  assert.deepEqual(finalTreeGate, {
    environment: 'wsl-native-lf-node24', commands, conclusion: 'success', temporaryArtifactsAbsent: true,
  });
}

test('completion evidence rejects extra fields while the active phase stays evidence-free', () => {
  assert.doesNotThrow(() => assertLifecycleEvidence({ status: 'active' }));
  const commit = 'a'.repeat(40);
  const complete = {
    status: 'complete',
    preClosureActiveGate: {
      status: 'active', commit, environment: 'wsl-native-lf-node24', commands, conclusion: 'success',
    },
    verification: {
      commit, runId: 1, commands, conclusion: 'success', temporaryArtifacts: [workflow],
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

test('020 lifecycle is evidence-free while active and factually strict when complete', async () => {
  const [manifest, handoff, workstreams] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  assertLifecycleEvidence(manifest);
  assert.equal(workstreams.some((file) => /-021\.json$/.test(file)), false);

  if (manifest.status === 'active') {
    assert.equal(currentBlock(handoff), activeCurrent);
    assert.match(handoff, /^## Active cross-book workstream 20$/m);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 20$/m);
    assert.match(handoff, /First pending master record after the active 020 scope: `red-book::8::theory`/i);
    assert.match(handoff, /Workstream 021 is not active or authorized\./);
    return;
  }

  const { preClosureActiveGate: gate, verification } = manifest;
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 20$/m);
  assert.match(handoff, /^## Completed cross-book workstream 20$/m);
  const closure = section(handoff, 'Completed cross-book workstream 20');
  for (const fact of [manifest.id, gate.commit, String(verification.runId)]) {
    assert.ok(closure.includes(fact));
  }
  assert.match(handoff, /First pending master record: `red-book::8::theory`/i);
  assert.match(handoff, /Workstream 021 is not active or authorized/);
});

test('020 final tree requires the complete workflow-free lifecycle without 021', async () => {
  const [manifest, workstreams] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  assert.equal(manifest.status, 'complete');
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
  assert.equal(workstreams.some((file) => /-021\.json$/.test(file)), false);
});

test('020 final HANDOFF records the exact completed current and master state', async () => {
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.equal(currentBlock(handoff), completeCurrent);
  assert.equal(section(handoff, 'Master directory ingestion state').trim(), completeMaster);
  assert.doesNotMatch(handoff, /^## Active cross-book workstream 20$/m);
  assert.match(handoff, /^## Completed cross-book workstream 20$/m);
  assert.match(handoff, /First pending master record: `red-book::8::theory`/i);
  assert.match(handoff, /Workstream 021 is not active or authorized/);
});

test('020 advances the exact public and master contracts without 021', async () => {
  const [directory, generated, catalog, problemFiles] = await Promise.all([
    readFile('src/data/quant-interview/master-directory.json', 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/KNOWLEDGE_DIRECTORY.md', 'utf8'),
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8').then(JSON.parse),
    readdir('src/content/problems', { recursive: true }),
    ...newProblemPaths.map((path) => access(path)),
  ]);
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  assert.equal(newProblemPaths.length, 7);
  assert.equal(problemFiles.filter((file) => String(file).endsWith('.md')).length, 93);
  assert.deepEqual(catalog.modules.filter(({ slug }) => slug === expectedModule.slug), [expectedModule]);
  assert.equal(catalog.modules.length, 59);
  assert.equal(terminal, 256);
  assert.equal(directory.items.length - terminal, 494);
  assert.match(generated, /Published Knowledge: 59/);
  assert.match(generated, /Canonical Problems: 93/);
  assert.match(generated, /Terminal master records: 256/);
  assert.match(generated, /Pending master records: 494/);
  assert.match(generated, /First pending: `red-book::8::theory`/);
});
