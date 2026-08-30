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
const buildSite = () => buildPromise ??= execFileAsync(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['run', 'build'],
  { cwd: process.cwd(), maxBuffer: 16 * 1024 * 1024 },
);

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
  const publicPayload = JSON.stringify(omdL2Evidence);
  assert.doesNotMatch(publicPayload, /[A-Z]:\\|[A-Z]:\//);
  assert.doesNotMatch(publicPayload, /paper_faithful_shadow|a_share_lowvol_mom12|three[- ]lane/i);
  assert.doesNotMatch(publicPayload, /\bL1\b|\bL3\b/);
  for (const privateKey of ['holdings', 'orders', 'ledger', 'forecasts', 'configurationUrl', 'resultsUrl']) {
    assert.equal(Object.hasOwn(omdL2Evidence, privateKey), false, `unexpected public key ${privateKey}`);
  }
});
