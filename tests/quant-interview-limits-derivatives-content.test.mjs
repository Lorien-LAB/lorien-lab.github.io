import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const topicArray = ['calculus-differential-equations', 'limits-derivatives'];
const publicBoundary = /Green Book|Red Book|150 Most Frequently Asked|source item|source section|PDF page|question page|solution page|coverage ledger|merged-duplicate/i;

async function readPage(file) {
  const text = await readFile(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  assert.ok(match, `${file} missing YAML frontmatter`);
  return { text, frontmatter: match[1] };
}

function scalar(frontmatter, field) {
  return frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))?.[1]?.trim();
}

function inlineArray(frontmatter, field) {
  const value = scalar(frontmatter, field);
  if (value === '[]') return [];
  const match = value?.match(/^\[([^\]]*)\]$/);
  assert.ok(match, `${field} must use an inline YAML array`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function normalizedMath(value) {
  return value
    .replace(/\r/g, '')
    .replace(/\s+/g, '');
}

function assertMath(text, expected, label) {
  assert.ok(
    normalizedMath(text).includes(normalizedMath(expected)),
    `${label} missing exact mathematical contract: ${expected}`,
  );
}

function assertBefore(text, first, second, label) {
  const firstIndex = text.search(first);
  const secondIndex = text.search(second);
  assert.ok(firstIndex >= 0 && secondIndex >= 0 && firstIndex < secondIndex, label);
}

function disclosureBody(text, summary) {
  const escaped = summary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = text.match(new RegExp(`<details>\\s*<summary>${escaped}<\\/summary>([\\s\\S]*?)<\\/details>`));
  assert.ok(match, `missing ${summary} disclosure body`);
  return match[1].trim();
}

function solutionBody(text) {
  const disclosure = disclosureBody(text, 'Show Solution');
  const match = disclosure.match(/^## Solution\s*$([\s\S]*?)(?=^## Why This Matters\s*$)/m);
  assert.ok(match, 'Show Solution disclosure missing an extractable Solution section');
  return match[1].trim();
}

function subsectionBody(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const marker = new RegExp(`^### ${escaped}\\s*$`, 'm');
  const start = text.search(marker);
  assert.ok(start >= 0, `missing subsection ${heading}`);
  const bodyStart = text.indexOf('\n', start) + 1;
  const tail = text.slice(bodyStart);
  const next = tail.search(/^### /m);
  return (next < 0 ? tail : tail.slice(0, next)).trim();
}

function sectionBody(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const marker = new RegExp(`^## ${escaped}\\s*$`, 'm');
  const start = text.search(marker);
  assert.ok(start >= 0, `missing section ${heading}`);
  const bodyStart = text.indexOf('\n', start) + 1;
  const tail = text.slice(bodyStart);
  const next = tail.search(/^## /m);
  return (next < 0 ? tail : tail.slice(0, next)).trim();
}

function assertPublicBoundary(text, frontmatter, slug) {
  assert.doesNotMatch(text, publicBoundary, `${slug} exposes private source/audit identity`);
  assert.doesNotMatch(
    frontmatter,
    /^(?:originType|source|sourceSection|sourceChapter|sourceProblem|sourceReference|sourceUrl):/m,
    `${slug} exposes provenance frontmatter`,
  );
}

function assertNoUnprotectedTeX(text, slug) {
  const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  assert.ok(frontmatter, `${slug} missing frontmatter boundary`);
  const body = text.slice(frontmatter[0].length);
  const protectedMath = [
    ...[...body.matchAll(/\\\[([\s\S]*?)\\\]/g)].map((match) => match[1]),
    ...[...body.matchAll(/\$((?:\\.|[^$\\])*)\$/g)].map((match) => match[1]),
  ];
  const prose = body
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\$(?:\\.|[^$\\])*\$/g, '');
  assert.doesNotMatch(prose, /\\[A-Za-z]+/, `${slug} contains raw TeX command outside math delimiters`);
  assert.doesNotMatch(
    prose,
    /[\p{L}\p{N})\]}](?:_(?:\{[^}\n]+\}|[\p{L}\p{N}])|\^(?:\{[^}\n]+\}|[+\-\p{L}\p{N}]))/u,
    `${slug} contains raw TeX subscript or superscript outside math delimiters`,
  );
  for (const math of protectedMath) {
    assert.doesNotMatch(math, /\\[A-Za-z]+/, `${slug} contains a TeX command that the Markdown renderer would leak`);
    assert.doesNotMatch(math, /(?<!\\)_/, `${slug} contains an unescaped subscript that Markdown could parse as emphasis`);
  }
}

function assertKnowledgePage(page, expected) {
  const { text, frontmatter } = page;
  assert.equal(scalar(frontmatter, 'title'), expected.title);
  assert.equal(scalar(frontmatter, 'description'), expected.description);
  assert.equal(scalar(frontmatter, 'date'), '2026-08-24');
  assert.equal(scalar(frontmatter, 'type'), 'concept');
  assert.equal(scalar(frontmatter, 'domain'), 'Mathematics & Statistics');
  assert.equal(scalar(frontmatter, 'category'), expected.category);
  assert.equal(scalar(frontmatter, 'status'), 'growing');
  assert.deepEqual(inlineArray(frontmatter, 'tags'), expected.tags);
  assert.deepEqual(inlineArray(frontmatter, 'quantInterviewTopics'), topicArray);
  assert.equal(scalar(frontmatter, 'featured'), 'false');
  assert.deepEqual(inlineArray(frontmatter, 'related'), expected.related);
  assert.deepEqual(inlineArray(frontmatter, 'relatedNotes'), []);
  assert.match(text, /^## Common Mistakes$/m);
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /^## Recognition Signals$/m);
  assertPublicBoundary(text, frontmatter, expected.slug);
}

function assertProblemPage(page, expected) {
  const { text, frontmatter } = page;
  assert.equal(scalar(frontmatter, 'problemId'), expected.problemId);
  assert.equal(scalar(frontmatter, 'title'), expected.title);
  assert.doesNotMatch(expected.title, /[$\\{}^]/, `${expected.problemId} title contains math notation`);
  assert.equal(scalar(frontmatter, 'description'), expected.description);
  assert.equal(scalar(frontmatter, 'date'), '2026-08-24');
  assert.equal(scalar(frontmatter, 'domain'), 'Mathematics & Statistics');
  assert.equal(scalar(frontmatter, 'category'), 'Calculus');
  for (const field of ['subcategories', 'tags', 'concepts', 'techniques', 'prerequisites', 'relatedProblems']) {
    assert.deepEqual(inlineArray(frontmatter, field), expected[field], `${expected.problemId} ${field}`);
  }
  assert.deepEqual(inlineArray(frontmatter, 'quantInterviewTopics'), topicArray);
  assert.equal(scalar(frontmatter, 'family'), expected.family);
  for (const field of ['mathDifficulty', 'insightDifficulty', 'interviewDifficulty', 'estimatedMinutes']) {
    assert.equal(Number(scalar(frontmatter, field)), expected[field], `${expected.problemId} ${field}`);
  }
  assert.equal(scalar(frontmatter, 'status'), 'solved');
  assert.equal(scalar(frontmatter, 'featured'), 'false');
  for (const heading of ['## Problem', '## Think Before Revealing']) assert.match(text, new RegExp(`^${heading}$`, 'm'));
  const hint1 = disclosureBody(text, 'Hint 1');
  const hint2 = disclosureBody(text, 'Hint 2');
  assert.ok(hint1.length >= 30, `${expected.problemId} Hint 1 is not substantive`);
  assert.ok(hint2.length >= 30, `${expected.problemId} Hint 2 is not substantive`);
  assert.notEqual(normalizedMath(hint1), normalizedMath(hint2), `${expected.problemId} hints must be distinct`);
  const solutionStart = text.indexOf('<summary>Show Solution</summary>');
  assert.ok(solutionStart >= 0, `${expected.problemId} missing Show Solution disclosure`);
  const solution = text.slice(solutionStart);
  for (const heading of ['## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.match(solution, new RegExp(`^${heading}$`, 'm'), `${expected.problemId} solution disclosure missing ${heading}`);
  }
  assertPublicBoundary(text, frontmatter, expected.problemId);
}

test('core derivative Knowledge freezes first-principles rules and the x ln x Interview Check', async () => {
  const page = await readPage('src/content/knowledge/concepts/derivative-definition-and-core-rules.md');
  assertKnowledgePage(page, {
    slug: 'derivative-definition-and-core-rules',
    title: 'Derivative Definition and Core Rules',
    description: 'Define the single-variable derivative from first principles, apply the core differentiation rules with their domain conditions, and recognize endpoint and continuity boundaries.',
    category: 'Calculus',
    tags: ['Calculus', 'Derivatives', 'Interview'],
    related: ['logarithmic-differentiation', 'monotonicity-convexity-critical-points-and-inflection', 'indeterminate-limits-and-growth-rates', 'related-rates-and-implicit-differentiation'],
  });
  assertMath(page.text, "f'(x) = lim(h → 0) (f(x+h) - f(x))/h", 'difference quotient');
  assert.match(page.text, /differentiability implies continuity/i);
  assert.match(page.text, /not conversely|converse.*false/i);
  assert.match(page.text, /one-sided|endpoint/i);
  for (const rule of [/linearity/i, /product rule/i, /quotient rule/i, /chain rule/i, /fixed-power/i, /generalized[ -]power/i]) assert.match(page.text, rule);
  assert.match(page.text, /denominator.*nonzero|g\(x\).*not.*0/i);
  const fixedPowers = sectionBody(page.text, 'Fixed and Generalized Powers');
  assert.match(
    fixedPowers,
    /^(?=[\s\S]*(?:fixed|general|arbitrary) real[\s\S]*x\s*>\s*0)(?=[\s\S]*\binteger\b[\s\S]*(?:extends?|extension|all real|negative (?:base|bases|x)))(?=[\s\S]*\brational\b[\s\S]*(?:reduced|denominator|parity|odd|even|domain))[\s\S]*$/i,
    'fixed real powers need the safe x > 0 domain and distinct integer/rational extensions',
  );
  assertMath(page.text, 'd/dx (e^x) = e^x', 'exponential derivative');
  assertMath(page.text, 'd/dx (ln x) = 1/x for x > 0', 'logarithm derivative and domain');
  assertMath(page.text, 'd/dx (sin x) = cos x', 'sine derivative');
  assertMath(page.text, 'd/dx (cos x) = -sin x', 'cosine derivative');
  assertMath(page.text, 'd/dx (tan x) = sec^2 x; cos x ≠ 0', 'tangent derivative and domain');
  assertMath(page.text, 'lim(x → 0) (sin x)/x = 1', 'sine standard limit');
  assertMath(page.text, 'lim(x → 0) (e^x - 1)/x = 1', 'exponential standard limit');
  assertMath(page.text, 'd/dx (x ln x) = ln x + 1 for x > 0', 'x ln x Interview Check and domain');
});

test('logarithmic differentiation Knowledge freezes the positive-base domain and both checks', async () => {
  const page = await readPage('src/content/knowledge/concepts/logarithmic-differentiation.md');
  assertKnowledgePage(page, {
    slug: 'logarithmic-differentiation',
    title: 'Logarithmic Differentiation',
    description: 'Differentiate positive variable-base and variable-exponent functions by taking logarithms, tracking domains, and restoring the original function.',
    category: 'Problem Solving Techniques',
    tags: ['Calculus', 'Derivatives', 'Problem Solving'],
    related: ['derivative-definition-and-core-rules'],
  });
  const logIdentity = /ln y\s*=\s*v ln u/;
  assertBefore(page.text, /u:\s*I\s*→\s*\(0,\s*\+∞\)/, logIdentity, 'u:I to positive reals must precede logarithms');
  assertBefore(page.text, /u:\s*I\s*→\s*\(0,\s*\+∞\)\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'u differentiability must independently precede logarithms');
  assertBefore(page.text, /v:\s*I\s*→\s*ℝ/, logIdentity, 'v:I to real values must precede logarithms');
  assertBefore(page.text, /v:\s*I\s*→\s*ℝ\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'v differentiability must independently precede logarithms');
  const factors = sectionBody(page.text, 'Products and Quotients of Many Factors');
  const productLogIdentity = /ln y\s*=\s*∑\(j\s*=\s*1\s+to\s+m\)\s*ln u\\_j/;
  assertBefore(
    factors,
    /u\\_j:\s*I\s*→\s*\(0,\s*\+∞\)\$?\s+be\s+differentiable\s+for\s+every/i,
    productLogIdentity,
    'each differentiable product factor must be positive before logarithms',
  );
  assertBefore(
    factors,
    /every individual factor satisfies \$u\\_j\(x\)>0\$/i,
    productLogIdentity,
    'each product-factor value must be strictly positive before logarithms',
  );
  const quotientLogIdentity =
    /ln q\s*=\s*∑\(j\s*=\s*1\s+to\s+m\)\s*ln a\\_j\s*-\s*∑\(k\s*=\s*1\s+to\s+n\)\s*ln b\\_k/;
  assertBefore(
    factors,
    /every numerator factor \$a\\_j:\s*I\s*→\s*\(0,\s*\+∞\)\$ is differentiable/i,
    quotientLogIdentity,
    'every numerator factor must be differentiable and positive before quotient logarithms',
  );
  assertBefore(
    factors,
    /every denominator factor \$b\\_k:\s*I\s*→\s*\(0,\s*\+∞\)\$ is differentiable/i,
    quotientLogIdentity,
    'every denominator factor must be differentiable and positive before quotient logarithms',
  );
  assertBefore(factors, /each \$a\\_j\(x\)>0\$/i, quotientLogIdentity, 'numerator values must be strictly positive');
  assertBefore(factors, /each \$b\\_k\(x\)>0\$/i, quotientLogIdentity, 'denominator values must be strictly positive');
  assertMath(
    factors,
    "q'/q = ∑(j = 1 to m) (a\\_j'/a\\_j) - ∑(k = 1 to n) (b\\_k'/b\\_k)",
    'quotient logarithmic derivative signs',
  );
  assert.match(factors, /only denominator-factor terms enter with a minus sign/i);
  assertMath(page.text, "y' = u^v(v' ln u + v(u'/u))", 'general logarithmic derivative');
  assertMath(page.text, 'd/dx (x^x) = x^x(ln x + 1) for x > 0', 'x^x derivative and domain');
  assertMath(page.text, 'd/dx ((ln x)^(ln x)) = (((ln x)^(ln x))/x)(ln ln x + 1) for x > 1', 'log-power derivative and domain');
  assert.match(page.text, /zero or negative bases|negative base.*separate/i);
});

test('Problem 001 derives u^v, visibly asks x^x, and preserves the log-power specialization', async () => {
  const page = await readPage('src/content/problems/calculus/differentiate-variable-base-and-exponent.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-001',
    title: 'Differentiate a Variable Base and Exponent',
    description: 'Derive the generalized derivative for a positive variable base and variable exponent, then apply it to x raised to x and a logarithmic power.',
    subcategories: ['Derivatives', 'Logarithmic Differentiation'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: ['logarithmic-differentiation'],
    prerequisites: [],
    relatedProblems: ['derive-exponential-cosine-derivative-from-definition'],
    family: 'variable-base-variable-exponent',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  const solution = solutionBody(page.text);
  const logIdentity = /ln y\s*=\s*v ln u/;
  assertBefore(solution, /u:\s*I\s*→\s*\(0,\s*\+∞\)/, logIdentity, 'Problem 001 Solution must state u:I to positive reals before logarithms');
  assertBefore(solution, /u:\s*I\s*→\s*\(0,\s*\+∞\)`\s+be\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable u before logarithms');
  assertBefore(solution, /v:\s*I\s*→\s*ℝ/, logIdentity, 'Problem 001 Solution must state v:I to real values before logarithms');
  assertBefore(solution, /v:\s*I\s*→\s*ℝ`\s+be\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable v before logarithms');
  assertMath(solution, "d(u(x)^(v(x)))/dx = u(x)^(v(x)) [v'(x) ln u(x) + v(x)u'(x)/u(x)]", 'Problem 001 general result');
  assert.match(page.text, /differentiate.*xˣ|derivative.*xˣ/i);
  assertMath(solution, 'd(xˣ)/dx = xˣ(ln x + 1), x > 0', 'Problem 001 x^x result and domain');
  assertMath(page.text, 'y = (ln x)^(ln x)', 'Problem 001 log-power prompt');
  assertMath(solution, "y' = [(ln x)^(ln x)/x](ln ln x + 1), x > 1", 'Problem 001 log-power result and domain');
});

test('Problem 010 derives exp(cos x) from the exact Delta_h factorization without Taylor series', async () => {
  const page = await readPage('src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-010',
    title: 'Derive an Exponential-of-Cosine Derivative from the Definition',
    description: 'Derive the derivative of an exponential of cosine directly from its difference quotient and standard elementary limits.',
    subcategories: ['Derivatives', 'First Principles'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['differentiate-variable-base-and-exponent'],
    family: 'derivative-from-definition',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 15,
  });
  const derivation = solutionBody(page.text);
  assertMath(page.text, 'g(x) = exp(cos x)', 'Problem 010 function');
  assertMath(derivation, 'Δₕ = cos(x + h) − cos x', 'Problem 010 Delta definition');
  assertMath(derivation, '(g(x + h) − g(x))/h = exp(cos x) · [(exp(Δₕ) − 1)/Δₕ] · (Δₕ/h)', 'Problem 010 exact factorization');
  assert.match(derivation, /Δₕ\s*=\s*0[\s\S]*limiting extension|limiting interpretation[\s\S]*Δₕ/is);
  assertMath(derivation, 'Δₕ/h = cos x · [(cos h − 1)/h] − sin x · (sin h/h)', 'Problem 010 angle-addition quotient');
  assertMath(derivation, 'lim (h → 0) Δₕ/h = −sin x', 'Problem 010 inner limit');
  assertMath(derivation, 'lim (z → 0) [exp(z) − 1]/z = 1', 'Problem 010 exponential limit');
  assertMath(derivation, 'g′(x) = −sin x · exp(cos x)', 'Problem 010 derivative');
  assert.doesNotMatch(derivation, /Taylor|Maclaurin|big-O|O\(h/i);
  assert.doesNotMatch(page.text, /eˣ\s*·?\s*cos x|exp\(x\)\s*·?\s*cos x/);
});

test('qualitative derivative Knowledge separates critical, curvature, and inflection tests', async () => {
  const page = await readPage('src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md');
  assertKnowledgePage(page, {
    slug: 'monotonicity-convexity-critical-points-and-inflection',
    title: 'Monotonicity, Convexity, Critical Points, and Inflection',
    description: 'Use derivative sign charts and second-derivative sign changes to analyze critical points, monotonicity, convexity, extrema, and inflection.',
    category: 'Calculus',
    tags: ['Calculus', 'Derivatives', 'Convexity'],
    related: ['derivative-definition-and-core-rules'],
  });
  assert.match(page.text, /f'.*=\s*0|f'.*undefined/i);
  assert.match(page.text, /first-derivative sign chart/i);
  assert.match(page.text, /local.*global|global.*local/i);
  assert.match(page.text, /closed interval.*endpoint|endpoint.*closed interval/i);
  const localTests = sectionBody(page.text, 'Second-Derivative Local Tests');
  assert.match(localTests, /f'(?:\(c\))?\s*=\s*0.*f''(?:\(c\))?\s*>\s*0.*local minimum/is);
  assert.match(localTests, /f'(?:\(c\))?\s*=\s*0.*f''(?:\(c\))?\s*<\s*0.*local maximum/is);
  assert.match(localTests, /critical point[^\n]*f''(?:\(c\))?\s*=\s*0[^\n]*inconclusive|f''(?:\(c\))?\s*=\s*0[^\n]*inconclusive[^\n]*critical/i);
  const curvatureTests = sectionBody(page.text, 'Convexity, Concavity, and Inflection');
  assert.match(curvatureTests, /inflection[^\n]*f''(?:\(c\))?\s*=\s*0[^\n]*(?:not sufficient|inconclusive)|f''(?:\(c\))?\s*=\s*0[^\n]*(?:not sufficient|inconclusive)[^\n]*inflection/i);
  assert.match(page.text, /inflection.*sign change|concavity change/i);
  assert.match(page.text, /midpoint convexity/i);
  assertMath(page.text, "F'(x) = 1/(σ√(2π)) exp(-((x-μ)^2)/(2σ^2))", 'Normal density example');
  assert.match(page.text, /F''>0.*x<.*μ|positive.*left.*μ/i);
  assert.match(page.text, /F''<0.*x>.*μ|negative.*right.*μ/i);
});

test('Problem 002 proves the transcendental-power comparison by a full-interval sign chart', async () => {
  const page = await readPage('src/content/problems/calculus/compare-e-pi-power-expressions.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-002',
    title: 'Compare Two Transcendental Powers',
    description: 'Compare two transcendental powers by maximizing the logarithm-over-input function with a first-derivative sign chart.',
    subcategories: ['Derivatives', 'Monotonicity', 'Inequalities'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['exponential-midpoint-convexity'],
    family: 'exponential-inequalities',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assert.equal(scalar(page.frontmatter, 'title'), 'Compare Two Transcendental Powers');
  assert.doesNotMatch(scalar(page.frontmatter, 'title'), /e\^\(π\)|π\^\(e\)|π|\$/i);
  assertMath(page.text, 'f(x) = (ln x)/x', 'comparison function');
  assertMath(page.text, "f'(x) = (1 − ln x)/x²", 'comparison derivative');
  assert.match(page.text, /increases.*\(0,\s*e\)/i);
  assert.match(page.text, /decreases.*\(e,\s*\+∞\)/i);
  assert.match(page.text, /global maximum.*e/i);
  assertMath(page.text, 'e^(π) > π^(e)', 'transcendental comparison');
  assert.match(page.text, /f″\s*=\s*0.*inconclusive|inconclusive.*f″\s*=\s*0/i);
});

test('Problem 007 proves exponential midpoint convexity with the exact equality case', async () => {
  const page = await readPage('src/content/problems/calculus/exponential-midpoint-convexity.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-007',
    title: 'Exponential Midpoint Convexity',
    description: 'Prove the exponential midpoint inequality by strict convexity and identify the equality case exactly.',
    subcategories: ['Derivatives', 'Convexity', 'Inequalities'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['compare-e-pi-power-expressions'],
    family: 'exponential-inequalities',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  assertMath(page.text, '(eᵃ + eᵇ)/2 ≥ exp((a + b)/2)', 'midpoint inequality');
  assertMath(page.text, 'f″(x) = eˣ > 0', 'strict convexity');
  assert.match(page.text, /equality.*(?:if and only if|iff|exactly when).*a\s*=\s*b/i);
});

test('Problem 009 proves the unique Normal-CDF inflection by a sign change', async () => {
  const page = await readPage('src/content/problems/calculus/normal-cdf-inflection-point.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-009',
    title: 'Inflection Point of a Normal CDF',
    description: 'Differentiate a Normal cumulative distribution function and prove its unique inflection point through the sign change of its second derivative.',
    subcategories: ['Derivatives', 'Convexity', 'Probability Functions'],
    tags: ['Calculus', 'Interview'],
    concepts: ['monotonicity-convexity-critical-points-and-inflection', 'derivative-definition-and-core-rules'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'curvature-and-inflection',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  const solution = solutionBody(page.text);
  assertMath(page.text, 'σ > 0', 'Normal scale domain');
  assertMath(solution, 'F′(x) = [1/(σ√(2π))] exp(−(x − μ)²/(2σ²))', 'Normal density');
  assertMath(solution, 'F″(x) = −[(x − μ)/(σ³√(2π))] exp(−(x − μ)²/(2σ²))', 'Normal CDF second derivative');
  const signChart = solution.match(/```text\s*F″\(x\)\s*>\s*0[\s\S]*?F″\(x\)\s*<\s*0[\s\S]*?```/)?.[0];
  assert.ok(signChart, 'Normal CDF Solution missing displayed left/right sign chart');
  assert.match(signChart, /F″(?:\(x\))?\s*>\s*0.*x\s*<\s*μ/is);
  assert.match(signChart, /F″(?:\(x\))?\s*<\s*0.*x\s*>\s*μ/is);
  assertMath(solution, 'x = μ is the unique inflection point', 'unique inflection');
  assert.match(solution, /not merely.*F″|F″.*zero.*not.*enough|sign change.*not merely/i);
});

test('indeterminate-limits Knowledge states the full gate, renewed checks, hierarchy, and signed origin limit', async () => {
  const page = await readPage('src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md');
  assertKnowledgePage(page, {
    slug: 'indeterminate-limits-and-growth-rates',
    title: 'Indeterminate Limits and Growth Rates',
    description: "Evaluate elementary indeterminate limits with algebra, standard limits, and properly gated L'Hopital arguments while comparing logarithmic, polynomial, and exponential growth.",
    category: 'Calculus',
    tags: ['Calculus', 'Limits', 'Asymptotic Growth'],
    related: ['derivative-definition-and-core-rules', 'bounded-monotone-convergence-and-fixed-points', 'positive-series-convergence'],
  });
  assert.match(page.text, /indeterminate.*determined|determined.*indeterminate/i);
  assert.match(page.text, /algebraic simplification/i);
  assert.match(page.text, /rationaliz/i);
  assertMath(page.text, 'lim(x → 0) (sin x)/x = 1', 'sine limit');
  assertMath(page.text, 'lim(x → 0) (e^x - 1)/x = 1', 'exponential limit');
  assertMath(page.text, 'lim(x → 0) (ln(1+x))/x = 1', 'logarithm limit');
  for (const gate of [/punctured neighborhood/i, /g'.*(?:nonzero|not equal to zero|≠\s*0)/i, /0\s*\/\s*0|zero-over-zero/i, /infinity.*infinity/i, /derivative-quotient limit/i]) assert.match(page.text, gate);
  assert.match(page.text, /renew|recheck/i);
  assert.match(page.text, /substitut.*before.*L'H[oô]pital|L'H[oô]pital.*after.*substitut/i);
  assertMath(page.text, 'ln x ≪ x^a ≪ e^(bx)', 'positive-tail growth hierarchy');
  assertMath(page.text, 'x → +∞', 'positive-tail direction');
  assertMath(page.text, 'a > 0', 'positive power parameter');
  assertMath(page.text, 'b > 0', 'positive exponential parameter');
  assertMath(page.text, 'x^a ln x → 0^-', 'signed power-log identity');
  assertMath(page.text, 'x → 0^+', 'signed power-log direction');
  assertMath(page.text, 'a > 0', 'signed power-log domain');
});

test('Problem 003 checks and renews the infinity-over-infinity gate before both differentiations', async () => {
  const page = await readPage('src/content/problems/calculus/exponential-over-polynomial-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-003',
    title: 'Exponential Growth over a Polynomial',
    description: "Evaluate exponential growth over a quadratic by checking and renewing every hypothesis for two L'Hopital steps.",
    subcategories: ['Limits', 'Asymptotic Growth'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['logarithm-power-limit-at-zero'],
    family: 'deterministic-growth-rate-limits',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 2,
    estimatedMinutes: 8,
  });
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### First gate$/m, /^### First application$/m, 'Problem 003 first gate must precede first application');
  assertBefore(solution, /^### First application$/m, /^### Renew the gate$/m, 'Problem 003 must renew after the first application');
  assertBefore(solution, /^### Renew the gate$/m, /^### Second application$/m, 'Problem 003 renewed gate must precede second application');
  const firstGate = subsectionBody(solution, 'First gate');
  assert.match(firstGate, /infinity-over-infinity|\+∞\s*\/\s*\+∞/i);
  assert.match(firstGate, /positive tail|x\s*>\s*0/i);
  assert.match(firstGate, /eˣ.*x².*differentiable|differentiable.*eˣ.*x²/is);
  assert.match(firstGate, /2x.*(?:nonzero|≠\s*0)/i);
  assertMath(firstGate, 'lim (x → +∞) eˣ/(2x) = +∞', 'Problem 003 first derivative-quotient limit');
  const renewedGate = subsectionBody(solution, 'Renew the gate');
  assert.match(renewedGate, /infinity-over-infinity|\+∞\s*\/\s*\+∞/i);
  assert.match(renewedGate, /eˣ.*2x.*differentiable|differentiable.*eˣ.*2x/is);
  assert.match(renewedGate, /denominator derivative.*2.*(?:nonzero|≠\s*0)|2\s*≠\s*0/i);
  assertMath(renewedGate, 'lim (x → +∞) eˣ/2 = +∞', 'Problem 003 second derivative-quotient limit');
  assertMath(solution, 'lim (x → +∞) eˣ/x² = lim (x → +∞) eˣ/(2x) = lim (x → +∞) eˣ/2 = +∞', 'Problem 003 exact result');
});

test('Problem 004 converts the product to a gated quotient and preserves zero from below', async () => {
  const page = await readPage('src/content/problems/calculus/logarithm-power-limit-at-zero.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-004',
    title: 'A Logarithm-Power Limit at Zero',
    description: "Evaluate a one-sided power-logarithm limit with a valid quotient transformation and preserve the sign of the approach to zero.",
    subcategories: ['Limits', 'Asymptotic Growth'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: ['derivative-definition-and-core-rules'],
    relatedProblems: ['exponential-over-polynomial-limit'],
    family: 'deterministic-growth-rate-limits',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 10,
  });
  const solution = solutionBody(page.text);
  assertMath(page.text, 'lim (x → 0⁺) x² ln x', 'Problem 004 prompt');
  assertBefore(solution, /^### Rewrite and right-neighborhood gate$/m, /^### Apply the rule$/m, 'Problem 004 gate must precede application');
  const gate = subsectionBody(solution, 'Rewrite and right-neighborhood gate');
  assertMath(gate, '(ln x)/x⁻²', 'Problem 004 quotient');
  assert.match(gate, /−∞.*\+∞|infinity-over-infinity/i);
  assert.match(gate, /0\s*<\s*x\s*<\s*δ|punctured right neighborhood/i);
  assert.match(gate, /ln x.*x⁻².*differentiable|differentiable.*ln x.*x⁻²/is);
  assert.match(gate, /−2x⁻³.*(?:nonzero|≠\s*0)|denominator derivative.*nonzero/i);
  assertMath(gate, 'lim (x → 0⁺) (1/x)/(−2x⁻³) = 0', 'Problem 004 derivative-quotient limit exists');
  assertMath(solution, '(1/x)/(−2x⁻³) = −x²/2 → 0', 'Problem 004 derivative quotient');
  assert.match(solution, /negative.*0\s*<\s*x\s*<\s*1|0\s*<\s*x\s*<\s*1.*negative/is);
  assertMath(solution, '0⁻', 'Problem 004 signed result');
});

test('related-rates Knowledge preserves functions of time, signs, units, and the one-revolution specialization', async () => {
  const page = await readPage('src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md');
  assertKnowledgePage(page, {
    slug: 'related-rates-and-implicit-differentiation',
    title: 'Related Rates and Implicit Differentiation',
    description: 'Differentiate implicit time-dependent constraints, preserve units and signs, and solve elementary geometric related-rate problems.',
    category: 'Problem Solving Techniques',
    tags: ['Calculus', 'Derivatives', 'Related Rates'],
    related: ['derivative-definition-and-core-rules'],
  });
  assert.match(page.text, /functions of time|function.*t/i);
  assert.match(page.text, /chain rule/i);
  assert.match(page.text, /units/i);
  assert.match(page.text, /sign/i);
  assertMath(page.text, 'a > 0', 'lighthouse distance domain');
  assertMath(page.text, 's = a tan θ', 'lighthouse constraint');
  assertMath(page.text, 'cos θ ≠ 0', 'tangent domain');
  assertMath(page.text, 'dθ/dt = 2π', 'one-revolution angular rate');
  assertMath(page.text, 'ds/dt = 2πa sec^2 θ = 2π(a^2+s^2)/a miles per minute', 'Knowledge lighthouse specialization');
});

test('Problem 005 derives the general signed rate and exact one-revolution speed forms', async () => {
  const page = await readPage('src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-005',
    title: 'Rotating Lighthouse Beam Related Rate',
    description: 'Differentiate a lighthouse beam geometry constraint and specialize the signed shore rate to one full revolution per minute.',
    subcategories: ['Derivatives', 'Related Rates', 'Geometry'],
    tags: ['Calculus', 'Interview'],
    concepts: ['derivative-definition-and-core-rules'],
    techniques: ['related-rates-and-implicit-differentiation'],
    prerequisites: [],
    relatedProblems: [],
    family: 'geometric-related-rates',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  assertMath(page.text, 'a > 0', 'Problem 005 a domain');
  assertMath(page.text, 's = a tan θ', 'Problem 005 geometry');
  assertMath(page.text, 'cos θ ≠ 0', 'Problem 005 theta domain');
  assertMath(page.text, 'ds/dt = a sec² θ (dθ/dt)', 'Problem 005 general rate');
  assert.match(page.text, /one full revolution per minute|one revolution per minute/i);
  assertMath(page.text, 'dθ/dt = 2π radians per minute', 'Problem 005 angular specialization');
  assertMath(page.text, 'sec² θ = 1 + tan² θ = 1 + s²/a²', 'Problem 005 equivalent-form identity');
  assertMath(page.text, 'ds/dt = 2πa sec² θ = 2π(a² + s²)/a miles per minute', 'Problem 005 exact specialized result');
  assert.match(page.text, /signed shore coordinate/i);
  assert.match(page.text, /angular rate.*linear speed|linear speed.*angular rate/is);
});

test('Problem 006 preserves coefficient five through exact rationalization to five halves', async () => {
  const page = await readPage('src/content/problems/calculus/radical-difference-limit-at-infinity.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-006',
    title: 'Radical Difference at Infinity',
    description: 'Evaluate a difference of two unbounded radical terms by exact conjugate rationalization instead of subtracting infinite limits.',
    subcategories: ['Limits', 'Rationalization'],
    tags: ['Calculus', 'Interview'],
    concepts: ['indeterminate-limits-and-growth-rates'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'algebraic-limit-transformations',
    mathDifficulty: 2,
    insightDifficulty: 2,
    interviewDifficulty: 2,
    estimatedMinutes: 8,
  });
  assertMath(page.text, '√(x² + 5x) − x = 5x/[√(x² + 5x) + x] = 5/[√(1 + 5/x) + 1]', 'Problem 006 rationalization');
  assertMath(page.text, 'lim (x → +∞) [√(x² + 5x) − x] = 5/2', 'Problem 006 limit');
  assert.match(page.text, /cannot subtract|invalid.*subtract|infinity minus infinity/i);
  assert.ok((normalizedMath(page.text).match(/5/g) ?? []).length >= 4, 'coefficient 5 disappeared during rationalization');
});

test('bounded-monotone Knowledge proves convergence before fixed-point selection', async () => {
  const page = await readPage('src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md');
  assertKnowledgePage(page, {
    slug: 'bounded-monotone-convergence-and-fixed-points',
    title: 'Bounded Monotone Convergence and Fixed Points',
    description: 'Prove real recursive sequences converge through invariant bounds and monotonicity before using continuity to identify admissible fixed points.',
    category: 'Calculus',
    tags: ['Calculus', 'Limits', 'Sequences'],
    related: ['indeterminate-limits-and-growth-rates'],
  });
  assert.match(page.text, /bounded monotone.*converges|monotone.*bounded.*converges/i);
  assert.match(page.text, /invariant interval/i);
  const invariantIntervals = sectionBody(page.text, 'Invariant Intervals and Induction');
  const boundedInvariantInterval = /(?:bounded|compact)[\s\S]{0,60}invariant interval[\s\S]{0,180}(?:both[\s\S]{0,30}(?:finite )?bounds|finite[\s\S]{0,30}(?:upper and lower|lower and upper)[\s\S]{0,30}bounds|(?:upper and lower|lower and upper)[\s\S]{0,30}(?:finite )?bounds)/i.test(invariantIntervals);
  const directionallyCorrectEndpoint = /(?:increasing[\s\S]{0,120}finite upper endpoint|finite upper endpoint[\s\S]{0,120}increasing|decreasing[\s\S]{0,120}finite lower endpoint|finite lower endpoint[\s\S]{0,120}decreasing)/i.test(invariantIntervals);
  assert.ok(
    boundedInvariantInterval || directionallyCorrectEndpoint,
    'invariant intervals need bounded/compact finite bounds or the correct finite endpoint for the monotone direction',
  );
  assert.match(page.text, /induction/i);
  assert.match(page.text, /even and odd subsequences|even.*odd.*subsequence/i);
  assert.match(page.text, /only after convergence|after.*prove.*converg/i);
  assert.match(page.text, /fixed-point equation.*candidate|candidates.*not.*convergence/i);
  assertMath(page.text, 'c\\_0 = 2', 'Knowledge continued-fraction start');
  assertMath(page.text, 'c\\_(n+1) = 2 + 2/(c\\_n)', 'Knowledge continued-fraction recurrence');
  assertMath(page.text, '1 + √3', 'Knowledge continued-fraction limit');
  assert.match(page.text, /nested[ -]radical/i);
  assertMath(page.text, 'x = √2', 'Knowledge tower base');
  assertMath(page.text, 'L = 2', 'Knowledge tower limit');
  assert.match(page.text, /fixed point.*4|branch.*4/i);
});

test('Problem 008 proves alternating-subsequence convergence before selecting one plus sqrt three', async () => {
  const page = await readPage('src/content/problems/calculus/periodic-continued-fraction-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-008',
    title: 'Periodic Continued-Fraction Limit',
    description: 'Prove finite continued-fraction convergents converge through alternating monotone subsequences before selecting the admissible fixed point.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['nested-radical-limit', 'infinite-power-tower-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 4,
    estimatedMinutes: 15,
  });
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Invariant interval$/m, /^### Alternating subsequences$/m, 'Problem 008 invariant proof must precede subsequences');
  assertBefore(solution, /^### Alternating subsequences$/m, /^### A single limit$/m, 'Problem 008 subsequences must precede common-limit proof');
  assertBefore(solution, /^### A single limit$/m, /^### Fixed point and selection$/m, 'Problem 008 convergence must precede fixed point');
  const invariant = subsectionBody(solution, 'Invariant interval');
  assertMath(invariant, 'c₀ = 2', 'Problem 008 start');
  assertMath(invariant, 'c₁ = F(2) = 3', 'Problem 008 first iterate');
  assertMath(invariant, '2 ≤ cₙ ≤ 3', 'Problem 008 invariant');
  assert.match(invariant, /2\s*≤.*2\s*\+\s*2\s*\/.*≤\s*3|maps.*\[2,\s*3\].*into/is);
  const subsequences = subsectionBody(solution, 'Alternating subsequences');
  assertMath(subsequences, 'c₀ = 2 < c₂ = 2 + 2/3 = 8/3', 'Problem 008 even base inequality');
  assert.match(subsequences, /c₂ₙ.*increasing|even subsequence.*increasing/i);
  assert.match(subsequences, /c₂ₙ₊₁.*decreasing|odd subsequence.*decreasing/i);
  assert.match(subsequences, /apply.*decreasing|F.*decreasing/i);
  const common = subsectionBody(solution, 'A single limit');
  assertMath(common, 'b = 2 + 2/a', 'Problem 008 odd-subsequence limit');
  assertMath(common, 'a = 2 + 2/b', 'Problem 008 even-subsequence limit');
  assertMath(common, '(b − a)(1 − 2/(ab)) = 0', 'Problem 008 equal-limits argument');
  assert.match(common, /a,?b.*(?:greater than or equal|≥).*2.*ab.*(?:greater than or equal|≥).*4|ab\s*=\s*2.*impossible/is);
  assert.match(common, /full sequence converges|a\s*=\s*b/i);
  const fixed = subsectionBody(solution, 'Fixed point and selection');
  assertMath(fixed, 'L² − 2L − 2 = 0', 'Problem 008 fixed-point polynomial');
  assertMath(fixed, 'L = 1 ± √3', 'Problem 008 candidate roots');
  assertMath(fixed, 'L = 1 + √3', 'Problem 008 selected limit');
  assert.match(fixed, /(?:positive|positivity).*1\s*−\s*√3.*reject|1\s*−\s*√3.*reject/i);
});

test('Problem 011 proves the nested radical is increasing and bounded before selecting two', async () => {
  const page = await readPage('src/content/problems/calculus/nested-radical-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-011',
    title: 'Nested-Radical Limit',
    description: 'Prove a nested-radical sequence is increasing and bounded before selecting its positive fixed-point limit.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['periodic-continued-fraction-limit', 'infinite-power-tower-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 2,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 12,
  });
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Monotonicity by induction$/m, /^### Upper bound by induction$/m, 'Problem 011 monotonicity must precede bound');
  assertBefore(solution, /^### Upper bound by induction$/m, /^### Convergence$/m, 'Problem 011 bound must precede convergence');
  assertBefore(solution, /^### Convergence$/m, /^### Fixed point$/m, 'Problem 011 convergence must precede fixed point');
  const monotonicity = subsectionBody(solution, 'Monotonicity by induction');
  assertMath(monotonicity, 'a₁ = √2', 'Problem 011 start');
  assertMath(monotonicity, 'aₙ₊₁ = √(2 + aₙ)', 'Problem 011 recurrence');
  assert.match(monotonicity, /a₂.*>.*a₁|base case.*increasing/is);
  assert.match(monotonicity, /aₙ.*>.*aₙ₋₁.*aₙ₊₁.*>.*aₙ|inductive hypothesis.*square root.*increasing/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /a₁.*<.*2|base case.*upper bound/is);
  assert.match(bound, /aₙ.*<.*2.*aₙ₊₁.*<.*2|inductive hypothesis.*upper bound/is);
  const convergence = subsectionBody(solution, 'Convergence');
  assert.match(convergence, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  const fixed = subsectionBody(solution, 'Fixed point');
  assertMath(fixed, 'L = √(2 + L)', 'Problem 011 fixed point');
  assert.match(fixed, /positivity.*−1|reject.*−1/i);
  assertMath(fixed, 'L = 2', 'Problem 011 limit');
});

test('Problem 012 distinguishes requested base sqrt two from tower limit two and rejects branch four', async () => {
  const page = await readPage('src/content/problems/calculus/infinite-power-tower-limit.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-012',
    title: 'Infinite Power-Tower Limit',
    description: 'Find the positive tower base for value two, then prove its finite towers converge to two rather than the other fixed-point branch.',
    subcategories: ['Limits', 'Sequences', 'Fixed Points'],
    tags: ['Calculus', 'Interview'],
    concepts: ['bounded-monotone-convergence-and-fixed-points'],
    techniques: [],
    prerequisites: [],
    relatedProblems: ['periodic-continued-fraction-limit', 'nested-radical-limit'],
    family: 'recursive-sequence-limits',
    mathDifficulty: 3,
    insightDifficulty: 4,
    interviewDifficulty: 4,
    estimatedMinutes: 15,
  });
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Determine the base$/m, /^### Monotonicity by induction$/m, 'Problem 012 base must precede validation');
  assertBefore(solution, /^### Monotonicity by induction$/m, /^### Upper bound by induction$/m, 'Problem 012 monotonicity must precede bound');
  assertBefore(solution, /^### Upper bound by induction$/m, /^### Convergence and branch selection$/m, 'Problem 012 bound must precede fixed point');
  const base = subsectionBody(solution, 'Determine the base');
  assertMath(base, '2 = x²', 'Problem 012 base equation');
  assertMath(base, 'x = √2', 'Problem 012 requested base');
  const monotonicity = subsectionBody(solution, 'Monotonicity by induction');
  assertMath(monotonicity, 't₀ = √2', 'Problem 012 finite-tower start');
  assertMath(monotonicity, 'tₙ₊₁ = (√2) ^ tₙ', 'Problem 012 finite-tower recurrence');
  assert.match(monotonicity, /t₁.*>.*t₀|base case.*increasing/is);
  assert.match(monotonicity, /tₙ.*>.*tₙ₋₁.*tₙ₊₁.*>.*tₙ|inductive hypothesis.*increasing function/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /t₀.*<.*2|base case.*upper bound/is);
  assertMath(bound, 'tₙ₊₁ = (√2) ^ tₙ < (√2)² = 2', 'Problem 012 inductive upper bound');
  const closure = subsectionBody(solution, 'Convergence and branch selection');
  assert.match(closure, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  assertMath(closure, 'L = (√2) ^ L', 'Problem 012 fixed point');
  assert.match(closure, /both.*2.*4|2 and 4.*fixed/i);
  assert.match(closure, /\[0,\s*2\].*g′\(y\).*≤.*ln\s*2\s*−\s*1\s*<\s*0.*strictly decreasing.*unique fixed point/is, 'Problem 012 must prove uniqueness on [0,2] from a strict derivative bound');
  assert.match(closure, /L\s*≤\s*2.*reject.*4|upper bound.*reject.*4/is);
  assertMath(closure, 'L = 2', 'Problem 012 proved tower limit');
  assert.match(solution, /base.*not.*limit|must not be conflated|distinguish.*base.*limit/i);
});

test('positive-series Knowledge supplies elementary proofs for the exact three-series family', async () => {
  const page = await readPage('src/content/knowledge/concepts/positive-series-convergence.md');
  assertKnowledgePage(page, {
    slug: 'positive-series-convergence',
    title: 'Positive-Series Convergence',
    description: 'Classify elementary nonnegative series through partial sums, comparison, telescoping, dyadic grouping, condensation, geometric bounds, and the term test.',
    category: 'Calculus',
    tags: ['Calculus', 'Series', 'Convergence'],
    related: ['indeterminate-limits-and-growth-rates'],
  });
  assert.match(page.text, /bounded increasing partial sums|partial sums.*bounded.*increasing/i);
  assertMath(page.text, 'a\\_n → 0', 'series term test');
  assert.match(page.text, /necessary.*not sufficient|not sufficient.*term/i);
  assertMath(page.text, '∑(k = 0 to N) r^k = (1 - r^(N+1))/(1-r)', 'finite geometric sum');
  assertMath(page.text, '|r|<1', 'infinite geometric criterion');
  assertMath(page.text, '∑(k = 0 to ∞) r^k = 1/(1-r)', 'infinite geometric sum');
  assert.match(page.text, /direct comparison/i);
  assert.match(page.text, /harmonic.*dyadic|dyadic.*harmonic/is);
  assert.match(page.text, /Cauchy condensation/i);
  assert.match(page.text, /positive.*nonincreasing|nonincreasing.*positive/i);
  assertMath(page.text, '1/k^2 ≤ 1/(k(k-1)) = 1/(k-1) - 1/k', 'square-series telescoping comparison');
  assertMath(page.text, 'k ≥ 2', 'square-series comparison domain');
  assertMath(page.text, '2^n/(2^n ln(2^n)) = 1/(n ln 2)', 'log-harmonic condensation');
  assertMath(page.text, '2^(k(1-p))', 'p-series dyadic upper bound');
  assert.match(page.text, /p\s*>\s*1.*converges|converges.*p\s*>\s*1/is);
  assert.match(page.text, /0\s*<\s*p\s*≤\s*1.*diverges|diverges.*0\s*<\s*p/is);
  assert.match(page.text, /p\s*≤\s*0.*terms.*not.*zero|term test.*p\s*≤\s*0/is);
});

test('Problem 013 proves the harmonic square and logarithmic-harmonic classifications without integration', async () => {
  const page = await readPage('src/content/problems/calculus/classify-basic-positive-series.md');
  assertProblemPage(page, {
    problemId: 'limits-derivatives-013',
    title: 'Classify Basic Positive Series',
    description: 'Classify the harmonic, reciprocal-square, and logarithmic-harmonic series with elementary non-integral convergence arguments.',
    subcategories: ['Limits', 'Series', 'Convergence'],
    tags: ['Calculus', 'Interview'],
    concepts: ['positive-series-convergence'],
    techniques: [],
    prerequisites: [],
    relatedProblems: [],
    family: 'positive-series-convergence',
    mathDifficulty: 3,
    insightDifficulty: 3,
    interviewDifficulty: 3,
    estimatedMinutes: 15,
  });
  const solution = solutionBody(page.text);
  assertBefore(solution, /^### Harmonic series: dyadic lower blocks$/m, /^### Reciprocal-square series: telescoping upper bound$/m, 'Problem 013 harmonic proof must come first');
  assertBefore(solution, /^### Reciprocal-square series: telescoping upper bound$/m, /^### Logarithmic-harmonic series: condensation$/m, 'Problem 013 square proof must precede log-harmonic proof');
  const harmonic = subsectionBody(solution, 'Harmonic series: dyadic lower blocks');
  assertMath(harmonic, '∑ (k = 2ᵐ + 1 to 2ᵐ⁺¹) 1/k ≥ 2ᵐ/2ᵐ⁺¹ = 1/2', 'Problem 013 dyadic harmonic block');
  assert.match(harmonic, /infinitely many.*blocks.*one half|partial sums.*unbounded/is);
  assertMath(harmonic, '∑ (k = 1 to +∞) 1/k diverges', 'harmonic classification');
  const square = subsectionBody(solution, 'Reciprocal-square series: telescoping upper bound');
  assertMath(square, '1/k² ≤ 1/[k(k − 1)] = 1/(k − 1) − 1/k', 'Problem 013 telescoping comparison');
  assertMath(square, 'k ≥ 2', 'Problem 013 square comparison domain');
  assertMath(square, '∑ (k = 2 to N) 1/k² ≤ ∑ (k = 2 to N) [1/(k − 1) − 1/k] = 1 − 1/N', 'Problem 013 bounded square partial sums');
  assert.match(square, /increasing.*bounded above.*converges|bounded increasing partial sums/is);
  assertMath(square, '∑ (k = 1 to +∞) 1/k² converges', 'square-series classification');
  const logHarmonic = subsectionBody(solution, 'Logarithmic-harmonic series: condensation');
  assert.match(logHarmonic, /a\[k\].*positive.*decreasing|positive.*nonincreasing/is);
  assert.match(logHarmonic, /k\s*ln k.*increasing|product.*increasing/is);
  assert.match(logHarmonic, /Cauchy condensation/i);
  assertMath(logHarmonic, '2ⁿ a[2ⁿ] = 2ⁿ/[2ⁿ ln(2ⁿ)] = 1/(n ln 2)', 'Problem 013 condensed terms');
  assertMath(logHarmonic, '∑ (n = 1 to +∞) 2ⁿ a[2ⁿ] = (1/ln 2) ∑ (n = 1 to +∞) 1/n', 'Problem 013 exact harmonic comparison chain');
  assert.match(logHarmonic, /constant multiple.*harmonic|compare.*harmonic/i);
  assertMath(logHarmonic, '∑ (k = 2 to +∞) 1/(k ln k) diverges', 'log-harmonic classification');
  assert.doesNotMatch(solution, /integral test|\\int/);
});

async function topicLocalSlugs(root) {
  const files = await readdir(root, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const fullPath = path.join(root, String(file));
    const page = await readPage(fullPath);
    if (
      /^quantInterviewTopics:/m.test(page.frontmatter)
      && JSON.stringify(inlineArray(page.frontmatter, 'quantInterviewTopics')) === JSON.stringify(topicArray)
    ) {
      slugs.push(path.basename(String(file), '.md'));
    }
  }
  return slugs.sort();
}

async function topicFixture(t, frontmatterLines, eol = '\n') {
  const root = await mkdtemp(path.join(tmpdir(), 'limits-derivatives-topics-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(path.join(root, 'fixture.md'), ['---', ...frontmatterLines, '---', ''].join(eol));
  return root;
}

async function assertTopicFieldContracts(t) {
  const root = await topicFixture(t, ['title: Missing topics']);
  assert.deepEqual(await topicLocalSlugs(root), [], 'missing topic field must be skipped');

  const emptyRoot = await topicFixture(t, ['title: Empty topics', 'quantInterviewTopics:'], '\r\n');
  await assert.rejects(
    topicLocalSlugs(emptyRoot),
    /quantInterviewTopics must use an inline YAML array/,
    'present but empty topic field must be rejected',
  );

  const blockListRoot = await topicFixture(t, [
    'title: Block-list topics',
    'quantInterviewTopics:',
    '  - calculus-differential-equations',
    '  - limits-derivatives',
  ]);
  await assert.rejects(
    topicLocalSlugs(blockListRoot),
    /quantInterviewTopics must use an inline YAML array/,
    'topic YAML block list must be rejected',
  );
}

const exactKnowledgeSlugs = [
  'bounded-monotone-convergence-and-fixed-points',
  'derivative-definition-and-core-rules',
  'indeterminate-limits-and-growth-rates',
  'logarithmic-differentiation',
  'monotonicity-convexity-critical-points-and-inflection',
  'positive-series-convergence',
  'related-rates-and-implicit-differentiation',
].sort();

const exactProblemSlugs = [
  'classify-basic-positive-series',
  'compare-e-pi-power-expressions',
  'derive-exponential-cosine-derivative-from-definition',
  'differentiate-variable-base-and-exponent',
  'exponential-midpoint-convexity',
  'exponential-over-polynomial-limit',
  'infinite-power-tower-limit',
  'logarithm-power-limit-at-zero',
  'nested-radical-limit',
  'normal-cdf-inflection-point',
  'periodic-continued-fraction-limit',
  'radical-difference-limit-at-infinity',
  'rotating-lighthouse-beam-related-rate',
].sort();

const exactRendererPages = [
  ['bounded-monotone-convergence-and-fixed-points', 'src/content/knowledge/concepts/bounded-monotone-convergence-and-fixed-points.md'],
  ['derivative-definition-and-core-rules', 'src/content/knowledge/concepts/derivative-definition-and-core-rules.md'],
  ['indeterminate-limits-and-growth-rates', 'src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md'],
  ['logarithmic-differentiation', 'src/content/knowledge/concepts/logarithmic-differentiation.md'],
  ['monotonicity-convexity-critical-points-and-inflection', 'src/content/knowledge/concepts/monotonicity-convexity-critical-points-and-inflection.md'],
  ['positive-series-convergence', 'src/content/knowledge/concepts/positive-series-convergence.md'],
  ['related-rates-and-implicit-differentiation', 'src/content/knowledge/concepts/related-rates-and-implicit-differentiation.md'],
  ['classify-basic-positive-series', 'src/content/problems/calculus/classify-basic-positive-series.md'],
  ['compare-e-pi-power-expressions', 'src/content/problems/calculus/compare-e-pi-power-expressions.md'],
  ['derive-exponential-cosine-derivative-from-definition', 'src/content/problems/calculus/derive-exponential-cosine-derivative-from-definition.md'],
  ['differentiate-variable-base-and-exponent', 'src/content/problems/calculus/differentiate-variable-base-and-exponent.md'],
  ['exponential-midpoint-convexity', 'src/content/problems/calculus/exponential-midpoint-convexity.md'],
  ['exponential-over-polynomial-limit', 'src/content/problems/calculus/exponential-over-polynomial-limit.md'],
  ['infinite-power-tower-limit', 'src/content/problems/calculus/infinite-power-tower-limit.md'],
  ['logarithm-power-limit-at-zero', 'src/content/problems/calculus/logarithm-power-limit-at-zero.md'],
  ['nested-radical-limit', 'src/content/problems/calculus/nested-radical-limit.md'],
  ['normal-cdf-inflection-point', 'src/content/problems/calculus/normal-cdf-inflection-point.md'],
  ['periodic-continued-fraction-limit', 'src/content/problems/calculus/periodic-continued-fraction-limit.md'],
  ['radical-difference-limit-at-infinity', 'src/content/problems/calculus/radical-difference-limit-at-infinity.md'],
  ['rotating-lighthouse-beam-related-rate', 'src/content/problems/calculus/rotating-lighthouse-beam-related-rate.md'],
];

const progressiveHintContracts = new Map([
  ['differentiate-variable-base-and-exponent', {
    hint1: /positivity.*logarithm.*hypotheses.*u.*v/is,
    hint2: /y'\s*\/\s*y.*multiply.*original.*uᵛ/is,
  }],
  ['compare-e-pi-power-expressions', {
    hint1: /f\(x\)\s*=\s*\(ln x\)\/x.*derivative.*sign.*constant/is,
    hint2: /f'.*1\s*−\s*ln x.*decreasing interval.*compare/is,
  }],
  ['exponential-midpoint-convexity', {
    hint1: /f\(x\)\s*=\s*eˣ.*second derivative/is,
    hint2: /strict convexity.*midpoint.*equality/is,
  }],
  ['normal-cdf-inflection-point', {
    hint1: /fundamental theorem.*density.*differentiate/is,
    hint2: /every factor.*except.*x\s*−\s*μ.*positive.*sign table/is,
  }],
  ['exponential-over-polynomial-limit', {
    hint1: /positive tail.*differentiability.*2x.*never vanishes/is,
    hint2: /first application.*eˣ.*2x.*renew.*constant.*2/is,
  }],
  ['logarithm-power-limit-at-zero', {
    hint1: /quotient.*x⁻².*0⁺/is,
    hint2: /differentiate numerator and denominator.*−x²\/2/is,
  }],
  ['rotating-lighthouse-beam-related-rate', {
    hint1: /s\s*=\s*a tan θ.*depend on time/is,
    hint2: /differentiate.*sec² θ.*2π.*1\s*\+\s*s²\/a²/is,
  }],
  ['radical-difference-limit-at-infinity', {
    hint1: /conjugate.*√\(x²\s*\+\s*5x\)\s*\+\s*x/is,
    hint2: /numerator.*5x.*divide.*positive.*x/is,
  }],
  ['derive-exponential-cosine-derivative-from-definition', {
    hint1: /Δₕ.*cos\(x\s*\+\s*h\)\s*−\s*cos x.*rewrite/is,
    hint2: /angle addition.*Δₕ\/h.*−sin x.*exponential/is,
  }],
  ['periodic-continued-fraction-limit', {
    hint1: /maps.*\[2,\s*3\].*c₀\s*<\s*c₂.*two applications/is,
    hint2: /subsequence limits.*a.*b.*subtract.*before solving/is,
  }],
  ['nested-radical-limit', {
    hint1: /monotonicity.*a₂\s*>\s*a₁.*strictly increasing/is,
    hint2: /aₙ\s*<\s*2.*induction.*√\(2\s*\+\s*aₙ\)\s*<\s*√4/is,
  }],
  ['infinite-power-tower-limit', {
    hint1: /2\s*=\s*x².*positive root.*t₀\s*=\s*√2/is,
    hint2: /tₙ.*increasing.*separately.*tₙ\s*<\s*2/is,
  }],
  ['classify-basic-positive-series', {
    hint1: /powers of two.*reciprocal square.*1\/\[k\(k\s*−\s*1\)\]/is,
    hint2: /positivity and decrease.*condensation.*1\/\(n ln 2\)/is,
  }],
]);

test('module contains exactly seven Knowledge and thirteen Problem slugs', async (t) => {
  await assertTopicFieldContracts(t);
  assert.deepEqual(await topicLocalSlugs('src/content/knowledge'), exactKnowledgeSlugs);
  assert.deepEqual(await topicLocalSlugs('src/content/problems'), exactProblemSlugs);
});

test('all seven Knowledge and thirteen Problem pages are renderer-safe', async () => {
  assert.deepEqual(
    exactRendererPages.map(([slug]) => slug).sort(),
    [...exactKnowledgeSlugs, ...exactProblemSlugs].sort(),
    'renderer-safety manifest must cover the exact module slugs',
  );
  const rendererFailures = [];
  for (const [slug, file] of exactRendererPages) {
    try {
      assertNoUnprotectedTeX(await readFile(file, 'utf8'), slug);
    } catch (error) {
      rendererFailures.push(`${slug}: ${String(error.message).split('\n', 1)[0]}`);
    }
  }
  assert.deepEqual(
    rendererFailures,
    [],
    `renderer-safety violations:\n${rendererFailures.join('\n')}`,
  );
});

test('Problem IDs are exactly limits-derivatives-001 through limits-derivatives-013', async () => {
  const ids = [];
  for (const slug of exactProblemSlugs) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    ids.push(scalar(page.frontmatter, 'problemId'));
    assert.doesNotMatch(scalar(page.frontmatter, 'title'), /[$\\{}^]/, `${slug} title must be plain text`);
  }
  assert.deepEqual(ids.sort(), Array.from({ length: 13 }, (_, index) => `limits-derivatives-${String(index + 1).padStart(3, '0')}`));
});

test('module graph and Technique categories are exact', async () => {
  const reciprocalProblems = new Map([
    ['compare-e-pi-power-expressions', ['exponential-midpoint-convexity']],
    ['exponential-midpoint-convexity', ['compare-e-pi-power-expressions']],
    ['exponential-over-polynomial-limit', ['logarithm-power-limit-at-zero']],
    ['logarithm-power-limit-at-zero', ['exponential-over-polynomial-limit']],
    ['periodic-continued-fraction-limit', ['nested-radical-limit', 'infinite-power-tower-limit']],
    ['nested-radical-limit', ['periodic-continued-fraction-limit', 'infinite-power-tower-limit']],
    ['infinite-power-tower-limit', ['periodic-continued-fraction-limit', 'nested-radical-limit']],
    ['differentiate-variable-base-and-exponent', ['derive-exponential-cosine-derivative-from-definition']],
    ['derive-exponential-cosine-derivative-from-definition', ['differentiate-variable-base-and-exponent']],
  ]);
  for (const [slug, expected] of reciprocalProblems) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    assert.deepEqual(inlineArray(page.frontmatter, 'relatedProblems'), expected, `${slug} graph`);
  }
  for (const slug of ['logarithmic-differentiation', 'related-rates-and-implicit-differentiation']) {
    const page = await readPage(`src/content/knowledge/concepts/${slug}.md`);
    assert.equal(scalar(page.frontmatter, 'category'), 'Problem Solving Techniques');
  }
});

test('every module page remains source-neutral and every Problem remains S3+', async () => {
  for (const slug of exactKnowledgeSlugs) {
    const page = await readPage(`src/content/knowledge/concepts/${slug}.md`);
    assertPublicBoundary(page.text, page.frontmatter, slug);
    assert.match(page.text, /^## Common Mistakes$/m);
    assert.match(page.text, /^## Interview Checks$/m);
  }
  for (const slug of exactProblemSlugs) {
    const page = await readPage(`src/content/problems/calculus/${slug}.md`);
    assertPublicBoundary(page.text, page.frontmatter, slug);
    const hint1 = disclosureBody(page.text, 'Hint 1');
    const hint2 = disclosureBody(page.text, 'Hint 2');
    const contract = progressiveHintContracts.get(slug);
    assert.ok(contract, `${slug} missing problem-specific progressive-hint contract`);
    assert.match(hint1, contract.hint1, `${slug} Hint 1 must identify its problem-specific opening move`);
    assert.match(hint2, contract.hint2, `${slug} Hint 2 must expose a later intermediate step`);
    assert.notEqual(normalizedMath(hint1), normalizedMath(hint2), `${slug} hints must remain distinct`);
    assert.match(page.text, /<summary>Show Solution<\/summary>/);
  }
});
