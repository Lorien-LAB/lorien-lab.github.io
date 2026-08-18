import { readFile, writeFile } from 'node:fs/promises';

const topic = ['random-variables-distributions'];

const rowsBySource = {
  'green-book': [
    {
      sourceSection: '4.4',
      sourceItem: 'definitions-discrete-continuous-distributions',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['random-variables-cdf-pmf-pdf', 'common-probability-distributions'],
      resolutionNote: 'The reusable random-variable, support, CDF/PMF/PDF, and standard distribution material is fused into canonical public Knowledge. Source-derived definition and recognition checks remain visible through Interview Checks rather than creating a standalone Problem.'
    },
    {
      sourceSection: '4.4',
      sourceItem: 'poisson-process-property',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['exponential-memoryless-bus-wait'],
      canonicalKnowledge: ['common-probability-distributions'],
      resolutionNote: 'This row owns only the exponential waiting-time, memoryless, residual-wait, and stationary-age reasoning represented by exponential-memoryless-bus-wait. The source uses an arrival-process wrapper, but this workstream does not claim general Poisson-process or broader stochastic-process theory.'
    }
  ],
  'red-book': [
    {
      sourceSection: '3.2.1',
      sourceItem: '3.28',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['random-variables-cdf-pmf-pdf', 'common-probability-distributions'],
      resolutionNote: 'The uniform-distribution CDF task is a compact representation check preserved in the CDF/PMF/PDF and common-distributions Interview Checks; it does not require a separate canonical Problem.'
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.30',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['common-probability-distributions'],
      resolutionNote: 'The Cauchy example is preserved as a heavy-tail and moment-existence boundary check in common-probability-distributions, including the distinction between symmetry/principal value and a proper finite expectation.'
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.31',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['density-under-random-variable-transform'],
      canonicalKnowledge: ['random-variables-cdf-pmf-pdf', 'random-variable-transformations-convolution'],
      resolutionNote: 'Distinct distribution-pushforward reasoning family represented by density-under-random-variable-transform. The canonical page derives the transformed CDF first, then the inverse-Jacobian rule and many-to-one branch correction.'
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.33',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['sum-of-two-uniforms-triangular-density'],
      canonicalKnowledge: ['common-probability-distributions', 'random-variable-transformations-convolution'],
      resolutionNote: 'Distinct independent-sum convolution family represented by sum-of-two-uniforms-triangular-density; the canonical solution derives the piecewise integration bounds from the simultaneous support restrictions.'
    },
    {
      sourceSection: '3.2.1',
      sourceItem: '3.34',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['limit-theorems-lln-clt'],
      resolutionNote: 'The classical central-limit-theorem statement is fused with the corresponding limit-theorem material into one canonical LLN/CLT Knowledge node and remains publicly testable through Interview Checks.'
    }
  ],
  '150-most-frequently-asked': [
    {
      sourceSection: '2.6',
      sourceItem: '1',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['common-probability-distributions'],
      resolutionNote: 'The exponential density, support, and parameterization are reusable distribution Knowledge; the source-derived definition remains visible through public Interview Checks instead of becoming a standalone Problem.'
    },
    {
      sourceSection: '2.6',
      sourceItem: '2',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['exponential-race-probability'],
      canonicalKnowledge: ['common-probability-distributions'],
      resolutionNote: 'Distinct competing-independent-exponential family represented by exponential-race-probability; the canonical page generalizes the numerical means to the rate-share formula lambda_X/(lambda_X+lambda_Y).'
    },
    {
      sourceSection: '2.6',
      sourceItem: '3',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['common-probability-distributions'],
      resolutionNote: 'The Poisson random-variable PMF and count-distribution recognition rule are fused into common-probability-distributions. This row does not claim general Poisson-process theory.'
    },
    {
      sourceSection: '2.6',
      sourceItem: '5',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['joint-normal-quadrant-conditioning'],
      canonicalKnowledge: ['gaussian-lognormal-structure', 'conditioning'],
      resolutionNote: 'Distinct jointly-normal decorrelation and quadrant-conditioning family represented by joint-normal-quadrant-conditioning; the canonical solution makes the joint-normal requirement for zero-covariance independence explicit.'
    },
    {
      sourceSection: '2.6',
      sourceItem: '6',
      canonicalTopics: topic,
      state: 'canonical-problem',
      canonicalProblems: ['when-is-a-product-lognormal'],
      canonicalKnowledge: ['gaussian-lognormal-structure'],
      resolutionNote: 'Distinct lognormal-product closure family represented by when-is-a-product-lognormal; the canonical page distinguishes independent lognormals from the more general jointly-normal-log condition and rejects marginal lognormality alone.'
    },
    {
      sourceSection: '2.6',
      sourceItem: '8',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['limit-theorems-lln-clt'],
      resolutionNote: 'Weak and strong laws of large numbers are fused into the canonical limit-theorem Knowledge node, where convergence modes and public Interview Checks preserve the source-derived interview value.'
    },
    {
      sourceSection: '2.6',
      sourceItem: '9',
      canonicalTopics: topic,
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['limit-theorems-lln-clt'],
      resolutionNote: 'The classical central limit theorem is fused with the Red CLT material into one canonical limit-theorem Knowledge node, including sqrt(n) scaling, convergence in distribution, and finite-variance boundaries.'
    }
  ]
};

const expectedKeys = new Set(Object.entries(rowsBySource).flatMap(([source, rows]) => rows.map((row) => `${source}::${row.sourceSection}::${row.sourceItem}`)));
if (expectedKeys.size !== 14) throw new Error(`expected exactly 14 whitelisted rows, got ${expectedKeys.size}`);

for (const [source, newRows] of Object.entries(rowsBySource)) {
  const file = `src/data/quant-interview/coverage/${source}.json`;
  const ledger = JSON.parse(await readFile(file, 'utf8'));
  if (!Array.isArray(ledger.entries)) throw new Error(`${file} has no entries array`);

  const seen = new Set();
  for (const row of newRows) {
    const key = `${row.sourceSection}::${row.sourceItem}`;
    if (seen.has(key)) throw new Error(`duplicate mutator key ${source} ${key}`);
    seen.add(key);
    const matches = ledger.entries.map((entry, index) => ({ entry, index })).filter(({ entry }) => `${entry.sourceSection}::${entry.sourceItem ?? ''}` === key);
    if (matches.length > 1) throw new Error(`ledger already contains duplicate key ${source} ${key}`);
    if (matches.length === 1) ledger.entries[matches[0].index] = row;
    else ledger.entries.push(row);
  }

  await writeFile(file, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
}
