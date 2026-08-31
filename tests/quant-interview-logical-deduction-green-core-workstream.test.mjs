import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const id = 'logic-brainteasers-discrete-reasoning-logical-deduction-green-core-019';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
const keys = [
  'green-book::2.2::theory',
  'green-book::2.2.river-crossing::question',
  'green-book::2.2.birthday-problem::question',
  'green-book::2.2.card-game::question',
  'green-book::2.2.burning-ropes::question',
  'green-book::2.2.defective-ball::question',
  'green-book::2.2.trailing-zeros::question',
  'green-book::2.2.horse-race::question',
  'green-book::2.2.infinite-sequence::question',
];
const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [{
    source: 'green-book',
    sourceSections: ['2.2'],
    evidencePageRanges: [{ startPage: 21, endPage: 26 }],
    reviewOutcome: 'green-core-logical-deduction-publication-and-rerouting',
    reviewNote: 'Nine consecutive Green records yield two canonical Knowledge nodes, five canonical Problems, two lower-depth Knowledge checks, and one merged power-tower identity.',
  }],
  publicDelta: { problems: 5, knowledge: 2 },
  knowledgeSlugs: [
    'logical-deduction-constraint-propagation-and-case-elimination',
    'decision-trees-information-bounds-and-adaptive-testing',
  ],
};

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const decisions = [
  [keys[0], 'knowledge-only', [], [constraint], 'Green Book 2.2 groups finite candidate elimination, invariant checks, and adaptive testing into the bounded Logical Deduction learning path.'],
  [keys[1], 'canonical-problem', ['bridge-crossing-minimum-time'], [constraint], 'The bridge family becomes the canonical state-search Problem with an independently verified optimal schedule and lower bound.'],
  [keys[2], 'canonical-problem', ['public-announcement-candidate-elimination'], [constraint], 'The private-information dialogue becomes a source-neutral public-announcement Problem with every candidate-set update explicit.'],
  [keys[3], 'knowledge-only', [], [constraint], 'The two-color pairing invariant remains an executable Knowledge check rather than a low-depth standalone Problem.'],
  [keys[4], 'knowledge-only', [], [constraint], 'The nonuniform timer remains an executable constraint-composition Knowledge check rather than a one-trick standalone Problem.'],
  [keys[5], 'canonical-problem', ['twelve-object-balance-scale-diagnosis'], [trees], 'The heavy-or-light anomaly family becomes the canonical 24-hypothesis ternary decision-tree Problem.'],
  [keys[6], 'canonical-problem', ['factorial-trailing-zeros-in-arbitrary-base'], ['modular-arithmetic', 'counting-permutations-combinations'], 'The factorial-zero prompt is generalized to prime valuations in arbitrary bases and receives a justified Modular Arithmetic refinement.'],
  [keys[7], 'canonical-problem', ['top-three-from-batched-races'], [trees], 'The batched-race family becomes the canonical partial-order selection Problem and receives a justified Algorithmic Complexity refinement.'],
  [keys[8], 'merged-duplicate', ['infinite-power-tower-limit'], ['bounded-monotone-convergence-and-fixed-points'], 'The recursive tower prompt is the existing canonical power-tower identity and merges into its complete convergence and branch-selection proof.'],
];
const overrides = {
  '2.2.trailing-zeros': {
    topics: ['logical-deduction', 'modular-arithmetic'],
    reason: 'Item-level review identifies factorial prime valuations and base divisibility as Modular Arithmetic while retaining the source section’s logical-deduction context.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'modular-arithmetic'],
  },
  '2.2.horse-race': {
    topics: ['logical-deduction', 'algorithmic-complexity'],
    reason: 'Item-level review identifies a comparison-selection strategy with an optimal race lower bound, so this Logical Deduction item also belongs to Algorithmic Complexity.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'algorithms-data-structures-cpp', 'algorithmic-complexity'],
  },
  '2.2.infinite-sequence': {
    topics: ['logical-deduction', 'limits-derivatives'],
    reason: 'Item-level review identifies the recursive tower as the existing Limits & Derivatives fixed-point and convergence identity while retaining its editorial Logical Deduction context.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'calculus-differential-equations', 'limits-derivatives'],
  },
};
const sourceMapHash = '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed';
const pageProjectionHash = '2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e';

function coverageKey(source, row) {
  return `${source}::${row.sourceSection}::${row.sourceItem ?? ''}`;
}

function disposition(row) {
  return {
    state: row.state,
    canonicalProblems: row.canonicalProblems,
    canonicalKnowledge: row.canonicalKnowledge,
    resolutionNote: row.resolutionNote,
  };
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function assertProtectedPageProjection(directory) {
  const projection = directory.items.map(({ key, questionPages, solutionPages }) => ({
    key,
    questionPages,
    solutionPages,
  }));
  assert.equal(projection.length, 750);
  assert.equal(sha256(JSON.stringify(projection)), pageProjectionHash);
}

test('019 starts as the exact evidence-free active manifest', async () => {
  const manifest = await readJson(manifestPath);
  assert.deepEqual(manifest, expectedActiveManifest);
  for (const field of ['preClosureActiveGate', 'verification', 'finalTreeGate']) {
    assert.equal(field in manifest, false, field);
  }
});

test('019 records nine exact mirrored Green dispositions', async () => {
  const [coverage, directory] = await Promise.all([
    readJson('src/data/quant-interview/coverage/green-book.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageByKey = new Map(coverage.entries.map((row) => [coverageKey(coverage.source, row), row]));
  const masterByKey = new Map(directory.items.map((row) => [row.key, row]));
  const stateHistogram = { 'canonical-problem': 0, 'knowledge-only': 0, 'merged-duplicate': 0 };
  const sourceHistogram = { 'green-book': 0 };

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
    stateHistogram[state] += 1;
    sourceHistogram[masterRow.source] += 1;
  }

  assert.deepEqual(stateHistogram, { 'canonical-problem': 5, 'knowledge-only': 3, 'merged-duplicate': 1 });
  assert.deepEqual(sourceHistogram, { 'green-book': 9 });
  assert.equal(new Set(decisions.map(([, , , , note]) => note)).size, decisions.length);
});

test('019 applies only the three approved item-level topic overrides', async () => {
  const [coverage, directory] = await Promise.all([
    readJson('src/data/quant-interview/coverage/green-book.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageBySection = new Map(coverage.entries.map((row) => [row.sourceSection, row]));
  const masterByKey = new Map(directory.items.map((row) => [row.key, row]));

  for (const [key] of decisions) {
    const masterRow = masterByKey.get(key);
    const coverageRow = coverageBySection.get(masterRow.sourceSection);
    const override = overrides[masterRow.sourceSection];
    assert.equal(masterRow.primaryTopic, 'logical-deduction', `${key} primary topic`);
    if (override) {
      assert.deepEqual(coverageRow.canonicalTopics, override.topics, `${key} coverage topics`);
      assert.equal(coverageRow.topicOverrideReason, override.reason, `${key} override reason`);
      assert.deepEqual(masterRow.canonicalTopics, override.masterTopics, `${key} master topics`);
    } else {
      assert.deepEqual(coverageRow.canonicalTopics, ['logical-deduction'], `${key} coverage topics`);
      assert.equal('topicOverrideReason' in coverageRow, false, `${key} override reason`);
      assert.deepEqual(
        masterRow.canonicalTopics,
        ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
        `${key} master topics`,
      );
    }
  }
});

test('019 preserves the source-topic map and all 750 master page rows', async () => {
  const [sourceTopicMapText, directory] = await Promise.all([
    readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  assert.equal(sha256(sourceTopicMapText), sourceMapHash);
  assertProtectedPageProjection(directory);
});

test('the full page freeze catches an unrelated Green 2.3 page mutation', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  const mutated = structuredClone(directory);
  const row = mutated.items.find(({ key }) => key === 'green-book::2.3::theory');
  assert.ok(row);
  row.questionPages = [{ startPage: 27, endPage: 27 }];
  assert.throws(() => assertProtectedPageProjection(mutated), {
    name: 'AssertionError',
  });
});
