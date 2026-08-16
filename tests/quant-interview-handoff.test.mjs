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

test('quant interview repository memory records a completed verified pilot batch', async () => {
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
  assert.match(handoff, /status: `complete`/);
  assert.match(handoff, /31935080008/);
});

test('source catalog reflects verified pilot coverage without implying book completeness', async () => {
  const catalog = await readFile('docs/quant-interview/SOURCE_CATALOG.md', 'utf8');
  assert.match(catalog, /Green Book[\s\S]*not source-file-verified/i);
  assert.match(catalog, /Red Book[\s\S]*not source-file-verified/i);
  assert.match(catalog, /150 Questions[\s\S]*source-file-verified[\s\S]*2013/i);
  assert.match(catalog, /problem-indexed for the validated Q1–Q2 pilot only/i);
  assert.match(catalog, /book is not complete/i);
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
  assert.equal(q150.tocStatus, 'source-file-verified');
  assert.equal(q150.coverageClaim, 'verified-structure-not-problem-complete');
  assert.equal(q150.edition, 'First edition (2013)');
  assert.equal(q150.sourceFileEvidence.pdfPageCount, 220);
  assert.deepEqual(q150.sourceFileEvidence.bodyStart, { pdfPage: 11, displayPage: 1 });
  assert.deepEqual(q150.sourceFileEvidence.bibliography, { pdfPage: 219, displayPage: 209 });
});

test('150 Questions manifest records one completed verified bounded batch', async () => {
  const manifest = JSON.parse(await readFile('src/data/quant-interview/150-most-frequently-asked.json', 'utf8'));
  assert.equal(manifest.sourceFile, 'sha256:d753f3516ce06d8e7242bcdd7252d39ffbc33f9217c6cf8a7e826b658b533e14');
  assert.equal(manifest.ingestionStatus, 'ingesting');
  assert.deepEqual(manifest.batches, [{
    id: '150-first-look-q01-q02',
    startPage: 1,
    endPage: 6,
    sourceSection: '1 First Look: Ten Questions',
    expectedProblemScope: ['1', '2'],
    problemSlugs: ['put-quotes-zero-cost-static-portfolio', 'missing-digit-power-of-two'],
    status: 'complete',
    verificationStatus: 'passed',
    verifiedCommit: '390f132e1d54c428d30d09e6b2f75dcd24e948d0',
    verificationRunId: 31935080008,
    completedDate: '2026-08-16',
  }]);
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
