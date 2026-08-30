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
const interviewChecks = (text) => [...section(text, 'Interview Checks').matchAll(/^\d+\. (.+)$/gm)].map(([, value]) => value);

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

const constraintCheckPatterns = [
  /2m.*m black.*m red.*black-black.*red-red.*mixed.*prove.*same number/is,
  /two fuses.*60 minutes.*nonuniform.*either end.*multiple ends.*time zero.*later.*construct.*45 minutes.*justify/is,
  /four candidate triples.*a.*b.*c.*a sees b and c.*a publicly says.*do not know.*b publicly says.*know.*remaining candidate states?/is,
  /(?=.*tasks a)(?=.*b)(?=.*c)(?=.*d)(?=.*monday)(?=.*tuesday)(?=.*wednesday)(?=.*thursday)(?=.*a.*before.*b)(?=.*c.*before.*d)(?=.*wednesday unavailable)(?=.*enumerate)(?=.*legal schedules)(?=.*forced)/is,
  /(?=.*six tokens)(?=.*three black)(?=.*three red)(?=.*positions 1.*6)(?=.*legal move)(?=.*swap)(?=.*adjacent)(?=.*invariant)(?=.*all black)(?=.*reachable)/is,
  /two observers.*complementary subsets.*five-item set.*legal candidate sets?.*full set/is,
  /(?=.*finite logic grid)(?=.*three people)(?=.*three roles)(?=.*a is not)(?=.*exactly one)(?=.*b is the builder)(?=.*c is the curator)(?=.*propagate)(?=.*both constraints)(?=.*assignment.*unique)/is,
  /six labeled states?.*s_1.*s_6.*s_4.*constraints?.*unique.*exhaust.*remaining alternatives?/is,
];

const treeCheckPatterns = [
  /(?=.*ternary)(?=.*24)(?=.*three tests?)(?=.*lower bound)(?=.*strategy)/is,
  /(?=.*compare)(?=.*(?:eight|8).*distinct values)(?=.*maximum)(?=.*comparison certificate)(?=.*maximal)/is,
  /(?=.*six labeled candidates)(?=.*one heavier)(?=.*balance test)(?=.*left-heavy)(?=.*right-heavy)(?=.*balanced)(?=.*unequal sizes)(?=.*impossible)(?=.*legal operation)(?=.*branching factor)(?=.*capacity)/is,
  /12 candidates.*three labeled groups.*four each.*test.*one group.*outcomes.*two-round.*adaptive.*survivors/is,
  /partial order.*a>b.*a>c.*d>e.*top three.*additional comparisons?.*certificate/is,
  /(?=.*leaf)(?=.*s_1)(?=.*s_2)(?=.*accept)(?=.*reject)(?=.*verification failure)(?=.*legal test)(?=.*outcomes)(?=.*split)/is,
  /nine possible states.*three outcomes.*balanced.*unbalanced.*worst-case.*deepest branch/is,
  /binary tree.*root.*left.*right.*ll.*lr.*rl.*rr.*table.*legal states?.*exactly one leaf.*conclusion/is,
];

test('constraint-propagation Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.constraint);
  assert.deepEqual(metadata, constraintMetadata);
  assert.deepEqual(headings(text), ['Core Idea', 'Candidate Sets and Constraints', 'Information Partitions', 'Public Announcements and Common Knowledge', 'Invariants and Contradictions', 'Deduction Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks']);
  const candidates = section(text, 'Candidate Sets and Constraints');
  assert.match(candidates, /finite candidate states?/i);
  assert.match(candidates, /necessary conditions?/i);
  const partitions = section(text, 'Information Partitions');
  assert.match(partitions, /private information/i);
  const announcements = section(text, 'Public Announcements and Common Knowledge');
  assert.match(announcements, /public statements?.*shared survivor set.*private-information partitions?/is);
  assert.match(announcements, /common knowledge/i);
  const invariants = section(text, 'Invariants and Contradictions');
  assert.match(invariants, /invariant/i);
  assert.match(invariants, /contradiction/i);
  assert.match(section(text, 'Deduction Workflow'), /exhaust.*every alternative|every alternative.*exhaust/i);
  const checks = interviewChecks(text);
  assert.equal(checks.length, 8);
  constraintCheckPatterns.forEach((pattern, index) => assert.match(checks[index], pattern));
});

test('decision-tree Knowledge has exact structure and executable checks', async () => {
  const { text, metadata } = await page(paths.trees);
  assert.deepEqual(metadata, treeMetadata);
  assert.deepEqual(headings(text), ['Core Idea', 'Decision Tree Model', 'Information Capacity', 'Adaptive Strategy Design', 'Ranking and Selection Certificates', 'Verification Workflow', 'Recognition Signals', 'Common Mistakes', 'Interview Checks']);
  const capacity = section(text, 'Information Capacity');
  assert.match(capacity, /branching factor/i);
  assert.match(capacity, /b\^d|outcomes?.*depth|leaves?/i);
  assert.match(capacity, /balanced.*legal branches|legal.*balanced branches/i);
  const adaptive = section(text, 'Adaptive Strategy Design');
  assert.match(adaptive, /each outcome.*next test.*survivors/is);
  assert.match(adaptive, /different.*branches?/i);
  const certificates = section(text, 'Ranking and Selection Certificates');
  assert.match(certificates, /comparison.*certificate/i);
  assert.match(certificates, /every outsider|every candidate/i);
  const verification = section(text, 'Verification Workflow');
  assert.match(verification, /every legal state.*leaf|leaf.*exactly one/i);
  assert.match(verification, /each leaf.*certified answer|certified answer.*each leaf/i);
  const checks = interviewChecks(text);
  assert.equal(checks.length, 8);
  treeCheckPatterns.forEach((pattern, index) => assert.match(checks[index], pattern));
});

test('both Logical Deduction Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.2|River crossing|Birthday problem|Burning ropes|Defective ball|Horse race|PDF page|source item/i);
  }
});
