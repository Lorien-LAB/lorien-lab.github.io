import { test, expect } from '@playwright/test';

const route = '/projects/reproductions/stock-index-futures-roll-basis-timing/';

test('chart labels stay readable with dates and adequate height at the current viewport', async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('#rn-nav svg')).toBeVisible();
  const labels = await page.locator('#rn-nav svg text, #rn-dd svg text').evaluateAll((nodes) => nodes.map((node) => {
    const matrix = node.getScreenCTM();
    return { text: node.textContent, size: parseFloat(getComputedStyle(node).fontSize) * Math.hypot(matrix.c, matrix.d) };
  }));
  expect(labels.length).toBeGreaterThan(0);
  expect(Math.min(...labels.map((label) => label.size))).toBeGreaterThanOrEqual(10);
  expect(labels.filter((label) => /^\d{4}-\d{2}-\d{2}$/.test(label.text)).length).toBeGreaterThanOrEqual(2);
  expect((await page.locator('#rn-nav svg').boundingBox()).height).toBeGreaterThanOrEqual(260);
  expect((await page.locator('#rn-dd svg').boundingBox()).height).toBeGreaterThanOrEqual(145);
});

test('chart keyboard and pointer inspection exposes dates and values across modes and ranges', async ({ page, isMobile }) => {
  await page.goto(route);
  const slider = page.locator('#rn-inspect');
  const inspection = page.locator('#rn-inspection');
  await expect(slider).toBeVisible();
  await expect(slider).toBeEnabled();
  await slider.focus();
  await slider.press('Home');
  await expect(inspection).toContainText(/\d{4}-\d{2}-\d{2}/);
  const first = await inspection.textContent();
  await slider.press('ArrowRight');
  await expect(inspection).not.toHaveText(first);
  for (const panel of ['#rn-nav', '#rn-dd']) {
    await slider.press('Home');
    const beforeValue = await slider.inputValue();
    const beforeInspection = await inspection.textContent();
    const overlay = page.locator(`${panel} [data-chart-inspect]`);
    if (isMobile) await overlay.tap({ position: { x: 40, y: 40 } });
    else await overlay.click({ position: { x: 40, y: 40 } });
    await expect(slider).not.toHaveValue(beforeValue);
    await expect(inspection).not.toHaveText(beforeInspection);
    await expect(inspection).toContainText(/\d{4}-\d{2}-\d{2}/);
    await expect(inspection).toContainText(/\d+\.\d+/);
  }
  await page.locator('[data-mode="portfolio"]').click();
  await page.locator('[data-range="oos"]').click();
  await expect(page.locator('#rn-chart-title')).toHaveText('Flagship Portfolio');
  await expect(inspection).toContainText(/\d{4}-\d{2}-\d{2}/);
  const window = await page.locator('#rn-metrics strong').last().textContent();
  const start = window.match(/\d{4}-\d{2}-\d{2}/)[0];
  await slider.press('Home');
  await expect(inspection).toContainText(start);
});

test('chart resize preserves inspected date and matches the available width', async ({ page, isMobile }) => {
  await page.goto(route);
  const slider = page.locator('#rn-inspect');
  await expect(slider).toBeEnabled();
  await slider.press('Home');
  await slider.press('ArrowRight');
  const before = await page.locator('#rn-inspection').textContent();
  await page.setViewportSize(isMobile ? { width: 430, height: 844 } : { width: 1000, height: 900 });
  await expect.poll(() => page.locator('#rn-nav svg').evaluate((svg) =>
    Math.abs(svg.viewBox.baseVal.width - svg.getBoundingClientRect().width)
  )).toBeLessThan(2);
  await expect(page.locator('#rn-inspection')).toHaveText(before);
});
