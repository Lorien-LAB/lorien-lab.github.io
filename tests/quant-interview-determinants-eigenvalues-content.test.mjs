import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const knowledgePaths = {
  spectrum: 'src/content/knowledge/concepts/eigenvalues-eigenvectors.md',
  invariants: 'src/content/knowledge/concepts/matrix-spectral-invariants.md',
  eigenbasis: 'src/content/knowledge/concepts/eigenbasis-decomposition.md',
};
const problemPaths = {
  eigensystem: 'src/content/problems/linear-algebra/two-by-two-eigensystem.md',
  applyEigenbasis: 'src/content/problems/linear-algebra/apply-matrix-via-eigenbasis.md',
  traceAB: 'src/content/problems/linear-algebra/trace-ab-equals-trace-ba.md',
  commutator: 'src/content/problems/linear-algebra/commutator-cannot-equal-identity.md',
};
const s3Markers = ['## Problem','## Think Before Revealing','<summary>Hint 1</summary>','<summary>Show Solution</summary>','## Solution','## Why This Problem Matters','## Common Mistakes','## Extensions'];

test('eigenvalue Knowledge distinguishes multiplicities, fields, and diagonalizability', async () => {
  await access(knowledgePaths.spectrum);
  const text = await readFile(knowledgePaths.spectrum, 'utf8');
  assert.match(text, /Ax\s*=\s*(?:lambda|λ).*x|A\s*x\s*=\s*(?:lambda|λ)\s*x/i);
  assert.match(text, /det\(A\s*-\s*(?:lambda|λ)I\)|characteristic polynomial/i);
  assert.match(text, /algebraic multiplicity/i);
  assert.match(text, /geometric multiplicity|dimension of.*eigenspace/i);
  assert.match(text, /complex|C\b|conjugate pair/i);
  assert.match(text, /real matrix[\s\S]{0,140}(?:need not all be real|non-real roots|complex)/i);
  assert.match(text, /diagonalizable.*independent eigenvectors|n independent eigenvectors.*diagonalizable/i);
  assert.match(text, /symmetric.*orthogonal|spectral theorem/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('spectral-invariant Knowledge unifies trace determinant characteristic polynomial and commutators', async () => {
  await access(knowledgePaths.invariants);
  const text = await readFile(knowledgePaths.invariants, 'utf8');
  assert.match(text, /det\(AB\).*det\(A\).*det\(B\)|determinant.*multiplicative/i);
  assert.match(text, /trace.*sum.*eigenvalue|sum.*eigenvalue.*trace/i);
  assert.match(text, /det\(A\)\s*=\s*product_i\s+lambda_i|determinant.*product.*eigenvalue|product.*eigenvalue.*determinant/i);
  assert.match(text, /tr\(AB\)\s*=\s*tr\(BA\)|trace.*cyclic/i);
  assert.match(text, /commutator.*trace.*0|tr\(AB\s*-\s*BA\).*0/i);
  assert.match(text, /similar.*same.*characteristic|similarity.*invariant/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('eigenbasis technique turns matrix action and powers into scalar operations', async () => {
  await access(knowledgePaths.eigenbasis);
  const text = await readFile(knowledgePaths.eigenbasis, 'utf8');
  assert.match(text, /v\s*=.*c_?1.*v_?1|decompose.*eigenvector|eigenbasis/i);
  assert.match(text, /Av.*lambda|A\^k|A\^\{k\}|polynomial.*A/i);
  assert.match(text, /diagonalizable/i);
  assert.match(text, /defective|not.*eigenbasis|insufficient.*eigenvectors/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('four determinant/eigenvalue canonical problems are S3+ and source-neutral', async () => {
  for (const path of Object.values(problemPaths)) {
    await access(path);
    const text = await readFile(path, 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[[^\]]*determinants-eigenvalues[^\]]*\]$/m);
    assert.match(text, /^status:\s*solved$/m);
    assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference|Url)?:/m);
    assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
    for (const marker of s3Markers) assert.ok(text.includes(marker), `${path} missing ${marker}`);
  }
});

test('2x2 eigensystem problem uses three complementary spectral routes', async () => {
  const text = await readFile(problemPaths.eigensystem, 'utf8');
  assert.match(text, /\[\[2,\s*1\],\s*\[1,\s*2\]\]/);
  assert.match(text, /eigenvalues?.*1.*3|1.*3.*eigenvalues?/is);
  assert.match(text, /\(1,\s*1\)|\[1,\s*1\]/);
  assert.match(text, /\(1,\s*-1\)|\[1,\s*-1\]/);
  assert.match(text, /characteristic polynomial|det\(A.*lambda/i);
  assert.match(text, /trace.*determinant/i);
  assert.match(text, /symmetr|swap.*coordinate/i);
});

test('eigenbasis application problem computes Av without reconstructing A', async () => {
  const text = await readFile(problemPaths.applyEigenbasis, 'utf8');
  assert.match(text, /\(1,\s*2\)/);
  assert.match(text, /\(-1,\s*3\)/);
  assert.match(text, /v\s*=\s*2.*v_?1\s*-\s*v_?2|2v_?1\s*-\s*v_?2/i);
  assert.match(text, /\(1,\s*17\)/);
  assert.match(text, /A\^k|A\^\{k\}/);
  assert.match(text, /without.*reconstruct|do not.*reconstruct|rather than.*reconstruct/i);
});

test('trace product problem proves cyclicity directly and gives the stronger spectral view', async () => {
  const text = await readFile(problemPaths.traceAB, 'utf8');
  assert.match(text, /tr\(AB\)\s*=\s*tr\(BA\)/);
  assert.match(text, /sum_i.*sum_j|indices|index proof/i);
  assert.match(text, /characteristic polynomial|same nonzero eigenvalues|similar/i);
  assert.match(text, /rectangular|compatible dimensions/i);
});

test('commutator problem uses the trace obstruction instead of entrywise algebra', async () => {
  const text = await readFile(problemPaths.commutator, 'utf8');
  assert.match(text, /AB\s*-\s*BA\s*=\s*I/);
  assert.match(text, /tr\(AB\s*-\s*BA\).*0|trace.*commutator.*0/is);
  assert.match(text, /tr\(I.*\)\s*=\s*n|trace.*identity.*n/i);
  assert.match(text, /characteristic zero|real|complex/i);
});
