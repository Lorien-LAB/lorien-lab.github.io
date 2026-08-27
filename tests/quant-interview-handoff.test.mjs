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
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const workstream012Path = 'src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json';
const workstream013Path = 'src/data/quant-interview/workstreams/interview-strategy-communication-reasoning-communication-013.json';

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

test('handoff records five completed cross-book workstreams and advances to combinatorial probability', async () => {
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

  assert.match(handoff, /linear-algebra-determinants-eigenvalues-002/);
  assert.match(handoff, /31948322741/);
  assert.match(handoff, /b070f6f9c318372dfcf0d942f3a67299a8e4a493/);
  for (const slug of [
    'eigenvalues-eigenvectors',
    'matrix-spectral-invariants',
    'eigenbasis-decomposition',
    'two-by-two-eigensystem',
    'apply-matrix-via-eigenbasis',
    'trace-ab-equals-trace-ba',
    'commutator-cannot-equal-identity',
  ]) assert.match(handoff, new RegExp(slug));

  assert.match(handoff, /linear-algebra-matrix-decompositions-003/);
  assert.match(handoff, /31952974738/);
  assert.match(handoff, /970d2a1d82d9e54a2881411a424e3313bfd16b58/);
  for (const slug of [
    'qr-decomposition',
    'lu-cholesky-decomposition',
    'singular-value-decomposition',
    'least-squares-via-qr',
    'matrix-square-root-and-cholesky-factor',
    'generate-correlated-gaussians',
  ]) assert.match(handoff, new RegExp(slug));

  assert.match(handoff, /linear-algebra-vectors-linear-systems-004/);
  assert.match(handoff, /31962131820/);
  assert.match(handoff, /d9bed1bb89de8ce81ae89971ce3fd31fdbe49343/);
  for (const slug of [
    'vector-geometry-inner-products',
    'linear-independence-span-basis-rank',
    'linear-systems-consistency',
    'product-of-row-stochastic-matrices',
    'rank-and-consistency-of-linear-system',
  ]) assert.match(handoff, new RegExp(slug));

  const foundationsWorkstream = JSON.parse(await readFile(
    'src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json',
    'utf8',
  ));
  assert.equal(foundationsWorkstream.status, 'complete');
  assert.ok(foundationsWorkstream.verification?.commit);
  assert.ok(Number.isInteger(foundationsWorkstream.verification?.runId));
  assert.equal(foundationsWorkstream.verification?.conclusion, 'success');

  assert.match(handoff, /probability-statistics-probability-foundations-005/);
  assert.match(handoff, new RegExp(foundationsWorkstream.verification.commit));
  assert.match(handoff, new RegExp(String(foundationsWorkstream.verification.runId)));
  for (const slug of [
    'probability-spaces-events',
    'probability-axioms-derived-rules',
    'symmetry-equiprobability-geometric-probability',
    'more-heads-with-one-extra-coin',
    'higher-card-by-symmetry',
    'drunk-passenger-last-seat',
    'random-points-in-a-semicircle',
    'minimum-trials-for-at-least-one-hit',
    'romeo-juliet-meeting-probability',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /item-level/i);
  assert.match(handoff, /canonical extension/i);
  assert.match(handoff, /source-derived/i);
  assert.match(handoff, /provenance/i);
  assert.match(handoff, /merged-duplicate|same canonical Problem|one canonical Problem/i);
  assert.match(handoff, /24 canonical Problems/i);
  assert.match(handoff, /24 explicitly topic-classified|24 topic-classified/i);

  assert.match(handoff, /knowledge-only/i);
  assert.match(handoff, /source-neutral/i);
  assert.match(handoff, /hidden coverage/i);
  assert.match(handoff, /five|5[\s-]*child topics|all five/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Historical transition marker/i);
  assert.match(nextAction, /Combinatorial Probability/i);
  assert.doesNotMatch(nextAction, /Probability Foundations[\s\S]{0,180}(?:execute|next|continue)/i);
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

test('handoff current topic and remaining queue follow workstream 012 status', async () => {
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  const workstream012 = JSON.parse(await readFile(workstream012Path, 'utf8'));
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/\n## /)[0] ?? '';
  const currentTitle = current.split(/\r?\n/).find((line) => /\*\*/.test(line)) ?? '';
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/\n## /)[0] ?? '';
  assert.equal(workstream011.status, 'complete');
  if (workstream012.status === 'active') {
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Reasoning & Communication/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^.\n]*012/i);
  } else {
    assert.equal(workstream012.status, 'complete');
    assert.match(workstream012.preClosureActiveGate?.commit ?? '', /^[0-9a-f]{40}$/);
    assert.equal(workstream012.verification?.commit, workstream012.preClosureActiveGate.commit);
    assert.ok(Number.isInteger(workstream012.verification?.runId) && workstream012.verification.runId > 0);
    assert.match(handoff, new RegExp(workstream012.verification.commit));
    assert.match(handoff, new RegExp(String(workstream012.verification.runId)));
    assert.match(handoff, /76[^\n]*Problems[^\n]*50[^\n]*Knowledge/i);
    assert.doesNotMatch(currentTitle, /Limits & Derivatives/i);
    const workstream013 = JSON.parse(await readFile(workstream013Path, 'utf8'));
    if (workstream013.status === 'active') {
      assert.match(current, /Interview Strategy & Communication/i);
      assert.match(current, /Reasoning & Communication/i);
      assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012/i);
      assert.match(coordination, /remaining integration queue[^\n]*013/i);
      assert.doesNotMatch(coordination, /completed queue entr(?:y|ies)[^\n]*013/i);
    } else {
      assert.equal(workstream013.status, 'complete');
      assert.match(current, /No bounded topic is active.*011.*012.*013.*queue is closed/is);
      assert.match(current, /A later workstream requires its own approved design and evidence audit/i);
      assert.match(coordination, /completed queue entr(?:y|ies)[^\n]*011[^\n]*012[^\n]*013/i);
      assert.doesNotMatch(coordination, /remaining integration queue[^\n]*013/i);
    }
  }
});
