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

test('quant interview handoff exposes five focused repository-memory documents', async () => {
  for (const file of docs) await access(file);

  const readme = await readFile(docs[0], 'utf8');
  assert.match(readme, /repository.*source of truth/i);
  assert.match(readme, /HANDOFF\.md/);
  assert.match(readme, /target source/i);
  assert.match(readme, /one bounded batch/i);

  const protocol = await readFile(docs[1], 'utf8');
  for (const phrase of [
    'Do not trust conversational memory',
    'task-specific branch',
    'Concept',
    'Technique',
    'one bounded batch',
    'npm run test',
    'npm run check',
    'npm run build',
  ]) assert.ok(protocol.includes(phrase), `AGENT_PROTOCOL missing: ${phrase}`);

  const standard = await readFile(docs[2], 'utf8');
  assert.match(standard, /S0.*answer only/s);
  assert.match(standard, /S5.*extension\/generalization/s);
  for (const heading of ['Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.ok(standard.includes(heading), `CONTENT_STANDARD missing: ${heading}`);
  }

  const handoff = await readFile(docs[4], 'utf8');
  assert.match(handoff, /Phase 2B/);
  assert.match(handoff, /source file/i);
  assert.doesNotMatch(handoff, /chronological transcript/i);
});

test('source catalog truthfully separates work identity, TOC seed, source-file verification, and edition pinning', async () => {
  const catalog = await readFile('docs/quant-interview/SOURCE_CATALOG.md', 'utf8');
  for (const name of [
    'A Practical Guide to Quantitative Finance Interviews',
    'Quant Job Interview Questions and Answers',
    '150 Most Frequently Asked Questions on Quant Interviews',
  ]) assert.ok(catalog.includes(name), `catalog missing ${name}`);

  assert.match(catalog, /Green Book[\s\S]*work-identified[\s\S]*user-supplied/i);
  assert.match(catalog, /Red Book[\s\S]*work-identified[\s\S]*user-supplied/i);
  assert.match(catalog, /150 Questions[\s\S]*edition-pinned[\s\S]*2013/i);
  assert.match(catalog, /source-file-verified/);
  assert.match(catalog, /problem-indexed/);
});

test('three TOC seeds are machine-readable and do not overclaim problem-level completeness', async () => {
  for (const file of Object.values(tocPaths)) await access(file);
  const green = JSON.parse(await readFile(tocPaths.green, 'utf8'));
  const red = JSON.parse(await readFile(tocPaths.red, 'utf8'));
  const q150 = JSON.parse(await readFile(tocPaths.q150, 'utf8'));

  for (const toc of [green, red, q150]) {
    assert.equal(toc.tocStatus, 'user-supplied');
    assert.equal(toc.coverageClaim, 'structure-seed-not-problem-complete');
    assert.ok(Array.isArray(toc.sections) && toc.sections.length > 0);
  }

  assert.equal(green.source, 'green-book');
  assert.equal(green.editionStatus, 'work-identified');
  assert.equal(green.edition, null);
  assert.ok(green.sections.some((s) => s.id === '4' && /Probability Theory/.test(s.title)));

  assert.equal(red.source, 'red-book');
  assert.equal(red.editionStatus, 'work-identified');
  assert.equal(red.edition, null);
  assert.ok(red.sections.some((s) => s.id === '2' && s.startPage === 27 && /Option Pricing/.test(s.title)));

  assert.equal(q150.source, '150-most-frequently-asked');
  assert.equal(q150.editionStatus, 'edition-pinned');
  assert.equal(q150.edition, 'First edition (2013)');
  assert.ok(q150.sections.some((s) => s.id === '2' && s.startPage === 17));
  assert.ok(q150.sections.some((s) => s.id === '3' && s.startPage === 41));
});

test('150 Questions has a pinned bibliographic source record but no ingestion batches without the actual source file', async () => {
  const source = await readFile('src/content/problem-sources/150-most-frequently-asked.md', 'utf8');
  assert.match(source, /canonicalTitle: 150 Most Frequently Asked Questions on Quant Interviews/);
  assert.match(source, /authors: \[Dan Stefanica, Rados Radoicic, Tai-Ho Wang\]/);
  assert.match(source, /publisher: (Financial Engineering Press|FE Press)/);
  assert.match(source, /year: 2013/);
  assert.match(source, /edition: First edition \(2013\)/);
  assert.match(source, /editionStatus: edition-pinned/);
  assert.match(source, /isbn: ['"]?9780979757648['"]?/);
  assert.match(source, /bibliographicUrl: https:\/\/www\.fepress\.org\/150iqs\//);

  const manifest = JSON.parse(await readFile('src/data/quant-interview/150-most-frequently-asked.json', 'utf8'));
  assert.equal(manifest.editionStatus, 'edition-pinned');
  assert.equal(manifest.edition, 'First edition (2013)');
  assert.equal(manifest.isbn, '9780979757648');
  assert.equal(manifest.sourceFile, null);
  assert.equal(manifest.ingestionStatus, 'awaiting-source-file');
  assert.deepEqual(manifest.batches, []);

  const { validateIngestionManifest } = await import('../src/lib/quantInterviewIngestion.mjs');
  assert.doesNotThrow(() => validateIngestionManifest(manifest));
  assert.throws(() => validateIngestionManifest({
    ...manifest,
    batches: [{ id: '150-math-01', startPage: 18, endPage: 19, sourceSection: '2.1 Mathematics' }],
  }), /source file/i);
});

test('Green and Red manifests remain unpinned while their user-supplied TOCs are only structural seeds', async () => {
  for (const slug of ['green-book', 'red-book']) {
    const manifest = JSON.parse(await readFile(`src/data/quant-interview/${slug}.json`, 'utf8'));
    assert.equal(manifest.editionStatus, 'work-identified');
    assert.equal(manifest.edition, null);
    assert.equal(manifest.isbn, null);
    assert.equal(manifest.sourceFile, null);
    assert.deepEqual(manifest.batches, []);
  }
});

test('this handoff phase does not ingest source-derived problems or source PDFs', async () => {
  const problemFiles = await collectMarkdown('src/content/problems');
  for (const file of problemFiles) {
    const text = await readFile(file, 'utf8');
    assert.doesNotMatch(text, /^source:\s*(green-book|red-book|150-most-frequently-asked)\s*$/m, `source-derived problem unexpectedly added: ${file}`);
  }

  const repoFiles = await readdir('.', { recursive: true });
  const suspicious = repoFiles.filter((name) => /(?:green-book|red-book|150-most-frequently-asked).*(?:\.pdf|\.png|\.jpe?g)$/i.test(String(name)));
  assert.deepEqual(suspicious, []);
});

test('root README points future agents to the compact quant interview onboarding entry', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /docs\/quant-interview\/README\.md/);
  assert.match(readme, /repository.*memory/i);
});
