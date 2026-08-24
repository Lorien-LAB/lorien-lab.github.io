import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
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
    .replace(/\\(?:left|right)/g, '')
    .replace(/\\[dt]frac/g, '\\frac')
    .replace(/\\(?:!|,|:|;|quad|qquad)/g, '')
    .replace(/~+/g, '')
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
  assertMath(page.text, String.raw`f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}`, 'difference quotient');
  assert.match(page.text, /differentiability implies continuity/i);
  assert.match(page.text, /not conversely|converse.*false/i);
  assert.match(page.text, /one-sided|endpoint/i);
  for (const rule of [/linearity/i, /product rule/i, /quotient rule/i, /chain rule/i, /fixed-power/i, /generalized[ -]power/i]) assert.match(page.text, rule);
  assert.match(page.text, /denominator.*nonzero|g\(x\).*not.*0/i);
  assertMath(page.text, String.raw`\frac{d}{dx}e^x=e^x`, 'exponential derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\ln x=\frac1x,\qquad x>0`, 'logarithm derivative and domain');
  assertMath(page.text, String.raw`\frac{d}{dx}\sin x=\cos x`, 'sine derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\cos x=-\sin x`, 'cosine derivative');
  assertMath(page.text, String.raw`\frac{d}{dx}\tan x=\sec^2x,\qquad \cos x\ne0`, 'tangent derivative and domain');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`, 'sine standard limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{e^x-1}{x}=1`, 'exponential standard limit');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}(x\ln x)=\ln x+1},\qquad x>0`, 'x ln x Interview Check and domain');
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
  const logIdentity = /\\ln y\s*=\s*v\\ln u/;
  assertBefore(page.text, /u:I\\to\(0,\s*\+\\infty\)/, logIdentity, 'u:I to positive reals must precede logarithms');
  assertBefore(page.text, /u:I\\to\(0,\s*\+\\infty\)\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'u differentiability must independently precede logarithms');
  assertBefore(page.text, /v:I\\to\\mathbb\s*R/, logIdentity, 'v:I to real values must precede logarithms');
  assertBefore(page.text, /v:I\\to\\mathbb\s*R\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'v differentiability must independently precede logarithms');
  const factors = sectionBody(page.text, 'Products and Quotients of Many Factors');
  const productLogIdentity = /\\ln y\s*=\s*\\sum_\{j=1\}\^m\\ln u_j/;
  assertBefore(
    factors,
    /u_j:I\\to\(0,\s*\+\\infty\)\$?\s+be\s+differentiable\s+for\s+every/i,
    productLogIdentity,
    'each differentiable product factor must be positive before logarithms',
  );
  assertBefore(
    factors,
    /every individual factor satisfies \$u_j\(x\)>0\$/i,
    productLogIdentity,
    'each product-factor value must be strictly positive before logarithms',
  );
  const quotientLogIdentity =
    /\\ln q\s*=\s*\\sum_\{j=1\}\^m\\ln a_j\s*-\s*\\sum_\{k=1\}\^n\\ln b_k/;
  assertBefore(
    factors,
    /every numerator factor \$a_j:I\\to\(0,\s*\+\\infty\)\$ is differentiable/i,
    quotientLogIdentity,
    'every numerator factor must be differentiable and positive before quotient logarithms',
  );
  assertBefore(
    factors,
    /every denominator factor \$b_k:I\\to\(0,\s*\+\\infty\)\$ is differentiable/i,
    quotientLogIdentity,
    'every denominator factor must be differentiable and positive before quotient logarithms',
  );
  assertBefore(factors, /each \$a_j\(x\)>0\$/i, quotientLogIdentity, 'numerator values must be strictly positive');
  assertBefore(factors, /each \$b_k\(x\)>0\$/i, quotientLogIdentity, 'denominator values must be strictly positive');
  assertMath(
    factors,
    String.raw`\frac{q'}q=\sum_{j=1}^m\frac{a_j'}{a_j}-\sum_{k=1}^n\frac{b_k'}{b_k}`,
    'quotient logarithmic derivative signs',
  );
  assert.match(factors, /only denominator-factor terms enter with a minus sign/i);
  assertMath(page.text, String.raw`\boxed{y'=u^v\left(v'\ln u+v\frac{u'}{u}\right)}`, 'general logarithmic derivative');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0`, 'x^x derivative and domain');
  assertMath(page.text, String.raw`\boxed{\frac{d}{dx}(\ln x)^{\ln x}=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1`, 'log-power derivative and domain');
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
  const logIdentity = /\\ln y\s*=\s*v\\ln u/;
  assertBefore(solution, /u:I\\to\(0,\s*\+\\infty\)/, logIdentity, 'Problem 001 Solution must state u:I to positive reals before logarithms');
  assertBefore(solution, /u:I\\to\(0,\s*\+\\infty\)\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable u before logarithms');
  assertBefore(solution, /v:I\\to\\mathbb\s*R/, logIdentity, 'Problem 001 Solution must state v:I to real values before logarithms');
  assertBefore(solution, /v:I\\to\\mathbb\s*R\$?\s+(?:is|be)\s+differentiable/i, logIdentity, 'Problem 001 Solution must independently state differentiable v before logarithms');
  assertMath(solution, String.raw`\boxed{\frac{d}{dx}u(x)^{v(x)}=u(x)^{v(x)}\left(v'(x)\ln u(x)+v(x)\frac{u'(x)}{u(x)}\right)}`, 'Problem 001 general result');
  assert.match(page.text, /differentiate.*x\^x|derivative.*x\^x/i);
  assertMath(solution, String.raw`\boxed{\frac{d}{dx}x^x=x^x(\ln x+1)},\qquad x>0`, 'Problem 001 x^x result and domain');
  assertMath(page.text, String.raw`y=(\ln x)^{\ln x}`, 'Problem 001 log-power prompt');
  assertMath(solution, String.raw`\boxed{y'=\frac{(\ln x)^{\ln x}}{x}(\ln\ln x+1)},\qquad x>1`, 'Problem 001 log-power result and domain');
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
  assertMath(page.text, String.raw`g(x)=e^{\cos x}`, 'Problem 010 function');
  assertMath(derivation, String.raw`\Delta_h=\cos(x+h)-\cos x`, 'Problem 010 Delta definition');
  assertMath(derivation, String.raw`\frac{g(x+h)-g(x)}h=e^{\cos x}\left(\frac{e^{\Delta_h}-1}{\Delta_h}\right)\left(\frac{\Delta_h}{h}\right)`, 'Problem 010 exact factorization');
  assert.match(derivation, /limiting interpretation.*Delta|when.*Delta_h.*zero|Delta_h.*zero.*limit/is);
  assertMath(derivation, String.raw`\frac{\Delta_h}{h}=\cos x\frac{\cos h-1}{h}-\sin x\frac{\sin h}{h}`, 'Problem 010 angle-addition quotient');
  assertMath(derivation, String.raw`\lim_{h\to0}\frac{\Delta_h}{h}=-\sin x`, 'Problem 010 inner limit');
  assertMath(derivation, String.raw`\lim_{z\to0}\frac{e^z-1}{z}=1`, 'Problem 010 exponential limit');
  assertMath(derivation, String.raw`\boxed{g'(x)=-\sin x\,e^{\cos x}}`, 'Problem 010 derivative');
  assert.doesNotMatch(derivation, /Taylor|Maclaurin|big-O|O\(h/i);
  assert.doesNotMatch(page.text, /e\^x\s*\\cos x|e\^x\s*cos x/);
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
  assertMath(page.text, String.raw`F'(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal density example');
  assert.match(page.text, /F''>0.*x<.*mu|positive.*left.*mu/i);
  assert.match(page.text, /F''<0.*x>.*mu|negative.*right.*mu/i);
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
  assert.doesNotMatch(scalar(page.frontmatter, 'title'), /e\^pi|pi\^e|\\pi|\$/i);
  assertMath(page.text, String.raw`f(x)=\frac{\ln x}{x}`, 'comparison function');
  assertMath(page.text, String.raw`f'(x)=\frac{1-\ln x}{x^2}`, 'comparison derivative');
  assert.match(page.text, /increases.*\(0,\s*e\)/i);
  assert.match(page.text, /decreases.*\(e,\s*\+\\infty\)/i);
  assert.match(page.text, /global maximum.*e/i);
  assertMath(page.text, String.raw`\boxed{e^\pi>\pi^e}`, 'transcendental comparison');
  assert.match(page.text, /f''\s*=\s*0.*inconclusive|inconclusive.*f''\s*=\s*0/i);
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
  assertMath(page.text, String.raw`\boxed{\frac{e^a+e^b}{2}\ge e^{(a+b)/2}}`, 'midpoint inequality');
  assertMath(page.text, String.raw`f''(x)=e^x>0`, 'strict convexity');
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
  assertMath(page.text, String.raw`\sigma>0`, 'Normal scale domain');
  assertMath(solution, String.raw`F'(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal density');
  assertMath(solution, String.raw`F''(x)=-\frac{x-\mu}{\sigma^3\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`, 'Normal CDF second derivative');
  const signChart = solution.match(/\\\[[\s\S]*?F''\(x\)>0[\s\S]*?F''\(x\)<0[\s\S]*?\\\]/)?.[0];
  assert.ok(signChart, 'Normal CDF Solution missing displayed left/right sign chart');
  assert.match(signChart, /F''(?:\(x\))?\s*>\s*0.*x\s*<\s*\\mu/is);
  assert.match(signChart, /F''(?:\(x\))?\s*<\s*0.*x\s*>\s*\\mu/is);
  assertMath(solution, String.raw`\boxed{x=\mu\text{ is the unique inflection point}}`, 'unique inflection');
  assert.match(solution, /not merely.*F''|F''.*zero.*not.*enough|sign change.*not merely/i);
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
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\sin x}{x}=1`, 'sine limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{e^x-1}{x}=1`, 'exponential limit');
  assertMath(page.text, String.raw`\lim_{x\to0}\frac{\ln(1+x)}{x}=1`, 'logarithm limit');
  for (const gate of [/punctured neighborhood/i, /g'.*(?:nonzero|not equal to zero)/i, /0\s*\/\s*0|zero-over-zero/i, /infinity.*infinity/i, /derivative-quotient limit/i]) assert.match(page.text, gate);
  assert.match(page.text, /renew|recheck/i);
  assert.match(page.text, /substitut.*before.*L'H[oô]pital|L'H[oô]pital.*after.*substitut/i);
  assertMath(page.text, String.raw`\ln x\ll x^a\ll e^{bx}`, 'positive-tail growth hierarchy');
  assertMath(page.text, String.raw`x\to+\infty`, 'positive-tail direction');
  assertMath(page.text, String.raw`a>0`, 'positive power parameter');
  assertMath(page.text, String.raw`b>0`, 'positive exponential parameter');
  assertMath(page.text, String.raw`x^a\ln x\to0^-`, 'signed power-log identity');
  assertMath(page.text, String.raw`x\to0^+`, 'signed power-log direction');
  assertMath(page.text, String.raw`a>0`, 'signed power-log domain');
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
  assert.match(firstGate, /infinity-over-infinity|\+\\infty\s*\/\s*\+\\infty/i);
  assert.match(firstGate, /positive tail|x\s*>\s*0/i);
  assert.match(firstGate, /e\^x.*x\^2.*differentiable|differentiable.*e\^x.*x\^2/is);
  assert.match(firstGate, /2x.*(?:nonzero|\\ne\s*0)/i);
  assertMath(firstGate, String.raw`\lim_{x\to+\infty}\frac{e^x}{2x}=+\infty`, 'Problem 003 first derivative-quotient limit');
  const renewedGate = subsectionBody(solution, 'Renew the gate');
  assert.match(renewedGate, /infinity-over-infinity|\+\\infty\s*\/\s*\+\\infty/i);
  assert.match(renewedGate, /e\^x.*2x.*differentiable|differentiable.*e\^x.*2x/is);
  assert.match(renewedGate, /denominator derivative.*2.*(?:nonzero|\\ne\s*0)|2\s*\\ne\s*0/i);
  assertMath(renewedGate, String.raw`\lim_{x\to+\infty}\frac{e^x}{2}=+\infty`, 'Problem 003 second derivative-quotient limit');
  assertMath(solution, String.raw`\lim_{x\to+\infty}\frac{e^x}{x^2}=\lim_{x\to+\infty}\frac{e^x}{2x}=\lim_{x\to+\infty}\frac{e^x}{2}=\boxed{+\infty}`, 'Problem 003 exact result');
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
  assertMath(page.text, String.raw`\lim_{x\to0^+}x^2\ln x`, 'Problem 004 prompt');
  assertBefore(solution, /^### Rewrite and right-neighborhood gate$/m, /^### Apply the rule$/m, 'Problem 004 gate must precede application');
  const gate = subsectionBody(solution, 'Rewrite and right-neighborhood gate');
  assertMath(gate, String.raw`\frac{\ln x}{x^{-2}}`, 'Problem 004 quotient');
  assert.match(gate, /-\\infty.*\+\\infty|infinity-over-infinity/i);
  assert.match(gate, /0\s*<\s*x\s*<\s*\\delta|punctured right neighborhood/i);
  assert.match(gate, /\\ln x.*x\^\{-2\}.*differentiable|differentiable.*\\ln x.*x\^\{-2\}/is);
  assert.match(gate, /-2x\^\{-3\}.*(?:nonzero|\\ne\s*0)|denominator derivative.*nonzero/i);
  assertMath(gate, String.raw`\lim_{x\to0^+}\frac{1/x}{-2x^{-3}}=0`, 'Problem 004 derivative-quotient limit exists');
  assertMath(solution, String.raw`\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0`, 'Problem 004 derivative quotient');
  assert.match(solution, /negative.*0\s*<\s*x\s*<\s*1|0\s*<\s*x\s*<\s*1.*negative/is);
  assertMath(solution, String.raw`\boxed{0^-}`, 'Problem 004 signed result');
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
  assertMath(page.text, String.raw`a>0`, 'lighthouse distance domain');
  assertMath(page.text, String.raw`s=a\tan\theta`, 'lighthouse constraint');
  assertMath(page.text, String.raw`\cos\theta\ne0`, 'tangent domain');
  assertMath(page.text, String.raw`\frac{d\theta}{dt}=2\pi`, 'one-revolution angular rate');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}`, 'Knowledge lighthouse specialization');
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
  assertMath(page.text, String.raw`a>0`, 'Problem 005 a domain');
  assertMath(page.text, String.raw`s=a\tan\theta`, 'Problem 005 geometry');
  assertMath(page.text, String.raw`\cos\theta\ne0`, 'Problem 005 theta domain');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=a\sec^2\theta\frac{d\theta}{dt}}`, 'Problem 005 general rate');
  assert.match(page.text, /one full revolution per minute|one revolution per minute/i);
  assertMath(page.text, String.raw`\frac{d\theta}{dt}=2\pi\ \text{radians per minute}`, 'Problem 005 angular specialization');
  assertMath(page.text, String.raw`\sec^2\theta=1+\tan^2\theta=1+\frac{s^2}{a^2}`, 'Problem 005 equivalent-form identity');
  assertMath(page.text, String.raw`\boxed{\frac{ds}{dt}=2\pi a\sec^2\theta=\frac{2\pi(a^2+s^2)}{a}\ \text{miles per minute}}`, 'Problem 005 exact specialized result');
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
  assertMath(page.text, String.raw`\sqrt{x^2+5x}-x=\frac{5x}{\sqrt{x^2+5x}+x}=\frac{5}{\sqrt{1+5/x}+1}`, 'Problem 006 rationalization');
  assertMath(page.text, String.raw`\boxed{\lim_{x\to+\infty}(\sqrt{x^2+5x}-x)=\frac52}`, 'Problem 006 limit');
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
  assert.match(page.text, /induction/i);
  assert.match(page.text, /even and odd subsequences|even.*odd.*subsequence/i);
  assert.match(page.text, /only after convergence|after.*prove.*converg/i);
  assert.match(page.text, /fixed-point equation.*candidate|candidates.*not.*convergence/i);
  assertMath(page.text, String.raw`c_0=2`, 'Knowledge continued-fraction start');
  assertMath(page.text, String.raw`c_{n+1}=2+\frac2{c_n}`, 'Knowledge continued-fraction recurrence');
  assertMath(page.text, String.raw`1+\sqrt3`, 'Knowledge continued-fraction limit');
  assert.match(page.text, /nested[ -]radical/i);
  assertMath(page.text, String.raw`x=\sqrt2`, 'Knowledge tower base');
  assertMath(page.text, String.raw`L=2`, 'Knowledge tower limit');
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
  assertMath(invariant, String.raw`c_0=2`, 'Problem 008 start');
  assertMath(invariant, String.raw`c_1=F(2)=3`, 'Problem 008 first iterate');
  assertMath(invariant, String.raw`2\le c_n\le3`, 'Problem 008 invariant');
  assert.match(invariant, /2\s*\le.*2\s*\+\s*2\s*\/.*\le\s*3|maps.*\[2,\s*3\].*into/is);
  const subsequences = subsectionBody(solution, 'Alternating subsequences');
  assertMath(subsequences, String.raw`c_0=2<c_2=2+\frac23=\frac83`, 'Problem 008 even base inequality');
  assert.match(subsequences, /c_\{2n\}.*increasing|even subsequence.*increasing/i);
  assert.match(subsequences, /c_\{2n\+1\}.*decreasing|odd subsequence.*decreasing/i);
  assert.match(subsequences, /apply.*decreasing|F.*decreasing/i);
  const common = subsectionBody(solution, 'A single limit');
  assertMath(common, String.raw`b=2+\frac2a`, 'Problem 008 odd-subsequence limit');
  assertMath(common, String.raw`a=2+\frac2b`, 'Problem 008 even-subsequence limit');
  assertMath(common, String.raw`(b-a)\left(1-\frac2{ab}\right)=0`, 'Problem 008 equal-limits argument');
  assert.match(common, /a,?b.*(?:greater than or equal|\\ge).*2.*ab.*(?:greater than or equal|\\ge).*4|ab\s*=\s*2.*impossible/is);
  assert.match(common, /full sequence converges|a\s*=\s*b/i);
  const fixed = subsectionBody(solution, 'Fixed point and selection');
  assertMath(fixed, String.raw`L^2-2L-2=0`, 'Problem 008 fixed-point polynomial');
  assertMath(fixed, String.raw`L=1\pm\sqrt3`, 'Problem 008 candidate roots');
  assertMath(fixed, String.raw`\boxed{L=1+\sqrt3}`, 'Problem 008 selected limit');
  assert.match(fixed, /(?:positive|positivity).*1-\\sqrt3.*reject|1-\\sqrt3.*reject/i);
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
  assertMath(monotonicity, String.raw`a_1=\sqrt2`, 'Problem 011 start');
  assertMath(monotonicity, String.raw`a_{n+1}=\sqrt{2+a_n}`, 'Problem 011 recurrence');
  assert.match(monotonicity, /a_2.*>.*a_1|base case.*increasing/is);
  assert.match(monotonicity, /a_n.*>.*a_\{n-1\}.*a_\{n\+1\}.*>.*a_n|inductive hypothesis.*square root.*increasing/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /a_1.*<.*2|base case.*upper bound/is);
  assert.match(bound, /a_n.*<.*2.*a_\{n\+1\}.*<.*2|inductive hypothesis.*upper bound/is);
  const convergence = subsectionBody(solution, 'Convergence');
  assert.match(convergence, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  const fixed = subsectionBody(solution, 'Fixed point');
  assertMath(fixed, String.raw`L=\sqrt{2+L}`, 'Problem 011 fixed point');
  assert.match(fixed, /positivity.*-1|reject.*-1/i);
  assertMath(fixed, String.raw`\boxed{L=2}`, 'Problem 011 limit');
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
  assertMath(base, String.raw`2=x^2`, 'Problem 012 base equation');
  assertMath(base, String.raw`\boxed{x=\sqrt2}`, 'Problem 012 requested base');
  const monotonicity = subsectionBody(solution, 'Monotonicity by induction');
  assertMath(monotonicity, String.raw`t_0=\sqrt2`, 'Problem 012 finite-tower start');
  assertMath(monotonicity, String.raw`t_{n+1}=(\sqrt2)^{t_n}`, 'Problem 012 finite-tower recurrence');
  assert.match(monotonicity, /t_1.*>.*t_0|base case.*increasing/is);
  assert.match(monotonicity, /t_n.*>.*t_\{n-1\}.*t_\{n\+1\}.*>.*t_n|inductive hypothesis.*increasing function/is);
  const bound = subsectionBody(solution, 'Upper bound by induction');
  assert.match(bound, /t_0.*<.*2|base case.*upper bound/is);
  assertMath(bound, String.raw`t_{n+1}=(\sqrt2)^{t_n}<(\sqrt2)^2=2`, 'Problem 012 inductive upper bound');
  const closure = subsectionBody(solution, 'Convergence and branch selection');
  assert.match(closure, /increasing.*bounded above.*converges|bounded monotone convergence/is);
  assertMath(closure, String.raw`L=(\sqrt2)^L`, 'Problem 012 fixed point');
  assert.match(closure, /both.*2.*4|2 and 4.*fixed/i);
  assert.match(closure, /\[0,\s*2\].*g'\(y\).*\\le.*\\ln\s*2\s*-\s*1\s*<\s*0.*strictly decreasing.*unique fixed point/is, 'Problem 012 must prove uniqueness on [0,2] from a strict derivative bound');
  assert.match(closure, /L\s*\\le\s*2.*reject.*4|upper bound.*reject.*4/is);
  assertMath(closure, String.raw`\boxed{L=2}`, 'Problem 012 proved tower limit');
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
  assertMath(page.text, String.raw`a_n\to0`, 'series term test');
  assert.match(page.text, /necessary.*not sufficient|not sufficient.*term/i);
  assertMath(page.text, String.raw`\sum_{k=0}^{N}r^k=\frac{1-r^{N+1}}{1-r}`, 'finite geometric sum');
  assertMath(page.text, String.raw`|r|<1`, 'infinite geometric criterion');
  assertMath(page.text, String.raw`\sum_{k=0}^{+\infty}r^k=\frac1{1-r}`, 'infinite geometric sum');
  assert.match(page.text, /direct comparison/i);
  assert.match(page.text, /harmonic.*dyadic|dyadic.*harmonic/is);
  assert.match(page.text, /Cauchy condensation/i);
  assert.match(page.text, /positive.*nonincreasing|nonincreasing.*positive/i);
  assertMath(page.text, String.raw`\frac1{k^2}\le\frac1{k(k-1)}=\frac1{k-1}-\frac1k`, 'square-series telescoping comparison');
  assertMath(page.text, String.raw`k\ge2`, 'square-series comparison domain');
  assertMath(page.text, String.raw`\frac{2^n}{2^n\ln(2^n)}=\frac1{n\ln2}`, 'log-harmonic condensation');
  assertMath(page.text, String.raw`2^{k(1-p)}`, 'p-series dyadic upper bound');
  assert.match(page.text, /p\s*>\s*1.*converges|converges.*p\s*>\s*1/is);
  assert.match(page.text, /0\s*<\s*p\s*\\le\s*1.*diverges|diverges.*0\s*<\s*p/is);
  assert.match(page.text, /p\s*\\le\s*0.*terms.*not.*zero|term test.*p\s*\\le\s*0/is);
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
  assertMath(harmonic, String.raw`\sum_{k=2^m+1}^{2^{m+1}}\frac1k\ge2^m\frac1{2^{m+1}}=\frac12`, 'Problem 013 dyadic harmonic block');
  assert.match(harmonic, /infinitely many.*blocks.*one half|partial sums.*unbounded/is);
  assertMath(harmonic, String.raw`\boxed{\sum_{k=1}^{+\infty}\frac1k\text{ diverges}}`, 'harmonic classification');
  const square = subsectionBody(solution, 'Reciprocal-square series: telescoping upper bound');
  assertMath(square, String.raw`\frac1{k^2}\le\frac1{k(k-1)}=\frac1{k-1}-\frac1k`, 'Problem 013 telescoping comparison');
  assertMath(square, String.raw`k\ge2`, 'Problem 013 square comparison domain');
  assertMath(square, String.raw`\sum_{k=2}^{N}\frac1{k^2}\le\sum_{k=2}^{N}\left(\frac1{k-1}-\frac1k\right)=1-\frac1N`, 'Problem 013 bounded square partial sums');
  assert.match(square, /increasing.*bounded above.*converges|bounded increasing partial sums/is);
  assertMath(square, String.raw`\boxed{\sum_{k=1}^{+\infty}\frac1{k^2}\text{ converges}}`, 'square-series classification');
  const logHarmonic = subsectionBody(solution, 'Logarithmic-harmonic series: condensation');
  assert.match(logHarmonic, /a_k.*positive.*decreasing|positive.*nonincreasing/is);
  assert.match(logHarmonic, /k\s*\ln k.*increasing|product.*increasing/is);
  assert.match(logHarmonic, /Cauchy condensation/i);
  assertMath(logHarmonic, String.raw`2^na_{2^n}=\frac{2^n}{2^n\ln(2^n)}=\frac1{n\ln2}`, 'Problem 013 condensed terms');
  assertMath(logHarmonic, String.raw`\sum_{n=1}^{+\infty}2^na_{2^n}=\frac1{\ln2}\sum_{n=1}^{+\infty}\frac1n`, 'Problem 013 exact harmonic comparison chain');
  assert.match(logHarmonic, /constant multiple.*harmonic|compare.*harmonic/i);
  assertMath(logHarmonic, String.raw`\boxed{\sum_{k=2}^{+\infty}\frac1{k\ln k}\text{ diverges}}`, 'log-harmonic classification');
  assert.doesNotMatch(solution, /integral test|\\int/);
});

async function topicLocalSlugs(root) {
  const files = await readdir(root, { recursive: true });
  const slugs = [];
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const fullPath = path.join(root, String(file));
    const page = await readPage(fullPath);
    const topics = scalar(page.frontmatter, 'quantInterviewTopics');
    if (topics && JSON.stringify(inlineArray(page.frontmatter, 'quantInterviewTopics')) === JSON.stringify(topicArray)) {
      slugs.push(path.basename(String(file), '.md'));
    }
  }
  return slugs.sort();
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

const progressiveHintContracts = new Map([
  ['differentiate-variable-base-and-exponent', {
    hint1: /positivity.*logarithm.*hypotheses.*u.*v/is,
    hint2: /y'\s*\/\s*y.*multiply.*original.*u\^v/is,
  }],
  ['compare-e-pi-power-expressions', {
    hint1: /f\(x\)=\$?\\ln x\/?x.*derivative.*sign.*constant/is,
    hint2: /f'.*1-\\ln x.*decreasing interval.*compare/is,
  }],
  ['exponential-midpoint-convexity', {
    hint1: /f\(x\)=e\^x.*second derivative/is,
    hint2: /strict convexity.*midpoint.*equality/is,
  }],
  ['normal-cdf-inflection-point', {
    hint1: /fundamental theorem.*density.*differentiate/is,
    hint2: /every factor.*except.*x-\\mu.*positive.*sign table/is,
  }],
  ['exponential-over-polynomial-limit', {
    hint1: /positive tail.*differentiability.*2x.*never vanishes/is,
    hint2: /first application.*e\^x.*2x.*renew.*constant.*2/is,
  }],
  ['logarithm-power-limit-at-zero', {
    hint1: /quotient.*x\^\{-2\}.*0\^\+/is,
    hint2: /differentiate numerator and denominator.*-x\^2\/?2/is,
  }],
  ['rotating-lighthouse-beam-related-rate', {
    hint1: /s=a\\tan\\theta.*depend on time/is,
    hint2: /differentiate.*sec\^2.*2\\pi.*1\+s\^2\/?a\^2/is,
  }],
  ['radical-difference-limit-at-infinity', {
    hint1: /conjugate.*sqrt\{x\^2\+5x\}\+x/is,
    hint2: /numerator.*5x.*divide.*positive.*x/is,
  }],
  ['derive-exponential-cosine-derivative-from-definition', {
    hint1: /Delta_h.*cos\(x\+h\)-\\cos x.*rewrite/is,
    hint2: /angle addition.*Delta_h\/?h.*-\\sin x.*exponential/is,
  }],
  ['periodic-continued-fraction-limit', {
    hint1: /maps.*\[2,3\].*c_0<c_2.*two applications/is,
    hint2: /subsequence limits.*a.*b.*subtract.*before solving/is,
  }],
  ['nested-radical-limit', {
    hint1: /monotonicity.*a_2>a_1.*strictly increasing/is,
    hint2: /a_n<2.*induction.*sqrt\{2\+a_n\}<\\sqrt4/is,
  }],
  ['infinite-power-tower-limit', {
    hint1: /2=x\^2.*positive root.*t_0=\\sqrt2/is,
    hint2: /t_n.*increasing.*separately.*t_n<2/is,
  }],
  ['classify-basic-positive-series', {
    hint1: /powers of two.*reciprocal square.*1\/\[k\(k-1\)\]/is,
    hint2: /positivity and decrease.*condensation.*1\/\(n\\ln2\)/is,
  }],
]);

test('module contains exactly seven Knowledge and thirteen Problem slugs', async () => {
  assert.deepEqual(await topicLocalSlugs('src/content/knowledge'), exactKnowledgeSlugs);
  assert.deepEqual(await topicLocalSlugs('src/content/problems'), exactProblemSlugs);
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
