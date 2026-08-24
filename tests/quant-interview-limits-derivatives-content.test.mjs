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
