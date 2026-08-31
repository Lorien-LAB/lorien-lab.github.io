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

function section(text, heading) {
  const body = text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
  assert.notEqual(body, '', `missing ${heading} section`);
  return body;
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

const numberWords = { one: 1, two: 2 };
const parseCount = (value) => numberWords[value] ?? Number(value);

function bridgeProblemModel(body) {
  const speeds = body.match(
    /Four travelers ([A-Z]), ([A-Z]), ([A-Z]), and ([A-Z]) need (\d+), (\d+), (\d+), and (\d+) minutes, respectively/,
  );
  const torch = body.match(/group has (one|\d+) torch/i);
  const capacity = body.match(/at most (one|two|\d+) travelers may be on the bridge at once/i);
  const starts = body.match(/Everyone starts on the (near|far) side/i);
  const goal = body.match(/put all four travelers and the torch on the (near|far) side/i);
  assert.ok(speeds, 'bridge prompt missing traveler times');
  assert.ok(torch, 'bridge prompt missing torch count');
  assert.ok(capacity, 'bridge prompt missing capacity');
  assert.ok(starts, 'bridge prompt missing start side');
  assert.ok(goal, 'bridge prompt missing goal side');
  return {
    travelers: speeds.slice(1, 5),
    times: speeds.slice(5, 9).map(Number),
    torchCount: parseCount(torch[1].toLowerCase()),
    capacity: parseCount(capacity[1].toLowerCase()),
    pairCost: /pair crosses at the slower traveler's time/i.test(body) ? 'slower' : undefined,
    startsSide: starts[1].toLowerCase(),
    goalSide: goal[1].toLowerCase(),
  };
}

function shortestBridgeTime({ times, capacity, startsSide, goalSide }) {
  const fullMask = (1 << times.length) - 1;
  const startMask = startsSide === 'far' ? fullMask : 0;
  const goalMask = goalSide === 'far' ? fullMask : 0;
  const startTorchFar = startsSide === 'far';
  const goalTorchFar = goalSide === 'far';
  const start = `${startMask}:${Number(startTorchFar)}`;
  const goal = `${goalMask}:${Number(goalTorchFar)}`;
  const dist = new Map([[start, 0]]);
  const queue = [[0, startMask, startTorchFar]];
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [cost, mask, torchFar] = queue.shift();
    const key = `${mask}:${Number(torchFar)}`;
    if (cost !== dist.get(key)) continue;
    if (key === goal) return cost;
    const available = times.map((_, i) => i).filter((i) => Boolean(mask & (1 << i)) === torchFar);
    const groups = available
      .flatMap((i, p) => [[i], ...available.slice(p + 1).map((j) => [i, j])])
      .filter((group) => group.length <= capacity);
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

function simulateBridge(moves, model) {
  const index = Object.fromEntries(model.travelers.map((traveler, position) => [traveler, position]));
  const far = new Set(model.startsSide === 'far' ? model.travelers : []);
  let torchFar = model.startsSide === 'far';
  let total = 0;
  moves.forEach((move, position) => {
    assert.equal(move.step, position + 1);
    assert.equal(move.direction, torchFar ? '<-' : '->', `step ${move.step} moves against the torch`);
    assert.ok(move.travelers.length >= 1 && move.travelers.length <= model.capacity, `step ${move.step} violates capacity`);
    assert.equal(new Set(move.travelers).size, move.travelers.length, `step ${move.step} repeats a traveler`);
    move.travelers.forEach((traveler) => {
      assert.equal(far.has(traveler), torchFar, `step ${move.step}: ${traveler} is not on the torch side`);
    });
    const expectedCost = Math.max(...move.travelers.map((traveler) => model.times[index[traveler]]));
    assert.equal(move.cost, expectedCost, `step ${move.step} has the wrong cost`);
    move.travelers.forEach((traveler) => (torchFar ? far.delete(traveler) : far.add(traveler)));
    torchFar = !torchFar;
    total += move.cost;
  });
  assert.deepEqual([...far].sort(), model.goalSide === 'far' ? [...model.travelers].sort() : []);
  assert.equal(torchFar, model.goalSide === 'far');
  return total;
}

const initial = [['A', 3], ['A', 6], ['A', 9], ['B', 3], ['B', 8], ['C', 2], ['C', 6], ['D', 2], ['D', 5], ['D', 9]];
const by = (states, index, value) => states.filter((state) => state[index] === value);
const lettersWhoseHolderKnowsNumberHolderDoesNotKnow = (states) => new Set(
  [...new Set(states.map(([letter]) => letter))].filter((letter) =>
    by(states, 0, letter).every(([, number]) => by(states, 1, number).length > 1)),
);
function announcementStages(states) {
  const knowledgeableLetters = lettersWhoseHolderKnowsNumberHolderDoesNotKnow(states);
  const after1 = states.filter(([letter]) => by(states, 0, letter).length > 1 && knowledgeableLetters.has(letter));
  const after2 = after1.filter(([, number]) => by(after1, 1, number).length === 1);
  const after3 = after2.filter(([letter]) => by(after2, 0, letter).length === 1);
  return new Map([['S0', states], ['S1', after1], ['S2', after2], ['S3', after3]]);
}

function parseCandidates(list) {
  return [...list.matchAll(/\(([A-D]),\s*(\d+)\)/g)].map(([, letter, number]) => [letter, Number(number)]);
}

function candidateBoard(body) {
  const match = body.match(/`\{([^`]*)\}`/);
  assert.ok(match, 'announcement prompt missing candidate board');
  return parseCandidates(match[1]);
}

function candidateSets(body) {
  return new Map([...body.matchAll(/^\|\s*`(S[0-3])`\s*\|\s*`\{([^`]*)\}`\s*\|$/gm)].map(([, label, list]) => [
    label,
    parseCandidates(list),
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
  const { text } = await page(paths.bridge);
  const problem = section(text, 'Problem');
  const model = bridgeProblemModel(problem);
  const expectedModel = {
    travelers: ['A', 'B', 'C', 'D'], times: [1, 3, 6, 11], torchCount: 1, capacity: 2,
    pairCost: 'slower', startsSide: 'near', goalSide: 'far',
  };
  assert.deepEqual(model, expectedModel);
  assert.equal(shortestBridgeTime(model), 21);
  const body = solution(text);
  const moves = bridgeSchedule(body);
  assert.equal(moves.length, 5);
  assert.equal(simulateBridge(moves, model), 21);
  assert.match(body, /a \+ 3b \+ d = 1 \+ 9 \+ 11 = 21/);
  assert.match(body, /2a \+ b \+ c \+ d = 2 \+ 3 \+ 6 \+ 11 = 22/);

  const mutant = moves.map((move) => ({ ...move, travelers: [...move.travelers] }));
  mutant[1].travelers = ['C'];
  assert.throws(() => simulateBridge(mutant, model), /not on the torch side/);
  const mutantProblem = problem.replace('1, 3, 6, and 11 minutes', '1, 3, 6, and 12 minutes');
  assert.throws(() => assert.deepEqual(bridgeProblemModel(mutantProblem), expectedModel));
});

test('announcement filters reproduce every printed survivor set and uniquely prove C2', async () => {
  const { text } = await page(paths.announcement);
  const problem = section(text, 'Problem');
  const parsedInitial = candidateBoard(problem);
  assert.deepEqual(parsedInitial, initial);
  assert.deepEqual([...problem.matchAll(/^\d+\. (.+)$/gm)].map(([, statement]) => statement), [
    'Letter Holder: “I do not know the state, and I know that Number Holder does not know it.”',
    'Number Holder: “After hearing that, I now know the state.”',
    'Letter Holder: “After hearing that, I now know the state.”',
  ]);
  assert.match(problem, /Each participant is perfectly rational and truthful\./);
  assert.match(problem, /The candidate list, the rules, their rationality, and every public statement are common knowledge\./);

  const expected = announcementStages(parsedInitial);
  assert.deepEqual(expected.get('S1'), [['A', 3], ['A', 6], ['A', 9], ['C', 2], ['C', 6]]);
  assert.deepEqual(expected.get('S2'), [['A', 3], ['A', 9], ['C', 2]]);
  assert.deepEqual(expected.get('S3'), [['C', 2]]);
  const body = solution(text);
  const printed = candidateSets(body);
  assert.deepEqual(printed, expected);
  assert.match(body, /unique.*\(C,\s*2\)|\(C,\s*2\).*unique/is);

  const mutantInitial = structuredClone(parsedInitial);
  mutantInitial[4] = ['B', 6];
  assert.throws(() => assert.deepEqual(announcementStages(mutantInitial), printed));
});
