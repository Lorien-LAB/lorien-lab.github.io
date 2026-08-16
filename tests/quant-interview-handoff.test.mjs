import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

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

test('repository memory defines the Topic-first cross-book protocol', async () => {
  for (const file of docs) await access(file);
  const readme = await readFile(docs[0], 'utf8');
  assert.match(readme, /repository.*source of truth/i);
  assert.match(readme, /Topic-first/i);
  assert.match(readme, /all three sources/i);

  const protocol = await readFile(docs[1], 'utf8');
  for (const phrase of [
    'Do not trust conversational memory',
    'canonical topic workstream',
    'semantic deduplication',
    'coverage ledger',
    'evidencePageRanges',
    'source page numbers are internal evidence only',
    'npm run test',
    'npm run check',
    'npm run build',
  ]) assert.ok(protocol.includes(phrase), `AGENT_PROTOCOL missing: ${phrase}`);

  for (const phrase of [
    'select one canonical subtopic',
    'resolve all mapped source sections',
    'read every available verified source for that subtopic',
    'inventory concepts, problems, variants, and interview guidance',
    'update or create canonical Knowledge first',
    'update or create canonical Problems',
    'update every inspected coverage entry',
    'review the topic-only diff',
  ]) assert.ok(protocol.includes(phrase), `AGENT_PROTOCOL workflow missing: ${phrase}`);
});

test('content standard makes canonical Problems source-neutral and deduplicated', async () => {
  const standard = await readFile('docs/quant-interview/CONTENT_STANDARD.md', 'utf8');
  assert.match(standard, /Canonical public Problems do not carry source provenance in frontmatter or rendered content/i);
  assert.match(standard, /All source mappings live in hidden coverage data/i);
  assert.match(standard, /duplicate source question enriches a canonical Problem/i);
  assert.match(standard, /does not create a duplicate public page/i);
  assert.match(standard, /knowledge-only[\s\S]*Interview Checks[\s\S]*terminal only/i);
});

test('source catalog records three verified source files without claiming problem completeness', async () => {
  const catalog = await readFile('docs/quant-interview/SOURCE_CATALOG.md', 'utf8');
  assert.match(catalog, /Green Book[\s\S]*First Edition \(2008\)[\s\S]*9781438236667[\s\S]*213 PDF pages/i);
  assert.match(catalog, /Red Book[\s\S]*Version 1\.01 \(2008\)[\s\S]*9781438217031[\s\S]*329 PDF pages/i);
  assert.match(catalog, /150 Questions[\s\S]*First edition \(2013\)[\s\S]*220 PDF pages/i);
  assert.match(catalog, /source-file verification is not problem coverage/i);
  assert.match(catalog, /internal inputs/i);
  assert.match(catalog, /Topic-first/i);
});

test('handoff records first Stage D cross-book fusion as complete and stays topic-first', async () => {
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  for (const stage of ['Stage A', 'Stage B', 'Stage C', 'Stage D']) assert.match(handoff, new RegExp(`${stage}[\\s\\S]*complete`, 'i'));
  assert.match(handoff, /linear-algebra-covariance-correlation-psd-001/);
  assert.match(handoff, /31946376343/);
  assert.match(handoff, /fb8664b85ac1ea6a0d1d5145ce32143e0455a288/);
  for (const slug of [
    'correlation-matrix-parameter-range',
    'covariance-matrix-positive-semidefinite-proof',
    'covariance-to-correlation-matrix',
    'equicorrelation-matrix-bounds',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /knowledge-only/i);
  assert.match(handoff, /variant/i);
  assert.match(handoff, /merged-duplicate/i);
  assert.match(handoff, /positive semidefinite[\s\S]*leading principal minors|leading principal minors[\s\S]*positive semidefinite/i);
  assert.match(handoff, /source-neutral/i);
  assert.match(handoff, /hidden coverage/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Linear Algebra & Matrix Methods/i);
  assert.match(nextAction, /Determinants & Eigenvalues/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
  assert.doesNotMatch(nextAction, /Green[^\n]*(?:then|→)[^\n]*Red|Red[^\n]*(?:then|→)[^\n]*150/i);
});

test('all three TOCs are source-file-verified without implying problem completeness', async () => {
  for (const file of Object.values(tocPaths)) await access(file);
  const green = JSON.parse(await readFile(tocPaths.green, 'utf8'));
  const red = JSON.parse(await readFile(tocPaths.red, 'utf8'));
  const q150 = JSON.parse(await readFile(tocPaths.q150, 'utf8'));
  for (const toc of [green, red, q150]) {
    assert.equal(toc.tocStatus, 'source-file-verified');
    assert.equal(toc.coverageClaim, 'verified-structure-not-problem-complete');
  }
  assert.equal(green.edition, 'First Edition (2008)');
  assert.equal(green.sourceFileEvidence.pdfPageCount, 213);
  assert.equal(red.edition, 'Version 1.01 (2008)');
  assert.equal(red.sourceFileEvidence.pdfPageCount, 329);
  assert.equal(q150.edition, 'First edition (2013)');
  assert.equal(q150.sourceFileEvidence.pdfPageCount, 220);
});

test('150 Questions completed pilot batches retain reusable internal evidence', async () => {
  const manifest = JSON.parse(await readFile('src/data/quant-interview/150-most-frequently-asked.json', 'utf8'));
  assert.equal(manifest.batches.length, 2);
  assert.deepEqual(manifest.batches[0].evidencePageRanges, [{ startPage: 1, endPage: 6 }]);
  assert.deepEqual(manifest.batches[1].evidencePageRanges, [{ startPage: 7, endPage: 9 }]);
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
});

test('Green and Red manifests are verified, edition-pinned, and not problem-complete', async () => {
  const expected = {
    'green-book': ['First Edition (2008)', '9781438236667', 213],
    'red-book': ['Version 1.01 (2008)', '9781438217031', 329],
  };
  for (const [slug, [edition, isbn, pages]] of Object.entries(expected)) {
    const manifest = JSON.parse(await readFile(`src/data/quant-interview/${slug}.json`, 'utf8'));
    assert.equal(manifest.editionStatus, 'edition-pinned');
    assert.equal(manifest.edition, edition);
    assert.equal(manifest.isbn, isbn);
    assert.equal(manifest.sourceFileMeta.verification, 'source-file-verified');
    assert.equal(manifest.sourceFileMeta.pdfPageCount, pages);
    assert.equal(manifest.ingestionStatus, 'manifest-ready');
    assert.deepEqual(manifest.batches, []);
  }
});

test('no copyrighted source PDF or scan is committed', async () => {
  const repoFiles = await readdir('.', { recursive: true });
  const suspicious = repoFiles.filter((name) => /(?:green-book|red-book|150-most-frequently-asked).*(?:\.pdf|\.png|\.jpe?g)$/i.test(String(name)));
  assert.deepEqual(suspicious, []);
});

test('root README points agents to durable Quant Interview repository memory', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /docs\/quant-interview\/README\.md/);
  assert.match(readme, /repository.*memory/i);
});
