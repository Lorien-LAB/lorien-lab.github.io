import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { getNextPendingItem, TERMINAL_STATES } from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const auditMarker = 'excluded from the durable public technical question bank';
const expectedNotes = new Map([
  ['red-book::9::guidance', 'Red Book chapter 9 is a mixed soft-interview and current-finance container; it is excluded from the durable public technical question bank and has no independent public target.'],
  ['red-book::9.3::guidance', 'Red Book 9.3 is a collection of time-sensitive market-awareness prompts; it is excluded from the durable public technical question bank by explicit user direction.'],
  ['red-book::9.3::9.23', 'The current equity-benchmark level is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.24', 'The current commodity price is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.25', 'The current yield-curve snapshot is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.26', 'The current US policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.27', 'The current UK policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.28', 'The current euro-area policy-rate prompt is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.29', 'The source-era crisis current-affairs prompt is excluded from the durable public technical question bank by explicit user direction.'],
  ['red-book::9.3::9.30', 'The current foreign-exchange rate is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.31', 'The current labor-market comparison is time-sensitive market data and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.32', 'The current US central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.33', 'The current UK central-bank office-holder prompt is time-sensitive and is excluded from the durable public technical question bank.'],
  ['red-book::9.3::9.34', 'The source-era UK regulatory-architecture prompt is obsolete current-affairs material and is excluded from the durable public technical question bank.'],
]);
const expectedRows = [
  {
    key: 'red-book::9::guidance',
    kind: 'guidance',
    source: 'red-book',
    sourceSection: '9',
    sourceItem: null,
    canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
    coverageCanonicalTopics: ['interview-strategy-communication'],
    questionPages: [{ startPage: 309, endPage: 309 }],
    solutionPages: [],
  },
  {
    key: 'red-book::9.3::guidance',
    kind: 'guidance',
    source: 'red-book',
    sourceSection: '9.3',
    sourceItem: null,
    canonicalTopics: [
      'interview-strategy-communication',
      'interview-preparation',
      'fixed-income-rates-general-finance',
    ],
    coverageCanonicalTopics: ['interview-preparation', 'fixed-income-rates-general-finance'],
    questionPages: [{ startPage: 315, endPage: 316 }],
    solutionPages: [],
  },
  ...[
    '9.23', '9.24', '9.25', '9.26', '9.27', '9.28', '9.29', '9.30', '9.31', '9.32', '9.33', '9.34',
  ].map((sourceItem) => ({
    key: `red-book::9.3::${sourceItem}`,
    kind: 'question',
    source: 'red-book',
    sourceSection: '9.3',
    sourceItem,
    canonicalTopics: [
      'interview-strategy-communication',
      'interview-preparation',
      'fixed-income-rates-general-finance',
    ],
    coverageCanonicalTopics: ['interview-preparation', 'fixed-income-rates-general-finance'],
    questionPages: [{ startPage: 316, endPage: 316 }],
    solutionPages: [],
  })),
];
const keys = [...expectedNotes.keys()];
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('market-awareness skip owns exactly fourteen ordered and exclusively marked records', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const selected = inputs.directory.items.filter((item) => keys.includes(item.key));
  assert.deepEqual(expectedRows.map(({ key }) => key), keys);
  assert.deepEqual(selected.map((item) => item.key), keys);
  assert.equal(selected.length, 14);
  assert.deepEqual(
    inputs.directory.items
      .filter((item) => item.resolutionNote?.includes(auditMarker))
      .map((item) => item.key),
    keys,
  );
});

test('all fourteen rows preserve identity and exact target-free guidance decisions', async () => {
  const [inputs, red] = await Promise.all([
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  for (const expected of expectedRows) {
    const master = inputs.directory.items.find((item) => item.key === expected.key);
    const coverage = red.entries.find((entry) =>
      entry.sourceSection === expected.sourceSection
        && entry.sourceItem === expected.sourceItem,
    );
    assert.deepEqual(
      {
        key: master.key,
        kind: master.kind,
        source: master.source,
        sourceSection: master.sourceSection,
        sourceItem: master.sourceItem,
        canonicalTopics: master.canonicalTopics,
        questionPages: master.questionPages,
        solutionPages: master.solutionPages,
      },
      {
        key: expected.key,
        kind: expected.kind,
        source: expected.source,
        sourceSection: expected.sourceSection,
        sourceItem: expected.sourceItem,
        canonicalTopics: expected.canonicalTopics,
        questionPages: expected.questionPages,
        solutionPages: expected.solutionPages,
      },
      expected.key,
    );
    assert.equal(master.state, 'interview-guidance', expected.key);
    assert.equal(coverage.state, 'interview-guidance', expected.key);
    assert.deepEqual(master.canonicalProblems, [], expected.key);
    assert.deepEqual(master.canonicalKnowledge, [], expected.key);
    assert.deepEqual(coverage.canonicalProblems, [], expected.key);
    assert.deepEqual(coverage.canonicalKnowledge, [], expected.key);
    assert.deepEqual(coverage.canonicalTopics, expected.coverageCanonicalTopics, expected.key);
    assert.equal(master.workstream, null, expected.key);
    assert.equal(master.resolutionNote, expectedNotes.get(expected.key), expected.key);
    assert.equal(coverage.resolutionNote, expectedNotes.get(expected.key), expected.key);
  }
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('skip audit repairs pages, preserves public counts, and advances to Red 1.1', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const section = inputs.directory.items.find(
    (item) => item.key === 'red-book::9.3::guidance',
  );
  assert.deepEqual(section.questionPages, [{ startPage: 315, endPage: 316 }]);
  for (const key of keys.slice(2)) {
    const item = inputs.directory.items.find((entry) => entry.key === key);
    assert.deepEqual(item.questionPages, [{ startPage: 316, endPage: 316 }], key);
    assert.deepEqual(item.solutionPages, [], key);
  }
  const terminal = inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state));
  const pending = inputs.directory.items.filter((item) => item.state === 'pending');
  assert.equal(terminal.length, 196);
  assert.equal(pending.length, 554);
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 52);
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::1.1::guidance');
  assert.equal(inputs.workstreams.some(({ id }) => /-016$/.test(id)), false);
});

test('skip audit creates no public market-awareness artifact', async () => {
  const files = await readdir('src/content', { recursive: true });
  assert.equal(
    files.some((file) => /market-awareness|current-market-data/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/knowledge/concepts/financial-market-awareness-for-quant-interviews.md'),
    (error) => error?.code === 'ENOENT',
  );
});
