import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

test('research and projects share one canonical landing route', async () => {
  await access('src/pages/research-projects/index.astro');

  const header = await readFile('src/components/Header.astro', 'utf8');
  assert.ok(header.includes("['Research & Projects', '/research-projects/']"));
  assert.ok(!header.includes("['Research', '/research/']"));
  assert.ok(!header.includes("['Projects', '/projects/']"));
  assert.match(header, /研究与项目/);
});

test('merged portfolio navigation stays active on research and project detail namespaces', async () => {
  const header = await readFile('src/components/Header.astro', 'utf8');
  assert.match(header, /research-projects\//);
  assert.match(header, /research\//);
  assert.match(header, /projects\//);
  assert.match(header, /portfolioPrefixes|portfolio.*prefix/i);
});

test('unified landing composes research, projects, and reproductions without migrating detail namespaces', async () => {
  const page = await readFile('src/pages/research-projects/index.astro', 'utf8');
  assert.match(page, /getCollection\('research'\)/);
  assert.match(page, /getCollection\('projects'\)/);
  assert.match(page, /ResearchCard/);
  assert.match(page, /ProjectCard/);
  assert.match(page, /ReproductionGateway/);
  assert.match(page, /projects\/reproductions\//);
  assert.match(page, /Research &amp; Projects|Research & Projects/);
  assert.match(page, /研究与项目/);

  const researchCard = await readFile('src/components/ResearchCard.astro', 'utf8');
  const projectCard = await readFile('src/components/ProjectCard.astro', 'utf8');
  assert.match(researchCard, /research\/\$\{entry\.id\}\//);
  assert.match(projectCard, /projects\/\$\{entry\.id\}\//);
});

test('homepage presents one combined research and projects portfolio section', async () => {
  const home = await readFile('src/pages/index.astro', 'utf8');
  assert.match(home, /Research &amp; Projects|Research & Projects/);
  assert.match(home, /research-projects\//);
  assert.doesNotMatch(home, /View all research/);
  assert.doesNotMatch(home, /View all projects/);
});

test('legacy research and projects landing routes redirect to the unified page only', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /['"]\/research['"]\s*:\s*['"]\/research-projects['"]/);
  assert.match(config, /['"]\/projects['"]\s*:\s*['"]\/research-projects['"]/);
  assert.match(config, /['"]\/knowledge\/reproductions['"]\s*:\s*['"]\/projects\/reproductions['"]/);
  assert.doesNotMatch(config, /\/research\/\[\.\.\.id\].*research-projects/s);
  assert.doesNotMatch(config, /\/projects\/\[\.\.\.id\].*research-projects/s);
});
