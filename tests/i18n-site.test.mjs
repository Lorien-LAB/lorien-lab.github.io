import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('base layout initializes a deterministic site language preference', async () => {
  const source = await read('src/layouts/BaseLayout.astro');
  assert.match(source, /data-lang="en"/);
  assert.match(source, /localStorage\.getItem\(['"]site-language['"]\)/);
  assert.match(source, /document\.documentElement/);
  assert.match(source, /\.dataset\.lang\s*=/);
  assert.match(source, /\.lang\s*=/);
});

test('header exposes an accessible English-Chinese language switch', async () => {
  const header = await read('src/components/Header.astro');
  const toggle = await read('src/components/LanguageToggle.astro');
  assert.match(header, /LanguageToggle/);
  assert.match(header, /Home/);
  assert.match(header, /首页/);
  assert.match(toggle, /中文/);
  assert.match(toggle, /data-language-option="en"/);
  assert.match(toggle, /data-language-option="zh"/);
  assert.match(toggle, /localStorage\.setItem\(['"]site-language['"]/);
  assert.match(toggle, /aria-pressed/);
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
