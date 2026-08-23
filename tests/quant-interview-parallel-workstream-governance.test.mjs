import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const protocolPath = 'docs/quant-interview/AGENT_PROTOCOL.md';

test('protocol permits bounded isolated candidates and serializes shared closure', async () => {
  const protocol = await readFile(protocolPath, 'utf8');

  assert.match(protocol, /up to three isolated canonical topic workstreams/i);
  assert.match(protocol, /one branch[^\n]*one bounded canonical topic/i);
  assert.match(protocol, /single coordinator/i);
  assert.match(protocol, /ordinal reservation/i);
  assert.match(protocol, /coverage[^\n]*source-topic[^\n]*exact global counts[^\n]*HANDOFF/i);
  assert.match(protocol, /candidate[^\n]*remain[^\n]*active/i);
  assert.match(protocol, /only the coordinator[^\n]*complete/i);
  assert.match(protocol, /integration[^\n]*completion[^\n]*HANDOFF closure[^\n]*serial/i);
  assert.match(protocol, /force[^\n]*push|force-update/i);
});
