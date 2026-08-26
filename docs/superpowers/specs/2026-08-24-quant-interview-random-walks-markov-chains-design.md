# Quant Interview Random Walks & Markov Chains Workstream — Design Spec

**Date:** 2026-08-24

**Status:** Conversational design approved; written-spec review pending

**Workstream reservation:** `011`

**Workstream ID:** `stochastic-processes-random-walks-markov-chains-011`

**Candidate branch:** `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23`

**Frozen candidate base:** `f41880f220991f43d84ddb3795a59b8688e5230c`

## 1. Goal

Build one bounded, source-neutral **Stochastic Processes & Stochastic Calculus → Random Walks & Markov Chains** module from the completed three-source audit. The module adds reusable finite-state Markov-chain theory and state-compression technique Knowledge, creates four genuinely distinct interview Problems, and enriches the existing random-walk boundary identity without duplicating it.

The isolated candidate creates only new module content and a module-specific content test. The coordinator later reconciles every shared surface on the latest durable base, performs the exact corpus regression, integrates workstream 011 before 012 and 013, obtains real CI evidence, and alone records authoritative completion.

## 2. Governing constraints

This spec follows the repository's canonical parallel-workstream governance, Agent Protocol, Content Standard, taxonomy, and current HANDOFF state.

- One candidate branch owns one approved module.
- The candidate creates only new public Knowledge, new public Problems, and its module-specific test.
- The candidate does not edit shared coverage, source routing, workstream metadata, exact global counts, HANDOFF, completion tests, CI workflows, or pre-existing reciprocal graph links.
- Public Knowledge and Problems are independently written and source-neutral.
- Internal evidence metadata may retain source section, item, and page identities for audit, but those identities never appear in public content.
- The candidate remains non-authoritative and active after module-local verification. Only the coordinator may integrate, obtain real CI evidence, mark the workstream complete, or advance HANDOFF.
- Exact slug enumeration must remain exact; it must not be weakened to a lower bound to accommodate parallel work.

## 3. Scope and non-goals

### 3.1 In scope

- finite homogeneous Markov chains;
- transition matrices and multi-step transitions;
- communicating, closed, and absorbing state structure;
- stationary distributions and finite-chain mean return times;
- first-step hitting-probability and hitting-time equations;
- finite random walks with absorbing boundaries;
- sufficient-state construction for streaks and patterns;
- symmetry/lumpability-based state compression;
- finite pattern-hitting, return-time, and consensus/coalescence Problems.

### 3.2 Explicit non-goals

- martingales and optional-stopping solutions;
- Brownian motion, Itô calculus, stochastic differential equations, branching, or reinforcement;
- general dynamic programming or optimal-stopping theory;
- continuous-time Markov chains;
- reopening completed conditioning, expectation, distribution, or order-statistics ownership;
- processing an entire source chapter beyond the audited rows;
- any whole-source or whole-domain completeness claim.

This is one coherent module and is intended to produce one implementation plan after written-spec approval.

## 4. Evidence-first audit boundary

The audited scope contains exactly eight terminal source rows: five Green rows and three Red item rows. The 150-question probability section was reviewed but contributes no new ownership.

### 4.1 Green evidence

The bounded evidence is PDF pages 121–131:

- `5.1` theory, pages 121–122: finite homogeneous Markov-chain Knowledge;
- `5.1.gamblers-ruin`, pages 123–124: biased walk on `0..3`, upward probability `2/3`, result `4/7`; enrich the existing `random-walk-boundary` identity;
- `5.1.dice-question`, pages 124–125: a total of 12 before two consecutive totals of 7, result `7/13`;
- `5.1.coin-triplets`, pages 125–128: `E[HHH]=14`, `E[THH]=8`, `P(HHH before THH)=1/8`, and the second chooser's length-three response guarantee;
- `5.1.color-balls`, pages 129–131: ordered-pair recoloring from distinct initial colors, expected unanimity time `(n-1)^2`.

### 4.2 Red evidence

The bounded evidence is the union of question pages 94–96 and solution pages 115–117 and 139:

- `3.2.1::3.22`: cube first positive return, result `8`; new canonical Problem and item-level topic override;
- `3.2.1::3.23`: fair finite-plank boundary walk; merged into `random-walk-boundary` and item-level topic override;
- `3.2.2::3.40`: fair walk on `0..1000`, start `80`, probability of hitting zero first `92/100`; merged into `random-walk-boundary`.

### 4.3 150-question review

Section `2.6` contains items 1–29. Items 1–9 are already terminal under earlier workstreams and retain their existing states and canonical owners. The remaining items 10–29 were audited from question PDF pages 41–43 and solution PDF pages 145–174. They concern martingales, Brownian motion, Itô calculus, stochastic differential equations, change of measure, and stochastic volatility; none contributes finite-state Markov-chain or discrete-random-walk ownership to 011.

The 150 scope is therefore `reviewed-no-new-ownership`. Add no 150 coverage rows, and keep the aggregate `2.6::` row `pending` because it is a broad mixed-topic container rather than a terminal item-level ownership claim.

## 5. Corpus delta and canonical identities

The durable base has exactly 59 canonical Problems and 39 explicitly topic-classified Knowledge / Technique nodes. This workstream adds exactly four Problems and two Knowledge nodes. Enriching the existing boundary Problem does not change the count.

Expected integrated corpus: **63 Problems / 41 Knowledge**.

All six new slugs are frozen by this spec.

### 5.1 New Knowledge

| Slug | Title | Category | Topics |
|---|---|---|---|
| `finite-state-markov-chains` | Finite-State Markov Chains | Probability | `[stochastic-processes-stochastic-calculus, random-walks-markov-chains]` |
| `markov-chain-state-compression` | State Compression for Markov Chains | Problem Solving Techniques | `[stochastic-processes-stochastic-calculus, random-walks-markov-chains]` |

### 5.2 New Problems

| Slug | Problem ID | Canonical identity |
|---|---|---|
| `twelve-before-consecutive-sevens` | `random-walks-markov-chains-001` | Competing target and streak hazards in a two-state compressed chain |
| `coin-pattern-hitting-times` | `random-walks-markov-chains-002` | Pattern waiting times, a competing-pattern race, and the length-three second-chooser response |
| `random-recoloring-consensus-time` | `random-walks-markov-chains-003` | Ordered-pair voter recoloring solved through backward lineage coalescence |
| `random-walk-return-time-on-cube` | `random-walks-markov-chains-004` | First positive return on the cube through stationarity and Hamming-distance compression |

All four Problems use:

- `category: Stochastic Processes`;
- `quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]`;
- `concepts: [finite-state-markov-chains]`;
- `techniques: [markov-chain-state-compression, first-step-analysis]`;
- `status: solved`;
- source-neutral, S3+ public structure with progressive hints, a full derivation, realistic mistakes, and meaningful extensions.

The existing `random-walk-boundary` retains its slug and `lorien-stochastic-001` ID.

## 6. Knowledge contracts

### 6.1 `finite-state-markov-chains`

The node must be understandable without any source material and must cover:

1. **Markov property and homogeneity.** For a finite state space `S`, the conditional law of the next state depends only on the current state, and a homogeneous chain uses the same transition law at every time.
2. **Transition matrix.** Under a row-vector convention, `P_ij >= 0`, each row sums to one, `mu_(t+1)=mu_t P`, and `mu_t=mu_0 P^t`.
3. **Multi-step transitions.** Explain matrix powers and Chapman–Kolmogorov.
4. **State structure.** Define reachability, communication, communicating classes, closed classes, and absorbing states.
5. **Stationarity.** Define `pi=pi P`. A finite irreducible chain has a unique stationary law. Aperiodicity is required for ordinary convergence to stationarity, not for uniqueness or the mean-return identity.
6. **Hitting probabilities.** For target-before-failure questions, use boundary values on terminal states and harmonic equations on nonterminal states.
7. **Expected hitting times.** Use `t_i=1+sum_j P_ij t_j` off the target and zero on the target. State that finiteness and uniqueness require the relevant target to be reached under the modeled conditions.
8. **Mean positive return.** For a finite irreducible chain, `E_i[T_i^+]=1/pi_i`, where `T_i^+` starts at time one.
9. **Edge cases.** Multiple closed classes can produce nonunique stationary laws; a hitting expectation can be infinite when the target need not be reached.
10. **Scope boundary.** Do not develop martingales, Brownian motion, Itô calculus, or continuous-time chains.
11. **Interview Checks.** Include visible prompts on matrix orientation, stationary versus limiting laws, periodicity, boundary equations, and positive return. These checks make the Green `5.1` knowledge-only row terminal.

### 6.2 `markov-chain-state-compression`

This is reusable technique Knowledge, not a synonym for general dynamic programming. It must cover:

1. A valid compressed state preserves all information needed for both the next-state law and the target event.
2. Streak problems retain the relevant trailing streak, such as whether the preceding roll was a seven.
3. Pattern problems retain the longest current suffix that is also a prefix of a target pattern.
4. A mismatch falls back to the longest still-viable suffix, not automatically to the empty state.
5. Symmetry can aggregate microstates, as Hamming distance does on the cube.
6. The formal aggregation check is strong lumpability: for any two microstates in one block, their total transition probability into every aggregate block is equal.
7. Terminal success/failure status must also be preserved by the aggregation.
8. In recoloring, the forward number of colors is not generally a sufficient Markov state because transition probabilities depend on color-class sizes. Backward active-lineage count is the valid one-dimensional compression.
9. Include Interview Checks that distinguish valid and invalid compression and exercise suffix fallback, symmetry, and target preservation.

## 7. Problem solution contracts

### 7.1 `twelve-before-consecutive-sevens`

Public experiment: independently roll two fair six-sided dice until either a total of 12 occurs or totals of 7 occur on two consecutive rolls.

Let `x` be the probability of eventual success when there is no trailing seven, and `y` the probability after one trailing seven. Since a total of 12 has probability `1/36`, a total of 7 has probability `1/6`, and every other total has probability `29/36`, the solution must derive

```text
x = 1/36 + (29/36)x + (1/6)y
y = 1/36 + (29/36)x.
```

Solving gives

```text
x = 7/13.
```

The initial state is `x`. Any non-seven, non-twelve result resets the seven streak. The solution must reject the shortcut of treating `1/36` and `(1/6)^2` as single-step competing hazards and should note that the stopping event occurs almost surely.

### 7.2 `coin-pattern-hitting-times`

One multipart canonical Problem owns all four audited results for iid fair coin flips.

#### Waiting time for `HHH`

Use states `""`, `H`, and `HH`, representing the longest suffix matching a prefix of `HHH`. The first-step system must yield

```text
E[waiting time for HHH] = 14.
```

The derivation must retain the self-overlap after heads and reset correctly after a tail.

#### Waiting time for `THH`

Use states `""`, `T`, and `TH`. A tail from state `T` stays in state `T`; it does not reset to the empty state. The system must yield

```text
E[waiting time for THH] = 8.
```

#### Race between `HHH` and `THH`

The solution must show

```text
P(HHH appears before THH) = 1/8.
```

A concise valid argument is that `HHH` wins exactly when the first three flips are all heads; once a tail has occurred, the first subsequent pair of consecutive heads completes `THH` before a third consecutive head could complete `HHH`.

#### Second-chooser guarantee

If the first chooser selects the length-three word `abc`, the second chooser selects `complement(b)ab`. The public solution must include the exact response table:

| First pattern | Response | Response win probability |
|---|---|---:|
| `HHH` | `THH` | `7/8` |
| `HHT` | `THH` | `3/4` |
| `HTH` | `HHT` | `2/3` |
| `HTT` | `HHT` | `2/3` |
| `THH` | `TTH` | `2/3` |
| `THT` | `TTH` | `2/3` |
| `TTH` | `HTT` | `3/4` |
| `TTT` | `HTT` | `7/8` |

Therefore the second chooser can always achieve at least `2/3`. The page must distinguish first-hitting questions from fixed-horizon pattern counts and must not treat overlapping candidate windows as independent.

### 7.3 `random-recoloring-consensus-time`

Freeze the public protocol precisely:

- `n` labeled balls begin with `n` distinct colors;
- each discrete step chooses uniformly one of the `n(n-1)` ordered pairs of distinct balls;
- the first ball adopts the second ball's color;
- every update counts, including an update between same-colored balls that leaves the visible configuration unchanged.

Trace current colors backward to their initial ancestral balls. With `k` active lineages, a coalescence occurs when the chosen recipient position and donor position both carry distinct active lineages. Its probability is

```text
k(k-1) / (n(n-1)).
```

The expected waiting time to go from `k` to `k-1` lineages is therefore

```text
n(n-1) / (k(k-1)).
```

The telescoping sum must give

```text
E[T] = sum_(k=2)^n n(n-1)/(k(k-1)) = (n-1)^2.
```

Handle `n=1` separately as zero steps. Explain why forward color count is insufficient, why distinct initial colors are needed for the ancestry equivalence, and why sampling ordered pairs with replacement would instead produce expectation `n(n-1)`.

### 7.4 `random-walk-return-time-on-cube`

Define simple random walk on the eight cube vertices: at every step choose one of the current vertex's three neighbors uniformly. Define the target as the first positive return

```text
T_v^+ = min{t >= 1 : X_t = v},
```

not the ordinary hitting time, which is zero at the starting vertex.

The page must give two methods.

#### Stationary-law method

The cube graph is connected and 3-regular, so its stationary law is uniform on eight vertices. The finite irreducible mean-return identity gives

```text
E_v[T_v^+] = 1/pi_v = 8.
```

The cube is bipartite and periodic, but periodicity does not invalidate this expected-return identity.

#### Hamming-distance method

Let `E_d` be the expected time to hit the starting vertex from Hamming distance `d`. Derive

```text
E_1 = 1 + (2/3)E_2
E_2 = 1 + (2/3)E_1 + (1/3)E_3
E_3 = 1 + E_2.
```

These equations give `E_1=7`. The initial walk takes one step to distance one, so

```text
E_v[T_v^+] = 1 + E_1 = 8.
```

### 7.5 Existing `random-walk-boundary`

This is a coordinator-only enrichment of the existing canonical Problem. Retain its slug and Problem ID while upgrading it to a general absorbing-boundary treatment.

For states `0,...,N`, initial state `i`, upward probability `p`, and `q=1-p`, derive the probability `u_i` of reaching `N` before `0`:

```text
u_i = i/N                                      when p=q=1/2
u_i = [1-(q/p)^i] / [1-(q/p)^N]              when 0<p<1 and p!=q.
```

Also state the deterministic `p=0` and `p=1` cases and evaluate:

- `N=4`, `i=2`, `p=1/2`: upper boundary first with probability `1/2`;
- `N=3`, `i=1`, `p=2/3`: upper boundary first with probability `4/7`;
- `N=1000`, `i=80`, `p=1/2`: zero first with probability `1-80/1000=92/100=23/25`.

Use first-step difference equations. Do not use optional stopping in this workstream. The fair plank wrapper is absorbed by the general fair formula rather than preserved as a separate public identity.

## 8. Public graph design

### 8.1 New Knowledge relationships

- `finite-state-markov-chains.related`: `[conditioning, conditional-expectation-tower-property, first-step-analysis, markov-chain-state-compression]`;
- `markov-chain-state-compression.related`: `[finite-state-markov-chains, first-step-analysis, recursion-problem-solving]`.

Each new Problem points to `finite-state-markov-chains` through `concepts` and to `markov-chain-state-compression` and `first-step-analysis` through `techniques`.

### 8.2 Problem relationships

- `twelve-before-consecutive-sevens` relates to `coin-pattern-hitting-times` and `recursive-dice-game-expected-payoff`;
- `coin-pattern-hitting-times` relates to `twelve-before-consecutive-sevens`, `expected-pattern-count-by-indicators`, and `no-consecutive-heads-in-n-tosses`;
- `random-walk-return-time-on-cube` relates to `random-walk-boundary`;
- `random-recoloring-consensus-time` needs no artificial Problem relation beyond its Knowledge/Technique graph.

### 8.3 Coordinator-only reciprocal edits

The coordinator proposes and applies all edits to pages that existed at the candidate base:

- add both new Knowledge slugs to `first-step-analysis.related`;
- add `finite-state-markov-chains` to `random-walk-boundary.concepts`;
- link `random-walk-boundary` reciprocally to `random-walk-return-time-on-cube`;
- add the directly corresponding reciprocal Problem links to `recursive-dice-game-expected-payoff`, `expected-pattern-count-by-indicators`, and `no-consecutive-heads-in-n-tosses`.

These edits must retain each pre-existing page's canonical topic ownership.

## 9. Exact hidden coverage decisions

Every row uses `canonicalTopics: [random-walks-markov-chains]` and a nonempty resolution note.

| Source key | State | Canonical Problems | Canonical Knowledge |
|---|---|---|---|
| Green `5.1::` | `knowledge-only` | `[]` | `[finite-state-markov-chains]` |
| Green `5.1.gamblers-ruin::` | `canonical-problem` | `[random-walk-boundary]` | `[finite-state-markov-chains, first-step-analysis]` |
| Green `5.1.dice-question::` | `canonical-problem` | `[twelve-before-consecutive-sevens]` | `[finite-state-markov-chains, markov-chain-state-compression, first-step-analysis]` |
| Green `5.1.coin-triplets::` | `canonical-problem` | `[coin-pattern-hitting-times]` | `[finite-state-markov-chains, markov-chain-state-compression, first-step-analysis]` |
| Green `5.1.color-balls::` | `canonical-problem` | `[random-recoloring-consensus-time]` | `[finite-state-markov-chains, markov-chain-state-compression, first-step-analysis]` |
| Red `3.2.1::3.22` | `canonical-problem` | `[random-walk-return-time-on-cube]` | `[finite-state-markov-chains, markov-chain-state-compression, first-step-analysis]` |
| Red `3.2.1::3.23` | `merged-duplicate` | `[random-walk-boundary]` | `[finite-state-markov-chains, first-step-analysis]` |
| Red `3.2.2::3.40` | `merged-duplicate` | `[random-walk-boundary]` | `[finite-state-markov-chains, first-step-analysis]` |

Exact state distribution:

- 5 `canonical-problem`;
- 2 `merged-duplicate`;
- 1 `knowledge-only`.

Green gambler's ruin is the row that establishes canonical source ownership for the already-existing `random-walk-boundary` identity. The two Red boundary rows are merged duplicates of that identity.

## 10. Source-topic routing decision

No `source-topic-map.json` delta is required.

- Green `5.1` and all four child sections are already mapped exactly to `random-walks-markov-chains`.
- Red `3.2.2` is mapped to the stochastic-process parent, so item `3.40` may refine naturally to the Random Walks child.
- Red `3.2.1` is editorially mapped to `probability-statistics`, outside the Random Walks ancestry. Coverage rows `3.22` and `3.23` therefore each require a nonempty `topicOverrideReason` explaining their item-level stochastic-process identity.
- The map schema is section-level. Do not invent item-level map entries.
- The 150 review produces no routing or coverage row.

## 11. File ownership

### 11.1 Candidate create-only files

The candidate owns creation of exactly these seven files:

```text
src/content/knowledge/concepts/finite-state-markov-chains.md
src/content/knowledge/concepts/markov-chain-state-compression.md
src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md
src/content/problems/stochastic-processes/coin-pattern-hitting-times.md
src/content/problems/stochastic-processes/random-recoloring-consensus-time.md
src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

The normative `creationOrigin: candidate-created` rule means the candidate does not edit any file that existed at the frozen base, even when that file is clearly in the same mathematical topic.

### 11.2 Coordinator-only proposed deltas

The coordinator alone owns:

- substantive enrichment of `src/content/problems/stochastic-processes/random-walk-boundary.md`;
- every reciprocal link edit to base-existing Knowledge and Problems;
- `src/data/quant-interview/coverage/green-book.json`;
- `src/data/quant-interview/coverage/red-book.json`;
- confirmation that `src/data/quant-interview/coverage/150-most-frequently-asked.json` receives no 011 row;
- `src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json`;
- `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`;
- `tests/quant-interview-source-neutral-content.test.mjs`;
- HANDOFF, HANDOFF tests, prior completion tests, the new 011 completion test, and dynamic parallel-governance assertions;
- any CI workflow/scaffolding and its removal;
- integration, real CI evidence, completion metadata, and durable history.

The taxonomy and source-topic map require no changes.

## 12. Workstream manifest contract

At coordinated integration, create

```text
src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json
```

with:

- `canonicalTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]`;
- Green `sourceSections: ["5.1"]`, evidence range `121–131`, bounded item-level review;
- Red `sourceSections: ["3.2.1", "3.2.2"]`, evidence ranges `94–96`, `115–117`, and `139–139`, bounded item-level review;
- 150 `sourceSections: ["2.6"]`, `evidencePageRanges: [{"startPage": 41, "endPage": 43}, {"startPage": 145, "endPage": 174}]`, `reviewOutcome: reviewed-no-new-ownership`;
- the 150 review note states that items 10–29 were audited and found to contain only martingale, Brownian, Itô, SDE, change-of-measure, and stochastic-volatility material outside 011, while terminal items 1–9 remain unchanged, no new 150 coverage rows are added, and aggregate `2.6::` stays `pending` as a broad container;
- Green and Red review notes identify only the audited rows and preserve all exclusions;
- `status: active` until the coordinator has integrated and verified the exact commit.

Do not record a commit, run ID, or success conclusion until those values come from real verification. The coordinator changes status to `complete` only after real CI evidence exists for the integrated workstream and final closure verification passes.

## 13. Verification contracts

### 13.1 Candidate module-content test

`tests/quant-interview-random-walks-markov-chains-content.test.mjs` must assert:

- the exact six new content paths and four Problem IDs;
- exact canonical topic arrays;
- exact Knowledge/Technique frontmatter relationships;
- S3+ Problem structure, progressive hints, mistakes, and extensions;
- every mathematical equation and result frozen in Sections 6 and 7;
- the irreducibility/aperiodicity distinction;
- positive return rather than time-zero hitting on the cube;
- suffix fallback and the lumpability criterion;
- recoloring's ordered-distinct-pair and distinct-initial-color assumptions;
- absence of source names, source item identifiers, and source/page provenance in all six public pages.

### 13.2 Coordinator workstream test

`tests/quant-interview-random-walks-markov-chains-workstream.test.mjs` must assert:

- exact manifest ID, topics, sources, sections, evidence ranges, and 150 no-ownership outcome;
- exact eight terminal keys and exact target arrays;
- the `5/2/1` state distribution;
- nonempty override reasons on Red `3.22` and `3.23`;
- no new 150 Random Walks coverage row;
- coverage targets resolve to real public slugs;
- the coverage and workstream validators accept the reconciled state;
- `random-walk-boundary` retains its slug/ID and contains the general formula and all three numeric cases;
- reciprocal base-existing graph links retain their earlier topic ownership.

### 13.3 Exact global regression

The coordinator updates `tests/quant-interview-source-neutral-content.test.mjs` by:

- adding the four exact Problem slugs to the enumerated Problem set;
- adding both exact Knowledge slugs with topics `[stochastic-processes-stochastic-calculus, random-walks-markov-chains]`;
- changing exact totals from `59/39` to `63/41`;
- retaining exact set equality and source-neutrality checks.

### 13.4 Candidate versus coordinator gates

Authoritative local Node evidence must come from one of these qualified environments:

- a native Linux checkout; or
- a checkout/worktree stored on a WSL-native filesystem, such as under `/home`, whose tracked text is LF-normalized.

A WSL process reading the supplied Windows checkout through `/mnt/c` does not qualify: it sees the same CRLF working-tree bytes produced by `core.autocrlf=true`. Both native Windows Node and WSL-over-`/mnt/c` exhibit pre-existing recursive-path-separator and CRLF-sensitive governance failures. Those results are diagnostic only and must not be classified as 011 regressions or accepted as authoritative local verification.

The qualified LF-normalized checkout must first establish a green frozen-base baseline for `npm run test`, `npm run check`, and `npm run build`. If candidate additions are already present when verification begins, the documented alternative is a full-suite run in the qualified checkout whose only failure is the known stale `59/39` exact count/slug enumeration; any other failure means the baseline or module is not verified.

Workstream 011 does not require a product `.gitattributes` change. Repository-wide line-ending and path-separator portability remediation remains outside this module's scope.

GitHub CI remains Ubuntu with Node 24 and is the authoritative external verification environment.

In the qualified LF-normalized checkout, the candidate must pass:

```text
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
```

The candidate's six new classified pages intentionally make the coordinator-owned exact `59/39` regression stale. The candidate full suite may therefore have only that expected exact-count/slug mismatch before coordinator reconciliation. Any other failure is a module regression and blocks handoff. The candidate must not weaken or edit the exact global regression merely to obtain a green full-suite result.

After reconciling the exact regression to `63/41`, the coordinator must pass the entire suite in the qualified LF-normalized checkout:

```text
npm run test
npm run check
npm run build
```

The coordinator then requires a successful Ubuntu/Node 24 GitHub CI run for the exact integrated commit before completion.

## 14. Integration and closure

The coordinator integrates 011 first on the latest durable base, before 012 or 013.

Coordinator closure includes:

1. review the candidate's topic-only diff and module-specific test evidence;
2. port/reconcile candidate-created files without overwriting newer durable state;
3. apply the existing boundary enrichment and reciprocal graph changes;
4. apply the exact eight coverage decisions and confirm no 150 row;
5. create the active workstream manifest;
6. update the exact global slug/count regression to `63/41`;
7. update dynamic governance tests so 011 is no longer treated as a premature manifest while 012 and 013 remain protected;
8. revise the 010 completion test so it preserves historical evidence without asserting that 011 remains the current next action;
9. add the 011 completion test and update HANDOFF/HANDOFF tests consistently;
10. run all local gates in a qualified LF-normalized native-Linux or WSL-native-filesystem checkout on the integrated tree;
11. obtain a real successful Ubuntu/Node 24 GitHub CI run for the exact integrated commit;
12. record the real 40-character commit, positive run ID, exact commands, and success conclusion;
13. remove temporary CI scaffolding, if any, and rerun closure verification on the final clean tree;
14. mark 011 complete, record the eight-row `5/2/1` closure and `63/41` checkpoint, and advance the authoritative current topic and integration queue to 012, then 013.

No candidate or divergent branch may claim this completion state.

## 15. Failure and ambiguity rules

### Source or protocol mismatch

- If source identity does not match the edition-pinned evidence, do not freeze derived content or coverage.
- If the dice rolls are not independent fair two-die rolls, the `7/13` contract does not apply.
- If coin flips are biased or the race protocol differs, the `14`, `8`, `1/8`, and second-chooser table must not be reused unchanged.
- If cube transitions include self-loops or unequal edge weights, the return-time result requires a new derivation.
- If recoloring samples pairs with replacement or initial colors are not all distinct, the `(n-1)^2` contract does not apply.

### Mathematical ambiguity

- `First return` means time `t>=1`; time-zero hitting is a different quantity.
- Random-walk `hit zero first` is the complement of upper-boundary success only under the stated two-boundary stopping model.
- The biased boundary formula handles `0<p<1`; deterministic endpoints are stated separately.
- Pattern mismatches retain the longest viable suffix.
- State compression is valid only when transition and target behavior are preserved.

### Semantic collision

If implementation review finds an existing canonical page with the same mathematical objects, target, constraints, structure, and solution family as a proposed new Problem, stop and use `needs-review`. Do not create a duplicate to preserve the projected page count. The `+4/+2` delta is evidence-backed, not a quota that overrides semantic identity.

### Verification or integration failure

- Keep 011 active.
- Do not record success metadata or advance HANDOFF.
- Do not invent a 150 coverage row to make the scope look symmetrical.
- Do not replace current shared files with candidate-base copies.
- Resolve post-integration defects through corrective commits; never rewrite durable history.

## 16. Acceptance criteria

The written design is ready for implementation planning when review confirms all of the following:

- exactly one bounded canonical topic is owned;
- the eight audited terminal rows have one unambiguous decision each;
- the terminal split is exactly `5 canonical-problem / 2 merged-duplicate / 1 knowledge-only`;
- the 150 review creates no new ownership;
- the six new slugs and all mathematical contracts are frozen;
- `random-walk-boundary` remains one existing identity and is coordinator-only to enrich;
- candidate create-only and coordinator shared-state responsibilities are disjoint;
- no taxonomy or source-topic-map delta is proposed;
- Red `3.22` and `3.23` have item-level override reasons;
- the candidate verification split does not weaken the exact global regression;
- the integrated count is exactly `63/41`;
- completion remains contingent on serialized integration, full local gates, real CI evidence, and factual HANDOFF closure;
- no public content exposes source provenance or reproduces source wording.
