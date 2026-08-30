import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const paths = {
  factorial: 'src/content/problems/logic/factorial-trailing-zeros-in-arbitrary-base.md',
  race: 'src/content/problems/logic/top-three-from-batched-races.md',
};
const factorialMetadata = {
  problemId: 'logic-modular-arithmetic-002', title: 'Factorial Trailing Zeros in an Arbitrary Base',
  description: 'Count trailing zeros of a factorial in any base by prime-factor valuations, then specialize to decimal and base twelve.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Number Theory', 'Factorials'], tags: ['Modular Arithmetic', 'Valuations', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'modular-arithmetic'],
  concepts: ['modular-arithmetic', 'counting-permutations-combinations'], techniques: [], prerequisites: [],
  relatedProblems: ['missing-digit-power-of-two'], family: 'factorial-valuations',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
const raceMetadata = {
  problemId: 'logic-logical-deduction-004', title: 'Top Three from Batched Races',
  description: 'Find the three fastest of twenty-five distinct constant-speed racers with five lanes, no timing, and the minimum number of races.',
  date: '2026-08-30', domain: 'Computer Science', category: 'Algorithms',
  subcategories: ['Selection', 'Partial Orders'], tags: ['Logical Deduction', 'Selection', 'Lower Bounds', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction', 'algorithms-data-structures-cpp', 'algorithmic-complexity'],
  concepts: ['decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes', 'twelve-object-balance-scale-diagnosis'], family: 'batched-selection',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 15,
  status: 'solved', featured: false,
};
const groupOrders = [
  ['A1', 'A2', 'A3', 'A4', 'A5'],
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['C1', 'C2', 'C3', 'C4', 'C5'],
  ['D1', 'D2', 'D3', 'D4', 'D5'],
  ['E1', 'E2', 'E3', 'E4', 'E5'],
];
const winnersOrder = ['A1', 'B1', 'C1', 'D1', 'E1'];
const expectedCandidates = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1'];
const expectedFinalists = ['A2', 'A3', 'B1', 'B2', 'C1'];

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

function valuationFactorial(n, p) {
  let total = 0;
  for (let power = p; power <= n; power *= p) total += Math.floor(n / power);
  return total;
}

function factorize(base) {
  const factors = [];
  let value = base;
  for (let p = 2; p * p <= value; p += 1) {
    if (value % p !== 0) continue;
    let exponent = 0;
    while (value % p === 0) {
      value /= p;
      exponent += 1;
    }
    factors.push([p, exponent]);
  }
  if (value > 1) factors.push([value, 1]);
  return factors;
}

function trailingZerosFromFactors(n, factors) {
  return Math.min(...factors.map(([p, exponent]) => Math.floor(valuationFactorial(n, p) / exponent)));
}

const trailingZeros = (n, base) => trailingZerosFromFactors(n, factorize(base));

function parsePublishedFactorization(body, base) {
  const expression = body.match(new RegExp(`use \\$${base}=([^$]+)\\$`, 'i'))?.[1] ?? '';
  assert.notEqual(expression, '', `missing published factorization for base ${base}`);
  return expression.split('\\cdot').map((factor) => {
    const match = factor.match(/^(\d+)(?:\^(\d+))?$/);
    assert.ok(match, `invalid published factor ${factor}`);
    return [Number(match[1]), Number(match[2] ?? 1)];
  });
}

function verifyPublishedFactorialArithmetic(body) {
  assert.deepEqual(parsePublishedFactorization(body, 10), factorize(10));
  assert.deepEqual(parsePublishedFactorization(body, 12), factorize(12));
  assert.match(body, /v_2\(100!\)\s*=\s*50\+25\+12\+6\+3\+1\s*=\s*97/);
  assert.match(body, /v_5\(100!\)\s*=\s*20\+4\s*=\s*24/);
  assert.match(body, /v_3\(100!\)\s*=\s*33\+11\+3\+1\s*=\s*48/);
  assert.match(body, /z_\{10\}\(100!\).*\\min\(97,24\)=24/);
  assert.match(body, /z_\{12\}\(100!\).*\\frac\{97\}\{2\}.*=\\min\(48,48\)=48/);
}

function bigIntTrailingZeros(n, base) {
  let factorial = 1n;
  for (let value = 2n; value <= BigInt(n); value += 1n) factorial *= value;
  const divisor = BigInt(base);
  let count = 0;
  while (factorial % divisor === 0n) {
    factorial /= divisor;
    count += 1;
  }
  return count;
}

const chainEdges = (order) => order.slice(0, -1).map((racer, index) => [racer, order[index + 1]]);
const firstSixEdges = () => [...groupOrders, winnersOrder].flatMap(chainEdges);

function transitivePredecessors(nodes, edges) {
  const predecessors = new Map(nodes.map((node) => [node, new Set()]));
  for (const [faster, slower] of edges) predecessors.get(slower).add(faster);
  for (let pass = 0; pass < nodes.length; pass += 1) {
    for (const node of nodes) {
      for (const predecessor of [...predecessors.get(node)]) {
        for (const transitive of predecessors.get(predecessor)) predecessors.get(node).add(transitive);
      }
    }
  }
  return predecessors;
}

function candidatesFromEdges(nodes, edges) {
  const predecessors = transitivePredecessors(nodes, edges);
  return nodes.filter((node) => predecessors.get(node).size < 3);
}

function hasLinearExtension(nodes, edges) {
  const incoming = new Map(nodes.map((node) => [node, 0]));
  const outgoing = new Map(nodes.map((node) => [node, []]));
  for (const [faster, slower] of edges) {
    outgoing.get(faster).push(slower);
    incoming.set(slower, incoming.get(slower) + 1);
  }
  const ready = nodes.filter((node) => incoming.get(node) === 0);
  let visited = 0;
  while (ready.length) {
    const node = ready.pop();
    visited += 1;
    for (const slower of outgoing.get(node)) {
      incoming.set(slower, incoming.get(slower) - 1);
      if (incoming.get(slower) === 0) ready.push(slower);
    }
  }
  return visited === nodes.length;
}

function parseRaceOrders(body) {
  return [...body.matchAll(/^\|\s*([1-6])\s*\|\s*`([A-E]\d(?: > [A-E]\d){4})`\s*\|$/gm)]
    .map(([, race, order]) => [Number(race), order.split(' > ')]);
}

function parseCandidateRows(body) {
  return new Map(
    [...body.matchAll(/^\|\s*`([A-E]\d)`\s*\|\s*`([^`]*)`\s*\|\s*(Keep|Eliminate|Certified first)\s*\|$/gm)]
      .map(([, racer, faster, verdict]) => [racer, {
        faster: faster === 'none' ? [] : faster.split(', '), verdict,
      }]),
  );
}

test('both Problems have exact metadata and disclosure structure', async () => {
  const factorial = await page(paths.factorial);
  const race = await page(paths.race);
  assert.deepEqual(factorial.metadata, factorialMetadata);
  assert.deepEqual(race.metadata, raceMetadata);
  for (const { text } of [factorial, race]) {
    assert.match(text, /^## Problem$/m);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
    solution(text);
  }
});

test('factorial page derives the valuation formulas and publishes both exact answers', async () => {
  const { text } = await page(paths.factorial);
  const body = solution(text);
  assert.match(body, /v_p\(n!\)\s*=\s*\\sum_\{k\\geq 1\}\s*\\left\\lfloor\\frac\{n\}\{p\^k\}\\right\\rfloor/);
  assert.match(body, /\\min_\{p\^e\\parallel b\}\s*\\left\\lfloor\\frac\{v_p\(n!\)\}\{e\}\\right\\rfloor/);
  assert.match(body, /v_2\(100!\)\s*=.*=\s*97/);
  assert.match(body, /v_3\(100!\)\s*=.*=\s*48/);
  assert.match(body, /100!.*base 10.*24.*base 12.*48/is);
  verifyPublishedFactorialArithmetic(body);

  const exponentMutant = body.replace('12=2^2\\cdot3', '12=2^3\\cdot3');
  assert.notEqual(exponentMutant, body);
  assert.throws(() => verifyPublishedFactorialArithmetic(exponentMutant));
});

test('independent valuations agree with exact and exhaustive BigInt cases and reject an exponent mutation', () => {
  assert.equal(trailingZeros(100, 10), 24);
  assert.equal(trailingZeros(100, 12), 48);
  for (let n = 2; n <= 25; n += 1) {
    for (let base = 2; base <= 16; base += 1) {
      assert.equal(trailingZeros(n, base), bigIntTrailingZeros(n, base), `n=${n}, base=${base}`);
    }
  }
  const exponentMutant = structuredClone(factorize(12));
  exponentMutant[0][1] = 3;
  assert.throws(() => assert.equal(trailingZerosFromFactors(100, exponentMutant), 48));
});

test('first-six race orders induce the exact candidates and elimination certificates', async () => {
  const { text } = await page(paths.race);
  const body = solution(text);
  const nodes = groupOrders.flat();
  const orders = parseRaceOrders(body);
  assert.deepEqual(orders, [...groupOrders, winnersOrder].map((order, index) => [index + 1, order]));
  const edges = orders.flatMap(([, order]) => chainEdges(order));
  const predecessors = transitivePredecessors(nodes, edges);
  assert.deepEqual(candidatesFromEdges(nodes, edges), expectedCandidates);
  for (const node of nodes.filter((racer) => !expectedCandidates.includes(racer))) {
    assert.ok(predecessors.get(node).size >= 3, `${node} lacks three known predecessors`);
  }
  assert.equal(predecessors.get('A1').size, 0);

  const rows = parseCandidateRows(body);
  assert.equal(rows.size, 25);
  for (const node of nodes) {
    assert.deepEqual(rows.get(node)?.faster, [...predecessors.get(node)].sort());
    const expectedVerdict = node === 'A1' ? 'Certified first'
      : expectedCandidates.includes(node) ? 'Keep' : 'Eliminate';
    assert.equal(rows.get(node)?.verdict, expectedVerdict);
  }
  assert.match(body, /Candidate set:\s*`A1, A2, A3, B1, B2, C1`/);
  const finalRace = body.match(/Final race:\s*`([^`]+)`/)?.[1] ?? '';
  assert.deepEqual(finalRace.split(' > '), expectedFinalists);
  assert.match(body, /seven races|7 races/i);

  const edgeMutant = structuredClone(edges);
  const winnerEdge = edgeMutant.findIndex(([faster, slower]) => faster === 'A1' && slower === 'B1');
  assert.notEqual(winnerEdge, -1);
  edgeMutant.splice(winnerEdge, 1);
  assert.throws(() => assert.deepEqual(candidatesFromEdges(nodes, edgeMutant), expectedCandidates));
});

test('an unbeaten-first adversary proves that no six-race strategy can certify the top three', async () => {
  const { text } = await page(paths.race);
  const body = solution(text);
  assert.match(body, /adversary.*unbeaten.*ahead of.*already.*loss/is);
  assert.match(body, /at most four.*first losses|first losses.*at most four/is);
  assert.match(body, /24 first losses/);
  assert.match(body, /all five.*unbeaten.*each.*six races|each.*six races.*all five.*unbeaten/is);
  assert.match(body, /after five races.*exactly five.*unbeaten.*race 6.*all five/is);
  assert.match(body, /runner-up.*earlier race.*runner-up.*race 6.*incomparable/is);
});

test('two candidate orders admit compatible total extensions but give different podiums', async () => {
  const { text } = await page(paths.race);
  const body = solution(text);
  const nodes = groupOrders.flat();
  const edges = firstSixEdges();
  const orderA = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1'];
  const orderB = ['A1', 'B1', 'B2', 'C1', 'A2', 'A3'];
  assert.equal(hasLinearExtension(nodes, [...edges, ...chainEdges(orderA)]), true);
  assert.equal(hasLinearExtension(nodes, [...edges, ...chainEdges(orderB)]), true);
  assert.deepEqual(orderA.slice(0, 3), ['A1', 'A2', 'A3']);
  assert.deepEqual(orderB.slice(0, 3), ['A1', 'B1', 'B2']);
  assert.match(body, /Order A:\s*`A1 > A2 > A3 > B1 > B2 > C1`/);
  assert.match(body, /Order B:\s*`A1 > B1 > B2 > C1 > A2 > A3`/);
});
