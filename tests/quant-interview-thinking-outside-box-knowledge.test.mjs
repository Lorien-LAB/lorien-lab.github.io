import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const slug = 'constraint-reframing-and-latent-state';
const path = `src/content/knowledge/concepts/${slug}.md`;
const headings = ['Core Idea', 'Reframe the State', 'Change Representation and Granularity', 'Latent State and Extra Channels', 'Reversible Operations and Cancellation', 'Witnesses, Necessity, and Boundaries', 'Problem-Solving Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks'];
const metadata = {
  title: 'Constraint Reframing & Latent State',
  description: 'Re-express constraints, expose hidden state and information channels, compose reversible operations, and prove when an unconventional construction is valid.',
  date: '2026-08-31', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Constraint Reframing', 'Latent State', 'Reversible Operations', 'Interview'],
  quantInterviewTopics: ['logic-brainteasers-discrete-reasoning', 'logical-deduction'],
  featured: false,
  related: ['logical-deduction-constraint-propagation-and-case-elimination', 'decision-trees-information-bounds-and-adaptive-testing', 'modular-invariants', 'problem-framing-clarification-assumption-management'],
  relatedNotes: [],
};

test('Constraint Reframing Knowledge has exact source-neutral executable structure', async () => {
  const text = await readFile(path, 'utf8');
  const frontmatter = parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
  assert.deepEqual(frontmatter, metadata);
  assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(([, h]) => h), headings);
  for (const pattern of [/state variables/i, /representation/i, /granularity/i, /latent state/i, /reversible/i, /cancel/i, /constructive witness/i, /necessary/i, /assumptions/i]) assert.match(text, pattern);
  assert.match(text, /State assumptions and boundaries alongside the argument\./);
  const checks = text.split(/^## Interview Checks$/m)[1]?.match(/^\d+\. .+$/gm) ?? [];
  assert.equal(checks.length, 6);
  assert.doesNotMatch(checks.join('\n'), /53.*brick|calendar.*cube|two guards|padlock|last ball|four switches|salary/i);
  assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.3|PDF page|source item/i);
});
