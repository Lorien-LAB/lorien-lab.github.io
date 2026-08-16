import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findMarkdown(root, slug) {
  const files = await readdir(root, { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing markdown ${slug}`);
  return `${root}/${match}`;
}

async function readKnowledge(slug) {
  return readFile(await findMarkdown('src/content/knowledge', slug), 'utf8');
}

async function readProblem(slug) {
  return readFile(await findMarkdown('src/content/problems', slug), 'utf8');
}

function assertS3(text, slug) {
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Problem Matters', '## Common Mistakes', '## Extensions']) {
    assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${slug} missing ${heading}`);
  }
  assert.match(text, /<summary>Hint 1<\/summary>/i, `${slug} missing progressive hint`);
}

test('vector geometry Knowledge covers inner products, projections, and the correlation bridge', async () => {
  const text = await readKnowledge('vector-geometry-inner-products');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /x\^T y|dot product/i);
  assert.match(text, /\|\|x\|\||Euclidean norm/i);
  assert.match(text, /cos\s*\(?theta\)?|angle/i);
  assert.match(text, /orthogonal/i);
  assert.match(text, /Cauchy[-– ]Schwarz/i);
  assert.match(text, /proj|projection/i);
  assert.match(text, /correlation[\s\S]{0,500}cosine|cosine[\s\S]{0,500}correlation/i);
  assert.match(text, /correlation-matrix/);
  assert.match(text, /## Interview Checks/i);
});

test('existing correlation parameter Problem absorbs the geometric vector method without duplicating the family', async () => {
  const text = await readProblem('correlation-matrix-parameter-range');
  assert.match(text, /^concepts:\s*\[[^\]]*vector-geometry-inner-products[^\]]*\]$/m);
  assert.match(text, /Variant A[\s\S]{0,1800}(?:angle|unit vectors|geometric)/i);
  assert.match(text, /cos\s*\(?2\s*theta\)?|2\s*\(0\.8\)\^?2\s*-\s*1/i);
  assert.match(text, /0\.28\s*<=\s*rho\s*<=\s*1/);
});

test('span basis rank Knowledge connects independence, fundamental subspaces, and rank-nullity', async () => {
  const text = await readKnowledge('linear-independence-span-basis-rank');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /linear combination/i);
  assert.match(text, /span/i);
  assert.match(text, /linear(?:ly)? independent/i);
  assert.match(text, /basis/i);
  assert.match(text, /dimension/i);
  assert.match(text, /column space/i);
  assert.match(text, /row space/i);
  assert.match(text, /null space/i);
  assert.match(text, /rank[-– ]nullity/i);
  assert.match(text, /dim\s*N\(A\)|nullity/i);
  assert.match(text, /pivot columns/i);
  assert.match(text, /full column rank/i);
  assert.match(text, /full row rank/i);
  assert.match(text, /## Interview Checks/i);
});

test('rank Knowledge states the dimension boundary for consistent underdetermined systems precisely', async () => {
  const text = await readKnowledge('linear-independence-span-basis-rank');
  assert.match(text, /fewer independent equations than unknowns[\s\S]{0,500}(?:cannot|not)[\s\S]{0,120}unique/i);
  assert.match(text, /rank\(A\)[\s\S]{0,200}<=?[\s\S]{0,100}min\(m,n\)|rank[\s\S]{0,300}min\(m,n\)/i);
});

test('linear systems Knowledge classifies consistency through ranks and RREF', async () => {
  const text = await readKnowledge('linear-systems-consistency');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /Ax\s*=\s*b/);
  assert.match(text, /augmented matrix/i);
  assert.match(text, /Gaussian elimination/i);
  assert.match(text, /RREF|reduced row[- ]echelon/i);
  assert.match(text, /pivot/i);
  assert.match(text, /free variables?/i);
  assert.match(text, /rank\(A\)\s*=\s*rank\(\[A\|b\]\)/);
  assert.match(text, /unique solution/i);
  assert.match(text, /infinitely many solutions/i);
  assert.match(text, /no solution/i);
  assert.match(text, /Ax\s*=\s*0[\s\S]{0,300}N\(A\)/);
  assert.match(text, /x\s*=\s*x_p\s*\+\s*z|x_p\s*\+\s*N\(A\)/);
  assert.match(text, /qr-decomposition/);
  assert.match(text, /lu-cholesky-decomposition/);
  assert.match(text, /singular-value-decomposition/);
  assert.match(text, /## Interview Checks/i);
});

test('linear systems Knowledge distinguishes singular coefficient matrices from inconsistent augmented systems', async () => {
  const text = await readKnowledge('linear-systems-consistency');
  assert.match(text, /rank\(\[A\|b\]\)[\s\S]{0,200}>[\s\S]{0,120}rank\(A\)[\s\S]{0,250}no solution/i);
  assert.match(text, /singular[\s\S]{0,500}(?:no solution|infinitely many)/i);
});

test('row stochastic closure is an S3+ source-neutral canonical Problem', async () => {
  const text = await readProblem('product-of-row-stochastic-matrices');
  assert.match(text, /^problemId:\s*linear-algebra-stochastic-001$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.doesNotMatch(text, /^source|Green Book|Red Book|150 Questions|Question 9/im);
  assertS3(text, 'product-of-row-stochastic-matrices');
});

test('row stochastic proof preserves both the row-sum invariant and nonnegativity', async () => {
  const text = await readProblem('product-of-row-stochastic-matrices');
  assert.match(text, /all-ones|ones column vector/i);
  assert.match(text, /A\s*1\s*=\s*1/);
  assert.match(text, /B\s*1\s*=\s*1/);
  assert.match(text, /\(AB\)\s*1\s*=\s*A\s*\(B\s*1\)/);
  assert.match(text, /nonnegative/i);
  assert.match(text, /sum of nonnegative products/i);
});

test('rank consistency parameter Problem is S3+ and source-neutral', async () => {
  const text = await readProblem('rank-and-consistency-of-linear-system');
  assert.match(text, /^problemId:\s*linear-algebra-systems-001$/m);
  assert.match(text, /^concepts:\s*\[linear-independence-span-basis-rank, linear-systems-consistency\]$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.doesNotMatch(text, /^source|Green Book|Red Book|150 Questions/im);
  assertS3(text, 'rank-and-consistency-of-linear-system');
});

test('rank consistency parameter Problem classifies every a b regime correctly', async () => {
  const text = await readProblem('rank-and-consistency-of-linear-system');
  assert.match(text, /a\s*!=\s*5[\s\S]{0,800}unique/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,700}b\s*=\s*3[\s\S]{0,700}infinitely many/i);
  assert.match(text, /a\s*=\s*5[\s\S]{0,700}b\s*!=\s*3[\s\S]{0,700}no solution/i);
  assert.match(text, /\[0,?\s*0,?\s*a-5\s*\|\s*b-3\]/i);
  assert.match(text, /rank\(A\)\s*=\s*2/);
  assert.match(text, /rank[-– ]nullity/i);
  assert.match(text, /one-dimensional null space|dim\s*N\(A\)[^\n]*=\s*1/i);
  assert.match(text, /determinant[\s\S]{0,600}(?:cannot|insufficient|does not)/i);
});
