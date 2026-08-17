# Quant Interview Conditional Probability & Bayes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Probability & Statistics -> Conditional Probability & Bayes` cross-book workstream by fusing all three verified interview sources into an expanded canonical conditioning layer, one Bayes/base-rate Knowledge node, and six source-neutral canonical Problems.

**Architecture:** Preserve the existing Topic-first public model. Public Knowledge is authored first; source provenance, page evidence, item identifiers, topic overrides, and semantic-dedup decisions remain internal in workstream/coverage data. Reuse the existing `conditioning` slug, create `bayes-rule-base-rates`, merge duplicate mathematical families across books, and keep adjacent distribution, expectation, order-statistic, and stochastic-process material outside this topic.

**Tech Stack:** Astro content collections, Markdown/YAML frontmatter, JSON source/workstream/coverage data, JavaScript ES modules, Node.js built-in test runner, GitHub Actions, npm.

## Global Constraints

- Base branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`.
- Work branch: `chatgpt/quant-interview-workstream-conditional-probability-bayes-2026-08-17`.
- Workstream id: `probability-statistics-conditional-probability-bayes-007`.
- Canonical topics: `probability-statistics`, `conditional-probability-bayes`.
- Expand existing `conditioning`; never create a duplicate conditioning concept.
- Add exactly one new Knowledge node if semantic review remains unchanged: `bayes-rule-base-rates`.
- Existing repository-authored `conditional-dice-expectation` remains cross-topic and never becomes source provenance.
- Green reviewed scope: `4.3`, physical PDF pages `88-102`.
- Red reviewed scope: `3.2.1`, question pages `93-94`, solution pages `107-113`.
- 150 reviewed scopes: `2.6`, `2.7`; question pages `40-44`, probability/stochastic boundary solution pages `134-150`, Brainteasers Q2 solution pages `176-177`.
- Green claimed units: definitions/chain rule/total probability/Bayes, `boys-and-girls`, `unfair-coin`, `monty-hall`, `candies-in-a-jar`, `russian-roulette-series`.
- Red claimed items: `3.10`, `3.11`, `3.14`, `3.15`, `3.17`.
- 150 claimed item: `2.7::2`; it requires an item-level topic override from the Brainteasers container.
- 150 `2.6::5` is boundary-reviewed but stays for `random-variables-distributions` because its core difficulty is joint-normal structure.
- Green `all-girl-world`, unfair-coin extraction, dart ranking, birthday line, dice order, amoeba extinction, recursive coin game, aces allocation, gambler's ruin, basketball reinforcement, and cars-on-road are reviewed but excluded when their primary mathematical identity belongs elsewhere.
- Red Q3.15 must not be copied mechanically: named-child probabilities depend on the observation/naming protocol.
- Public content must expose no book names, source numbers, PDF pages, source-shaped ids, or hidden coverage notes.
- Semantic deduplication is by mathematical reasoning identity, not wording similarity or shared formulas.
- Every claimed source row must become terminal with nonempty `resolutionNote` and real canonical targets.
- `knowledge-only` is terminal only when its interview test remains visible through `## Interview Checks`.
- Every new Problem is S3+: Problem, two progressive hints, full solution, why it matters, common mistakes, extensions/variants.
- Final gates: `npm run test`, `npm run check`, `npm run build`, then topic-only diff review.

## Planned Public Outputs

### Knowledge

1. Expand `src/content/knowledge/concepts/conditioning.md`
   - `P(A|B)` as a changed/restricted probability model;
   - multiplication rule and chain rule;
   - partitions and law of total probability;
   - independence boundary;
   - observation/information protocols;
   - first-step conditioning as a technique without absorbing stochastic-process topics;
   - Interview Checks for two-child information, total probability, model sufficiency, and independence.
2. Create `src/content/knowledge/concepts/bayes-rule-base-rates.md`
   - prior, likelihood, evidence, posterior;
   - Bayes rule and posterior odds;
   - likelihood ratios and repeated evidence;
   - base-rate effects;
   - missing-prior/model ambiguity;
   - latent-object inference;
   - Interview Checks for double-headed coins, base-rate reasoning, and `P(A|B)` versus `P(B|A)`.

### Problems

1. `hidden-coin-posterior-after-heads` — `conditional-probability-bayes-001`
2. `two-children-information-protocol` — `conditional-probability-bayes-002`
3. `monty-hall-switching` — `conditional-probability-bayes-003`
4. `russian-roulette-after-survival` — `conditional-probability-bayes-004`
5. `candies-last-color-ordering` — `conditional-probability-bayes-005`
6. `golden-face-posterior` — `conditional-probability-bayes-006`

All six use:

```yaml
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
status: solved
featured: false
```

Canonical Knowledge links:

```yaml
hidden-coin-posterior-after-heads: [conditioning, bayes-rule-base-rates]
two-children-information-protocol: [conditioning]
monty-hall-switching: [conditioning]
russian-roulette-after-survival: [conditioning]
candies-last-color-ordering: [conditioning]
golden-face-posterior: [conditioning, bayes-rule-base-rates]
```

## Hidden Source Inventory

### Green

- `4.3::definitions-conditional-probability-bayes` -> `knowledge-only` -> `conditioning`, `bayes-rule-base-rates`.
- `4.3::boys-and-girls` -> `canonical-problem` -> `two-children-information-protocol`.
- `4.3::unfair-coin` -> `canonical-problem` -> `hidden-coin-posterior-after-heads`.
- `4.3::monty-hall` -> `canonical-problem` -> `monty-hall-switching`.
- `4.3::candies-in-a-jar` -> `canonical-problem` -> `candies-last-color-ordering`.
- `4.3::russian-roulette-series` -> `canonical-problem` -> `russian-roulette-after-survival`.

### Red

- `3.2.1::3.10` -> `merged-duplicate` -> `hidden-coin-posterior-after-heads`.
- `3.2.1::3.11` -> `knowledge-only` -> `bayes-rule-base-rates`, `conditioning`; repeated-heads/missing-prior self-test must stay public.
- `3.2.1::3.14` -> `merged-duplicate` -> `two-children-information-protocol`.
- `3.2.1::3.15` -> `variant` -> `two-children-information-protocol`; resolution note must record the protocol ambiguity correction.
- `3.2.1::3.17` -> `merged-duplicate` -> `russian-roulette-after-survival`.

### 150 Questions

- `2.7::2` -> `canonical-problem` -> `golden-face-posterior`, with explicit item-level topic override.
- Do not create a Conditional Probability terminal row for `2.6::5`; leave it unresolved for its actual later topic.

Planned claimed terminal rows: **12 total = 6 Green + 5 Red + 1 150**.

## Mathematical Contracts

### Hidden coin

For prior `π` that the chosen coin is double-headed, otherwise fair, after `n` heads:

```text
P(D | H^n) = π / [π + (1-π)2^{-n}].
```

Required checks:

```text
π=1/10, n=3     -> 8/17
π=1/1000, n=10 -> 1024/2023 ≈ 0.506
```

Without a prior/model class, the observations do not define a unique Bayesian posterior.

### Two-child protocols

With iid boy/girl probability `1/2`:

```text
P(BB | at least one B) = 1/3
P(BB | eldest is B) = 1/2
P(BB | uniformly selected observed child is B) = 1/2
```

Named-child variants require explicit name-frequency and observation-generation assumptions.

### Monty Hall

Under the standard informed-host policy:

```text
stay = 1/3
switch = 2/3
```

A random uninformed door opening is a different experiment.

### Russian roulette

Two adjacent bullets in six chambers; opponent survives after an initial random spin:

```text
spin again: loss probability 1/3
do not spin: loss probability 1/4
```

### Candies

For 10 red, 20 blue, 30 green candies removed uniformly without replacement:

```text
P(T_r<T_b and T_r<T_g)
= (30/60)(20/30) + (20/60)(30/40)
= 7/12.
```

### Golden face

Objects `GG`, `GB`, `BB`, uniform object selection and uniform viewed side:

```text
P(GG | observed G) = 2/3.
```

## Task 1: Register Workstream 007 and Branch CI

**Files:**
- Create `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml`
- Create `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`
- Create `src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json`

- [ ] Add temporary branch-only CI running `npm ci`, `npm run test`, `npm run check`, `npm run build` on Node 24.
- [ ] Run the inherited branch before any RED test and verify all three gates succeed.
- [ ] Add RED registration test:

```js
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json';

test('seventh cross-book workstream is conditional probability and Bayes only', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'probability-statistics-conditional-probability-bayes-007');
  assert.deepEqual(workstream.canonicalTopics, ['probability-statistics', 'conditional-probability-bayes']);
  assert.equal(workstream.status, 'active');
  assert.deepEqual(new Set(workstream.sourceScopes.map((x) => x.source)), new Set([
    'green-book', 'red-book', '150-most-frequently-asked',
  ]));
});
```

- [ ] Add exact boundary assertions:

```js
assert.deepEqual(green.sourceSections, ['4.3']);
assert.deepEqual(green.evidencePageRanges, [{ startPage: 88, endPage: 102 }]);

assert.deepEqual(red.sourceSections, ['3.2.1']);
assert.deepEqual(red.evidencePageRanges, [
  { startPage: 93, endPage: 94 },
  { startPage: 107, endPage: 113 },
]);

assert.deepEqual(q150.sourceSections, ['2.6', '2.7']);
assert.deepEqual(q150.evidencePageRanges, [
  { startPage: 40, endPage: 44 },
  { startPage: 134, endPage: 150 },
  { startPage: 176, endPage: 177 },
]);
```

- [ ] Run `npm run test`; expected RED is missing workstream JSON only.
- [ ] Create the active workstream JSON with the exact scope/evidence above and review notes naming claimed and excluded items.
- [ ] Assert `validateTopicWorkstream(workstream, context)` does not throw.
- [ ] Run `npm run test && npm run check && npm run build`; all must pass.
- [ ] Commit with message `feat: register conditional probability bayes workstream`.

## Task 2: Expand Conditioning and Add Bayes Knowledge

**Files:**
- Create `tests/quant-interview-conditional-probability-bayes-content.test.mjs`
- Modify `src/content/knowledge/concepts/conditioning.md`
- Create `src/content/knowledge/concepts/bayes-rule-base-rates.md`

- [ ] Add RED tests for `conditioning`:

```js
assert.match(conditioning, /^quantInterviewTopics:\s*\[probability-statistics, conditional-probability-bayes\]$/m);
assert.match(conditioning, /P\(A\s*\|\s*B\)/);
assert.match(conditioning, /law of total probability/i);
assert.match(conditioning, /chain rule/i);
assert.match(conditioning, /observation protocol|information protocol/i);
assert.match(conditioning, /^## Interview Checks$/m);
assert.match(conditioning, /at least one child/i);
assert.match(conditioning, /randomly observed child|uniformly selected child/i);
```

- [ ] Run RED; failures must be only the new content contract.
- [ ] Expand `conditioning` with sections: Core Definition; Multiplication & Chain Rules; Conditioning on a Partition; Law of Total Probability; Independence Boundary; Observation Protocols; First-Step Conditioning; Common Traps; Interview Checks.
- [ ] Run tests; `conditioning` contract must pass.
- [ ] Add RED tests for `bayes-rule-base-rates`:

```js
assert.match(bayes, /prior/i);
assert.match(bayes, /likelihood/i);
assert.match(bayes, /posterior/i);
assert.match(bayes, /posterior odds/i);
assert.match(bayes, /likelihood ratio/i);
assert.match(bayes, /base[- ]rate/i);
assert.match(bayes, /without.*prior|prior.*required/i);
assert.match(bayes, /^## Interview Checks$/m);
assert.match(bayes, /double-headed/i);
```

- [ ] Create `bayes-rule-base-rates` with Bayes-over-partitions and posterior-odds formulas.
- [ ] Run `npm run test && npm run check && npm run build`; all must pass.
- [ ] Commit with message `feat: build conditional probability bayes knowledge`.

## Task 3: Add Hidden-Coin, Two-Child, and Monty Hall Problems

**Files:**
- Create `src/content/problems/probability/hidden-coin-posterior-after-heads.md`
- Create `src/content/problems/probability/two-children-information-protocol.md`
- Create `src/content/problems/probability/monty-hall-switching.md`
- Modify `tests/quant-interview-conditional-probability-bayes-content.test.mjs`

- [ ] Add RED metadata/S3+ assertions for ids `001-003` and source-neutral prose.
- [ ] Add hidden-coin math assertions requiring `8/17`, `1024/2023`, general prior `π`, and the missing-prior warning.
- [ ] Implement hidden-coin page using the general `π,n` family plus posterior-odds alternative.
- [ ] Add two-child assertions requiring `1/3`, `1/2`, at-least-one, eldest, randomly observed child, named-child, and protocol language.
- [ ] Implement two-child page; do not publish a universal numeric named-child answer without a complete protocol.
- [ ] Add Monty assertions requiring `1/3`, `2/3`, informed host, always-reveal-loser/offer-switch assumptions, and random-uninformed contrast.
- [ ] Implement Monty page with standard policy stated before calculation.
- [ ] Run `npm run test && npm run check && npm run build`; all must pass.
- [ ] Commit with message `feat: add core conditional probability problems`.

## Task 4: Add Russian Roulette, Candies, and Golden-Face Problems

**Files:**
- Create `src/content/problems/probability/russian-roulette-after-survival.md`
- Create `src/content/problems/probability/candies-last-color-ordering.md`
- Create `src/content/problems/probability/golden-face-posterior.md`
- Modify `tests/quant-interview-conditional-probability-bayes-content.test.mjs`

- [ ] Add RED metadata/S3+ assertions for ids `004-006`.
- [ ] Russian roulette contract must require `1/3`, `1/4`, adjacent/consecutive bullets, survival conditioning, and the recommendation not to spin.
- [ ] Implement the four-empty-current-chamber conditional argument.
- [ ] Candies contract must require `T_r`, `T_b`, `T_g`, both mutually exclusive orderings, and `7/12`.
- [ ] Implement last-occurrence conditioning, not brute-force hypergeometric enumeration as the main route.
- [ ] Golden-face contract must require `GG`, `GB`, `BB`, `2/3`, visible/observed face, and selection/size-bias intuition.
- [ ] Implement both Bayes and visible-face-count interpretations.
- [ ] Run `npm run test && npm run check && npm run build`; all must pass.
- [ ] Commit with message `feat: add conditional information problem families`.

## Task 5: Reconcile Hidden Coverage

**Files:**
- Modify `src/data/quant-interview/coverage/green-book.json`
- Modify `src/data/quant-interview/coverage/red-book.json`
- Modify `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Modify `tests/quant-interview-conditional-probability-bayes-workstream.test.mjs`

- [ ] Add RED inventory test for exactly these keys:

```js
const expected = {
  'green-book': [
    '4.3::definitions-conditional-probability-bayes',
    '4.3::boys-and-girls',
    '4.3::unfair-coin',
    '4.3::monty-hall',
    '4.3::candies-in-a-jar',
    '4.3::russian-roulette-series',
  ],
  'red-book': [
    '3.2.1::3.10',
    '3.2.1::3.11',
    '3.2.1::3.14',
    '3.2.1::3.15',
    '3.2.1::3.17',
  ],
  '150-most-frequently-asked': ['2.7::2'],
};
```

- [ ] Run RED; failures must be missing target rows, not old regressions.
- [ ] Add Green six rows and Red five rows exactly according to Hidden Source Inventory.
- [ ] Red `3.2.1::3.15` resolution note must explicitly state: named-child wording is protocol-dependent; the source shortcut is not copied blindly; the canonical Problem owns the corrected treatment.
- [ ] Add 150 Q2 row with:

```json
{
  "sourceSection": "2.7",
  "sourceItem": "2",
  "canonicalTopics": ["conditional-probability-bayes"],
  "state": "canonical-problem",
  "canonicalProblems": ["golden-face-posterior"],
  "canonicalKnowledge": ["conditioning", "bayes-rule-base-rates"],
  "topicOverrideReason": "Item-level mathematical identity is Conditional Probability & Bayes even though the editorial source container is Brainteasers; observing a golden face reweights the latent object posterior.",
  "resolutionNote": "Distinct latent-object selection-conditioning family represented by golden-face-posterior."
}
```

- [ ] Validate all ledgers with `allowUnresolvedCanonicalRefs: false`.
- [ ] Assert every claimed row has a terminal state and nonempty `resolutionNote`.
- [ ] Assert Red Q3.11 remains public through Bayes/conditioning Interview Checks.
- [ ] Run `npm run test && npm run check && npm run build`; all must pass.
- [ ] Commit with message `data: reconcile conditional probability bayes coverage`.

## Task 6: Extend Source-Neutral Corpus Regression

**File:**
- Modify `tests/quant-interview-source-neutral-content.test.mjs`

- [ ] Append the six new Problem slugs to `currentProblemSlugs`.
- [ ] Add:

```js
['bayes-rule-base-rates', ['probability-statistics', 'conditional-probability-bayes']],
```

- [ ] Keep existing `conditioning` assignment; do not add a duplicate row.
- [ ] If all six planned Problems survive semantic review unchanged, set exact count assertions to:

```js
assert.equal(currentProblemSlugs.length, 36);
assert.equal(expectedKnowledgeTopics.size, 28);
```

- [ ] If semantic review changed the public count, use the actual reviewed count and record the reason in HANDOFF; never create filler content to satisfy 36/28.
- [ ] Extend the 150 direct-source audit with `['2.7::2', 'golden-face-posterior']` when that audit enumerates direct canonical Problem ownership.
- [ ] Run `npm run test`; all source-neutral/provenance contracts must pass.
- [ ] Commit with message `test: extend source-neutral regression for conditional probability`.

## Task 7: Completion Gate, Durable Handoff, Verification, Cleanup

**Files:**
- Create `tests/quant-interview-conditional-probability-bayes-completion.test.mjs`
- Modify `tests/quant-interview-handoff.test.mjs`
- Modify `src/data/quant-interview/workstreams/probability-statistics-conditional-probability-bayes-007.json`
- Modify `docs/quant-interview/HANDOFF.md`
- Delete `.github/workflows/quant-interview-conditional-probability-bayes-ci.yml` before final handoff.

- [ ] Add RED completion test:

```js
test('conditional probability Bayes workstream closes only with real verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.deepEqual(workstream.verification?.commands, [
    'npm run test',
    'npm run check',
    'npm run build',
  ]);
  assert.equal(workstream.verification?.conclusion, 'success');
});
```

- [ ] Add HANDOFF RED assertions for workstream id, six Problems, 12 terminal claimed rows, current corpus counts, and next action `Random Variables & Distributions`.
- [ ] Run RED; expected failures are only `status: active` and stale HANDOFF.
- [ ] Run branch CI on the content-complete commit. Require `test`, `check`, and `build` all to succeed.
- [ ] Copy the exact successful content-complete commit SHA and exact GitHub Actions run id returned by that run into the workstream `verification` object. Do not use an example, sentinel, guessed, or fabricated value.
- [ ] Set workstream `status` to `complete`, `verification.commands` to the exact three gate commands, and `verification.conclusion` to `success`.
- [ ] Update HANDOFF while retaining prior workstream history. Record: workstream 7; `conditioning` expansion; `bayes-rule-base-rates`; six Problems; 12 claimed terminal rows; Green/Red hidden-coin merge; Green/Red two-child merge with protocol correction; Green/Red roulette merge; 150 Q2 override; out-of-scope joint-normal/branching/random-walk boundaries; exact successful commit/run evidence; current corpus counts; next action `Probability & Statistics -> Random Variables & Distributions`.
- [ ] Run final branch CI and require `npm run test`, `npm run check`, `npm run build` all succeed with completion tests included.
- [ ] Compare the work branch against the completed Combinatorial Probability branch. Allowed final diff is limited to this spec/plan, HANDOFF, `conditioning`, `bayes-rule-base-rates`, six new Problems, three coverage ledgers, workstream 007 JSON, and Conditional Probability/source-neutral/handoff tests.
- [ ] Reject/remove any unrelated Home, Projects, visual UI, other-topic Knowledge, deployment, or research changes.
- [ ] Delete temporary branch-only CI after its successful evidence has been recorded.
- [ ] Re-run the final diff review and confirm the temporary workflow is absent.
- [ ] Commit handoff/closure with message `docs: hand off completed conditional probability bayes workstream`.

## Self-Review

- Every approved spec requirement maps to Tasks 1-7.
- Scope is one canonical topic only; editorial section placement never overrides mathematical identity.
- `conditioning` is reused rather than duplicated.
- Bayes/base-rate/model-ambiguity responsibility is isolated in `bayes-rule-base-rates`.
- Red Q3.15 protocol ambiguity is a tested requirement, not a footnote.
- Green/Red hidden-coin, two-child, and Russian-roulette families are semantically merged.
- 150 Q2 receives a justified item-level override; 150 joint-normal Q5 remains outside scope.
- Planned claimed rows are explicit: 6 Green, 5 Red, 1 150.
- Red Q3.11 remains Knowledge/self-test material rather than inflating the public Problem bank.
- All six mathematical outcomes are fixed and independently testable.
- Public content remains source-neutral.
- Completion requires fresh real CI evidence copied from an actual successful run.
- No `TODO`, `TBD`, fake SHA, fake run id, or unresolved implementation choice remains in this plan.
