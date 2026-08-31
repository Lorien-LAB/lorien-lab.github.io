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

function interviewChecks(text) {
  return text.split(/^## Interview Checks$/m)[1]?.match(/^\d+\. .+$/gm) ?? [];
}

function validateFixedBinaryReachabilityCheck(check) {
  assert.match(check, /fixed row has five bits/i);
  assert.match(check, /initial row is `00000`/i);
  assert.match(check, /target row is `10101`/i);
  assert.match(check, /legal move chooses exactly three consecutive positions and flips all three bits/i);
  assert.match(check, /without changing the row length or position order/i);
  assert.match(check, /determine whether the target is reachable/i);
}

test('Constraint Reframing Knowledge has exact source-neutral executable structure', async () => {
  const text = await readFile(path, 'utf8');
  const frontmatter = parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA });
  assert.deepEqual(frontmatter, metadata);
  assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(([, h]) => h), headings);
  for (const pattern of [/state variables/i, /representation/i, /granularity/i, /latent state/i, /reversible/i, /cancel/i, /constructive witness/i, /necessary/i, /assumptions/i]) assert.match(text, pattern);
  assert.match(text, /State assumptions and boundaries alongside the argument\./);
  const checks = interviewChecks(text);
  assert.equal(checks.length, 6);
  assert.doesNotMatch(checks.join('\n'), /53.*brick|calendar.*cube|two guards|padlock|last ball|four switches|salary/i);
  assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.3|PDF page|source item/i);
});

test('Interview Check 4 gives a complete fixed-length binary reachability instance', async () => {
  const text = await readFile(path, 'utf8');
  const check = interviewChecks(text)[3] ?? '';
  validateFixedBinaryReachabilityCheck(check);

  const withoutTarget = check.replace(/target row is `10101`/i, 'target row is unspecified');
  assert.notEqual(withoutTarget, check);
  assert.throws(() => validateFixedBinaryReachabilityCheck(withoutTarget));
});
