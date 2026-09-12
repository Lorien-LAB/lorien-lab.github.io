import { test, expect } from '@playwright/test';
import { checkSiteInteractions } from '../browser/site-interactions.mjs';

test('rendered filters, directory counts and chart legend remain functional', async ({ page, baseURL }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const results = await checkSiteInteractions(page, baseURL);
  expect(results.filter((result) => !result.passed)).toEqual([]);
  expect(errors).toEqual([]);
  await expect(page.locator('astro-error-overlay, vite-error-overlay')).toHaveCount(0);
});
