import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const framingPath =
  'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md';
const structuredPath =
  'src/content/knowledge/concepts/structured-think-aloud-reasoning.md';
const topics = ['interview-strategy-communication', 'reasoning-communication'];
const relationSentence =
  'framing determines what must be reasoned about, and structured explanation makes that framing and the resulting reasoning inspectable';

function parseInlineArray(text, field) {
  const match = text.match(new RegExp('^' + field + ':\\s*\\[([^\\]]*)\\]$', 'm'));
  if (!match) return [];
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function frontmatterValue(text, field) {
  return text.match(new RegExp('^' + field + ':\\s*(.+)$', 'm'))?.[1]?.trim() ?? '';
}

function publicBody(text) {
  return text.split(/^---\s*$/m).slice(2).join('---').trim();
}

function assertFixedMetadata(text, expected) {
  assert.equal(frontmatterValue(text, 'title'), expected.title);
  assert.equal(frontmatterValue(text, 'description'), expected.description);
  assert.equal(frontmatterValue(text, 'date'), '2026-08-24');
  assert.equal(frontmatterValue(text, 'type'), 'concept');
  assert.equal(frontmatterValue(text, 'domain'), 'Interview Strategy & Communication');
  assert.equal(frontmatterValue(text, 'category'), 'Problem Solving Techniques');
  assert.equal(frontmatterValue(text, 'status'), 'growing');
  assert.equal(frontmatterValue(text, 'featured'), 'false');
  assert.deepEqual(parseInlineArray(text, 'tags'), expected.tags);
  assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), topics);
  assert.deepEqual(parseInlineArray(text, 'related'), expected.related);
  assert.deepEqual(parseInlineArray(text, 'relatedNotes'), []);
}

function assertSourceNeutral(text) {
  assert.doesNotMatch(
    text,
    /^\s*(?:sourceUrl|source|sourceSection|sourceItem|sourcePage|evidencePage|provenance):/mi,
  );
  const body = publicBody(text);
  assert.doesNotMatch(
    body,
    /Green Book|Red Book|150 Questions|source (?:section|item|page|ordering)|PDF page|question \d+|page \d+/i,
  );
  assert.doesNotMatch(
    body,
    /current hiring cycle|latest interview format|preparation schedule|self-assessment schedule|\b202\d\b/i,
  );
  assert.doesNotMatch(body, /\b(?:1\.3|1\.4|1\.5|1\.12)\b/);
}

test('problem framing page teaches clarification and revisable assumptions', async () => {
  const text = await readFile(framingPath, 'utf8');
  assertFixedMetadata(text, {
    title: 'Problem Framing, Clarification & Assumption Management',
    description:
      'Frame underspecified interview problems by separating facts, constraints, unknowns, and success conditions before asking high-value questions or stating provisional assumptions.',
    tags: ['Interview', 'Problem Solving', 'Communication', 'Assumptions'],
    related: [
      'structured-think-aloud-reasoning',
      'quant-interview-preparation-breadth-and-practice',
      'quant-interview-formats-and-assessment-strategy',
      'behavioral-interview-evidence-and-authenticity',
      'small-cases-recurrence-and-structural-simplification',
      'fermi-estimation-assumption-decomposition',
    ],
  });
  assertSourceNeutral(text);

  for (const heading of [
    '## Core Idea',
    '## Compact Framing Protocol',
    '## Recognition Signals',
    '## Explicit Assumption versus Unsupported Claim',
    '## Common Mistakes',
    '## Interview Checks',
  ]) assert.match(text, new RegExp('^' + heading + '$', 'm'), 'missing ' + heading);

  assert.match(text, /restate the (?:decision|target quantity)/i);
  assert.match(text, /known facts.*constraints.*unknowns.*success conditions/is);
  assert.match(text, /greatest effect on the solution path/i);
  assert.match(text, /provisional assumption/i);
  assert.match(text, /state its consequence/i);
  assert.match(text, /invite correction/i);
  assert.match(text, /revise the model before proceeding/i);
  assert.match(text, /unsupported claim/i);

  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.match(checks, /missing constraint/i);
  assert.match(checks, /useful clarification/i);
  assert.match(checks, /assumption.*consequence/is);
  assert.match(checks, /feedback.*revise/is);
});

test('structured think-aloud page exposes decisive and revisable reasoning', async () => {
  const text = await readFile(structuredPath, 'utf8');
  assertFixedMetadata(text, {
    title: 'Structured Think-Aloud Reasoning',
    description:
      'Communicate conclusions and decisive reasoning steps clearly, distinguish facts from inferences, and revise the explanation when feedback changes the model.',
    tags: ['Interview', 'Reasoning', 'Communication', 'Feedback'],
    related: [
      'problem-framing-clarification-assumption-management',
      'quant-interview-preparation-breadth-and-practice',
      'quant-interview-formats-and-assessment-strategy',
      'behavioral-interview-evidence-and-authenticity',
    ],
  });
  assertSourceNeutral(text);

  for (const heading of [
    '## Core Idea',
    '## Concise Explanation Protocol',
    '## Recognition Signals',
    '## What to Expose',
    '## Common Mistakes',
    '## Interview Checks',
  ]) assert.match(text, new RegExp('^' + heading + '$', 'm'), 'missing ' + heading);

  assert.match(text, /conclusion or intended route first/i);
  assert.match(text, /observations.*assumptions.*inferences.*uncertainty/is);
  assert.match(text, /steps that change the decision/i);
  assert.match(text, /trivial arithmetic or syntax/i);
  assert.match(text, /meaningful checkpoint/i);
  assert.match(text, /result, limitation, or next discriminating test/i);
  assert.match(text, /correct(?:ing|ive) feedback/i);
  assert.match(text, /revise/i);

  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.match(checks, /decisive step/i);
  assert.match(checks, /fact.*inference/is);
  assert.match(checks, /compress.*routine narration/is);
  assert.match(checks, /challenge.*update/is);
});

test('reasoning Knowledge nodes keep their preparation links aligned', async () => {
  const framing = await readFile(framingPath, 'utf8');
  const structured = await readFile(structuredPath, 'utf8');
  assert.deepEqual(parseInlineArray(framing, 'related'), [
    'structured-think-aloud-reasoning',
    'quant-interview-preparation-breadth-and-practice',
    'quant-interview-formats-and-assessment-strategy',
    'behavioral-interview-evidence-and-authenticity',
    'small-cases-recurrence-and-structural-simplification',
    'fermi-estimation-assumption-decomposition',
  ]);
  assert.deepEqual(parseInlineArray(structured, 'related'), [
    'problem-framing-clarification-assumption-management',
    'quant-interview-preparation-breadth-and-practice',
    'quant-interview-formats-and-assessment-strategy',
    'behavioral-interview-evidence-and-authenticity',
  ]);
  assert.deepEqual(parseInlineArray(framing, 'relatedNotes'), []);
  assert.deepEqual(parseInlineArray(structured, 'relatedNotes'), []);
});

test('framing and structured reasoning state their paired relationship in the public body', async () => {
  const framing = await readFile(framingPath, 'utf8');
  const structured = await readFile(structuredPath, 'utf8');
  assert.match(publicBody(framing), new RegExp(relationSentence));
  assert.match(publicBody(structured), new RegExp(relationSentence));
});

test('reasoning communication creates no classified Problem', async () => {
  const root = 'src/content/problems';
  const files = (await readdir(root, { recursive: true }))
    .filter((file) => String(file).endsWith('.md'));
  const offenders = [];
  for (const file of files) {
    const text = await readFile(path.join(root, String(file)), 'utf8');
    if (parseInlineArray(text, 'quantInterviewTopics').includes('reasoning-communication')) {
      offenders.push(String(file).replaceAll('\\', '/'));
    }
  }
  assert.deepEqual(offenders.sort(), []);
});
