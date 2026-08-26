import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json';

test('conditional probability Bayes workstream closes only with real verification evidence', async () => {
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

test('handoff records the seventh completed workstream and advances to Random Variables & Distributions', async () => {
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  assert.match(handoff, /probability-statistics-conditional-probability-bayes-007/);
  assert.match(handoff, /conditioning/);
  assert.match(handoff, /bayes-rule-base-rates/);
  for (const slug of [
    'hidden-coin-posterior-after-heads',
    'two-children-information-protocol',
    'monty-hall-switching',
    'russian-roulette-after-survival',
    'candies-last-color-ordering',
    'golden-face-posterior',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /12\s+(?:claimed\s+)?(?:terminal\s+)?source rows|12\s+terminal/i);
  assert.match(handoff, /36 canonical Problems/i);
  assert.match(handoff, /28 explicitly topic-classified|28 topic-classified/i);
  assert.match(handoff, /joint[- ]normal/i);
  assert.match(handoff, /protocol|observation/i);

  const nextAction = handoff.split(/## Next action/i)[1] ?? '';
  assert.match(nextAction, /cross-book/i);
  assert.match(nextAction, /Historical transition marker/i);
  assert.match(nextAction, /Random Variables & Distributions/i);
  assert.doesNotMatch(nextAction, /Conditional Probability & Bayes[\s\S]{0,180}(?:execute|next|continue|target workstream)/i);
  assert.doesNotMatch(nextAction, /Question\s+\d+|Q\d+/i);
});
