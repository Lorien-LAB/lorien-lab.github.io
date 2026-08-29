import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json';
const temporaryArtifact =
  '.github/workflows/quant-interview-assessment-formats-016-temporary.yml';
const commands = [
  'npm run master:directory:check',
  'npm run knowledge:directory:check',
  'npm run test',
  'npm run check',
  'npm run build',
];
const environments = new Set(['wsl-native-lf-node24', 'linux-native-lf-node24']);
const shaPattern = /^[0-9a-f]{40}$/;
const currentTopicBlock = (handoff) =>
  handoff.split(/Current bounded topic:/i)[1]?.split(/^## /m)[0] ?? '';
const completedWorkstream16Block = (handoff) =>
  handoff.split(/^## Completed cross-book workstream 16$/m)[1]?.split(/^## /m)[0] ?? '';
const masterIngestionBlock = (handoff) =>
  handoff.split(/^## Master directory ingestion state$/m)[1]?.split(/^## /m)[0] ?? '';

test('016 lifecycle is field-safe while active and factually strict when complete', async () => {
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
    assert.match(
      current,
      /Interview Strategy & Communication.*Interview Process & Formats/is,
    );
    assert.match(current, /Workstream 016 is active/i);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 16$/m);
    return;
  }

  const closure = completedWorkstream16Block(handoff);
  const masterIngestion = masterIngestionBlock(handoff);
  const gate = manifest.preClosureActiveGate;
  const verification = manifest.verification;
  const finalTree = manifest.finalTreeGate;
  assert.equal(gate.status, 'active');
  assert.match(gate.commit, shaPattern);
  assert.equal(environments.has(gate.environment), true);
  assert.deepEqual(gate.commands, commands);
  assert.equal(gate.conclusion, 'success');
  assert.equal(verification.commit, gate.commit);
  assert.equal(Number.isInteger(verification.runId) && verification.runId > 0, true);
  assert.deepEqual(verification.commands, commands);
  assert.equal(verification.conclusion, 'success');
  assert.deepEqual(verification.temporaryArtifacts, [temporaryArtifact]);
  assert.equal(environments.has(finalTree.environment), true);
  assert.deepEqual(finalTree.commands, commands);
  assert.equal(finalTree.conclusion, 'success');
  assert.equal(finalTree.temporaryArtifactsAbsent, true);
  await assert.rejects(access(temporaryArtifact), (error) => error?.code === 'ENOENT');
  assert.match(handoff, /^## Completed cross-book workstream 16$/m);
  assert.match(closure, new RegExp(gate.commit));
  assert.match(closure, new RegExp(String(verification.runId)));
  assert.match(closure, /76 (?:canonical )?Problems.*53 .*Knowledge/is);
  assert.match(masterIngestion, /First pending master record: `red-book::9\.2::guidance`/i);
  assert.doesNotMatch(current, /Workstream 016 is active/i);
});
