import { test, expect } from '@playwright/test';

const chinese = /[\u3400-\u9fff]/;
const expectVisibleChinese = (locator) => expect.poll(() => locator.innerText()).toMatch(chinese);

async function expectAnchorClear(page, selector) {
  await expect.poll(() => page.locator(selector).evaluate((target) => {
    const top = target.getBoundingClientRect().top;
    const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
    return top >= headerBottom && top < window.innerHeight / 2;
  })).toBe(true);
}

test('Chinese knowledge controls translate without changing selected filters or URL', async ({ page }) => {
  await page.goto('/knowledge/?domain=Machine+Learning&type=topic&q=factor');
  await expect(page.locator('[data-domain-filter]')).toHaveValue('Machine Learning');
  const url = page.url();
  const rows = await page.locator('[data-knowledge-row]:visible').evaluateAll((items) => items.map((item) => item.href));
  await page.locator('[data-language-option="zh"]').click();
  await expectVisibleChinese(page.locator('main h1'));
  await expect(page.locator('[data-knowledge-search]')).toHaveAttribute('placeholder', chinese);
  await expect(page.locator('[data-domain-filter] option:checked')).toHaveText(chinese);
  await expect(page.locator('[data-type-filter] option:checked')).toHaveText(chinese);
  await expectVisibleChinese(page.locator('[data-filter-reset]'));
  for (const selector of ['[data-knowledge-search]', '[data-domain-filter]', '[data-type-filter]']) {
    await expectVisibleChinese(page.locator(selector).locator('..'));
  }
  await expect(page.locator('[data-knowledge-search]')).toHaveValue('factor');
  await expect(page.locator('[data-domain-filter]')).toHaveValue('Machine Learning');
  await expect(page.locator('[data-type-filter]')).toHaveValue('topic');
  expect(page.url()).toBe(url);
  expect(await page.locator('[data-knowledge-row]:visible').evaluateAll((items) => items.map((item) => item.href))).toEqual(rows);
  await page.locator('[data-language-option="en"]').click();
  await expect(page.locator('[data-knowledge-search]')).toHaveAttribute('placeholder', /Search/);
  expect(page.url()).toBe(url);
});

test('Chinese directory controls retain search and selected publication state', async ({ page }) => {
  await page.goto('/knowledge/quant-interview/directory/');
  await page.locator('[data-directory-search]').fill('Quant Role');
  await page.locator('[data-status-filter="published"]').click();
  await expect(page.locator('[data-directory-row]:visible')).toHaveCount(1);
  await page.locator('[data-language-option="zh"]').click();
  await expectVisibleChinese(page.locator('main h1'));
  await expect(page.locator('[data-directory-search]')).toHaveAttribute('placeholder', chinese);
  await expectVisibleChinese(page.locator('[data-status-filter="published"]'));
  await expect(page.locator('[data-status-filter="published"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-directory-search]')).toHaveValue('Quant Role');
  await expect(page.locator('[data-directory-row]:visible')).toHaveCount(1);
});

test('knowledge section hash is clear of the sticky header', async ({ page }) => {
  await page.goto('/knowledge/#knowledge-index');
  await page.evaluate(() => document.fonts.ready);
  await expectAnchorClear(page, '#knowledge-index');
});

test('directory topic navigation leaves the target heading below the header', async ({ page }) => {
  await page.goto('/knowledge/quant-interview/directory/');
  const link = page.locator('.topic-jump a').first();
  const hash = await link.getAttribute('href');
  await link.click();
  await expectAnchorClear(page, hash);
});
