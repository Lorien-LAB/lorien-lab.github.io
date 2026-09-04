import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const id = 'logic-brainteasers-discrete-reasoning-problem-simplification-018';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
// SHA-256(JSON.stringify({key, questionPages, solutionPages}[])) from git object b3fe52b, in master order.
const PRE_018_PAGE_PROJECTION_SHA256 = 'b58d28eec32dbd581e58d0cb90620b4da3c7bb68b0e02e555c10e47ae688d7fb';
const keys = [
  'green-book::2.1::theory',
  'green-book::2.1.screwy-pirates::question',
  'green-book::2.1.tiger-and-sheep::question',
  'red-book::8::8.2',
  'red-book::8::8.5',
  'red-book::8::8.25',
  'red-book::8::8.26',
  '150-most-frequently-asked::2.7::8',
  '150-most-frequently-asked::2.7::16',
  '150-most-frequently-asked::2.7::23',
  '150-most-frequently-asked::2.7::30',
];

const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'problem-simplification'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [
    {
      source: 'green-book',
      sourceSections: ['2.1', '2.1.screwy-pirates', '2.1.tiger-and-sheep'],
      evidencePageRanges: [{ startPage: 19, endPage: 21 }],
      reviewOutcome: 'complete-problem-simplification-topic-review',
      reviewNote: 'Three consecutive Green records establish the small-case method and two canonical recurrence or backward-induction Problems.',
    },
    {
      source: 'red-book', sourceSections: ['8'],
      evidencePageRanges: [{ startPage: 288, endPage: 293 }, { startPage: 307, endPage: 308 }],
      reviewOutcome: 'selective-problem-simplification-knowledge',
      reviewNote: 'Four Red prompts resolve to reusable simplification or Fermi-estimation Knowledge without creating low-depth or dated public Problems.',
    },
    {
      source: '150-most-frequently-asked', sourceSections: ['2.7'],
      evidencePageRanges: [{ startPage: 45, endPage: 49 }, { startPage: 182, endPage: 185 }, { startPage: 192, endPage: 194 }, { startPage: 199, endPage: 201 }, { startPage: 215, endPage: 216 }],
      reviewOutcome: 'canonical-problems-and-knowledge-check',
      reviewNote: 'Four Brainteaser items yield three canonical Problems and one structural Knowledge check, with two justified algorithmic topic refinements.',
    },
  ],
  publicDelta: { problems: 5, knowledge: 2 },
  knowledgeSlugs: ['small-cases-recurrence-and-structural-simplification', 'fermi-estimation-assumption-decomposition'],
};

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const small = 'small-cases-recurrence-and-structural-simplification';
const fermi = 'fermi-estimation-assumption-decomposition';
const decisions = [
  ['green-book::2.1::theory', 'knowledge-only', [], [small], 'Green Book 2.1 theory contributes the valid-small-case workflow, recurrence discipline, and pattern-to-proof boundary to canonical simplification Knowledge.'],
  ['green-book::2.1.screwy-pirates::question', 'canonical-problem', ['sequential-voting-elimination-backward-induction'], [small, 'recursion-problem-solving'], 'The sequential allocation vote becomes the canonical backward-induction Problem, with the recurrence and tie assumptions exposed rather than a source-named wrapper.'],
  ['green-book::2.1.tiger-and-sheep::question', 'canonical-problem', ['predator-replacement-parity'], [small], 'The replacement-predator process becomes the canonical parity-induction Problem, with action and preference assumptions made explicit.'],
  ['red-book::8::8.2', 'knowledge-only', [], [small], 'The mental-cube prompt is retained as a Knowledge check on arithmetic decomposition, not expanded into a low-depth public Problem.'],
  ['red-book::8::8.5', 'knowledge-only', [], [small], 'The exponential-growth prompt is retained as a Knowledge check on backing up from a known endpoint, not expanded into a trick page.'],
  ['red-book::8::8.25', 'knowledge-only', [], [fermi], 'The service-location estimate resolves to source-neutral Fermi-estimation Knowledge without publishing a dated country total.'],
  ['red-book::8::8.26', 'knowledge-only', [], [fermi], 'The specialized-provider estimate resolves to source-neutral Fermi-estimation Knowledge without publishing a dated city total.'],
  ['150-most-frequently-asked::2.7::8', 'canonical-problem', ['two-egg-threshold-search'], [small, 'recursion-problem-solving'], 'The two-resource threshold family becomes the canonical minimax recurrence Problem and receives a justified Dynamic Programming topic refinement.'],
  ['150-most-frequently-asked::2.7::16', 'canonical-problem', ['large-power-digit-count-without-log-tables'], [small], 'The large-power digit-count family becomes the canonical strict-bounds Problem without log tables or direct expansion.'],
  ['150-most-frequently-asked::2.7::23', 'canonical-problem', ['minimum-comparisons-for-both-extremes'], [small], 'The joint-extremes comparison family becomes the canonical optimal-comparison Problem and receives a justified Algorithmic Complexity topic refinement.'],
  ['150-most-frequently-asked::2.7::30', 'knowledge-only', [], [small], 'The round-cover prompt is retained as a Knowledge check on structural geometry, not expanded into a one-answer public Problem.'],
];
const page = (startPage, endPage = startPage) => [{ startPage, endPage }];
const pages = {
  'green-book::2.1::theory': [page(19), []],
  'green-book::2.1.screwy-pirates::question': [page(19, 20), []],
  'green-book::2.1.tiger-and-sheep::question': [page(20, 21), []],
  'red-book::8::8.2': [page(288), page(291, 292)],
  'red-book::8::8.5': [page(288), page(293)],
  'red-book::8::8.25': [page(290), page(307)],
  'red-book::8::8.26': [page(290), page(308)],
  '150-most-frequently-asked::2.7::8': [page(45), page(182, 185)],
  '150-most-frequently-asked::2.7::16': [page(46), page(192, 194)],
  '150-most-frequently-asked::2.7::23': [page(48), page(199, 201)],
  '150-most-frequently-asked::2.7::30': [page(49), page(215)],
};

function pageProjection(master) {
  return master.items.map(({ key, questionPages, solutionPages }) => ({
    key,
    questionPages,
    solutionPages,
  }));
}

function projectionHash(projection) {
  return createHash('sha256').update(JSON.stringify(projection)).digest('hex');
}

function restoreApprovedPageRepairs(projection) {
  const restored = JSON.parse(JSON.stringify(projection));
  const byKey = new Map(restored.map((row) => [row.key, row]));
  assert.ok(byKey.has('red-book::8::8.25'));
  assert.ok(byKey.has('150-most-frequently-asked::2.7::30'));
  assert.deepEqual(
    byKey.get('red-book::8::theory')?.questionPages,
    page(287),
    'red-book::8::theory approved 021 repair',
  );
  assert.deepEqual(
    byKey.get('red-book::10.2::theory')?.questionPages,
    page(317, 318),
    'red-book::10.2::theory approved 021 repair',
  );
  byKey.get('red-book::8::8.25').solutionPages = page(307, 308);
  byKey.get('150-most-frequently-asked::2.7::30').solutionPages = page(215, 216);
  byKey.get('red-book::8::theory').questionPages = page(287, 309);
  byKey.get('red-book::10.2::theory').questionPages = page(317, 320);
  return restored;
}

test('018 manifest preserves immutable scope across the lifecycle', async () => {
  const manifest = await readJson(manifestPath);
  if (manifest.status === 'active') {
    assert.deepEqual(manifest, expectedActiveManifest);
    return;
  }
  assert.equal(manifest.status, 'complete');
  const { preClosureActiveGate, verification, finalTreeGate, ...immutable } = manifest;
  const { status: _activeStatus, ...immutableActive } = expectedActiveManifest;
  assert.deepEqual(immutable, { ...immutableActive, status: 'complete' });
  assert.ok(preClosureActiveGate && verification && finalTreeGate);
});

test('018 records exact terminal source decisions and two topic overrides', async () => {
  const [green, red, frequent, master] = await Promise.all([
    readJson('src/data/quant-interview/coverage/green-book.json'),
    readJson('src/data/quant-interview/coverage/red-book.json'),
    readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageByKey = new Map(
    [green, red, frequent].flatMap((ledger) => ledger.entries.map((entry) => [
      `${ledger.source}::${entry.sourceSection}::${entry.sourceItem ?? ''}`,
      entry,
    ])),
  );
  const masterByKey = new Map(master.items.map((row) => [row.key, row]));
  const stateHistogram = {};
  const sourceHistogram = {};

  for (const [key, state, canonicalProblems, canonicalKnowledge, resolutionNote] of decisions) {
    const masterRow = masterByKey.get(key);
    assert.ok(masterRow, `${key} master row`);
    const coverageKey = `${masterRow.source}::${masterRow.sourceSection}::${masterRow.sourceItem ?? ''}`;
    const coverageRow = coverageByKey.get(coverageKey);
    assert.ok(coverageRow, `${key} coverage row`);
    for (const row of [coverageRow, masterRow]) {
      assert.equal(row.state, state, `${key} state`);
      assert.deepEqual(row.canonicalProblems, canonicalProblems, `${key} problems`);
      assert.deepEqual(row.canonicalKnowledge, canonicalKnowledge, `${key} knowledge`);
      assert.equal(row.resolutionNote, resolutionNote, `${key} note`);
    }
    assert.equal(masterRow.workstream, id, `${key} workstream`);
    stateHistogram[state] = (stateHistogram[state] ?? 0) + 1;
    sourceHistogram[masterRow.source] = (sourceHistogram[masterRow.source] ?? 0) + 1;
  }

  assert.deepEqual(stateHistogram, { 'canonical-problem': 5, 'knowledge-only': 6 });
  assert.deepEqual(sourceHistogram, { 'green-book': 3, 'red-book': 4, '150-most-frequently-asked': 4 });

  const q8 = coverageByKey.get('150-most-frequently-asked::2.7::8');
  const masterQ8 = masterByKey.get('150-most-frequently-asked::2.7::8');
  assert.deepEqual(q8.canonicalTopics, ['problem-simplification', 'dynamic-programming-algorithms']);
  assert.equal(q8.topicOverrideReason, 'Item-level review identifies a minimax state recurrence with reusable subproblem structure, so this specific Brainteaser also belongs to Dynamic Programming.');
  assert.deepEqual(masterQ8.canonicalTopics, ['logic-brainteasers-discrete-reasoning', 'problem-simplification', 'algorithms-data-structures-cpp', 'dynamic-programming-algorithms']);

  const q23 = coverageByKey.get('150-most-frequently-asked::2.7::23');
  const masterQ23 = masterByKey.get('150-most-frequently-asked::2.7::23');
  assert.deepEqual(q23.canonicalTopics, ['problem-simplification', 'algorithmic-complexity']);
  assert.equal(q23.topicOverrideReason, 'Item-level review identifies an optimal comparison algorithm plus matching lower bound, so this specific Brainteaser also belongs to Algorithmic Complexity.');
  assert.deepEqual(masterQ23.canonicalTopics, ['logic-brainteasers-discrete-reasoning', 'problem-simplification', 'algorithms-data-structures-cpp', 'algorithmic-complexity']);

  for (const [key] of decisions) {
    if (key.endsWith('::8') || key.endsWith('::23')) continue;
    const masterRow = masterByKey.get(key);
    const coverageRow = coverageByKey.get(`${masterRow.source}::${masterRow.sourceSection}::${masterRow.sourceItem ?? ''}`);
    assert.deepEqual(coverageRow.canonicalTopics, ['problem-simplification'], `${key} topics`);
    assert.equal('topicOverrideReason' in coverageRow, false, `${key} override`);
  }
});

test('018 binds exact repairs and freezes every pre-018 page range', async () => {
  const master = await readJson('src/data/quant-interview/master-directory.json');
  const masterByKey = new Map(master.items.map((row) => [row.key, row]));
  for (const [key, [questionPages, solutionPages]] of Object.entries(pages)) {
    const row = masterByKey.get(key);
    assert.deepEqual(row.questionPages, questionPages, `${key} question pages`);
    assert.deepEqual(row.solutionPages, solutionPages, `${key} solution pages`);
  }

  const currentProjection = pageProjection(master);
  assert.equal(currentProjection.length, 750);
  const restoredProjection = restoreApprovedPageRepairs(currentProjection);
  assert.equal(
    projectionHash(restoredProjection),
    PRE_018_PAGE_PROJECTION_SHA256,
    'only the two approved solution-page repairs may differ from pre-018',
  );
  assert.deepEqual(masterByKey.get('red-book::8::8.25').solutionPages, page(307));
  assert.deepEqual(masterByKey.get('150-most-frequently-asked::2.7::30').solutionPages, page(215));

  const sourceMapText = await readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8');
  assert.equal(createHash('sha256').update(sourceMapText).digest('hex'), '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed');
});
