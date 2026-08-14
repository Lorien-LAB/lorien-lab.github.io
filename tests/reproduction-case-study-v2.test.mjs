import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const recordPath = 'src/content/reproductions/broker/stock-index-futures-roll-basis-timing.md';
const detailPath = 'src/pages/projects/reproductions/[...id].astro';

const componentPaths = [
  'src/components/ReproductionCaseStudyHeader.astro',
  'src/components/ReproductionVerdictGrid.astro',
  'src/components/ReproductionFactorEvidence.astro',
  'src/components/ReproductionStrategyFlow.astro',
  'src/components/ReproductionLimitations.astro',
  'src/components/ReproductionExtensionPanel.astro',
];

test('reproduction schema supports optional structured case studies', async () => {
  const schema = await readFile('src/content.config.ts', 'utf8');
  for (const field of ['caseStudy', 'verdicts', 'factorEvidence', 'strategyFlow', 'limitations', 'extension']) {
    assert.match(schema, new RegExp(field), `missing ${field} in reproduction schema`);
  }
  assert.match(schema, /caseStudy[\s\S]*\.optional\(\)/);
});

test('case study rendering is composed from reusable components without removing generic mode', async () => {
  for (const path of componentPaths) await access(path);
  const detail = await readFile(detailPath, 'utf8');

  assert.match(detail, /entry\.data\.caseStudy/);
  for (const component of [
    'ReproductionCaseStudyHeader',
    'ReproductionVerdictGrid',
    'ReproductionFactorEvidence',
    'ReproductionStrategyFlow',
    'ReproductionLimitations',
    'ReproductionExtensionPanel',
  ]) assert.match(detail, new RegExp(component), `detail route missing ${component}`);

  assert.match(detail, /entry\.data\.title/);
  assert.match(detail, /<Content\s*\/>/);
  assert.match(detail, /ReproductionScore/);
});

test('stock index futures record opts into case-study mode with honest replication verdicts', async () => {
  const record = await readFile(recordPath, 'utf8');
  assert.match(record, /caseStudy:/);
  assert.match(record, /shortTitle:\s*["']股指期货滚贴水择时与市场情绪因子["']/);

  for (const label of [
    'Basis & roll engine',
    'Sentiment-factor layer',
    'IC multi-factor timing',
    'IC cross-maturity arbitrage',
    'IM timing',
    'Exact Figure-53 strategy selection',
  ]) assert.ok(record.includes(label), `missing verdict ${label}`);

  assert.match(record, /IM timing[\s\S]{0,240}status:\s*partial/);
  assert.match(record, /Exact Figure-53 strategy selection[\s\S]{0,260}status:\s*partial/);
});

test('case study exposes the seven representative factor comparisons', async () => {
  const record = await readFile(recordPath, 'utf8');
  const expected = [
    ['IC annualized volatility', '-0.35', '-0.356'],
    ['IC amplitude', '-0.34', '-0.341'],
    ['IC constituent ADR', '+0.15', '+0.142'],
    ['IC constituent return dispersion', '-0.30', '-0.302'],
    ['IM annualized volatility', '-0.59', '-0.594'],
    ['IM constituent return dispersion', '-0.19', '-0.153'],
    ['IM VIX', '-0.59', '-0.596'],
  ];

  for (const [factor, paper, reproduced] of expected) {
    assert.ok(record.includes(factor), `missing factor ${factor}`);
    assert.ok(record.includes(paper), `missing paper rho ${paper}`);
    assert.ok(record.includes(reproduced), `missing reproduced rho ${reproduced}`);
  }
});

test('baseline evidence and later extension evidence remain explicitly separated', async () => {
  const record = await readFile(recordPath, 'utf8');

  for (const value of ['+2.0%', '+2.6%', '+20.7%', '+25.2%', '+0.7%', '+1.5%']) {
    assert.ok(record.includes(value), `missing baseline evidence ${value}`);
  }

  assert.match(record, /Asymmetric Hysteresis Confirmation/);
  assert.match(record, /\+1\.32%/);
  assert.match(record, /\+4\.10%/);
  assert.match(record, /2025-10[\s\S]{0,120}2026-06/);
  assert.doesNotMatch(record, /Figure-53[^\n]{0,100}fully reproduced/i);
});

test('record links to the actual Reproduction03 research lineage', async () => {
  const record = await readFile(recordPath, 'utf8');
  assert.match(record, /https:\/\/github\.com\/Lorien-LAB\/Index-Timing\/tree\/master\/Reproduction03/);
  assert.match(record, /https:\/\/github\.com\/Lorien-LAB\/Index-Timing\/blob\/master\/Reproduction03\/configs\/repro03\.yaml/);
  assert.match(record, /https:\/\/github\.com\/Lorien-LAB\/Index-Timing\/blob\/master\/Reproduction03\/doc\/reproduction_report\.md/);
});

test('case-study charts use an explicit question-driven selection plan', async () => {
  const charts = await readFile('src/components/ReproductionCharts.astro', 'utf8');
  assert.match(charts, /chartPlan|chartSelection|selectedCharts/);
  assert.match(charts, /Replication/);
  assert.match(charts, /IC/);
  assert.doesNotMatch(charts, /charts\.forEach\s*\(/);

  const plannedMatches = charts.match(/eyebrow:\s*['"](?:Replication|Extension)['"]/g) ?? [];
  assert.ok(plannedMatches.length <= 3, `expected at most 3 planned case-study charts, got ${plannedMatches.length}`);
});
