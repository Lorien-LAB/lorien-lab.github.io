import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const requiredFiles = [
  'src/pages/index.astro',
  'src/pages/research/index.astro',
  'src/pages/projects/index.astro',
  'src/pages/notes/index.astro',
  'src/pages/cv.astro',
  'src/pages/about.astro',
  'src/components/Header.astro',
  'src/components/Hero.astro',
  'src/content.config.ts',
  '.github/workflows/deploy.yml',
  'README.md',
];

const knowledgeFiles = [
  'src/pages/knowledge/index.astro',
  'src/pages/knowledge/[...id].astro',
  'src/content/knowledge/concepts/walk-forward-validation.md',
  'src/content/knowledge/concepts/fama-macbeth-regression.md',
  'src/content/knowledge/tools/rqalpha.md',
  'src/content/knowledge/topics/automated-factor-discovery.md',
];

test('portfolio exposes every required v1 surface', async () => {
  for (const file of requiredFiles) await access(file);
});

test('header contains the complete portfolio navigation', async () => {
  const source = await readFile('src/components/Header.astro', 'utf8');
  for (const label of ['Home', 'Research', 'Projects', 'Knowledge', 'Notes', 'CV', 'About']) {
    assert.ok(source.includes(`['${label}',`) || source.includes(`>${label}<`), `missing ${label} navigation item`);
  }
});

test('homepage positions the site around quantitative research without fabricated performance', async () => {
  const source = await readFile('src/components/Hero.astro', 'utf8');
  assert.match(source, /Turning Data Into/);
  assert.match(source, /Alpha\./);
  assert.doesNotMatch(source, /Sharpe Ratio|Annual Return|Max Drawdown|1\.87|24\.31/);
});

test('deployment workflow targets GitHub Pages', async () => {
  const source = await readFile('.github/workflows/deploy.yml', 'utf8');
  assert.match(source, /withastro\/action@v6/);
  assert.match(source, /actions\/deploy-pages/);
  assert.match(source, /pages: write/);
});

test('knowledge base exposes its content model and required surfaces', async () => {
  for (const file of knowledgeFiles) await access(file);

  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const knowledge = defineCollection/);
  for (const type of ['concept', 'paper', 'tool', 'topic']) {
    assert.ok(config.includes(`'${type}'`), `knowledge schema missing ${type} type`);
  }
  assert.match(config, /seed/);
  assert.match(config, /growing/);
  assert.match(config, /mature/);
});

test('knowledge base navigation and homepage integration are present', async () => {
  const header = await readFile('src/components/Header.astro', 'utf8');
  assert.ok(header.includes("['Knowledge', '/knowledge/']"));

  const home = await readFile('src/pages/index.astro', 'utf8');
  assert.match(home, /Knowledge Base/);
  assert.match(home, /Explore Knowledge/);
});

test('Obsidian knowledge graph is explicitly coming soon and is not a dead link', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(source, /Obsidian Knowledge Graph/);
  assert.match(source, /Coming Soon/);
  assert.doesNotMatch(source, /<a[^>]+href=[^>]*obsidian/i);
});

test('knowledge page derives counts instead of hard-coding invented corpus statistics', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.doesNotMatch(source, /184 Concepts|36 Papers|22 Tools|14 Research Topics/);
  assert.match(source, /entries\.filter|knowledge\.filter|domainCount|counts|length/);
});
