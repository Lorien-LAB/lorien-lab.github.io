# Knowledge Learning Resources Gateway Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a prominent Financial Engineering Learning Resources gateway to `/knowledge/` that credits Prof. Chuan Shi (石川教授), shows the five-stage learning path, and links directly to the existing resource hub.

**Architecture:** Introduce one self-contained Astro component, `LearningResourcesGateway.astro`, modeled on the existing gateway visual language but with its own content and stage flow. Integrate it into `src/pages/knowledge/index.astro` immediately before `ReproductionGateway`, preserving the generic Knowledge Index row and all existing routes/content.

**Tech Stack:** Astro 5, Astro components, existing CSS variables, Node built-in test runner, GitHub Pages Actions.

## Global Constraints

- Do not change Knowledge schema or routes.
- Do not modify the Financial Engineering Learning Resources detail page or its nine child resources.
- Do not add a primary header navigation item.
- Do not redesign the Knowledge hero, domain map, featured section, or index.
- The gateway must visibly contain `Prof. Chuan Shi`, `石川教授`, and `https://www.shichuan.info/`.
- Use attribution wording such as `Adapted from`; do not imply endorsement or authorship of Lorien Lab by Prof. Shi.
- Preserve the five stages exactly: `Core Skills`, `Factor Investing`, `Advanced Concepts`, `Systems`, `Stay Current`.
- Construct the internal href from `import.meta.env.BASE_URL` in the parent page.
- No new dependency or global stylesheet.

---

### Task 1: Add gateway contract tests

**Files:**
- Modify: `tests/site-structure.test.mjs`

**Interfaces:**
- Consumes: existing Knowledge landing page and component paths.
- Produces: a regression contract that requires the new component, title, attribution, five stages, placement, hub href, and preservation of ReproductionGateway/Knowledge Index.

- [ ] **Step 1: Write the failing test**

Append a test that:

```js
test('knowledge landing exposes the financial engineering learning resources gateway', async () => {
  await access('src/components/LearningResourcesGateway.astro');
  const gateway = await readFile('src/components/LearningResourcesGateway.astro', 'utf8');
  const page = await readFile('src/pages/knowledge/index.astro', 'utf8');

  for (const text of [
    'Financial Engineering Learning Resources',
    'Prof. Chuan Shi',
    '石川教授',
    'https://www.shichuan.info/',
    'Core Skills',
    'Factor Investing',
    'Advanced Concepts',
    'Systems',
    'Stay Current',
    'Explore learning resources',
  ]) assert.ok(gateway.includes(text), `gateway missing ${text}`);

  assert.match(page, /import LearningResourcesGateway/);
  assert.match(page, /knowledge\/financial-engineering-learning-resources\//);
  assert.match(page, /<LearningResourcesGateway/);
  assert.match(page, /<ReproductionGateway/);
  assert.match(page, /entries\.map/);
  assert.ok(page.indexOf('<LearningResourcesGateway') < page.indexOf('<ReproductionGateway'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: the new test fails because `src/components/LearningResourcesGateway.astro` does not exist; pre-existing tests remain green.

- [ ] **Step 3: Commit the RED test**

```bash
git add tests/site-structure.test.mjs
git commit -m "test: require learning resources gateway"
```

---

### Task 2: Implement the gateway component

**Files:**
- Create: `src/components/LearningResourcesGateway.astro`

**Interfaces:**
- Consumes: `href: string` prop.
- Produces: a semantic gateway section with CTA, source attribution, and five-stage visual flow.

- [ ] **Step 1: Create the component**

Use this structure:

```astro
---
interface Props { href: string; }
const { href } = Astro.props;
const stages = ['Core Skills','Factor Investing','Advanced Concepts','Systems','Stay Current'];
---
<section class="learning-gateway" aria-labelledby="learning-gateway-title">
  <div class="gateway-copy">
    <div class="mono-label">Learning Roadmap</div>
    <h2 id="learning-gateway-title">Financial Engineering Learning Resources</h2>
    <p>A structured quantitative-finance learning path from foundational skills and factor investing through advanced concepts, research systems, and frontier resources.</p>
    <p class="gateway-source">Adapted from <a href="https://www.shichuan.info/">Prof. Chuan Shi (石川教授)</a>'s curated guide.</p>
    <a class="gateway-cta" href={href}>Explore learning resources →</a>
  </div>
  <div class="gateway-flow" aria-label="Recommended learning path">
    {stages.map((stage,index) => <div><span>{String(index + 1).padStart(2,'0')}</span><strong>{stage}</strong></div>)}
  </div>
</section>
```

Add component-scoped CSS using only existing variables. Keep a two-column desktop layout and stack below 800px. Use a bordered rounded panel and subtle accent gradient related to, but not copied verbatim from, `ReproductionGateway`.

- [ ] **Step 2: Commit the component**

```bash
git add src/components/LearningResourcesGateway.astro
git commit -m "feat: add learning resources gateway"
```

---

### Task 3: Integrate the gateway on Knowledge landing

**Files:**
- Modify: `src/pages/knowledge/index.astro`

**Interfaces:**
- Consumes: `LearningResourcesGateway` and `import.meta.env.BASE_URL`.
- Produces: a first-class `/knowledge/financial-engineering-learning-resources/` entry point immediately before Reproductions.

- [ ] **Step 1: Import the component**

Add:

```astro
import LearningResourcesGateway from '../../components/LearningResourcesGateway.astro';
```

beside the existing `ReproductionGateway` import.

- [ ] **Step 2: Render it before ReproductionGateway**

Immediately after the domain section, render:

```astro
<section class="section"><div class="container"><LearningResourcesGateway href={`${base}knowledge/financial-engineering-learning-resources/`} /></div></section>
<section class="section"><div class="container"><ReproductionGateway href={`${base}knowledge/reproductions/`} /></div></section>
```

Do not change the later `entries.map(...)` Knowledge Index.

- [ ] **Step 3: Run the focused/full test suite**

Run: `npm test`

Expected: all tests pass, including the new gateway contract.

- [ ] **Step 4: Run Astro validation**

Run: `npm run check`

Expected: 0 errors.

- [ ] **Step 5: Run production build**

Run: `npm run build`

Expected: build completes and `/knowledge/` plus `/knowledge/financial-engineering-learning-resources/` are generated.

- [ ] **Step 6: Commit integration**

```bash
git add src/pages/knowledge/index.astro
git commit -m "feat: surface learning resources on knowledge landing"
```

---

### Task 4: Final verification and integration readiness

**Files:**
- Verify only; no production files should be added by this task except a temporary branch-only CI workflow if remote execution is required.

**Interfaces:**
- Consumes: completed feature branch.
- Produces: fresh evidence that tests, Astro check, and production build pass on the exact tree presented for integration.

- [ ] **Step 1: Run fresh full verification**

Run in one branch CI job or equivalent:

```bash
npm test
npm run check
npm run build
```

Expected: all commands succeed.

- [ ] **Step 2: Inspect branch diff against `main`**

Expected production changes: design spec, implementation plan, test update, `LearningResourcesGateway.astro`, and `src/pages/knowledge/index.astro`. No schema/content-route/PDF changes.

- [ ] **Step 3: Remove any temporary branch-only CI workflow before or immediately after integration**

The production tree must not retain a feature-specific validation workflow.

- [ ] **Step 4: After integration, verify the official GitHub Pages build/deploy on the final `main` SHA**

Expected: build and deploy both conclude `success`.
