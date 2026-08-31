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
const complete018Current = `**No bounded topic is active. Workstream 018 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 019 is not active or authorized by this closure.`;
const active019Current = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 019 is active across the exact nine-record Green Book 2.2 core scope. Its public delta is +5 Problems / +2 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const complete019Current = `**No bounded topic is active. Workstream 019 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 020 is not active or authorized by this closure.`;
const active020Current = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 020 is active across the exact eight-record Green Book 2.3 scope. Its public delta is +7 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const complete020Current = `**No bounded topic is active. Workstream 020 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 021 is not active or authorized by this closure.`;
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
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  const closure = section(handoff, 'Completed cross-book workstream 18');
  for (const fact of [activeSha, String(runId), ciUrl]) assert.ok(closure.includes(fact));
  const workstreamFiles = await readdir('src/data/quant-interview/workstreams');
  const workstream019File = workstreamFiles.find((file) => /-019\.json$/.test(file));
  if (!workstream019File) {
    assert.equal(currentBlock(handoff), complete018Current);
    assert.match(handoff, /First pending master record: `green-book::2\.2::theory`/i);
    return;
  }
  const workstream019 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream019File}`,
    'utf8',
  ));
  assert.match(workstream019.status, /^(?:active|complete)$/);
  if (workstream019.status === 'active') {
    assert.equal(currentBlock(handoff), active019Current);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 19$/m);
    assert.match(handoff, /First pending master record after the active 019 scope: `green-book::2\.3::theory`/i);
  } else {
    assert.match(handoff, /^## Completed cross-book workstream 19$/m);
    const workstream020File = workstreamFiles.find((file) => /-020\.json$/.test(file));
    if (!workstream020File) {
      assert.equal(currentBlock(handoff), complete019Current);
      assert.match(handoff, /First pending master record: `green-book::2\.3::theory`/i);
      return;
    }
    const workstream020 = JSON.parse(await readFile(
      `src/data/quant-interview/workstreams/${workstream020File}`,
      'utf8',
    ));
    assert.match(workstream020.status, /^(?:active|complete)$/);
    assert.equal(workstreamFiles.some((file) => /-021\.json$/.test(file)), false);
    if (workstream020.status === 'active') {
      assert.equal(currentBlock(handoff), active020Current);
      assert.match(handoff, /^## Active cross-book workstream 20$/m);
      assert.doesNotMatch(handoff, /^## Completed cross-book workstream 20$/m);
      assert.match(handoff, /First pending master record after the active 020 scope: `red-book::8::theory`/i);
    } else {
      assert.equal(currentBlock(handoff), complete020Current);
      assert.match(handoff, /^## Completed cross-book workstream 20$/m);
      assert.match(handoff, /First pending master record: `red-book::8::theory`/i);
    }
  }
});

test('018 and the 019 corpus remain durable after 020 advances current state', async () => {
  const [manifest018, directory, workstreams] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('src/data/quant-interview/master-directory.json', 'utf8').then(JSON.parse),
    readdir('src/data/quant-interview/workstreams'),
  ]);
  assert.equal(manifest018.status, 'complete');
  assert.deepEqual(manifest018.publicDelta, { problems: 5, knowledge: 2 });
  assert.deepEqual(manifest018.knowledgeSlugs, [
    'small-cases-recurrence-and-structural-simplification',
    'fermi-estimation-assumption-decomposition',
  ]);
  const terminal = directory.items.filter(({ state }) => !['pending', 'needs-review'].includes(state)).length;
  const workstream019File = workstreams.find((file) => /-019\.json$/.test(file));
  assert.ok(workstream019File);
  const workstream019 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream019File}`,
    'utf8',
  ));
  assert.equal(workstream019.status, 'complete');
  assert.deepEqual(workstream019.publicDelta, { problems: 5, knowledge: 2 });
  assert.equal(workstream019.masterItemKeys.length, 9);
  const workstream020File = workstreams.find((file) => /-020\.json$/.test(file));
  assert.ok(workstream020File);
  const workstream020 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream020File}`,
    'utf8',
  ));
  assert.match(workstream020.status, /^(?:active|complete)$/);
  assert.equal(workstream020.masterItemKeys.length, 8);
  assert.equal(terminal - workstream020.masterItemKeys.length, 248);
  assert.equal(directory.items.length - terminal + workstream020.masterItemKeys.length, 502);
  assert.equal(workstreams.some((file) => /-021\.json$/.test(file)), false);
});

test('018 final tree is complete and workflow-free', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.equal(manifest.status, 'complete');
  assert.match(handoff, /^## Completed cross-book workstream 18$/m);
  assert.doesNotMatch(currentBlock(handoff), /Workstream 018 is active/i);
  await assert.rejects(access(workflow), (error) => error?.code === 'ENOENT');
});
