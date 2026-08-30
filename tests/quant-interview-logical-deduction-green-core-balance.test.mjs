import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const path = 'src/content/problems/logic/twelve-object-balance-scale-diagnosis.md';
const metadata = {
  problemId: 'logic-logical-deduction-003', title: 'Twelve-Object Balance-Scale Diagnosis',
  description: 'Identify one anomalously heavy-or-light object among twelve using a complete three-weighing adaptive balance-scale decision tree.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Decision Trees', 'Information Bounds'], tags: ['Logical Deduction', 'Balance Scale', 'Adaptive Testing', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['decision-trees-information-bounds-and-adaptive-testing'], techniques: [], prerequisites: [],
  relatedProblems: ['bridge-crossing-minimum-time', 'top-three-from-batched-races'], family: 'ternary-diagnosis',
  mathDifficulty: 2, insightDifficulty: 4, interviewDifficulty: 4, estimatedMinutes: 30,
  status: 'solved', featured: false,
};
const nodes = {
  '': [[1, 2, 3, 4], [5, 6, 7, 8]],
  B: [[9, 10, 11], [1, 2, 3]], BB: [[12], [1]], BL: [[9], [10]], BR: [[9], [10]],
  L: [[1, 2, 5], [3, 6, 9]], LL: [[1], [2]], LR: [[3], [9]], LB: [[7], [8]],
  R: [[1, 2, 5], [3, 6, 9]], RL: [[3], [9]], RR: [[1], [2]], RB: [[7], [8]],
};
const leaves = {
  BLL: '9H', BLR: '10H', BLB: '11H', BRR: '9L', BRL: '10L', BRB: '11L', BBL: '12H', BBR: '12L',
  LLL: '1H', LLR: '2H', LLB: '6L', LRL: '3H', LRB: '5L', LBB: '4H', LBR: '7L', LBL: '8L',
  RLR: '3L', RLB: '5H', RRR: '1L', RRL: '2L', RRB: '6H', RBB: '4L', RBL: '7H', RBR: '8H',
};
const hypotheses = Array.from({ length: 12 }, (_, index) => [`${index + 1}H`, `${index + 1}L`]).flat();

async function page() {
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

function subsection(text, heading) {
  const body = text.split(new RegExp(`^### ${heading}$`, 'm'))[1]?.split(/^#{2,3} /m)[0] ?? '';
  assert.notEqual(body, '', `missing ${heading} subsection`);
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

function parsePan(value) {
  assert.match(value, /^\d+(?:,\s*\d+)*$/, `invalid pan ${value}`);
  return value.split(/,\s*/).map(Number);
}

function parseNodes(text) {
  const body = subsection(text, 'Decision nodes');
  return Object.fromEntries(
    [...body.matchAll(/^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|$/gm)]
      .map(([, prefix, left, right]) => [prefix === 'root' ? '' : prefix, [parsePan(left), parsePan(right)]]),
  );
}

function parseLeaves(text) {
  const body = subsection(text, 'Diagnosis leaves');
  return Object.fromEntries(
    [...body.matchAll(/^\|\s*`([BLR]{3})`\s*\|\s*`(\d{1,2}[HL])`\s*\|$/gm)]
      .map(([, prefix, hypothesis]) => [prefix, hypothesis]),
  );
}

function outcome(left, right, hypothesis) {
  const object = Number(hypothesis.slice(0, -1));
  const delta = hypothesis.endsWith('H') ? 1 : -1;
  const weight = (item) => 1 + (item === object ? delta : 0);
  const difference = left.reduce((sum, item) => sum + weight(item), 0)
    - right.reduce((sum, item) => sum + weight(item), 0);
  return difference > 0 ? 'L' : difference < 0 ? 'R' : 'B';
}

function verifyTree(parsedNodes, parsedLeaves) {
  for (const [prefix, [left, right]] of Object.entries(parsedNodes)) {
    assert.equal(left.length, right.length, `node ${prefix || 'root'} has unequal pan sizes`);
    assert.equal(new Set([...left, ...right]).size, left.length + right.length, `node ${prefix || 'root'} repeats an object`);
    [...left, ...right].forEach((item) => assert.ok(item >= 1 && item <= 12, `node ${prefix || 'root'} has invalid object ${item}`));
  }
  for (const hypothesis of hypotheses) {
    let prefix = '';
    for (let depth = 0; depth < 3; depth += 1) {
      const [left, right] = parsedNodes[prefix] ?? [];
      assert.ok(left && right, `missing node ${prefix}`);
      prefix += outcome(left, right, hypothesis);
    }
    assert.equal(parsedLeaves[prefix], hypothesis, `${hypothesis} resolved incorrectly via ${prefix}`);
  }
  assert.equal(Object.keys(parsedLeaves).length, 24);
  assert.equal(new Set(Object.values(parsedLeaves)).size, 24);
}

test('balance Problem has exact metadata, hypotheses, lower bound, and disclosure structure', async () => {
  const { text, metadata: actualMetadata } = await page();
  assert.deepEqual(actualMetadata, metadata);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const problem = section(text, 'Problem');
  assert.deepEqual([...problem.matchAll(/`(\d{1,2}[HL])`/g)].map(([, hypothesis]) => hypothesis), hypotheses);
  assert.match(solution(text), /`3\^2 < 24 <= 3\^3`/);
  assert.match(text, /capacity alone does not construct legal balanced branches/i);
});

test('decision-node and diagnosis tables parse to the exact complete tree', async () => {
  const { text } = await page();
  assert.deepEqual(parseNodes(text), nodes);
  assert.deepEqual(parseLeaves(text), leaves);
});

test('the parsed tree resolves all 24 hypotheses and rejects node and leaf mutations', async () => {
  const { text } = await page();
  const parsedNodes = parseNodes(text);
  const parsedLeaves = parseLeaves(text);
  verifyTree(parsedNodes, parsedLeaves);

  const nodeMutant = structuredClone(parsedNodes);
  nodeMutant.BL[0] = [11];
  assert.throws(() => verifyTree(nodeMutant, parsedLeaves), /resolved incorrectly/);

  const leafMutant = structuredClone(parsedLeaves);
  leafMutant.BLL = '10H';
  assert.throws(() => verifyTree(parsedNodes, leafMutant), /resolved incorrectly/);
});
