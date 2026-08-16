import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const sourceFiles = {
  green: 'src/content/problem-sources/green-book.md',
  red: 'src/content/problem-sources/red-book.md',
};

const manifestFiles = {
  green: 'src/data/quant-interview/green-book.json',
  red: 'src/data/quant-interview/red-book.json',
};

test('problem source schema tracks work identity, edition safety, and ingestion state', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  for (const field of [
    'canonicalTitle',
    'aliases',
    'publisher',
    'editionStatus',
    'ingestionStatus',
    'bibliographicUrl',
  ]) {
    assert.ok(config.includes(field), `missing problem source field: ${field}`);
  }
  assert.match(config, /work-identified/);
  assert.match(config, /edition-pinned/);
  assert.match(config, /source-only/);
  assert.match(config, /manifest-ready/);
});

test('green book source identifies the work without pretending an edition is pinned', async () => {
  const source = await readFile(sourceFiles.green, 'utf8');
  assert.match(source, /canonicalTitle:\s*["']?A Practical Guide to Quantitative Finance Interviews["']?/);
  assert.match(source, /authors:\s*\[Xinfeng Zhou\]/);
  assert.match(source, /aliases:\s*\[Green Book/);
  assert.match(source, /editionStatus:\s*work-identified/);
  assert.match(source, /ingestionStatus:\s*source-only/);
  assert.match(source, /bibliographicUrl:\s*https:\/\/books\.google\.com\//);
  assert.doesNotMatch(source, /^edition:\s*.+$/m);
  assert.doesNotMatch(source, /^isbn:\s*.+$/m);
});

test('red book source identifies Joshi-Denson-Downes without pretending an edition is pinned', async () => {
  const source = await readFile(sourceFiles.red, 'utf8');
  assert.match(source, /canonicalTitle:\s*["']?Quant Job Interview Questions and Answers["']?/);
  assert.match(source, /authors:\s*\[Mark Joshi, Nicholas Denson, Andrew Downes\]/);
  assert.match(source, /aliases:\s*\[Red Book/);
  assert.match(source, /editionStatus:\s*work-identified/);
  assert.match(source, /ingestionStatus:\s*source-only/);
  assert.match(source, /bibliographicUrl:\s*https:\/\/books\.google\.com\//);
  assert.doesNotMatch(source, /^edition:\s*.+$/m);
  assert.doesNotMatch(source, /^isbn:\s*.+$/m);
});

test('edition-safe ingestion manifests exist for both source works', async () => {
  for (const path of Object.values(manifestFiles)) await access(path);
  const green = JSON.parse(await readFile(manifestFiles.green, 'utf8'));
  const red = JSON.parse(await readFile(manifestFiles.red, 'utf8'));

  assert.deepEqual(green, {
    source: 'green-book',
    canonicalTitle: 'A Practical Guide to Quantitative Finance Interviews',
    editionStatus: 'work-identified',
    edition: null,
    isbn: null,
    sourceFile: null,
    ingestionStatus: 'awaiting-source-file',
    batches: [],
  });
  assert.deepEqual(red, {
    source: 'red-book',
    canonicalTitle: 'Quant Job Interview Questions and Answers',
    editionStatus: 'work-identified',
    edition: null,
    isbn: null,
    sourceFile: null,
    ingestionStatus: 'awaiting-source-file',
    batches: [],
  });
});

test('ingestion validator blocks batches until an exact edition is pinned', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');

  assert.throws(() => validateIngestionManifest({
    source: 'green-book',
    canonicalTitle: 'A Practical Guide to Quantitative Finance Interviews',
    editionStatus: 'work-identified',
    edition: null,
    isbn: null,
    sourceFile: null,
    ingestionStatus: 'awaiting-source-file',
    batches: [{ id: 'gb-01', startPage: 1, endPage: 10, sourceSection: 'Probability' }],
  }), /pin an exact edition/i);

  assert.throws(() => validateIngestionManifest({
    source: 'red-book',
    canonicalTitle: 'Quant Job Interview Questions and Answers',
    editionStatus: 'edition-pinned',
    edition: '2',
    isbn: '9780987122827',
    sourceFile: 'red-book.pdf',
    ingestionStatus: 'manifest-ready',
    batches: [
      { id: 'rb-01', startPage: 10, endPage: 20, sourceSection: 'Probability' },
      { id: 'rb-01', startPage: 21, endPage: 30, sourceSection: 'Mathematics' },
    ],
  }), /duplicate batch id/i);

  assert.throws(() => validateIngestionManifest({
    source: 'red-book',
    canonicalTitle: 'Quant Job Interview Questions and Answers',
    editionStatus: 'edition-pinned',
    edition: '2',
    isbn: '9780987122827',
    sourceFile: 'red-book.pdf',
    ingestionStatus: 'manifest-ready',
    batches: [{ id: 'rb-02', startPage: 30, endPage: 20, sourceSection: 'Mathematics' }],
  }), /page range/i);

  assert.doesNotThrow(() => validateIngestionManifest({
    source: 'red-book',
    canonicalTitle: 'Quant Job Interview Questions and Answers',
    editionStatus: 'edition-pinned',
    edition: '2',
    isbn: '9780987122827',
    sourceFile: 'red-book.pdf',
    ingestionStatus: 'manifest-ready',
    batches: [{ id: 'rb-01', startPage: 10, endPage: 20, sourceSection: 'Probability' }],
  }));
});

test('source pages expose edition and ingestion state rather than implying completeness', async () => {
  const page = await readFile('src/pages/knowledge/quant-interview/sources/[...slug].astro', 'utf8');
  assert.match(page, /Edition status/);
  assert.match(page, /Ingestion status/);
  assert.match(page, /Exact edition not pinned/);
});

test('repository documents edition pinning before bulk source ingestion', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /pin an exact edition/i);
  assert.match(readme, /ingestion manifest/i);
  assert.match(readme, /source file/i);
});
