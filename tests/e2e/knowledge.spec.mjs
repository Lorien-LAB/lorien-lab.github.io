import { test, expect } from '@playwright/test';

const visibleRows = (page) => page.locator('[data-knowledge-row]:visible');
const rowLinks = (page) => visibleRows(page).evaluateAll((rows) => rows.map((row) => row.getAttribute('href')));

async function expectFilters(page, { domain = '', type = '', q = '' }) {
  await expect(page.locator('[data-domain-filter]')).toHaveValue(domain);
  await expect(page.locator('[data-type-filter]')).toHaveValue(type);
  await expect(page.locator('[data-knowledge-search]')).toHaveValue(q);
}

test('homepage domain links retain their identity and show matching knowledge', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.knowledge-domain-list a');
  const destinations = await links.evaluateAll((anchors) => anchors.map((anchor) => ({
    href: anchor.href,
    label: anchor.querySelector('.lang-en')?.textContent.trim(),
  })));
  expect(destinations.length).toBeGreaterThan(0);
  for (const { href, label } of destinations) {
    expect(new URL(href).searchParams.get('domain')).toBe(label);
  }
  await links.filter({ hasText: 'Machine Learning' }).click();
  await expectFilters(page, { domain: 'Machine Learning' });
  expect(new URL(page.url()).searchParams.get('domain')).toBe('Machine Learning');
  expect(new URL(page.url()).hash).toBe('#knowledge-index');
  const domains = await visibleRows(page).evaluateAll((rows) => rows.map((row) => row.dataset.domain));
  expect(domains.length).toBeGreaterThan(0);
  expect(domains.every((domain) => domain === 'Machine Learning')).toBe(true);
});

test('native domain filter includes every entry domain', async ({ page }) => {
  await page.goto('/knowledge/');
  const domains = await page.locator('[data-knowledge-row]').evaluateAll((rows) =>
    [...new Set(rows.map((row) => row.dataset.domain))].sort());
  const options = await page.locator('[data-domain-filter] option').evaluateAll((items) =>
    items.map((option) => option.value).filter(Boolean).sort());
  expect(options).toEqual(domains);
  for (const [domain, count] of [['Finance', 3], ['Interview Strategy & Communication', 6]]) {
    await page.locator('[data-domain-filter]').selectOption(domain);
    await expect(visibleRows(page)).toHaveCount(count);
    await expect(page.locator('[data-knowledge-count]')).toHaveText(String(count));
  }
});

test('shared filters survive reload and browser history through UI changes', async ({ page }) => {
  await page.goto('/knowledge/?domain=Machine+Learning&type=topic&q=factor');
  const state = { domain: 'Machine Learning', type: 'topic', q: 'factor' };
  await expectFilters(page, state);
  const initialRows = await rowLinks(page);
  expect(initialRows.length).toBeGreaterThan(0);
  await page.reload();
  await expectFilters(page, state);
  expect(await rowLinks(page)).toEqual(initialRows);
  await page.locator('[data-domain-filter]').selectOption('Quantitative Finance');
  await expect(page).toHaveURL(/domain=Quantitative\+Finance/);
  await page.locator('[data-knowledge-search]').fill('zzzz_no_matching_knowledge');
  await expect(visibleRows(page)).toHaveCount(0);
  await expect(page.locator('[data-knowledge-count]')).toHaveText('0');
  await expect(page.locator('[data-no-results]')).toBeVisible();
  expect(new URL(page.url()).searchParams.get('q')).toBe('zzzz_no_matching_knowledge');
  await page.goBack();
  await expectFilters(page, state);
  expect(await rowLinks(page)).toEqual(initialRows);
  await page.goForward();
  await expectFilters(page, { ...state, domain: 'Quantitative Finance', q: 'zzzz_no_matching_knowledge' });
});

test('reset clears filters while retaining unrelated URL parameters and hash', async ({ page }) => {
  await page.goto('/knowledge/?domain=Machine+Learning&type=topic&q=factor&ref=shared#knowledge-index');
  await page.locator('[data-filter-reset]').click();
  await expectFilters(page, {});
  const url = new URL(page.url());
  expect([...url.searchParams.entries()]).toEqual([['ref', 'shared']]);
  expect(url.hash).toBe('#knowledge-index');
  await expect(page.locator('[data-no-results]')).toBeHidden();
  expect(await visibleRows(page).count()).toBe(await page.locator('[data-knowledge-row]').count());
});

test('knowledge search appears in the first viewport', async ({ page }) => {
  await page.goto('/knowledge/');
  await page.evaluate(() => document.fonts.ready);
  const input = await page.locator('[data-knowledge-search]').boundingBox();
  expect(input).not.toBeNull();
  expect(input.y).toBeGreaterThanOrEqual(0);
  expect(input.y + input.height).toBeLessThanOrEqual(page.viewportSize().height);
});
