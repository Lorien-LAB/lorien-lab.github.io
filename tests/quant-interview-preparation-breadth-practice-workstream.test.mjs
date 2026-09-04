import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-preparation-014.json';
const keys = [
  'green-book::1.1::guidance',
  'green-book::1.2::guidance',
];
const knowledgeSlug = 'quant-interview-preparation-breadth-and-practice';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(
    files
      .filter((file) => String(file).endsWith('.md'))
      .map((file) => path.basename(String(file), '.md')),
  );
}

test('014 manifest owns exactly the first two consecutive master records', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(
    manifest.id,
    'interview-strategy-communication-interview-preparation-014',
  );
  assert.match(manifest.status, /^(?:active|complete)$/);
  assert.deepEqual(manifest.canonicalTopics, [
    'interview-strategy-communication',
    'interview-preparation',
  ]);
  assert.deepEqual(manifest.masterItemKeys, keys);
  assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
  assert.deepEqual(manifest.knowledgeSlugs, [knowledgeSlug]);
  assert.equal(manifest.sourceScopes.length, 1);
  assert.deepEqual(manifest.sourceScopes[0], {
    source: 'green-book',
    sourceSections: ['1.1', '1.2'],
    evidencePageRanges: [{ startPage: 17, endPage: 18 }],
    reviewOutcome: 'knowledge-only-consolidation',
    reviewNote:
      'Two consecutive preparation-guidance records resolve to one canonical breadth-and-practice Knowledge page with no Problem delta.',
  });
});

test('master and Green coverage resolve both records to one Knowledge target', async () => {
  const [manifest, inputs, green] = await Promise.all([
    readJson(manifestPath),
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/green-book.json'),
  ]);
  for (const key of keys) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = green.entries.find(
      (entry) =>
        entry.sourceSection === master.sourceSection && entry.sourceItem === null,
    );
    assert.equal(master.state, 'knowledge-only', key);
    assert.equal(coverage.state, 'knowledge-only', key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, [knowledgeSlug], key);
    assert.deepEqual(coverage.canonicalKnowledge, [knowledgeSlug], key);
    assert.equal(master.workstream, manifest.id, key);
    assert.ok(master.resolutionNote?.trim(), key);
    assert.ok(coverage.resolutionNote?.trim(), key);
  }
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('014 Knowledge remains classified after later workstreams', async () => {
  const [problems, knowledge] = await Promise.all([
    markdownSlugs('src/content/problems'),
    markdownSlugs('src/content/knowledge'),
  ]);
  assert.equal(problems.size, 96);
  assert.equal(knowledge.has(knowledgeSlug), true);
  const classifiedKnowledge = [];
  for (const slug of knowledge) {
    const files = await readdir('src/content/knowledge', { recursive: true });
    const file = files.find((entry) => path.basename(String(entry), '.md') === slug);
    const text = await readFile(`src/content/knowledge/${String(file).replaceAll('\\', '/')}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) classifiedKnowledge.push(slug);
  }
  assert.equal(classifiedKnowledge.includes('quant-interview-preparation-breadth-and-practice'), true);
});
