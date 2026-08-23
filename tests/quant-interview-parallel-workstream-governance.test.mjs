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

const sharedEditContradictions = [
  /candidate source-map and coverage-ledger changes/i,
  /(?:candidate|module) branches? may carry candidate (?:edits|changes) to shared files/i,
  /(?:candidate|module) (?:agents?|branches?|workstreams?) (?:may|can|are allowed to|are permitted to) (?:produce|make|edit|modify|update|carry|commit)[^.]{0,300}(?:shared files|shared coverage|coverage-ledger|source-topic map|source-map|global-count|HANDOFF|completion metadata|CI workflow)/i,
];
const negatedConcurrency = /\b(?:not|never|cannot|can't|must not|may not)\b[^.]{0,100}\bup to three\b|\bup to three\b[^.]{0,100}\b(?:not|never|cannot|can't|must not|may not)\b/i;
const obsoleteGlobalSerialRule = /process one bounded canonical topic workstream at a time across every mapped verified source|one canonical workstream globally at a time/i;

for (const [name, path] of Object.entries(governanceEntrypoints)) {
  test(`${name} rejects contradictory candidate permissions and concurrency negation`, async () => {
    const policy = await readPolicy(path);
    for (const contradiction of sharedEditContradictions) {
      assert.doesNotMatch(policy, contradiction, `${name} grants candidates shared-file edit authority`);
    }
    assert.doesNotMatch(policy, negatedConcurrency, `${name} negates the up-to-three candidate allowance`);
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
