import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { getNextPendingItem, TERMINAL_STATES } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const keys = [
  'red-book::9::guidance',
  'red-book::9.3::guidance',
  ...Array.from({ length: 12 }, (_, index) => `red-book::9.3::9.${index + 23}`),
];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('market-awareness skip owns exactly fourteen ordered records', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const selected = inputs.directory.items.filter((item) => keys.includes(item.key));
  assert.deepEqual(selected.map((item) => item.key), keys);
  assert.equal(selected.length, 14);
  assert.equal(
    inputs.directory.items.filter((item) =>
      item.resolutionNote?.includes('excluded from the durable public technical question bank'),
    ).length,
    14,
  );
});

test('all fourteen rows are target-free interview guidance with distinct notes', async () => {
  const [inputs, red] = await Promise.all([
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const notes = [];
  for (const key of keys) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find((entry) =>
      entry.sourceSection === master.sourceSection
        && entry.sourceItem === master.sourceItem,
    );
    assert.equal(master.state, 'interview-guidance', key);
    assert.equal(coverage.state, 'interview-guidance', key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalKnowledge, [], key);
    assert.equal(master.workstream, null, key);
    assert.ok(master.resolutionNote?.trim(), key);
    assert.equal(master.resolutionNote, coverage.resolutionNote, key);
    notes.push(master.resolutionNote);
  }
  assert.equal(new Set(notes).size, 14);
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('skip audit repairs pages, preserves public counts, and advances to Red 1.1', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const section = inputs.directory.items.find(
    (item) => item.key === 'red-book::9.3::guidance',
  );
  assert.deepEqual(section.questionPages, [{ startPage: 315, endPage: 316 }]);
  for (const key of keys.slice(2)) {
    const item = inputs.directory.items.find((entry) => entry.key === key);
    assert.deepEqual(item.questionPages, [{ startPage: 316, endPage: 316 }], key);
    assert.deepEqual(item.solutionPages, [], key);
  }
  const terminal = inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state));
  const pending = inputs.directory.items.filter((item) => item.state === 'pending');
  assert.equal(terminal.length, 196);
  assert.equal(pending.length, 554);
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 52);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::1.1::guidance');
  assert.equal(inputs.workstreams.some(({ id }) => /-016$/.test(id)), false);
});

test('skip audit creates no public market-awareness artifact', async () => {
  const files = await readdir('src/content', { recursive: true });
  assert.equal(
    files.some((file) => /market-awareness|current-market-data/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/knowledge/concepts/financial-market-awareness-for-quant-interviews.md'),
    (error) => error?.code === 'ENOENT',
  );
});
