import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const knowledgePath =
  'src/content/knowledge/concepts/quant-role-and-employer-fit.md';

test('role and employer fit Knowledge has valid source-neutral frontmatter', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  const frontmatter = text.split(/^---$/m)[1] ?? '';
  assert.deepEqual(parseYaml(frontmatter, { schema: JSON_SCHEMA }), {
    title: 'Quant Role & Employer Fit',
    description:
      'Compare quant roles and employer environments through work product, research-engineering balance, decision proximity, time horizon, risk ownership, and transferable skills.',
    date: '2026-08-29',
    type: 'concept',
    domain: 'Interview Strategy & Communication',
    category: 'Problem Solving Techniques',
    status: 'growing',
    tags: ['Interview', 'Careers', 'Quant Roles', 'Employer Fit'],
    quantInterviewTopics: ['interview-strategy-communication', 'interview-preparation'],
    featured: false,
    related: ['quant-interview-preparation-breadth-and-practice'],
    relatedNotes: [],
  });
  assert.doesNotMatch(
    text,
    /Red Book|Mark Joshi|Nicholas Denson|Andrew Downes|sourceSection|PDF page|section 1\.10|section 1\.11|Goldman Sachs|Lehman Brothers|Citadel|Basel II/i,
  );
  assert.doesNotMatch(
    text,
    /150 Most Frequently Asked Questions on Quant Interviews|A Practical Guide to Quantitative Finance Interviews|Quant Job Interview Questions and Answers/i,
  );
  assert.doesNotMatch(
    text,
    /paid more|less money|decent pay|astronomical bonus|growth industry|credit crisis|snapped up within|hard to switch|easy to switch|easier to find a job/i,
  );
});

test('role and employer fit Knowledge teaches the approved two-axis framework', async () => {
  const text = await readFile(knowledgePath, 'utf8');
  for (const heading of [
    'Core Idea',
    'Map the Role Function',
    'Map the Employer Environment',
    'Compare with One Lens',
    'Build a Fit Hypothesis',
    'Common Mistakes',
    'Interview Checks',
  ]) assert.match(text, new RegExp(`^## ${heading}$`, 'm'));
  for (const phrase of [
    'work product',
    'research',
    'engineering',
    'decision',
    'time horizon',
    'risk',
    'transferable skills',
    'revisable',
  ]) assert.match(text, new RegExp(phrase, 'i'));
  const checks = text.split(/^## Interview Checks$/m)[1] ?? '';
  assert.equal((checks.match(/^\d+\./gm) ?? []).length, 4);
});

test('role and employer fit creates no public Problem', async () => {
  const files = await readdir('src/content/problems', { recursive: true });
  assert.equal(
    files.some((file) => /role-and-employer-fit/i.test(String(file))),
    false,
  );
  await assert.rejects(
    access('src/content/problems/quant-role-and-employer-fit.md'),
    (error) => error?.code === 'ENOENT',
  );
});

test('role and employer fit is published and reciprocally connected', async () => {
  const [catalogText, preparation] = await Promise.all([
    readFile('src/data/quant-interview/topics/knowledge-catalog.json', 'utf8'),
    readFile(
      'src/content/knowledge/concepts/quant-interview-preparation-breadth-and-practice.md',
      'utf8',
    ),
  ]);
  const catalog = JSON.parse(catalogText);
  assert.deepEqual(
    catalog.modules.find(({ slug }) => slug === 'quant-role-and-employer-fit'),
    {
      slug: 'quant-role-and-employer-fit',
      title: 'Quant Role & Employer Fit',
      canonicalTopics: ['interview-strategy-communication', 'interview-preparation'],
      primaryTopic: 'interview-preparation',
      learningOrder: 11,
      status: 'published',
      prerequisites: [],
    },
  );
  assert.match(
    preparation,
    /^related: \[[^\]]*quant-role-and-employer-fit[^\]]*\]$/m,
  );
});
