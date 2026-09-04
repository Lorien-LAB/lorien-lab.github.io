import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { load as loadYaml } from 'js-yaml';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(
  testDirectory,
  '..',
  'src',
  'content',
  'problems',
  'logic',
  'alternating-geometric-resource-allocation.md',
);

const expectedMetadata = {
  problemId: 'logic-logical-deduction-014',
  title: 'Alternating Geometric Resource Allocation',
  description:
    'Derive finite and infinite shares when two participants alternately take fixed fractions of a remaining resource.',
  date: '2026-09-05',
  domain: 'Mathematics & Statistics',
  category: 'Calculus',
  subcategories: ['Infinite Series', 'Geometric Series'],
  tags: ['Logical Deduction', 'Geometric Series', 'Limits', 'Interview'],
  quantInterviewTopics: [
    'logic-brainteasers-discrete-reasoning',
    'logical-deduction',
    'calculus-differential-equations',
    'limits-derivatives',
  ],
  concepts: [
    'positive-series-convergence',
    'small-cases-recurrence-and-structural-simplification',
  ],
  techniques: [],
  prerequisites: [],
  relatedProblems: [],
  family: 'alternating-geometric-allocation',
  mathDifficulty: 2,
  insightDifficulty: 3,
  interviewDifficulty: 3,
  estimatedMinutes: 15,
  status: 'solved',
  featured: false,
};

const parsePage = (page) => {
  const match = page.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, 'page must contain YAML front matter followed by Markdown');
  return { metadata: loadYaml(match[1]), body: match[2] };
};

const assertAllocationDerivation = (body) => {
  assert.match(body, /r\s*=\s*\(1-a\)\(1-b\)/, 'round multiplier must be r=(1-a)(1-b)');
  assert.match(body, /0\s*<\s*r\s*<\s*1/, 'solution must prove the ratio lies strictly between zero and one');
  assert.match(
    body,
    /A_N\s*=\s*a\(1\+r\+\\cdots\+r\^\{N-1\}\)\s*=\s*a\\frac\{1-r\^N\}\{1-r\}/,
    'first participant must have the exact finite geometric sum',
  );
  assert.match(
    body,
    /B_N\s*=\s*\(1-a\)b\(1\+r\+\\cdots\+r\^\{N-1\}\)\s*=\s*\(1-a\)b\\frac\{1-r\^N\}\{1-r\}/,
    'second participant must have the exact finite geometric sum',
  );
  assert.match(body, /R_N\s*=\s*r\^N/, 'finite remainder must be r^N');
  assert.match(
    body,
    /A_\\infty\s*=\s*\\frac\{a\}\{1-r\}\s*=\s*\\frac\{a\}\{a\+b-ab\}/,
    'solution must take the first finite sum to its correct limit',
  );
  assert.match(
    body,
    /B_\\infty\s*=\s*\\frac\{\(1-a\)b\}\{1-r\}\s*=\s*\\frac\{\(1-a\)b\}\{a\+b-ab\}/,
    'solution must take the second finite sum to its correct limit',
  );
  assert.match(body, /a\+\(1-a\)b\s*=\s*1-r/, 'solution must identify one round plus remainder');
  assert.match(body, /A_N\+B_N\+R_N\s*=\s*1/, 'solution must check finite-round conservation');
};

test('publishes the alternating geometric allocation problem with finite and infinite derivations', async () => {
  const page = await readFile(pagePath, 'utf8');
  const { metadata, body } = parsePage(page);
  assert.deepEqual(metadata, expectedMetadata);

  for (const heading of [
    '## Problem',
    '## Think Before Revealing',
    '## Solution',
    '## Why This Problem Matters',
    '## Common Mistakes',
    '## Extensions',
  ]) {
    assert.match(body, new RegExp(`^${heading}$`, 'm'), `missing ${heading}`);
  }

  const disclosure = '<summary>Show Solution</summary>';
  const disclosureIndex = body.indexOf(disclosure);
  assert.ok(disclosureIndex > 0, 'solution disclosure must follow the hints');
  const beforeDisclosure = body.slice(0, disclosureIndex);
  const hintMatches = [...beforeDisclosure.matchAll(/<summary>Hint\b[^<]*<\/summary>/g)];
  assert.deepEqual(
    hintMatches.map((match) => match[0]),
    ['<summary>Hint 1</summary>', '<summary>Hint 2</summary>'],
    'there must be exactly two numbered hints',
  );
  assert.doesNotMatch(beforeDisclosure, /A_N\s*=|B_N\s*=|A_\\infty|B_\\infty|2\s*\/\s*3|1\s*\/\s*3/);

  assertAllocationDerivation(body);
  assert.match(body, /equal-half case/i, 'equal halves must be identified as a specialization');
  assert.match(body, /a=b=\\frac\{1\}\{2\}/, 'the equal-half specialization must set both fractions');
  assert.match(body, /A_\\infty\s*=\s*\\frac\{2\}\{3\}/, 'equal halves give first share two thirds');
  assert.match(body, /B_\\infty\s*=\s*\\frac\{1\}\{3\}/, 'equal halves give second share one third');
  assert.match(body, /not universal|not always/i, 'the equal-half shares must not be presented as universal');
  assert.doesNotMatch(
    body,
    /split into two thirds and one third is only the equal-half case/i,
    'equal halves are a familiar specialization, not the unique parameters producing those shares',
  );
});

test('keeps independently calculated finite and limiting shares conservative', () => {
  const shares = (a, b, rounds) => {
    const r = (1 - a) * (1 - b);
    const factor = (1 - r ** rounds) / (1 - r);
    return { first: a * factor, second: (1 - a) * b * factor, remainder: r ** rounds };
  };

  assert.deepEqual(shares(0.5, 0.5, 1), { first: 0.5, second: 0.25, remainder: 0.25 });
  assert.ok(Math.abs(shares(0.5, 0.5, 20).first - 2 / 3) < 1e-12);
  assert.ok(Math.abs(shares(0.5, 0.5, 20).second - 1 / 3) < 1e-12);
  const alternative = shares(1 / 3, 1 / 4, 80);
  assert.ok(Math.abs(alternative.first - 2 / 3) < 1e-12);
  assert.ok(Math.abs(alternative.second - 1 / 3) < 1e-12);
  for (const [a, b] of [[0.2, 0.3], [0.8, 0.1]]) {
    const { first, second, remainder } = shares(a, b, 12);
    assert.ok(Math.abs(first + second + remainder - 1) < 1e-12);
  }
});

test('rejects a wrong round ratio or a missing finite remainder', () => {
  const correct = `
r=(1-a)(1-b)
A_N=a(1+r+\\cdots+r^{N-1})=a\\frac{1-r^N}{1-r}
B_N=(1-a)b(1+r+\\cdots+r^{N-1})=(1-a)b\\frac{1-r^N}{1-r}
R_N=r^N
0<r<1
A_\\infty=\\frac{a}{1-r}=\\frac{a}{a+b-ab}
B_\\infty=\\frac{(1-a)b}{1-r}=\\frac{(1-a)b}{a+b-ab}
a+(1-a)b=1-r
A_N+B_N+R_N=1
`;

  assert.doesNotThrow(() => assertAllocationDerivation(correct));
  assert.throws(() => assertAllocationDerivation(correct.replace('(1-a)(1-b)', 'ab')), /round multiplier/);
  assert.throws(() => assertAllocationDerivation(correct.replace('R_N=r^N\n', '')), /finite remainder/);
});
