import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'src/lib/problemRelations.ts',
  'src/components/ProblemDifficulty.astro',
  'src/components/ProblemCard.astro',
  'src/components/QuantInterviewGateway.astro',
  'src/layouts/ProblemLayout.astro',
  'src/pages/problems/index.astro',
  'src/pages/problems/[...slug].astro',
  'src/pages/knowledge/quant-interview/index.astro',
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

test('quant interview foundation exposes all required surfaces', async () => {
  for (const file of requiredFiles) await access(file);
});

test('content config models problems and sources without adding knowledge types', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const problems = defineCollection/);
  assert.match(config, /const problemSources = defineCollection/);
  assert.match(config, /mathDifficulty/);
  assert.match(config, /insightDifficulty/);
  assert.match(config, /interviewDifficulty/);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]problem['"]/s);
  assert.doesNotMatch(config, /type:\s*z\.enum\(\[[^\]]*['"]technique['"]/s);
});

test('problem route uses a dedicated canonical problem layout', async () => {
  const route = await readFile('src/pages/problems/[...slug].astro', 'utf8');
  assert.match(route, /ProblemLayout/);
  assert.match(route, /getCollection\(['"]problems['"]\)/);
  assert.doesNotMatch(route, /knowledge\/problems/);
});

test('knowledge landing exposes quant interview without merging problems into its general index', async () => {
  const page = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(page, /QuantInterviewGateway/);
  assert.match(page, /knowledge\/quant-interview\//);
});

test('knowledge detail reverse-links associated problems', async () => {
  const page = await readFile('src/pages/knowledge/[...id].astro', 'utf8');
  assert.match(page, /getCollection\(['"]problems['"]\)/);
  assert.match(page, /getProblemsForKnowledgeSlug/);
  assert.match(page, /Related Problems/);
});

test('problem bank provides static rows and progressive filters', async () => {
  const page = await readFile('src/pages/problems/index.astro', 'utf8');
  for (const marker of [
    'data-problem-row',
    'data-problem-search',
    'data-source-filter',
    'data-difficulty-filter',
    'data-concept-filter',
    'data-technique-filter',
  ]) assert.ok(page.includes(marker), `missing ${marker}`);
});
