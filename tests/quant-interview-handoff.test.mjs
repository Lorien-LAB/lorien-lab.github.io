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

const pilotProblems = [
  'src/content/problems/150-most-frequently-asked/put-quotes-zero-cost-static-portfolio.md',
  'src/content/problems/150-most-frequently-asked/missing-digit-power-of-two.md',
];

const pilotKnowledge = [
  'src/content/knowledge/concepts/no-arbitrage-principle.md',
  'src/content/knowledge/concepts/option-price-convexity-in-strike.md',
  'src/content/knowledge/concepts/static-arbitrage-construction.md',
  'src/content/knowledge/concepts/modular-arithmetic.md',
  'src/content/knowledge/concepts/modular-invariants.md',
];

test('quant interview repository memory records verified bounded batches', async () => {
  for (const file of docs) await access(file);
  const readme = await readFile(docs[0], 'utf8');
  assert.match(readme, /repository.*source of truth/i);
  assert.match(readme, /one bounded batch/i);

  const protocol = await readFile(docs[1], 'utf8');
  for (const phrase of ['Do not trust conversational memory', 'task-specific branch', 'Concept', 'Technique', 'one bounded batch', 'npm run test', 'npm run check', 'npm run build']) {
    assert.ok(protocol.includes(phrase), `AGENT_PROTOCOL missing: ${phrase}`);
  }

  const handoff = await readFile(docs[4], 'utf8');
  assert.match(handoff, /Phase 2B/);
  assert.match(handoff, /150-first-look-q01-q02/);
  assert.match(handoff, /150-first-look-q04-q05/);
  assert.match(handoff, /44f8710b12aa85085357e8ea04640b0acfde2d94/);
  assert.match(handoff, /31936372883/);
});

test('source catalog retains bounded-coverage truth until Stage A repository memory is rewritten', async () => {
  const catalog = await readFile('docs/quant-interview/SOURCE_CATALOG.md', 'utf8');
  assert.match(catalog, /150 Questions[\s\S]*source-file-verified[\s\S]*2013/i);
  assert.match(catalog, /problem-indexed for validated Q1–Q2 and Q4–Q5 only/i);
  assert.match(catalog, /book is not complete/i);
});

test('all three source TOCs are now source-file-verified without implying problem completeness', async () => {
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

test('150 Questions manifest preserves completed verified bounded batches with reusable evidence', async () => {
  const manifest = JSON.parse(await readFile('src/data/quant-interview/150-most-frequently-asked.json', 'utf8'));
  assert.equal(manifest.sourceFile, 'sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14');
  assert.equal(manifest.ingestionStatus, 'ingesting');
  assert.equal(manifest.batches.length, 2);
  assert.equal(manifest.batches[0].id, '150-first-look-q01-q02');
  assert.deepEqual(manifest.batches[0].evidencePageRanges, [{ startPage: 1, endPage: 6 }]);
  assert.equal(manifest.batches[0].status, 'complete');
  assert.equal(manifest.batches[0].verificationStatus, 'passed');
  assert.equal(manifest.batches[1].id, '150-first-look-q04-q05');
  assert.deepEqual(manifest.batches[1].evidencePageRanges, [{ startPage: 7, endPage: 9 }]);
  assert.equal(manifest.batches[1].status, 'complete');
  assert.equal(manifest.batches[1].verificationStatus, 'passed');
  assert.equal(manifest.batches[1].verifiedCommit, '44f8710b12aa85085357e8ea04640b0acfde2d94');
  assert.equal(manifest.batches[1].verificationRunId, 31936372883);
  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
});

test('pilot problems are source-linked, independently structured, and S3-plus shaped', async () => {
  for (const file of pilotProblems) {
    await access(file);
    const text = await readFile(file, 'utf8');
    assert.match(text, /^originType:\s*book$/m);
    assert.match(text, /^source:\s*150-most-frequently-asked$/m);
    assert.match(text, /^status:\s*solved$/m);
    for (const marker of ['## Problem', '## Think Before Revealing', '<summary>Hint 1</summary>', '<summary>Show Solution</summary>', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) {
      assert.ok(text.includes(marker), `${file} missing ${marker}`);
    }
  }

  const q1 = await readFile(pilotProblems[0], 'utf8');
  assert.match(q1, /ordinary convexity by itself permits equality/i);
  assert.match(q1, /positive whenever `0 < S_T < 30`/);

  const q2 = await readFile(pilotProblems[1], 'utf8');
  assert.match(q2, /2\^6 = 64 ≡ 1 \(mod 9\)/);
  assert.match(q2, /x = 4/);
});

test('pilot ontology contains reusable concepts and correctly typed techniques', async () => {
  for (const file of pilotKnowledge) await access(file);
  for (const file of [
    'src/content/knowledge/concepts/static-arbitrage-construction.md',
    'src/content/knowledge/concepts/modular-invariants.md',
  ]) {
    const text = await readFile(file, 'utf8');
    assert.match(text, /^type:\s*concept$/m);
    assert.match(text, /^category:\s*Problem Solving Techniques$/m);
  }
});

test('Green and Red manifests are edition-pinned, verified, and batch-free before topic ingestion', async () => {
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
    assert.deepEqual(manifest.batches, []);
  }
});

test('no copyrighted source PDF or scan is committed', async () => {
  const repoFiles = await readdir('.', { recursive: true });
  const suspicious = repoFiles.filter((name) => /(?:green-book|red-book|150-most-frequently-asked).*(?:\.pdf|\.png|\.jpe?g)$/i.test(String(name)));
  assert.deepEqual(suspicious, []);
});

test('root README still points agents to quant interview repository memory', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /docs\/quant-interview\/README\.md/);
  assert.match(readme, /repository.*memory/i);
});
