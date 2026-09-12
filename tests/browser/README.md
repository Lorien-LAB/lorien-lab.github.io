# Rendered interaction regression checks

The browser suite tests the production build in Playwright-managed Chromium at desktop (1440 × 900) and mobile (390 × 844, touch enabled) sizes. It does not require a globally installed browser, a logged-in browser session, or a running development server.

```sh
npm ci
npx playwright install chromium
npm run build
npm run test:browser
```

On Linux, use `npx playwright install --with-deps chromium` to include system libraries. The runner starts its own static Astro preview at `http://127.0.0.1:4327/` and stops it afterward. Keep port 4327 free; the strict port configuration deliberately refuses to test an unrelated server. Rebuild after source changes because preview serves `dist/`.

Useful focused commands:

```sh
npm run test:browser -- --project=mobile
npm run test:browser -- tests/e2e/knowledge.spec.mjs
npx playwright show-report
```

Coverage includes homepage domain destinations, complete native domain options, shared search/filter URLs, reload and browser history, result/empty states, reset behavior, first-viewport search, Chinese controls with retained state, sticky-header anchor clearance, chart label size and dates, keyboard/touch inspection, and the existing rendered directory/filter/legend regressions. Tests observe real DOM geometry and visible results.

GitHub Actions runs the same suite after building for pull requests and pushes to `main`. Failed runs retain screenshots, traces, and an HTML report in the `browser-failure-evidence` artifact for seven days. Locally these files are in ignored `test-results/` and `playwright-report/` directories.

## Built-in browser reuse

`site-interactions.mjs` also exports `checkSiteInteractions(tab, baseURL)`, which accepts a Codex browser Tab or a standard Playwright Page against an already running site. The E2E runner imports this same helper, so manual and CI checks share the existing regressions.

```js
const results = await checkSiteInteractions(tab, 'http://127.0.0.1:4327/');
const failed = results.filter((result) => !result.passed);
if (failed.length) throw new Error(JSON.stringify(failed, null, 2));
```

These checks only navigate pages and change local filters, language, and chart controls. They do not change content or backend state.
