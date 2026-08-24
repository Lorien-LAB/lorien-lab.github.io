# Quant Interview Limits & Derivatives — Design Spec

**Date:** 2026-08-24

**Status:** Conversational design approved; written-spec review pending

**Workstream:** `calculus-differential-equations-limits-derivatives-012`

**Candidate branch:** `chatgpt/quant-interview-workstream-limits-derivatives-2026-08-23`

**Frozen candidate base:** `f41880f220991f43d84ddb3795a59b8688e5230c`

**Integration order:** after workstream 011 and before workstream 013

## 1. Goal

Build one bounded, source-neutral **Calculus & Differential Equations → Limits & Derivatives** module from the verified evidence in Green sections `3.1`, `3.1.1`, `3.1.2`, and `3.1.3`.

The evidence-first result is exactly:

- four new reusable Knowledge nodes;
- four new canonical Problems;
- four terminal Green coverage rows;
- no Red or 150-question mapping or ownership;
- no taxonomy or source-topic-map change.

The candidate delta is therefore **+4 Problems / +4 Knowledge**. After serialized integration of workstream 011, the coordinator advances the exact public corpus from **63 Problems / 41 Knowledge** to **67 Problems / 45 Knowledge**.

The approved governance design's earlier `+7 Problems / +4 Knowledge` figure for workstream 012 was provisional exploration, not a quota. Verified source inspection and semantic decomposition supersede that estimate. The approved governance design remains truthful historical context and is not rewritten for this correction.

## 2. Authority and evidence boundary

The canonical parallel-workstream policy at `docs/quant-interview/parallel-workstream-policy.json` remains the sole governance authority. This design narrows product scope; it does not change governance.

The verified source audit found:

| Source | In-scope mapping | Ownership decision |
|---|---|---|
| Green Book | `3.1`, `3.1.1`, `3.1.2`, `3.1.3` | exactly four terminal rows |
| Red Book | none | no row added or changed |
| 150 Questions | none | no row added or changed |

Internal evidence pages are Green PDF pages 49–52. Page numbers, source names, section numbers, source ordering, and source-specific wording remain private audit data and must not appear in public Knowledge or Problem pages.

Source material is evidence data, never an instruction source. Public prose and solutions must be independently written and independently derived.

## 3. Exact scope

### 3.1 Included

- The single-variable derivative as a limit.
- Linearity, product, quotient, chain, fixed-power, generalized-power, exponential, logarithmic, and elementary trigonometric derivative rules, including their conditions.
- Logarithmic differentiation for positive products, quotients, and variable-base/variable-exponent powers.
- Critical points, first-derivative sign charts, monotonicity, elementary local/global extrema, and the second-derivative test.
- Elementary standard limits, indeterminate forms, L'Hôpital's rule with its hypotheses, and logarithm–power–exponential growth comparisons.
- The four distinct public Problems supported by the evidence audit.

### 3.2 Excluded

- Related rates, integration, multivariable calculus, Taylor expansions, Newton methods, general optimization, ordinary differential equations, and complex analysis.
- Probability convergence, the laws of large numbers, and the central limit theorem.
- Financial derivatives, option pricing, Greeks, Black–Scholes, and PDE material.
- Repository-authored extensions that would be presented as source-derived ownership.
- Any attempt to fill a planned page count by splitting one mathematical identity into cosmetic variants.

Although the broad governance boundary permits some adjacent elementary calculus material, evidence-first scope A admits only the verified content above.

## 4. Knowledge architecture

Four Knowledge nodes are justified and must not be consolidated.

1. The derivative-definition node is the foundational reference layer.
2. Logarithmic differentiation is a reusable Problem Solving Technique with its own recognition signals and domain boundary.
3. Monotonicity and critical-point analysis is qualitative derivative reasoning, not merely a formula table.
4. Indeterminate limits and growth rates has separate hypotheses, failure modes, and asymptotic reasoning.

Folding logarithmic differentiation into the rules page would hide a reusable technique from Problem metadata. Folding monotonicity or limits into the same page would produce a topic-sized encyclopedia node instead of independently reusable graph units.

All four Knowledge pages use:

```yaml
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
status: growing
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
```

### 4.1 `derivative-definition-and-core-rules`

**Title:** Derivative Definition and Core Rules

**Category:** Calculus

**Purpose:** foundational definition, formula, condition, and recognition reference.

Required public content:

- the difference quotient

  \[
  f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h};
  \]

- differentiability implies continuity, while continuity alone does not imply differentiability;
- linearity and constant rules;
- product, quotient, and chain rules, including a nonzero denominator condition for the quotient rule;
- fixed-power and generalized-power formulas with real-domain conditions;
- derivatives of elementary exponential, logarithmic, sine, cosine, and tangent functions;
- standard elementary limits used in derivative derivations;
- one-sided and endpoint cautions where ordinary two-sided differentiability is unavailable;
- realistic Common Mistakes and public Interview Checks.

Related Knowledge, in this order:

```yaml
related: [logarithmic-differentiation, monotonicity-critical-points-second-derivative-test, indeterminate-limits-and-growth-rates]
```

`relatedNotes` must contain one aligned explanatory note per relationship.

### 4.2 `logarithmic-differentiation`

**Title:** Logarithmic Differentiation

**Category:** Problem Solving Techniques

**Purpose:** reusable technique for expressions whose multiplicative or exponent structure is difficult to differentiate directly.

For positive differentiable functions (u) and (y=u^v), derive

\[
\log y=v\log u,
\qquad
\frac{y'}{y}=v'\log u+v\frac{u'}{u}.
\]

The page must explain:

- why (u>0) is required for this real-valued formula;
- how logarithms turn products into sums and quotients into differences;
- how to recognize variable-base/variable-exponent forms;
- why zero or negative bases require separate domain analysis rather than blind formula use;
- how to restore the factor (y) after differentiating (log y);
- Interview Checks including the log-power expression used by Problem 001.

```yaml
related: [derivative-definition-and-core-rules]
```

### 4.3 `monotonicity-critical-points-second-derivative-test`

**Title:** Monotonicity, Critical Points, and the Second-Derivative Test

**Category:** Calculus

**Purpose:** qualitative analysis of a differentiable single-variable function.

Required public content:

- a critical number is a domain point where (f'=0) or (f') does not exist;
- (f'>0) and (f'<0) determine increasing and decreasing intervals;
- a first-derivative sign change distinguishes a local maximum, local minimum, or neither;
- closed-interval global optimization also requires endpoint comparison;
- at a critical point, (f''>0) supports a local minimum and (f''<0) supports a local maximum;
- **(f''=0) is inconclusive** and never by itself proves an extremum or inflection point;
- an inflection point requires an actual change in concavity;
- a worked application to (f(x)=\log x/x), with a sign chart on ((0,e)) and ((e,\infty));
- Common Mistakes and Interview Checks.

```yaml
related: [derivative-definition-and-core-rules]
```

### 4.4 `indeterminate-limits-and-growth-rates`

**Title:** Indeterminate Limits and Growth Rates

**Category:** Calculus

**Purpose:** recognize, transform, and justify elementary deterministic limits.

Required public content:

- the distinction between an indeterminate form and a determined limiting expression;
- algebraic simplification, standard limits, and substitutions before L'Hôpital;
- standard limits including

  \[
  \lim_{x\to0}\frac{\sin x}{x}=1,
  \qquad
  \lim_{x\to0}\frac{e^x-1}{x}=1,
  \qquad
  \lim_{x\to0}\frac{\log(1+x)}{x}=1;
  \]

- the exact L'Hôpital gate: (f) and (g) are differentiable on an appropriate punctured one-sided or two-sided neighborhood, (g'\ne0) there, the quotient has a (0/0) or extended-real infinity-over-infinity form, and the derivative quotient has the required ordinary or extended-real limit;
- repeated use only after those conditions are checked again;
- the asymptotic hierarchy logarithms (<) positive powers (<) exponentials in the relevant positive-tail regime;
- the signed boundary identity (x^a\log x\to0^-) as (x\to0^+) for (a>0);
- Common Mistakes and Interview Checks.

```yaml
related: [derivative-definition-and-core-rules]
```

## 5. Public Problem contracts

Create all four Problems under `src/content/problems/calculus/`. Each page must be source-neutral and S3+ with:

- `## Problem`;
- `## Think Before Revealing`;
- at least two progressive Hint disclosures;
- a `Show Solution` disclosure containing `## Solution`;
- `## Why This Matters`;
- `## Common Mistakes`;
- `## Extensions`.

All use:

```yaml
date: 2026-08-24
domain: Mathematics & Statistics
category: Calculus
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
status: solved
featured: false
```

### 5.1 `differentiate-log-power-function`

```yaml
problemId: limits-derivatives-001
title: Differentiate a Log-Power Function
subcategories: [Derivatives, Logarithmic Differentiation]
concepts: [derivative-definition-and-core-rules]
techniques: [logarithmic-differentiation]
prerequisites: []
relatedProblems: []
family: logarithmic-differentiation
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 10
```

The Problem is

\[
y=(\log x)^{\log x},\qquad x>1.
\]

The domain (x>1) is mandatory: it makes (log x>0), so the real logarithm of (y) is valid. The solution must derive

\[
\log y=(\log x)\log(\log x),
\]

then

\[
\frac{y'}{y}
=\frac{\log\log x}{x}
+(\log x)\frac{1}{x\log x}
=\frac{\log\log x+1}{x},
\]

and therefore

\[
\boxed{
y'=\frac{(\log x)^{\log x}}{x}\left(\log\log x+1\right)
}.
\]

Common Mistakes must cover treating the variable exponent as constant, losing the factor (y), differentiating (log\log x) incorrectly, and dropping the domain.

### 5.2 `compare-e-pi-power-expressions`

```yaml
problemId: limits-derivatives-002
title: Compare e^pi and pi^e
subcategories: [Derivatives, Monotonicity, Inequalities]
concepts: [monotonicity-critical-points-second-derivative-test]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: []
family: monotonicity-comparison
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
```

The rendered title and mathematical body should typeset (e^\pi) and (pi^e) clearly even though the source-neutral slug and plain YAML title remain portable.

For

\[
f(x)=\frac{\log x}{x},\qquad x>0,
\]

derive

\[
f'(x)=\frac{1-\log x}{x^2}.
\]

The primary proof must use the sign of (f'): (f) increases on ((0,e)), decreases on ((e,\infty)), and reaches its maximum at (e). Using the elementary ordering (e<\pi),

\[
\frac{\log\pi}{\pi}<\frac{1}{e}
\Longrightarrow
e\log\pi<\pi
\Longrightarrow
\boxed{e^\pi>\pi^e}.
\]

A second-derivative calculation at (e) may confirm the local maximum, but it must not replace the interval sign test that proves the required global comparison. The solution must explicitly warn that solving (f''=0) is not a valid way to locate this maximum and that (f''=0) is generally inconclusive.

### 5.3 `exponential-over-polynomial-limit`

```yaml
problemId: limits-derivatives-003
title: Exponential Growth over a Polynomial
subcategories: [Limits, Asymptotic Growth]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [logarithm-power-limit-at-zero]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 8
```

Evaluate

\[
\lim_{x\to\infty}\frac{e^x}{x^2}.
\]

The solution must identify the initial infinity-over-infinity form, state why the L'Hôpital hypotheses hold on a positive tail, and recheck the form before the second application:

\[
\lim_{x\to\infty}\frac{e^x}{x^2}
=\lim_{x\to\infty}\frac{e^x}{2x}
=\lim_{x\to\infty}\frac{e^x}{2}
=\boxed{\infty}.
\]

An alternate logarithmic comparison may be included. Taylor expansion must not be the principal method because Taylor/Newton material is outside this workstream.

### 5.4 `logarithm-power-limit-at-zero`

```yaml
problemId: limits-derivatives-004
title: A Logarithm-Power Limit at Zero
subcategories: [Limits, Asymptotic Growth]
concepts: [indeterminate-limits-and-growth-rates]
techniques: []
prerequisites: [derivative-definition-and-core-rules]
relatedProblems: [exponential-over-polynomial-limit]
family: deterministic-growth-rate-limits
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
```

Evaluate

\[
\lim_{x\to0^+}x^2\log x.
\]

Transform the product form (0\cdot(-\infty)) into

\[
\frac{\log x}{x^{-2}}.
\]

After checking the one-sided L'Hôpital conditions,

\[
\frac{1/x}{-2x^{-3}}=-\frac{x^2}{2}\to0.
\]

Because (x^2\log x<0) for (0<x<1), the page must record

\[
\boxed{0^-},
\]

meaning a limit equal to zero approached from below. Substitution (t=1/x) may be an alternate method. The broader identity (x^a\log x\to0^-) for (a>0) belongs in Extensions, not as another public Problem.

## 6. Public graph decision

The 012 graph is intentionally bounded and high-signal:

- the derivative-definition node connects to the other three new Knowledge nodes;
- each Problem connects only to the new Knowledge it genuinely uses through `concepts`, `techniques`, and `prerequisites`;
- the two limits Problems are reciprocal `relatedProblems` because they form one deterministic growth-rate family;
- the logarithmic-differentiation and monotonicity Problems are distinct and require no direct Problem-to-Problem edge.

Do not add or require reciprocal edits to pre-existing MGF, random-variable-transformation, probabilistic-limit, financial-derivative, option, or Greek pages merely for adjacency. No pre-existing public Knowledge or Problem page needs modification for workstream 012.

In particular:

- `limit-theorems-lln-clt` is probabilistic convergence, not a deterministic calculus-limit prerequisite;
- `derivatives-options-no-arbitrage` concerns financial instruments, not differentiation;
- MGF differentiation and density transformations may use calculus, but this bounded evidence-first module does not reopen their completed workstreams to create optional graph edges.

## 7. Exact hidden coverage decisions

The coordinator changes exactly four existing Green rows. Every row retains

```json
"canonicalTopics": ["limits-derivatives"]
```

| Coverage key | State | Canonical Problems | Canonical Knowledge |
|---|---|---|---|
| `3.1::` | `knowledge-only` | none | `derivative-definition-and-core-rules`, `logarithmic-differentiation`, `indeterminate-limits-and-growth-rates` |
| `3.1.1::` | `canonical-problem` | `differentiate-log-power-function` | `derivative-definition-and-core-rules`, `logarithmic-differentiation` |
| `3.1.2::` | `canonical-problem` | `compare-e-pi-power-expressions` | `monotonicity-critical-points-second-derivative-test`, `derivative-definition-and-core-rules` |
| `3.1.3::` | `canonical-problem` | `exponential-over-polynomial-limit`, `logarithm-power-limit-at-zero` | `indeterminate-limits-and-growth-rates`, `derivative-definition-and-core-rules` |

The state distribution is therefore exactly **three `canonical-problem` rows and one `knowledge-only` row**. Four rows resolve to four Problems because `3.1.3` contains two independent mathematical targets.

`3.1.3` remains one unique ledger row with two Problem targets. It must not be split into duplicate `3.1.3::` keys or represented by an invented source item.

Required resolution-note meanings:

- `3.1`: the derivative/rules, generalized-power/logarithmic-differentiation, and standard-limit material is fused into reusable Knowledge, with public Interview Checks preserving the conceptual tests;
- `3.1.1`: the variable-base/variable-exponent differentiation Problem is distinct and the canonical page enforces (x>1);
- `3.1.2`: the comparison uses the first-derivative interval sign test, with the second derivative only as a check;
- `3.1.3`: the row contains two independent limit identities, requires proper L'Hôpital hypotheses, and preserves the signed (0^-) conclusion.

No Red or 150 coverage row is added, changed, or claimed.

## 8. Source-topic map and taxonomy

`src/data/quant-interview/topics/source-topic-map.json` already has exactly these in-scope entries:

```text
green-book 3.1   -> limits-derivatives
green-book 3.1.1 -> limits-derivatives
green-book 3.1.2 -> limits-derivatives
green-book 3.1.3 -> limits-derivatives
```

There are zero Red and zero 150 mappings for `limits-derivatives`. The coordinator must test and preserve this state; no broad source-container mapping is invented.

`src/data/quant-interview/topics/taxonomy.json` already contains parent `calculus-differential-equations` and child `limits-derivatives`. It requires no change.

## 9. Workstream manifest design

The coordinator creates:

`src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`

Its pre-closure contract is:

```json
{
  "id": "calculus-differential-equations-limits-derivatives-012",
  "canonicalTopics": [
    "calculus-differential-equations",
    "limits-derivatives"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["3.1", "3.1.1", "3.1.2", "3.1.3"],
      "evidencePageRanges": [{"startPage": 49, "endPage": 52}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "The bounded review resolves one knowledge-only row, two one-Problem rows, and one row with two independent limit Problems. Red and 150 have zero mapped Limits & Derivatives ownership."
    }
  ]
}
```

The manifest is Green-only because the validator requires every source scope to name real mapped sections and neither Red nor 150 has one. Their zero-mapping audit is recorded in `reviewNote` and enforced by tests.

The candidate never writes verification placeholders. Only the coordinator adds `verification` and changes `status` to `complete`, after integration and real CI success.

## 10. Ownership boundary

### 10.1 Candidate create-only ownership

The candidate may create exactly these public content files:

- `src/content/knowledge/concepts/derivative-definition-and-core-rules.md`
- `src/content/knowledge/concepts/logarithmic-differentiation.md`
- `src/content/knowledge/concepts/monotonicity-critical-points-second-derivative-test.md`
- `src/content/knowledge/concepts/indeterminate-limits-and-growth-rates.md`
- `src/content/problems/calculus/differentiate-log-power-function.md`
- `src/content/problems/calculus/compare-e-pi-power-expressions.md`
- `src/content/problems/calculus/exponential-over-polynomial-limit.md`
- `src/content/problems/calculus/logarithm-power-limit-at-zero.md`

The candidate may create exactly one module-local test file:

- `tests/quant-interview-limits-derivatives-content.test.mjs`

The candidate does not edit pre-existing public pages. Its branch remains `active`, even after candidate-local review.

### 10.2 Coordinator-only ownership

The coordinator alone may create or edit:

- `src/data/quant-interview/coverage/green-book.json`;
- `src/data/quant-interview/workstreams/calculus-differential-equations-limits-derivatives-012.json`;
- `tests/quant-interview-source-neutral-content.test.mjs`;
- `tests/quant-interview-limits-derivatives-workstream.test.mjs`;
- `tests/quant-interview-limits-derivatives-completion.test.mjs`;
- the prior 011 completion test if its next-action assertion must advance;
- `docs/quant-interview/HANDOFF.md`;
- `tests/quant-interview-handoff.test.mjs`;
- any CI-owned completion metadata.

There is no proposed edit to Green/Red/150 source-topic mappings, taxonomy, Red coverage, 150 coverage, pre-existing public pages, or CI workflows.

## 11. Test contracts

### 11.1 Candidate module-content test

`tests/quant-interview-limits-derivatives-content.test.mjs` must assert:

- all eight exact public slugs and all four exact `problemId` values;
- exact topic arrays and the graph metadata in Sections 4–6;
- all four Knowledge pages contain Common Mistakes and Interview Checks;
- each Problem meets the S3+ disclosure and heading contract with at least two progressive hints;
- no public page exposes Green, Red, 150, source item, source section, PDF page, or source page provenance;
- the log-power Problem includes (x>1) and the derivative

  \[
  \frac{(\log x)^{\log x}}{x}(\log\log x+1);
  \]

- the comparison Problem proves (e^\pi>\pi^e) from the sign of ((\log x/x)') on the correct intervals;
- the monotonicity Knowledge and comparison Problem both say that (f''=0) is inconclusive;
- the exponential-over-polynomial Problem checks and applies L'Hôpital twice and concludes infinity;
- the logarithm-power Problem states the right-hand domain and concludes (0^-), not merely unsigned zero;
- the limits Knowledge states the differentiability, punctured-neighborhood, nonzero-denominator-derivative, indeterminate-form, and derivative-quotient-limit hypotheses for L'Hôpital;
- no Taylor-series proof is presented as the principal solution.

Assertions should test semantic mathematical invariants without requiring brittle verbatim paragraphs or copied source wording.

### 11.2 Coordinator workstream test

`tests/quant-interview-limits-derivatives-workstream.test.mjs` must assert:

- exact workstream ID, topic pair, `active|complete` status, Green-only scope, four source sections, and PDF range 49–52;
- exactly four source-topic-map matches, all Green, and zero Red/150 matches;
- exactly four terminal Green coverage rows for this topic;
- exactly three `canonical-problem` rows and one `knowledge-only` row;
- `3.1.3::` is one row with exactly the two approved Problem targets;
- every row has a nonempty resolution note and the exact approved target arrays;
- the coverage validator succeeds with real Problem and Knowledge slugs and `allowUnresolvedCanonicalRefs: false`;
- Red and 150 gain no terminal `limits-derivatives` ownership.

### 11.3 Exact corpus regression

At integration, the coordinator updates the exact global slug regression from the real post-011 state. It must append the four approved Problem slugs and four approved Knowledge slugs to the complete exact sets and assert:

```text
Problems: 63 -> 67
Knowledge: 41 -> 45
```

The four Knowledge topic assignments are exactly:

```text
[calculus-differential-equations, limits-derivatives]
```

The regression must not use lower bounds, omit the post-011 slugs, or replace a newer exact set with the frozen candidate base's older set.

### 11.4 Candidate and integrated verification

Because the candidate is forbidden to update the coordinator-owned exact global regression, adding its eight public pages to the frozen `59/39` base can make the full `npm run test` fail only at the intentionally stale global-count contract. This is an integration-pending shared-state mismatch, not candidate completion evidence.

Before handoff, the candidate must run:

- the module-local content test directly;
- `npm run check`;
- `npm run build`;
- `npm run test`, recording any failure exactly and accepting only the expected coordinator-owned exact-count mismatch.

Any unrelated or module-content failure blocks candidate handoff. The candidate remains `active` and does not claim the full repository gate is green.

After porting the candidate onto the latest durable post-011 base and applying shared deltas, the coordinator must obtain clean results for:

```text
npm run test
npm run check
npm run build
```

The coordinator then obtains a real successful CI run for the exact integrated commit.

## 12. Integration and closure

Workstream 012 is integrated only after workstream 011 is durably complete. The coordinator:

1. verifies the latest durable base is the exact post-011 `63/41` state;
2. reviews and ports only the candidate-owned content and module-test files;
3. applies the four Green coverage resolutions semantically rather than replacing the whole ledger;
4. adds the Green-only active workstream manifest;
5. adds the coordinator workstream/completion tests and exact `67/45` global regression;
6. updates HANDOFF and any prior completion-test next-action assertion;
7. runs the full local verification gates;
8. reviews the topic-only diff for forbidden source provenance and out-of-scope edits;
9. obtains real CI success for the exact integrated commit;
10. records the real 40-character commit, positive CI run ID, command list, and `success` conclusion;
11. changes workstream 012 to `complete` and advances authoritative HANDOFF state to reservation 013, Reasoning & Communication;
12. reruns fresh closure verification on the final clean tree.

Neither the candidate branch nor an unverified integrated commit may claim completion.

## 13. Failure and ambiguity rules

### Base drift

If the latest durable base is not the verified post-011 `63/41` state, stop and reconcile the exact slug sets and counts. Never replace newer shared files with versions from the frozen candidate base.

### Mapping drift

If Red or 150 gains a genuine `limits-derivatives` mapping before integration, stop and re-audit the new mapped evidence. Do not preserve the zero-ownership claim by ignoring new repository truth.

### Semantic collision

If any approved slug or mathematical identity appears on the latest durable base, perform semantic deduplication. Do not preserve the `+4/+4` delta as a quota; amend the design if canonical identity changes.

### Domain failure

Do not broaden ((\log x)^{\log x}) to all (x>0). For ordinary real logarithmic differentiation, the approved Problem domain is (x>1).

### L'Hôpital misuse

Do not apply L'Hôpital to a product form, an expression that is not `0/0` or infinity-over-infinity, or a quotient without the required differentiability and nonzero derivative conditions. Repeated applications require renewed checks.

### Sign loss

For (x^2\log x) as (x\to0^+), zero is the limit value and the approach is from below. Tests and public explanation must preserve (0^-).

### Monotonicity misuse

The comparison (e^\pi>\pi^e) requires a first-derivative interval sign argument. A point where (f''=0) is not automatically an extremum or inflection point.

### Verification failure

Keep the workstream `active`. Do not write success metadata, advance HANDOFF, or claim completion until local gates and real CI pass for the exact integrated commit.

## 14. Success criteria

This design is satisfied when:

- exactly the eight approved source-neutral public pages exist;
- the four-node Knowledge architecture and approved bounded graph are preserved;
- all four Problems contain independent S3+ derivations with the exact domains and conclusions above;
- exactly four Green rows are terminal, including one `3.1.3` row with two Problem targets;
- Red and 150 have zero mapping and zero ownership;
- taxonomy and source-topic map remain unchanged;
- candidate and coordinator ownership boundaries are respected;
- serialized integration produces the exact `67/45` corpus contract;
- the completed manifest and HANDOFF contain only real verification evidence;
- full local verification and real CI succeed for the exact integrated commit.

The bounded result is a completed Limits & Derivatives workstream, not a claim that calculus or any source book is complete.
