# Rendered interaction regression checks

These checks need a real browser. `npm test` covers the existing Node suite; it cannot detect CSS overriding `hidden` or missing styles on dynamically created elements.

1. Run `npm run build` and `npm run preview -- --host 127.0.0.1 --port 4327`.
2. Import `checkSiteInteractions` from `site-interactions.mjs` in a browser automation session.
3. Pass a Codex browser Tab or a standard Playwright Page. No additional project dependency is required when using the built-in browser.

```js
const results = await checkSiteInteractions(tab, 'http://127.0.0.1:4327/');
const failed = results.filter((result) => !result.passed);
if (failed.length) throw new Error(JSON.stringify(failed, null, 2));
```

Repeat with desktop and mobile viewports. If you serve under a base path, include it in the URL. The checks change only local filters and chart modes. They do not change content, account settings, or backend state.
