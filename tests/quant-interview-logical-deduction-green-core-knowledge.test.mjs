import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

const constraint = 'logical-deduction-constraint-propagation-and-case-elimination';
const trees = 'decision-trees-information-bounds-and-adaptive-testing';
const topics = ['logic-brainteasers-discrete-reasoning', 'logical-deduction'];
const paths = {
  constraint: `src/content/knowledge/concepts/${constraint}.md`,
  trees: `src/content/knowledge/concepts/${trees}.md`,
};

async function page(path) {
  const text = await readFile(path, 'utf8');
  assert.equal(text.startsWith('---\n'), true);
  return { text, metadata: parseYaml(text.split(/^---$/m)[1] ?? '', { schema: JSON_SCHEMA }) };
}
const section = (text, heading) => text.split(new RegExp(`^## ${heading}$`, 'm'))[1]?.split(/^## /m)[0] ?? '';
const headings = (text) => [...text.matchAll(/^## (.+)$/gm)].map(([, heading]) => heading);

const constraintMetadata = {
  title: 'Logical Deduction, Constraint Propagation & Case Elimination',
  description: 'Represent finite candidate states, propagate private and public information, eliminate contradictions, and prove uniqueness without skipping alternatives.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Logical Deduction', 'Constraints', 'Case Analysis', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: ['small-cases-recurrence-and-structural-simplification', 'problem-framing-clarification-assumption-management', trees],
  relatedNotes: [],
};
const treeMetadata = {
  title: 'Decision Trees, Information Bounds & Adaptive Testing',
  description: 'Design adaptive tests as decision trees, derive outcome-capacity lower bounds, verify every leaf, and certify ranking or selection decisions.',
  date: '2026-08-30', type: 'concept', domain: 'Mathematics & Statistics',
  category: 'Problem Solving Techniques', status: 'growing',
  tags: ['Decision Trees', 'Information Bounds', 'Adaptive Testing', 'Interview'],
  quantInterviewTopics: topics, featured: false,
  related: [constraint, 'small-cases-recurrence-and-structural-simplification'],
  relatedNotes: [],
};

test('constraint-propagation Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.constraint);
  assert.deepEqual(metadata, constraintMetadata);
  assert.deepEqual(headings(text), ['Core Idea', 'Candidate Sets and Constraints', 'Information Partitions', 'Public Announcements and Common Knowledge', 'Invariants and Contradictions', 'Deduction Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks']);
  for (const pattern of [/candidate states?/i, /necessary conditions?/i, /private information/i, /public statements?/i, /common knowledge/i, /invariant/i, /contradiction/i, /exhaust/i]) assert.match(text, pattern);
  const checks = [...section(text, 'Interview Checks').matchAll(/^\d+\. (.+)$/gm)].map(([, value]) => value);
  assert.equal(checks.length, 8);
  assert.match(checks[0], /2m.*m black.*m red.*black-black.*red-red.*mixed.*prove.*same number/is);
  assert.match(checks[1], /two.*(?:fuses|cords).*60 minutes.*nonuniform.*45 minutes.*justify/is);
});

test('decision-tree Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.trees);
  assert.deepEqual(metadata, treeMetadata);
  assert.deepEqual(headings(text), ['Core Idea', 'Decision Tree Model', 'Information Capacity', 'Adaptive Strategy Design', 'Ranking and Selection Certificates', 'Verification Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks']);
  const capacity = section(text, 'Information Capacity');
  assert.match(capacity, /branching factor/i);
  assert.match(capacity, /b\^d|outcomes?.*depth|leaves?/i);
  assert.match(capacity, /balanced.*legal branches|legal.*balanced branches/i);
  const verification = section(text, 'Verification Workflow');
  assert.match(verification, /every legal state.*leaf|leaf.*exactly one/i);
  const checks = [...section(text, 'Interview Checks').matchAll(/^\d+\. (.+)$/gm)].map(([, value]) => value);
  assert.equal(checks.length, 8);
  assert.match(checks.join('\n'), /ternary.*24.*three/i);
  assert.match(checks.join('\n'), /partial order.*top three|top three.*partial order/i);
});

test('both Logical Deduction Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.2|River crossing|Birthday problem|Burning ropes|Defective ball|Horse race|PDF page|source item/i);
  }
});
