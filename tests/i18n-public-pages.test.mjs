import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('phase 2 public landing pages expose Chinese copy', async () => {
  const checks = [
    ['src/pages/index.astro', /研究与项目|当前关注/],
    ['src/pages/research-projects/index.astro', /研究与项目|研究方向|研究系统|策略框架/],
    ['src/pages/notes/index.astro', /研究笔记|工作中的想法/],
    ['src/pages/about.astro', /研究理念|当前主题/],
    ['src/pages/cv.astro', /教育经历|实习经历|技术技能/],
  ];

  for (const [path, pattern] of checks) {
    const source = await read(path);
    assert.match(source, pattern, `${path} is missing Phase 2 Chinese copy`);
    assert.match(source, /lang-zh/, `${path} is not connected to the shared language visibility layer`);
  }
});

test('public collection translation map covers all current research projects and notes', async () => {
  const source = await read('src/data/i18n/publicContentZh.ts');
  for (const id of [
    'automated-alpha-discovery',
    'futures-term-structure',
    'high-frequency-daily-alpha',
    'quant-research-harness',
    'llm-factor-discovery',
    'cta-research-framework',
    'research-system-design',
  ]) {
    assert.ok(source.includes(`'${id}'`), `missing Chinese presentation override for ${id}`);
  }
  assert.doesNotMatch(source, /knowledge\s*:/i, 'Phase 2 translation map must not own Knowledge content');
});

test('research project and note cards consume merge-safe Chinese presentation overrides', async () => {
  for (const path of [
    'src/components/ResearchCard.astro',
    'src/components/ProjectCard.astro',
    'src/components/NoteCard.astro',
  ]) {
    const source = await read(path);
    assert.match(source, /publicContentZh/);
    assert.match(source, /lang-en/);
    assert.match(source, /lang-zh/);
  }
});

test('phase 2 does not require content schema localization fields', async () => {
  const config = await read('src/content.config.ts');
  assert.doesNotMatch(config, /titleZh|descriptionZh|title_zh|description_zh/);
});
