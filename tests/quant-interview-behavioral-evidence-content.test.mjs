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

const approvedPrompts = [
  'Why are you pursuing quantitative work and this role now?',
  'Choose one CV item: what did you contribute, why is it relevant, and what did you learn?',
  'Why are you leaving or changing your previous direction?',
  'Describe a difficult collaboration and the concrete actions you took.',
  'What genuine weakness are you improving, and what evidence shows progress?',
  'Give an example of meeting an important deadline under constraints.',
  'What direction do you want your work to take over the next several years, and why does this role fit?',
  'Explain your research first to a non-specialist and then to a technical expert.',
  'What useful qualities do you bring beyond technical ability, and how have you demonstrated them?',
  'What would close collaborators say about your working style, and what examples support that view?',
  'What achievement best demonstrates unusual initiative or impact?',
  'What have you studied or built that demonstrates genuine interest in finance or quantitative work?',
  'What recent development at this organization is relevant to the role, and why?',
  'Why does this organization or team fit your goals better than plausible alternatives?',
  'In what situations do you work best independently, and when does collaboration improve the result?',
  'Describe a time you led others toward a measurable outcome.',
  'How would you evaluate and adapt to an unfamiliar internal language or tool while protecting transferable skills?',
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
  const section = (heading) => text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
  const framework = section('Four-Part Answer Structure');
  assert.deepEqual(
    [...framework.matchAll(/^\d+\. \*\*(Claim|Evidence|Relevance|Reflection):\*\*/gm)].map(([, label]) => label),
    ['Claim', 'Evidence', 'Relevance', 'Reflection'],
  );
  const families = section('Prompt Families');
  assert.deepEqual(
    [...families.matchAll(/^\d+\. \*\*([^:]+):\*/gm)].map(([, label]) => label),
    ['Motivation and direction', 'Contribution and achievement', 'Collaboration and leadership', 'Growth and resilience', 'Communication and fit'],
  );
  const workflow = section('Answer Preparation Workflow');
  assert.equal((workflow.match(/^\d+\./gm) ?? []).length, 7);
  const promptBlock = section('Practice Prompts');
  const prompts = [...promptBlock.matchAll(/^\d+\. (.+)$/gm)].map(([, prompt]) => prompt);
  assert.deepEqual(prompts, approvedPrompts);
  assert.equal(promptBlock.trim(), approvedPrompts.map((prompt, index) => `${index + 1}. ${prompt}`).join('\n'));
  const checks = section('Interview Checks');
  const checkLines = [...checks.matchAll(/^\d+\. (.+)$/gm)].map(([, check]) => check);
  assert.equal(checkLines.length >= 6, true);
  for (const [index, pattern] of [
    /trait label.*concrete action.*observable consequence/i,
    /personal contribution.*vague team credit/i,
    /adapt one technical story.*non-specialist.*technical expert/i,
    /real weakness.*evidence.*improvement/i,
    /organization-specific research.*role.*generic praise/i,
    /authenticity.*pressured.*preferred answer/i,
  ].entries()) assert.match(checkLines[index], pattern);
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
