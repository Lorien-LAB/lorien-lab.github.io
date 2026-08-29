import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const temporaryArtifact =
  '.github/workflows/quant-interview-reasoning-communication-013-temporary.yml';
const commands = ['npm run test', 'npm run check', 'npm run build'];
const environments = new Set(['linux-native-lf-node24', 'wsl-native-lf-node24']);
const shaPattern = /^[0-9a-f]{40}$/;

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

function currentTopicBlock(handoff) {
  return handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
}

function coordinationBlock(handoff) {
  return handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
}

function reservationState(handoff, ordinal) {
  const row = coordinationBlock(handoff)
    .split(/\r?\n/)
    .find((line) => new RegExp(`\\|\\s*\\d+\\s*\\|\\s*${ordinal}\\s*\\|`).test(line));
  return row?.split('|').slice(1, -1).map((cell) =>
    cell.trim().replaceAll('`', ''),
  )[4] ?? '';
}

function completedBlock(handoff) {
  return handoff
    .split(/^## Completed cross-book workstream 13$/m)[1]
    ?.split(/^## /m)[0] ?? '';
}

async function assertAbsent(file) {
  await assert.rejects(access(file), (error) => error?.code === 'ENOENT');
}

test('013 completion contract is phase-safe and factually strict', async () => {
  const [manifest, handoff] = await Promise.all([
    readJson(manifestPath),
    readFile(handoffPath, 'utf8'),
  ]);
  assert.match(manifest.status, /^(?:active|complete)$/);

  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.match(
      currentTopicBlock(handoff),
      /Interview Strategy & Communication.*Reasoning & Communication/is,
    );
    assert.equal(reservationState(handoff, '013'), 'active');
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 13$/m);
    return;
  }

  const gate = manifest.preClosureActiveGate;
  const verification = manifest.verification;
  const finalTree = manifest.finalTreeGate;
  assert.equal(gate?.status, 'active');
  assert.match(gate?.commit ?? '', shaPattern);
  assert.equal(environments.has(gate?.environment), true);
  assert.deepEqual(gate?.commands, commands);
  assert.equal(gate?.conclusion, 'success');

  assert.equal(verification?.commit, gate.commit);
  assert.match(verification?.commit ?? '', shaPattern);
  assert.equal(Number.isInteger(verification?.runId) && verification.runId > 0, true);
  assert.deepEqual(verification?.commands, commands);
  assert.equal(verification?.conclusion, 'success');
  assert.deepEqual(verification?.temporaryArtifacts, [temporaryArtifact]);

  assert.equal(environments.has(finalTree?.environment), true);
  assert.deepEqual(finalTree?.commands, commands);
  assert.equal(finalTree?.conclusion, 'success');
  assert.equal(finalTree?.temporaryArtifactsAbsent, true);
  await assertAbsent(temporaryArtifact);

  const closure = completedBlock(handoff);
  assert.match(closure, /interview-strategy-communication-reasoning-communication-013/);
  assert.match(closure, new RegExp(verification.commit));
  assert.match(closure, new RegExp(String(verification.runId)));
  assert.match(closure, new RegExp(gate.environment));
  assert.match(closure, /76 (?:canonical )?Problems.*50 (?:explicitly topic-classified )?Knowledge/is);
  assert.match(closure, /\+0 Problems.*\+2 Knowledge/is);
  assert.match(closure, /Green.*1\.3.*1\.4.*1\.5.*knowledge-only/is);
  assert.match(closure, /Red.*1\.12.*interview-preparation.*interview-guidance/is);
  assert.match(closure, /150.*no (?:scope|map|coverage|ownership)/is);
  assert.equal(reservationState(handoff, '013'), 'complete');
  const workstream014 = await readJson(
    'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json',
  );
  if (workstream014.status === 'active') {
    assert.match(
      currentTopicBlock(handoff),
      /Interview Strategy & Communication.*Interview Preparation/is,
    );
  } else {
    assert.equal(workstream014.status, 'complete');
    const workstream015 = await readJson(
      'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json',
    );
    assert.match(workstream015.status, /^(?:active|complete)$/);
    if (workstream015.status === 'active') {
      assert.match(
        currentTopicBlock(handoff),
        /Interview Strategy & Communication.*Interview Preparation/is,
      );
      assert.match(currentTopicBlock(handoff), /Workstream 015 is active/i);
    } else {
      assert.match(handoff, /^## Completed cross-book workstream 15$/m);
      assert.doesNotMatch(currentTopicBlock(handoff), /Workstream 015 is active/i);
      const workstream016 = await readJson(
        'src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json',
      );
      assert.match(workstream016.status, /^(?:active|complete)$/);
      if (workstream016.status === 'active') {
        assert.match(
          currentTopicBlock(handoff),
          /Interview Strategy & Communication.*Interview Process & Formats/is,
        );
        assert.match(currentTopicBlock(handoff), /Workstream 016 is active/i);
      } else {
        assert.match(handoff, /^## Completed cross-book workstream 16$/m);
        assert.doesNotMatch(currentTopicBlock(handoff), /Workstream 016 is active/i);
      }
    }
  }
});
