import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextPendingItem,
  makeMasterItemKey,
  sortMasterItems,
  validateMasterDirectory,
  validateSequentialScope,
} from '../src/lib/quantInterviewMasterDirectory.mjs';

const taxonomy = {
  version: 1,
  topics: [{
    id: 'interview-strategy-communication',
    title: 'Interview Strategy & Communication',
    order: 1,
    children: [
      { id: 'interview-preparation', title: 'Interview Preparation', order: 1 },
      { id: 'reasoning-communication', title: 'Reasoning & Communication', order: 2 },
    ],
  }],
};

const baseDirectory = {
  version: 1,
  sourceOrder: ['green-book', 'red-book', '150-most-frequently-asked'],
  nodes: [
    {
      id: 'topic::interview-strategy-communication',
      kind: 'topic',
      title: 'Interview Strategy & Communication',
      parentId: null,
      order: 1,
      canonicalTopic: 'interview-strategy-communication',
    },
    {
      id: 'topic::interview-preparation',
      kind: 'topic',
      title: 'Interview Preparation',
      parentId: 'topic::interview-strategy-communication',
      order: 1,
      canonicalTopic: 'interview-preparation',
    },
    {
      id: 'topic::reasoning-communication',
      kind: 'topic',
      title: 'Reasoning & Communication',
      parentId: 'topic::interview-strategy-communication',
      order: 2,
      canonicalTopic: 'reasoning-communication',
    },
  ],
  items: [
    {
      key: 'green-book::1.1::guidance',
      kind: 'guidance',
      source: 'green-book',
      sourceSection: '1.1',
      sourceItem: null,
      questionPages: [{ startPage: 17, endPage: 17 }],
      solutionPages: [],
      primaryTopic: 'interview-preparation',
      canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
      sortKey: '01.01|01|0001|green-book::1.1::guidance',
      state: 'pending',
      canonicalProblems: [],
      canonicalKnowledge: [],
      workstream: null,
      resolutionNote: null,
    },
    {
      key: 'green-book::1.3::guidance',
      kind: 'guidance',
      source: 'green-book',
      sourceSection: '1.3',
      sourceItem: null,
      questionPages: [{ startPage: 18, endPage: 18 }],
      solutionPages: [],
      primaryTopic: 'reasoning-communication',
      canonicalTopics: ['interview-strategy-communication', 'reasoning-communication'],
      sortKey: '01.02|01|0001|green-book::1.3::guidance',
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['problem-framing-clarification-assumption-management'],
      workstream: 'interview-strategy-communication-reasoning-communication-013',
      resolutionNote: 'Resolved to the canonical problem-framing Knowledge node.',
    },
  ],
};

const context = {
  taxonomy,
  sourceIds: new Set(['green-book', 'red-book', '150-most-frequently-asked']),
  sourceSections: new Map([
    ['green-book', new Set(['1.1', '1.3'])],
    ['red-book', new Set()],
    ['150-most-frequently-asked', new Set()],
  ]),
  problemSlugs: new Set(),
  knowledgeSlugs: new Set(['problem-framing-clarification-assumption-management']),
  workstreamIds: new Set(['interview-strategy-communication-reasoning-communication-013']),
};

test('master keys, order, and first pending record are deterministic', () => {
  assert.equal(makeMasterItemKey(baseDirectory.items[0]), 'green-book::1.1::guidance');
  assert.deepEqual(
    sortMasterItems([...baseDirectory.items].reverse()).map(({ key }) => key),
    baseDirectory.items.map(({ key }) => key),
  );
  assert.equal(getNextPendingItem(baseDirectory)?.key, 'green-book::1.1::guidance');
  assert.equal(validateMasterDirectory(baseDirectory, context), true);
});

test('master validator rejects duplicate and malformed records', () => {
  const duplicate = { ...baseDirectory, items: [...baseDirectory.items, baseDirectory.items[0]] };
  assert.throws(() => validateMasterDirectory(duplicate, context), /duplicate master item key/i);

  const wrongKey = structuredClone(baseDirectory);
  wrongKey.items[0].key = 'green-book::wrong::key';
  assert.throws(() => validateMasterDirectory(wrongKey, context), /stable key mismatch/i);

  const wrongSourceRank = structuredClone(baseDirectory);
  wrongSourceRank.items[0].sortKey = '01.01|02|0001|green-book::1.1::guidance';
  assert.throws(() => validateMasterDirectory(wrongSourceRank, context), /source rank mismatch/i);
});

test('master validator enforces terminal notes and real canonical targets', () => {
  const terminalWithoutNote = structuredClone(baseDirectory);
  terminalWithoutNote.items[1].resolutionNote = null;
  assert.throws(() => validateMasterDirectory(terminalWithoutNote, context), /terminal resolutionNote/i);

  const missingKnowledge = structuredClone(baseDirectory);
  missingKnowledge.items[1].canonicalKnowledge = ['missing-knowledge'];
  assert.throws(() => validateMasterDirectory(missingKnowledge, context), /unresolved canonical Knowledge/i);
});

test('sequential scope starts at the first pending record and stays consecutive', () => {
  assert.equal(validateSequentialScope(baseDirectory, ['green-book::1.1::guidance']), true);
  assert.throws(
    () => validateSequentialScope(baseDirectory, ['green-book::1.3::guidance']),
    /must start at first pending.*green-book::1\.1::guidance/i,
  );
});

test('non-content source records may remain outside canonical topic order', () => {
  const directory = structuredClone(baseDirectory);
  directory.items.push({
    key: 'green-book::preface::non-content',
    kind: 'non-content',
    source: 'green-book',
    sourceSection: 'preface',
    sourceItem: null,
    questionPages: [],
    solutionPages: [],
    primaryTopic: null,
    canonicalTopics: [],
    sortKey: '99.99|01|0001|green-book::preface::non-content',
    state: 'non-content-frontmatter',
    canonicalProblems: [],
    canonicalKnowledge: [],
    workstream: null,
    resolutionNote: 'Verified frontmatter with no public ingestion target.',
  });
  const localContext = {
    ...context,
    sourceSections: new Map(
      [...context.sourceSections].map(([source, sections]) => [source, new Set(sections)]),
    ),
  };
  localContext.sourceSections.get('green-book').add('preface');
  assert.equal(validateMasterDirectory(directory, localContext), true);
});
