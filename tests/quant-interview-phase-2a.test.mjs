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

const batch = (overrides = {}) => ({
  id: 'rb-01',
  sourceSection: 'Probability',
  expectedProblemScope: ['1'],
  evidencePageRanges: [{ startPage: 10, endPage: 20 }],
  ...overrides,
});

const pinnedManifest = (batches) => ({
  source: 'red-book',
  canonicalTitle: 'Quant Job Interview Questions and Answers',
  editionStatus: 'edition-pinned',
  edition: 'Version 1.01 (2008)',
  isbn: '9781438217031',
  sourceFile: 'sha256:09c5aac761bd71c4a6b9406f50dcfe73d8af3ce0a3ef9bb4fe2d65d0b27db6b1',
  ingestionStatus: 'manifest-ready',
  batches,
});

test('problem source schema tracks work identity, edition safety, and ingestion state', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  for (const field of [
    'canonicalTitle',
    'aliases',
    'publisher',
    'editionStatus',
    'ingestionStatus',
    'bibliographicUrl',
  ]) assert.ok(config.includes(field), `missing problem source field: ${field}`);
  assert.match(config, /work-identified/);
  assert.match(config, /edition-pinned/);
  assert.match(config, /source-only/);
  assert.match(config, /manifest-ready/);
});

test('Green Book source is pinned to the verified First Edition file', async () => {
  const source = await readFile(sourceFiles.green, 'utf8');
  assert.match(source, /canonicalTitle:\s*["']?A Practical Guide to Quantitative Finance Interviews["']?/);
  assert.match(source, /authors:\s*\[Xinfeng Zhou\]/);
  assert.match(source, /edition:\s*First Edition \(2008\)/);
  assert.match(source, /editionStatus:\s*edition-pinned/);
  assert.match(source, /ingestionStatus:\s*manifest-ready/);
  assert.match(source, /isbn:\s*['"]9781438236667['"]/);
});

test('Red Book source is pinned to the verified Version 1.01 file', async () => {
  const source = await readFile(sourceFiles.red, 'utf8');
  assert.match(source, /canonicalTitle:\s*["']?Quant Job Interview Questions and Answers["']?/);
  assert.match(source, /authors:\s*\[Mark Joshi, Nicholas Denson, Andrew Downes\]/);
  assert.match(source, /edition:\s*Version 1\.01 \(2008\)/);
  assert.match(source, /editionStatus:\s*edition-pinned/);
  assert.match(source, /ingestionStatus:\s*manifest-ready/);
  assert.match(source, /isbn:\s*['"]9781438217031['"]/);
});

test('verified source manifests are pinned and batch-free before topic ingestion', async () => {
  for (const path of Object.values(manifestFiles)) await access(path);
  const green = JSON.parse(await readFile(manifestFiles.green, 'utf8'));
  const red = JSON.parse(await readFile(manifestFiles.red, 'utf8'));

  assert.equal(green.editionStatus, 'edition-pinned');
  assert.equal(green.edition, 'First Edition (2008)');
  assert.equal(green.isbn, '9781438236667');
  assert.equal(green.sourceFileMeta.pdfPageCount, 213);
  assert.equal(green.ingestionStatus, 'manifest-ready');
  assert.deepEqual(green.batches, []);

  assert.equal(red.editionStatus, 'edition-pinned');
  assert.equal(red.edition, 'Version 1.01 (2008)');
  assert.equal(red.isbn, '9781438217031');
  assert.equal(red.sourceFileMeta.pdfPageCount, 329);
  assert.equal(red.ingestionStatus, 'manifest-ready');
  assert.deepEqual(red.batches, []);
});

test('ingestion validator still blocks batches until an exact edition is pinned', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.throws(() => validateIngestionManifest({
    source: 'green-book', canonicalTitle: 'A Practical Guide to Quantitative Finance Interviews',
    editionStatus: 'work-identified', edition: null, isbn: null, sourceFile: null,
    ingestionStatus: 'awaiting-source-file', batches: [batch()],
  }), /pin an exact edition/i);
});

test('ingestion validator rejects duplicate batch ids and duplicate semantic ownership', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.throws(() => validateIngestionManifest(pinnedManifest([
    batch(), batch({ sourceSection: 'Mathematics', expectedProblemScope: ['2'] }),
  ])), /duplicate batch id/i);

  assert.throws(() => validateIngestionManifest(pinnedManifest([
    batch({ id: 'a', expectedProblemScope: ['3'] }),
    batch({ id: 'b', expectedProblemScope: ['3'], evidencePageRanges: [{ startPage: 30, endPage: 31 }] }),
  ])), /duplicate source problem ownership/i);
});

test('ingestion validator validates semantic scope and evidence shape', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ expectedProblemScope: [] })])), /expectedProblemScope/i);
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ expectedProblemScope: [''] })])), /source problem identifier/i);
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ evidencePageRanges: [] })])), /evidencePageRanges/i);
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ evidencePageRanges: [{ startPage: 30, endPage: 20 }] })])), /evidence page range/i);
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ evidencePageRanges: [{ startPage: 20, endPage: 25 }, { startPage: 10, endPage: 12 }] })])), /unsorted or overlapping/i);
  assert.throws(() => validateIngestionManifest(pinnedManifest([batch({ evidencePageRanges: [{ startPage: 10, endPage: 20 }, { startPage: 20, endPage: 22 }] })])), /unsorted or overlapping/i);
});

test('ingestion validator allows cross-batch evidence overlap for different semantic scopes', async () => {
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.doesNotThrow(() => validateIngestionManifest(pinnedManifest([
    batch({ id: 'a', expectedProblemScope: ['1'], evidencePageRanges: [{ startPage: 10, endPage: 20 }] }),
    batch({ id: 'b', expectedProblemScope: ['2'], evidencePageRanges: [{ startPage: 20, endPage: 25 }] }),
  ])));
});

test('source verification remains internal after public source routes retire', async () => {
  for (const path of [
    'src/data/quant-interview/green-book.json',
    'src/data/quant-interview/red-book.json',
    'src/data/quant-interview/150-most-frequently-asked.json',
  ]) {
    const manifest = JSON.parse(await readFile(path, 'utf8'));
    assert.equal(manifest.editionStatus, 'edition-pinned');
    assert.equal(manifest.sourceFileMeta.verification, 'source-file-verified');
    assert.ok(manifest.sourceFile);
    assert.ok(manifest.ingestionStatus);
  }

  await assert.rejects(access('src/pages/knowledge/quant-interview/sources/index.astro'));
  await assert.rejects(access('src/pages/knowledge/quant-interview/sources/[...slug].astro'));
  const astroConfig = await readFile('astro.config.mjs', 'utf8');
  assert.match(astroConfig, /knowledge\/quant-interview\/sources/);
  assert.match(astroConfig, /knowledge\/quant-interview/);
});

test('repository still documents source verification as a prerequisite to ingestion', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /source file/i);
  assert.match(readme, /ingestion manifest/i);
});
