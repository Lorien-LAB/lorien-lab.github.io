import assert from 'node:assert/strict';
import test from 'node:test';

import * as visitCounter from '../src/lib/visitCounter.mjs';

const { fetchTotalVisitCount, getGoatCounterConfig } = visitCounter;

test('visit counter stays disabled without a valid GoatCounter site code', () => {
  assert.equal(getGoatCounterConfig(undefined), null);
  assert.equal(getGoatCounterConfig(''), null);
  assert.equal(getGoatCounterConfig('https://example.com'), null);
});

test('visit counter builds canonical HTTPS endpoints from the configured site code', () => {
  assert.deepEqual(getGoatCounterConfig('  Lorien-Lab  '), {
    code: 'lorien-lab',
    trackingEndpoint: 'https://lorien-lab.goatcounter.com/count',
    trackingSettings: '{"no_session":true}',
    totalEndpoint: 'https://lorien-lab.goatcounter.com/counter/TOTAL.json?start=2026-08-01',
  });
});

test('visit counter returns the formatted total from GoatCounter', async () => {
  const result = await fetchTotalVisitCount(async () => ({
    ok: true,
    async json() {
      return { count: '1,234' };
    },
  }), 'https://lorien-lab.goatcounter.com/counter/TOTAL.json');

  assert.equal(result, '1,234');
});

test('visit counter remains hidden when the statistics request is unavailable', async () => {
  const networkFailure = await fetchTotalVisitCount(
    async () => {
      throw new Error('blocked');
    },
    'https://lorien-lab.goatcounter.com/counter/TOTAL.json',
  );
  const malformedResponse = await fetchTotalVisitCount(async () => ({
    ok: true,
    async json() {
      return {};
    },
  }), 'https://lorien-lab.goatcounter.com/counter/TOTAL.json');

  assert.equal(networkFailure, null);
  assert.equal(malformedResponse, null);
});

test('visit counter reveals both language labels only after a total is loaded', async () => {
  assert.equal(typeof visitCounter.hydrateVisitCounters, 'function');

  const labels = [{ textContent: '' }, { textContent: '' }];
  const counter = {
    dataset: {
      totalEndpoint: 'https://lorien-lab.goatcounter.com/counter/TOTAL.json',
    },
    hidden: true,
    querySelectorAll() {
      return labels;
    },
  };
  const root = {
    querySelectorAll() {
      return [counter];
    },
  };

  await visitCounter.hydrateVisitCounters(root, async () => ({
    ok: true,
    async json() {
      return { count: '9,876' };
    },
  }));

  assert.equal(counter.hidden, false);
  assert.deepEqual(labels.map(({ textContent }) => textContent), ['9,876', '9,876']);
});

test('visit counter keeps existing labels hidden when loading fails', async () => {
  const labels = [{ textContent: 'Loading' }, { textContent: '加载中' }];
  const counter = {
    dataset: {
      totalEndpoint: 'https://lorien-lab.goatcounter.com/counter/TOTAL.json?start=2026-08-01',
    },
    hidden: true,
    querySelectorAll() {
      return labels;
    },
  };
  const root = {
    querySelectorAll() {
      return [counter];
    },
  };

  await visitCounter.hydrateVisitCounters(root, async () => ({ ok: false }));

  assert.equal(counter.hidden, true);
  assert.deepEqual(labels.map(({ textContent }) => textContent), ['Loading', '加载中']);
});
