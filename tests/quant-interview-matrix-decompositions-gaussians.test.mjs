import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const problemPath = 'src/content/problems/linear-algebra/generate-correlated-gaussians.md';
const s3Markers = ['## Problem','## Think Before Revealing','<summary>Hint 1</summary>','<summary>Show Solution</summary>','## Solution','## Why This Problem Matters','## Common Mistakes','## Extensions'];

test('generate-correlated-gaussians is an S3+ source-neutral canonical problem', async () => {
  await access(problemPath);
  const text = await readFile(problemPath, 'utf8');
  assert.match(text, /^problemId:\s*linear-algebra-decomposition-003$/m);
  assert.match(text, /^quantInterviewTopics:\s*\[[^\]]*matrix-decompositions[^\]]*\]$/m);
  assert.match(text, /^status:\s*solved$/m);
  for (const marker of s3Markers) assert.ok(text.includes(marker), `generate-correlated-gaussians missing ${marker}`);
  assert.doesNotMatch(text, /^source(?:Section|Chapter|Problem|Reference|Url)?:/m);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most Frequently|Question\s+\d+/i);
});

test('generate-correlated-gaussians verifies the 2D construction and general covariance-factor routes', async () => {
  const text = await readFile(problemPath, 'utf8');
  assert.match(text, /x_?1\s*=\s*z_?1/i);
  assert.match(text, /x_?2\s*=\s*rho\s*z_?1\s*\+\s*sqrt\(1\s*-\s*rho\^2\)\s*z_?2/i);
  assert.match(text, /Var\(x_?1\)[\s\S]{0,80}=\s*1/i);
  assert.match(text, /Var\(x_?2\)[\s\S]{0,220}rho\^2[\s\S]{0,160}1\s*-\s*rho\^2[\s\S]{0,100}=\s*1/i);
  assert.match(text, /Cov\(x_?1,\s*x_?2\)[\s\S]{0,220}=\s*rho/i);
  assert.match(text, /\|rho\|\s*<=\s*1|rho\s*(?:in|∈)\s*\[-1,\s*1\]/i);
  assert.match(text, /Sigma\s*=\s*L\s*L\^T/i);
  assert.match(text, /x\s*=\s*mu\s*\+\s*L\s*z/i);
  assert.match(text, /Cov\(x\)[\s\S]{0,180}=\s*Sigma/i);
  assert.match(text, /Sigma\s*=\s*R\^T\s*R[\s\S]{0,200}x\s*=\s*mu\s*\+\s*R\^T\s*z/i);
  assert.match(text, /singular[\s\S]{0,220}(?:PSD|positive[- ]semidefinite)/i);
  assert.match(text, /Sigma\s*=\s*Q\s*Lambda\s*Q\^T/i);
  assert.match(text, /B\s*=\s*Q\s*Lambda\^\{?1\/2\}?|B\s*=\s*Q\s*sqrt\(Lambda\)/i);
  assert.match(text, /B\s*B\^T[\s\S]{0,180}=\s*Sigma/i);
  assert.match(text, /SVD|spectral/i);
  assert.match(text, /covariance[\s\S]{0,220}(?:PSD|positive[- ]semidefinite)|(?:PSD|positive[- ]semidefinite)[\s\S]{0,220}covariance/i);
  assert.match(text, /Monte Carlo/i);
});
