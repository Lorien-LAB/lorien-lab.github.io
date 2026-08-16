import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const correlationPath = 'src/content/knowledge/concepts/correlation-matrix.md';
const psdPath = 'src/content/knowledge/concepts/positive-semidefinite-matrix.md';
const minorPath = 'src/content/knowledge/concepts/principal-minor-feasibility.md';

test('correlation matrix Knowledge fuses covariance normalization and equicorrelation structure', async () => {
  const text = await readFile(correlationPath, 'utf8');
  assert.match(text, /Cov\(X,\s*Y\)|covariance/i);
  assert.match(text, /correlation.*Cov|Cov.*sqrt|standard deviation/i);
  assert.match(text, /D\^-1|D\^{-1}|D\^\{-1\}|D.*Sigma.*D|congruence/i);
  assert.match(text, /zero[- ]variance|positive marginal variances|nonzero standard deviations/i);
  assert.match(text, /1\s*-\s*rho|1\s*\+\s*\(n\s*-\s*1\).*rho|-1\s*\/\s*\(n\s*-\s*1\)/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('PSD Knowledge explains covariance PSD proof and the strict PD distinction', async () => {
  const text = await readFile(psdPath, 'utf8');
  assert.match(text, /a\^T.*Sigma.*a|Var\(.*a\^T|variance of.*linear combination/i);
  assert.match(text, /covariance matrix.*positive semidefinite|covariance matrices.*positive semidefinite/i);
  assert.match(text, /zero[- ]variance.*linear combination|linear dependence|singular/i);
  assert.match(text, /positive definite.*leading principal minors|Sylvester/i);
  assert.match(text, /positive semidefinite.*all principal minors|all principal minors.*nonnegative/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('principal-minor technique states the correct semidefinite criterion and useful alternatives', async () => {
  const text = await readFile(minorPath, 'utf8');
  assert.match(text, /all principal minors.*nonnegative|every principal minor.*nonnegative/i);
  assert.match(text, /leading principal minors.*positive|Sylvester/i);
  assert.match(text, /Schur complement|quadratic form|eigenvalue/i);
  assert.match(text, /## Interview Checks/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
