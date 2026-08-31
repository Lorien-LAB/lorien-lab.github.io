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
  /audit.*binary tree.*candidates A.*leaf path.*conclusion table.*coverage.*uniqueness/is,
];

function mCoefficient(value) {
  return value === '' ? 1 : Number(value);
}

function verifyCardPairInvariant(check) {
  const match = check.match(/contains (\d*)m cards:\s*(\d*)m black and (\d*)m red\. Pair the cards into (\d*)m pairs/i);
  assert.ok(match, 'card-pair assumptions');
  const [, totalFactor, blackFactor, redFactor, pairFactor] = match.map(String);
  let verifiedCases = 0;

  for (let m = 1; m <= 12; m += 1) {
    const total = mCoefficient(totalFactor) * m;
    const black = mCoefficient(blackFactor) * m;
    const red = mCoefficient(redFactor) * m;
    const pairs = mCoefficient(pairFactor) * m;
    assert.equal(total, black + red, `m=${m} card total`);
    assert.equal(total, 2 * pairs, `m=${m} pair total`);

    for (let blackBlack = 0; blackBlack <= pairs; blackBlack += 1) {
      for (let redRed = 0; redRed <= pairs - blackBlack; redRed += 1) {
        const mixed = pairs - blackBlack - redRed;
        if (2 * blackBlack + mixed !== black || 2 * redRed + mixed !== red) continue;
        verifiedCases += 1;
        assert.equal(blackBlack, redRed, `m=${m}, mixed=${mixed}`);
      }
    }
  }

  assert.ok(verifiedCases > 0);
  return verifiedCases;
}

function verifyFuseConstruction(check, {
  referenceEndsAtStart = 2,
  timerEndsAtStart = 1,
  timerEndsLitAtReferenceCompletion = 1,
} = {}) {
  const duration = Number(check.match(/takes (\d+) minutes to burn completely/i)?.[1] ?? Number.NaN);
  const target = Number(check.match(/measure (\d+) minutes/i)?.[1] ?? Number.NaN);
  assert.equal(Number.isFinite(duration) && Number.isFinite(target), true);
  assert.match(check, /burns nonuniformly/i);
  assert.match(check, /Either end.*multiple ends.*time zero or later/is);
  assert.ok(referenceEndsAtStart >= 1 && referenceEndsAtStart <= 2);
  assert.ok(timerEndsAtStart >= 1 && timerEndsAtStart <= 2);

  const firstEvent = duration / referenceEndsAtStart;
  const timerRemaining = Math.max(0, duration - firstEvent * timerEndsAtStart);
  const timerEndsAfterEvent = timerEndsAtStart + timerEndsLitAtReferenceCompletion;
  assert.ok(timerEndsAfterEvent >= 1 && timerEndsAfterEvent <= 2);
  const finalInterval = timerRemaining / timerEndsAfterEvent;
  const completion = firstEvent + finalInterval;
  assert.equal(completion, target);
  return { firstEvent, timerRemaining, finalInterval, completion };
}

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

test('two-color card check programmatically preserves equal monochromatic pair counts', async () => {
  const { text } = await page(paths.constraint);
  const [cardCheck] = interviewChecks(text);
  assert.ok(verifyCardPairInvariant(cardCheck) > 0);

  const unequalColors = cardCheck
    .replace('2m cards: m black and m red', '4m cards: 3m black and m red')
    .replace('into m pairs', 'into 2m pairs');
  assert.throws(() => verifyCardPairInvariant(unequalColors), { name: 'AssertionError' });
});

test('two-fuse check programmatically measures forty-five minutes', async () => {
  const { text } = await page(paths.constraint);
  const [, fuseCheck] = interviewChecks(text);
  assert.deepEqual(verifyFuseConstruction(fuseCheck), {
    firstEvent: 30,
    timerRemaining: 30,
    finalInterval: 15,
    completion: 45,
  });
  assert.throws(
    () => verifyFuseConstruction(fuseCheck, { referenceEndsAtStart: 1 }),
    { name: 'AssertionError' },
  );
  assert.throws(
    () => verifyFuseConstruction(fuseCheck, { timerEndsLitAtReferenceCompletion: 0 }),
    { name: 'AssertionError' },
  );
  assert.throws(
    () => verifyFuseConstruction(fuseCheck.replace('45 minutes', '50 minutes')),
    { name: 'AssertionError' },
  );
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
  const audit = checks[7];
  assert.match(audit, /candidates A, B, C, and D/i);
  assert.match(audit, /root predicate.*candidate is in.*A,B.*Yes.*A,B.*No.*C,D/is);
  assert.match(audit, /On Yes.*predicate.*candidate is A.*Yes.*A.*No.*B/is);
  assert.match(audit, /On No.*predicate.*candidate is C.*Yes.*C.*No.*D/is);
  assert.match(audit, /leaf path.*conclusion table/i);
  const table = audit.match(/The leaf path → conclusion table is `([^`]+)`/i)?.[1] ?? '';
  assert.notEqual(table, '');
  assert.match(table, /root Yes\s*\/\s*second Yes\s*→\s*A/i);
  assert.match(table, /root Yes\s*\/\s*second No\s*→\s*B/i);
  assert.match(table, /root No\s*\/\s*second Yes\s*→\s*C/i);
  assert.match(table, /root No\s*\/\s*second No\s*→\s*D/i);
  assert.match(audit, /audit coverage and uniqueness/i);
  assert.match(audit, /mutate.*root No\s*\/\s*second No\s*→\s*D.*→\s*C.*duplicate.*missing.*failure/is);
});

test('both Logical Deduction Knowledge pages are source-neutral', async () => {
  for (const path of Object.values(paths)) {
    const { text } = await page(path);
    assert.doesNotMatch(text, /Green Book|A Practical Guide|section 2\.2|River crossing|Birthday problem|Burning ropes|Defective ball|Horse race|PDF page|source item/i);
  }
});
