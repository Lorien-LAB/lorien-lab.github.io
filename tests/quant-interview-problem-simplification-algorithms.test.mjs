import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';

async function page(path) {
  const text = await readFile(path, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, `${path} missing frontmatter`);
  return { text, metadata: parseYaml(match[1], { schema: JSON_SCHEMA }) };
}

function solution(text) {
  const body = text.match(/<summary>Show Solution<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? '';
  for (const heading of ['Solution', 'Why This Problem Matters', 'Common Mistakes', 'Extensions']) {
    assert.match(body, new RegExp(`^## ${heading}$`, 'm'));
  }
  return body;
}

const root = ['logic-brainteasers-discrete-reasoning', 'problem-simplification'];
const algorithmRoot = 'algorithms-data-structures-cpp';

const eggMetadata = {
  problemId: 'logic-problem-simplification-003', title: 'Two-Resource Threshold Search',
  description: 'Find an unknown threshold among 100 ordered levels with two destructible probes while minimizing the worst-case number of tests.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Dynamic Programming', 'Minimax Search'],
  tags: ['Dynamic Programming', 'Recurrence', 'Worst Case', 'Interview'],
  quantInterviewTopics: [...root, algorithmRoot, 'dynamic-programming-algorithms'],
  concepts: ['small-cases-recurrence-and-structural-simplification', 'recursion-problem-solving'],
  techniques: ['recursion-problem-solving'], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes'], family: 'threshold-search',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 20, status: 'solved', featured: false,
};
const digitMetadata = {
  problemId: 'logic-problem-simplification-004', title: 'Digit Count of a Large Power Without Log Tables',
  description: 'Determine the decimal digit count of a large power by rewriting it near a power of ten and proving strict elementary bounds.',
  date: '2026-08-30', domain: 'Mathematics & Statistics', category: 'Discrete Mathematics',
  subcategories: ['Inequalities', 'Number Sense'],
  tags: ['Powers', 'Bounds', 'Problem Simplification', 'Interview'],
  quantInterviewTopics: root,
  concepts: ['small-cases-recurrence-and-structural-simplification'], techniques: [], prerequisites: [],
  relatedProblems: ['minimum-comparisons-for-both-extremes'], family: 'large-power-bounds',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 15, status: 'solved', featured: false,
};
const comparisonsMetadata = {
  problemId: 'logic-problem-simplification-005', title: 'Minimum Comparisons for Both Extremes',
  description: 'Find both the minimum and maximum of distinct inputs with an optimal paired-comparison algorithm and prove its comparison lower bound.',
  date: '2026-08-30', domain: 'Computer Science', category: 'Algorithms',
  subcategories: ['Comparison Algorithms', 'Lower Bounds'],
  tags: ['Algorithms', 'Comparisons', 'Lower Bounds', 'Interview'],
  quantInterviewTopics: [...root, algorithmRoot, 'algorithmic-complexity'],
  concepts: ['small-cases-recurrence-and-structural-simplification'], techniques: [], prerequisites: [],
  relatedProblems: ['two-egg-threshold-search'], family: 'comparison-extremes',
  mathDifficulty: 2, insightDifficulty: 3, interviewDifficulty: 3,
  estimatedMinutes: 18, status: 'solved', featured: false,
};

const compact = (text) => text.replace(/\s+/g, '').replace(/\\/g, '');
const hasFormula = (text, formula) => assert.equal(compact(text).includes(compact(formula)), true, formula);

test('two-resource threshold search proves and attains fourteen tests', async () => {
  const { text, metadata } = await page('src/content/problems/logic/two-egg-threshold-search.md');
  assert.deepEqual(metadata, eggMetadata);
  assert.match(text, /deterministic.*threshold/i);
  assert.match(text, /survives?.*at or below|destroyed.*above/i);
  const body = solution(text);
  hasFormula(body, 'h_e(d)=1+h_(e-1)(d-1)+h_e(d-1)');
  hasFormula(body, 'h_2(d)=d(d+1)/2');
  assert.match(body, /h.?2\(13\).*91.*100.*105.*h.?2\(14\)/is);
  assert.match(body, /14.*13.*12.*11|decreasing.*step/i);
  assert.match(body, /worst.case.*14|14.*worst.case/i);
});

test('large-power digit count proves the strict 210-digit interval', async () => {
  const { text, metadata } = await page('src/content/problems/logic/large-power-digit-count-without-log-tables.md');
  assert.deepEqual(metadata, digitMetadata);
  const body = solution(text);
  hasFormula(body, '125^100=10^210/1.024^30');
  hasFormula(body, '1<1.024^30<10');
  hasFormula(body, '10^209<125^100<10^210');
  assert.match(body, /210 digits/i);
  assert.match(body, /binomial|geometric bound/i);
  assert.doesNotMatch(body, /log_?10\s*\(?125\)?\s*≈|calculator/i);
});

test('paired comparisons attain and prove the optimal extremes bound', async () => {
  const { text, metadata } = await page('src/content/problems/logic/minimum-comparisons-for-both-extremes.md');
  assert.deepEqual(metadata, comparisonsMetadata);
  const body = solution(text);
  hasFormula(body, 'ceil(3n/2)-2');
  assert.match(body, /even n/i);
  assert.match(body, /odd n/i);
  assert.match(body, /pair.*smaller.*minimum|larger.*maximum/is);
  assert.match(body, /lower bound|adversary|certificate/i);
  assert.match(body, /optimal/i);
});

test('algorithmic simplification Problems are S3+, complete, and source-neutral', async () => {
  for (const path of ['src/content/problems/logic/two-egg-threshold-search.md', 'src/content/problems/logic/large-power-digit-count-without-log-tables.md', 'src/content/problems/logic/minimum-comparisons-for-both-extremes.md']) {
    const { text, metadata } = await page(path);
    solution(text);
    assert.equal(metadata.insightDifficulty >= 3 || metadata.interviewDifficulty >= 3, true);
    assert.equal((text.match(/<summary>Hint [12]<\/summary>/g) ?? []).length, 2);
    assert.doesNotMatch(text, /150 Most Frequently Asked|Faberg|Question (?:8|16|23)|solution page|PDF page|source item/i);
  }
});
