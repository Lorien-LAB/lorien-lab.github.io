import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const docs = [
  'docs/quant-interview/README.md',
  'docs/quant-interview/AGENT_PROTOCOL.md',
  'docs/quant-interview/CONTENT_STANDARD.md',
  'docs/quant-interview/SOURCE_CATALOG.md',
  'docs/quant-interview/HANDOFF.md',
];

const tocPaths = {
  green: 'src/data/quant-interview/toc/green-book.json',
  red: 'src/data/quant-interview/toc/red-book.json',
  q150: 'src/data/quant-interview/toc/150-most-frequently-asked.json',
};

async function collectMarkdown(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await collectMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

test('quant interview repository memory remains explicit', async () => {
  for (const file of docs) await access(file);
  const readme = await readFile(docs[0], 'utf8');
  assert.match(readme, /repository.*source of truth/i);
  assert.match(readme, /HANDOFF\.md/);
  assert.match(readme, /target source/i);
  assert.match(readme, /one bounded batch/i);

  const protocol = await readFile(docs[1], 'utf8');
  for (const phrase of ['Do not trust conversational memory', 'task-specific branch', 'Concept', 'Technique', 'one bounded batch', 'npm run test', 'npm run check', 'npm run build']) {
    assert.ok(protocol.includes(phrase), `AGENT_PROTOCOL missing: ${phrase}`);
  }

  const standard = await readFile(docs[2], 'utf8');
  assert.match(standard, /S0.*answer only/s);
  assert.match(standard, /S5.*extension\/generalization/s);
  for (const heading of ['Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.ok(standard.includes(heading), `CONTENT_STANDARD missing: ${heading}`);
  }

  const handoff = await readFile(docs[4], 'utf8');
  assert.match(handoff, /Phase 2B/);
  assert.match(handoff, /150-first-look-q01-q02/);
  assert.match(handoff, /source-file-verified/);
});

test('source catalog reflects verified 150 Questions while Green and Red remain unresolved', async () => {
  const catalog = await readFile('docs/quant-interview/SOURCE_CATALOG.md', 'utf8');
  for (const name of ['A Practical Guide to Quantitative Finance Interviews', 'Quant Job Interview Questions and Answers', '150 Most Frequently Asked Questions on Quant Interviews']) {
    assert.ok(catalog.includes(name), `catalog missing ${name}`);
  }
  assert.match(catalog, /Green Book[\s\S]*not source-file-verified/i);
  assert.match(catalog, /Red Book[\s\S]*not source-file-verified/i);
  assert.match(catalog, /150 Questions[\s\S]*source-file-verified[\s\S]*2013/i);
  assert.match(catalog, /d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14/);
});

test('TOC verification advances only the inspected 150 Questions source', async () => {
  for (const file of Object.values(tocPaths)) await access(file);
  const green = JSON.parse(await readFile(tocPaths.green, 'utf8'));
  const red = JSON.parse(await readFile(tocPaths.red, 'utf8'));
  const q150 = JSON.parse(await readFile(tocPaths.q150, 'utf8'));

  for (const toc of [green, red]) {
    assert.equal(toc.tocStatus, 'user-supplied');
    assert.equal(toc.coverageClaim, 'structure-seed-not-problem-complete');
  }
  assert.equal(green.editionStatus, 'work-identified');
  assert.equal(red.editionStatus, 'work-identified');

  assert.equal(q150.tocStatus, 'source-file-verified');
  assert.equal(q150.coverageClaim, 'verified-structure-not-problem-complete');
  assert.equal(q150.edition, 'First edition (2013)');
  assert.equal(q150.sourceFileEvidence.pdfPageCount, 220);
  assert.deepEqual(q150.sourceFileEvidence.bodyStart, { pdfPage: 11, displayPage: 1 });
  assert.deepEqual(q150.sourceFileEvidence.bibliography, { pdfPage: 219, displayPage: 209 });
  assert.ok(q150.sections.some((s) => s.id === 'bibliography' && s.startPage === 209));
});

test('150 Questions has one verified bounded active batch', async () => {
  const source = await readFile('src/content/problem-sources/150-most-frequently-asked.md', 'utf8');
  assert.match(source, /edition: First edition \(2013\)/);
  assert.match(source, /ingestionStatus: ingesting/);
  assert.match(source, /220 PDF pages/);

  const manifest = JSON.parse(await readFile('src/data/quant-interview/150-most-frequently-asked.json', 'utf8'));
  assert.equal(manifest.sourceFile, 'sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14');
  assert.equal(manifest.sourceFileMeta.verification, 'source-file-verified');
  assert.equal(manifest.sourceFileMeta.pdfPageCount, 220);
  assert.equal(manifest.ingestionStatus, 'ingesting');
  assert.deepEqual(manifest.batches, [{
    id: '150-first-look-q01-q02',
    startPage: 1,
    endPage: 6,
    sourceSection: '1 First Look: Ten Questions',
    expectedProblemScope: ['1', '2'],
    status: 'active',
  }]);
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
});

test('Green and Red manifests remain edition-safe and batch-free', async () => {
  for (const slug of ['green-book', 'red-book']) {
    const manifest = JSON.parse(await readFile(`src/data/quant-interview/${slug}.json`, 'utf8'));
    assert.equal(manifest.editionStatus, 'work-identified');
    assert.equal(manifest.edition, null);
    assert.equal(manifest.isbn, null);
    assert.equal(manifest.sourceFile, null);
    assert.deepEqual(manifest.batches, []);
  }
});

test('opening the pilot batch does not yet publish source-derived problems or source files', async () => {
  const problemFiles = await collectMarkdown('src/content/problems');
  for (const file of problemFiles) {
    const text = await readFile(file, 'utf8');
    assert.doesNotMatch(text, /^source:\s*(green-book|red-book|150-most-frequently-asked)\s*$/m, `source-derived problem unexpectedly added: ${file}`);
  }
  const repoFiles = await readdir('.', { recursive: true });
  const suspicious = repoFiles.filter((name) => /(?:green-book|red-book|150-most-frequently-asked).*(?:\.pdf|\.png|\.jpe?g)$/i.test(String(name)));
  assert.deepEqual(suspicious, []);
});

test('root README still points agents to quant interview repository memory', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /docs\/quant-interview\/README\.md/);
  assert.match(readme, /repository.*memory/i);
});
