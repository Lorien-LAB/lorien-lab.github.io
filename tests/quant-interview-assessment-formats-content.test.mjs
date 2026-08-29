import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md';

const metadata = {
  title: 'Quant Interview Formats & Assessment Strategy',
  description:
    'Prepare for live technical interviews, remote screens, take-home work, and written exams by clarifying constraints, communicating reasoning, preserving integrity, and matching the deliverable to the assessment format.',
  date: '2026-08-30',
  type: 'concept',
  domain: 'Interview Strategy & Communication',
  category: 'Problem Solving Techniques',
  status: 'growing',
  tags: ['Interview', 'Assessment', 'Take-Home', 'Written Exam'],
  quantInterviewTopics: ['interview-strategy-communication', 'interview-process-formats'],
  featured: false,
  related: [
    'quant-interview-preparation-breadth-and-practice',
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  relatedNotes: [],
};

test('assessment-formats Knowledge has the exact public metadata contract', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const frontmatter = text.split(/^---$/m)[1] ?? '';
  assert.deepEqual(parseYaml(frontmatter, { schema: JSON_SCHEMA }), metadata);
});

test('assessment-formats Knowledge covers the four formats and execution loop', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea',
    'Assessment Map',
    'Before the Assessment',
    'Live Technical Execution',
    'Remote-Screen Execution',
    'Take-Home Execution',
    'Written-Exam Execution',
    'Format-Independent Review',
    'Common Mistakes',
    'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const phrase of [
    'allowed tools', 'expected artifact', 'clarification', 'assumptions',
    'think aloud', 'hint', 'integrity', 'resource attribution',
    'reproducible', 'time allocation', 'partial credit', 'consistency checks',
  ]) assert.match(text, new RegExp(phrase, 'i'));
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 6);
  assert.match(text, /copied solutions|copying|external work/i);
});

test('assessment-formats page is source-neutral and creates no Problem', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.doesNotMatch(text, /Red Book|Quant Job Interview Questions and Answers|Mark Joshi|Nicholas Denson|Andrew Downes|section 1\.[1-9]|PDF page/i);
  assert.doesNotMatch(text, /headhunter|Paul and Dominic|Michael Page|Goldman Sachs|interview expenses|wear a suit|lemonade|sugar low|landline|use a mobile|don't use a mobile/i);
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(files.some((file) => /assessment-formats/i.test(String(file))), false);
  await assert.rejects(
    access('src/content/problems/quant-interview-formats-and-assessment-strategy.md'),
    (error) => error?.code === 'ENOENT',
  );
});

test('assessment-formats Knowledge is published and reciprocally linked', async () => {
  const [catalogText, preparation, framing, thinkAloud] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile('src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md', 'utf8'),
    readFile('src/content/knowledge/concepts/problem-framing-clarification-assumption-management.md', 'utf8'),
    readFile('src/content/knowledge/concepts/structured-think-aloud-reasoning.md', 'utf8'),
  ]);
  const module = JSON.parse(catalogText).modules.find(
    ({ slug }) => slug === 'quant-interview-formats-and-assessment-strategy',
  );
  assert.deepEqual(module, {
    slug: 'quant-interview-formats-and-assessment-strategy',
    title: 'Quant Interview Formats & Assessment Strategy',
    canonicalTopics: ['interview-strategy-communication', 'interview-process-formats'],
    primaryTopic: 'interview-process-formats',
    learningOrder: 12,
    status: 'published',
    prerequisites: [],
  });
  for (const text of [preparation, framing, thinkAloud]) {
    assert.match(text, /^related: \[[^\]]*quant-interview-formats-and-assessment-strategy[^\]]*\]$/m);
  }
});
