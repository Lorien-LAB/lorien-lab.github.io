import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const paths = {
  box: 'src/content/problems/logic/pack-length-four-bricks-in-six-cube.md',
  calendar: 'src/content/problems/logic/two-cube-calendar-digit-labeling.md',
};

const boxMetadata = {
  problemId: 'logic-logical-deduction-005', title: 'Packing Length-Four Bricks in a Six-Cube',
  description: 'Decide whether 53 axis-aligned length-four bricks fit in a six-cube, and prove the answer with a three-dimensional coloring invariant.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Invariants', 'Coloring Arguments'], tags: ['Logical Deduction', 'Invariants', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'invariants-state-transformations'],
  concepts: ['constraint-reframing-and-latent-state', 'modular-invariants'], techniques: [], prerequisites: [],
  relatedProblems: ['two-cube-calendar-digit-labeling', 'last-ball-color-by-parity-invariant'], family: 'coloring-obstruction',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
};

const calendarMetadata = {
  problemId: 'logic-logical-deduction-006', title: 'Two-Cube Calendar Digit Labeling',
  description: 'Label two six-faced cubes so their visible faces can display every date from 01 through 31, and prove the construction is sufficient.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Constraint Satisfaction', 'Constructive Proofs'], tags: ['Logical Deduction', 'Construction', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], techniques: [], prerequisites: [],
  relatedProblems: ['pack-length-four-bricks-in-six-cube', 'two-guards-one-question'], family: 'digit-labeling-construction',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15, status: 'solved', featured: false,
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

test('box-packing Problem has the public solved-page contract and exact metadata', async () => {
  const { text, metadata } = await page(paths.box);
  assert.deepEqual(metadata, boxMetadata);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const body = solution(text);
  assert.match(body, /53\s*\*\s*4\s*=\s*212\s*<\s*216/);
  assert.match(body, /volume alone.*insufficient|volume.*does not.*sufficient/is);
  assert.match(body, /offset.*three.*1-2-1.*two.*each color/is);
  assert.match(body, /2n\s*<=\s*104/);
  assert.match(body, /n\s*<=\s*52/);
  assert.doesNotMatch(text, /Green Book|A Practical Guide|PDF page|source item/i);
});

test('independent three-dimensional coloring enumerates every legal brick placement and yields the 52 bound', () => {
  const color = (x, y, z) => (Math.floor(x / 2) + Math.floor(y / 2) + Math.floor(z / 2)) % 2;
  const cellCounts = [0, 0];
  for (let x = 0; x < 6; x += 2) for (let y = 0; y < 6; y += 2) for (let z = 0; z < 6; z += 2) cellCounts[color(x, y, z)] += 1;
  assert.deepEqual(cellCounts.sort((a, b) => a - b), [13, 14]);
  for (let axis = 0; axis < 3; axis++) for (let x = 0; x < 6; x++) for (let y = 0; y < 6; y++) for (let z = 0; z < 6; z++) {
    const start = [x, y, z];
    if (start[axis] + 4 > 6) continue;
    const colors = [0, 1, 2, 3].map((d) => { const point = [...start]; point[axis] += d; return color(...point); });
    assert.equal(colors.filter((value) => value === 0).length, 2);
    assert.equal(colors.filter((value) => value === 1).length, 2);
  }
  assert.equal((13 * 8) / 2, 52);
});

test('calendar-cube Problem has exact metadata, labels, and sufficient all-date construction', async () => {
  const { text, metadata } = await page(paths.calendar);
  assert.deepEqual(metadata, calendarMetadata);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const body = solution(text);
  const labels = [...body.matchAll(/^Cube ([AB]):\s*`([0-9, ]+)`$/gm)];
  assert.deepEqual(labels.map(([, cube, faces]) => [cube, faces.split(', ')]), [
    ['A', ['0', '1', '2', '3', '4', '5']],
    ['B', ['0', '1', '2', '6', '7', '8']],
  ]);
  assert.match(body, /both cubes need `0`, `1`, and `2`/i);
  assert.match(body, /six remaining face slots/i);
  assert.match(body, /3, 4, 5, 6\/9, 7, and 8/i);

  const cubeA = ['0', '1', '2', '3', '4', '5'];
  const cubeB = ['0', '1', '2', '6', '7', '8'];
  const supports = (cube, digit) => cube.includes(digit) || (digit === '9' && cube.includes('6'));
  const canDisplay = (day) => {
    const [a, b] = String(day).padStart(2, '0');
    return (supports(cubeA, a) && supports(cubeB, b)) || (supports(cubeB, a) && supports(cubeA, b));
  };
  for (let day = 1; day <= 31; day += 1) assert.equal(canDisplay(day), true, `missing ${day}`);
  assert.doesNotMatch(text, /Green Book|A Practical Guide|PDF page|source item/i);
});
