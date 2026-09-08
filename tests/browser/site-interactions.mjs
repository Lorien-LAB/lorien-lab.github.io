// Pass a Playwright Page or a Codex browser Tab against an already running site.
// This checks rendered geometry, not just the hidden attribute or CSS source.
export async function checkSiteInteractions(tab, baseURL = 'http://127.0.0.1:4327/') {
  const page = tab.playwright ?? tab;
  const results = [];
  const check = (name, passed, actual) => results.push({ name, passed, actual });
  const open = async (route) => {
    await tab.goto(new URL(route, baseURL).href);
    await page.locator('main').first().waitFor({ state: 'visible' });
  };
  const visibleRows = (selector) => page.evaluate((selector) =>
    [...document.querySelectorAll(selector)]
      .filter((row) => row.getBoundingClientRect().height > 0)
      .map((row) => ({ text: row.textContent.trim(), type: row.dataset.type, domain: row.dataset.domain })), selector);

  await open('knowledge/');
  const total = (await visibleRows('[data-knowledge-row]')).length;
  check('Knowledge initially contains entries', total > 0, total);
  await page.locator('[data-knowledge-search]').fill('zzzz_no_matching_knowledge');
  let rows = await visibleRows('[data-knowledge-row]');
  check('Unmatched search hides every entry', rows.length === 0, rows.length);
  check('Unmatched search shows the empty state', await page.locator('[data-no-results]').isVisible());

  await page.locator('[data-filter-reset]').press('Enter');
  rows = await visibleRows('[data-knowledge-row]');
  check('Reset restores the entries and clears the empty state',
    rows.length === total && !(await page.locator('[data-no-results]').isVisible()), rows.length);
  await page.locator('[data-type-filter]').selectOption('tool');
  await page.locator('[data-domain-filter]').selectOption('Research Infrastructure');
  rows = await visibleRows('[data-knowledge-row]');
  check('Type and domain filters intersect', rows.length > 0 && rows.every((row) =>
    row.type === 'tool' && row.domain === 'Research Infrastructure'), rows.length);
  await page.locator('[data-knowledge-search]').fill('RQAlpha');
  rows = await visibleRows('[data-knowledge-row]');
  check('Search intersects the selected filters', rows.length === 1 && rows[0].text.includes('RQAlpha'), rows.length);

  await open('knowledge/quant-interview/directory/');
  await page.locator('[data-directory-search]').fill('Quant Role');
  rows = await visibleRows('[data-directory-row]');
  check('Directory search hides unmatched siblings', rows.length === 1 && rows[0].text.includes('Quant Role & Employer Fit'), rows.length);
  const count = await page.locator('[data-directory-count]').textContent();
  check('Directory count matches visible rows', Number(count) === rows.length, count);
  await page.locator('[data-directory-search]').fill('zzzz_no_matching_module');
  rows = await visibleRows('[data-directory-row]');
  check('Directory empty state has no visible modules', rows.length === 0 && await page.locator('[data-directory-empty]').isVisible(), rows.length);
  await page.locator('[data-directory-search]').press('ControlOrMeta+A');
  await page.locator('[data-directory-search]').press('Backspace');
  await page.locator('[data-status-filter="published"]').press('Enter');
  rows = await visibleRows('[data-directory-row]');
  check('Published filter restores modules', rows.length > 0 && Number(await page.locator('[data-directory-count]').textContent()) === rows.length, rows.length);

  await open('projects/reproductions/stock-index-futures-roll-basis-timing/');
  await page.locator('#rn-legend i').first().waitFor({ state: 'attached' });
  for (const mode of ['roll', 'arb', 'portfolio']) {
    await page.locator(`[data-mode="${mode}"]`).press('Enter');
    const markers = await page.evaluate(() => [...document.querySelectorAll('#rn-legend i')].map((marker) => {
      const rect = marker.getBoundingClientRect();
      return { width: rect.width, height: rect.height, color: getComputedStyle(marker).backgroundColor };
    }));
    check(`Visible legend swatches after selecting ${mode}`, markers.length > 0 && markers.every((marker) =>
      marker.width > 0 && marker.height > 0 && marker.color !== 'rgba(0, 0, 0, 0)'), markers);
  }
  return results;
}
