import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { getNextPendingItem } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-role-employer-fit-015.json';
const keys = ['red-book::1.10::guidance', 'red-book::1.11::guidance'];
const knowledgeSlug = 'quant-role-and-employer-fit';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('015 owns exactly two consecutive Red preparation records', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(manifest.id, 'interview-strategy-communication-interview-preparation-role-employer-fit-015');
  assert.match(manifest.status, /^(?:active|complete)$/);
  assert.deepEqual(manifest.canonicalTopics, [
    'interview-strategy-communication',
    'interview-preparation',
  ]);
  assert.deepEqual(manifest.masterItemKeys, keys);
  assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
  assert.deepEqual(manifest.knowledgeSlugs, [knowledgeSlug]);
  if (manifest.status === 'active') {
    assert.equal('preClosureActiveGate' in manifest, false);
    assert.equal('verification' in manifest, false);
    assert.equal('finalTreeGate' in manifest, false);
  }
});

test('master and Red coverage close both rows with exact page evidence', async () => {
  const [manifest, inputs, red] = await Promise.all([
    readJson(manifestPath),
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  const pages = new Map([
    ['red-book::1.10::guidance', [{ startPage: 22, endPage: 23 }]],
    ['red-book::1.11::guidance', [{ startPage: 24, endPage: 25 }]],
  ]);
  const notes = [];
  for (const key of keys) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find(
      (entry) => entry.sourceSection === master.sourceSection && entry.sourceItem === null,
    );
    assert.equal(master.state, 'knowledge-only', key);
    assert.equal(coverage.state, 'knowledge-only', key);
    assert.deepEqual(master.questionPages, pages.get(key), key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, [knowledgeSlug], key);
    assert.deepEqual(coverage.canonicalKnowledge, [knowledgeSlug], key);
    assert.equal(master.workstream, manifest.id, key);
    assert.ok(master.resolutionNote?.trim(), key);
    assert.equal(master.resolutionNote, coverage.resolutionNote, key);
    notes.push(master.resolutionNote);
  }
  assert.notEqual(notes[0], notes[1]);
  assert.equal(validateMasterDirectoryRepository(inputs), true);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::9::guidance');
});

test('015 produces exactly 76 Problems and 52 classified Knowledge nodes', async () => {
  const problemFiles = await readdir('src/content/problems', { recursive: true });
  const knowledgeFiles = await readdir('src/content/knowledge', { recursive: true });
  assert.equal(problemFiles.filter((file) => String(file).endsWith('.md')).length, 76);
  const classified = [];
  for (const file of knowledgeFiles.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(`src/content/knowledge/${String(file).replaceAll('\\', '/')}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) {
      classified.push(path.basename(String(file), '.md'));
    }
  }
  assert.equal(classified.includes(knowledgeSlug), true);
  assert.equal(classified.length, 52);
});
