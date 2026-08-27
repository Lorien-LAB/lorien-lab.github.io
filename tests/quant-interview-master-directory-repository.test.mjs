import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { access } from 'node:fs/promises';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

test('repository loader exposes the 76/50 baseline and rejects an incomplete shell', async () => {
  await access('src/data/quant-interview/master-directory.json');
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 50);
  assert.throws(
    () => validateMasterDirectoryRepository(inputs),
    /master topic nodes must exactly match canonical taxonomy order/i,
  );
});

test('master directory check CLI reports the incomplete repository shell', () => {
  const result = spawnSync(
    process.execPath,
    ['scripts/validate-quant-interview-master-directory.mjs', '--check'],
    { encoding: 'utf8' },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /master topic nodes must exactly match canonical taxonomy order/i);
});
