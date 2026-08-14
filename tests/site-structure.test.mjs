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

test('portfolio exposes every required v1 surface', async () => {
  for (const file of requiredFiles) await access(file);
});

test('header contains the complete portfolio navigation', async () => {
  const source = await readFile('src/components/Header.astro', 'utf8');
  for (const label of ['Home', 'Research', 'Projects', 'Notes', 'CV', 'About']) {
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
