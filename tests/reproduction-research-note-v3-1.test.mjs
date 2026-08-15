import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const dataPath = 'src/data/reproduction-research-note/stock-index-futures-roll-basis-timing.ts';
const heroPath = 'src/components/reproduction-note/ResearchNoteHero.astro';
const chartPath = 'src/components/reproduction-note/InteractivePerformanceChart.astro';

test('v3.1 data defines flagship portfolio and exactly three subordinate strategies', async () => {
  const source = await readFile(dataPath, 'utf8');
  for (const token of ['portfolio:', 'FLAGSHIP PORTFOLIO', '39.9%', '1.46', '-24.2%', 'CORE STRATEGY', 'ALPHA OVERLAY', 'DIVERSIFIED PORTFOLIO', '13.2%', '22.6%', '26.3%']) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
  const roleMatches = source.match(/role:\s*'(?:CORE STRATEGY|ALPHA OVERLAY|DIVERSIFIED PORTFOLIO)'/g) ?? [];
  assert.equal(roleMatches.length, 3, `expected exactly 3 subordinate strategies, got ${roleMatches.length}`);
});

test('hero makes flagship performance visually primary and keeps three subordinate strategy cards', async () => {
  const hero = await readFile(heroPath, 'utf8');
  for (const token of ['FLAGSHIP PORTFOLIO', 'Annualized Return', '39.9%', 'Sharpe', '1.46', 'Max Drawdown', '-24.2%', 'strategy-stack', 'From Paper to Portfolio']) {
    assert.ok(hero.includes(token), `hero missing ${token}`);
  }
  assert.match(hero, /data\.portfolio\.strategies\.map/);
  assert.ok(!hero.includes('const cols = [data.hero.paper, data.hero.reproduced, data.hero.optimized]'), 'old equal-weight three-column hero still active');
});

test('research evolution preserves paper to portfolio lineage', async () => {
  const hero = await readFile(heroPath, 'utf8');
  for (const token of ['Orient Futures', 'Independent Reproduction', 'Optimized Roll Timing', 'Research Portfolio', '13.6%', '12.4%', '13.2%', '39.9%']) {
    assert.ok(hero.includes(token), `evolution missing ${token}`);
  }
});

test('interactive workspace exposes optimized roll, cross-maturity arb, and flagship portfolio only', async () => {
  const chart = await readFile(chartPath, 'utf8');
  for (const token of ['Optimized Roll', 'Cross-Maturity Arb', 'Flagship Portfolio', 'data-mode="portfolio"']) {
    assert.ok(chart.includes(token), `chart missing ${token}`);
  }
  assert.ok(!chart.includes('Roll + 0.5× Arb</button>'), '0.5x mix should not become a primary chart tab');
});

test('portfolio chart uses stored chart data rather than synthetic summary reconstruction', async () => {
  const source = await readFile(dataPath, 'utf8');
  assert.match(source, /portfolioChart|flagshipChart/);
  assert.match(source, /charts\.find/);
  assert.match(source, /charts:\s*\{[^}]*portfolio/s);
  assert.doesNotMatch(source, /39\.9[^\n]{0,120}cumprod|summary[^\n]{0,120}NAV/i);
});
