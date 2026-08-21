import { readFile, writeFile } from 'node:fs/promises';

const file = 'docs/quant-interview/HANDOFF.md';
let text = await readFile(file, 'utf8');

text = text.replace('Updated: 2026-08-18', 'Updated: 2026-08-22');
text = text.replace(
  'four Linear Algebra workstreams and four Probability & Statistics workstreams are now complete.',
  'four Linear Algebra workstreams and five Probability & Statistics workstreams are now complete.',
);

const section9 = `## Completed cross-book workstream 9

\`probability-statistics-expectation-variance-covariance-009\`

Scope: **Probability & Statistics → Expectation, Variance & Covariance**.

Content-complete verification:

- commit \`19064a55b4bbc6b7136b0494b0002e6c1113ca70\`
- GitHub Actions run \`32509048173\`
- commands: \`npm run test\`, \`npm run check\`, \`npm run build\`
- conclusion: success

The machine-readable workstream is \`status: complete\` and stores exactly this real verification evidence.

### Canonical Knowledge

- \`expectation-linearity-indicators\` — discrete/continuous expectation, LOTUS, linearity without independence, product factorization under independence, indicator variables, expected counts, and expectation-existence checks.
- \`conditional-expectation-tower-property\` — conditional expectation on events/partitions/random variables, law of total expectation, tower property, and elementary first-step expectation recursion.
- \`expectation-variance-covariance-algebra\` — scalar variance/covariance identities, bilinearity, variance of linear combinations, independence-versus-uncorrelated boundaries, and scalar correlation.
- \`moments-moment-generating-functions\` — raw/central moments, MGF derivatives, existence conditions, and Gaussian moment calculation.

The existing \`conditional-dice-expectation\` repository-authored Problem remains source-neutral and now links into the tower-property layer; it is not fabricated as source-derived coverage.

### Canonical Problems

- \`expected-pattern-count-by-indicators\`
- \`expected-position-of-first-special-card\`
- \`coupon-collector-expectations\`
- \`recursive-dice-game-expected-payoff\`
- \`expected-loops-from-random-pairings\`
- \`geometric-waiting-time-mean-variance\`
- \`normal-mgf-and-moments\`
- \`expected-normal-cdf-of-normal-variable\`
- \`optimal-hedge-ratio-by-variance-minimization\`
- \`bernoulli-default-correlation-bounds\`
- \`expected-radius-of-uniform-disk-point\`
- \`fair-box-opening-price-by-expectation\`
- \`multiplicative-wealth-expected-growth\`

All thirteen new Problems are independently authored, source-neutral, solved, and S3+.

### Cross-book semantic decisions and boundaries

Exactly **18 terminal claimed source rows** are closed for this workstream: 8 Green, 8 Red, and 2 from the 150-question source. The state distribution is 13 \`canonical-problem\`, 2 \`knowledge-only\`, 2 \`variant\`, and 1 \`merged-duplicate\`. Every claimed row has a nonempty resolution note and resolves to real canonical Knowledge or Problem targets.

- Indicator reasoning remains split by mathematical identity: overlapping pattern counts test linearity without independence; first-special position tests random-permutation symmetry; coupon distinct counts test presence indicators.
- Conditional expectation and the **tower property** own one-step/fixed-point expectation reasoning, while state-rich Markov recursions, martingales, and optional stopping remain stochastic-process material.
- Scalar variance/covariance algebra owns the hedge-ratio and Bernoulli default-feasibility applications. Covariance/correlation matrices and PSD feasibility remain Linear Algebra ownership.
- The disk-radius family is one canonical expectation Problem; the unit-disk form is a \`merged-duplicate\` of the radius-\`R\` version.
- The general Normal \`E[Phi(X)]\` identity owns one canonical Problem; the standard-Normal form is a meaningful \`variant\` and alternative symmetry/PIT perspective.
- General Normal MGF/moments and the standard-Normal moment calculation are fused into one canonical Problem plus one reusable Knowledge node.
- The apparent stopping decision in the fair-box game collapses once starting is worthwhile; genuine finite-horizon reroll optimization remains Dynamic Programming / Optimal Stopping.
- **Order statistics and expected extrema**, including Random Ants, remain outside this bounded topic for **Order Statistics & Extremes**.
- Green's simplex \`sum-of-random-variables\` probability remains geometric-probability material rather than being misclassified as expectation solely by editorial placement.

## Public corpus state after nine workstreams

The current source-neutral regression contract covers **55 canonical Problems** and **37 explicitly topic-classified Knowledge / Technique nodes**.

These are repository-record counts only. They are not whole-book completeness percentages and do not imply that Probability & Statistics as a whole is complete.

`;

if (!text.includes('## Completed cross-book workstream 9')) {
  const oldCorpus = '## Public corpus state after eight workstreams\n\nThe current source-neutral regression contract covers **42 canonical Problems** and **33 explicitly topic-classified Knowledge / Technique nodes**.\n\nThese are repository-record counts only. They are not whole-book completeness percentages and do not imply that Probability & Statistics as a whole is complete.\n\n';
  if (!text.includes(oldCorpus)) throw new Error('Could not find eight-workstream corpus checkpoint');
  text = text.replace(oldCorpus, section9);
}

const historyMarker = `Historical transition marker: **Expectation, Variance & Covariance** is fully closed. Its four canonical Knowledge nodes, thirteen new S3+ Problems, upgraded conditional-dice linkage, eighteen terminal hidden source rows, indicator/tower/scalar-covariance boundaries, and verified 55/37 source-neutral corpus contract are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.

`;

if (!text.includes('Historical transition marker: **Expectation, Variance & Covariance** is fully closed.')) {
  const currentMarker = 'Current bounded topic:\n\n**Probability & Statistics → Expectation, Variance & Covariance.**\n';
  if (!text.includes(currentMarker)) throw new Error('Could not find current expectation topic marker');
  text = text.replace(currentMarker, `${historyMarker}Current bounded topic:\n\n**Probability & Statistics → Order Statistics & Extremes.**\n`);
}

text = text.replace(
  'Proceed by resolving the expectation/variance/covariance material across all three verified sources before authoring. Reuse existing canonical Knowledge where appropriate, preserve covariance/PSD material already owned by Linear Algebra, and keep order statistics and stochastic processes outside this bounded scope unless a source item’s primary mathematical identity genuinely belongs to expectation, variance, or covariance.',
  'Proceed by resolving order-statistics and extremes material across all three verified sources before authoring. Reuse existing distribution, expectation, symmetry, and Gaussian Knowledge where appropriate; distinguish genuine order-statistic/extreme-value reasoning from ordinary expectation algebra or stochastic-process wrappers; preserve prior semantic ownership instead of reopening closed workstreams.',
);

await writeFile(file, text);
console.log('Updated HANDOFF for completed workstream 009 and advanced to Order Statistics & Extremes.');
