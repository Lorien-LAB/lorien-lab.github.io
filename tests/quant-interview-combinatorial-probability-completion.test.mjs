import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-combinatorial-probability-006.json';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('combinatorial probability workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.deepEqual(workstream.verification?.commands, [
    'npm run test',
    'npm run check',
    'npm run build',
  ]);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('handoff records the sixth completed workstream and advances to Conditional Probability & Bayes', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');

  assert.match(handoff, /probability-statistics-combinatorial-probability-006/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'counting-permutations-combinations',
    'finite-combinatorial-probability-modeling',
    'inclusion-exclusion-derangements',
    'poker-hand-probabilities',
    'top-two-meet-in-knockout-final',
    'five-letters-all-misaddressed',
    'birthday-collision-threshold',
    'no-consecutive-heads-in-n-tosses',
    'random-subsets-containment-probability',
  ]) assert.match(handoff, new RegExp(slug));

  assert.match(handoff, /30 canonical Problems/i);
  assert.match(handoff, /27 explicitly topic-classified|27 topic-classified/i);
  assert.match(handoff, /10[^\n]*(?:claimed|source|coverage)[^\n]*(?:rows|items)|ten[^\n]*(?:claimed|source|coverage)/i);
  assert.match(handoff, /merged-duplicate|same canonical Problem|one canonical Problem/i);
  assert.match(handoff, /item-level/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Probability & Statistics/i);
  assert.match(nextAction, /Conditional Probability & Bayes/i);
  assert.doesNotMatch(nextAction, /Combinatorial Probability[\s\S]{0,180}(?:execute|next|continue)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
