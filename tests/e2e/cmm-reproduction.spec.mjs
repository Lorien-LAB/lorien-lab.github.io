import { test, expect } from '@playwright/test';

const route = '/projects/reproductions/cmm-path-weighted-momentum-a-share/';

test('CMM broker record exposes bounded evidence and a loaded public NAV chart', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  const indexResponse = await page.goto('/projects/reproductions/');
  expect(indexResponse?.status()).toBe(200);
  await page.locator('[data-source-filter]').selectOption('broker');
  await page.locator('[data-reproduction-search]').fill('CMM');
  const visibleRows = page.locator('[data-reproduction-row]:visible');
  await expect(visibleRows).toHaveCount(1);
  await expect(visibleRows).toHaveAttribute('data-result', 'inconclusive');
  await expect(visibleRows).toHaveAttribute('data-visibility', 'private');
  await visibleRows.locator(`a[href="${route}"]`).click();

  await expect(page).toHaveURL(new RegExp(`${route.replaceAll('/', '\\/')}$`));
  await expect(page).toHaveTitle(/CMM.*Lorien Lab/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CMM');
  await expect(page.locator('.source-meta')).toContainText('华福证券');
  await expect(page.locator('.status-line')).toContainText('Inconclusive');
  await expect(page.locator('.status-line')).toContainText('Implementation Private');

  const metrics = await page.locator('.metrics').innerText();
  for (const pair of ['8.50% → 8.26%', '0.69 → 0.64', '23.16% → 10.99%', '0.77 → 0.51', '-49.97% → -47.09%']) {
    expect(metrics).toContain(pair);
  }
  const article = await page.locator('main.prose').innerText();
  expect(article).toContain('证据或数据不足');
  expect(article).toContain('000985.SH');
  expect(article).toContain('2022');
  expect(article).toContain('2023');
  expect(article).toContain('2025');
  expect(article).not.toMatch(/[A-Z]:\\|file:\/\/|output\/cmm-|完全复现成功/i);
  expect(await page.content()).not.toMatch(/(?<![A-Za-z])[A-Za-z]:[\\/]|file:\/\/|output\/cmm-|\/home\//i);

  const chart = page.getByRole('img', { name: /CMM Top20.*中证全指/ });
  await expect(chart).toBeVisible();
  await chart.scrollIntoViewIfNeeded();
  await expect.poll(() => chart.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  if (page.viewportSize().width <= 390) {
    expect((await chart.boundingBox()).width).toBeGreaterThanOrEqual(340);
  }
  await expect(page.getByRole('link', { name: '查看原尺寸图表' })).toHaveAttribute(
    'href', '/reproductions/cmm-path-weighted-momentum-a-share/long-horizon-nav.png');
  await expect(page.locator('.artifact-links a')).toHaveCount(0);
  await expect(page.locator('astro-error-overlay, vite-error-overlay')).toHaveCount(0);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width + 1);
});
