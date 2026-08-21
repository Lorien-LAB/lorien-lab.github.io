import { readFile, writeFile } from 'node:fs/promises';

const changes = new Map([
  ['src/content/knowledge/concepts/common-probability-distributions.md',
    '[expectation-variance-covariance-algebra, moments-moment-generating-functions]'],
  ['src/content/knowledge/concepts/gaussian-lognormal-structure.md',
    '[moments-moment-generating-functions, conditional-expectation-tower-property]'],
  ['src/content/knowledge/concepts/random-variable-transformations-convolution.md',
    '[conditional-expectation-tower-property, expectation-linearity-indicators]'],
  ['src/content/knowledge/concepts/first-step-analysis.md',
    '[conditional-expectation-tower-property]'],
]);

for (const [file, related] of changes) {
  const text = await readFile(file, 'utf8');
  const desired = `related: ${related}`;
  if (text.includes(desired)) continue;
  const matches = text.match(/^related: \[\]$/gm) ?? [];
  if (matches.length !== 1) throw new Error(`${file}: expected exactly one empty related field, found ${matches.length}`);
  const next = text.replace(/^related: \[\]$/m, desired);
  await writeFile(file, next);
}

console.log('Linked existing Knowledge to expectation/variance/covariance graph.');
