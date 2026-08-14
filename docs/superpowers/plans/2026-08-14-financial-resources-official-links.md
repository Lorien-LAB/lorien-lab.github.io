# Financial Resources Official Links & Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make official first-party links explicit across the Financial Engineering Learning Resources cluster and prominently attribute the hub to Prof. Chuan Shi (石川教授), while keeping supplementary links distinct.

**Architecture:** Extend the existing `knowledge` schema with an optional `officialUrl`. Reuse the existing Knowledge detail-page `Sources & Links` block, adding official-link labeling and exact-URL de-duplication without redesigning the page. Update only the existing ten financial-resource Markdown records and their focused regression tests.

**Tech Stack:** Astro 5, Astro content collections, Zod via `astro/zod`, Markdown, Node built-in test runner, GitHub Actions / GitHub Pages.

## Global Constraints

- Keep the existing Knowledge routing model: `/knowledge/<slug>/`.
- Do not add a new Knowledge type or redesign the Knowledge landing/detail pages.
- Keep guide-derived recommendations, descriptions, and the five-stage learning path separate from externally verified link canonicalization.
- The hub must state that it is adapted from **Prof. Chuan Shi (石川教授)**'s *A Curated Guide to Financial Engineering Resources* (November 2025).
- Link Prof. Shi's name to `https://www.shichuan.info/` and do not imply authorship of, or endorsement of, Lorien Lab.
- Add `officialUrl: z.string().url().optional()` to the Knowledge schema.
- `officialUrl` is canonical first-party metadata; `sourceUrl`, `toolUrl`, and `paperUrl` keep their existing semantics.
- Render official links before lower-priority links and de-duplicate exact duplicate URLs, preferring `officialUrl`.
- Tool entries label `officialUrl` as `Official Website`; non-tool entries label it `Official Resource`.
- Do not host or publish the uploaded PDF.
- Do not add ratings, rankings, difficulty levels, pricing claims, or personal endorsements.
- Keep supplementary code/exercise URLs explicitly labeled supplementary in Markdown prose.

### Canonical URLs locked for implementation

```text
Prof. Chuan Shi: https://www.shichuan.info/
WorldQuant University: https://www.wqu.edu/
WQU Data Science Lab: https://www.wqu.edu/data-science-lab
WQU Deep Learning Fundamentals Lab: https://www.wqu.edu/deep-learning-lab
WQU Computer Vision Lab: https://www.wqu.edu/computer-vision-lab
QuantStart Articles: https://www.quantstart.com/articles/
Machine Learning for Factor Investing: https://www.mlfactor.com/
MLFactor supplementary notebooks: https://www.mlfactor.com/python.html
DDA3600: https://www.shichuan.info/teaching/DDA3600
AQR Insights: https://www.aqr.com/Insights
Advances in Financial Machine Learning publisher: https://uat.store.wiley.com/en-us/advances-in-financial-machine-learning-p-9781119482086
AFML supplementary exercises: https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises
Interpretable Machine Learning: https://christophm.github.io/interpretable-ml-book/
QuantConnect LEAN: https://github.com/QuantConnect/Lean
AI & Big Data in Finance Research Forum: https://www.abfr-forum.org/
```

---

### Task 1: Lock the Official-Link and Attribution Contract with Failing Tests

**Files:**
- Modify: `tests/financial-engineering-resources.test.mjs`

**Interfaces:**
- Consumes: existing ten Knowledge Markdown entries and `src/pages/knowledge/[...id].astro`.
- Produces: regression expectations for `officialUrl`, attribution, internal hub links, supplementary labels, detail-page labels, and no-PDF publication.

- [ ] **Step 1: Extend the resource regression test with exact frontmatter and attribution checks**

Add constants for each expected child file and canonical `officialUrl`, then assert:

```js
const officialUrls = new Map([
  ['src/content/knowledge/tools/worldquant-university.md', 'https://www.wqu.edu/'],
  ['src/content/knowledge/tools/quantstart.md', 'https://www.quantstart.com/articles/'],
  ['src/content/knowledge/topics/machine-learning-for-factor-investing.md', 'https://www.mlfactor.com/'],
  ['src/content/knowledge/tools/dda3600-factor-investing-course-materials.md', 'https://www.shichuan.info/teaching/DDA3600'],
  ['src/content/knowledge/tools/aqr-insights.md', 'https://www.aqr.com/Insights'],
  ['src/content/knowledge/topics/advances-in-financial-machine-learning.md', 'https://uat.store.wiley.com/en-us/advances-in-financial-machine-learning-p-9781119482086'],
  ['src/content/knowledge/topics/interpretable-machine-learning.md', 'https://christophm.github.io/interpretable-ml-book/'],
  ['src/content/knowledge/tools/quantconnect-lean.md', 'https://github.com/QuantConnect/Lean'],
  ['src/content/knowledge/tools/ai-big-data-finance-research-forum.md', 'https://www.abfr-forum.org/'],
]);
```

For each file, read the source and assert `officialUrl: <expected>` is present.

- [ ] **Step 2: Add explicit source-attribution checks for the hub**

Assert the hub contains all of:

```text
Source acknowledgement
Prof. Chuan Shi
石川教授
adapted from
https://www.shichuan.info/
```

Also assert the hub links each of the nine resource slugs under `/knowledge/<slug>/`.

- [ ] **Step 3: Add WQU and supplementary-link semantics checks**

Assert `worldquant-university.md` contains all three current WQU URLs and both the guide-origin course name `Applied AI Lab: Deep Learning for Computer Vision` and the current page name `Computer Vision Lab`.

Assert:

```text
machine-learning-for-factor-investing.md
  contains https://www.mlfactor.com/
  contains https://www.mlfactor.com/python.html
  contains Supplementary

advances-in-financial-machine-learning.md
  contains the Wiley URL
  contains https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises
  contains Supplementary
```

- [ ] **Step 4: Add schema/detail-route behavior checks**

Assert `src/content.config.ts` contains:

```ts
officialUrl: z.string().url().optional(),
```

Assert `src/pages/knowledge/[...id].astro` contains `officialUrl`, `Official Website`, `Official Resource`, and de-duplication logic based on URL identity (for example a `Set` or an equivalent filter).

- [ ] **Step 5: Run the test suite and verify RED**

Run:

```bash
npm test
```

Expected: the new tests fail because `officialUrl`, attribution wording/internal hub links, and detail-route official labeling are not fully implemented yet; all unrelated pre-existing tests remain green.

- [ ] **Step 6: Commit the RED tests**

```bash
git add tests/financial-engineering-resources.test.mjs
git commit -m "test: require official financial resource links"
```

---

### Task 2: Add Official-Link Metadata and Detail-Page Semantics

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/pages/knowledge/[...id].astro`
- Test: `tests/financial-engineering-resources.test.mjs`

**Interfaces:**
- Consumes: `knowledge` frontmatter with optional `officialUrl`.
- Produces: a first-class official-link contract rendered in the existing `Sources & Links` block.

- [ ] **Step 1: Add `officialUrl` to the Knowledge schema**

Insert beside the existing external-link fields:

```ts
officialUrl: z.string().url().optional(),
```

Do not rename or remove `sourceUrl`, `toolUrl`, or `paperUrl`.

- [ ] **Step 2: Refactor detail-page external-link construction to rank and de-duplicate URLs**

Build candidate links in priority order:

```ts
const externalLinkCandidates = [
  entry.data.officialUrl && [entry.data.type === 'tool' ? 'Official Website' : 'Official Resource', entry.data.officialUrl],
  entry.data.paperUrl && ['Paper', entry.data.paperUrl],
  entry.data.toolUrl && ['Tool website', entry.data.toolUrl],
  entry.data.sourceUrl && ['Source', entry.data.sourceUrl],
].filter(Boolean) as [string, string][];

const seenExternalUrls = new Set<string>();
const externalLinks = externalLinkCandidates.filter(([, url]) => {
  if (seenExternalUrls.has(url)) return false;
  seenExternalUrls.add(url);
  return true;
});
```

Keep the existing `Sources & Links` markup and styling unchanged.

- [ ] **Step 3: Run the focused tests**

Run:

```bash
node --test tests/financial-engineering-resources.test.mjs
```

Expected: schema/detail-page assertions pass; content assertions still fail until Task 3.

- [ ] **Step 4: Commit metadata/rendering changes**

```bash
git add src/content.config.ts src/pages/knowledge/[...id].astro
git commit -m "feat: render canonical official knowledge links"
```

---

### Task 3: Update Hub Attribution and Nine Resource Records

**Files:**
- Modify: `src/content/knowledge/topics/financial-engineering-learning-resources.md`
- Modify: `src/content/knowledge/tools/worldquant-university.md`
- Modify: `src/content/knowledge/tools/quantstart.md`
- Modify: `src/content/knowledge/topics/machine-learning-for-factor-investing.md`
- Modify: `src/content/knowledge/tools/dda3600-factor-investing-course-materials.md`
- Modify: `src/content/knowledge/tools/aqr-insights.md`
- Modify: `src/content/knowledge/topics/advances-in-financial-machine-learning.md`
- Modify: `src/content/knowledge/topics/interpretable-machine-learning.md`
- Modify: `src/content/knowledge/tools/quantconnect-lean.md`
- Modify: `src/content/knowledge/tools/ai-big-data-finance-research-forum.md`
- Test: `tests/financial-engineering-resources.test.mjs`

**Interfaces:**
- Consumes: `officialUrl` schema from Task 2 and the canonical URL list in this plan.
- Produces: visitor-facing attribution, internal hub navigation, official resource metadata, and explicit supplementary-link semantics.

- [ ] **Step 1: Rewrite the hub opening with prominent attribution**

The first body section must begin with:

```md
> **Source acknowledgement.** This learning map is adapted from **[Prof. Chuan Shi (石川教授)](https://www.shichuan.info/)**'s *A Curated Guide to Financial Engineering Resources* (November 2025). The resource selection, descriptions, and recommended learning path originate from Prof. Shi's guide; Lorien Lab restructures them as connected Knowledge Base entries and adds verified official links for navigation.
```

Keep the existing disclaimer that this does not imply Prof. Shi's endorsement of Lorien Lab.

- [ ] **Step 2: Convert the nine hub resource names into internal Knowledge links**

Use links of the form:

```md
[WorldQuant University](/knowledge/worldquant-university/)
```

Apply the same pattern to all nine slugs while preserving the existing five-stage organization and descriptions.

- [ ] **Step 3: Add canonical `officialUrl` to every child entry**

Use the exact URLs from the Global Constraints list. If an entry currently uses the same URL in `toolUrl` or `sourceUrl`, keep the legacy field only when it adds separate semantics; exact duplicates are safe but the detail page will render them once.

- [ ] **Step 4: Update WorldQuant University body links**

Preserve the guide's three-course grouping and add these first-party links:

```md
- [Applied Data Science Lab](https://www.wqu.edu/data-science-lab)
- [Deep Learning Fundamentals Lab](https://www.wqu.edu/deep-learning-lab)
- [Applied AI Lab: Deep Learning for Computer Vision](https://www.wqu.edu/computer-vision-lab) — WQU's current page is titled **Computer Vision Lab**.
```

Do not split these into separate Knowledge records.

- [ ] **Step 5: Separate canonical and supplementary links for MLFactor and AFML**

For MLFactor, use `officialUrl: https://www.mlfactor.com/` and include a body link explicitly labeled `Supplementary code/notebooks` to `https://www.mlfactor.com/python.html`.

For AFML, use the Wiley `officialUrl` and retain the guide's GitHub URL in body prose explicitly labeled `Supplementary exercises referenced by Prof. Shi's guide`.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run:

```bash
node --test tests/financial-engineering-resources.test.mjs
```

Expected: all financial-resource tests pass.

- [ ] **Step 7: Commit content changes**

```bash
git add src/content/knowledge
git commit -m "content: add official links and Prof Shi attribution"
```

---

### Task 4: Full Regression, Static Build, and Integration Preparation

**Files:**
- Verify: all files changed in Tasks 1-3
- Temporary branch-only CI workflow may be created if the local runtime cannot reach GitHub/npm; remove it before integration.

**Interfaces:**
- Consumes: completed feature branch.
- Produces: fresh verification evidence for the exact tree proposed for integration.

- [ ] **Step 1: Run the full test suite**

Run:

```bash
npm test
```

Expected: 0 failures.

- [ ] **Step 2: Run Astro diagnostics**

Run:

```bash
npm run check
```

Expected: 0 errors. Existing unrelated hints are not regressions unless introduced by this work.

- [ ] **Step 3: Build the full static site**

Run:

```bash
npm run build
```

Expected: successful static build, including all ten financial-resource Knowledge routes.

- [ ] **Step 4: Verify final diff**

Compare `main...financial-resources-official-links-v2` and ensure changes are limited to:

- this spec and implementation plan;
- focused financial-resource tests;
- `src/content.config.ts`;
- `src/pages/knowledge/[...id].astro`;
- the existing ten financial-resource Markdown files;
- no uploaded source PDF or unrelated assets.

- [ ] **Step 5: Invoke `superpowers:verification-before-completion` and then `superpowers:finishing-a-development-branch`**

Present the standard three integration choices only after fresh verification succeeds.
