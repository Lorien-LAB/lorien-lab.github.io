import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md';

const readArray = (text, field) =>
  (text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

test('preparation Knowledge frontmatter is valid YAML', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const frontmatter = text.split(/^---$/m)[1] ?? '';
  assert.doesNotThrow(() => parseYaml(frontmatter));
});

test('preparation Knowledge owns breadth and deliberate practice as one loop', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.match(
    text,
    /^title: "Quant Interview Preparation: Breadth, Basics & Deliberate Practice"$/m,
  );
  assert.match(text, /^date: 2026-08-28$/m);
  assert.match(text, /^type: concept$/m);
  assert.match(text, /^domain: Interview Strategy & Communication$/m);
  assert.match(text, /^category: Problem Solving Techniques$/m);
  assert.match(text, /^status: growing$/m);
  assert.match(text, /^featured: false$/m);
  assert.deepEqual(readArray(text, 'quantInterviewTopics'), [
    'interview-strategy-communication',
    'interview-preparation',
  ]);
  assert.deepEqual(readArray(text, 'related'), [
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
    'quant-role-and-employer-fit',
  ]);
  assert.deepEqual(readArray(text, 'relatedNotes'), []);

  for (const heading of [
    'Core Idea',
    'The Preparation Loop',
    'Build Breadth without Studying Everything',
    'Turn Practice into Evidence',
    'Readiness Signals',
    'Common Mistakes',
    'Interview Checks',
  ]) {
    assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  }
  for (const phrase of [
    'map the role',
    'baseline fluency',
    'representative tasks',
    'diagnose',
    'repeat under constraints',
    'working basics',
    'specialist mastery',
    'passive rereading',
    'retrieval',
    'spoken explanation',
  ]) {
    assert.match(text, new RegExp(phrase, 'i'));
  }

  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 4);
  assert.doesNotMatch(
    text,
    /Green Book|Xinfeng Zhou|sourceSection|PDF page|section 1\.1|section 1\.2/i,
  );
});

test('preparation scope creates no public Problem', async () => {
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(
    files.some((file) => /preparation-breadth|deliberate-practice/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/problems/quant-interview-preparation-breadth-and-practice.md'),
  );
});

test('preparation Knowledge is published and reciprocally connected', async () => {
  const [catalogText, framing, thinkAloud] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile(
      'src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md',
      'utf8',
    ),
    readFile(
      'src/content/knowledge/concepts/structured-think-aloud-reasoning.md',
      'utf8',
    ),
  ]);
  const catalog = JSON.parse(catalogText);
  const module = catalog.modules.find(
    ({ slug }) => slug === 'quant-interview-preparation-breadth-and-practice',
  );
  assert.deepEqual(module, {
    slug: 'quant-interview-preparation-breadth-and-practice',
    title: 'Quant Interview Preparation: Breadth, Basics & Deliberate Practice',
    canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
    primaryTopic: 'interview-preparation',
    learningOrder: 10,
    status: 'published',
    prerequisites: [],
  });
  assert.match(
    framing,
    /^related: \[[^\]]*quant-interview-preparation-breadth-and-practice[^\]]*\]$/m,
  );
  assert.match(
    thinkAloud,
    /^related: \[[^\]]*quant-interview-preparation-breadth-and-practice[^\]]*\]$/m,
  );
});
