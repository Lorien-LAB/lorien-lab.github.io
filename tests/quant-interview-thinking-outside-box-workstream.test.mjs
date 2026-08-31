import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const id = 'logic-brainteasers-discrete-reasoning-thinking-outside-box-green-core-020';
const manifestPath = `src/data/quant-interview/workstreams/${id}.json`;
const keys = [
  'green-book::2.3::theory',
  'green-book::2.3.box-packing::question',
  'green-book::2.3.calendar-cubes::question',
  'green-book::2.3.door-to-offer::question',
  'green-book::2.3.message-delivery::question',
  'green-book::2.3.last-ball::question',
  'green-book::2.3.light-switches::question',
  'green-book::2.3.quant-salary::question',
];
const expectedActiveManifest = {
  id,
  canonicalTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  status: 'active',
  masterItemKeys: keys,
  sourceScopes: [{
    source: 'green-book',
    sourceSections: ['2.3'],
    evidencePageRanges: [{ startPage: 26, endPage: 31 }],
    reviewOutcome: 'green-core-thinking-outside-box-publication',
    reviewNote: 'Eight consecutive Green records yield one canonical Knowledge node and seven independently verified canonical Problems.',
  }],
  publicDelta: { problems: 7, knowledge: 1 },
  knowledgeSlugs: ['constraint-reframing-and-latent-state'],
};
const decisions = [
  [keys[0], 'knowledge-only', [], ['constraint-reframing-and-latent-state'], 'The section-level reframing method becomes a source-neutral Knowledge node for alternate representations, latent state, reversible operations, and explicit assumptions.'],
  [keys[1], 'canonical-problem', ['pack-length-four-bricks-in-six-cube'], ['constraint-reframing-and-latent-state', 'modular-invariants'], 'The three-dimensional packing prompt becomes a canonical coloring-invariant impossibility Problem.'],
  [keys[2], 'canonical-problem', ['two-cube-calendar-digit-labeling'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The date-display prompt becomes a canonical constructive constraint-satisfaction Problem with all dates verified.'],
  [keys[3], 'canonical-problem', ['two-guards-one-question'], ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], 'The truth-and-lie prompt becomes a canonical Boolean case-analysis Problem with a complete four-state truth table.'],
  [keys[4], 'canonical-problem', ['message-delivery-with-independent-padlocks'], ['constraint-reframing-and-latent-state'], 'The independent-lock prompt becomes a canonical three-transit protocol Problem with lock-state and confidentiality boundaries explicit.'],
  [keys[5], 'canonical-problem', ['last-ball-color-by-parity-invariant'], ['constraint-reframing-and-latent-state', 'modular-invariants'], 'The replacement process becomes a canonical parity-invariant Problem with every legal transition verified.'],
  [keys[6], 'canonical-problem', ['four-switches-one-room-entry'], ['constraint-reframing-and-latent-state', 'decision-trees-information-bounds-and-adaptive-testing'], 'The bulb prompt becomes a canonical latent-state encoding Problem using light and thermal observations.'],
  [keys[7], 'canonical-problem', ['private-average-with-canceling-mask'], ['constraint-reframing-and-latent-state', 'problem-framing-clarification-assumption-management'], 'The private-average prompt becomes a canonical canceling-mask protocol Problem with an honest non-colluding privacy boundary.'],
];
const overrides = {
  '2.3.box-packing': {
    topics: ['logical-deduction', 'invariants-state-transformations'],
    reason: 'Item-level review identifies a three-dimensional coloring invariant and capacity obstruction, so this Logical Deduction item also belongs to Invariants & State Transformations.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations'],
  },
  '2.3.last-ball': {
    topics: ['logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
    reason: 'Item-level review identifies parity preservation under every replacement transition, so this Logical Deduction item also belongs to Invariants & State Transformations and Modular Arithmetic.',
    masterTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
  },
};
const sourceMapHash = '04f6bc640094ae774acfe5fe13b764a0a4bd155f18e1786a5b744f33cc9aceed';
const pageProjectionHash = '2275e9e3414f249dc39bcef52bbaf202ab8d43445e61845f63a94724059eeb3e';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

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

function mutateQuestionPages(row) {
  if (row.questionPages.length === 0) {
    row.questionPages = [{ startPage: 1, endPage: 1 }];
    return;
  }
  row.questionPages[0].startPage += 1;
}

test('020 manifest is the exact evidence-free active manifest', async () => {
  const manifest = await readJson(manifestPath);
  assert.deepEqual(manifest, expectedActiveManifest);
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
});

test('020 records eight exact mirrored Green dispositions in source order', async () => {
  const [coverage, directory] = await Promise.all([
    readJson('src/data/quant-interview/coverage/green-book.json'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  const coverageByKey = new Map(coverage.entries.map((row) => [coverageKey(coverage.source, row), row]));
  const masterByKey = new Map(directory.items.map((row) => [row.key, row]));
  const stateHistogram = { 'canonical-problem': 0, 'knowledge-only': 0 };

  assert.deepEqual(
    directory.items.filter((row) => row.workstream === id).map((row) => row.key),
    keys,
    '020 owns exactly the eight ordered master rows',
  );
  assert.equal(new Set(decisions.map(([, , , , note]) => note)).size, decisions.length);
  assert.ok(decisions.every(([, , , , note]) => note.trim().length > 0));

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
  }

  assert.deepEqual(stateHistogram, { 'canonical-problem': 7, 'knowledge-only': 1 });
});

test('020 applies only the two approved item-level topic overrides', async () => {
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

test('020 preserves the source-topic map and all 750 master page rows', async () => {
  const [sourceTopicMapText, directory] = await Promise.all([
    readFile('src/data/quant-interview/topics/source-topic-map.json', 'utf8'),
    readJson('src/data/quant-interview/master-directory.json'),
  ]);
  assert.equal(sha256(sourceTopicMapText), sourceMapHash);
  assertProtectedPageProjection(directory);
});

test('the full page freeze catches Red 8 theory and every Green page mutation', async () => {
  const directory = await readJson('src/data/quant-interview/master-directory.json');
  const mutationKeys = [
    'red-book::8::theory',
    ...directory.items.filter(({ source }) => source === 'green-book').map(({ key }) => key),
  ];
  assert.ok(mutationKeys.length > 1);

  for (const key of mutationKeys) {
    const mutated = structuredClone(directory);
    const row = mutated.items.find((candidate) => candidate.key === key);
    assert.ok(row, key);
    mutateQuestionPages(row);
    assert.throws(() => assertProtectedPageProjection(mutated), { name: 'AssertionError' }, key);
  }
});
