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
  assert.match(text, /Q\^TQ\s*=\s*I|orthonormal columns/i);
  assert.match(text, /thin|economy/i);
  assert.match(text, /full QR|square QR/i);
  assert.match(text, /X\s*=\s*QR[\s\S]{0,240}R.*beta\s*=\s*Q\^T.*y/i);
  assert.match(text, /Q\s*Q\^T.*y|orthogonal projection/i);
  assert.match(text, /normal equations[\s\S]{0,260}(?:condition number|conditioning|kappa|κ)/i);
  assert.match(text, /Householder|modified Gram-Schmidt/i);
  assert.match(text, /pivoted QR|column pivoting/i);
  assert.match(text, /rank-deficient|rank deficient/i);
  assert.match(text, /positive diagonal[\s\S]{0,180}unique|unique[\s\S]{0,180}positive diagonal/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
