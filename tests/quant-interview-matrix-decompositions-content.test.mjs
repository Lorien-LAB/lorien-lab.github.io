import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const knowledgePaths = {
  qr: 'src/content/knowledge/concepts/qr-decomposition.md',
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
  assert.match(text, /positive[\s\S]{0,80}diagonal[\s\S]{0,180}unique|unique[\s\S]{0,180}positive[\s\S]{0,80}diagonal/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
