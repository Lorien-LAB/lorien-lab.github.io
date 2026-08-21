import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topicLine = /^quantInterviewTopics:\s*\[probability-statistics, expectation-variance-covariance\]$/m;

function assertInterviewChecks(text, id) {
  assert.match(text, /^## Interview Checks$/m, `${id} missing Interview Checks`);
}

function assertS3(text, id) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, topicLine);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(text.includes(heading), `${id} missing ${heading}`);
  }
  assert.ok((text.match(/<details>/g) ?? []).length >= 2, `${id} needs two progressive hints`);
  assert.doesNotMatch(text, /Green Book|Red Book|150 Most|source page|PDF page|source item/i);
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

test('variance covariance Knowledge owns scalar algebra but not matrix PSD', async () => {
  const text = await read('src/content/knowledge/concepts/expectation-variance-covariance-algebra.md');
  assert.match(text, topicLine);
  assert.match(text, /Var\(X\).*E\[X\^2\]|E\[X\^2\].*E\[X\]/i);
  assert.match(text, /Cov\(X,Y\)|Cov\(X,\s*Y\)/i);
  assert.match(text, /E\[XY\].*E\[X\].*E\[Y\]/i);
  assert.match(text, /bilinear|bilinearity/i);
  assert.match(text, /Var\(X\+Y\)|2.*Cov/i);
  assert.match(text, /independ.*zero covariance|zero covariance.*independ/i);
  assert.match(text, /does not imply independence|not.*converse/i);
  assert.match(text, /correlation/i);
  assert.match(text, /matrix|PSD|positive semidefinite/i);
  assertInterviewChecks(text, 'expectation-variance-covariance-algebra');
});

test('moments MGF Knowledge includes existence conditions and Normal example', async () => {
  const text = await read('src/content/knowledge/concepts/moments-moment-generating-functions.md');
  assert.match(text, topicLine);
  assert.match(text, /raw moment/i);
  assert.match(text, /central moment/i);
  assert.match(text, /M_X|moment generating function|MGF/i);
  assert.match(text, /derivative|M_X.*0/i);
  assert.match(text, /neighborhood.*zero|exist.*near.*zero/i);
  assert.match(text, /Cauchy/i);
  assert.match(text, /Normal|Gaussian/i);
  assertInterviewChecks(text, 'moments-moment-generating-functions');
});

test('pattern-count Problem uses indicators without requiring independence', async () => {
  const text = await read('src/content/problems/probability/expected-pattern-count-by-indicators.md');
  assertS3(text, 'expectation-variance-covariance-001');
  assert.match(text, /indicator/i);
  assert.match(text, /overlap/i);
  assert.match(text, /does not require independence|linearity.*independ/i);
  assert.match(text, /n\s*-\s*m\s*\+\s*1|starting positions/i);
});

test('first-special Problem derives the general expected position', async () => {
  const text = await read('src/content/problems/probability/expected-position-of-first-special-card.md');
  assertS3(text, 'expectation-variance-covariance-002');
  assert.match(text, /1\s*\+\s*m\s*\/\s*\(n\s*\+\s*1\)|m\+n\+1/i);
  assert.match(text, /10\.6/);
  assert.match(text, /symmetr|indicator/i);
});

test('coupon collector Problem contains both canonical expectations', async () => {
  const text = await read('src/content/problems/probability/coupon-collector-expectations.md');
  assertS3(text, 'expectation-variance-covariance-003');
  assert.match(text, /H_N|harmonic/i);
  assert.match(text, /N.*H_N|N H_N/i);
  assert.match(text, /1\s*-\s*\(1\s*-\s*1\s*\/\s*N\).*k|distinct/i);
  assert.match(text, /geometric/i);
  assert.match(text, /indicator/i);
});

test('fair-box Problem derives the general fair price and explains stopping boundary', async () => {
  const text = await read('src/content/problems/probability/fair-box-opening-price-by-expectation.md');
  assertS3(text, 'expectation-variance-covariance-012');
  assert.match(text, /\(n\s*\+\s*1\)\s*\/\s*2/);
  assert.match(text, /2\s*V\s*\/\s*\(n\s*\+\s*1\)|fair/i);
  assert.match(text, /continue|continuation/i);
  assert.match(text, /optimal stopping/i);
});

test('recursive dice Problem solves a fixed-point expectation with value seven', async () => {
  const text = await read('src/content/problems/probability/recursive-dice-game-expected-payoff.md');
  assertS3(text, 'expectation-variance-covariance-004');
  assert.match(text, /self-consistency|fixed-point|recurs/i);
  assert.match(text, /7/);
  assert.match(text, /conditional-dice-expectation|one-step/i);
});

test('random-pairing Problem derives the odd-harmonic expectation recurrence', async () => {
  const text = await read('src/content/problems/probability/expected-loops-from-random-pairings.md');
  assertS3(text, 'expectation-variance-covariance-005');
  assert.match(text, /E_n|E\[.*n.*\]/i);
  assert.match(text, /2n\s*-\s*1|2\s*n\s*-\s*1/i);
  assert.match(text, /1\/3|odd.*harmonic|sum/i);
  assert.match(text, /n\s*-\s*1|smaller/i);
});

test('geometric moment Problem derives mean and variance by two routes', async () => {
  const text = await read('src/content/problems/probability/geometric-waiting-time-mean-variance.md');
  assertS3(text, 'expectation-variance-covariance-006');
  assert.match(text, /1\s*\/\s*p/);
  assert.match(text, /1\s*-\s*p.*p\^?2|variance/i);
  assert.match(text, /series|generating/i);
  assert.match(text, /first-step|recurs/i);
});

test('Normal MGF Problem derives the general MGF and standard moments', async () => {
  const text = await read('src/content/problems/probability/normal-mgf-and-moments.md');
  assertS3(text, 'expectation-variance-covariance-007');
  assert.match(text, /exp\(|e\^/i);
  assert.match(text, /mu.*t|μ.*t/i);
  assert.match(text, /sigma.*t.*2|σ.*t/i);
  assert.match(text, /mu.*2.*sigma.*2|variance.*mean/i);
  assert.match(text, /E\[Z\^4\].*3|fourth.*moment.*3/i);
});

test('Normal-CDF expectation Problem derives the general tower-property formula', async () => {
  const text = await read('src/content/problems/probability/expected-normal-cdf-of-normal-variable.md');
  assertS3(text, 'expectation-variance-covariance-008');
  assert.match(text, /Phi|Φ/);
  assert.match(text, /sqrt\(1\s*\+\s*sigma|√.*1.*σ/i);
  assert.match(text, /independent.*normal|independent.*Z/i);
  assert.match(text, /tower|conditional expectation/i);
  assert.match(text, /1\/2/);
  assert.match(text, /probability integral transform|PIT/i);
});

test('hedge-ratio Problem derives the covariance over variance minimizer', async () => {
  const text = await read('src/content/problems/probability/optimal-hedge-ratio-by-variance-minimization.md');
  assertS3(text, 'expectation-variance-covariance-009');
  assert.match(text, /Var\(R_A\s*-\s*h\s*R_B\)|variance.*hedg/i);
  assert.match(text, /Cov.*Var|covariance.*variance/i);
  assert.match(text, /rho|ρ/i);
  assert.match(text, /sigma_A|σ_A/i);
});

test('Bernoulli default Problem derives feasible correlation from fixed marginals', async () => {
  const text = await read('src/content/problems/probability/bernoulli-default-correlation-bounds.md');
  assertS3(text, 'expectation-variance-covariance-010');
  assert.match(text, /Bernoulli|indicator/i);
  assert.match(text, /P\(A.*B\)|joint probability|intersection/i);
  assert.match(text, /Frechet|Fréchet|lower bound.*upper bound/i);
  assert.match(text, /Cov/i);
  assert.match(text, /-1.*1|\[-1,\s*1\]/);
  assert.match(text, /not.*achievable|fixed marginals/i);
});

test('uniform-disk Problem derives radial density and expected radius', async () => {
  const text = await read('src/content/problems/probability/expected-radius-of-uniform-disk-point.md');
  assertS3(text, 'expectation-variance-covariance-011');
  assert.match(text, /2\s*r\s*\/\s*R\^?2|radial density/i);
  assert.match(text, /2\s*R\s*\/\s*3/);
  assert.match(text, /polar|area/i);
  assert.match(text, /unit disk|R\s*=\s*1/i);
});

test('multiplicative wealth Problem separates expected wealth from log growth', async () => {
  const text = await read('src/content/problems/probability/multiplicative-wealth-expected-growth.md');
  assertS3(text, 'expectation-variance-covariance-013');
  assert.match(text, /product/i);
  assert.match(text, /independent/i);
  assert.match(text, /5\s*\/\s*4/);
  assert.match(text, /\(5\s*\/\s*4\).*n|expected wealth/i);
  assert.match(text, /log growth|geometric growth/i);
  assert.match(text, /Kelly/i);
});

test('existing conditional dice seed links to the new tower Knowledge and recursive dice Problem', async () => {
  const text = await read('src/content/problems/probability/conditional-dice-expectation.md');
  assert.match(text, /^concepts:\s*\[[^\]]*conditional-expectation-tower-property[^\]]*\]$/m);
  assert.match(text, /^relatedProblems:\s*\[[^\]]*recursive-dice-game-expected-payoff[^\]]*\]$/m);
  assert.match(text, /2\.75/);
});

test('existing Knowledge keeps original canonical ownership while linking to 009', async () => {
  const cases = [
    ['conditioning', /conditional-probability-bayes/, /conditional-expectation-tower-property/],
    ['correlation-matrix', /covariance-correlation-matrices/, /expectation-variance-covariance-algebra/],
    ['common-probability-distributions', /random-variables-distributions/, /moments-moment-generating-functions|expectation-variance-covariance-algebra/],
    ['gaussian-lognormal-structure', /random-variables-distributions/, /moments-moment-generating-functions|conditional-expectation-tower-property/],
    ['random-variable-transformations-convolution', /random-variables-distributions/, /conditional-expectation-tower-property|expectation-linearity-indicators/],
    ['first-step-analysis', /random-walks-markov-chains/, /conditional-expectation-tower-property/],
  ];
  for (const [slug, ownership, related] of cases) {
    const text = await read(`src/content/knowledge/concepts/${slug}.md`);
    assert.match(text, ownership, `${slug} lost prior ownership`);
    assert.match(text, related, `${slug} missing 009 related link`);
  }
});
