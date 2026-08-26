import test from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const hub = 'src/pages/knowledge/quant-interview/index.astro';
const bank = 'src/pages/problems/index.astro';
const detail = 'src/layouts/ProblemLayout.astro';
const repositoryRoot = path.resolve();
const hiddenPublicState = /src[\\/]data[\\/]quant-interview[\\/](?:coverage[\\/]|topics[\\/]source-topic-map\.json$)|workstreams/;
const importPattern = /(?:import|export)\s+(?:[^'"\n]*?\s+from\s+)?['"]([^'"]+)['"]/g;

const legacySourcePages = [
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

const isRepositoryPath = (candidate) => {
  const relative = path.relative(repositoryRoot, candidate);
  return relative && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
};

async function resolveLocalImport(from, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(from), specifier);
  const candidates = path.extname(base)
    ? [base]
    : [base, ...['.astro', '.ts', '.js', '.mjs', '.json'].map((extension) => `${base}${extension}`)];
  for (const candidate of candidates) {
    if (!isRepositoryPath(candidate)) continue;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // An unresolvable local import is not part of the traversal.
    }
  }
  return null;
}

async function assertNoHiddenCoverageImports(root) {
  const pending = [path.resolve(root)];
  const visited = new Set();
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    if (hiddenPublicState.test(path.relative(repositoryRoot, current))) {
      throw new Error(`hidden coverage import: ${path.relative(repositoryRoot, current)}`);
    }
    const source = await readFile(current, 'utf8');
    for (const match of source.matchAll(importPattern)) {
      const dependency = await resolveLocalImport(current, match[1]);
      if (dependency) pending.push(dependency);
    }
  }
}

test('public topic primitives depend only on the canonical taxonomy', async () => {
  const loader = await readFile('src/lib/quantInterviewPublicTopics.ts', 'utf8');
  const card = await readFile('src/components/QuantInterviewTopicCard.astro', 'utf8');
  assert.match(loader, /topics\/taxonomy\.json/);
  assert.match(loader, /flattenPublicQuantInterviewTopics/);
  assert.doesNotMatch(loader, /source-topic-map|quant-interview\/coverage|quantInterviewCoverage/);
  assert.match(card, /knowledgeCount/);
  assert.match(card, /problemCount/);
  assert.match(card, /\?topic=/);
  assert.doesNotMatch(card, /problemSources|quant-interview\/coverage|quantInterviewCoverage/);
});

test('Quant Interview hub is Topic-first and source-neutral', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /Learn by Topic/i);
  assert.match(text, /QuantInterviewTopicCard/);
  assert.doesNotMatch(text, /Explore Sources|sourceStats|source-grid|All sources/i);
  assert.doesNotMatch(text, /getCollection\(['"]problemSources['"]\)/);
});

test('migrated content activates dynamic topic counts instead of hard-coded topic totals', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /entry\.data\.quantInterviewTopics\.some/);
  assert.match(text, /knowledgeCount:/);
  assert.match(text, /problemCount:/);
  assert.match(text, /descendantIds/);

  const problemFiles = await readdir('src/content/problems', { recursive: true });
  const knowledgeFiles = await readdir('src/content/knowledge', { recursive: true });
  const classifiedProblems = [];
  const classifiedKnowledge = [];
  for (const file of problemFiles.filter((name) => String(name).endsWith('.md'))) {
    const source = await readFile(`src/content/problems/${file}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(source)) classifiedProblems.push(file);
  }
  for (const file of knowledgeFiles.filter((name) => String(name).endsWith('.md'))) {
    const source = await readFile(`src/content/knowledge/${file}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(source)) classifiedKnowledge.push(file);
  }
  assert.ok(classifiedProblems.length >= 6, 'expected migrated canonical Problems to drive topic counts');
  assert.ok(classifiedKnowledge.length >= 12, 'expected migrated reusable Knowledge to drive topic counts');
});

test('Problem Bank filters by topic, not source', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /data-topic-filter/);
  assert.match(text, /data-topics/);
  assert.doesNotMatch(text, /data-source-filter|All sources|sourceOptions|sourceBySlug/);
});

test('Problem Bank expands topic ancestry and supports taxonomy-backed query prefiltering', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /flattenPublicQuantInterviewTopics/);
  assert.match(text, /expandTopicIdsWithAncestors\(problem\.data\.quantInterviewTopics\)/);
  assert.match(text, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(text, /get\(['"]topic['"]\)/);
  assert.match(text, /topic\.value = requestedTopic/);
});

test('Problem detail renders no public source provenance', async () => {
  const text = await readFile(detail, 'utf8');
  assert.doesNotMatch(text, /sourceLine|sourceReference|shortTitle|source-line/);
});

test('public topic shell cannot import hidden coverage data', async () => {
  for (const root of [hub, bank, detail, 'src/pages/problems/[...slug].astro', 'src/components/ProblemCard.astro', 'src/pages/knowledge/quant-interview/directory.astro']) {
    await assert.doesNotReject(assertNoHiddenCoverageImports(root));
  }
});

test('public shell guard follows local directory dependencies', async (t) => {
  const fixtureDirectory = await mkdtemp(path.resolve('tests', '.public-shell-'));
  t.after(() => rm(fixtureDirectory, { recursive: true, force: true }));
  const root = path.join(fixtureDirectory, 'directory.astro');
  await writeFile(root, "import './public-helper.mjs';\n", 'utf8');
  await writeFile(
    path.join(fixtureDirectory, 'public-helper.mjs'),
    "import '../../src/data/quant-interview/coverage/green-book.json';\n",
    'utf8',
  );
  await assert.rejects(
    assertNoHiddenCoverageImports(root),
    /hidden coverage import/,
  );
});

test('legacy source routes are retired and redirected to the Topic-first hub', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /knowledge\/quant-interview\/sources/);
  assert.match(config, /knowledge\/quant-interview/);
  for (const path of legacySourcePages) {
    await assert.rejects(access(path));
  }
});
