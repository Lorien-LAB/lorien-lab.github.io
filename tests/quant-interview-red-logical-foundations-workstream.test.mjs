import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const id = 'logic-brainteasers-discrete-reasoning-red-logical-foundations-021';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
const keys = [
  'red-book::8::theory',
  'red-book::10::theory',
  'red-book::10.2::theory',
  'red-book::8::8.1',
  'red-book::8::8.4',
  'red-book::8::8.9',
];
const activeManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [{
    source: 'red-book',
    sourceSections: ['8', '10', '10.2'],
    evidencePageRanges: [{ startPage: 287, endPage: 296 }, { startPage: 317, endPage: 318 }],
    reviewOutcome: 'red-logical-foundations-publication-and-index-disposition',
    reviewNote: 'Six ordered records yield three canonical Problems, one existing-Knowledge introduction, and two non-public revision-index dispositions.',
  }],
  publicDelta: { problems: 3, knowledge: 0 },
  knowledgeSlugs: [],
};
const decisions = [
  [keys[0], 'knowledge-only', [], ['small-cases-recurrence-and-structural-simplification', 'constraint-reframing-and-latent-state'], 'The chapter methodology introduction resolves to existing source-neutral simplification and constraint-reframing Knowledge without claiming its questions are covered.'],
  [keys[1], 'interview-guidance', [], [], 'The chapter introduction is an internal revision-list framing record and creates no public target or completion claim for its referenced questions.'],
  [keys[2], 'interview-guidance', [], [], 'The repeated-question index remains internal guidance; every referenced source item retains its independent coverage state.'],
  [keys[3], 'canonical-problem', ['clock-hand-angles-and-relative-motion'], ['logical-deduction-constraint-propagation-and-case-elimination', 'small-cases-recurrence-and-structural-simplification'], 'The clock prompt becomes a canonical continuous relative-motion and angular-normalization Problem.'],
  [keys[4], 'canonical-problem', ['shortest-path-on-cube-surface'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The surface-travel prompt becomes a canonical cube-unfolding Problem with a global minimality argument.'],
  [keys[5], 'canonical-problem', ['alternating-geometric-resource-allocation'], ['positive-series-convergence', 'small-cases-recurrence-and-structural-simplification'], 'The alternating-share prompt becomes a canonical finite-and-infinite geometric-allocation Problem with an item-level limits refinement.'],
];
const allocationOverride = 'Item-level review identifies finite geometric partial sums and a zero-remainder limit, so this Logical Deduction item also belongs to Limits & Derivatives.';
const addedCoverageTuples = [['8', '8.1'], ['8', '8.4'], ['8', '8.9']];
const legacyCoverageTupleHash = '4623420ad20ecde52ef262842b1ec3b589fbdabe926cb84b5c51b3e39337cfe7';
const sourceTopicMapHash = '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed';
const historicalPageProjectionHash = '2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e';
const repairedPageProjectionHash = '92470e19ba2b116f2d98142465a2df38cb7b13f0f908d646cc64360d1ba16eb0';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const coverageTuple = (row) => [row.sourceSection, row.sourceItem ?? null];
const coverageKey = (source, row) => `${source}::${row.sourceSection}::${row.sourceItem ?? ''}`;
const disposition = (row) => ({
  state: row.state,
  canonicalProblems: row.canonicalProblems,
  canonicalKnowledge: row.canonicalKnowledge,
  resolutionNote: row.resolutionNote,
});
const pageProjection = (directory) => directory.items.map(({ key, questionPages, solutionPages }) => ({
  key,
  questionPages,
  solutionPages,
}));

function setQuestionPages(projection, key, questionPages) {
  const row = projection.find((candidate) => candidate.key === key);
  assert.ok(row, key);
  row.questionPages = questionPages;
}

function restoreHistoricalPages(projection) {
  const restored = structuredClone(projection);
  setQuestionPages(restored, keys[0], [{ startPage: 287, endPage: 309 }]);
  setQuestionPages(restored, keys[2], [{ startPage: 317, endPage: 320 }]);
  return restored;
}

function applyApprovedPageRepairs(projection) {
  const repaired = structuredClone(projection);
  setQuestionPages(repaired, keys[0], [{ startPage: 287, endPage: 287 }]);
  setQuestionPages(repaired, keys[2], [{ startPage: 317, endPage: 318 }]);
  return repaired;
}

function assertProjectionHash(projection, expectedHash) {
  assert.equal(projection.length, 750);
  assert.equal(sha256(JSON.stringify(projection)), expectedHash);
}

test('021 active manifest is exact and contains no workflow or evidence fields', async () => {
  const manifest = await readJson(manifestPath);
  assert.deepEqual(manifest, activeManifest);
  for (const field of ['workflow', 'preClosureActiveGate', 'verification', 'finalTreeGate']) {
    assert.equal(field in manifest, false, `${field} must be absent while active`);
  }
});

test('021 owns six exact mirrored Red dispositions with a 3/1/2 state split', async () => {
  const [coverage, directory] = await Promise.all([
    readJson('src/data/quant-interview/coverage/red-book.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageByKey = new Map(
    coverage.entries.map((row) => [coverageKey(coverage.source, row), row]),
  );
  const masterByKey = new Map(directory.items.map((row) => [row.key, row]));
  const histogram = { 'canonical-problem': 0, 'knowledge-only': 0, 'interview-guidance': 0 };

  assert.deepEqual(
    directory.items.filter((row) => row.workstream === id).map((row) => row.key),
    keys,
    '021 must own exactly the six ordered master rows',
  );
  assert.equal(new Set(decisions.map(([, , , , note]) => note)).size, decisions.length);

  for (const [key, state, canonicalProblems, canonicalKnowledge, resolutionNote] of decisions) {
    const masterRow = masterByKey.get(key);
    assert.ok(masterRow, `${key} master row`);
    const coverageRow = coverageByKey.get(coverageKey(masterRow.source, masterRow));
    assert.ok(coverageRow, `${key} coverage row`);
    const expected = { state, canonicalProblems, canonicalKnowledge, resolutionNote };
    assert.deepEqual(disposition(coverageRow), expected, `${key} coverage disposition`);
    assert.deepEqual(disposition(masterRow), expected, `${key} master disposition`);
    assert.deepEqual(disposition(coverageRow), disposition(masterRow), `${key} mirrored disposition`);
    assert.equal(masterRow.workstream, id, `${key} workstream`);
    histogram[state] += 1;
  }

  assert.deepEqual(histogram, {
    'canonical-problem': 3,
    'knowledge-only': 1,
    'interview-guidance': 2,
  });
});

test('021 adds exactly three unique Red coverage tuples in source-item order', async () => {
  const coverage = await readJson('src/data/quant-interview/coverage/red-book.json');
  const tuples = coverage.entries.map(coverageTuple);
  const tupleKeys = tuples.map(([section, item]) => `${section}::${item ?? ''}`);
  assert.equal(new Set(tupleKeys).size, tupleKeys.length, 'Red coverage tuples must be unique');

  const addedKeys = new Set(addedCoverageTuples.map(([section, item]) => `${section}::${item}`));
  const observedAdded = tuples.filter(([section, item]) => addedKeys.has(`${section}::${item ?? ''}`));
  const legacyTuples = tuples.filter(([section, item]) => !addedKeys.has(`${section}::${item ?? ''}`));
  assert.deepEqual(observedAdded, addedCoverageTuples);
  assert.equal(coverage.entries.length, 157);
  assert.equal(legacyTuples.length, 154);
  assert.equal(sha256(JSON.stringify(legacyTuples)), legacyCoverageTupleHash);
});

test('021 applies only the allocation item-level topic override', async () => {
  const [coverage, directory] = await Promise.all([
    readJson('src/data/quant-interview/coverage/red-book.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageByKey = new Map(
    coverage.entries.map((row) => [coverageKey(coverage.source, row), row]),
  );
  const masterByKey = new Map(directory.items.map((row) => [row.key, row]));
  const itemExpectations = [
    [keys[3], ['logical-deduction'], ['logic-brainteasers-discrete-reasoning', 'logical-deduction'], undefined],
    [keys[4], ['logical-deduction'], ['logic-brainteasers-discrete-reasoning', 'logical-deduction'], undefined],
    [keys[5], ['logical-deduction', 'limits-derivatives'], ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'calculus-differential-equations', 'limits-derivatives'], allocationOverride],
  ];

  for (const [key, coverageTopics, masterTopics, overrideReason] of itemExpectations) {
    const masterRow = masterByKey.get(key);
    assert.ok(masterRow, `${key} master row`);
    const coverageRow = coverageByKey.get(coverageKey(masterRow.source, masterRow));
    assert.ok(coverageRow, `${key} coverage row`);
    assert.equal(masterRow.primaryTopic, 'logical-deduction', `${key} primary topic`);
    assert.deepEqual(coverageRow.canonicalTopics, coverageTopics, `${key} coverage topics`);
    assert.deepEqual(masterRow.canonicalTopics, masterTopics, `${key} master topics`);
    if (overrideReason) assert.equal(coverageRow.topicOverrideReason, overrideReason, `${key} override`);
    else assert.equal('topicOverrideReason' in coverageRow, false, `${key} override`);
  }

  const ownedCoverageRows = decisions.map(([key]) => {
    const masterRow = masterByKey.get(key);
    assert.ok(masterRow, `${key} master row`);
    return coverageByKey.get(coverageKey(masterRow.source, masterRow));
  });
  assert.ok(ownedCoverageRows.every(Boolean), 'all owned coverage rows must exist');
  assert.deepEqual(
    ownedCoverageRows.filter((row) => 'topicOverrideReason' in row).map(coverageTuple),
    [['8', '8.9']],
  );
});

test('021 registration satisfies the repository validator', async () => {
  assert.equal(validateMasterDirectoryRepository(await loadMasterDirectoryRepository()), true);
});

test('021 page fixture transforms the literal historical projection into the repaired projection', async () => {
  const [directory, sourceTopicMapText] = await Promise.all([
    readJson('src/data/quant-interview/master-directory.json'),
    readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8'),
  ]);
  assert.equal(sha256(sourceTopicMapText), sourceTopicMapHash);

  const historical = restoreHistoricalPages(pageProjection(directory));
  assertProjectionHash(historical, historicalPageProjectionHash);
  assertProjectionHash(applyApprovedPageRepairs(historical), repairedPageProjectionHash);
});

test('021 current pages have the repaired hash and reverse only to the historical hash', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  const current = pageProjection(directory);
  assertProjectionHash(current, repairedPageProjectionHash);
  assertProjectionHash(restoreHistoricalPages(current), historicalPageProjectionHash);
});

test('021 repaired-page freeze catches either repair and an untouched-row mutation', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  const current = pageProjection(directory);
  assertProjectionHash(current, repairedPageProjectionHash);

  for (const key of [keys[0], keys[2], 'red-book::8::8.2']) {
    const mutated = structuredClone(current);
    const row = mutated.find((candidate) => candidate.key === key);
    assert.ok(row, key);
    assert.ok(row.questionPages.length > 0, `${key} question page fixture`);
    row.questionPages[0].startPage += 1;
    assert.throws(
      () => assertProjectionHash(mutated, repairedPageProjectionHash),
      { name: 'AssertionError' },
      `${key} mutation`,
    );
  }
});
