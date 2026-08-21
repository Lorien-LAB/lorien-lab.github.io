import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-expectation-variance-covariance-009.json';
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [source, await readJson(`src/data/quant-interview/${source}.json`)]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

test('ninth cross-book workstream is bounded to expectation variance covariance', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-expectation-variance-covariance-009');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'expectation-variance-covariance']);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});

test('workstream records the exact bounded source review ranges', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');

  assert.deepEqual(green?.sourceSections, ['4.4', '4.5']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 108, endPage: 115 }]);
  assert.match(green?.reviewNote ?? '', /normal moments|4\.4\.normal-moments/i);
  assert.match(green?.reviewNote ?? '', /sum-of-random-variables|simplex/i);
  assert.match(green?.reviewNote ?? '', /order statistics|Random Ants/i);

  assert.deepEqual(red?.sourceSections, ['3.2.1']);
  assert.deepEqual(red?.evidencePageRanges, [{ startPage: 91, endPage: 132 }]);
  for (const item of ['3.1', '3.3', '3.5', '3.6', '3.12', '3.13', '3.37', '3.38']) {
    assert.match(red?.reviewNote ?? '', new RegExp(item.replace('.', '\\.')));
  }
  assert.match(red?.reviewNote ?? '', /optimal stopping|3\.2/);
  assert.match(red?.reviewNote ?? '', /martingale|3\.7|3\.8|3\.9/i);
  assert.match(red?.reviewNote ?? '', /order statistics|3\.29|3\.32/i);

  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [{ startPage: 134, endPage: 145 }]);
  assert.match(q150?.reviewNote ?? '', /items? 4 and 7|4.*7/i);
  assert.match(q150?.reviewNote ?? '', /already.*008|workstream 008/i);
});

test('existing workstream validator accepts workstream 009 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});

void keyOf;
void terminalStates;
void markdownSlugs;
