import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const path = 'src/content/problems/logic/private-average-with-canceling-mask.md';

const metadata = {
  problemId: 'logic-logical-deduction-011', title: 'Private Average with a Canceling Mask',
  description: 'Compute a group average through a masked running sum, prove exact cancellation, and state the protocol\'s limited privacy model.',
  date: '2026-08-31', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Protocol Design', 'Algebraic Masking'], tags: ['Logical Deduction', 'Privacy', 'Protocols', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  concepts: ['constraint-reframing-and-latent-state', 'problem-framing-clarification-assumption-management'], techniques: [], prerequisites: [],
  relatedProblems: ['message-delivery-with-independent-padlocks'], family: 'masked-aggregation',
  mathDifficulty: 1, insightDifficulty: 3, interviewDifficulty: 3, estimatedMinutes: 12, status: 'solved', featured: false,
};

async function page() {
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

function problemModel(text) {
  const body = text.match(/^## Problem\r?\n([\s\S]*?)^## Think Before Revealing$/m)?.[1] ?? '';
  assert.ok(body, `${path} missing public problem model`);
  return body;
}

function validateMaskAssumption(problemText) {
  assert.match(problemText, /participant 1 must (?:choose|sample) a fresh random additive mask `r`/i);
  assert.match(problemText, /mask `r`[^.]*independent(?:ly)? of all participant inputs/i);
  assert.match(problemText, /mask `r`[^.]*known only to participant 1/i);
}

function parseSymbolicTranscript(solutionText) {
  return [...solutionText.matchAll(/^\d+\. `([^`]+)`$/gm)].map(([, expression]) => expression);
}

function validateSymbolicTranscript(expressions) {
  assert.deepEqual(expressions, [
    'm_1 = r + s_1',
    'm_2 = r + s_1 + s_2',
    '...',
    'm_8 = r + sum_{i=1}^{8} s_i',
    'm_8 - r = sum_{i=1}^{8} s_i',
    '(m_8 - r) / 8 = (sum_{i=1}^{8} s_i) / 8',
  ]);
}

function validatePrivacyBoundary(solutionText) {
  for (const pattern of [/honest/i, /non-collud/i, /private channel/i, /single participant/i, /aggregate/i, /collusion/i, /side information/i, /dishonest inputs?/i, /authentication/i, /auditing/i, /general secure-aggregation/i]) {
    assert.match(solutionText, pattern);
  }
  assert.match(solutionText, /single participant numbered 2 through 8[^.]*sent-minus-received difference[^.]*only[^.]*own input/i);
  assert.match(solutionText, /participant 1[^.]*sent-minus-received[^.]*negative[^.]*aggregate[^.]*other seven inputs/i);
  assert.match(solutionText, /m_1 - m_8 = -sum_\{i=2\}\^\{8\} s_i/i);
  assert.match(solutionText, /public aggregate[^.]*side information[^.]*reveal/i);
  assert.match(solutionText, /does not address[^.]*collusion[^.]*dishonest inputs?[^.]*authentication[^.]*auditing[^.]*general secure-aggregation/i);
  assert.doesNotMatch(solutionText, /perfect secrecy|cryptographic(?:ally)? secure|general cryptographic security|collusion[- ]resistan\w*|dishonest-input protection|tamper-proof(?:ing)?/i);
  assert.doesNotMatch(solutionText, /\b(?:provides?|guarantees?|achieves?|ensures?)\b[^.]{0,80}\b(?:authentication|auditing)\b/i);
}

test('private-average Problem has exact metadata, disclosure structure, and limited privacy wording', async () => {
  const { text, metadata: actualMetadata } = await page();
  assert.deepEqual(actualMetadata, metadata);
  assert.match(text, /^## Problem$/m);
  assert.match(text, /Arithmetic is exact\./);
  assert.match(text, /^## Think Before Revealing$/m);
  assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
  validatePrivacyBoundary(solution(text));
  assert.doesNotMatch(text, /Green Book|A Practical Guide|PDF page|source item/i);
});

test('public model binds the mask to freshness, randomness, input independence, and participant 1 alone', async () => {
  const { text } = await page();
  const publishedModel = problemModel(text);
  validateMaskAssumption(publishedModel);

  const withoutIndependence = publishedModel.replace(/independent(?:ly)? of all participant inputs/i, 'chosen after seeing the participant inputs');
  assert.notEqual(withoutIndependence, publishedModel);
  assert.throws(() => validateMaskAssumption(withoutIndependence));
});

test('masked running sum cancels the first participant mask and recovers the exact eight-person average', async () => {
  const salaries = [41, 53, 67, 72, 88, 91, 104, 116];
  const mask = 137;
  const messages = [];
  let running = mask;
  for (const salary of salaries) { running += salary; messages.push(running); }
  assert.deepEqual(messages, salaries.map((_, i) => mask + salaries.slice(0, i + 1).reduce((a, b) => a + b, 0)));
  const recoveredTotal = messages.at(-1) - mask;
  assert.equal(recoveredTotal, salaries.reduce((a, b) => a + b, 0));
  assert.equal(recoveredTotal / salaries.length, 79);

  const { text } = await page();
  const publishedSolution = solution(text);
  validateSymbolicTranscript(parseSymbolicTranscript(publishedSolution));

  const missingSubtraction = publishedSolution.replace('m_8 - r = sum_{i=1}^{8} s_i', 'm_8 = sum_{i=1}^{8} s_i');
  assert.notEqual(missingSubtraction, publishedSolution);
  assert.throws(() => validateSymbolicTranscript(parseSymbolicTranscript(missingSubtraction)));
});

test('privacy-boundary check rejects a page that omits the non-collusion assumption', async () => {
  const { text } = await page();
  const publishedSolution = solution(text);
  const withoutNonCollusion = publishedSolution.replace(/non-collud\w*/gi, 'coordinated');
  assert.notEqual(withoutNonCollusion, publishedSolution);
  assert.throws(() => validatePrivacyBoundary(withoutNonCollusion));
});

test('privacy-boundary check rejects a page that omits participant 1’s exception', async () => {
  const { text } = await page();
  const publishedSolution = solution(text);
  const withoutParticipantOneException = publishedSolution.replace(/Participant 1 is different:[^.]*\./, '');
  assert.notEqual(withoutParticipantOneException, publishedSolution);
  assert.throws(() => validatePrivacyBoundary(withoutParticipantOneException));
});

test('participant 1 observes the other-seven aggregate, unlike participants 2 through 8', async () => {
  const salaries = [41, 53, 67, 72, 88, 91, 104, 116];
  const mask = 137;
  const participantOneSent = mask + salaries[0];
  const participantOneReceived = mask + salaries.reduce((a, b) => a + b, 0);
  assert.equal(participantOneSent, 178);
  assert.equal(participantOneReceived, 769);
  assert.equal(participantOneSent - participantOneReceived, -591);
  assert.equal(participantOneReceived - participantOneSent, salaries.slice(1).reduce((a, b) => a + b, 0));

  const { text } = await page();
  validatePrivacyBoundary(solution(text));
});
