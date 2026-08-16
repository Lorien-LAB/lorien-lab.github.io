import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function findMarkdown(root, slug) {
  const files = await readdir(root, { recursive: true });
  const match = files.find((file) => String(file).endsWith(`/${slug}.md`) || String(file) === `${slug}.md`);
  assert.ok(match, `missing markdown ${slug}`);
  return `${root}/${match}`;
}

async function readKnowledge(slug) {
  return readFile(await findMarkdown('src/content/knowledge', slug), 'utf8');
}

async function readProblem(slug) {
  return readFile(await findMarkdown('src/content/problems', slug), 'utf8');
}

test('vector geometry Knowledge covers inner products, projections, and the correlation bridge', async () => {
  const text = await readKnowledge('vector-geometry-inner-products');
  assert.match(text, /^quantInterviewTopics:\s*\[linear-algebra-matrix-methods, vectors-linear-systems\]$/m);
  assert.match(text, /x\^T y|dot product/i);
  assert.match(text, /\|\|x\|\||Euclidean norm/i);
  assert.match(text, /cos\s*\(?theta\)?|angle/i);
  assert.match(text, /orthogonal/i);
  assert.match(text, /Cauchy[-– ]Schwarz/i);
  assert.match(text, /proj|projection/i);
  assert.match(text, /correlation[\s\S]{0,500}cosine|cosine[\s\S]{0,500}correlation/i);
  assert.match(text, /correlation-matrix/);
  assert.match(text, /## Interview Checks/i);
});

test('existing correlation parameter Problem absorbs the geometric vector method without duplicating the family', async () => {
  const text = await readProblem('correlation-matrix-parameter-range');
  assert.match(text, /^concepts:\s*\[[^\]]*vector-geometry-inner-products[^\]]*\]$/m);
  assert.match(text, /Variant A[\s\S]{0,1800}(?:angle|unit vectors|geometric)/i);
  assert.match(text, /cos\s*\(?2\s*theta\)?|2\s*\(0\.8\)\^?2\s*-\s*1/i);
  assert.match(text, /0\.28\s*<=\s*rho\s*<=\s*1/);
});
