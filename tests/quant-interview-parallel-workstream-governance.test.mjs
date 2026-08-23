import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

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
  },
  {
    ordinal: '012',
    topic: 'limits-derivatives',
    branch: 'chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23',
  },
  {
    ordinal: '013',
    topic: 'reasoning-communication',
    branch: 'chatgpt/quant-interview-workstream-reasoning-communication-2026-08-23',
  },
];

test('handoff reserves the first parallel wave without claiming candidate completion', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';

  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
  assert.match(coordination, /candidate[^\n]*not[^\n]*complete/i);
  for (const reservation of reservations) {
    assert.match(coordination, new RegExp(reservation.ordinal));
    assert.match(coordination, new RegExp(reservation.topic));
    assert.match(coordination, new RegExp(reservation.branch.replaceAll('-', '\\-')));
  }
});

test('parallel reservations preserve Random Walks as the authoritative current topic', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';

  assert.match(current, /Random Walks & Markov Chains/i);
  assert.doesNotMatch(current, /Limits & Derivatives|Reasoning & Communication/i);
});

test('governance does not create product workstream manifests early', async () => {
  for (const reservation of reservations) {
    const domain = reservation.ordinal === '011'
      ? 'stochastic-processes-random-walks-markov-chains'
      : reservation.ordinal === '012'
        ? 'calculus-differential-equations-limits-derivatives'
        : 'interview-strategy-communication-reasoning-communication';
    await assert.rejects(
      access(`src/data/quant-interview/workstreams/${domain}-${reservation.ordinal}.json`),
    );
  }
});
