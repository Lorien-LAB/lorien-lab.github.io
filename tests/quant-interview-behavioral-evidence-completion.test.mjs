import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-soft-interview-behavioral-evidence-017.json';
const temporaryArtifact =
  '.github/workflows/quant-interview-behavioral-evidence-017-temporary.yml';
const commands = [
  'npm run master:directory:check',
  'npm run knowledge:directory:check',
  'npm run test',
  'npm run check',
  'npm run build',
];
const environments = new Set(['wsl-native-lf-node24', 'linux-native-lf-node24']);
const shaPattern = /^[0-9a-f]{40}$/;
const activeCurrent = `**Interview Strategy & Communication → Soft Interview.**

Workstream 017 is active at \`red-book::9.2::guidance\` and \`red-book::9.2::9.1\` through \`red-book::9.2::9.22\`. Its public delta is +0 Problems / +1 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const completeCurrent = `**No bounded topic is active. Workstream 017 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 018 is not active or authorized by this closure.`;
const active021Current = `**Logic, Brainteasers & Discrete Reasoning → Logical Deduction.**

Workstream 021 is active across the exact six-record Red logical-foundations scope. Its public delta is +3 Problems / +0 Knowledge. Completion evidence remains absent until the exact active commit passes Windows, WSL, and GitHub CI.`;
const complete021Current = `**No bounded topic is active. Workstream 021 is complete.**

A later workstream requires its own approved design and evidence audit; workstream 022 is not active or authorized by this closure.`;

const section = (handoff, heading) =>
  handoff.split(new RegExp(`^## ${heading}$`, 'im'))[1]?.split(/^## /m)[0] ?? '';
const currentTopicBlock = (handoff) =>
  handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0] ?? '';
const assertCompletedSectionsInactive = (closure, masterIngestion) => {
  assert.doesNotMatch(closure, /Workstream 017 is active/i);
  assert.doesNotMatch(masterIngestion, /Workstream 017 is active/i);
  assert.doesNotMatch(masterIngestion, /after the active 017 scope/i);
};
const assertNo021RegistrationWhile020Active = (workstreamFiles) => {
  assert.equal(workstreamFiles.some((file) => /-021\.json$/.test(file)), false);
};

test('completed 017 sections reject stale active wording', () => {
  assert.throws(
    () => assertCompletedSectionsInactive('Workstream 017 is active', ''),
    { code: 'ERR_ASSERTION' },
  );
  assert.throws(
    () => assertCompletedSectionsInactive('', 'Workstream 017 is active'),
    { code: 'ERR_ASSERTION' },
  );
  assert.throws(
    () => assertCompletedSectionsInactive('', 'after the active 017 scope'),
    { code: 'ERR_ASSERTION' },
  );
});

test('active 020 rejects a simultaneous 021 workstream registration', () => {
  const active020Files = [
    'logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020.json',
  ];
  assert.doesNotThrow(() => assertNo021RegistrationWhile020Active(active020Files));
  assert.throws(
    () => assertNo021RegistrationWhile020Active([
      ...active020Files,
      'logic-brainteasers-discrete-reasoning-red-logical-foundations-021.json',
    ]),
    { name: 'AssertionError' },
  );
});

test('017 lifecycle is field-safe while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.match(manifest.status, /^(?:active|complete)$/);
  const current = currentTopicBlock(handoff);

  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.equal(current.trim(), activeCurrent);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 17$/m);
    return;
  }

  const closure = section(handoff, 'Completed cross-book workstream 17');
  const masterIngestion = section(handoff, 'Master directory ingestion state');
  const gate = manifest.preClosureActiveGate;
  const verification = manifest.verification;
  const finalTree = manifest.finalTreeGate;

  assert.equal(gate?.status, 'active');
  assert.match(gate?.commit ?? '', shaPattern);
  assert.equal(environments.has(gate?.environment), true);
  assert.deepEqual(gate?.commands, commands);
  assert.equal(gate?.conclusion, 'success');
  assert.equal(verification?.commit, gate.commit);
  assert.equal(Number.isInteger(verification?.runId) && verification.runId > 0, true);
  assert.deepEqual(verification?.commands, commands);
  assert.equal(verification?.conclusion, 'success');
  assert.deepEqual(verification?.temporaryArtifacts, [temporaryArtifact]);
  assert.equal(environments.has(finalTree?.environment), true);
  assert.deepEqual(finalTree?.commands, commands);
  assert.equal(finalTree?.conclusion, 'success');
  assert.equal(finalTree?.temporaryArtifactsAbsent, true);
  await assert.rejects(access(temporaryArtifact), (error) => error?.code === 'ENOENT');

  assert.match(handoff, /^## Completed cross-book workstream 17$/m);
  assert.match(
    closure,
    /interview-strategy-communication-soft-interview-behavioral-evidence-017/,
  );
  assert.match(closure, new RegExp(gate.commit));
  assert.match(closure, new RegExp(String(verification.runId)));
  assert.match(closure, new RegExp(`Windows[^\\n]*${gate.commit}`, 'i'));
  assert.match(closure, new RegExp(`(?:WSL|Linux)[^\\n]*${gate.commit}`, 'i'));
  assert.match(closure, new RegExp(`(?:GitHub Actions|CI)[^\\n]*head_sha[^\\n]*${gate.commit}`, 'i'));
  assert.match(closure, new RegExp(`head_sha[^\\n]*${gate.commit}`, 'i'));
  assert.match(closure, new RegExp(gate.environment));
  assert.match(closure, /(?:temporary workflow|workflow-free)[^\n]*absent/i);
  const commandPositions = commands.map((command) => closure.indexOf(command));
  assert.equal(commandPositions.every((position) => position >= 0), true);
  assert.equal(
    commandPositions.every((position, index) => index === 0 || position > commandPositions[index - 1]),
    true,
  );
  assert.match(closure, /76 (?:canonical )?Problems.*54 .*Knowledge/is);
  assert.match(closure, /228 terminal.*522 pending/is);
  assertCompletedSectionsInactive(closure, masterIngestion);
  const workstreamFiles = await readdir('src/data/quant-interview/workstreams');
  const workstream018File = workstreamFiles.find((file) => /-018\.json$/.test(file));
  if (!workstream018File) {
    assert.match(masterIngestion, /First pending master record: `green-book::2\.1::theory`/i);
    assert.equal(current.trim(), completeCurrent);
    assert.match(masterIngestion, /018.*not (?:active|authorized)|does not authorize workstream 018/i);
    return;
  }

  const workstream018 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream018File}`,
    'utf8',
  ));
  assert.match(workstream018.status, /^(?:active|complete)$/);
  if (workstream018.status === 'active') {
    assert.match(current, /Logic, Brainteasers.*Problem Simplification/is);
    assert.match(current, /Workstream 018 is active/i);
    assert.match(masterIngestion, /First pending master record after the active 018 scope: `green-book::2\.2::theory`/i);
    return;
  }

  const workstream019File = workstreamFiles.find((file) => /-019\.json$/.test(file));
  if (!workstream019File) {
    assert.match(current, /Workstream 018 is complete/i);
    assert.match(masterIngestion, /First pending master record: `green-book::2\.2::theory`/i);
    return;
  }

  const workstream019 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream019File}`,
    'utf8',
  ));
  assert.match(workstream019.status, /^(?:active|complete)$/);
  if (workstream019.status === 'active') {
    assert.match(current, /Logic, Brainteasers.*Logical Deduction/is);
    assert.match(current, /Workstream 019 is active/i);
    assert.match(masterIngestion, /First pending master record after the active 019 scope: `green-book::2\.3::theory`/i);
    return;
  }

  const workstream020File = workstreamFiles.find((file) => /-020\.json$/.test(file));
  if (!workstream020File) {
    assert.match(current, /Workstream 019 is complete/i);
    assert.match(masterIngestion, /First pending master record: `green-book::2\.3::theory`/i);
    return;
  }

  const workstream020 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream020File}`,
    'utf8',
  ));
  assert.match(workstream020.status, /^(?:active|complete)$/);
  if (workstream020.status === 'active') {
    assert.equal(workstreamFiles.some((file) => /-021\.json$/.test(file)), false);
    assert.match(current, /Logic, Brainteasers.*Logical Deduction/is);
    assert.match(current, /Workstream 020 is active/i);
    assert.match(masterIngestion, /First pending master record after the active 020 scope: `red-book::8::theory`/i);
    return;
  }

  const workstream021File = workstreamFiles.find((file) => /-021\.json$/.test(file));
  if (!workstream021File) {
    assert.match(current, /Workstream 020 is complete/i);
    assert.match(masterIngestion, /First pending master record: `red-book::8::theory`/i);
    return;
  }
  const workstream021 = JSON.parse(await readFile(
    `src/data/quant-interview/workstreams/${workstream021File}`,
    'utf8',
  ));
  assert.match(workstream021.status, /^(?:active|complete)$/);
  if (workstream021.status === 'active') {
    assert.equal(current.trim(), active021Current);
    assert.match(handoff, /^## Active cross-book workstream 21$/m);
    assert.match(masterIngestion, /First pending master record after the active 021 scope: `red-book::8::8\.11`/i);
  } else {
    assert.equal(current.trim(), complete021Current);
    assert.match(handoff, /^## Completed cross-book workstream 21$/m);
    assert.match(masterIngestion, /First pending master record: `red-book::8::8\.11`/i);
  }
  assert.match(masterIngestion, /Workstream 022 is not active or authorized/i);
});
