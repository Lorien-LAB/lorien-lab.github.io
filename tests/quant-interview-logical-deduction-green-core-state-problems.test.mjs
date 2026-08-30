import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const paths = {
  bridge: 'src/content/problems/logic/bridge-crossing-minimum-time.md',
  announcement: 'src/content/problems/logic/public-announcement-candidate-elimination.md',
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

const bridgeMetadata = {
  problemId: 'logic-logical-deduction-001', title: 'Minimum-Time Bridge Crossing',
  description: 'Find and prove the minimum time for four travelers to cross a capacity-two bridge with one shared torch and unequal crossing times.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Optimization', 'State Search'], tags: ['Logical Deduction', 'Optimization', 'Interview'],
  quantInterviewTopics: topics, concepts: [constraint], techniques: [], prerequisites: [],
  relatedProblems: ['public-announcement-candidate-elimination'], family: 'bridge-crossing',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
const announcementMetadata = {
  problemId: 'logic-logical-deduction-002', title: 'Public-Announcement Candidate Elimination',
  description: 'Update a finite candidate set after successive truthful public statements about private information until one state remains.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Epistemic Logic', 'Case Elimination'], tags: ['Logical Deduction', 'Public Information', 'Interview'],
  quantInterviewTopics: topics, concepts: [constraint], techniques: [], prerequisites: [],
  relatedProblems: ['bridge-crossing-minimum-time'], family: 'public-announcement-elimination',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};

const times = [1, 3, 6, 11];
function shortestBridgeTime() {
  const start = '0:0';
  const goal = '15:1';
  const dist = new Map([[start, 0]]);
  const queue = [[0, 0, false]];
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [cost, mask, torchFar] = queue.shift();
    const key = `${mask}:${Number(torchFar)}`;
    if (cost !== dist.get(key)) continue;
    if (key === goal) return cost;
    const available = times.map((_, i) => i).filter((i) => Boolean(mask & (1 << i)) === torchFar);
    const groups = available.flatMap((i, p) => [[i], ...available.slice(p + 1).map((j) => [i, j])]);
    for (const group of groups) {
      const moved = group.reduce((value, i) => value | (1 << i), 0);
      const nextMask = torchFar ? mask & ~moved : mask | moved;
      const nextCost = cost + Math.max(...group.map((i) => times[i]));
      const nextKey = `${nextMask}:${Number(!torchFar)}`;
      if (nextCost < (dist.get(nextKey) ?? Infinity)) {
        dist.set(nextKey, nextCost);
        queue.push([nextCost, nextMask, !torchFar]);
      }
    }
  }
  throw new Error('goal unreachable');
}

function bridgeSchedule(body) {
  return [...body.matchAll(/^\|\s*(\d+)\s*\|\s*`(->|<-)`\s*\|\s*`([A-D](?:,\s*[A-D])?)`\s*\|\s*(\d+)\s*\|/gm)]
    .map(([, step, direction, travelers, cost]) => ({
      step: Number(step), direction, travelers: travelers.split(/,\s*/), cost: Number(cost),
    }));
}

function simulateBridge(moves) {
  const index = { A: 0, B: 1, C: 2, D: 3 };
  const far = new Set();
  let torchFar = false;
  let total = 0;
  moves.forEach((move, position) => {
    assert.equal(move.step, position + 1);
    assert.equal(move.direction, torchFar ? '<-' : '->', `step ${move.step} moves against the torch`);
    assert.ok(move.travelers.length === 1 || move.travelers.length === 2, `step ${move.step} violates capacity`);
    assert.equal(new Set(move.travelers).size, move.travelers.length, `step ${move.step} repeats a traveler`);
    move.travelers.forEach((traveler) => {
      assert.equal(far.has(traveler), torchFar, `step ${move.step}: ${traveler} is not on the torch side`);
    });
    const expectedCost = Math.max(...move.travelers.map((traveler) => times[index[traveler]]));
    assert.equal(move.cost, expectedCost, `step ${move.step} has the wrong cost`);
    move.travelers.forEach((traveler) => (torchFar ? far.delete(traveler) : far.add(traveler)));
    torchFar = !torchFar;
    total += move.cost;
  });
  assert.deepEqual([...far].sort(), ['A', 'B', 'C', 'D']);
  assert.equal(torchFar, true);
  return total;
}

const initial = [['A', 3], ['A', 6], ['A', 9], ['B', 3], ['B', 8], ['C', 2], ['C', 6], ['D', 2], ['D', 5], ['D', 9]];
const by = (states, index, value) => states.filter((state) => state[index] === value);
const lettersWhoseHolderKnowsNumberHolderDoesNotKnow = (states) => new Set(
  [...new Set(states.map(([letter]) => letter))].filter((letter) =>
    by(states, 0, letter).every(([, number]) => by(states, 1, number).length > 1)),
);
const after1 = initial.filter(([letter]) => by(initial, 0, letter).length > 1 && lettersWhoseHolderKnowsNumberHolderDoesNotKnow(initial).has(letter));
const after2 = after1.filter(([, number]) => by(after1, 1, number).length === 1);
const after3 = after2.filter(([letter]) => by(after2, 0, letter).length === 1);

function candidateSets(body) {
  return new Map([...body.matchAll(/^\|\s*`(S[0-3])`\s*\|\s*`\{([^`]*)\}`\s*\|$/gm)].map(([, label, list]) => [
    label,
    [...list.matchAll(/\(([A-D]),\s*(\d+)\)/g)].map(([, letter, number]) => [letter, Number(number)]),
  ]));
}

test('both state Problems have exact metadata and disclosure structure', async () => {
  const bridge = await page(paths.bridge);
  const announcement = await page(paths.announcement);
  assert.deepEqual(bridge.metadata, bridgeMetadata);
  assert.deepEqual(announcement.metadata, announcementMetadata);
  for (const { text } of [bridge, announcement]) {
    assert.match(text, /^## Problem$/m);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
    solution(text);
  }
});

test('bridge schedule is legal, totals the independently verified optimum, and proves both cases', async () => {
  assert.equal(shortestBridgeTime(), 21);
  const { text } = await page(paths.bridge);
  const body = solution(text);
  const moves = bridgeSchedule(body);
  assert.equal(moves.length, 5);
  assert.equal(simulateBridge(moves), 21);
  assert.match(body, /a \+ 3b \+ d = 1 \+ 9 \+ 11 = 21/);
  assert.match(body, /2a \+ b \+ c \+ d = 2 \+ 3 \+ 6 \+ 11 = 22/);

  const mutant = moves.map((move) => ({ ...move, travelers: [...move.travelers] }));
  mutant[1].travelers = ['C'];
  assert.throws(() => simulateBridge(mutant), /not on the torch side/);
});

test('announcement filters reproduce every printed survivor set and uniquely prove C2', async () => {
  assert.deepEqual(after1, [['A', 3], ['A', 6], ['A', 9], ['C', 2], ['C', 6]]);
  assert.deepEqual(after2, [['A', 3], ['A', 9], ['C', 2]]);
  assert.deepEqual(after3, [['C', 2]]);

  const { text } = await page(paths.announcement);
  const body = solution(text);
  const printed = candidateSets(body);
  const expected = new Map([['S0', initial], ['S1', after1], ['S2', after2], ['S3', after3]]);
  assert.deepEqual(printed, expected);
  assert.match(text, /rational(?:ity)?/i);
  assert.match(text, /truthful/i);
  assert.match(text, /common knowledge/i);
  assert.match(body, /unique.*\(C,\s*2\)|\(C,\s*2\).*unique/is);

  const mutant = structuredClone(expected);
  mutant.get('S1')[0] = ['B', 3];
  assert.throws(() => assert.deepEqual(mutant, expected));
});
