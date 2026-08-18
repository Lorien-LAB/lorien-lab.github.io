import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, random-variables-distributions\]$/m;

test('CDF PMF PDF Knowledge separates support mass and density', async () => {
  const text = await read('src/content/knowledge/concepts/random-variables-cdf-pmf-pdf.md');
  assert.match(text, topicLine);
  assert.match(text, /CDF|cumulative distribution/i);
  assert.match(text, /PMF|probability mass/i);
  assert.match(text, /PDF|probability density/i);
  assert.match(text, /support/i);
  assert.match(text, /P\(X\s*=\s*x\)\s*=\s*0|point probability/i);
  assert.match(text, /^## Interview Checks$/m);
  assert.match(text, /U\(a,b\)|uniform/i);
});

test('common distributions Knowledge is recognition-first', async () => {
  const text = await read('src/content/knowledge/concepts/common-probability-distributions.md');
  assert.match(text, topicLine);
  for (const family of ['binomial', 'poisson', 'geometric', 'negative binomial', 'normal', 'exponential', 'gamma', 'beta', 'cauchy']) {
    assert.match(text, new RegExp(family, 'i'));
  }
  assert.match(text, /memoryless/i);
  assert.match(text, /principal value|moment.*exist|expectation.*exist/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('transformation Knowledge derives pushforwards and convolution bounds', async () => {
  const text = await read('src/content/knowledge/concepts/random-variable-transformations-convolution.md');
  assert.match(text, topicLine);
  assert.match(text, /CDF-first|distribution function|F_Y/i);
  assert.match(text, /Jacobian|inverse/i);
  assert.match(text, /many-to-one|multiple.*branch/i);
  assert.match(text, /convolution/i);
  assert.match(text, /support.*bound|integration.*bound/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('Gaussian Knowledge separates joint normality independence and lognormal closure', async () => {
  const text = await read('src/content/knowledge/concepts/gaussian-lognormal-structure.md');
  assert.match(text, topicLine);
  assert.match(text, /jointly normal|joint normal/i);
  assert.match(text, /zero covariance|uncorrelated/i);
  assert.match(text, /independent/i);
  assert.match(text, /marginal.*normal.*not|does not imply.*joint/i);
  assert.match(text, /lognormal/i);
  assert.match(text, /log\(XY\)|log X.*log Y/i);
  assert.match(text, /^## Interview Checks$/m);
});

test('limit theorem Knowledge distinguishes LLN CLT and convergence modes', async () => {
  const text = await read('src/content/knowledge/concepts/limit-theorems-lln-clt.md');
  assert.match(text, topicLine);
  assert.match(text, /weak law/i);
  assert.match(text, /strong law/i);
  assert.match(text, /almost sure|almost surely/i);
  assert.match(text, /convergence in probability/i);
  assert.match(text, /convergence in distribution/i);
  assert.match(text, /central limit theorem|CLT/i);
  assert.match(text, /sqrt\(n\)|√n/i);
  assert.match(text, /finite variance/i);
  assert.match(text, /^## Interview Checks$/m);
});
