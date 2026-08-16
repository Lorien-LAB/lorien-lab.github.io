import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('base layout initializes and persists a site language preference', async () => {
  const source = await read('src/layouts/BaseLayout.astro');
  assert.match(source, /data-lang="en"/);
  assert.match(source, /localStorage\.getItem\(['"]site-language['"]\)/);
  assert.match(source, /document\.documentElement\.dataset\.lang/);
  assert.match(source, /document\.documentElement\.lang/);
});

test('header exposes an accessible English-Chinese language switch', async () => {
  const source = await read('src/components/Header.astro');
  assert.match(source, /LanguageToggle/);
  assert.match(source, /中文/);
  assert.match(source, /Home/);
  assert.match(source, /首页/);
});

test('shared shell and home hero provide bilingual copy', async () => {
  const footer = await read('src/components/Footer.astro');
  const hero = await read('src/components/Hero.astro');
  assert.match(footer, /Quantitative research/);
  assert.match(footer, /量化研究/);
  assert.match(hero, /Turning Data Into/);
  assert.match(hero, /将数据转化为/);
});

test('language visibility rules are global and deterministic', async () => {
  const css = await read('src/styles/global.css');
  assert.match(css, /html\[data-lang=['"]en['"]\].*lang-zh/s);
  assert.match(css, /html\[data-lang=['"]zh['"]\].*lang-en/s);
});
