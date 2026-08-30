import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/behavioral-interview-evidence-and-authenticity.md';

const metadata = {
  title: 'Behavioral Interview Evidence & Authenticity',
  description:
    'Build honest, evidence-backed behavioral interview answers by stating a claim, supporting it with a real example, connecting it to the role, and reflecting on what changed afterward.',
  date: '2026-08-30',
  type: 'concept',
  domain: 'Interview Strategy & Communication',
  category: 'Problem Solving Techniques',
  status: 'growing',
  tags: ['Interview', 'Behavioral', 'Evidence', 'Authenticity'],
  quantInterviewTopics: ['interview-strategy-communication', 'soft-interview'],
  featured: false,
  related: [
    'quant-role-and-employer-fit',
    'quant-interview-preparation-breadth-and-practice',
    'problem-framing-clarification-assumption-management',
    'structured-think-aloud-reasoning',
  ],
  relatedNotes: [],
};

const promptPatterns = [
  /pursuing quantitative work.*role now/i,
  /CV item.*contribute.*relevant.*learn/i,
  /(?:leaving|changing).*previous direction/i,
  /difficult collaboration.*actions/i,
  /genuine weakness.*evidence.*progress/i,
  /deadline.*constraints/i,
  /next several years.*role fit/i,
  /research.*non-specialist.*technical expert/i,
  /qualities.*beyond technical.*demonstrated/i,
  /collaborators.*working style.*examples/i,
  /achievement.*(?:initiative|impact)/i,
  /(?:studied|built).*interest.*(?:finance|quantitative)/i,
  /recent development.*organization.*role/i,
  /(?:organization|team).*goals.*alternatives/i,
  /independently.*collaboration.*result/i,
  /led others.*measurable outcome/i,
  /(?:unfamiliar internal language|tool).*transferable skills/i,
];

test('behavioral-evidence page has exact byte-zero frontmatter', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  assert.deepEqual(parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }), metadata);
});

test('behavioral-evidence page implements the exact answer framework and prompt bank', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea', 'Four-Part Answer Structure', 'Evidence Quality', 'Prompt Families',
    'Answer Preparation Workflow', 'Authenticity and Integrity Boundary',
    'Practice Prompts', 'Common Mistakes', 'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const word of ['Claim', 'Evidence', 'Relevance', 'Reflection']) {
    assert.match(text, new RegExp(`\\b${word}\\b`, 'i'));
  }
  const promptBlock = text.split(/^## Practice Prompts$/m)[1]?.split(/^## /m)[0] ?? '';
  assert.equal((promptBlock.match(/^\d+\./gm) ?? []).length, 17);
  for (const pattern of promptPatterns) assert.match(promptBlock, pattern);
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length >= 6, true);
});

test('behavioral page rejects scripts, stereotypes, source answers, and skipped identities', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  assert.match(text, /invented stories|fabricat/i);
  assert.match(text, /borrowed accomplishments|copied/i);
  assert.match(text, /memorized script|exact wording/i);
  assert.doesNotMatch(text, /Red Book|Quant Job Interview Questions and Answers|Question 9\.(?:[1-9]|1\d|2[0-2])|PDF page/i);
  assert.doesNotMatch(text, /swearing|share price|own shares|French food|first thing.*first day|Goldman Sachs|answer had better be|team player/i);
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(files.some((file) => /behavioral-interview-evidence/i.test(String(file))), false);
  await assert.rejects(
    access('src/content/problems/behavioral-interview-evidence-and-authenticity.md'),
    (error) => error?.code === 'ENOENT',
  );
});
