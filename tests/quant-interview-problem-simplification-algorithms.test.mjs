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

const compact = (text) => text
  .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
  .replace(/\\frac\s*([A-Za-z])\s*([0-9A-Za-z])/g, '$1/$2')
  .replace(/\\left|\\right/g, '')
  .replace(/\\lceil/g, 'ceil(')
  .replace(/\\rceil/g, ')')
  .replace(/\\lfloor/g, 'floor(')
  .replace(/\\rfloor/g, ')')
  .replace(/[{}\\\s]/g, '');
const hasFormula = (text, formula) => assert.equal(compact(text).includes(compact(formula)), true, formula);

function scheduleFromSolution(body) {
  const block = body.match(/resulting test levels are\s*\$\$([\s\S]*?)\$\$/i)?.[1];
  assert.ok(block, 'missing executable threshold schedule');
  return [...block.matchAll(/\d+/g)].map((match) => Number(match[0]));
}

function decreasingStepSchedule(maxLevel, tests) {
  const schedule = [];
  let level = 0;
  for (let step = tests; level < maxLevel; step -= 1) {
    assert.ok(step > 0, 'test budget must cover every level');
    level = Math.min(maxLevel, level + step);
    schedule.push(level);
  }
  return schedule;
}

function runThresholdSchedule(schedule, threshold) {
  let knownSafe = 0;
  let tests = 0;

  for (const level of schedule) {
    tests += 1;
    if (level <= threshold) {
      knownSafe = level;
      continue;
    }

    for (let candidate = knownSafe + 1; candidate < level; candidate += 1) {
      tests += 1;
      if (candidate > threshold) return { inferred: candidate - 1, tests };
      knownSafe = candidate;
    }
    return { inferred: level - 1, tests };
  }

  return { inferred: knownSafe, tests };
}

function strictPowerIntervals(body) {
  const normalized = compact(body).replace(/[{}]/g, '');
  return [...normalized.matchAll(/10\^(\d+)<125\^(\d+)<10\^(\d+)/g)]
    .map((match) => match.slice(1).map(Number));
}

function optimalComparisonCount(n) {
  if (n % 2 === 0) {
    const pairs = n / 2;
    return pairs + (pairs - 1) + (pairs - 1);
  }
  return 3 * ((n - 1) / 2);
}

function adversaryLowerBound(n) {
  const maximumUntouchedPairs = Math.floor(n / 2);
  const classificationComparisons = n - maximumUntouchedPairs;
  const candidateEliminations = n - 2;
  return classificationComparisons + candidateEliminations;
}

test('two-resource threshold search defines every state and terminal inference', async () => {
  const { text, metadata } = await page('src/content/problems/logic/two-egg-threshold-search.md');
  assert.deepEqual(metadata, eggMetadata);
  const problem = text.split(/^## Think Before Revealing$/m)[0];
  assert.match(problem, /T\s*(?:\\in|∈)\s*\\?\{0,\s*\\ldots,\s*100\\?\}/i);
  assert.match(problem, /T\s*=\s*0.*no physical level is safe/i);
  assert.match(text, /survives?.*at or below|destroyed.*above/i);
  const body = solution(text);
  assert.match(body, /h_e\(d\).*known-safe sentinel/is);
  assert.match(body, /destroyed at level.*infer.*T.*one less|infer.*T.*destroyed level.*minus one/is);
  assert.match(body, /all remaining.*survive.*infer/is);
  assert.match(body, /survives through level 100.*infer.*T\s*=\s*100/is);
});

test('two-resource recurrence maps destruction and survival to the correct subproblems', async () => {
  const { text } = await page('src/content/problems/logic/two-egg-threshold-search.md');
  const body = solution(text);
  assert.match(body, /destroyed[^.]+e-1[^.]+d-1[^.]+lower block/i);
  assert.match(body, /survives[^.]+e[^.]+d-1[^.]+upper block/i);
  hasFormula(body, 'h_e(d)=1+h_(e-1)(d-1)+h_e(d-1)');
  hasFormula(body, 'h_2(d)=d(d+1)/2');
  assert.match(body, /h.?2\(13\).*91.*100.*105.*h.?2\(14\)/is);
});

test('two-resource schedule identifies every threshold from zero through one hundred', async () => {
  const { text } = await page('src/content/problems/logic/two-egg-threshold-search.md');
  const body = solution(text);
  const schedule = scheduleFromSolution(body);
  assert.deepEqual(schedule, decreasingStepSchedule(100, 14));
  const results = [];
  for (let threshold = 0; threshold <= 100; threshold += 1) {
    const result = runThresholdSchedule(schedule, threshold);
    assert.equal(result.inferred, threshold, `T=${threshold} inferred exactly`);
    assert.ok(result.tests <= 14, `T=${threshold} uses ${result.tests} tests`);
    results.push(result.tests);
  }
  assert.equal(Math.max(...results), 14);
});

test('large-power digit count proves the strict 210-digit interval', async () => {
  const { text, metadata } = await page('src/content/problems/logic/large-power-digit-count-without-log-tables.md');
  assert.deepEqual(metadata, digitMetadata);
  const body = solution(text);
  hasFormula(body, '125^100=10^210/1.024^30');
  hasFormula(body, '1<1.024^30<10');
  const intervals = strictPowerIntervals(body);
  assert.ok(intervals.length >= 2, 'display and plain-text strict intervals must both be present');
  for (const interval of intervals) assert.deepEqual(interval, [209, 100, 210]);

  const value = 125n ** 100n;
  const lower = 10n ** 209n;
  const upper = 10n ** 210n;
  assert.equal(String(value).length, 210);
  assert.ok(lower < value, 'strict lower inequality');
  assert.ok(value < upper, 'strict upper inequality');
  assert.match(body, /binomial|geometric bound/i);
  assert.doesNotMatch(body, /log_?10\s*\(?125\)?\s*≈|calculator/i);
});

test('paired comparisons attain and prove the optimal extremes bound', async () => {
  const { text, metadata } = await page('src/content/problems/logic/minimum-comparisons-for-both-extremes.md');
  assert.deepEqual(metadata, comparisonsMetadata);
  const body = solution(text);
  hasFormula(body, 'ceil(3n/2)-2');
  hasFormula(body, 'm+(m-1)+(m-1)=3m-2=3n/2-2');
  hasFormula(body, '3m=3(n-1)/2=ceil(3n/2)-2');
  hasFormula(body, 'x+(n-2x)=n-x');
  hasFormula(body, '(n-x)+(n-2)=2n-x-2');
  hasFormula(body, '2n-floor(n/2)-2=ceil(3n/2)-2');
  assert.match(body, /pair[^.]+smaller[^.]+minimum[^.]+larger[^.]+maximum/is);
  assert.match(body, /unpaired[^.]+initialize[^.]+minimum[^.]+maximum/is);
  assert.match(body, /classifying all inputs requires at least/is);
  assert.match(body, /candidate eliminations in total/is);

  for (let n = 2; n <= 101; n += 1) {
    const closedForm = Math.ceil((3 * n) / 2) - 2;
    assert.equal(optimalComparisonCount(n), closedForm, `algorithm n=${n}`);
    assert.equal(adversaryLowerBound(n), closedForm, `lower bound n=${n}`);
  }
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
