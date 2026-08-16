import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const projectPath = 'src/content/projects/systematic-futures-calendar-spread-internship.md';
const cvPath = 'src/pages/cv.astro';
const portfolioPath = 'src/pages/research-projects/index.astro';
const i18nPath = 'src/data/i18n/publicContentZh.ts';
const configPath = 'src/content.config.ts';
const layoutPath = 'src/layouts/ProjectCaseStudyLayout.astro';
const routePath = 'src/pages/projects/[...slug].astro';

test('sanitized internship project publishes only approved public facts', async () => {
  await access(projectPath);
  const project = await readFile(projectPath, 'utf8');

  assert.match(project, /title:\s*Systematic Futures Calendar-Spread Research — Internship Case Study/);
  assert.match(project, /status:\s*Internship Research/);
  assert.match(project, /featured:\s*true/);
  assert.match(project, /period:\s*May–Jul 2026/);
  assert.match(project, /2023–2026 rolling test window/);
  assert.match(project, /2 bp per leg per side/);
  assert.match(project, /Sharpe[^\n]*2\.40/);
  assert.match(project, /maximum drawdown[^\n]*5\.28%/i);
  assert.match(project, /Confidentiality note|intentionally sanitized|intentionally omitted/i);
  assert.match(project, /historical backtest/i);
  assert.match(project, /do not imply future performance|does not imply future performance/i);
});

test('sanitized internship project does not leak reconstructive strategy details', async () => {
  const project = await readFile(projectPath, 'utf8');

  for (const banned of [
    /private repository/i,
    /whitelist|blacklist/i,
    /parameter grid/i,
    /entry threshold|exit threshold/i,
    /position\s*=|signal\s*=/i,
    /main_close\s*-\s*secondary_close/i,
    /secondary_close\s*-\s*main_close/i,
  ]) {
    assert.doesNotMatch(project, banned);
  }

  assert.doesNotMatch(project, /repoUrl:/);
  assert.doesNotMatch(project, /docsUrl:/);
});

test('project metadata supports a truthful public internship period label', async () => {
  const config = await readFile(configPath, 'utf8');
  const layout = await readFile(layoutPath, 'utf8');
  const route = await readFile(routePath, 'utf8');

  assert.match(config, /period:\s*z\.string\(\)\.optional\(\)/);
  assert.match(layout, /period\?:\s*string/);
  assert.match(layout, /period\s*\?/);
  assert.match(route, /period=\{entry\.data\.period\}/);
});

test('CV links the internship summary to the sanitized case study in both languages', async () => {
  const cv = await readFile(cvPath, 'utf8');

  assert.match(cv, /projects\/systematic-futures-calendar-spread-internship\//);
  assert.match(cv, /View sanitized public case study/);
  assert.match(cv, /查看脱敏后的公开案例/);
});

test('portfolio classifies the internship as strategy research and provides Chinese card copy', async () => {
  const portfolio = await readFile(portfolioPath, 'utf8');
  const i18n = await readFile(i18nPath, 'utf8');

  assert.match(portfolio, /systematic-futures-calendar-spread-internship/);
  assert.match(portfolio, /strategyIds/);
  assert.match(i18n, /systematic-futures-calendar-spread-internship/);
  assert.match(i18n, /系统化期货跨期价差研究 — 实习案例/);
  assert.match(i18n, /实习研究/);
});
