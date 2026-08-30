import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const dataPath = 'src/data/reproduction-results/omd-a-share-long-only.ts';
const detailOutput = 'dist/projects/reproductions/observable-matrix-dynamics-a-share-long-only/index.html';
const indexOutput = 'dist/projects/reproductions/index.html';
const existingBrokerOutput = 'dist/projects/reproductions/stock-index-futures-roll-basis-timing/index.html';
const execFileAsync = promisify(execFile);
let buildPromise;
const buildCommand = process.platform === 'win32' ? 'cmd.exe' : 'npm';
const buildArgs = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm.cmd run build'] : ['run', 'build'];
const buildSite = () => buildPromise ??= execFileAsync(
  buildCommand,
  buildArgs,
  {
    cwd: process.cwd(),
    maxBuffer: 16 * 1024 * 1024,
  },
);

const stripHtml = (value) => value
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const extractEvidenceRoot = (html) => {
  const rootMatch = html.match(/<section\b[^>]*data-omd-evidence\b[^>]*>/);
  assert.ok(rootMatch?.index !== undefined, 'built page missing OMD evidence root');
  const start = rootMatch.index;
  const endMarker = '</section>';
  const end = html.indexOf(endMarker, start);
  assert.notEqual(end, -1, 'OMD evidence root is not closed');
  return html.slice(start, end + endMarker.length);
};

const extractEvidenceTables = (rootHtml) => [...rootHtml.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/g)].map((match) => {
  const tableHtml = match[0];
  const caption = stripHtml(tableHtml.match(/<caption\b[^>]*>([\s\S]*?)<\/caption>/)?.[1] ?? '');
  const tbody = tableHtml.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/)?.[1] ?? '';
  const rows = [...tbody.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((rowMatch) => (
    [...rowMatch[1].matchAll(/<(?:th|td)\b[^>]*>([\s\S]*?)<\/(?:th|td)>/g)].map((cellMatch) => stripHtml(cellMatch[1]))
  ));
  return { caption, rows };
});

const readEvidenceStylesheet = async (detailHtml) => {
  const href = detailHtml.match(/<link rel="stylesheet" href="(\/_astro\/_id_[^"]+\.css)">/)?.[1];
  assert.ok(href, 'built page missing detail stylesheet link');
  return readFile(`dist/${href.slice(1)}`, 'utf8');
};

const LOCAL_PATH_PATTERN = /^(?:[A-Z]:[\\/]|\\\\[^\\/]+[\\/][^\\/]+|\/\/[^/\\]+[\\/][^/\\]+|file:\/\/|~[\\/]|\/(?:[^/]+\/)+)/i;
const FORBIDDEN_PUBLIC_TERM_PATTERN = /(?:paper[_-]?faithful[_-]?shadow|a[_-]?share[_-]?lowvol[_-]?mom12|three[-_ ]lane|holdings?|orders?|ledger|forecasts?|config(?:uration)?(?:url)?|results?url|hash|\bL[13]\b)/i;

const assertPublicPayloadSafe = (value, location = '$') => {
  if (typeof value === 'string') {
    assert.doesNotMatch(value, LOCAL_PATH_PATTERN, `local path at ${location}`);
    assert.doesNotMatch(value, FORBIDDEN_PUBLIC_TERM_PATTERN, `forbidden public term at ${location}`);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertPublicPayloadSafe(item, `${location}[${index}]`));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      assert.doesNotMatch(key, LOCAL_PATH_PATTERN, `local path key at ${location}.${key}`);
      assert.doesNotMatch(key, FORBIDDEN_PUBLIC_TERM_PATTERN, `forbidden public key at ${location}.${key}`);
      assertPublicPayloadSafe(child, `${location}.${key}`);
    }
  }
};

test('OMD L2 public evidence freezes the approved stitched headline', async () => {
  const moduleUrl = `${pathToFileURL(dataPath).href}?test=${Date.now()}`;
  const { omdL2Evidence } = await import(moduleUrl);
  assert.equal(omdL2Evidence.slug, 'observable-matrix-dynamics-a-share-long-only');
  assert.deepEqual(omdL2Evidence.stitchedPeriod, {
    start: '2024-01-02', end: '2026-06-30', label: 'OOS1 → OOS2 Stitched',
    aggregation: 'Equal-weighted daily returns across three independent index sleeves',
  });
  assert.deepEqual(omdL2Evidence.capitalScenarios.map((scenario) => ({
    key: scenario.key,
    totalNominalCapitalCny: scenario.totalNominalCapitalCny,
    ...scenario.headline,
  })), [
    { key: '100m', totalNominalCapitalCny: 300_000_000, annualReturn: 0.202245, sharpe: 0.794502, maxDrawdown: -0.224887 },
    { key: '500m', totalNominalCapitalCny: 1_500_000_000, annualReturn: 0.191262, sharpe: 0.760208, maxDrawdown: -0.223963 },
  ]);
});

test('OMD L2 public evidence contains only aggregate L2-safe values', async () => {
  const moduleUrl = `${pathToFileURL(dataPath).href}?privacy=${Date.now()}`;
  const { omdL2Evidence } = await import(moduleUrl);
  assertPublicPayloadSafe(omdL2Evidence);
});

const legacyRootOnlyPrivacyGate = (payload) => {
  const publicPayload = JSON.stringify(payload);
  assert.doesNotMatch(publicPayload, /[A-Z]:\\|[A-Z]:\//);
  assert.doesNotMatch(publicPayload, /paper_faithful_shadow|a_share_lowvol_mom12|three[- ]lane/i);
  assert.doesNotMatch(publicPayload, /\bL1\b|\bL3\b/);
  for (const privateKey of ['holdings', 'orders', 'ledger', 'forecasts', 'configurationUrl', 'resultsUrl']) {
    assert.equal(Object.hasOwn(payload, privateKey), false, `unexpected public key ${privateKey}`);
  }
};

test('recursive L2 privacy gate catches nested private mutation missed by the legacy gate', async () => {
  const moduleUrl = `${pathToFileURL(dataPath).href}?nested=${Date.now()}`;
  const { omdL2Evidence } = await import(moduleUrl);
  const nestedMutation = JSON.parse(JSON.stringify(omdL2Evidence));
  nestedMutation.capacity.audit = {
    holdings: 'c:\\private\\holdings.parquet',
    orders: '//server/share/orders.csv',
    ledger: { forecast: '/home/lorien/forecast.json' },
    configuration: {
      hash: 'private-result-hash',
      path: 'file:///Users/lorien/config.json',
    },
  };

  assert.doesNotThrow(() => legacyRootOnlyPrivacyGate(nestedMutation));
  assert.throws(
    () => assertPublicPayloadSafe(nestedMutation),
    (error) => error?.name === 'AssertionError' && /nestedMutation|capacity\.audit/i.test(error.message),
  );
});

test('recursive L2 privacy gate rejects common local path spellings', () => {
  const pathSamples = [
    'C:\\private\\config.json',
    'c:/private/config.json',
    '\\\\server\\share\\config.json',
    '//server/share/config.json',
    'FILE:///C:/private/config.json',
    'file:///Users/lorien/config.json',
    '/home/lorien/config.json',
    '/tmp/omd-config.json',
    '/var/lib/omd/config.json',
  ];

  for (const path of pathSamples) {
    assert.throws(
      () => assertPublicPayloadSafe({ nested: { path } }),
      (error) => error?.name === 'AssertionError' && /local path/i.test(error.message),
      path,
    );
  }
});

test('built workbench publishes one featured private-code OMD academic record', async () => {
  await buildSite();
  const [indexHtml, detailHtml] = await Promise.all([
    readFile(indexOutput, 'utf8'), readFile(detailOutput, 'utf8'),
  ]);
  assert.match(indexHtml, /Academic Papers<\/span>\s*<strong[^>]*>1<\/strong>/);
  assert.match(indexHtml, /href="\/projects\/reproductions\/observable-matrix-dynamics-a-share-long-only\/"/);
  assert.match(indexHtml, /Are Three Matrices All You Need To Beat the Market\? · A股 Long-Only Reproduction/);
  for (const visible of [
    'OMD Portfolio Optimization · A股 Long-Only Reproduction',
    'Academic Paper', 'Portfolio Construction', 'Partial', 'Implementation Private',
    'Igor Halperin', '2026', 'Point-in-time and causality', 'Cross-window stability',
  ]) assert.ok(detailHtml.includes(visible), `built detail missing ${visible}`);
  assert.match(detailHtml, /href="https:\/\/arxiv\.org\/abs\/2607\.27461"/);
  assert.doesNotMatch(detailHtml, /View Research Code|View Code|Repository ↗|Configuration ↗|Results ↗/);
});

test('built OMD narrative is bilingual, stitched-first, and public-safe', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  for (const heading of [
    'Research question', 'Paper mechanism', 'A-share long-only adaptation',
    'Data and point-in-time universe', 'Portfolio construction',
    'Execution and cost model', 'No-lookahead validation', 'Empirical results',
    'Benchmark comparison', 'Capacity and robustness', 'Limitations', 'Conclusion',
  ]) assert.ok(detailHtml.includes(heading), `built narrative missing ${heading}`);
  for (const visible of ['20.22%', '19.13%', 'CSI 1000', 'OOS1', 'OOS2', '下一开盘成交', '时点成分股', '涨跌停', '停牌']) {
    assert.ok(detailHtml.includes(visible), `built narrative missing ${visible}`);
  }
  assert.match(detailHtml, /not an investment recommendation/i);
  assert.doesNotMatch(detailHtml, /[A-Z]:\\|[A-Z]:\//);
  assert.doesNotMatch(detailHtml, /paper_faithful_shadow|a_share_lowvol_mom12|three[- ]lane/i);
  assert.doesNotMatch(detailHtml, /\bL1\b|\bL3\b/);
});

test('built OMD benchmark classification names the executed PIT account and non-executable index', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  assert.match(detailHtml, /executed PIT equal-weight account/i);
  assert.match(detailHtml, /executed PIT equal-weight account, not merely a membership-weight series\. It uses the exact signal-date PIT membership/i);
  assert.match(detailHtml, /same next-open A-share execution/i);
  assert.match(detailHtml, /modeled costs and capacity/i);
  assert.match(detailHtml, /frozen last-close delist convention/i);
  assert.match(detailHtml, /official price index[^.]*not an executable account/i);
});

test('OMD L2 evidence panel is accessible and progressively enhanced', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  for (const visible of [
    'OOS1 → OOS2 Stitched', 'Annualized Return', 'Sharpe', 'Max Drawdown',
    'CNY 100m / sleeve', 'CNY 500m / sleeve',
    'CSI 300', 'CSI 500', 'CSI 1000', 'Combined',
    'Official price index', 'PIT equal-weight', 'ADV participation cap',
    '20.22%', '19.13%', '-3.50%', '-4.86%',
  ]) assert.ok(detailHtml.includes(visible), `built panel missing ${visible}`);
  assert.match(detailHtml, /data-omd-evidence/);
  assert.match(detailHtml, /data-omd-capital="100m"[^>]*aria-pressed="true"/);
  assert.match(detailHtml, /data-omd-capital="500m"[^>]*aria-pressed="false"/);
  assert.match(detailHtml, /data-omd-capital-panel="100m"/);
  assert.match(detailHtml, /data-omd-capital-panel="500m"[^>]*hidden/);
  const evidenceTables = extractEvidenceTables(extractEvidenceRoot(detailHtml));
  assert.deepEqual(evidenceTables, [
    {
      caption: 'Exact index and combined annual returns',
      rows: [
        ['OOS1', '100m', '13.20%', '9.19%', '-3.50%', '6.60%'],
        ['OOS1', '500m', '12.98%', '7.75%', '-4.86%', '5.56%'],
        ['OOS2', '100m', '36.63%', '65.96%', '29.11%', '43.70%'],
        ['OOS2', '500m', '36.65%', '65.21%', '26.54%', '42.53%'],
      ],
    },
    {
      caption: 'Independent-window robustness',
      rows: [
        ['OOS1', '100m', '6.60%', '29.13%', '0.36', '-22.49%', '0.29'],
        ['OOS1', '500m', '5.56%', '29.30%', '0.33', '-22.40%', '0.25'],
        ['OOS2', '100m', '43.70%', '26.38%', '1.51', '-13.63%', '3.21'],
        ['OOS2', '500m', '42.53%', '26.35%', '1.48', '-13.63%', '3.12'],
      ],
    },
    {
      caption: 'Official price index and PIT equal-weight comparison',
      rows: [
        ['OOS1', '100m', '6.60%', '7.61%', '9.14%'],
        ['OOS1', '500m', '5.56%', '7.61%', '9.11%'],
        ['OOS2', '100m', '43.70%', '41.00%', '23.68%'],
        ['OOS2', '500m', '42.53%', '41.00%', '23.54%'],
      ],
    },
  ]);
});

test('OMD L2 capital controls expose keyboard activation in the built browser surface', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  assert.match(detailHtml, /addEventListener\(['"]keydown['"]/);
  assert.match(detailHtml, /key\s*===\s*['"]Enter['"]/);
  assert.match(detailHtml, /key\s*===\s*['"] ['"]/);
});

test('OMD L2 evidence stylesheet uses responsive two-column charts and theme-safe pressed controls', async () => {
  await buildSite();
  const detailHtml = await readFile(detailOutput, 'utf8');
  const stylesheet = await readEvidenceStylesheet(detailHtml);
  const baseChartRule = stylesheet.match(/\.bar-chart\[data-astro-cid-[^\]]+\]\{[^}]*\}/)?.[0];
  assert.ok(baseChartRule, 'missing scoped bar-chart rule');
  assert.match(baseChartRule, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(baseChartRule, /grid-template-columns:repeat\(4/);
  assert.match(stylesheet, /\.bar-chart\[data-astro-cid-[^\]]+\]\{grid-template-columns:1fr\}/);
  assert.match(stylesheet, /\.capital-controls\[data-astro-cid-[^\]]+\]\sbutton\[data-astro-cid-[^\]]+\]\[aria-pressed=true\]\{[^}]*color:var\(--hero\)/);
  assert.doesNotMatch(stylesheet, /\.capital-controls\[data-astro-cid-[^\]]+\]\sbutton\[data-astro-cid-[^\]]+\]\[aria-pressed=true\]\{[^}]*#03140e/);
  assert.equal((stylesheet.match(/prefers-reduced-motion/g) ?? []).length, 1);
});

test('OMD L2 panel is isolated to its canonical reproduction slug', async () => {
  await buildSite();
  const [omdHtml, brokerHtml] = await Promise.all([
    readFile(detailOutput, 'utf8'), readFile(existingBrokerOutput, 'utf8'),
  ]);
  assert.match(omdHtml, /data-omd-evidence/);
  assert.doesNotMatch(brokerHtml, /data-omd-evidence|OOS1 → OOS2 Stitched/);
  assert.match(brokerHtml, /股指期货滚贴水择时与市场情绪因子/);
});
