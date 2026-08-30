import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const topics = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];
const paths = {
  voting: 'src/content/problems/logic/sequential-voting-elimination-backward-induction.md',
  parity: 'src/content/problems/logic/predator-replacement-parity.md',
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  assert.match(body, /^## Solution$/m);
  for (const heading of ['Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.match(body, new RegExp(`^## ${heading}$`, 'm'));
  }
  return body;
}

const votingMetadata = {
  problemId: 'logic-problem-simplification-001',
  title: 'Sequential Voting Under Elimination',
  description: 'Solve a ranked allocation vote by reducing it to smaller surviving groups and working backward through every proposal state.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Game Theory', 'Backward Induction'],
  tags: ['Brainteasers', 'Backward Induction', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification', 'recursion-problem-solving'],
  techniques: ['recursion-problem-solving'], prerequisites: [],
  relatedProblems: ['predator-replacement-parity'], family: 'sequential-elimination',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 15, status: 'solved', featured: false,
};
const parityMetadata = {
  problemId: 'logic-problem-simplification-002',
  title: 'Predator Replacement Parity',
  description: 'Reduce a rational predator replacement process to small cases and prove the resulting odd-even survival rule by induction.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Induction', 'Parity'],
  tags: ['Brainteasers', 'Induction', 'Parity', 'Interview'],
  quantInterviewTopics: topics,
  concepts: ['small-cases-recurrence-and-structural-simplification'],
  techniques: [], prerequisites: [],
  relatedProblems: ['sequential-voting-elimination-backward-induction'], family: 'replacement-parity',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 12, status: 'solved', featured: false,
};

test('sequential voting derives all five states and the final allocation', async () => {
  const { text, metadata } = await page(paths.voting);
  assert.deepEqual(metadata, votingMetadata);
  for (const heading of ['Problem', 'Think Before Revealing']) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  const body = solution(text);
  for (const n of [1, 2, 3, 4, 5]) assert.match(body, new RegExp(`(?:${n} agents?|n\\s*=\\s*${n})`, 'i'));
  assert.match(body, /98.*0.*1.*0.*1|senior.*98/i);
  assert.match(body, /at least half|50%/i);
  assert.match(body, /proposer.*votes?/i);
  assert.match(body, /survival.*units?.*fewer|lexicographic/i);
  assert.match(body, /different.*(?:threshold|tie|preference).*change/i);
});

test('predator replacement proves the parity theorem under explicit preferences', async () => {
  const { text, metadata } = await page(paths.parity);
  assert.deepEqual(metadata, parityMetadata);
  assert.match(text, /only one predator.*(?:act|consume)/i);
  assert.match(text, /survival.*first/i);
  assert.match(text, /equal survival.*(?:consume|eating).*prefer/i);
  const body = solution(text);
  for (const n of [1, 2, 3, 4]) assert.match(body, new RegExp(`(?:${n} predators?|n\\s*=\\s*${n})`, 'i'));
  assert.match(body, /odd.*consum|consum.*odd/i);
  assert.match(body, /even.*not.*consum|not.*consum.*even/i);
  assert.match(body, /induction/i);
  assert.match(body, /n\s*=\s*100|100 predators/i);
});

test('small-case Problems are source-neutral and structurally complete', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    solution(text);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|Screwy pirates|Tiger and sheep|PDF page|source item/i);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  }
});
