import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  getNextPendingItem,
  TERMINAL_STATES,
} from '../src/lib/quantInterviewMasterDirectory.mjs';
import {
  loadMasterDirectoryRepository,
  validateMasterDirectoryRepository,
} from '../scripts/validate-quant-interview-master-directory.mjs';

const manifestPath =
  'src/data/quant-interview/workstreams/interview-strategy-communication-interview-process-formats-assessment-strategy-016.json';
const keys = Array.from({ length: 9 }, (_, index) =>
  `red-book::1.${index + 1}::guidance`);
const workstreamId =
  'interview-strategy-communication-interview-process-formats-assessment-strategy-016';
const newSlug = 'quant-interview-formats-and-assessment-strategy';
const prepSlug = 'quant-interview-preparation-breadth-and-practice';
const framingSlug = 'problem-framing-clarification-assumption-management';
const thinkSlug = 'structured-think-aloud-reasoning';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const expected = new Map([
  [keys[0], ['knowledge-only', [newSlug]]],
  [keys[1], ['interview-guidance', []]],
  [keys[2], ['knowledge-only', [newSlug, framingSlug, thinkSlug]]],
  [keys[3], ['knowledge-only', [newSlug]]],
  [keys[4], ['knowledge-only', [newSlug]]],
  [keys[5], ['knowledge-only', [newSlug]]],
  [keys[6], ['interview-guidance', []]],
  [keys[7], ['knowledge-only', [newSlug]]],
  [keys[8], ['knowledge-only', [prepSlug]]],
]);

const notes = [
  'Red Book 1.1 assessment goals resolve to the canonical assessment-formats Knowledge page with no public Problem.',
  'Red Book 1.2 is dated networking, recruiter, and headhunter logistics; it remains target-free interview guidance.',
  'Red Book 1.3 live technical format, clarification, reasoning communication, and adaptive hints resolve to the assessment, framing, and think-aloud Knowledge pages.',
  'Red Book 1.4 durable remote-screen communication resolves to the assessment-formats Knowledge page after excluding source-era technology prescriptions.',
  'Red Book 1.5 take-home constraints, integrity, presentation, and deliverable quality resolve to the assessment-formats Knowledge page.',
  'Red Book 1.6 supervised written-exam rules, tools, time allocation, and clarity resolve to the assessment-formats Knowledge page.',
  'Red Book 1.7 post-application follow-up and relationship logistics remain target-free interview guidance.',
  'Red Book 1.8 reusable execution and integrity principles resolve to the assessment-formats Knowledge page after excluding dated prescriptions.',
  'Red Book 1.9 readiness signals resolve to the existing deliberate-practice preparation Knowledge page.',
];

test('016 manifest owns exactly nine ordered source rows while active', async () => {
  const manifest = await readJson(manifestPath);
  assert.equal(manifest.id, workstreamId);
  assert.equal(manifest.status, 'active');
  assert.deepEqual(manifest.masterItemKeys, keys);
  assert.deepEqual(manifest.publicDelta, { problems: 0, knowledge: 1 });
  assert.deepEqual(manifest.knowledgeSlugs, [newSlug]);
  assert.equal('preClosureActiveGate' in manifest, false);
  assert.equal('verification' in manifest, false);
  assert.equal('finalTreeGate' in manifest, false);
});

test('master and Red coverage mirror the exact selective dispositions', async () => {
  const [manifest, inputs, red] = await Promise.all([
    readJson(manifestPath),
    loadMasterDirectoryRepository(process.cwd()),
    readJson('src/data/quant-interview/coverage/red-book.json'),
  ]);
  assert.deepEqual(
    inputs.directory.items
      .filter((item) => item.workstream === manifest.id)
      .map((item) => item.key),
    keys,
  );
  for (const [index, key] of keys.entries()) {
    const master = inputs.directory.items.find((item) => item.key === key);
    const coverage = red.entries.find(
      (entry) =>
        entry.sourceSection === master.sourceSection && entry.sourceItem === null,
    );
    const [state, targets] = expected.get(key);
    assert.equal(master.state, state, key);
    assert.equal(coverage.state, state, key);
    assert.deepEqual(master.canonicalProblems, [], key);
    assert.deepEqual(coverage.canonicalProblems, [], key);
    assert.deepEqual(master.canonicalKnowledge, targets, key);
    assert.deepEqual(coverage.canonicalKnowledge, targets, key);
    assert.equal(master.workstream, manifest.id, key);
    assert.equal(master.resolutionNote, notes[index], key);
    assert.equal(coverage.resolutionNote, notes[index], key);
  }
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

const identityFixtures = [
  ['1.1', [{ startPage: 13, endPage: 13 }], '01.03|02|0001|red-book::1.1::guidance'],
  ['1.2', [{ startPage: 13, endPage: 15 }], '01.03|02|0002|red-book::1.2::guidance'],
  ['1.3', [{ startPage: 15, endPage: 17 }], '01.03|02|0003|red-book::1.3::guidance'],
  ['1.4', [{ startPage: 17, endPage: 18 }], '01.03|02|0004|red-book::1.4::guidance'],
  ['1.5', [{ startPage: 18, endPage: 18 }], '01.03|02|0005|red-book::1.5::guidance'],
  ['1.6', [{ startPage: 18, endPage: 19 }], '01.03|02|0006|red-book::1.6::guidance'],
  ['1.7', [{ startPage: 19, endPage: 19 }], '01.03|02|0007|red-book::1.7::guidance'],
  ['1.8', [{ startPage: 20, endPage: 21 }], '01.03|02|0008|red-book::1.8::guidance'],
  ['1.9', [{ startPage: 21, endPage: 22 }], '01.03|02|0009|red-book::1.9::guidance'],
].map(([sourceSection, questionPages, sortKey], index) => ({
  key: keys[index],
  kind: 'guidance',
  source: 'red-book',
  sourceSection,
  sourceItem: null,
  questionPages,
  solutionPages: [],
  primaryTopic: 'interview-process-formats',
  canonicalTopics: [
    'interview-strategy-communication',
    'interview-process-formats',
  ],
  sortKey,
}));

test('016 preserves literal source identity while repairing only Red 1.7 pages', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  const actual = keys.map((key) => {
    const item = inputs.directory.items.find((candidate) => candidate.key === key);
    return {
      key: item.key,
      kind: item.kind,
      source: item.source,
      sourceSection: item.sourceSection,
      sourceItem: item.sourceItem,
      questionPages: item.questionPages,
      solutionPages: item.solutionPages,
      primaryTopic: item.primaryTopic,
      canonicalTopics: item.canonicalTopics,
      sortKey: item.sortKey,
    };
  });
  assert.deepEqual(actual, identityFixtures);
});

test('016 yields exact 76/53, 205/545, and Red 9.2 next', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 76);
  assert.equal(inputs.knowledgeSlugs.size, 53);
  assert.equal(
    inputs.directory.items.filter((item) => TERMINAL_STATES.has(item.state))
      .length,
    205,
  );
  assert.equal(
    inputs.directory.items.filter((item) => item.state === 'pending').length,
    545,
  );
  assert.equal(getNextPendingItem(inputs.directory)?.key, 'red-book::9.2::guidance');
  assert.equal(inputs.workstreams.some(({ id }) => /-017$/.test(id)), false);
});
