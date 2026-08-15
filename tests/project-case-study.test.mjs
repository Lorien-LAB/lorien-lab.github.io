import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const projectFiles = [
  'src/content/projects/quant-research-harness.md',
  'src/content/projects/llm-factor-discovery.md',
  'src/content/projects/cta-research-framework.md',
];

test('project detail route uses the dedicated case-study layout', async () => {
  await access('src/layouts/ProjectCaseStudyLayout.astro');
  const route = await readFile('src/pages/projects/[...slug].astro', 'utf8');
  assert.match(route, /ProjectCaseStudyLayout/);
  assert.match(route, /headings/);
  assert.doesNotMatch(route, /ArticleLayout/);
});

test('project case-study layout exposes metrics, real optional actions, and an outline', async () => {
  const layout = await readFile('src/layouts/ProjectCaseStudyLayout.astro', 'utf8');
  assert.match(layout, /metrics/);
  assert.match(layout, /repoUrl/);
  assert.match(layout, /docsUrl/);
  assert.match(layout, /headings/);
  assert.match(layout, /Project outline/i);
  assert.doesNotMatch(layout, /client:/);
});

test('flagship project records read as research case studies', async () => {
  for (const file of projectFiles) {
    const source = await readFile(file, 'utf8');
    assert.ok(source.length > 3000, `${file} is still too thin for a flagship case study`);
    assert.match(source, /## Research problem|## Research scope/);
    assert.match(source, /## Design thesis|## Research thesis/);
    assert.match(source, /## Architecture|## Research architecture/);
    assert.match(source, /## Validation|## Validation discipline/);
    assert.match(source, /## Current|## Development|## Research priorities/);
    assert.doesNotMatch(source, /Sharpe\s+[0-9]|Rank IC\s+[0-9]|Annual Return\s+[0-9]/i);
  }
});

test('projects landing explains systems, strategies, and reproductions without changing canonical routing', async () => {
  const page = await readFile('src/pages/projects/index.astro', 'utf8');
  assert.match(page, /Research Systems/);
  assert.match(page, /Strategy Frameworks/);
  assert.match(page, /ReproductionGateway/);
  assert.match(page, /projects\/reproductions\//);
});
