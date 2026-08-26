import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const newKnowledge = [
  'probability-spaces-events',
  'probability-axioms-derived-rules',
  'symmetry-equiprobability-geometric-probability',
];
const newProblems = [
  'more-heads-with-one-extra-coin',
  'higher-card-by-symmetry',
  'drunk-passenger-last-seat',
  'random-points-in-a-semicircle',
  'minimum-trials-for-at-least-one-hit',
  'romeo-juliet-meeting-probability',
];

async function findMarkdown(root, slug) {
  const files = await readdir(root, { recursive: true });
  const match = files.find((file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing ${slug}`);
  return `${root}/${match}`;
}

async function readPublicTree(root) {
  const files = await readdir(root, { recursive: true });
  const readable = files.filter((file) => /\.(?:astro|js|mjs|ts|tsx|jsx)$/.test(String(file)));
  return (await Promise.all(readable.map((file) => readFile(`${root}/${file}`, 'utf8')))).join('\n');
}

test('probability foundations content stays inside the bounded canonical topic', async () => {
  for (const slug of newKnowledge) {
    const text = await readFile(await findMarkdown('src/content/knowledge', slug), 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
    assert.doesNotMatch(text, /^## (?:Bayes|Conditional Probability|Law of Total Probability|Law of Total Expectation|Expectation|Variance|Central Limit Theorem|Law of Large Numbers)/mi);
  }
  for (const slug of newProblems) {
    const text = await readFile(await findMarkdown('src/content/problems', slug), 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, probability-foundations\]$/m);
  }
});

test('conditioning remains owned by conditional probability and Bayes', async () => {
  const text = await readFile('src/content/knowledge/concepts/conditioning.md', 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
  assert.doesNotMatch(text, /probability-foundations/);
});

test('canonical extension audit metadata is not a public rendering dependency', async () => {
  const publicText = `${await readPublicTree('src/pages')}\n${await readPublicTree('src/layouts')}`;
  assert.doesNotMatch(publicText, /canonicalExtensions/);
  assert.doesNotMatch(publicText, /probability-statistics-probability-foundations-005\.json/);
  assert.doesNotMatch(publicText, /data\/quant-interview\/workstreams/);
});
