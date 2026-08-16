import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const hub = 'src/pages/knowledge/quant-interview/index.astro';
const bank = 'src/pages/problems/index.astro';
const detail = 'src/layouts/ProblemLayout.astro';

const legacySourcePages = [
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

test('Quant Interview hub is Topic-first and source-neutral', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /Learn by Topic/i);
  assert.match(text, /QuantInterviewTopicCard/);
  assert.doesNotMatch(text, /Explore Sources|sourceStats|source-grid|All sources/i);
  assert.doesNotMatch(text, /getCollection\(['"]problemSources['"]\)/);
});

test('Problem Bank filters by topic, not source', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /data-topic-filter/);
  assert.match(text, /data-topics/);
  assert.doesNotMatch(text, /data-source-filter|All sources|sourceOptions|sourceBySlug/);
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
