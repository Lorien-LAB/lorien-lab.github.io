import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json';
const temporaryArtifact =
  '.github/workflows/quant-interview-role-employer-fit-015-temporary.yml';
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

test('015 lifecycle is field-safe while active and factually strict when complete', async () => {
  const [manifest, handoff] = await Promise.all([
    readFile(manifestPath, 'utf8').then(JSON.parse),
    readFile('docs/quant-interview/HANDOFF.md', 'utf8'),
  ]);
  assert.match(manifest.status, /^(?:active|complete)$/);

  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
    assert.match(currentTopicBlock(handoff), /Interview Strategy & Communication.*Interview Preparation/is);
    assert.match(handoff, /Workstream 015 is active/i);
    assert.doesNotMatch(handoff, /^## Completed cross-book workstream 15$/m);
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
  assert.equal(Number.isInteger(verification?.runId) && verification.runId > 0, true);
  assert.deepEqual(verification?.commands, commands);
  assert.equal(verification?.conclusion, 'success');
  assert.deepEqual(verification?.temporaryArtifacts, [temporaryArtifact]);
  assert.equal(environments.has(finalTree?.environment), true);
  assert.deepEqual(finalTree?.commands, commands);
  assert.equal(finalTree?.conclusion, 'success');
  assert.equal(finalTree?.temporaryArtifactsAbsent, true);
  await assert.rejects(access(temporaryArtifact), (error) => error?.code === 'ENOENT');
  assert.match(handoff, /^## Completed cross-book workstream 15$/m);
  assert.match(handoff, new RegExp(gate.commit));
  assert.match(handoff, new RegExp(String(verification.runId)));
  assert.match(handoff, /76 (?:canonical )?Problems.*52 .*Knowledge/is);
  assert.match(handoff, /red-book::1\.10::guidance.*red-book::1\.11::guidance/is);
  assert.match(handoff, /First pending master record: `red-book::9::guidance`/i);
  assert.match(handoff, /workstream 016 is not active or authorized/i);
});
