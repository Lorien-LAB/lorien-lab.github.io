import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const knowledgePaths = {
  spectrum: 'src/content/knowledge/concepts/eigenvalues-eigenvectors.md',
  invariants: 'src/content/knowledge/concepts/matrix-spectral-invariants.md',
  eigenbasis: 'src/content/knowledge/concepts/eigenbasis-decomposition.md',
};

test('eigenvalue Knowledge distinguishes multiplicities, fields, and diagonalizability', async () => {
  await access(knowledgePaths.spectrum);
  const text = await readFile(knowledgePaths.spectrum, 'utf8');
  assert.match(text, /Ax\s*=\s*(?:lambda|λ).*x|A\s*x\s*=\s*(?:lambda|λ)\s*x/i);
  assert.match(text, /det\(A\s*-\s*(?:lambda|λ)I\)|characteristic polynomial/i);
  assert.match(text, /algebraic multiplicity/i);
  assert.match(text, /geometric multiplicity|dimension of.*eigenspace/i);
  assert.match(text, /complex|C\b|conjugate pair/i);
  assert.match(text, /real matrix.*not.*real eigenvalue|real.*matrix.*complex eigen/i);
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
  assert.match(text, /determinant.*product.*eigenvalue|product.*eigenvalue.*determinant/i);
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
