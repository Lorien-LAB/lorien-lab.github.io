import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, expectation-variance-covariance\]$/m;

function assertInterviewChecks(text, id) {
  assert.match(text, /^## Interview Checks$/m, `${id} missing Interview Checks`);
}

test('expectation Knowledge separates linearity from independence', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-linearity-indicators.md');
  assert.match(text, topicLine);
  assert.match(text, /discrete.*expectation|sum.*x.*P/i);
  assert.match(text, /continuous.*expectation|integral/i);
  assert.match(text, /LOTUS|E\[g\(X\)\]/i);
  assert.match(text, /linearity/i);
  assert.match(text, /does not require independence|without.*independence/i);
  assert.match(text, /E\[I|indicator/i);
  assert.match(text, /E\[XY\]|product.*expectation/i);
  assert.match(text, /existence|finite expectation/i);
  assertInterviewChecks(text, 'expectation-linearity-indicators');
  assert.match(text, /fair die|six-sided die/i);
  assert.match(text, /overlap|dependent indicator/i);
});

test('conditional expectation Knowledge teaches total expectation and tower property', async () => {
  const text = await read('src/content/knowledge/concepts/conditional-expectation-tower-property.md');
  assert.match(text, topicLine);
  assert.match(text, /E\[X\s*\|\s*A\]|conditional expectation/i);
  assert.match(text, /E\[X\s*\|\s*Y\]/i);
  assert.match(text, /law of total expectation|total expectation/i);
  assert.match(text, /tower property/i);
  assert.match(text, /E\[E\[X.*Y.*\]\].*E\[X\]|E\[X\].*tower/i);
  assert.match(text, /first-step|recurs/i);
  assert.match(text, /Markov|stochastic process/i);
  assertInterviewChecks(text, 'conditional-expectation-tower-property');
});
