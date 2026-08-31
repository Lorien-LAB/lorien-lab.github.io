import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const paths = {
  parity: 'src/content/problems/logic/last-ball-color-by-parity-invariant.md',
  switches: 'src/content/problems/logic/four-switches-one-room-entry.md',
};

const parityMetadata = {
  problemId: 'logic-logical-deduction-009', title: 'Last-Ball Color from a Parity Invariant',
  description: 'Determine the final ball color in a random replacement process by proving that red-count parity never changes.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Parity', 'Invariants'], tags: ['Logical Deduction', 'Parity', 'Invariants', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations', 'modular-arithmetic'],
  concepts: ['constraint-reframing-and-latent-state', 'modular-invariants'], techniques: [], prerequisites: [],
  relatedProblems: ['pack-length-four-bricks-in-six-cube', 'predator-replacement-parity'], family: 'replacement-parity',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12, status: 'solved', featured: false,
};
const switchMetadata = {
  problemId: 'logic-logical-deduction-010', title: 'Four Switches with One Room Entry',
  description: 'Encode four possible controlling switches into the bulb\'s light and thermal state so one room entry identifies the correct switch.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Decision Trees', 'State Encoding'], tags: ['Logical Deduction', 'Information', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['two-guards-one-question', 'top-three-from-batched-races'], family: 'latent-state-identification',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  assert.deepEqual(
    [...body.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading),
    ['Solution', 'Why This Problem Matters', 'Common Mistakes', 'Extensions'],
  );
  return body;
}

function parityTransitions(body) {
  const rows = [...body.matchAll(/^\|\s*`(BB|RR|BR)`\s*\|\s*`\((-?\d+),\s*(-?\d+)\)`\s*\|$/gm)];
  assert.equal(rows.length, 3, 'solution must publish exactly three replacement transitions');
  return new Map(rows.map(([, pair, blue, red]) => [pair, [Number(blue), Number(red)]]));
}

function assertRedParityIsInvariant(transitions) {
  for (let blue = 0; blue <= 8; blue++) for (let red = 0; red <= 8; red++) {
    for (const [pair, [blueChange, redChange]] of transitions) {
      if ((pair === 'BB' && blue < 2) || (pair === 'RR' && red < 2) || (pair === 'BR' && (blue < 1 || red < 1))) continue;
      assert.equal((red + redChange) % 2, red % 2, `${pair} changed red parity`);
      assert.equal(blue + blueChange + red + redChange, blue + red - 1, `${pair} does not remove one ball`);
    }
  }
}

function switchSignatures(body) {
  const rows = [...body.matchAll(/^\|\s*([1-4])\s*\|\s*`(on|off)`\s*\|\s*`(hot|cold)`\s*\|$/gm)];
  assert.equal(rows.length, 4, 'solution must publish four switch observations');
  return new Map(rows.map(([, number, state, temperature]) => [Number(number), {
    on: state === 'on', hot: temperature === 'hot',
  }]));
}

test('last-ball Problem publishes exact metadata and a parity-preserving transition proof', async () => {
  const { text, metadata } = await page(paths.parity);
  assert.deepEqual(metadata, parityMetadata);
  const body = solution(text);
  const transitions = parityTransitions(body);
  assert.deepEqual(transitions, new Map([
    ['BB', [-1, 0]], ['RR', [1, -2]], ['BR', [-1, 0]],
  ]));
  assertRedParityIsInvariant(transitions);
  assert.match(body, /20 blue, 14 red.*blue/i);
  assert.match(body, /20 blue, 13 red.*red/i);
  assert.match(body, /random(?:ly)? selected pair.*does not affect.*parity/i);

  const mutant = new Map(transitions);
  mutant.set('RR', [1, -1]);
  assert.throws(() => assertRedParityIsInvariant(mutant), /changed red parity/);
});

test('four-switch Problem publishes exact metadata, schedule, and four distinct observable signatures', async () => {
  const { text, metadata } = await page(paths.switches);
  assert.deepEqual(metadata, switchMetadata);
  const body = solution(text);
  assert.match(body, /switches 1 and 2 on.*long enough to heat/i);
  assert.match(body, /switch 2 off and switch 3 on immediately before entry/i);
  assert.match(body, /switch 1 remains on and switch 4 remains off/i);
  assert.match(body, /bulbs switched on long enough become perceptibly hot.*remain hot until entry/i);
  assert.match(body, /a bulb never switched on remains perceptibly cold/i);
  assert.match(body, /zero entries cannot identify the controlling switch/i);

  const signatures = switchSignatures(body);
  assert.deepEqual(signatures, new Map([
    [1, { on: true, hot: true }], [2, { on: false, hot: true }],
    [3, { on: true, hot: false }], [4, { on: false, hot: false }],
  ]));
  assert.equal(new Set([...signatures.values()].map((signature) => `${Number(signature.on)}:${Number(signature.hot)}`)).size, 4);

  const mutant = new Map(signatures);
  mutant.set(4, { on: true, hot: false });
  assert.throws(() => assert.equal(
    new Set([...mutant.values()].map((signature) => `${Number(signature.on)}:${Number(signature.hot)}`)).size,
    4,
  ));
});
