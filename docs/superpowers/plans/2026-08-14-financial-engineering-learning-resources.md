# Financial Engineering Learning Resources Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a source-grounded Financial Engineering Learning Resources knowledge cluster consisting of one hub topic and nine child resource entries.

**Architecture:** Reuse the existing Astro `knowledge` collection and `/knowledge/<slug>/` detail route. No schema, route, component, or visual changes are needed; this feature is implemented entirely as Markdown content plus structural tests. The uploaded PDF remains the sole factual source for resource descriptions and outbound links.

**Tech Stack:** Astro 5 content collections, Markdown frontmatter, Node built-in test runner, GitHub Actions / GitHub Pages.

## Global Constraints

- Create exactly ten Knowledge entries: one hub topic and nine child resources.
- Keep WorldQuant University as one `tool` node containing the three courses listed in the source.
- Use the existing `knowledge` schema only; do not add a `book` type or another content collection.
- Preserve the source's terminology, organization, links, and stated descriptions.
- Do not invent rankings, ratings, prerequisites, difficulty levels, costs, outcomes, maintenance status, or additional external URLs.
- Do not host the source PDF on the public website.
- The hub links to all nine child slugs; child entries do not receive invented cross-links.
- `2025-11-01` is a repository normalization of the source's month-level `November 2025` date and is not presented in prose as an exact publication day.
- Do not change the existing Knowledge Base visual design.

---

## File Map

**Create**

- `src/content/knowledge/topics/financial-engineering-learning-resources.md` — hub topic and five-stage learning path.
- `src/content/knowledge/tools/worldquant-university.md` — WQU resource with three listed labs.
- `src/content/knowledge/tools/quantstart.md` — QuantStart tutorials resource.
- `src/content/knowledge/topics/machine-learning-for-factor-investing.md` — MLFactor book/resource node.
- `src/content/knowledge/tools/dda3600-factor-investing-course-materials.md` — DDA3600 course materials.
- `src/content/knowledge/tools/aqr-insights.md` — AQR Featured Thinking / Insights resource.
- `src/content/knowledge/topics/advances-in-financial-machine-learning.md` — advanced financial ML resource node.
- `src/content/knowledge/topics/interpretable-machine-learning.md` — model-interpretability resource node.
- `src/content/knowledge/tools/quantconnect-lean.md` — LEAN engine resource.
- `src/content/knowledge/tools/ai-big-data-finance-research-forum.md` — ABFR Forum resource.

**Modify**

- `tests/site-structure.test.mjs` — verify exact entry set, hub relationships, WQU grouping, source URLs, and no accidental public PDF copy.

No production Astro component, layout, page, or schema file is modified.

---

### Task 1: Lock the resource-cluster contract with failing tests

**Files:**
- Modify: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: existing filesystem-based Node tests.
- Produces: structural contract for the ten source-grounded Markdown entries.

- [ ] **Step 1: Add the failing file-presence and hub-link test**

Append a test equivalent to:

```js
const financialEngineeringResourceFiles = [
  'src/content/knowledge/topics/financial-engineering-learning-resources.md',
  'src/content/knowledge/tools/worldquant-university.md',
  'src/content/knowledge/tools/quantstart.md',
  'src/content/knowledge/topics/machine-learning-for-factor-investing.md',
  'src/content/knowledge/tools/dda3600-factor-investing-course-materials.md',
  'src/content/knowledge/tools/aqr-insights.md',
  'src/content/knowledge/topics/advances-in-financial-machine-learning.md',
  'src/content/knowledge/topics/interpretable-machine-learning.md',
  'src/content/knowledge/tools/quantconnect-lean.md',
  'src/content/knowledge/tools/ai-big-data-finance-research-forum.md',
];

test('financial engineering resource cluster exposes the approved ten knowledge entries', async () => {
  for (const file of financialEngineeringResourceFiles) await access(file);
  const hub = await readFile(financialEngineeringResourceFiles[0], 'utf8');
  for (const slug of [
    'worldquant-university',
    'quantstart',
    'machine-learning-for-factor-investing',
    'dda3600-factor-investing-course-materials',
    'aqr-insights',
    'advances-in-financial-machine-learning',
    'interpretable-machine-learning',
    'quantconnect-lean',
    'ai-big-data-finance-research-forum',
  ]) assert.match(hub, new RegExp(`\\b${slug}\\b`));
});
```

- [ ] **Step 2: Add source-fidelity tests**

Add assertions that:

```js
test('financial engineering resources preserve the source learning path and WQU grouping', async () => {
  const hub = await readFile('src/content/knowledge/topics/financial-engineering-learning-resources.md', 'utf8');
  for (const label of ['Core Skills', 'Factor Investing', 'Advanced Concepts', 'Systems', 'Stay Current']) {
    assert.match(hub, new RegExp(label));
  }

  const wqu = await readFile('src/content/knowledge/tools/worldquant-university.md', 'utf8');
  for (const course of ['Applied Data Science Lab', 'Deep Learning Fundamentals Lab', 'Applied AI Lab']) {
    assert.match(wqu, new RegExp(course));
  }
});

test('financial engineering resources use only approved source URLs and do not publish the source PDF', async () => {
  const expectedUrls = [
    'https://www.wqu.edu/adsl',
    'https://www.wqu.edu/deep-learning-lab',
    'https://www.wqu.edu/ai-lab-computer-vision',
    'https://www.quantstart.com/articles/',
    'https://www.mlfactor.com/python.html',
    'https://www.shichuan.info/teaching/DDA3600',
    'https://www.aqr.com/Insights',
    'https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises',
    'https://christophm.github.io/interpretable-ml-book/',
    'https://github.com/QuantConnect/Lean',
    'https://www.abfr-forum.org/',
  ];
  const corpus = (await Promise.all(financialEngineeringResourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  for (const url of expectedUrls) assert.ok(corpus.includes(url), `missing approved source URL ${url}`);
  assert.doesNotMatch(corpus, /FE_Good_Online_Resources\.pdf|public\/.*\.pdf/i);
});
```

- [ ] **Step 3: Run the tests and confirm RED**

Run in branch CI or locally:

```bash
npm test
```

Expected: existing tests pass, new financial-engineering resource tests fail because the ten Markdown files do not exist yet.

- [ ] **Step 4: Commit the RED test state**

```bash
git add tests/site-structure.test.mjs
git commit -m "test: define financial engineering resource cluster"
```

---

### Task 2: Add the hub topic and preserve the source learning path

**Files:**
- Create: `src/content/knowledge/topics/financial-engineering-learning-resources.md`

**Interfaces:**
- Consumes: existing Knowledge frontmatter schema and nine canonical child slugs from Task 1.
- Produces: the public hub route `/knowledge/financial-engineering-learning-resources/` and the only intentional parent-to-child relationship list.

- [ ] **Step 1: Create hub frontmatter**

Use:

```yaml
---
title: Financial Engineering Learning Resources
description: A structured learning map for quantitative finance resources spanning core skills, factor investing, financial machine learning, system building, and frontier research.
type: topic
domain: Research Infrastructure
category: Learning Resources
status: growing
date: 2025-11-01
tags:
  - Financial Engineering
  - Quantitative Finance
  - Learning Resources
  - Factor Investing
  - Machine Learning
  - Research Infrastructure
featured: false
related:
  - worldquant-university
  - quantstart
  - machine-learning-for-factor-investing
  - dda3600-factor-investing-course-materials
  - aqr-insights
  - advances-in-financial-machine-learning
  - interpretable-machine-learning
  - quantconnect-lean
  - ai-big-data-finance-research-forum
relatedNotes: []
---
```

- [ ] **Step 2: Write the source-grounded hub body**

The body must contain:

```markdown
## About this guide

This learning map is based on Chuan Shi's *A Curated Guide to Financial Engineering Resources* (November 2025), which organizes freely available online resources for quantitative finance into practical learning stages.

## 1. Core Skills

- **WorldQuant University** — project-based data science and deep-learning labs.
- **QuantStart** — tutorials covering quantitative trading and investing with an emphasis on practical programming and trading systems.

## 2. Factor Investing

- **Machine Learning for Factor Investing** — a free book with code and data combining machine learning with factor investing.
- **DDA3600 Factor Investing Course Materials** — university course materials for factor-investing theory and academic framing.
- **AQR Insights** — industry research and commentary on factor applications and broader investment thinking.

## 3. Advanced Concepts

- **Advances in Financial Machine Learning** — exercises associated with López de Prado's advanced financial-ML methodologies and common analytical pitfalls.
- **Interpretable Machine Learning** — a free book focused on model interpretability.

## 4. Systems

- **QuantConnect LEAN** — an open-source algorithmic-trading engine useful for studying backtesting, event-driven architecture, and asset modeling.

## 5. Stay Current

- **AI & Big Data in Finance Research Forum** — webinars connecting academic research with industry practice.

## Recommended learning path

1. Start with **Core Skills** through WorldQuant University and QuantStart.
2. Specialize in **Factor Investing** through MLFactor, DDA3600, and AQR Insights.
3. Study **Advanced Concepts** through financial machine learning and interpretable ML.
4. Get hands-on with **Systems** through QuantConnect LEAN.
5. **Stay Current** through the AI & Big Data in Finance Research Forum.
```

Keep wording close to the source but paraphrased; do not claim independent verification of the source's statement that resources are free.

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: the hub-specific learning-path assertions pass; the entry-set test remains RED until all nine child files exist.

- [ ] **Step 4: Commit hub**

```bash
git add src/content/knowledge/topics/financial-engineering-learning-resources.md
git commit -m "content: add financial engineering learning map"
```

---

### Task 3: Add the nine source resource nodes

**Files:**
- Create all nine child Markdown files from the File Map.

**Interfaces:**
- Consumes: source URLs/descriptions and canonical slugs.
- Produces: nine independent `/knowledge/<slug>/` pages searchable through the existing Knowledge index.

- [ ] **Step 1: Create WorldQuant University as one tool node**

Frontmatter:

```yaml
---
title: WorldQuant University
description: A group of project-based data science, deep-learning, and applied-AI labs highlighted in the financial engineering resource guide.
type: tool
domain: Research Infrastructure
category: Learning Resources
status: growing
date: 2025-11-01
tags: [WorldQuant University, Data Science, Deep Learning, Applied AI]
featured: false
related: []
relatedNotes: []
toolUrl: https://www.wqu.edu/adsl
---
```

Body must list exactly these three source courses and URLs:

```markdown
- [Applied Data Science Lab](https://www.wqu.edu/adsl) — project-based coverage of the complete data-science workflow.
- [Deep Learning Fundamentals Lab](https://www.wqu.edu/deep-learning-lab) — foundations in neural networks and deep-learning architectures.
- [Applied AI Lab: Deep Learning for Computer Vision](https://www.wqu.edu/ai-lab-computer-vision) — advanced deep-learning applications for visual data analysis.
```

- [ ] **Step 2: Create QuantStart and DDA3600 tool nodes**

Use source URLs exactly:

```text
https://www.quantstart.com/articles/
https://www.shichuan.info/teaching/DDA3600
```

QuantStart body: comprehensive tutorials across quantitative trading/investing, practical programming skills, and real-world trading systems.

DDA3600 body: university course materials providing theoretical foundation and academic framing for factor investing.

- [ ] **Step 3: Create AQR Insights tool node**

Use `toolUrl: https://www.aqr.com/Insights` and source-grounded text describing it as industry insights useful for macroeconomic perspective and real-world factor applications. Do not add claims about current publication cadence or content beyond the guide.

- [ ] **Step 4: Create MLFactor, Advances in Financial Machine Learning, and Interpretable Machine Learning topic nodes**

Use exactly:

```text
https://www.mlfactor.com/python.html
https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises
https://christophm.github.io/interpretable-ml-book/
```

Store each primary URL in `sourceUrl` because these are modeled as `topic` entries under the existing schema.

Descriptions must preserve only source-supported framing:

- MLFactor: free book with complete code and data combining modern ML with traditional factor investing.
- Advances in Financial Machine Learning: exercises tied to López de Prado's work, emphasizing pitfalls in financial data analysis and advanced methodologies.
- Interpretable Machine Learning: free book focused on model interpretability and reliable model deployment.

- [ ] **Step 5: Create QuantConnect LEAN tool node**

Use:

```yaml
toolUrl: https://github.com/QuantConnect/Lean
```

Body must describe it as an open-source algorithmic-trading engine and preserve the guide's stated learning focus: professional-grade backtesting, event-driven architecture, and asset modeling.

- [ ] **Step 6: Create ABFR Forum tool node**

Use:

```yaml
toolUrl: https://www.abfr-forum.org/
```

Body must describe the guide's framing: webinars connecting academic research with industry practice and a way to follow developments at the academic-industry frontier.

- [ ] **Step 7: Run structural tests**

```bash
npm test
```

Expected: all financial-engineering resource tests pass, including file presence, hub links, WQU grouping, approved URLs, and no published source PDF path.

- [ ] **Step 8: Run Astro validation and production build**

```bash
npm run check
npm run build
```

Expected: zero errors and successful static generation of all ten new `/knowledge/<slug>/` pages.

- [ ] **Step 9: Commit resource nodes**

```bash
git add src/content/knowledge tests/site-structure.test.mjs
git commit -m "content: add financial engineering resource nodes"
```

---

### Task 4: Integration and production verification

**Files:**
- No new production files.

**Interfaces:**
- Consumes: completed feature branch.
- Produces: verified merge candidate and deployed Knowledge pages after integration.

- [ ] **Step 1: Compare feature branch against `main`**

Confirm the diff contains only:

```text
docs/superpowers/specs/2026-08-14-financial-engineering-learning-resources-design.md
docs/superpowers/plans/2026-08-14-financial-engineering-learning-resources.md
tests/site-structure.test.mjs
src/content/knowledge/topics/financial-engineering-learning-resources.md
src/content/knowledge/tools/worldquant-university.md
src/content/knowledge/tools/quantstart.md
src/content/knowledge/topics/machine-learning-for-factor-investing.md
src/content/knowledge/tools/dda3600-factor-investing-course-materials.md
src/content/knowledge/tools/aqr-insights.md
src/content/knowledge/topics/advances-in-financial-machine-learning.md
src/content/knowledge/topics/interpretable-machine-learning.md
src/content/knowledge/tools/quantconnect-lean.md
src/content/knowledge/tools/ai-big-data-finance-research-forum.md
```

- [ ] **Step 2: Fresh verification on branch head**

```bash
npm test
npm run check
npm run build
```

Expected: all tests pass, Astro check has zero errors, build completes.

- [ ] **Step 3: Integrate only after green verification**

Use the normal finishing-development-branch flow. If merged to `main`, verify the GitHub Pages workflow builds and deploys the same head SHA successfully.
