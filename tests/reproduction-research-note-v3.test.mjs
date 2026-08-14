import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const dataPath = 'src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts';
const routePath = 'src/pages/projects/reproductions/[...id].astro';
const recordPath = 'src/content/reproductions/broker/stock-index-futures-roll-basis-timing.md';
const components = [
  'src/components/reproduction-note/ResearchNoteHero.astro',
  'src/components/reproduction-note/InteractivePerformanceChart.astro',
  'src/components/reproduction-note/OriginalStrategyStory.astro',
  'src/components/reproduction-note/ReproductionAuditStory.astro',
  'src/components/reproduction-note/OptimizationStory.astro',
  'src/components/reproduction-note/ResearchAuditAppendix.astro',
];

test('v3 research note locks the latest H-M evidence contract', async () => {
  await access(dataPath);
  const data = await readFile(dataPath, 'utf8');
  for (const token of [
    "cutoff: '2026-06-26'", "oosStart: '2025-10-01'",
    'paper:', 'reproduced:', 'optimized:',
    "annualizedReturn: '13.6%'", "annualizedReturn: '12.4%'", "annualizedReturn: '13.2%'",
    "fullSampleImprovement: '+1.30%'", "oosImprovement: '+5.38%'", "switchesPerYear: '~3.8'",
    'primaryFactors: 10', 'secondaryFactors: 55', 'retainedFactors: 7', 'timingMethods: 18',
    'deep-discount anchor', 'q=0.15',
  ]) assert.ok(data.includes(token), `missing ${token}`);

  for (const factor of ['IC annualized volatility', 'IC amplitude', 'IC ADR', 'IC dispersion', 'IM annualized volatility', 'IM dispersion', 'IM VIX']) {
    assert.ok(data.includes(factor), `missing factor ${factor}`);
  }
});

test('v3 page uses a dedicated research-note composition while preserving generic mode', async () => {
  for (const path of components) await access(path);
  const route = await readFile(routePath, 'utf8');
  assert.match(route, /stock-index-futures-roll-basis-timing/);
  for (const name of ['ResearchNoteHero', 'InteractivePerformanceChart', 'OriginalStrategyStory', 'ReproductionAuditStory', 'OptimizationStory', 'ResearchAuditAppendix']) {
    assert.match(route, new RegExp(name), `missing ${name}`);
  }
  assert.match(route, /<Content\s*\/>/);
});

test('hero exposes absolute performance before relative alpha', async () => {
  const hero = await readFile('src/components/reproduction-note/ResearchNoteHero.astro', 'utf8');
  for (const token of ['Annualized Return', 'Sharpe', 'Max Drawdown', 'Orient Futures', 'Reproduced', 'Optimized', 'Higher performance, without higher turnover.']) {
    assert.ok(hero.includes(token), `hero missing ${token}`);
  }
});

test('primary chart is one interactive NAV and drawdown workspace', async () => {
  const chart = await readFile('src/components/reproduction-note/InteractivePerformanceChart.astro', 'utf8');
  for (const token of ['Roll Timing', 'Cross-Maturity Arbitrage', 'All', 'In Sample', 'OOS', 'OUT OF SAMPLE', 'Annualized Return', 'Sharpe', 'Max Drawdown', 'Drawdown']) {
    assert.ok(chart.includes(token), `chart missing ${token}`);
  }
  assert.match(chart, /mousemove|pointermove/);
  assert.doesNotMatch(chart, /paperNav|paperNAV|syntheticPaper/i);
});

test('original strategy section explains the model end to end', async () => {
  const story = await readFile('src/components/reproduction-note/OriginalStrategyStory.astro', 'utf8');
  for (const token of ['01 · The Opportunity', '02 · The Original Strategy', 'Roll Premium', 'current-quarter annualized basis', '10', '55', '7', '18', 'Spearman', 'Zig-zag', 'current-quarter', 'current-month']) {
    assert.ok(story.includes(token), `original story missing ${token}`);
  }
  assert.match(story, /not[^\n]{0,80}tradable|不[^\n]{0,80}交易信号/i);
});

test('reproduction audit surfaces engineering and unresolved deviations', async () => {
  const audit = await readFile('src/components/reproduction-note/ReproductionAuditStory.astro', 'utf8');
  for (const token of ['529', 'PIT', '33', 'Figure 53', 'price-index', 'total-return', 'IM']) {
    assert.ok(audit.includes(token), `audit missing ${token}`);
  }
});

test('optimization story shows diagnosis, ablations, negative controls and latest selected rule', async () => {
  const story = await readFile('src/components/reproduction-note/OptimizationStory.astro', 'utf8');
  for (const token of ['ADR', '13.8', 'aggregate', 'Hysteresis', '10/5', 'q=0.15', 'Ablation', 'Negative Control', 'IM+IC 50/50', '+5.38%', '+1.30%']) {
    assert.ok(story.includes(token), `optimization story missing ${token}`);
  }
  assert.match(story, /adaptive[^\n]{0,100}(rejected|证伪)/i);
  assert.match(story, /IM[^\n]{0,120}(worse|negative|变差|负)/i);
});

test('audit metadata is demoted to the end of the research story', async () => {
  const appendix = await readFile('src/components/reproduction-note/ResearchAuditAppendix.astro', 'utf8');
  for (const token of ['Research Audit', 'Data Match', 'Method Match', 'Reproducibility', '2025-10', 'transaction costs', 'Index-Timing/Reproduction03']) {
    assert.ok(appendix.includes(token), `appendix missing ${token}`);
  }
});

test('active record no longer presents the early A-G optimization as the final result', async () => {
  const record = await readFile(recordPath, 'utf8');
  assert.doesNotMatch(record, /\+4\.10%[\s\S]{0,200}(final|selected|最终|推荐)/i);
});
