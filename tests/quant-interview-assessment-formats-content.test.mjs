import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-interview-formats-and-assessment-strategy.md';

const levelTwoSection = (text, heading) =>
  text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';

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
  assert.equal(text.startsWith('---\n'), true, 'YAML delimiter must start at byte 0');
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
  assert.match(text, /copied solutions|copying|external work/i);
});

test('Assessment Map has the exact seven-column and four-format contract', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const assessmentMap = levelTwoSection(text, 'Assessment Map');
  const tableRows = assessmentMap
    .split(/\r?\n/)
    .filter((line) => /^\|.+\|$/.test(line))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
  const [headers, separator, ...formats] = tableRows;

  assert.deepEqual(headers, [
    'Format',
    'Interaction level',
    'Time horizon',
    'Allowed tools',
    'Expected artifact',
    'Feedback availability',
    'Communication channel',
  ]);
  assert.equal(separator.every((cell) => /^---+$/.test(cell)), true);
  assert.deepEqual(formats.map(([label]) => label), [
    'Live technical',
    'Remote screen',
    'Take-home',
    'Supervised written exam',
  ]);
  assert.equal(formats.every((row) => row.length === headers.length), true);
});

test('Interview Checks cover the six required decisions one-for-one', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const checks = levelTwoSection(text, 'Interview Checks')
    .split(/\r?\n/)
    .filter((line) => /^\d+\.\s/.test(line));

  assert.equal(checks.length, 6);
  assert.match(checks[0], /take-home/i);
  assert.match(checks[0], /clarif|confirm/i);
  assert.match(checks[1], /live/i);
  assert.match(checks[1], /take-home/i);
  assert.match(checks[1], /communicat/i);
  assert.match(checks[2], /optimized solution/i);
  assert.match(checks[2], /required|expected/i);
  assert.match(checks[3], /live/i);
  assert.match(checks[3], /hint/i);
  assert.match(checks[3], /respond|incorporat|restate/i);
  assert.match(checks[4], /written exam/i);
  assert.match(checks[4], /allocat.*time|time.*allocat/i);
  assert.match(checks[5], /format mismatch/i);
  assert.match(checks[5], /missing knowledge/i);
  assert.match(checks[5], /diagnos|distinguish|separate/i);
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
