import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const correlationPath = 'src/content/knowledge/concepts/correlation-matrix.md';
const psdPath = 'src/content/knowledge/concepts/positive-semidefinite-matrix.md';
const minorPath = 'src/content/knowledge/concepts/principal-minor-feasibility.md';
const parameterRangePath = 'src/content/problems/linear-algebra/correlation-matrix-parameter-range.md';
const problemPaths = {
  covariancePsd: 'src/content/problems/linear-algebra/covariance-matrix-positive-semidefinite-proof.md',
  covarianceToCorrelation: 'src/content/problems/linear-algebra/covariance-to-correlation-matrix.md',
  equicorrelation: 'src/content/problems/linear-algebra/equicorrelation-matrix-bounds.md',
};

const requiredProblemMarkers = [
  '## Problem',
  '## Think Before Revealing',
  '<summary>Hint 1</summary>',
  '<summary>Show Solution</summary>',
  '## Solution',
  '## Why This Problem Matters',
  '## Common Mistakes',
  '## Extensions',
];

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

test('three distinct canonical covariance/correlation/PSD problems are independently authored and source-neutral', async () => {
  for (const path of Object.values(problemPaths)) {
    await access(path);
    const text = await readFile(path, 'utf8');
    assert.match(text, /^quantInterviewTopics:\s*\[[^\]]+\]$/m);
    assert.match(text, /^status:\s*solved$/m);
    assert.doesNotMatch(text, /^originType:/m);
    assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference|Url)?:/m);
    assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
    for (const marker of requiredProblemMarkers) assert.ok(text.includes(marker), `${path} missing ${marker}`);
  }
});

test('covariance PSD proof uses variance of linear combinations and characterizes strict PD', async () => {
  const text = await readFile(problemPaths.covariancePsd, 'utf8');
  assert.match(text, /a\^T.*Sigma.*a.*Var|Var.*a\^T.*Sigma.*a/is);
  assert.match(text, /zero variance|zero-variance/i);
  assert.match(text, /positive definite|strictly positive/i);
  assert.match(text, /linear combination|linear dependence/i);
});

test('covariance-to-correlation problem performs diagonal normalization and handles degeneracy', async () => {
  const text = await readFile(problemPaths.covarianceToCorrelation, 'utf8');
  assert.match(text, /S\^-1|D\^-1\/2|D\^{-1\/2}|congruence/i);
  assert.match(text, /0\.5/);
  assert.match(text, /-0\.25/);
  assert.match(text, /zero variance|zero standard deviation|degenerate/i);
  assert.match(text, /positive semidefinite|PSD/i);
});

test('equicorrelation problem derives the n-dimensional eigenvalues and exact rho bounds', async () => {
  const text = await readFile(problemPaths.equicorrelation, 'utf8');
  assert.match(text, /1\s*-\s*rho/);
  assert.match(text, /1\s*\+\s*\(n\s*-\s*1\).*rho/);
  assert.match(text, /-1\s*\/\s*\(n\s*-\s*1\).*<=.*rho.*<=.*1/i);
  assert.match(text, /multiplicity\s*n\s*-\s*1|multiplicity.*n-1/i);
  assert.match(text, /singular|rank/i);
});

test('existing correlation-parameter problem absorbs cross-book variants instead of duplicating pages', async () => {
  const text = await readFile(parameterRangePath, 'utf8');
  assert.match(text, /-0\.9432\s*<=\s*rho\s*<=\s*0\.5832/);
  assert.match(text, /\(rho\s*-\s*a\s*\*?\s*b\)\^2|rho.*a.*b.*sqrt.*1.*a\^2.*1.*b\^2/is);
  assert.match(text, /0\.28\s*<=\s*rho\s*<=\s*1/);
  assert.match(text, /0\.9[\s\S]*0\.8[\s\S]*0\.1[\s\S]*-0\.316/);
  assert.match(text, /### Method 3|completing the square|Gram/i);
  assert.match(text, /## Variants/i);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});
