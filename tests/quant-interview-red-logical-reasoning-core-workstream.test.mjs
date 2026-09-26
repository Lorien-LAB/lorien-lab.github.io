import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadMasterDirectoryRepository, validateMasterDirectoryRepository } from '../scripts/validate-quant-interview-master-directory.mjs';

const workstreamId = 'logic-brainteasers-discrete-reasoning-red-logical-reasoning-core-022';
const keys = [
  "red-book::8::8.11",
  "red-book::8::8.15",
  "red-book::8::8.16",
  "red-book::8::8.18",
  "red-book::8::8.20",
  "red-book::8::8.22"
];

test('022 active corpus has the exact public delta and six terminal dispositions', async () => {
  const inputs = await loadMasterDirectoryRepository(process.cwd());
  assert.equal(inputs.problemSlugs.size, 101);
  assert.equal(inputs.knowledgeSlugs.size, 61);
  const ws = inputs.workstreams.find(({ id }) => id === workstreamId);
  assert.ok(ws);
  assert.equal(ws.status, 'active');
  assert.deepEqual(ws.publicDelta, { problems: 5, knowledge: 2 });
  assert.deepEqual(ws.masterItemKeys, keys);
  assert.equal('verification' in ws, false);
  assert.equal('preClosureActiveGate' in ws, false);

  const rows = keys.map((key) => inputs.directory.items.find((row) => row.key === key));
  assert.ok(rows.every(Boolean));
  assert.deepEqual(rows.map((row) => row.state), [
    'canonical-problem','canonical-problem','variant','canonical-problem','canonical-problem','canonical-problem'
  ]);
  assert.ok(rows.every((row) => row.workstream === workstreamId));
  assert.ok(rows.every((row) => row.resolutionNote?.length > 20));

  const terminal = inputs.directory.items.filter((row) => row.state !== 'pending');
  assert.equal(terminal.length, 268);
  assert.equal(inputs.directory.items.length - terminal.length, 482);
  const next = inputs.directory.items.filter((row) => row.state === 'pending').sort((a,b) => a.sortKey.localeCompare(b.sortKey))[0];
  assert.equal(next.key, '150-most-frequently-asked::2.7::theory');
  assert.equal(validateMasterDirectoryRepository(inputs), true);
});

test('022 source-neutral pages and reciprocal relationships are present', async () => {
  const paths = [
    'snow-removal-start-time-from-distance-ratio',
    'falsifying-a-one-way-card-rule',
    'anchor-overboard-water-level',
    'public-announcement-departure-day',
    'bisecting-a-rectangular-frame-with-one-line',
  ];
  for (const slug of paths) {
    const body = await readFile(`src/content/problems/logic/${slug}.md`, 'utf8');
    assert.doesNotMatch(body, /Red Book|8\.11|8\.15|8\.16|8\.18|8\.20|8\.22/i);
    assert.match(body, /^## Problem$/m);
    assert.match(body, /<summary>Show Solution<\/summary>/);
    assert.match(body, /^## Why This Problem Matters$/m);
    assert.match(body, /^## Common Mistakes$/m);
    assert.match(body, /^## Extensions$/m);
  }
  const oldAnnouncement = await readFile('src/content/problems/logic/public-announcement-candidate-elimination.md', 'utf8');
  const newAnnouncement = await readFile('src/content/problems/logic/public-announcement-departure-day.md', 'utf8');
  assert.match(oldAnnouncement, /public-announcement-departure-day/);
  assert.match(newAnnouncement, /relatedProblems: \[public-announcement-candidate-elimination\]/);
});

test('022 nine-object scale variant distinguishes all nine heavy hypotheses in two weighings', async () => {
  const page = await readFile('src/content/problems/logic/twelve-object-balance-scale-diagnosis.md', 'utf8');
  assert.match(page, /Variant: Nine Objects with One Known-Heavy Anomaly/);
  assert.match(page, /3\^2=9/);
  assert.match(page, /weigh objects 1–3 against 4–6/);
  assert.match(page, /weigh its first object against its second/);

  const weigh = (left, right, heavy) => {
    const leftWeight = left.length + Number(left.includes(heavy));
    const rightWeight = right.length + Number(right.includes(heavy));
    return Math.sign(leftWeight - rightWeight);
  };
  const diagnose = (heavy) => {
    const first = weigh([1,2,3], [4,5,6], heavy);
    const group = first > 0 ? [1,2,3] : first < 0 ? [4,5,6] : [7,8,9];
    const second = weigh([group[0]], [group[1]], heavy);
    return second > 0 ? group[0] : second < 0 ? group[1] : group[2];
  };
  assert.deepEqual(Array.from({length:9}, (_,i) => diagnose(i+1)), [1,2,3,4,5,6,7,8,9]);
});

test('022 card-rule audit requires A and 7 for every hidden-state assignment', async () => {
  const page = await readFile('src/content/problems/logic/falsifying-a-one-way-card-rule.md', 'utf8');
  assert.match(page, /necessary and sufficient inspection set is \*\*A and 7\*\*/);
  const cards = ['A', '7', '6', 'C'];
  // True means an odd reverse for letters and a vowel reverse for numbers.
  const assignments = Array.from({ length: 16 }, (_, mask) =>
    Object.fromEntries(cards.map((card, index) => [card, Boolean(mask & (1 << index))])));
  const violatesRule = (state) => state.A || state['7'];
  const determinesValidity = (inspected) => {
    const observations = new Map();
    for (const state of assignments) {
      const signature = inspected.map((card) => Number(state[card])).join('');
      const valid = !violatesRule(state);
      if (observations.has(signature) && observations.get(signature) !== valid) return false;
      observations.set(signature, valid);
    }
    return true;
  };
  const pairs = cards.flatMap((first, index) => cards.slice(index + 1).map((second) => [first, second]));
  assert.deepEqual(pairs.filter(determinesValidity), [['A', '7']]);
  assert.equal(determinesValidity(['A']), false);
  assert.equal(determinesValidity(['7']), false);
});

test('022 public non-actions eliminate one lower-count world per night', () => {
  const remaining = new Set([1,2,3,4,5,6,7,8]);
  const departureNights = new Map();
  for (let night = 1; night <= 8; night += 1) {
    const leaving = [...remaining].filter((count) => !remaining.has(count - 1));
    assert.deepEqual(leaving, [night]);
    for (const count of leaving) {
      departureNights.set(count, night);
      remaining.delete(count);
    }
  }
  assert.deepEqual([...departureNights.values()], [1,2,3,4,5,6,7,8]);
});

test('022 rectangular-frame line pairs area across both rectangle centers', async () => {
  const page = await readFile('src/content/problems/logic/bisecting-a-rectangular-frame-with-one-line.md', 'utf8');
  assert.match(page, /line through both centers/);
  assert.match(page, /180 degrees/);
  const clippedArea = ([cx, cy, width, height], [dx, dy]) => {
    const corners = [
      [cx - width/2, cy - height/2], [cx + width/2, cy - height/2],
      [cx + width/2, cy + height/2], [cx - width/2, cy + height/2],
    ];
    const side = ([x, y]) => dx*y - dy*x;
    const clipped = [];
    for (let i = 0; i < corners.length; i += 1) {
      const start = corners[i], end = corners[(i + 1) % corners.length];
      const startSide = side(start), endSide = side(end);
      if (startSide >= 0) clipped.push(start);
      if ((startSide < 0 && endSide > 0) || (startSide > 0 && endSide < 0)) {
        const portion = startSide / (startSide - endSide);
        clipped.push([start[0] + portion*(end[0] - start[0]), start[1] + portion*(end[1] - start[1])]);
      }
    }
    return Math.abs(clipped.reduce((sum, point, i) => {
      const next = clipped[(i + 1) % clipped.length];
      return sum + point[0]*next[1] - point[1]*next[0];
    }, 0)) / 2;
  };
  const outer = [0,0,8,6], inner = [1,0.5,2,1];
  assert.equal(clippedArea(outer, [1,0.5]) - clippedArea(inner, [1,0.5]), 23);
  assert.equal(clippedArea(outer, [1,0]) - clippedArea([0,0,2,1], [1,0]), 23);
});

test('022 reciprocal-rate distances select the positive root of the two-hour ratio', () => {
  const roots = [(-1 + Math.sqrt(5))/2, (-1 - Math.sqrt(5))/2];
  assert.equal(roots.filter((root) => root > 0).length, 1);
  assert.ok(roots[1] < 0, 'elapsed snowfall time cannot use the negative root');
  const x = roots[0], k = 2.5;
  const distance = (from, to) => {
    const steps = 20_000, width = (to - from) / steps;
    let total = 0;
    for (let i = 0; i < steps; i += 1) total += k / (from + (i + 0.5)*width);
    return total*width;
  };
  const firstHour = distance(x, x + 1), secondHour = distance(x + 1, x + 2);
  assert.ok(Math.abs(firstHour - k*Math.log((x + 1)/x)) < 1e-8);
  assert.ok(Math.abs(secondHour - k*Math.log((x + 2)/(x + 1))) < 1e-8);
  assert.ok(Math.abs(firstHour - 2*secondHour) < 1e-8);
  assert.ok(Math.abs(x*x + x - 1) < 1e-12);
});

test('022 carried weight and submerged volume lower the equilibrium water level', () => {
  const anchorMass = 6, waterDensity = 1, anchorDensity = 3, poolArea = 2;
  const carriedDisplacement = anchorMass / waterDensity;
  const submergedDisplacement = anchorMass / anchorDensity;
  assert.equal(carriedDisplacement, 6);
  assert.equal(submergedDisplacement, 2);
  assert.equal(submergedDisplacement - carriedDisplacement, -4);
  assert.equal((submergedDisplacement - carriedDisplacement) / poolArea, -2);
});
