import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const protocolPath = 'docs/quant-interview/AGENT_PROTOCOL.md';
const readmePath = 'docs/quant-interview/README.md';
const designPath = 'docs/superpowers/specs/2026-08-23-quant-interview-parallel-workstream-governance-design.md';
const planPath = 'docs/superpowers/plans/2026-08-23-quant-interview-parallel-workstream-governance.md';

const governanceEntrypoints = {
  AGENT_PROTOCOL: protocolPath,
  README: readmePath,
  design: designPath,
  plan: planPath,
};

const normalizePolicy = (markdown) => markdown
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/[`*_>#|]/g, ' ')
  .replace(/[–—]/g, '-')
  .replace(/\s+/g, ' ')
  .trim();

const readPolicy = async (path) => normalizePolicy(await readFile(path, 'utf8'));

for (const [name, path] of Object.entries(governanceEntrypoints)) {
  test(`${name} permits bounded candidates and serializes closure`, async () => {
    const policy = await readPolicy(path);
    assert.match(
      policy,
      /up to three isolated (?:module )?(?:candidate )?(?:branches(?:\/worktrees)?|canonical topic workstreams)[^.]{0,80}\bactive\b/i,
      `${name} must permit up to three isolated active candidates`,
    );
    assert.match(
      policy,
      /(?:one branch must still implement one bounded (?:infrastructure stage or one bounded )?canonical topic workstream|each candidate branch owns exactly one approved module)/i,
      `${name} must limit each candidate branch to one approved module`,
    );
    assert.match(
      policy,
      /module implementation may not begin until[^.]{0,160}(?:written )?module (?:design )?spec[^.]{0,80}approved/i,
      `${name} must gate module implementation on an approved written design`,
    );
    assert.match(
      policy,
      /candidate agents must not edit shared coverage, source-topic map, (?:exact )?global-(?:registry\/)?count regressions?, HANDOFF, (?:workstream\/)?completion metadata, or CI workflow paths/i,
      `${name} must reserve every shared governance surface for the coordinator`,
    );
    assert.match(
      policy,
      /(?:candidates may only submit local module content and test changes allowed by their approved spec|may implement only module-scoped public Knowledge\/Problem content plus module-specific tests explicitly allowed by that approved module spec)/i,
      `${name} must limit candidate edits to approved module-local content and tests`,
    );
    assert.match(policy, /(?:single|only the|the) coordinator/i, `${name} must name one coordinator`);
    assert.match(
      policy,
      /(?:integration|closure)[^.]{0,220}serial|serial[^.]{0,220}(?:integration|closure)/i,
      `${name} must serialize integration or closure`,
    );
  });
}

for (const name of ['README', 'design', 'plan']) {
  test(`${name} requires reports, audit gating, and ordered coordinator updates`, async () => {
    const policy = await readPolicy(governanceEntrypoints[name]);
    assert.match(
      policy,
      /candidates hand the coordinator precise proposed shared-file deltas in their reports/i,
      `${name} must route proposed shared-file deltas through candidate reports`,
    );
    assert.match(
      policy,
      /design and source audit may precede approval/i,
      `${name} must allow audit but not implementation before design approval`,
    );
    assert.match(
      policy,
      /coordinator serializes reconciliation, integration, and closure in the order 011[^.]{0,40}012[^.]{0,40}013 on the latest durable base and updates shared files/i,
      `${name} must lock coordinator-owned integration order and shared-file updates`,
    );
  });
}

const candidateSubject = /\b(?:candidates?|module (?:agents?|branch(?:es)?|workstreams?))\b/i;
const sharedSurface = /\b(?:shared (?:files?|coverage|coverage ledgers?)|coverage-ledgers?|source-topic map|source-map|global-(?:registry\/)?count regressions?|HANDOFF|(?:workstream\/)?completion metadata|CI workflow paths?|CI workflows?)\b/i;
const directEditAuthorization = /\b(?:may|can)\s+(?:directly\s+)?(?:produce|make|edit|modify|update|write|commit|carry)\b/i;
const explicitEditAuthorization = /\b(?:is|are)\s+(?:explicitly\s+)?(?:allowed|permitted|authorized)\s+to\s+(?:directly\s+)?(?:produce|make|edit|modify|update|write|commit|carry)\b/i;
const candidateActivityProhibitions = [
  /\b(?:is|are)\s+(?:explicitly\s+)?(?:prohibited|forbidden|disallowed|barred)\s+from\s+being\s+active\b/i,
  /\b(?:is|are)\s+not\s+(?:allowed|permitted|authorized)\s+to\s+(?:be|remain)\s+active\b/i,
  /\b(?:must not|may not|cannot|can't|can not|never)\s+(?:be|remain)\s+active\b/i,
  /\b(?:does not|do not|cannot|can't|must not|may not|never)\b[^.]{0,100}\bup to three\b|\bup to three\b[^.]{0,100}\b(?:not|never|cannot|can't|must not|may not)\b/i,
];
const numberValues = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
  ['ten', 10],
]);
const obsoleteGlobalSerialRule = /process one bounded canonical topic workstream at a time across every mapped verified source|one canonical workstream globally at a time/i;

const policySentences = (policy) => normalizePolicy(policy).split(/(?<=[.!?])\s+/);

function grantsCandidateSharedEdit(policy) {
  return policySentences(policy).some((sentence) => (
    candidateSubject.test(sentence)
    && sharedSurface.test(sentence)
    && (directEditAuthorization.test(sentence) || explicitEditAuthorization.test(sentence))
  ));
}

function candidateLimit(value) {
  return /^\d+$/.test(value) ? Number(value) : numberValues.get(value.toLowerCase());
}

function hasIncompatibleCandidateCap(sentence) {
  const capPattern = /\b(?:up to|at most|no more than|only|maximum(?: of)?)\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:isolated\s+)?(?:module\s+)?(?:candidate\s+)?(?:canonical topic\s+)?(?:candidates?|agents?|branch(?:es)?|workstreams?)(?:\/worktrees)?\b[^.]{0,120}\bactive\b/gi;
  return [...sentence.matchAll(capPattern)].some(([, value]) => candidateLimit(value) !== 3);
}

function contradictsCandidateConcurrency(policy) {
  return policySentences(policy).some((sentence) => (
    hasIncompatibleCandidateCap(sentence)
    || (
      candidateSubject.test(sentence)
      && /\bactive\b/i.test(sentence)
      && candidateActivityProhibitions.some((prohibition) => prohibition.test(sentence))
    )
  ));
}

test('shared-edit detector catches ordinary candidate permission reversals', () => {
  const mutations = [
    'Candidates may edit shared coverage.',
    'A candidate may edit the source-topic map.',
    'Module agents are authorized to edit shared coverage.',
    'A module branch is permitted to update HANDOFF.',
    'A candidate workstream can modify completion metadata.',
    'Candidate branches are allowed to commit CI workflow changes.',
  ];

  for (const mutation of mutations) {
    assert.ok(
      grantsCandidateSharedEdit(mutation),
      `shared-edit reversal was not detected: ${mutation}`,
    );
  }
});

test('concurrency detector catches prohibitions and incompatible numeric caps', () => {
  const mutations = [
    'Up to three candidates are prohibited from being active.',
    'At most two candidates may be active despite the up to three reservation.',
    'Only one module branch may be active at once.',
  ];

  for (const mutation of mutations) {
    assert.ok(
      contradictsCandidateConcurrency(mutation),
      `concurrency reversal was not detected: ${mutation}`,
    );
  }
});

test('contradiction detectors accept approved candidate restrictions and capacity', () => {
  const approved = normalizePolicy(`
    Up to three isolated module candidate branches/worktrees may be active at once.
    Candidate agents must not edit shared coverage, source-topic map, exact global-registry/count regressions,
    HANDOFF, workstream/completion metadata, or CI workflow paths.
    At most three candidates may be active.
  `);

  assert.equal(grantsCandidateSharedEdit(approved), false);
  assert.equal(contradictsCandidateConcurrency(approved), false);
});

for (const [name, path] of Object.entries(governanceEntrypoints)) {
  test(`${name} rejects contradictory candidate permissions and concurrency negation`, async () => {
    const policy = await readPolicy(path);
    assert.equal(grantsCandidateSharedEdit(policy), false, `${name} grants candidates shared-file edit authority`);
    assert.equal(contradictsCandidateConcurrency(policy), false, `${name} contradicts the up-to-three candidate allowance`);
    assert.doesNotMatch(policy, obsoleteGlobalSerialRule, `${name} restores globally serial candidate development`);
  });
}

const handoffPath = 'docs/quant-interview/HANDOFF.md';

const reservations = [
  {
    ordinal: '011',
    topic: 'random-walks-markov-chains',
    branch: 'chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23',
    state: 'design-audit',
  },
  {
    ordinal: '012',
    topic: 'limits-derivatives',
    branch: 'chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23',
    state: 'design-audit',
  },
  {
    ordinal: '013',
    topic: 'reasoning-communication',
    branch: 'chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23',
    state: 'design-audit',
  },
];

const normalizeCell = (cell) => cell.trim().replace(/^`|`$/g, '').replace(/\s+/g, ' ');

function reservationRows(coordination) {
  return coordination
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|\s*\d{3}\s*\|/.test(line))
    .map((line) => line.split('|').slice(1, -1).map(normalizeCell))
    .map(([queue, ordinal, topic, branch, state]) => ({ queue, ordinal, topic, branch, state }));
}

test('handoff reserves the first parallel wave without claiming candidate completion', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
  assert.match(coordination, /candidate[^\n]*active[^\n]*not[^\n]*complete/i);
  assert.deepEqual(
    reservationRows(coordination),
    reservations.map((reservation, index) => ({ queue: String(index + 1), ...reservation })),
  );
});

test('parallel reservations preserve Random Walks as the authoritative current topic', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';

  assert.match(current, /Random Walks & Markov Chains/i);
  assert.doesNotMatch(current, /Limits & Derivatives|Reasoning & Communication/i);
});

test('governance does not create product workstream manifests early', async () => {
  const files = await readdir('src/data/quant-interview/workstreams');
  const reservedOrdinals = new Set(reservations.map(({ ordinal }) => ordinal));
  const prematureManifests = files.filter((file) => {
    const suffix = file.match(/(\d{3})\.json$/)?.[1];
    return suffix && reservedOrdinals.has(suffix);
  });

  assert.deepEqual(prematureManifests, []);
});
