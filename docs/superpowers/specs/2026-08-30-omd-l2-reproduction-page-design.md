# OMD L2 A-Share Reproduction Page Design

Date: 2026-08-30  
Status: Approved design, pending implementation plan

## 1. Goal

Publish the completed L2 reproduction as the first academic-paper record in the
Lorien Lab Reproduction Workbench. The page presents the tradable A-share OMD
long-only implementation and its empirical evidence without exposing private
code, positions, orders, ledgers, or local filesystem paths.

The page is public. The implementation remains private and must be rendered as
`Implementation Private` with no code link.

## 2. Scope and exclusions

The page covers only L2: `a_share_omd_long_only`.

It must not mention, compare, summarize, or link to L1 or L3. It must not use a
three-lane framing. Later optimization research is outside this page.

The page is an A-share adaptation reproduction, not a claim that the paper's
original market, data, constraints, or headline returns were reproduced
exactly. Its public status is therefore:

- stage: `reproduction`;
- result: `partial`;
- code visibility: `private`.

## 3. Canonical identity

- Slug: `observable-matrix-dynamics-a-share-long-only`
- Public title: `OMD Portfolio Optimization · A股 Long-Only Reproduction`
- Source paper: *Are Three Matrices All You Need To Beat the Market? Observable
  Matrix Dynamics for Portfolio Optimization*
- Author: Igor Halperin
- Year: 2026
- Source identifier: arXiv `2607.27461`
- Paper URL: `https://arxiv.org/abs/2607.27461`
- Research area: `Portfolio Construction`
- Asset class: `China A-share Equities`
- Market: `China A-share`
- Frequency: `Monthly signals · daily next-open execution`
- Featured: `true`

The narrative is English-first. Important concepts use bilingual labels and
standard A-share terminology where it improves precision, for example:

- A股 long-only adaptation;
- point-in-time constituents / 时点成分股;
- next-open execution / 下一开盘成交;
- limit-up and limit-down / 涨跌停;
- suspension / 停牌;
- ADV participation / 日均成交额参与率.

## 4. Page architecture

Use the existing reproduction case-study route and components. Add one
page-specific evidence panel rather than building a second reproduction layout.

Expected files:

- `src/content/reproductions/academic/observable-matrix-dynamics-a-share-long-only.md`
- `src/data/reproduction-results/omd-a-share-long-only.ts`
- `src/components/reproduction-note/OMDL2EvidencePanel.astro`
- a minimal slug-gated integration in
  `src/pages/projects/reproductions/[...id].astro`
- `tests/omd-l2-reproduction-page.test.mjs`

The page keeps the existing header, workflow status, verdict grid, strategy
flow, limitations, Markdown research narrative, artifact footer, and responsive
site shell. The new evidence panel appears after the reproduction status and
before the long-form narrative.

No generic abstraction is introduced unless an existing component can consume
the L2 data directly without weakening page-specific semantics.

## 5. Headline presentation

The primary visual shows the stitched OOS1→OOS2 annualized result directly.
It does not lead with separate-window returns.

| Initial capital per index sleeve | Stitched annual return | Sharpe | Maximum drawdown |
| --- | ---: | ---: | ---: |
| CNY 100 million | 20.22% | 0.79 | -22.49% |
| CNY 500 million | 19.13% | 0.76 | -22.40% |

Exact stored values are retained in the data module:

- CNY 100 million: annual return `0.202245`, Sharpe `0.794502`, maximum
  drawdown `-0.224887`;
- CNY 500 million: annual return `0.191262`, Sharpe `0.760208`, maximum
  drawdown `-0.223963`.

The headline must state all of the following next to the values:

- period: 2024-01-02 through 2026-06-30;
- construction: non-overlapping OOS1 and OOS2 daily paths concatenated;
- aggregation: equal-weighted daily returns across CSI 300, CSI 500, and CSI
  1000 sleeves;
- capital is per independent index sleeve, so the two scenarios imply CNY 300
  million and CNY 1.5 billion total nominal initial capital;
- A-share costs and capacity constraints are included;
- the stitched path is descriptive and does not replace independent-window
  robustness evidence.

## 6. Evidence panel

The L2-specific panel contains four compact sections.

### 6.1 Stitched headline

Two capital cards display stitched annual return, Sharpe, and maximum drawdown.
The CNY 100 million sleeve card is visually primary; the CNY 500 million card
shows capacity scaling.

### 6.2 Index and window comparison

A responsive grouped-bar view compares OOS1 and OOS2 annual returns for CSI
300, CSI 500, CSI 1000, and the equal-sleeve combined path. A control switches
between CNY 100 million and CNY 500 million per sleeve. A semantic HTML table
contains the same values and remains usable without JavaScript.

Exact annual returns:

| Window | Capital | CSI 300 | CSI 500 | CSI 1000 | Combined |
| --- | ---: | ---: | ---: | ---: | ---: |
| OOS1 | 100m | 13.1995% | 9.1906% | -3.4975% | 6.6029% |
| OOS1 | 500m | 12.9832% | 7.7466% | -4.8577% | 5.5604% |
| OOS2 | 100m | 36.6302% | 65.9642% | 29.1116% | 43.7029% |
| OOS2 | 500m | 36.6462% | 65.2143% | 26.5382% | 42.5274% |

The supporting robustness table retains each window's combined annual return,
annualized volatility, Sharpe, maximum drawdown, and Calmar. These values are
secondary to the stitched headline but cannot be omitted because the windows
behave differently.

### 6.3 Benchmark comparison

Show combined equal-sleeve annual return against two clearly different
benchmarks:

- `Official price index / 官方价格指数`: close-to-close, with no modeled stock
  execution, costs, capacity, or capital scaling;
- `PIT equal-weight / 时点成分股等权`: exact point-in-time membership, next-open
  A-share execution, costs, capacity, and the frozen delisting convention.

| Window | Capital | L2 | Official index | PIT equal-weight |
| --- | ---: | ---: | ---: | ---: |
| OOS1 | 100m | 6.6029% | 7.6142% | 9.1398% |
| OOS1 | 500m | 5.5604% | 7.6142% | 9.1060% |
| OOS2 | 100m | 43.7029% | 41.0000% | 23.6805% |
| OOS2 | 500m | 42.5274% | 41.0000% | 23.5367% |

The copy must not describe the official price index as an executable account.

### 6.4 Costs and capacity

Summarize, without publishing account-level evidence:

- annualized two-way turnover across the three sleeves;
- total modeled transaction cost;
- 10% ADV participation cap;
- the performance reduction from the 100m to 500m sleeve scenario;
- the fact that capacity pressure is material and index-dependent.

Do not present a single universal live-capacity number. Capacity estimates are
trade-level diagnostics, not a guarantee that an entire strategy can be
deployed at that amount.

## 7. Case-study narrative

The Markdown record uses this sequence:

1. Research question
2. Paper mechanism
3. A-share long-only adaptation
4. Data and point-in-time universe
5. Portfolio construction
6. Execution and cost model
7. No-lookahead validation
8. Empirical results
9. Benchmark comparison
10. Capacity and robustness
11. Limitations
12. Conclusion

The conclusion states:

- the L2 implementation is a tradable A-share adaptation of the OMD long
  portfolio;
- the stitched equal-sleeve path annualizes at about 20.22% for 100m per sleeve
  and 19.13% for 500m per sleeve;
- the CSI 1000 sleeve is negative in OOS1;
- OOS2 is much stronger than OOS1, so state and sample dependence remain
  material;
- the result is research evidence, not a live-performance claim or investment
  recommendation.

## 8. Public-data boundary

The website stores only small, reviewed aggregate values needed to render the
page. It must not copy or publish:

- stock-level targets or holdings;
- orders or daily ledgers;
- raw forecasts, features, geometry, or membership files;
- local absolute paths;
- private source code or repository URLs;
- private configuration files;
- hashes, tamper metadata, or security artifacts.

The public page may link to the arXiv paper. Because implementation visibility
is private, `codeUrl`, `notebookUrl`, `configurationUrl`, and `resultsUrl` remain
absent unless a real public destination is created in a later task.

## 9. Frontmatter and verdicts

Do not fabricate an Original-vs-Reproduced metric row when the original paper
market is not directly comparable to the A-share adaptation. Leave the generic
`metrics` comparison empty and render L2 evidence through the dedicated panel.

Do not add a six-dimensional reproduction score unless a separate explicit
grading exercise is completed. Missing scores remain missing.

Approved verdict cards:

- `OMD long-only construction`: reproduced — frozen forecasts and monthly
  long-only targets close to the formal A-share reproduction evidence;
- `Point-in-time and causality`: reproduced — PIT membership and training-date
  gates are enforced, with signal-day information executed only at the next
  open;
- `A-share execution layer`: extension — commission, stamp duty, transfer fee,
  slippage, impact, suspensions, price limits, delisting, and ADV capacity are
  an A-share implementation layer;
- `Cross-window stability`: partial — OOS1 and OOS2 differ materially and CSI
  1000 is negative in OOS1.

## 10. Accessibility and interaction

- Capital controls are real buttons with `aria-pressed` state.
- The chart has an accessible title and does not rely on color alone.
- The exact values remain in a visible or screen-reader-accessible table.
- Negative returns use sign, label, and color.
- Keyboard navigation, reduced-motion preferences, light theme, dark theme,
  narrow mobile screens, and wide desktop screens are covered.
- The page remains useful when client-side JavaScript is unavailable.

## 11. Verification

Add focused tests that verify:

- the academic record exists with the canonical slug;
- source type, result, stage, private code visibility, author, year, and paper
  URL are correct;
- the exact stitched headline values are present;
- both capital scenarios and all three indices are present;
- official and PIT benchmark labels are not conflated;
- no code link or local absolute path is rendered;
- no L1, L3, or three-lane wording appears in the record, data module, or
  page-specific component;
- the dedicated panel is slug-gated and does not change other reproduction
  pages.

Run the complete site gates:

```text
npm run test
npm run check
npm run build
```

Then test the generated site in a real browser at desktop and mobile widths,
including the reproduction index, the L2 detail page, capital switching,
accessible table, light/dark theme, console errors, and direct route refresh.

## 12. Delivery

Implementation occurs in an isolated Git worktree because the main website
checkout contains unrelated untracked documents. Those files remain untouched.

After implementation, tests, code review, and browser QA pass, merge the feature
branch into `main` and push `main`. The existing GitHub Pages workflow builds and
publishes `dist/`. If any gate fails, do not push.
