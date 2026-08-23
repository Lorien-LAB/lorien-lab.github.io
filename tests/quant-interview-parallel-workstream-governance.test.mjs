import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const protocolPath = 'docs/quant-interview/AGENT_PROTOCOL.md';

test('protocol permits bounded isolated candidates and serializes shared closure', async () => {
  const protocol = await readFile(protocolPath, 'utf8');

  assert.match(protocol, /up to three isolated canonical topic workstreams/i);
  assert.match(protocol, /one branch[^\n]*one bounded canonical topic/i);
  assert.match(protocol, /module implementation may not begin until[^\n]*written module spec[^\n]*approved/i);
  assert.match(protocol, /each candidate uses its own branch and worktree from the same frozen durable base/i);
  assert.match(protocol, /candidate branches[^\n]*never share a checkout[^\n]*never edit another candidate branch/i);
  assert.match(protocol, /single coordinator/i);
  assert.match(protocol, /ordinal reservation/i);
  assert.match(protocol, /coverage[^\n]*source-topic[^\n]*exact global counts[^\n]*HANDOFF/i);
  assert.match(protocol, /candidate agents must not edit[^\n]*shared coverage[^\n]*source-topic map[^\n]*global-count regression[^\n]*HANDOFF[^\n]*completion metadata[^\n]*CI workflow paths/i);
  assert.match(protocol, /candidates may only submit local module content and test changes allowed by their approved spec/i);
  assert.match(protocol, /candidate[^\n]*remain[^\n]*active/i);
  assert.match(protocol, /only the coordinator[^\n]*complete/i);
  assert.match(protocol, /integration[^\n]*completion[^\n]*HANDOFF closure[^\n]*serial/i);
  assert.match(protocol, /candidate branches[^\n]*(?:never|must not)[^\n]*force-update shared history/i);
});

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
