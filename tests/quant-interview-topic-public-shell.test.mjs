import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const hub = 'src/pages/knowledge/quant-interview/index.astro';
const bank = 'src/pages/problems/index.astro';
const detail = 'src/layouts/ProblemLayout.astro';

const legacySourcePages = [
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

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
  for (const path of [hub, bank, detail, 'src/pages/problems/[...slug].astro', 'src/components/ProblemCard.astro']) {
    const text = await readFile(path, 'utf8');
    assert.doesNotMatch(text, /quant-interview\/coverage|quantInterviewCoverage/);
  }
});

test('legacy source routes are retired and redirected to the Topic-first hub', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /knowledge\/quant-interview\/sources/);
  assert.match(config, /knowledge\/quant-interview/);
  for (const path of legacySourcePages) {
    await assert.rejects(access(path));
  }
});
