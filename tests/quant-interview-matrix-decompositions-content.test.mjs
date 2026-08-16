import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const knowledgePaths = {
  qr: 'src/content/knowledge/concepts/qr-decomposition.md',
  luCholesky: 'src/content/knowledge/concepts/lu-cholesky-decomposition.md',
  svd: 'src/content/knowledge/concepts/singular-value-decomposition.md',
  eigenbasis: 'src/content/knowledge/concepts/eigenbasis-decomposition.md',
};

test('QR Knowledge covers dimensions, stable least squares, uniqueness, and rank boundaries', async () => {
  await access(knowledgePaths.qr);
  const text = await readFile(knowledgePaths.qr, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[[^\]]*matrix-decompositions[^\]]*\]$/m);
  assert.match(text, /Q\^T\s*Q\s*=\s*I|orthonormal columns/i);
  assert.match(text, /thin|economy/i);
  assert.match(text, /full QR|square QR/i);
  assert.match(text, /X\s*=\s*Q\s*R/i);
  assert.match(text, /R\s*beta\s*=\s*Q\^T\s*y/i);
  assert.match(text, /Q\s*Q\^T.*y|orthogonal projection/i);
  assert.match(text, /normal equations[\s\S]{0,320}(?:condition number|conditioning|kappa|κ)/i);
  assert.match(text, /Householder|modified Gram-Schmidt/i);
  assert.match(text, /pivoted QR|column-pivoted QR|column pivoting/i);
  assert.match(text, /rank-deficient|rank deficient/i);
  assert.match(text, /diagonal entr(?:y|ies)[\s\S]{0,100}positive|positive[\s\S]{0,100}diagonal entr(?:y|ies)/i);
  assert.match(text, /factors are unique|factorization is unique|QR factors are unique/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('LU and Cholesky Knowledge separates pivoted elimination, SPD structure, and factor uniqueness', async () => {
  await access(knowledgePaths.luCholesky);
  const text = await readFile(knowledgePaths.luCholesky, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[[^\]]*matrix-decompositions[^\]]*\]$/m);
  assert.match(text, /Gaussian elimination/i);
  assert.match(text, /P\s*A\s*=\s*L\s*U|partial pivoting|pivoted LU/i);
  assert.match(text, /forward substitution[\s\S]{0,180}back(?:ward)? substitution|back(?:ward)? substitution[\s\S]{0,180}forward substitution/i);
  assert.match(text, /det\(A\)|determinant/i);
  assert.match(text, /A\s*=\s*L\s*L\^T/i);
  assert.match(text, /A\s*=\s*R\^T\s*R/i);
  assert.match(text, /symmetric positive definite|symmetric positive-definite|SPD/i);
  assert.match(text, /positive[\s\S]{0,30}diagonal[\s\S]{0,220}unique|unique[\s\S]{0,220}positive[\s\S]{0,30}diagonal/i);
  assert.match(text, /generic[\s\S]{0,220}(?:not unique|non-unique|nonunique)|C\^T\s*C[\s\S]{0,220}(?:not unique|non-unique|nonunique)/i);
  assert.match(text, /orthogonal[\s\S]{0,180}(?:other factors|another factor|non-unique|nonunique)/i);
  assert.match(text, /roughly[\s\S]{0,40}half[\s\S]{0,80}work|cheaper|less work/i);
  assert.match(text, /covariance/i);
  assert.match(text, /singular[\s\S]{0,200}(?:PSD|positive[- ]semidefinite)[\s\S]{0,260}(?:spectral|SVD)|(?:spectral|SVD)[\s\S]{0,260}singular[\s\S]{0,200}(?:PSD|positive[- ]semidefinite)/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('SVD Knowledge states full and thin dimensions, spectral links, rank, and pseudoinverse', async () => {
  await access(knowledgePaths.svd);
  const text = await readFile(knowledgePaths.svd, 'utf8');
  assert.match(text, /^quantInterviewTopics:\s*\[[^\]]*matrix-decompositions[^\]]*\]$/m);
  assert.match(text, /A\s*(?:in|∈)\s*R\^\{?m\s*x\s*n\}?|m\s*[x×]\s*n/i);
  assert.match(text, /full SVD/i);
  assert.match(text, /U\s*(?:in|∈)[\s\S]{0,80}m\s*x\s*m/i);
  assert.match(text, /V\s*(?:in|∈)[\s\S]{0,80}n\s*x\s*n/i);
  assert.match(text, /Sigma[\s\S]{0,100}m\s*x\s*n|rectangular[\s\S]{0,100}Sigma/i);
  assert.match(text, /thin SVD|compact SVD|rank-r/i);
  assert.match(text, /U_r[\s\S]{0,80}m\s*x\s*r/i);
  assert.match(text, /Sigma_r[\s\S]{0,80}r\s*x\s*r/i);
  assert.match(text, /V_r[\s\S]{0,80}n\s*x\s*r/i);
  assert.match(text, /A\^T\s*A[\s\S]{0,180}sigma_i\^2|sigma_i\^2[\s\S]{0,180}A\^T\s*A/i);
  assert.match(text, /A\s*A\^T[\s\S]{0,180}sigma_i\^2|sigma_i\^2[\s\S]{0,180}A\s*A\^T/i);
  assert.match(text, /rank[\s\S]{0,160}(?:positive|nonzero) singular values|(?:positive|nonzero) singular values[\s\S]{0,160}rank/i);
  assert.match(text, /Moore-Penrose|pseudoinverse/i);
  assert.match(text, /A\^\+\s*=\s*V_r\s*Sigma_r\^-1\s*U_r\^T|V_r[\s\S]{0,80}Sigma_r[\s\S]{0,80}U_r\^T/i);
  assert.match(text, /rank-deficient|rank deficient|minimum-norm/i);
  assert.match(text, /least squares/i);
  assert.match(text, /non-square|rectangular[\s\S]{0,160}eigendecomposition|eigendecomposition[\s\S]{0,160}rectangular/i);
  assert.match(text, /covariance|square-root factor|square root factor/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('eigenbasis Knowledge defines matrix functions and the principal PSD square root', async () => {
  const text = await readFile(knowledgePaths.eigenbasis, 'utf8');
  assert.match(text, /## Matrix functions and square roots/i);
  assert.match(text, /A\s*=\s*Q\s*(?:Lambda|Λ)\s*Q\^T/i);
  assert.match(text, /f\(A\)\s*=\s*Q\s*f\((?:Lambda|Λ)\)\s*Q\^T/i);
  assert.match(text, /A\^\{?1\/2\}?|principal square root/i);
  assert.match(text, /unique[\s\S]{0,180}symmetric[\s\S]{0,100}(?:PSD|positive[- ]semidefinite)|unique[\s\S]{0,180}(?:PSD|positive[- ]semidefinite)[\s\S]{0,100}square root/i);
  assert.match(text, /negative eigenvalue[\s\S]{0,260}(?:cannot have|no real symmetric PSD square root|prevents|rules out)/i);
  assert.match(text, /non-principal|other square roots|generic square root/i);
  assert.match(text, /## Interview Checks[\s\S]*square root/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
