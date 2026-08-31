import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const paths = {
  guards: 'src/content/problems/logic/two-guards-one-question.md',
  padlocks: 'src/content/problems/logic/message-delivery-with-independent-padlocks.md',
};

const guardMetadata = {
  problemId: 'logic-logical-deduction-007', title: 'Two Guards, Two Doors, One Question',
  description: 'Design one yes-or-no question that identifies the desirable door when one guard always lies and the other always tells the truth.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Boolean Logic', 'Case Analysis'], tags: ['Logical Deduction', 'Truth Tables', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'logical-deduction-constraint-propagation-and-case-elimination'], techniques: [], prerequisites: [],
  relatedProblems: ['two-cube-calendar-digit-labeling', 'message-delivery-with-independent-padlocks'], family: 'truth-liar-questions',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};

const padlockMetadata = {
  problemId: 'logic-logical-deduction-008', title: 'Message Delivery with Independent Padlocks',
  description: 'Deliver a document through an untrusted courier using two independent padlocks without ever sending the box unlocked.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Protocol Design', 'State Transitions'], tags: ['Logical Deduction', 'Protocols', 'Brainteasers', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state'], techniques: [], prerequisites: [],
  relatedProblems: ['two-guards-one-question', 'private-average-with-canceling-mask'], family: 'independent-lock-protocol',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 10, status: 'solved', featured: false,
};

const guardRows = [
  { chosenGuardTruthful: false, chosenDoorGood: false, otherWouldSayYes: false, chosenAnswerYes: true, chooseChosenDoor: false },
  { chosenGuardTruthful: false, chosenDoorGood: true, otherWouldSayYes: true, chosenAnswerYes: false, chooseChosenDoor: true },
  { chosenGuardTruthful: true, chosenDoorGood: false, otherWouldSayYes: true, chosenAnswerYes: true, chooseChosenDoor: false },
  { chosenGuardTruthful: true, chosenDoorGood: true, otherWouldSayYes: false, chosenAnswerYes: false, chooseChosenDoor: true },
];

const transits = [
  { from: 'sender', to: 'recipient', locks: ['sender'] },
  { from: 'recipient', to: 'sender', locks: ['sender', 'recipient'] },
  { from: 'sender', to: 'recipient', locks: ['recipient'] },
];

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

function parseGuardRows(text) {
  return [...text.matchAll(/^\|\s*(Liar|Truthful)\s*\|\s*(Bad|Good)\s*\|\s*(Yes|No)\s*\|\s*(Yes|No)\s*\|\s*(Yes|No)\s*\|$/gm)]
    .map(([, guard, door, other, answer, choice]) => ({
      chosenGuardTruthful: guard === 'Truthful',
      chosenDoorGood: door === 'Good',
      otherWouldSayYes: other === 'Yes',
      chosenAnswerYes: answer === 'Yes',
      chooseChosenDoor: choice === 'Yes',
    }));
}

function validateGuardRows(rows) {
  assert.equal(rows.length, 4);
  assert.equal(new Set(rows.map((row) => `${row.chosenGuardTruthful}:${row.chosenDoorGood}`)).size, 4);
  for (const row of rows) {
    const { chosenGuardTruthful, chosenDoorGood, otherWouldSayYes, chosenAnswerYes, chooseChosenDoor } = row;
    const expectedOtherWouldSayYes = chosenGuardTruthful ? !chosenDoorGood : chosenDoorGood;
    const expectedChosenAnswerYes = chosenGuardTruthful ? otherWouldSayYes : !otherWouldSayYes;
    assert.equal(otherWouldSayYes, expectedOtherWouldSayYes);
    assert.equal(chosenAnswerYes, expectedChosenAnswerYes);
    assert.equal(chooseChosenDoor, !chosenAnswerYes);
    assert.equal(chooseChosenDoor, chosenDoorGood);
  }
  assert.deepEqual(rows, guardRows);
}

function parseTransits(text) {
  return [...text.matchAll(/^\|\s*[123]\s*\|\s*(sender|recipient)\s*\|\s*(sender|recipient)\s*\|\s*`([^`]+)`\s*\|$/gm)]
    .map(([, from, to, locks]) => ({ from, to, locks: locks.split(', ').filter(Boolean) }));
}

function validateTransits(actualTransits) {
  assert.equal(actualTransits.length, 3);
  for (const transit of actualTransits) assert.ok(transit.locks.length >= 1);
  assert.deepEqual(actualTransits.at(-1).locks, ['recipient']);
  assert.deepEqual(actualTransits, transits);
}

test('guard and independent-padlock Problems have exact metadata and disclosure structure', async () => {
  const guards = await page(paths.guards);
  const padlocks = await page(paths.padlocks);
  assert.deepEqual(guards.metadata, guardMetadata);
  assert.deepEqual(padlocks.metadata, padlockMetadata);
  for (const { text } of [guards, padlocks]) {
    assert.match(text, /^## Problem$/m);
    assert.match(text, /^## Think Before Revealing$/m);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
    solution(text);
  }
});

test('guard response rule identifies the desirable door in every truthful-liar state', async () => {
  const { text } = await page(paths.guards);
  const problem = section(text, 'Problem');
  assert.match(problem, /“If I asked the other guard whether the door you are standing by is the desirable door, would the other guard say yes\?”/);
  assert.match(problem, /If the answer is yes, choose the other door; if the answer is no, choose the door guarded by the person you asked\./);
  assert.match(problem, /Each guard's behavior is deterministic: one always lies and one always tells the truth\./);
  assert.match(problem, /The two doors, the guards' behavior rules, and the fact that exactly one door is desirable are common knowledge\./);

  const rows = parseGuardRows(solution(text));
  validateGuardRows(rows);

  const mutantText = text.replace('| Truthful | Bad | Yes | Yes | No |', '| Truthful | Bad | Yes | No | No |');
  assert.notEqual(mutantText, text);
  assert.throws(() => validateGuardRows(parseGuardRows(mutantText)));
});

test('padlock protocol keeps every courier transit locked and leaves the recipient lock last', async () => {
  const { text } = await page(paths.padlocks);
  const problem = section(text, 'Problem');
  assert.match(problem, /The box accepts both the sender's and recipient's padlocks\./);
  assert.match(problem, /does not provide authentication, tamper evidence, or general cryptographic security/i);

  const publishedTransits = parseTransits(solution(text));
  validateTransits(publishedTransits);

  const mutantText = text.replace('| 2 | recipient | sender | `sender, recipient` |', '| 2 | recipient | sender | `sender` |');
  assert.notEqual(mutantText, text);
  assert.throws(() => validateTransits(parseTransits(mutantText)));
});
