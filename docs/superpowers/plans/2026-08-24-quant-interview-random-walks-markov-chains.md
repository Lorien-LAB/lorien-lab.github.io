# Quant Interview Random Walks & Markov Chains Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bounded `Stochastic Processes & Stochastic Calculus -> Random Walks & Markov Chains` workstream with two reusable Knowledge nodes, four source-neutral S3+ Problems, one enriched boundary-walk Problem, and exactly eight terminal source rows.

**Architecture:** Phase A is an isolated, create-only candidate that owns exactly six new public pages and one module-content test, remains non-authoritative, and reports proposed shared deltas without applying them. Phase B is a single coordinator integration on the latest durable post-010 base: it ports the candidate files, reconciles the existing boundary identity and reciprocal graph, applies hidden ownership and the exact `63/41` regression, obtains real Ubuntu/Node 24 evidence, removes temporary CI, and only then records factual post-011 closure.

**Tech Stack:** Astro 5 content collections, Markdown/YAML frontmatter, JSON coverage/workstream data, JavaScript ES modules, Node.js built-in test runner, npm, TypeScript/Astro checks, GitHub Actions on Ubuntu with Node 24.

**Spec:** `docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md`

## Global Constraints

- Approved written-design commit: `0c6b227bb4b26f0ff4f15fac0475462d1ed17711`.
- Frozen candidate base: `f41880f220991f43d84ddb3795a59b8688e5230c`.
- Candidate branch: `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23`.
- Coordinator integration branch: `chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24`.
- Durable coordinator branch: `chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17`; Phase B starts from its then-current verified HEAD, which must contain post-010/governance state and descend from `f41880f220991f43d84ddb3795a59b8688e5230c`.
- Workstream id: `stochastic-processes-random-walks-markov-chains-011`.
- Canonical topics: `[stochastic-processes-stochastic-calculus, random-walks-markov-chains]` for the workstream and all six new public pages; hidden coverage rows use `[random-walks-markov-chains]`.
- Frozen new Knowledge slugs: `finite-state-markov-chains`, `markov-chain-state-compression`.
- Frozen new Problem slugs and ids: `twelve-before-consecutive-sevens` / `random-walks-markov-chains-001`, `coin-pattern-hitting-times` / `random-walks-markov-chains-002`, `random-recoloring-consensus-time` / `random-walks-markov-chains-003`, `random-walk-return-time-on-cube` / `random-walks-markov-chains-004`.
- Every new Problem uses `category: Stochastic Processes`, `concepts: [finite-state-markov-chains]`, `techniques: [markov-chain-state-compression, first-step-analysis]`, and `status: solved`.
- Every new Problem is S3+: `## Problem`, `## Think Before Revealing`, at least two progressive `<details>` hints, `## Solution`, `## Why This Matters`, `## Common Mistakes`, and `## Extensions`.
- Candidate Phase A creates exactly seven files and modifies no file that existed at the frozen base. It does not edit coverage, source routing, workstream data, exact global regressions, HANDOFF, completion/governance tests, CI, or base-existing reciprocal links.
- The candidate remains `active` and non-authoritative after module-local verification. Its report proposes shared deltas; only the coordinator applies them.
- Coordinator Phase B alone enriches `random-walk-boundary`, edits reciprocal links on base-existing pages, mutates shared coverage and tests, creates/seals the manifest, obtains real CI evidence, advances HANDOFF, and integrates durable history.
- Integration order is serialized `011 -> 012 -> 013`. The coordinator integrates 011 on the latest durable post-010 state and produces the durable post-011 state before any 012 or 013 shared-state reconciliation.
- Exactly eight new terminal source rows are owned: five Green and three Red, with an exact state split of `5 canonical-problem / 2 merged-duplicate / 1 knowledge-only`.
- The 150-question scope is manifest-only `reviewed-no-new-ownership`: items 10-29 are recorded as reviewed, terminal items 1-9 remain unchanged, no new 150 coverage row is added, and aggregate `2.6::` stays `pending`.
- No taxonomy or `src/data/quant-interview/topics/source-topic-map.json` change is allowed. Red items `3.22` and `3.23` require nonempty item-level `topicOverrideReason`; Red `3.40` does not.
- `random-walk-boundary` retains slug `random-walk-boundary`, id `lorien-stochastic-001`, and its existing canonical topics. It is enriched in place; no plank or gambler's-ruin duplicate page is created.
- Public Knowledge and Problems are independently written and source-neutral: no source names, source item/section ids, PDF/page provenance, source ordering, or copied source answer wording.
- Expected integrated corpus is exact set equality at `63 Problems / 41 explicitly topic-classified Knowledge / Technique nodes`, derived from `59 + 4` and `39 + 2`, never a lower bound or quota that overrides semantic collision review.
- Martingales, optional stopping, Brownian motion, Itô calculus, SDEs, continuous-time chains, branching, reinforcement, general dynamic programming, and optimal stopping remain outside 011.
- If implementation review finds an existing Problem with the same objects, target, constraints, structure, and solution family as a proposed new page, keep the affected ownership `needs-review`, leave 011 active, and amend the approved design; never manufacture the `+4/+2` delta.
- The frozen numerical results apply only to their stated protocols: independent fair two-die rolls; iid fair coin flips and the stated first-hitting race; the simple cube walk with no self-loops and equal neighbor weights; ordered distinct recoloring pairs from all-distinct initial colors. A protocol mismatch blocks reuse of `7/13`, `14`, `8`, `1/8`, `8`, or `(n-1)^2`.
- Authoritative local evidence must come from a native Linux checkout or a checkout/worktree on a WSL-native filesystem such as `/home`, with tracked text LF-normalized. Native Windows and WSL-over-`/mnt/c` results are diagnostic only.
- The qualified checkout first proves the frozen/latest durable baseline green. If candidate files are already present, the only permitted pre-reconciliation full-suite failure is the stale exact `59/39` slug/count regression; any other failure blocks handoff.
- Candidate qualified gates: `node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs`, `npm run check`, `npm run build`; the full suite may have only the documented stale exact-registry failure.
- Coordinator qualified gates after `63/41` reconciliation and again on the final clean tree: `npm run test`, `npm run check`, `npm run build`.
- Completion requires a real successful GitHub Actions run on Ubuntu with Node 24 for the exact integrated verification commit. A 40-character commit, positive run id, exact commands, and `success` conclusion are copied from evidence, never predicted.
- Temporary CI is coordinator-owned and must be absent from the final durable tree. No success claim is made until fresh final gates pass after its removal.
- Any source-identity, integration, local-verification, or CI failure leaves manifest status `active`, records no success metadata, and does not advance HANDOFF.
- Never modify `main`, force-push, rebase shared/durable history, reset a durable branch, replace newer shared files with candidate-base copies, or use whole-file conflict resolution against a newer durable base.

---

## Phase and File Ownership Map

### Phase A — isolated candidate create-only ownership

```text
src/content/knowledge/concepts/finite-state-markov-chains.md
src/content/knowledge/concepts/markov-chain-state-compression.md
src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md
src/content/problems/stochastic-processes/coin-pattern-hitting-times.md
src/content/problems/stochastic-processes/random-recoloring-consensus-time.md
src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

### Phase B — serialized coordinator ownership

```text
# Approved authorities ported unchanged to the durable integration branch
docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md
docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md

# Existing public graph/content
src/content/knowledge/concepts/first-step-analysis.md
src/content/problems/stochastic-processes/random-walk-boundary.md
src/content/problems/probability/recursive-dice-game-expected-payoff.md
src/content/problems/probability/expected-pattern-count-by-indicators.md
src/content/problems/probability/no-consecutive-heads-in-n-tosses.md

# Shared hidden state
src/data/quant-interview/coverage/green-book.json
src/data/quant-interview/coverage/red-book.json
src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json

# Shared tests and repository memory
tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
tests/quant-interview-random-walks-markov-chains-completion.test.mjs
tests/quant-interview-source-neutral-content.test.mjs
tests/quant-interview-parallel-workstream-governance.test.mjs
tests/quant-interview-order-statistics-extremes-completion.test.mjs
tests/quant-interview-handoff.test.mjs
docs/quant-interview/HANDOFF.md

# Temporary coordinator verification only; deleted before closure
.github/workflows/quant-interview-random-walks-markov-chains-ci.yml
```

`src/data/quant-interview/coverage/150-most-frequently-asked.json`, `src/data/quant-interview/topics/source-topic-map.json`, taxonomy, manifests for 012/013, and every unrelated page remain byte-for-byte untouched.

---

## Qualified Checkout Gate Used by Both Phases

Every authoritative baseline, candidate, coordinator, verification, and final gate below is a fresh invocation of this complete function in the same shell block as its call. Nothing is inherited from a prior step. The only repository source is the actual shared Git repository; the temporary checkout and npm cache remain on the WSL-native filesystem. The cleanup trap rejects every target except the exact `mktemp` child it created under `/home/$USER`.

```bash
run_qi011_qualified_gate() (
  set -euo pipefail
  requested_ref="$1"
  expected_sha="$2"
  gate_script="$3"
  repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
  user_name="$(id -un)"
  native_parent="/home/$user_name"

  test -n "${WSL_DISTRO_NAME:-}"
  test "$requested_ref" != ''
  [[ "$expected_sha" =~ ^[0-9a-f]{40}$ ]]
  test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
  test "$(git -C "$repo_source" rev-parse --show-toplevel)" = "$repo_source"
  test -d "$native_parent"

  verify_root="$(mktemp -d "$native_parent/quant-interview-011.XXXXXX")"
  verify_root="$(realpath "$verify_root")"
  cleanup_qi011_gate() {
    local resolved
    resolved="$(realpath -m "$verify_root")"
    case "$resolved" in
      "$native_parent"/quant-interview-011.*) ;;
      *) echo "refusing unsafe cleanup target: $resolved" >&2; return 1 ;;
    esac
    test "$resolved" != "$native_parent"
    if test -d "$resolved"; then rm -rf -- "$resolved"; fi
  }
  trap cleanup_qi011_gate EXIT
  case "$verify_root" in
    "$native_parent"/quant-interview-011.*) ;;
    *) echo "temporary checkout is not WSL-native: $verify_root" >&2; exit 1 ;;
  esac

  checkout="$verify_root/repo"
  npm_cache="$verify_root/npm-cache"
  git -c core.autocrlf=false clone --no-hardlinks "$repo_source" "$checkout"
  git -C "$checkout" config core.autocrlf false
  git -C "$checkout" config core.eol lf
  test "$(git -C "$checkout" rev-parse "$requested_ref^{commit}")" = "$expected_sha"
  git -C "$checkout" checkout --detach "$requested_ref"
  test "$(git -C "$checkout" rev-parse HEAD)" = "$expected_sha"
  test "$(git -C "$checkout" rev-parse --show-toplevel)" = "$checkout"

  (
    cd "$checkout"
    node --input-type=module <<'NODE'
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const files = execFileSync('git', ['ls-files', '-z']).toString('utf8').split('\0').filter(Boolean);
const textExtensions = /\.(?:astro|css|html|js|json|jsx|md|mjs|ts|tsx|txt|yaml|yml)$/i;
const bad = files.filter((file) => textExtensions.test(file) && readFileSync(file).includes(13));
if (bad.length) throw new Error(`tracked text contains CR bytes:\n${bad.join('\n')}`);
NODE
    NPM_CONFIG_CACHE="$npm_cache" bash -c "$gate_script"
  )
)
```

Each call below first reacquires its expected SHA from `repo_source`, validates it as 40 lowercase hexadecimal characters, passes the exact requested ref and SHA to the function, and lets the trap remove only the validated temporary directory. Expected: exit 0, exact detached HEAD equality, no CR bytes in tracked text, and no surviving `/home/$USER/quant-interview-011.*` directory from that call. A native-Windows checkout or a WSL checkout on `/mnt/c` is diagnostic only.

---

## Phase A — Isolated Candidate

### Task 1: Create the Two Markov-Chain Knowledge Nodes

**Files:**
- Create: `tests/quant-interview-random-walks-markov-chains-content.test.mjs`
- Create: `src/content/knowledge/concepts/finite-state-markov-chains.md`
- Create: `src/content/knowledge/concepts/markov-chain-state-compression.md`

**Interfaces:**
- Consumes: the approved design at commit `0c6b227bb4b26f0ff4f15fac0475462d1ed17711`, existing Knowledge schema, `conditioning`, `conditional-expectation-tower-property`, `first-step-analysis`, and `recursion-problem-solving` slugs.
- Produces: concept slug `finite-state-markov-chains`, technique slug `markov-chain-state-compression`, and reusable content-test helpers `read`, `parseInlineArray`, `assertExactLineArray`, and `assertSourceNeutral` used by Tasks 2-3.

- [ ] **Step 1: Prove the qualified frozen candidate baseline is green before public-content changes**

Commit this plan first. In one fresh WSL shell, load the complete function above from the committed plan, reacquire the candidate's plan-only commit, and invoke the gate at that exact SHA:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
baseline_sha="$(git -C "$repo_source" rev-list -1 "refs/heads/$candidate_ref" -- "$plan_path")"
[[ "$baseline_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git -C "$repo_source" rev-parse "$baseline_sha^{commit}")" = "$baseline_sha"
gate_definition="$(git -C "$repo_source" show "$baseline_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "$baseline_sha" "$baseline_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build'
```

Expected: all three repository gates exit 0 at the plan-only candidate HEAD. Record the exact baseline SHA and command exits in the candidate report; do not accept Windows or `/mnt/c` output as the baseline.

- [ ] **Step 2: Write the failing Knowledge contract**

Create `tests/quant-interview-random-walks-markov-chains-content.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (file) => readFile(file, 'utf8');
const topics = ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains'];
const sourceLeak = /Green Book|Red Book|150 (?:Most|Questions)|(?:source|PDF)\s+(?:page|section|item)|\b(?:5\.1(?:\.[a-z-]+)?|3\.2\.[12]|3\.(?:22|23|40))\b/i;

function parseInlineArray(text, field) {
  const match = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'));
  assert.ok(match, `missing inline ${field}`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function assertExactLineArray(text, field, expected) {
  assert.deepEqual(parseInlineArray(text, field), expected, `${field} is not exact`);
}

function assertSourceNeutral(text, slug) {
  assert.doesNotMatch(text, sourceLeak, `${slug} exposes audited-source identity`);
  assert.doesNotMatch(text, /^source(?:Section|Item|Page|Reference|Url)?:/mi, `${slug} exposes provenance frontmatter`);
}

function assertNoUnprotectedTeX(text, slug) {
  const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  assert.ok(frontmatter, `${slug} missing frontmatter boundary`);
  const body = text.slice(frontmatter[0].length);
  const protectedMath = [
    ...[...body.matchAll(/\\\[([\s\S]*?)\\\]/g)].map((match) => match[1]),
    ...[...body.matchAll(/\$((?:\\.|[^$\\])*)\$/g)].map((match) => match[1]),
  ];
  const prose = body
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\$(?:\\.|[^$\\])*\$/g, '');
  assert.doesNotMatch(prose, /\\[A-Za-z]+/, `${slug} contains raw TeX command outside math delimiters`);
  assert.doesNotMatch(
    prose,
    /[\p{L}\p{N})\]}](?:_(?:\{[^}\n]+\}|[\p{L}\p{N}])|\^(?:\{[^}\n]+\}|[+\-\p{L}\p{N}]))/u,
    `${slug} contains raw TeX subscript or superscript outside math delimiters`,
  );
  for (const math of protectedMath) {
    assert.doesNotMatch(math, /\\[A-Za-z]+/, `${slug} contains a TeX command that the Markdown renderer would leak`);
    assert.doesNotMatch(math, /(?<!\\)_/, `${slug} contains an unescaped subscript that Markdown could parse as emphasis`);
  }
}

test('finite-state Markov chains Knowledge freezes the finite-chain theory contract', async () => {
  const text = await read('src/content/knowledge/concepts/finite-state-markov-chains.md');
  assert.match(text, /^title: Finite-State Markov Chains$/m);
  assert.match(text, /^category: Probability$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'related', [
    'conditioning',
    'conditional-expectation-tower-property',
    'first-step-analysis',
    'markov-chain-state-compression',
  ]);
  assert.match(text, /Markov property/i);
  assert.match(text, /homogeneous/i);
  assert.match(text, /row-vector convention/i);
  assert.match(text, /P(?:\\)?_?\{?ij\}?.*(?:>=|≥|\\ge).*0/i);
  assert.match(text, /each row.*(?:one|1)/i);
  assert.match(text, /(?:μ|mu)(?:\\)?_?\{?t\+1\}?.*(?:μ|mu)(?:\\)?_?\{?t\}?.*P/i);
  assert.match(text, /(?:μ|mu)(?:\\)?_?\{?t\}?.*(?:μ|mu)(?:\\)?_?\{?0\}?.*P\^?\{?t\}?/i);
  assert.match(text, /Chapman.*Kolmogorov/i);
  assert.match(text, /P\^?\{?r\+s\}?.*P\^?\{?r\}?.*P\^?\{?s\}?/i);
  for (const term of ['reachability', 'communicate', 'closed class', 'absorbing state']) assert.match(text, new RegExp(term, 'i'));
  assert.match(text, /(?:π|pi).*=.*(?:π|pi).*P/i);
  assert.match(text, /finite irreducible chain.*unique stationary/i);
  assert.match(text, /aperiodicity.*convergence|convergence.*aperiodicity/i);
  assert.match(text, /not required.*uniqueness|uniqueness.*not require/i);
  assert.match(text, /h(?:\\)?_i.*(?:sum|∑).*P(?:\\)?_?\{?ij\}?.*h(?:\\)?_j/i);
  assert.match(text, /boundary values.*terminal states|terminal states.*boundary values/i);
  assert.match(text, /t(?:\\)?_i.*1.*(?:sum|∑).*P(?:\\)?_?\{?ij\}?.*t(?:\\)?_j/i);
  assert.match(text, /T(?:\\)?_i\^?\+.*(?:t.*(?:>=|≥).*1|starts? at time one)/i);
  assert.match(text, /E(?:\\)?_i.*T(?:\\)?_i\^?\+.*1.*(?:π|pi)(?:\\)?_i/i);
  assert.match(text, /multiple closed classes.*nonunique|nonunique.*multiple closed classes/i);
  assert.match(text, /hitting expectation.*infinite|infinite.*hitting expectation/i);
  assert.match(text, /^## Interview Checks$/m);
  for (const check of ['matrix orientation', 'stationary versus limiting', 'periodicity', 'boundary equations', 'positive return']) {
    assert.match(text, new RegExp(check, 'i'));
  }
  assert.match(text, /martingale/i);
  assert.match(text, /Brownian/i);
  assert.match(text, /It(?:ô|o)/i);
  assert.match(text, /continuous-time/i);
  assertSourceNeutral(text, 'finite-state-markov-chains');
  assertNoUnprotectedTeX(text, 'finite-state-markov-chains');
});

test('state-compression Knowledge preserves transitions and target behavior', async () => {
  const text = await read('src/content/knowledge/concepts/markov-chain-state-compression.md');
  assert.match(text, /^title: State Compression for Markov Chains$/m);
  assert.match(text, /^category: Problem Solving Techniques$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'related', [
    'finite-state-markov-chains',
    'first-step-analysis',
    'recursion-problem-solving',
  ]);
  assert.match(text, /next-state law/i);
  assert.match(text, /target event/i);
  assert.match(text, /trailing streak/i);
  assert.match(text, /longest current suffix.*prefix|longest suffix.*target prefix/i);
  assert.match(text, /mismatch.*longest.*viable suffix|fallback.*longest.*suffix/i);
  assert.match(text, /not.*empty state|rather than.*empty/i);
  assert.match(text, /Hamming distance/i);
  assert.match(text, /simple symmetric cube walk/i);
  assert.match(text, /no self-loops/i);
  assert.match(text, /neighboring vertices.*equal probability.*1\s*\/\s*d/is);
  assert.match(text, /strong lumpability/i);
  assert.match(text, /total transition probability.*every aggregate block/i);
  assert.match(text, /terminal.*success.*failure.*preserv|target status.*preserv/i);
  assert.match(text, /number of colors.*not.*sufficient|not.*sufficient.*number of colors/i);
  assert.match(text, /color-class sizes/i);
  assert.match(text, /backward active-lineage count/i);
  assert.match(text, /complete graph/i);
  assert.match(text, /all initial colors (?:are )?distinct/i);
  assert.match(text, /ordered pair.*distinct vertices.*(?:chosen|selected) uniformly/is);
  assert.match(text, /second vertex.*copies.*first vertex.*color/i);
  assert.match(text, /^## Interview Checks$/m);
  for (const check of ['valid compression', 'suffix fallback', 'symmetry', 'target preservation']) {
    assert.match(text, new RegExp(check, 'i'));
  }
  assertSourceNeutral(text, 'markov-chain-state-compression');
  assertNoUnprotectedTeX(text, 'markov-chain-state-compression');
});
```

- [ ] **Step 3: Run the Knowledge test and verify RED**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

Expected: FAIL in the first test with `ENOENT: no such file or directory, open 'src/content/knowledge/concepts/finite-state-markov-chains.md'`. No assertion is weakened to bypass the missing page.

- [ ] **Step 4: Write the minimal finite-chain Knowledge page**

Create `src/content/knowledge/concepts/finite-state-markov-chains.md` with this complete source-neutral file:

```markdown
---
title: Finite-State Markov Chains
description: Model finite stochastic systems with transition matrices, communicating classes, stationarity, and first-step equations for hitting and return questions.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-24
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
featured: false
related: [conditioning, conditional-expectation-tower-property, first-step-analysis, markov-chain-state-compression]
relatedNotes: []
---

## Markov property and transition law

For a finite state space $S$, the Markov property says that, conditional on the current state, the next-state law does not depend on the earlier path. A homogeneous chain uses the same transition law at every time.

Under the row-vector convention, $P\_{ij} ≥ 0$, each row of $P$ sums to one, $μ\_{t+1}=μ\_tP$, and $μ\_t=μ\_0P^t$. Matrix powers give multi-step transitions, and $P^{r+s}=P^rP^s$ is the Chapman–Kolmogorov relation.

## State structure

Reachability from state $i$ to state $j$ means $(P^t)\_{ij}>0$ for some integer $t≥0$. States $i$ and $j$ communicate when each is reachable from the other; mutual communication partitions the state space into communicating classes. A class is closed when no one-step transition leaves it. An absorbing state is a one-state closed class, equivalently a state with $P\_{ii}=1$. These distinctions identify which targets can be hit and which terminal behavior can persist.

## Stationarity and periodicity

A stationary law satisfies $π=π P$. A finite irreducible chain has a unique stationary law. Aperiodicity is needed for ordinary convergence to stationarity; it is not required for uniqueness or for the mean positive-return identity. Multiple closed classes can make stationary laws nonunique.

## First-step equations

For hitting a target before failure, first assign boundary value $1$ to target states and $0$ to failure states; these are the boundary values on all terminal states. On every nonterminal state, conditioning on the next step gives the harmonic equations

\[
h\_i=∑\_j P\_{ij}h\_j.
\]

For expected hitting time, set $t\_i=0$ on the target and solve

\[
t\_i=1+∑\_j P\_{ij}t\_j
\]

off the target. Finiteness and uniqueness require the modeled target to be reached under the relevant conditions; otherwise a hitting expectation can be infinite.

## Mean positive return

With $T\_i^+=min\{t≥1:X\_t=i\}$, a finite irreducible chain satisfies $E\_i[T\_i^+]=1/π\_i$. Positive return starts at time one and is not the time-zero hitting time.

## Interview Checks

- **Matrix orientation:** Under the row-vector convention, which side of $P$ multiplies the distribution?
- **Stationary versus limiting:** Why can $π=π P$ hold even when $μ\_t$ does not converge?
- **Periodicity:** Which claims need aperiodicity, and which only need finite irreducibility?
- **Boundary equations:** Which values are fixed before writing harmonic or hitting-time equations?
- **Positive return:** Why is $T\_i^+$ defined with $t≥1$?

## Scope boundary

This finite discrete-time toolkit does not develop martingales, Brownian motion, Itô calculus, or continuous-time chains.
```

- [ ] **Step 5: Write the minimal state-compression Knowledge page**

Create `src/content/knowledge/concepts/markov-chain-state-compression.md` with:

```markdown
---
title: State Compression for Markov Chains
description: Construct sufficient Markov states for streaks, patterns, symmetric walks, and coalescing systems while preserving transitions and terminal events.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-24
tags: [Probability, Stochastic Processes, Markov Chains, State Compression, Problem Solving]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
featured: false
related: [finite-state-markov-chains, first-step-analysis, recursion-problem-solving]
relatedNotes: []
---

## Sufficiency test

A compressed state is valid only when it preserves every fact needed for both the next-state law and the target event. Terminal success and failure status must be preserved as well as transition probabilities.

## Streak and pattern states

A streak problem retains the relevant trailing streak, such as whether the preceding roll was a seven. A pattern problem retains the longest current suffix that is also a prefix of a target pattern. On a mismatch, fall back to the longest still-viable suffix rather than automatically returning to the empty state.

## Symmetry and lumpability

Symmetry can aggregate microstates. For the simple symmetric cube walk on $\{0,1\}^d$, there are no self-loops: at each step one of the $d$ coordinates is chosen uniformly, so all $d$ neighboring vertices receive equal probability $1/d$. Hamming distance from a fixed reference vertex is sufficient because vertices at the same distance have the same transition totals between distance levels. The formal property is strong lumpability: a partition $(B\_1,…,B\_m)$ is strongly lumpable when, for every pair $x,x'∈B\_a$ and every block $B\_b$,

\[
∑\_{y∈B\_b}P(x,y)=∑\_{y∈B\_b}P(x',y).
\]

That equality makes the total transition probability into every aggregate block independent of the chosen representative. Terminal success and failure status are preserved by the aggregation as well.

## Recoloring example

Consider the following fixed protocol on a complete graph, starting with all initial colors distinct. At each step, an ordered pair $(u,v)$ of distinct vertices is chosen uniformly; the second vertex $v$ copies the first vertex $u$'s color. In this model, the forward number of colors is not a sufficient Markov state because transition probabilities depend on the color-class sizes. The backward active-lineage count is sufficient: only ancestry coalescences matter, giving a valid one-dimensional compression. This sufficiency claim depends on the stated complete-graph and uniform ordered-pair protocol; different update rules require a new lumpability check.

## Interview Checks

- **Valid compression:** Does the proposed state determine the next-state law?
- **Suffix fallback:** After a mismatch, what is the longest suffix that remains a target prefix?
- **Symmetry:** Do all microstates in one block send equal total probability to every other block?
- **Target preservation:** Can success and failure be distinguished after aggregation?
```

- [ ] **Step 6: Run the focused Knowledge cycle and verify GREEN**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
```

Expected: both Knowledge tests pass; Astro check reports zero errors; the production build exits 0.

- [ ] **Step 7: Commit the Knowledge gate**

```bash
git add -- tests/quant-interview-random-walks-markov-chains-content.test.mjs src/content/knowledge/concepts/finite-state-markov-chains.md src/content/knowledge/concepts/markov-chain-state-compression.md
git commit -m "feat: add finite Markov chain knowledge"
```

---

### Task 2: Create the Dice-Streak and Coin-Pattern Problems

**Files:**
- Modify: `tests/quant-interview-random-walks-markov-chains-content.test.mjs`
- Create: `src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md`
- Create: `src/content/problems/stochastic-processes/coin-pattern-hitting-times.md`

**Interfaces:**
- Consumes: `finite-state-markov-chains`, `markov-chain-state-compression`, `first-step-analysis`, plus the exact content-test helpers declared in Task 1.
- Produces: Problem ids `random-walks-markov-chains-001` and `random-walks-markov-chains-002`; reciprocal candidate-owned relation `twelve-before-consecutive-sevens <-> coin-pattern-hitting-times`; coordinator proposals for three base-existing reciprocal links.

- [ ] **Step 1: Append the failing S3 and mathematical contracts**

Append this code to `tests/quant-interview-random-walks-markov-chains-content.test.mjs`:

```js
function assertS3(text, id, relatedProblems) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, /^category: Stochastic Processes$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'concepts', ['finite-state-markov-chains']);
  assertExactLineArray(text, 'techniques', ['markov-chain-state-compression', 'first-step-analysis']);
  assertExactLineArray(text, 'relatedProblems', relatedProblems);
  assert.match(text, /^status: solved$/m);
  for (const heading of [
    '## Problem',
    '## Think Before Revealing',
    '## Solution',
    '## Why This Matters',
    '## Common Mistakes',
    '## Extensions',
  ]) assert.ok(text.includes(heading), `${id} missing ${heading}`);
  assert.ok((text.match(/<details>/g) ?? []).length >= 3, `${id} needs two hints and a solution disclosure`);
  assert.match(text, /<summary>Hint 1<\/summary>/);
  assert.match(text, /<summary>Hint 2<\/summary>/);
  const revealed = text.match(/<details>\s*<summary>Show Solution<\/summary>\s*([\s\S]*?)<\/details>/i);
  assert.ok(revealed, `${id} needs a Show Solution disclosure`);
  for (const heading of ['## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(revealed[1].includes(heading), `${id} must keep ${heading} inside Show Solution`);
  }
  const countWords = (value) => value.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  const between = (start, end) => {
    const from = text.indexOf(start);
    assert.notEqual(from, -1, `${id} missing ${start}`);
    const to = text.indexOf(end, from + start.length);
    assert.notEqual(to, -1, `${id} missing boundary ${end}`);
    return text.slice(from + start.length, to);
  };
  assert.ok(countWords(between('## Problem', '## Think Before Revealing')) >= 25, `${id} Problem is too shallow`);
  assert.ok(countWords(between('## Think Before Revealing', '<details>\n<summary>Show Solution')) >= 55, `${id} reasoning and hints are too shallow`);
  assert.ok(countWords(revealed[1]) >= 300, `${id} revealed derivation is too shallow`);
  assert.ok(countWords(between('## Why This Matters', '## Common Mistakes')) >= 35, `${id} Why This Matters is too shallow`);
  assert.ok((between('## Common Mistakes', '## Extensions').match(/^- /gm) ?? []).length >= 4, `${id} needs four concrete mistakes`);
  assert.ok((between('## Extensions', '</details>').match(/^\d+\. /gm) ?? []).length >= 2, `${id} needs two concrete extensions`);
  assertSourceNeutral(text, id);
}

test('twelve before consecutive sevens uses the exact two-state first-step system', async () => {
  const text = await read('src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md');
  assertS3(text, 'random-walks-markov-chains-001', [
    'coin-pattern-hitting-times',
    'recursive-dice-game-expected-payoff',
  ]);
  assert.match(text, /independent.*fair.*six-sided dice/i);
  assert.ok(text.includes('x = 1/36 + (29/36)x + (1/6)y'));
  assert.ok(text.includes('y = 1/36 + (29/36)x'));
  assert.ok(text.includes('x = 7/13'));
  assert.match(text, /initial state.*x/i);
  assert.match(text, /non-seven.*non-twelve.*reset|reset.*seven streak/i);
  assert.match(text, /almost surely/i);
  assert.match(text, /single-step competing hazards|not.*competing hazards/i);
});

test('coin pattern Problem freezes both waiting systems, race, and response table', async () => {
  const text = await read('src/content/problems/stochastic-processes/coin-pattern-hitting-times.md');
  assertS3(text, 'random-walks-markov-chains-002', [
    'twelve-before-consecutive-sevens',
    'expected-pattern-count-by-indicators',
    'no-consecutive-heads-in-n-tosses',
  ]);
  for (const state of ['`""`', '`H`', '`HH`', '`T`', '`TH`']) assert.ok(text.includes(state), `missing suffix state ${state}`);
  for (const equation of [
    'E_0 = 1 + (1/2)E_1 + (1/2)E_0',
    'E_1 = 1 + (1/2)E_2 + (1/2)E_0',
    'E_2 = 1 + (1/2)0 + (1/2)E_0',
    'F_0 = 1 + (1/2)F_0 + (1/2)F_1',
    'F_1 = 1 + (1/2)F_2 + (1/2)F_1',
    'F_2 = 1 + (1/2)0 + (1/2)F_1',
  ]) assert.ok(text.includes(equation), `missing first-step equation ${equation}`);
  assert.ok(text.includes('E[waiting time for HHH] = 14'));
  assert.ok(text.includes('E[waiting time for THH] = 8'));
  assert.match(text, /tail from (?:state )?`T`.*stays.*`T`/i);
  assert.ok(text.includes('P(HHH appears before THH) = 1/8'));
  assert.match(text, /first three flips.*all heads/i);
  assert.match(text, /complement\(b\)ab/i);
  const responseRows = [
    ['HHH', 'THH', '7/8'],
    ['HHT', 'THH', '3/4'],
    ['HTH', 'HHT', '2/3'],
    ['HTT', 'HHT', '2/3'],
    ['THH', 'TTH', '2/3'],
    ['THT', 'TTH', '2/3'],
    ['TTH', 'HTT', '3/4'],
    ['TTT', 'HTT', '7/8'],
  ];
  for (const row of responseRows) assert.ok(text.includes(`| \`${row[0]}\` | \`${row[1]}\` | \`${row[2]}\` |`), `missing response row ${row.join(' ')}`);
  assert.match(text, /at least `?2\/3`?/i);
  assert.match(text, /first-hitting.*fixed-horizon|fixed-horizon.*first-hitting/i);
  assert.match(text, /overlapping.*not independent|not independent.*overlapping/i);
});
```

- [ ] **Step 2: Run the two-Problem test and verify RED**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

Expected: the two Task 1 Knowledge tests pass, then `twelve before consecutive sevens uses the exact two-state first-step system` fails with `ENOENT` for `src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md`.

- [ ] **Step 3: Implement the dice-streak page with exact metadata and derivation**

Create `src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md`. Use this exact frontmatter:

```yaml
---
problemId: random-walks-markov-chains-001
title: Twelve Before Consecutive Sevens
description: Analyze a two-dice race between a total of 12 and two consecutive totals of 7 with a compressed Markov state.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: [coin-pattern-hitting-times, recursive-dice-game-expected-payoff]
family: competing-streak-hazards
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---
```

Write this complete public body after the frontmatter:

````markdown
## Problem

Independently roll two fair six-sided dice until either a total of 12 appears or totals of 7 appear on two consecutive rolls. What is the probability that 12 appears first?

## Think Before Revealing

The event “the previous roll was a seven” changes what the next seven means, so one scalar hazard comparison loses state. The smallest useful state records whether the current path ends with exactly one seven.

<details>
<summary>Hint 1</summary>

Let (x) be the success probability with no trailing seven and (y) the success probability after one trailing seven.

List every outcome of the next roll from each state, including the outcomes that keep or reset the current state. The process starts in state (x), not state (y).

</details>

<details>
<summary>Hint 2</summary>

A total of 12 has probability (1/36), a total of 7 has probability (1/6), and every other result has probability (29/36). A non-seven, non-twelve result resets the seven streak.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let (x) denote the probability that 12 wins when there is no trailing seven, and let (y) denote the same probability immediately after one seven. The initial state is (x). From state (x), a 12 succeeds, an ordinary result returns to (x), and a seven moves to (y). From state (y), a 12 succeeds, an ordinary result resets to (x), and a seven ends the experiment in failure. First-step analysis therefore gives

```text
x = 1/36 + (29/36)x + (1/6)y
y = 1/36 + (29/36)x
```

The second equation has no added term for another seven because its continuation value is zero. Multiplying by 36 gives

```text
7x - 6y = 1
36y - 29x = 1
```

From the second equation, (y=(1+29x)/36). Substituting into the first gives

```text
7x - (1 + 29x)/6 = 1
42x - 1 - 29x = 6
13x = 7
```

Hence

```text
x = 7/13
```

This is the probability from the actual initial condition, before any roll. The shortcut that treats (1/36) and ((1/6)^2) as single-step competing hazards is invalid: the two-seven event spans overlapping time windows and carries a trailing-seven state from one roll to the next.

Stopping occurs almost surely. In each disjoint two-roll block, the event “both rolls total seven” has positive probability (1/36), independently of earlier blocks. Therefore the probability of avoiding that terminal event through (m) such blocks is at most ((35/36)^m), which tends to zero. Adding the possibility of a 12 can only make stopping sooner.

## Why This Matters

The problem shows how one bit of memory turns an overlapping streak event into a finite homogeneous Markov chain. It also illustrates the reliable interview workflow: identify the missing path memory, make that memory a state, condition once, and solve the resulting linear system from the correct initial state.

## Common Mistakes

- Treating two consecutive sevens as a one-roll hazard.
- Forgetting that every non-seven, non-twelve result resets the streak.
- Starting from (y) even though no roll precedes the experiment.
- Dropping the zero-valued failure branch without explaining why it contributes no term.

## Extensions

1. Replace 12 and 7 by any target total and streak total, then substitute their one-roll probabilities into the same two-state system.
2. Require three consecutive sevens; the sufficient state becomes streak length 0, 1, or 2.

</details>
````

- [ ] **Step 4: Implement the multipart coin-pattern page with all four audited results**

Create `src/content/problems/stochastic-processes/coin-pattern-hitting-times.md` with this exact frontmatter:

```yaml
---
problemId: random-walks-markov-chains-002
title: Coin Pattern Hitting Times
description: Use suffix-state Markov chains to derive waiting times, a pattern race, and a second-choice guarantee for length-three coin patterns.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: [twelve-before-consecutive-sevens, expected-pattern-count-by-indicators, no-consecutive-heads-in-n-tosses]
family: coin-pattern-automata
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 22
status: solved
featured: false
---
```

Write this complete public body after the frontmatter:

````markdown
## Problem

Flip an independent fair coin repeatedly and answer four first-hitting questions.

1. What is the expected waiting time until `HHH` first appears?
2. What is the expected waiting time until `THH` first appears?
3. In a race using the same flip stream, what is `P(HHH appears before THH)`?
4. A first player announces any length-three pattern. The second player then announces a different length-three pattern. Give a response rule whose pattern wins the first-hitting race with probability at least `2/3`, and verify all eight first choices.

Occurrences may overlap. Waiting for a first occurrence is not the same experiment as counting appearances in a fixed number of flips.

## Think Before Revealing

A valid state does not need the entire history. It needs the longest suffix of the observed flips that is also a prefix of a pattern that can still win.

<details>
<summary>Hint 1</summary>

For a single target, write one expectation for each proper prefix. When a new flip mismatches the next target symbol, keep the longest suffix that remains a target prefix instead of automatically erasing all progress.

</details>

<details>
<summary>Hint 2</summary>

For the race, ask what a first tail does to the next run of heads. For the second-player rule, if the first pattern is `abc`, compare it with `complement(b)ab` and check the eight possible first patterns explicitly.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Waiting time for `HHH`

Use states `""`, `H`, and `HH`, the longest suffix that is a prefix of `HHH`. With expectations (E_0,E_1,E_2),

```text
E_0 = 1 + (1/2)E_1 + (1/2)E_0
E_1 = 1 + (1/2)E_2 + (1/2)E_0
E_2 = 1 + (1/2)0 + (1/2)E_0
```

The first equation gives (E_0=2+E_1), while the third gives (E_2=1+E_0/2). Substitution into the middle equation yields (E_1=12) and then (E_0=14). Thus

```text
E[waiting time for HHH] = 14
```

### Waiting time for `THH`

Use states `""`, `T`, and `TH`. A tail from state `T` stays in state `T`; it does not reset to `""`, because that tail is itself the beginning of another possible `THH`.

```text
F_0 = 1 + (1/2)F_0 + (1/2)F_1
F_1 = 1 + (1/2)F_2 + (1/2)F_1
F_2 = 1 + (1/2)0 + (1/2)F_1
```

Here (F_0=2+F_1), (F_1=2+F_2), and (F_2=1+F_1/2). Hence (F_1=6) and (F_0=8), so

```text
E[waiting time for THH] = 8
```

### Race between `HHH` and `THH`

```text
P(HHH appears before THH) = 1/8
```

`HHH` wins exactly when the first three flips are all heads, an event of probability (1/8). If a tail occurs first, consider the first later run containing two consecutive heads. Its last preceding tail followed by those two heads completes `THH`; this happens before a third consecutive head could complete `HHH`. This exhausts the almost-sure first-hitting outcomes.

### Second-chooser guarantee

If the first word is `abc`, respond with `complement(b)ab`, where `complement(H)=T` and `complement(T)=H`. The response overlaps the first word in two symbols but gains a one-symbol lead whenever its complementary opening symbol appears. Direct suffix-state equations for each pair give the table.

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

The response therefore wins with probability at least `2/3`; the worst cases are the four rows with value `2/3`. Overlapping candidate windows are not independent. The table records first-hitting probabilities obtained from suffix states, not products of independent window probabilities.

## Why This Matters

Pattern questions look history-dependent until the history is compressed to a longest viable suffix. That automaton makes expected waiting times and competing-pattern probabilities ordinary first-step systems. It also explains why overlap changes waiting times even though expected fixed-horizon counts can still be computed by linearity of expectation.

## Common Mistakes

- Resetting every mismatch to the empty suffix instead of retaining the longest viable suffix.
- Treating overlapping candidate windows as independent.
- Confusing a first-hitting race with fixed-horizon pattern counts.
- Quoting the response rule without checking all eight first patterns.

## Extensions

1. Build the complete prefix-suffix automaton for a length-four target and solve its expected waiting-time equations.
2. Replace the fair coin by (P(H)=p) and update every transition probability without changing the state logic.
3. Compare first-hitting probabilities with expected fixed-horizon counts, where overlapping indicators may be dependent but linearity still applies.

</details>
````

- [ ] **Step 5: Run focused content and Astro gates**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
```

Expected: four tests pass with zero failures; check and build exit 0.

- [ ] **Step 6: Commit the two pattern/streak Problems**

```bash
git add -- tests/quant-interview-random-walks-markov-chains-content.test.mjs src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md src/content/problems/stochastic-processes/coin-pattern-hitting-times.md
git commit -m "feat: add Markov pattern hitting problems"
```

---

### Task 3: Create Recoloring and Cube Problems, Then Produce the Candidate Report

**Files:**
- Modify: `tests/quant-interview-random-walks-markov-chains-content.test.mjs`
- Create: `src/content/problems/stochastic-processes/random-recoloring-consensus-time.md`
- Create: `src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md`

**Interfaces:**
- Consumes: the two new Knowledge slugs, `first-step-analysis`, and the exact S3/source-neutral helpers from Tasks 1-2.
- Produces: Problem ids `random-walks-markov-chains-003` and `random-walks-markov-chains-004`, a final seven-file candidate diff, qualified candidate evidence, and a non-authoritative coordinator report with exact proposed shared deltas.

- [ ] **Step 1: Append the failing recoloring, cube, and exact-inventory tests**

Append:

```js
const exactNewContent = [
  'src/content/knowledge/concepts/finite-state-markov-chains.md',
  'src/content/knowledge/concepts/markov-chain-state-compression.md',
  'src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md',
  'src/content/problems/stochastic-processes/coin-pattern-hitting-times.md',
  'src/content/problems/stochastic-processes/random-recoloring-consensus-time.md',
  'src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md',
];

test('candidate module exposes the exact six public paths and four Problem ids', async () => {
  const texts = await Promise.all(exactNewContent.map(read));
  assert.equal(texts.length, 6);
  const ids = texts.map((text) => text.match(/^problemId:\s*(.+)$/m)?.[1]).filter(Boolean);
  assert.deepEqual(ids, [
    'random-walks-markov-chains-001',
    'random-walks-markov-chains-002',
    'random-walks-markov-chains-003',
    'random-walks-markov-chains-004',
  ]);
  for (const [index, text] of texts.entries()) {
    assertExactLineArray(text, 'quantInterviewTopics', topics);
    assertSourceNeutral(text, exactNewContent[index]);
  }
});

test('ordered-pair recoloring uses backward lineage coalescence', async () => {
  const text = await read('src/content/problems/stochastic-processes/random-recoloring-consensus-time.md');
  assertS3(text, 'random-walks-markov-chains-003', []);
  assert.match(text, /n labeled balls.*n distinct colors/i);
  assert.match(text, /ordered pairs.*distinct balls|n\(n-1\).*ordered/i);
  assert.match(text, /first ball.*second ball.*color/i);
  assert.match(text, /same-colored.*counts|every update counts/i);
  assert.ok(text.includes('k(k-1) / (n(n-1))'));
  assert.ok(text.includes('n(n-1) / (k(k-1))'));
  assert.ok(text.includes('E[T] = sum_(k=2)^n n(n-1)/(k(k-1)) = (n-1)^2'));
  assert.match(text, /n\s*=\s*1.*zero steps/i);
  assert.match(text, /forward.*number of colors.*insufficient|number of colors.*not.*sufficient/i);
  assert.match(text, /distinct initial colors.*(?:needed|required)|ancestry equivalence.*distinct/i);
  assert.match(text, /with replacement.*n\(n-1\)/i);
});

test('cube Problem distinguishes positive return and gives both exact methods', async () => {
  const text = await read('src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md');
  assertS3(text, 'random-walks-markov-chains-004', ['random-walk-boundary']);
  assert.match(text, /eight cube vertices/i);
  assert.match(text, /three neighbors.*uniform|uniformly.*three neighbors/i);
  assert.ok(text.includes('T_v^+ = min{t >= 1 : X_t = v}'));
  assert.match(text, /ordinary hitting time.*zero/i);
  assert.match(text, /connected.*3-regular|3-regular.*connected/i);
  assert.match(text, /uniform.*eight vertices/i);
  assert.ok(text.includes('E_v[T_v^+] = 1/pi_v = 8'));
  assert.match(text, /bipartite.*periodic/i);
  assert.match(text, /periodicity.*does not invalidate|does not invalidate.*periodic/i);
  assert.ok(text.includes('E_1 = 1 + (2/3)E_2'));
  assert.ok(text.includes('E_2 = 1 + (2/3)E_1 + (1/3)E_3'));
  assert.ok(text.includes('E_3 = 1 + E_2'));
  assert.ok(text.includes('E_1 = 7'));
  assert.ok(text.includes('E_v[T_v^+] = 1 + E_1 = 8'));
});
```

- [ ] **Step 2: Run the expanded module test and verify RED**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

Expected: the four earlier tests pass; `candidate module exposes the exact six public paths and four Problem ids` fails with `ENOENT` for `src/content/problems/stochastic-processes/random-recoloring-consensus-time.md`.

- [ ] **Step 3: Implement the ordered-pair recoloring Problem**

Create `src/content/problems/stochastic-processes/random-recoloring-consensus-time.md` with exact frontmatter:

```yaml
---
problemId: random-walks-markov-chains-003
title: Random Recoloring Consensus Time
description: Trace ordered-pair recoloring backward through ancestral lineages to derive the expected time to unanimity.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: []
family: voter-recoloring-coalescence
mathDifficulty: 3
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 18
status: solved
featured: false
---
```

Write this complete public body after the frontmatter:

````markdown
## Problem

There are n labeled balls, initially painted with n distinct colors. At each discrete step, choose uniformly one of the (n(n-1)) ordered pairs of distinct balls. The first ball in the pair adopts the second ball's current color. Every update counts as one step, including an update between same-colored balls that causes no visible change. What is the expected number of steps until all balls have one color?

## Think Before Revealing

The visible number of colors decreases, but two configurations with the same number of colors can have different color-class sizes and different next-step probabilities. Seek a state whose transitions ignore those class sizes.

<details>
<summary>Hint 1</summary>

Do not write a forward recursion using only the number of visible colors. For example, partitions (3,1) and (2,2) both have two colors but do not have the same chance of losing a color on the next update.

</details>

<details>
<summary>Hint 2</summary>

Trace the ancestry of the colors backward through the copying events. Backward lineages move between labeled positions and coalesce when one update connects two occupied lineage positions.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Expose the update sequence backward from the eventual observation time. Each current color has an ancestral ball at time zero. Backward through an update in which recipient (i) copied donor (j), a lineage at (i) jumps to (j); if a lineage already occupies (j), the two lineages coalesce. Thus active lineages occupy distinct labeled positions even though their forward descendant color classes may have unequal sizes.

Suppose there are (k) active lineages. Among the (n(n-1)) equally likely ordered recipient-donor pairs, exactly (k(k-1)) pairs select two different occupied lineage positions. Those and only those pairs cause the next coalescence, so its one-step probability is

```text
k(k-1) / (n(n-1))
```

While the process remains at (k), repeated noncoalescing updates simply count as failures before the next success. The waiting time to go from (k) to (k-1) lineages is geometric with mean

```text
n(n-1) / (k(k-1))
```

Lineage count can fall only by one at an update. By linearity of expectation across the successive levels and the identity (1/(k(k-1))=1/(k-1)-1/k),

```text
E[T] = sum_(k=2)^n n(n-1)/(k(k-1)) = (n-1)^2
```

Indeed, the telescoping sum is (1-1/n), so (n(n-1))(1-1/n)=(n-1)^2). For (n=1), unanimity already holds and the answer is zero steps.

The forward number of colors is insufficient because its transition law depends on the full color-class sizes. The distinct initial colors assumption is required: it makes visible unanimity equivalent to one surviving ancestral lineage. With repeated initial colors, different surviving ancestors can already share a visible color. The ordered-pair protocol is also essential. If the pair were sampled with replacement, including self-pairs, the denominator would be (n^2); the same lineage calculation would then give expectation (n(n-1)), not ((n-1)^2).

## Why This Matters

The forward statistic that looks obvious is not Markov, while a backward genealogical statistic is. This reversal converts a configuration-dependent recoloring process into a one-dimensional pure-death chain. The calculation is also a reminder that unchanged updates still consume time and therefore belong in transition probabilities.

## Common Mistakes

- Counting unordered pairs even though recipient and donor roles make the update ordered.
- Omitting same-colored or otherwise noncoalescing updates even though every update counts.
- Treating the forward number of colors as sufficient without recording color-class sizes.
- Reusing ((n-1)^2) when pairs are sampled with replacement and self-pairs are allowed.

## Extensions

1. Give donor positions unequal weights; derive the backward lineage transition law and identify what additional state replaces the scalar lineage count.
2. Allow non-distinct initial colors; distinguish genealogical coalescence from visible consensus and derive a state that records the needed initial-color labels.
3. Compare ordered sampling without replacement with ordered sampling including self-pairs and verify the two denominators directly.

</details>
````

- [ ] **Step 4: Implement the cube positive-return Problem**

Create `src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md` with:

```yaml
---
problemId: random-walks-markov-chains-004
title: Random Walk Return Time on the Cube
description: Compute the first positive return time on the cube using stationarity and Hamming-distance state compression.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: [random-walk-boundary]
family: finite-graph-return-time
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---
```

Write this complete public body after the frontmatter:

````markdown
## Problem

On the eight cube vertices, start at vertex (v). At every step choose one of the current vertex's three neighbors uniformly. Find the expected first positive return time

```text
T_v^+ = min{t >= 1 : X_t = v}
```

The ordinary hitting time at the starting vertex would be zero; this question starts counting at time one.

## Think Before Revealing

There are two short routes. A connected regular graph has a uniform stationary law, which controls mean positive return. Independently, cube symmetry lets us compress vertices by Hamming distance from (v) and solve three first-step equations.

<details>
<summary>Hint 1</summary>

For the stationary route, recall that a finite irreducible chain has mean positive return (1/\pi_v). Decide whether the cube's period affects that identity or only affects convergence of time marginals.

</details>

<details>
<summary>Hint 2</summary>

For the direct route, let (E_d) be the expected remaining hitting time from distance (d). A vertex at distance (d) has (d) edges toward distance (d-1) and (3-d) edges toward distance (d+1).

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Stationary-law method

The cube graph is connected and 3-regular, so the simple walk is irreducible. For an undirected graph, the stationary mass of a vertex is proportional to its degree. Every cube vertex has degree three, so the stationary law is uniform on the eight vertices: (\pi_v=1/8). The finite irreducible mean positive-return identity therefore gives

```text
E_v[T_v^+] = 1/pi_v = 8
```

The cube is bipartite and has period two. That periodicity prevents ordinary convergence from every starting state at every time, but it does not invalidate the stationary law or the mean positive-return identity. No artificial self-loop is needed.

### Hamming-distance method

Let (E_d) be the expected time to hit (v) from Hamming distance (d), with (E_0=0). At distance one, one of three edges hits (v) and two go to distance two. At distance two, two edges go to distance one and one goes to distance three. From the antipode at distance three, every edge goes to distance two. First-step analysis gives

```text
E_1 = 1 + (2/3)E_2
E_2 = 1 + (2/3)E_1 + (1/3)E_3
E_3 = 1 + E_2
```

Substitute (E_3=1+E_2) into the middle equation. After collecting terms, (E_2=2+E_1). The first equation then becomes (E_1=1+(2/3)(2+E_1)), so (E_1/3=7/3) and

```text
E_1 = 7
```

The original return clock starts at (v), not at distance one. Its first move always spends one step and reaches distance one, hence

```text
E_v[T_v^+] = 1 + E_1 = 8
```

Both methods compute the same positive return quantity. The first exposes a structural theorem; the second checks it through an explicit compressed chain.

## Why This Matters

The example separates three ideas that are often conflated: time-zero hitting, first positive return, and convergence to stationarity. It also demonstrates two complementary interview methods. A stationary-law identity can give the answer immediately, while a symmetry-based first-step system verifies the state model and arithmetic.

## Common Mistakes

- Answering zero by using the ordinary hitting time at the starting vertex instead of (T_v^+).
- Adding a self-loop even though the stated walk always chooses one of three neighbors.
- Claiming period two invalidates the stationary law or the mean positive-return identity.
- Forgetting the initial one step when converting (E_1=7) into the return time from (v).

## Extensions

1. On the (d)-dimensional hypercube, use regularity to show that the mean positive return to a fixed vertex is (2^d), then build the distance-chain recurrence as a check.
2. On a connected nonregular undirected graph, replace the uniform law by (\pi_v=\deg(v)/(2|E|)) and compare return times at vertices of different degrees.
3. Add laziness with a specified self-loop probability and identify which conclusions change: periodicity disappears, but the stationary law and mean return remain the same.

</details>
````

- [ ] **Step 5: Run final candidate-local content gates and commit**

```bash
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
git add -- tests/quant-interview-random-walks-markov-chains-content.test.mjs src/content/problems/stochastic-processes/random-recoloring-consensus-time.md src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
git commit -m "feat: add Markov consensus and return problems"
```

Expected: all seven module-content tests pass; check and build exit 0; the commit changes only the three listed candidate-owned files.

- [ ] **Step 6: Verify the frozen-base overall diff and the Phase-A candidate-owned filtered diff**

```bash
frozen_plan_only_base='ee07da02e8530acb6b530aa9294c8b4deabd7d2d'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
overall_diff="$(git diff --name-status "$frozen_plan_only_base..HEAD")"
printf '%s\n' "$overall_diff"
test "$(printf '%s\n' "$overall_diff" | awk '$1 == "A" { count++ } END { print count + 0 }')" = 7
test "$(printf '%s\n' "$overall_diff" | awk -v plan_path="$plan_path" '$1 == "M" && $2 == plan_path { count++ } END { print count + 0 }')" = 1
test -z "$(printf '%s\n' "$overall_diff" | awk -v plan_path="$plan_path" '$1 != "A" && !($1 == "M" && $2 == plan_path) { print }')"
candidate_owned_diff="$(git diff --name-status "$frozen_plan_only_base..HEAD" -- . ":(exclude)$plan_path")"
printf '%s\n' "$candidate_owned_diff"
test "$(printf '%s\n' "$candidate_owned_diff" | awk '$1 == "A" { count++ } END { print count + 0 }')" = 7
test -z "$(printf '%s\n' "$candidate_owned_diff" | awk '$1 != "A" { print }')"
git diff --check "$frozen_plan_only_base..HEAD"
git status --short
```

Expected: the overall frozen-plan-only-base audit has exactly six `A` public Markdown paths, one `A` module-test path, and one `M` governance-plan path. The filtered Phase-A candidate-owned audit explicitly excludes that governance plan and has exactly seven `A` paths with no `M` or `D`; both audits have no whitespace errors and the worktree is clean. Preserve the reviewed governance-plan correction; do not rewrite history or claim that the overall diff is A-only.

- [ ] **Step 7: Obtain qualified candidate evidence at the exact candidate HEAD**

In one fresh WSL shell, reacquire the exact candidate HEAD, load a new copy of the qualified-gate function, and run the candidate gates plus an executable count of every classified public file:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
candidate_head="$(git -C "$repo_source" rev-parse "refs/heads/$candidate_ref^{commit}")"
[[ "$candidate_head" =~ ^[0-9a-f]{40}$ ]]
gate_definition="$(git -C "$repo_source" show "$candidate_head:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$candidate_ref" "$candidate_head" $'npm ci
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
set +e
NODE_OPTIONS=--test-reporter=tap npm run test > .qi011-full-suite.log 2>&1
full_exit=$?
set -e
test "$full_exit" -ne 0
node --input-type=module <<'"'"'NODE'"'"'
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

async function classifiedSlugs(root) {
  const files = (await readdir(root, { recursive: true }))
    .map(String)
    .filter((file) => file.endsWith(".md"));
  const slugs = [];
  for (const file of files) {
    const text = await readFile(path.join(root, file), "utf8");
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) slugs.push(path.basename(file, ".md"));
  }
  assert.equal(new Set(slugs).size, slugs.length, `${root} has duplicate classified slugs`);
  return slugs.sort();
}

const problems = await classifiedSlugs("src/content/problems");
const knowledge = await classifiedSlugs("src/content/knowledge");
assert.equal(problems.length, 63, "candidate must expose exactly 63 classified Problems");
assert.equal(knowledge.length, 41, "candidate must expose exactly 41 classified Knowledge nodes");
for (const slug of [
  "twelve-before-consecutive-sevens",
  "coin-pattern-hitting-times",
  "random-recoloring-consensus-time",
  "random-walk-return-time-on-cube",
]) assert.ok(problems.includes(slug), `missing candidate Problem ${slug}`);
for (const slug of ["finite-state-markov-chains", "markov-chain-state-compression"]) {
  assert.ok(knowledge.includes(slug), `missing candidate Knowledge ${slug}`);
}
const log = await readFile(".qi011-full-suite.log", "utf8");
assert.match(log, /^not ok [0-9]+ - source-neutral regression discovers exactly the current 59 Problem and 39 Knowledge contracts$/m);
assert.match(log, /^# fail 1$/m);
console.log(JSON.stringify({ problems: problems.length, knowledge: knowledge.length, fullSuiteExpectedFailures: 1 }));
NODE
rm -- .qi011-full-suite.log'
```

Expected:

- module-content test, check, and build exit 0;
- the full suite has exactly one failed test: `source-neutral regression discovers exactly the current 59 Problem and 39 Knowledge contracts`;
- that failure is the intentional stale exact registry after discovering exactly 63 classified Problems and exactly 41 classified Knowledge nodes; the final JSON line is `{"problems":63,"knowledge":41,"fullSuiteExpectedFailures":1}`;
- no other test file or assertion fails.

If the full suite is fully green before coordinator reconciliation, the exact registry was weakened or candidate shared state was edited; stop. If any second failure occurs, the candidate is not verified.

- [ ] **Step 8: Send the exact non-authoritative candidate report**

The report must contain all of these concrete fields:

```text
workstream: stochastic-processes-random-walks-markov-chains-011
state: active, candidate-only, non-authoritative
frozen base: f41880f220991f43d84ddb3795a59b8688e5230c
candidate branch and exact 40-character HEAD
overall frozen-base diff: six A public Markdown paths, one A module test, and one M governance plan
Phase-A candidate-owned filtered diff: exact seven A paths, no M/D, after excluding the governance plan
qualified checkout path outside /mnt and LF gate result
module test/check/build command exits
full-suite result: only stale 59/39 exact registry; observed classified totals 63/41
proposed coordinator deltas: boundary enrichment; first-step and four Problem reciprocal edits; exact five Green and three Red rows with 5/2/1 split; active manifest with 150 reviewed-no-new-ownership; 63/41 exact regression; phase-safe governance/completion/HANDOFF changes; real Ubuntu/Node 24 CI; factual closure to 012 then 013
explicit no-delta confirmations: taxonomy, source-topic map, 150 coverage ledger, main, durable history
```

Do not call the candidate complete, record a run id, edit HANDOFF, or push shared-state commits.

---

## Phase B — Serialized Coordinator Integration

### Task 4: Reconcile the Candidate onto the Latest Durable Post-010 Base

**Files:**
- Create unchanged authority copy: `docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md`
- Create unchanged authority copy: `docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md`
- Create from reviewed candidate: the exact seven Phase A candidate-owned files

**Interfaces:**
- Consumes: verified candidate branch/HEAD/report from Task 3 and the then-current durable coordinator branch HEAD containing completed workstream 010 plus parallel-governance state.
- Produces: a coordinator-owned integration branch rooted in the latest durable state, containing only unchanged approved authorities and the reviewed candidate module; no shared hidden state exists yet.

- [ ] **Step 1: Establish the latest durable integration base without rewriting history**

Invoke `superpowers:using-git-worktrees` before creating the coordinator worktree. From the shared repository, run:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$repo_source" rev-parse --show-toplevel)" = "$repo_source"
git -C "$repo_source" fetch origin "$durable_ref"
durable_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
remote_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
[[ "$durable_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$remote_sha" =~ ^[0-9a-f]{40}$ ]]
test "$remote_sha" = "$durable_sha"
git -C "$repo_source" merge-base --is-ancestor f41880f220991f43d84ddb3795a59b8688e5230c "$durable_sha"
git -C "$repo_source" show "$durable_sha:src/data/quant-interview/workstreams/probability-statistics-order-statistics-extremes-010.json" \
  | node --input-type=module -e "let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{const w=JSON.parse(s);if(w.status!=='complete')process.exit(1)})"
if git -C "$repo_source" show-ref --verify --quiet "refs/heads/$integration_ref" || test -e "$integration_path"; then
  echo 'integration branch or worktree already exists; inspect it without deleting or rewriting it' >&2
  exit 1
fi
git -C "$repo_source" worktree add "$integration_path" -b "$integration_ref" "refs/remotes/origin/$durable_ref"
test "$(git -C "$integration_path" rev-parse HEAD)" = "$durable_sha"
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
git -C "$integration_path" merge-base --is-ancestor "$durable_sha" HEAD
```

Expected: the ancestry and completed-010 checks exit 0; the new coordinator branch points exactly at `durable_sha`; no command mentions `main`, `--force`, reset, or rebase. If the integration branch already exists, inspect it and resume only if it is an unmodified descendant of the same latest durable SHA; never delete or overwrite another worker's branch.

- [ ] **Step 2: Prove the exact latest durable baseline in a qualified checkout**

In a new WSL shell, independently fetch and compare the remote durable ref again, load the committed qualified-gate function from the candidate authority commit, and detach the temporary checkout at the exact remote SHA:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
git -C "$repo_source" fetch origin "$durable_ref"
durable_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
remote_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
[[ "$durable_sha" =~ ^[0-9a-f]{40}$ ]]
test "$remote_sha" = "$durable_sha"
authority_sha="$(git -C "$repo_source" rev-list -1 "refs/heads/$candidate_ref" -- "$plan_path")"
[[ "$authority_sha" =~ ^[0-9a-f]{40}$ ]]
gate_definition="$(git -C "$repo_source" show "$authority_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "$durable_sha" "$durable_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build'
```

Expected: all commands exit 0 before any 011 file is imported. Record this SHA and evidence as the coordinator's post-010 baseline.

- [ ] **Step 3: Review the candidate delta as an exact seven-file allowlist**

From the coordinator worktree, fetch local/remote refs without changing durable history, then run:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
frozen_plan_only_base='ee07da02e8530acb6b530aa9294c8b4deabd7d2d'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
candidate_head="$(git -C "$repo_source" rev-parse "refs/heads/$candidate_ref^{commit}")"
[[ "$candidate_head" =~ ^[0-9a-f]{40}$ ]]
[[ "$frozen_plan_only_base" =~ ^[0-9a-f]{40}$ ]]
git -C "$repo_source" merge-base --is-ancestor "$frozen_plan_only_base" "$candidate_head"
expected_candidate_files=(
  src/content/knowledge/concepts/finite-state-markov-chains.md
  src/content/knowledge/concepts/markov-chain-state-compression.md
  src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md
  src/content/problems/stochastic-processes/coin-pattern-hitting-times.md
  src/content/problems/stochastic-processes/random-recoloring-consensus-time.md
  src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
  tests/quant-interview-random-walks-markov-chains-content.test.mjs
)
overall_diff="$(git -C "$repo_source" diff --name-status "$frozen_plan_only_base..$candidate_head")"
printf '%s\n' "$overall_diff"
test "$(printf '%s\n' "$overall_diff" | awk '$1 == "A" { count++ } END { print count + 0 }')" = 7
test "$(printf '%s\n' "$overall_diff" | awk -v plan_path="$plan_path" '$1 == "M" && $2 == plan_path { count++ } END { print count + 0 }')" = 1
test -z "$(printf '%s\n' "$overall_diff" | awk -v plan_path="$plan_path" '$1 != "A" && !($1 == "M" && $2 == plan_path) { print }')"
candidate_owned_diff="$(git -C "$repo_source" diff --name-status "$frozen_plan_only_base..$candidate_head" -- . ":(exclude)$plan_path")"
printf '%s\n' "$candidate_owned_diff"
test -z "$(printf '%s\n' "$candidate_owned_diff" | awk '$1 != "A" { print }')"
diff -u \
  <(printf '%s\n' "${expected_candidate_files[@]}" | sort) \
  <(printf '%s\n' "$candidate_owned_diff" | awk '$1 == "A" { print $2 }' | sort)
git -C "$repo_source" diff --check "$frozen_plan_only_base..$candidate_head"
```

Expected: the overall frozen-plan-only-base audit has exactly seven `A` candidate additions and one `M` governance-plan path. After explicitly excluding `plan_path`, the candidate-owned audit is exactly equal to the seven-file allowlist and every entry is `A`, with no `M` or `D`. `diff` and `git diff --check` exit 0. Review the actual page/test diff and confirm the candidate report's qualified command evidence. Do not use the latest plan commit as a candidate-content base; a candidate change to any other shared/base-existing path blocks intake.

- [ ] **Step 4: Import the test first and verify coordinator RED**

Import the approved authorities and candidate test, but not the six public pages:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
candidate_head="$(git -C "$repo_source" rev-parse "refs/heads/$candidate_ref^{commit}")"
[[ "$candidate_head" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" restore --source="$candidate_head" -- \
  docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md \
  docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md \
  tests/quant-interview-random-walks-markov-chains-content.test.mjs
cd "$integration_path"
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
```

Expected: FAIL with `ENOENT` for `src/content/knowledge/concepts/finite-state-markov-chains.md`. This proves the coordinator is testing the durable integration tree rather than accepting the candidate result by assertion.

- [ ] **Step 5: Port exactly the six new public files and verify GREEN**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
candidate_ref='chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
candidate_head="$(git -C "$repo_source" rev-parse "refs/heads/$candidate_ref^{commit}")"
[[ "$candidate_head" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" restore --source="$candidate_head" -- \
  src/content/knowledge/concepts/finite-state-markov-chains.md \
  src/content/knowledge/concepts/markov-chain-state-compression.md \
  src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md \
  src/content/problems/stochastic-processes/coin-pattern-hitting-times.md \
  src/content/problems/stochastic-processes/random-recoloring-consensus-time.md \
  src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
cd "$integration_path"
node --test tests/quant-interview-random-walks-markov-chains-content.test.mjs
npm run check
npm run build
```

Expected: module test, check, and build pass. Do not use a candidate-base copy of any pre-existing page.

- [ ] **Step 6: Confirm the documented stale-registry RED and commit intake**

```bash
npm run test
```

Expected: the only failed test is the exact `59/39` source-neutral registry, with 63 classified Problems observed before the expected 59 assertion; all other test files pass. Then commit:

```bash
git add -- \
  docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md \
  docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md \
  tests/quant-interview-random-walks-markov-chains-content.test.mjs \
  src/content/knowledge/concepts/finite-state-markov-chains.md \
  src/content/knowledge/concepts/markov-chain-state-compression.md \
  src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md \
  src/content/problems/stochastic-processes/coin-pattern-hitting-times.md \
  src/content/problems/stochastic-processes/random-recoloring-consensus-time.md \
  src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
git commit -m "feat: integrate random walks Markov chains candidate"
```

---

### Task 5: Register Active 011 and Make Lifecycle Tests Phase-Safe

**Files:**
- Create: `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`
- Create: `src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json`
- Modify: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Modify: `tests/quant-interview-order-statistics-extremes-completion.test.mjs`
- Modify: `tests/quant-interview-handoff.test.mjs`
- Modify: `docs/quant-interview/HANDOFF.md`

**Interfaces:**
- Consumes: the exact manifest validator `validateTopicWorkstream`, the durable parallel reservation `011 -> 012 -> 013`, and the integrated candidate module from Task 4.
- Produces: an active manifest with exact three-source audit scope and no verification metadata; tests that pass both before and after factual 011 closure while still preventing premature 012/013 manifests.

- [ ] **Step 1: Write the failing manifest/workstream contract**

Create `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const workstreamPath = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';

async function context() {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const manifests = Object.fromEntries(await Promise.all(
    ['green-book', 'red-book', '150-most-frequently-asked'].map(async (source) => [
      source,
      await readJson(`src/data/quant-interview/${source}.json`),
    ]),
  ));
  return { taxonomy, sourceTopicMap, manifests };
}

async function markdownSlugs(root) {
  const files = await readdir(root, { recursive: true });
  return new Set(files.filter((file) => String(file).endsWith('.md')).map((file) => path.basename(String(file), '.md')));
}

test('workstream 011 has exact identity, topics, sources, and lifecycle', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.id, 'stochastic-processes-random-walks-markov-chains-011');
  assert.deepEqual(workstream.canonicalTopics, [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.match(workstream.status, /^(?:active|complete)$/);
  assert.deepEqual(new Set(workstream.sourceScopes.map((scope) => scope.source)), new Set([
    'green-book',
    'red-book',
    '150-most-frequently-asked',
  ]));
  if (workstream.status === 'active') assert.equal(workstream.verification, undefined);
  if (workstream.status === 'complete') {
    assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
    assert.ok(Number.isInteger(workstream.verification?.runId) && workstream.verification.runId > 0);
    assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
    assert.equal(workstream.verification?.conclusion, 'success');
  }
});

test('workstream 011 records exact bounded evidence and 150 no-ownership review', async () => {
  const workstream = await readJson(workstreamPath);
  const green = workstream.sourceScopes.find((scope) => scope.source === 'green-book');
  const red = workstream.sourceScopes.find((scope) => scope.source === 'red-book');
  const q150 = workstream.sourceScopes.find((scope) => scope.source === '150-most-frequently-asked');
  assert.deepEqual(green?.sourceSections, ['5.1']);
  assert.deepEqual(green?.evidencePageRanges, [{ startPage: 121, endPage: 131 }]);
  for (const key of ['5.1', 'gamblers-ruin', 'dice-question', 'coin-triplets', 'color-balls']) assert.match(green?.reviewNote ?? '', new RegExp(key.replace('.', '\\.')));
  assert.deepEqual(red?.sourceSections, ['3.2.1', '3.2.2']);
  assert.deepEqual(red?.evidencePageRanges, [
    { startPage: 94, endPage: 96 },
    { startPage: 115, endPage: 117 },
    { startPage: 139, endPage: 139 },
  ]);
  for (const item of ['3.22', '3.23', '3.40']) assert.match(red?.reviewNote ?? '', new RegExp(item.replace('.', '\\.')));
  assert.deepEqual(q150?.sourceSections, ['2.6']);
  assert.deepEqual(q150?.evidencePageRanges, [
    { startPage: 41, endPage: 43 },
    { startPage: 145, endPage: 174 },
  ]);
  assert.equal(q150?.reviewOutcome, 'reviewed-no-new-ownership');
  for (const phrase of ['items 10-29', 'martingale', 'Brownian', 'Itô', 'SDE', 'change-of-measure', 'stochastic-volatility', 'items 1-9', 'no new 150 coverage rows', '2.6::', 'pending']) {
    assert.match(q150?.reviewNote ?? '', new RegExp(phrase, 'i'));
  }
});

test('existing validator accepts workstream 011 registration', async () => {
  const workstream = await readJson(workstreamPath);
  const ctx = await context();
  const { validateTopicWorkstream } = await import('../src/lib/quantInterviewWorkstreams.mjs');
  assert.doesNotThrow(() => validateTopicWorkstream(workstream, ctx));
});
```

- [ ] **Step 2: Update lifecycle tests before creating the manifest**

In `tests/quant-interview-parallel-workstream-governance.test.mjs`, add:

```js
const workstream011Path = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';

async function workstream011Status() {
  try {
    return JSON.parse(await readFile(workstream011Path, 'utf8')).status;
  } catch (error) {
    if (error?.code === 'ENOENT') return 'absent';
    throw error;
  }
}
```

Replace `handoff reserves the first parallel wave without claiming candidate completion` with this phase-safe identity/state contract:

```js
test('handoff preserves exact reservations while 011 advances through its lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
  const rows = reservationRows(coordination);
  assert.ok(coordination, 'HANDOFF missing parallel workstream coordination');
  assert.match(coordination, /maximum active candidates[^\n]*3/i);
  assert.deepEqual(
    rows.map(({ state, ...identity }) => identity),
    reservations.map(({ state, ...identity }, index) => ({ queue: String(index + 1), ...identity })),
  );
  assert.match(rows[0]?.state ?? '', /^(?:design-audit|active|complete)$/);
  assert.equal(rows[1]?.state, 'design-audit');
  assert.equal(rows[2]?.state, 'design-audit');

  const status = await workstream011Status();
  if (status === 'complete') {
    assert.match(coordination, /completed queue entry[^\n]*011/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
    assert.doesNotMatch(coordination, /remaining integration queue[^\n]*011/i);
  } else {
    assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
    assert.match(coordination, /candidate[^\n]*active[^\n]*not[^\n]*complete/i);
  }
});
```

Replace `parallel reservations preserve Random Walks as the authoritative current topic` with:

```js
test('authoritative current topic follows the serialized 011 lifecycle', async () => {
  const handoff = await readFile(handoffPath, 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  const status = await workstream011Status();
  if (status === 'complete') {
    assert.match(current, /Limits & Derivatives/i);
    assert.doesNotMatch(current, /Random Walks & Markov Chains|Reasoning & Communication/i);
  } else {
    assert.match(current, /Random Walks & Markov Chains/i);
    assert.doesNotMatch(current, /Limits & Derivatives|Reasoning & Communication/i);
  }
});
```

Replace `governance does not create product workstream manifests early` with:

```js
test('governance admits 011 while keeping 012 and 013 manifests premature', async () => {
  const files = await readdir('src/data/quant-interview/workstreams');
  assert.ok(files.includes('stochastic-processes-random-walks-markov-chains-011.json'));
  const workstream011 = JSON.parse(await readFile(workstream011Path, 'utf8'));
  assert.match(workstream011.status, /^(?:active|complete)$/);
  const prematureOrdinals = new Set(['012', '013']);
  const prematureManifests = files.filter((file) => {
    const suffix = file.match(/(\d{3})\.json$/)?.[1];
    return suffix && prematureOrdinals.has(suffix);
  });
  assert.deepEqual(prematureManifests, []);
});
```

In `tests/quant-interview-order-statistics-extremes-completion.test.mjs`, rename the second test to `handoff records workstream 010 as durable history` and replace its `nextAction` assertions with:

```js
assert.match(handoff, /Historical transition marker:[^\n]*Order Statistics & Extremes[^\n]*fully closed/i);
assert.match(handoff, /does not authorize reopening|records lineage only/i);
```

In `tests/quant-interview-handoff.test.mjs`, append:

```js
test('handoff current topic and remaining queue follow workstream 011 status', async () => {
  const workstream = JSON.parse(await readFile(
    'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json',
    'utf8',
  ));
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
  if (workstream.status === 'complete') {
    assert.match(current, /Limits & Derivatives/i);
    assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
  } else {
    assert.equal(workstream.status, 'active');
    assert.match(current, /Random Walks & Markov Chains/i);
    assert.match(coordination, /integration queue[^\n]*011[^\n]*012[^\n]*013/i);
  }
});
```

- [ ] **Step 3: Run lifecycle registration RED**

```bash
node --test \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-order-statistics-extremes-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
```

Expected: the new workstream test, the admitted-011 governance test, and the new HANDOFF lifecycle test fail with `ENOENT` for `stochastic-processes-random-walks-markov-chains-011.json`; historical 010 assertions pass.

- [ ] **Step 4: Create the exact active workstream manifest**

Create `src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json`:

```json
{
  "id": "stochastic-processes-random-walks-markov-chains-011",
  "canonicalTopics": [
    "stochastic-processes-stochastic-calculus",
    "random-walks-markov-chains"
  ],
  "status": "active",
  "sourceScopes": [
    {
      "source": "green-book",
      "sourceSections": ["5.1"],
      "evidencePageRanges": [{"startPage": 121, "endPage": 131}],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Audited exactly Green 5.1 theory, 5.1.gamblers-ruin, 5.1.dice-question, 5.1.coin-triplets, and 5.1.color-balls. Ownership is limited to finite-state Markov-chain theory, the existing boundary identity, two pattern/streak families, and ordered-pair recoloring; martingales, continuous-time chains, and unrelated chapter material remain excluded."
    },
    {
      "source": "red-book",
      "sourceSections": ["3.2.1", "3.2.2"],
      "evidencePageRanges": [
        {"startPage": 94, "endPage": 96},
        {"startPage": 115, "endPage": 117},
        {"startPage": 139, "endPage": 139}
      ],
      "reviewOutcome": "bounded-item-level-review",
      "reviewNote": "Audited exactly Red items 3.22, 3.23, and 3.40. Item 3.22 owns the cube positive-return Problem; items 3.23 and 3.40 merge into the existing random-walk-boundary identity. No other Red item or broad section is claimed by 011."
    },
    {
      "source": "150-most-frequently-asked",
      "sourceSections": ["2.6"],
      "evidencePageRanges": [
        {"startPage": 41, "endPage": 43},
        {"startPage": 145, "endPage": 174}
      ],
      "reviewOutcome": "reviewed-no-new-ownership",
      "reviewNote": "Items 10-29 were audited and contain only martingale, Brownian, Itô, SDE, change-of-measure, and stochastic-volatility material outside 011. Terminal items 1-9 remain unchanged, no new 150 coverage rows are added, and aggregate 2.6:: stays pending as a broad mixed-topic container."
    }
  ]
}
```

Do not add `verification`, a commit, a run id, or a success conclusion while status is active.

In `docs/quant-interview/HANDOFF.md`, change only the 011 reservation row state from `design-audit` to `active`. Keep Random Walks as the current bounded topic and keep the integration queue `011 -> 012 -> 013`; no completion section or evidence is added in this active phase.

- [ ] **Step 5: Run the phase-safe registration GREEN**

```bash
node --test \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-order-statistics-extremes-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
npm run check
npm run build
```

Expected: all focused tests pass with workstream status `active`, Random Walks remains the current topic, and 012/013 manifests remain absent; check and build exit 0. The known global `59/39` RED remains intentionally unresolved until Task 8.

- [ ] **Step 6: Commit active registration and lifecycle safety**

```bash
git add -- \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-order-statistics-extremes-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs \
  docs/quant-interview/HANDOFF.md
git commit -m "test: register active random walks workstream"
```

---

### Task 6: Enrich the Existing Boundary Identity and Reconcile Reciprocal Graph Links

**Files:**
- Modify: `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`
- Modify: `src/content/problems/stochastic-processes/random-walk-boundary.md`
- Modify: `src/content/knowledge/concepts/first-step-analysis.md`
- Modify: `src/content/problems/probability/recursive-dice-game-expected-payoff.md`
- Modify: `src/content/problems/probability/expected-pattern-count-by-indicators.md`
- Modify: `src/content/problems/probability/no-consecutive-heads-in-n-tosses.md`

**Interfaces:**
- Consumes: the four new candidate Problem slugs and two Knowledge slugs, plus the existing boundary slug/id and base-existing graph metadata on the latest durable tree.
- Produces: one general absorbing-boundary page that owns all three numerical cases and exact reciprocal links while every pre-existing page retains its prior canonical topic ownership.

- [ ] **Step 1: Append the failing boundary and reciprocal-graph contract**

Append to `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`:

```js
const readText = (file) => readFile(file, 'utf8');

function parseInlineArray(text, field) {
  const match = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'));
  assert.ok(match, `missing inline ${field}`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

test('existing boundary identity is enriched in place with the general absorbing formula', async () => {
  const text = await readText('src/content/problems/stochastic-processes/random-walk-boundary.md');
  assert.match(text, /^problemId: lorien-stochastic-001$/m);
  assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.deepEqual(parseInlineArray(text, 'concepts'), ['finite-state-markov-chains']);
  assert.deepEqual(parseInlineArray(text, 'techniques'), ['first-step-analysis', 'recursion-problem-solving']);
  assert.deepEqual(parseInlineArray(text, 'relatedProblems'), ['random-walk-return-time-on-cube']);
  assert.ok(text.includes('u_i = i/N'));
  assert.ok(text.includes('u_i = [1-(q/p)^i] / [1-(q/p)^N]'));
  assert.match(text, /p\s*=\s*0.*deterministic|deterministic.*p\s*=\s*0/i);
  assert.match(text, /p\s*=\s*1.*deterministic|deterministic.*p\s*=\s*1/i);
  for (const result of ['N=4, i=2, p=1/2', '1/2', 'N=3, i=1, p=2/3', '4/7', 'N=1000, i=80, p=1/2', '92/100', '23/25']) {
    assert.ok(text.replaceAll(' ', '').includes(result.replaceAll(' ', '')), `boundary page missing ${result}`);
  }
  assert.match(text, /u_i.*p.*u_\{?i\+1\}?.*q.*u_\{?i-1\}?/i);
  assert.doesNotMatch(text, /optional stopping/i);
  for (const heading of ['## Problem', '## Think Before Revealing', '## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(text.includes(heading), `boundary page missing ${heading}`);
  }
  assert.ok((text.match(/<details>/g) ?? []).length >= 3);
  assert.match(text, /<summary>Show Solution<\/summary>/);
});

test('coordinator adds exact reciprocal links without re-owning existing pages', async () => {
  const firstStep = await readText('src/content/knowledge/concepts/first-step-analysis.md');
  assert.deepEqual(parseInlineArray(firstStep, 'quantInterviewTopics'), [
    'stochastic-processes-stochastic-calculus',
    'random-walks-markov-chains',
  ]);
  assert.deepEqual(parseInlineArray(firstStep, 'related'), [
    'conditional-expectation-tower-property',
    'finite-state-markov-chains',
    'markov-chain-state-compression',
  ]);

  const expectedProblems = new Map([
    ['src/content/problems/probability/recursive-dice-game-expected-payoff.md', {
      topics: ['probability-statistics', 'expectation-variance-covariance'],
      related: ['conditional-dice-expectation', 'expected-loops-from-random-pairings', 'twelve-before-consecutive-sevens'],
    }],
    ['src/content/problems/probability/expected-pattern-count-by-indicators.md', {
      topics: ['probability-statistics', 'expectation-variance-covariance'],
      related: ['coupon-collector-expectations', 'expected-position-of-first-special-card', 'coin-pattern-hitting-times'],
    }],
    ['src/content/problems/probability/no-consecutive-heads-in-n-tosses.md', {
      topics: ['probability-statistics', 'combinatorial-probability'],
      related: ['coin-pattern-hitting-times'],
    }],
  ]);
  for (const [file, expected] of expectedProblems) {
    const text = await readText(file);
    assert.deepEqual(parseInlineArray(text, 'quantInterviewTopics'), expected.topics, `${file} changed ownership`);
    assert.deepEqual(parseInlineArray(text, 'relatedProblems'), expected.related, `${file} has incorrect reciprocal links`);
  }
});
```

- [ ] **Step 2: Run the graph contract and verify RED**

```bash
node --test tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
```

Expected: manifest tests pass; `existing boundary identity is enriched in place with the general absorbing formula` fails because `concepts` is currently empty rather than `['finite-state-markov-chains']`. The reciprocal-link test also fails if run alone because the new links are absent.

- [ ] **Step 3: Replace the existing boundary page with the general source-neutral treatment**

Retain the path and use this exact frontmatter in `src/content/problems/stochastic-processes/random-walk-boundary.md`:

```yaml
---
problemId: lorien-stochastic-001
title: Random Walk to a Boundary
description: Derive the probability that a finite nearest-neighbor walk reaches its upper absorbing boundary before its lower boundary, for fair, biased, and deterministic steps.
date: 2026-08-16
updated: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walk, Absorbing Boundaries]
tags: [Random Walk, Probability, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [first-step-analysis, recursion-problem-solving]
prerequisites: []
relatedProblems: [random-walk-return-time-on-cube]
family: gamblers-ruin
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: true
---
```

Use this exact mathematical core inside a full S3+ page:

````markdown
## Problem

On states (0,1,\ldots,N), start at (i). Each step moves up with probability (p) and down with probability (q=1-p); states 0 and (N) are absorbing. Find (u_i=P_i(\text{hit }N\text{ before }0)), including fair, biased, and deterministic cases. Then evaluate the three cases listed in the solution.

## Think Before Revealing

Write a boundary-value recurrence before guessing from symmetry.

<details>
<summary>Hint 1</summary>

Use (u_0=0), (u_N=1), and condition on the first step from an interior state.

</details>

<details>
<summary>Hint 2</summary>

For (p\ne q), the characteristic roots are 1 and (q/p). The fair case is the repeated-root limit and is linear in (i).

</details>

<details>
<summary>Show Solution</summary>

## Solution

For (0<i<N), first-step analysis gives

\[
u_i=p\,u_{i+1}+q\,u_{i-1},\qquad u_0=0,\quad u_N=1.
\]

The boundary conditions give

```text
u_i = i/N                                      when p=q=1/2
u_i = [1-(q/p)^i] / [1-(q/p)^N]              when 0<p<1 and p!=q
```

At the deterministic endpoints, (p=0) gives (u_i=0) for every (i<N), while (p=1) gives (u_i=1) for every (i>0). These are stated separately because the biased formula assumes (0<p<1).

The requested evaluations are:

```text
N=4, i=2, p=1/2       -> upper boundary first with probability 1/2
N=3, i=1, p=2/3       -> upper boundary first with probability 4/7
N=1000, i=80, p=1/2   -> zero first with probability 1-80/1000 = 92/100 = 23/25
```

The last line uses the complement of upper-boundary success within this two-absorbing-boundary model.

## Why This Matters

One boundary-value recurrence owns a large family of finite-walk interview wrappers without duplicating their public identity.

## Common Mistakes

- Swapping (p) and (q) inside the ratio (q/p).
- Using the biased expression at (p=0), (p=1), or directly at (p=q).
- Forgetting that “hit zero first” is the complement only under the stated two-boundary stopping model.
- Preserving a plank or casino wrapper as a second public Problem when it has the same recurrence and boundaries.

## Extensions

1. Solve the expected absorption-time recurrence with zero boundary times.
2. Let the up probability depend on the current state and solve the resulting nonconstant difference equations.
3. Compare absorption probabilities with first positive return on a finite graph.

</details>
````

Do not mention or use the optional-stopping method in this workstream.

- [ ] **Step 4: Apply the exact reciprocal frontmatter edits**

Change only the stated relationship arrays on base-existing pages; retain every other frontmatter field and all canonical topics:

```yaml
# src/content/knowledge/concepts/first-step-analysis.md
related: [conditional-expectation-tower-property, finite-state-markov-chains, markov-chain-state-compression]

# src/content/problems/probability/recursive-dice-game-expected-payoff.md
relatedProblems: [conditional-dice-expectation, expected-loops-from-random-pairings, twelve-before-consecutive-sevens]

# src/content/problems/probability/expected-pattern-count-by-indicators.md
relatedProblems: [coupon-collector-expectations, expected-position-of-first-special-card, coin-pattern-hitting-times]

# src/content/problems/probability/no-consecutive-heads-in-n-tosses.md
relatedProblems: [coin-pattern-hitting-times]
```

The four new Problems already carry their candidate-owned forward links; do not edit them in Phase B.

- [ ] **Step 5: Run graph/content GREEN and inspect ownership retention**

```bash
node --test \
  tests/quant-interview-random-walks-markov-chains-content.test.mjs \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  tests/problem-content-contract.test.mjs
npm run check
npm run build
git diff --check
```

Expected: all focused tests pass; check/build and whitespace checks exit 0. The three older probability Problems retain their exact previous topic arrays, and no pre-existing page other than the five coordinator-owned graph/content files changes.

- [ ] **Step 6: Commit the boundary and reciprocal graph gate**

```bash
git add -- \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  src/content/problems/stochastic-processes/random-walk-boundary.md \
  src/content/knowledge/concepts/first-step-analysis.md \
  src/content/problems/probability/recursive-dice-game-expected-payoff.md \
  src/content/problems/probability/expected-pattern-count-by-indicators.md \
  src/content/problems/probability/no-consecutive-heads-in-n-tosses.md
git commit -m "feat: generalize absorbing boundary walks"
```

---

### Task 7: Reconcile the Exact Eight Coverage Rows and Strict Target Validation

**Files:**
- Modify: `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`
- Modify: `src/data/quant-interview/coverage/green-book.json`
- Modify: `src/data/quant-interview/coverage/red-book.json`
- Verify unchanged: `src/data/quant-interview/coverage/150-most-frequently-asked.json`
- Verify unchanged: `src/data/quant-interview/topics/source-topic-map.json`

**Interfaces:**
- Consumes: all real public slugs from Tasks 4 and 6, the active manifest, `validateCoverageLedger`, taxonomy, and existing section-level source routing.
- Produces: exactly eight terminal `random-walks-markov-chains` rows with exact targets, exact `5/2/1` distribution, strict real-target validation, two required Red override reasons, and no 150 or source-map mutation.

- [ ] **Step 1: Append the exact hidden-ownership fixtures and failing tests**

Append to `tests/quant-interview-random-walks-markov-chains-workstream.test.mjs`:

```js
const keyOf = (entry) => `${entry.sourceSection}::${entry.sourceItem ?? ''}`;
const terminalStates = new Set(['canonical-problem', 'merged-duplicate', 'variant', 'knowledge-only']);
const expectedCoverage = {
  'green-book': {
    '5.1::': {
      state: 'knowledge-only',
      canonicalProblems: [],
      canonicalKnowledge: ['finite-state-markov-chains'],
    },
    '5.1.gamblers-ruin::': {
      state: 'canonical-problem',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
    '5.1.dice-question::': {
      state: 'canonical-problem',
      canonicalProblems: ['twelve-before-consecutive-sevens'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '5.1.coin-triplets::': {
      state: 'canonical-problem',
      canonicalProblems: ['coin-pattern-hitting-times'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '5.1.color-balls::': {
      state: 'canonical-problem',
      canonicalProblems: ['random-recoloring-consensus-time'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
  },
  'red-book': {
    '3.2.1::3.22': {
      state: 'canonical-problem',
      canonicalProblems: ['random-walk-return-time-on-cube'],
      canonicalKnowledge: ['finite-state-markov-chains', 'markov-chain-state-compression', 'first-step-analysis'],
    },
    '3.2.1::3.23': {
      state: 'merged-duplicate',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
    '3.2.2::3.40': {
      state: 'merged-duplicate',
      canonicalProblems: ['random-walk-boundary'],
      canonicalKnowledge: ['finite-state-markov-chains', 'first-step-analysis'],
    },
  },
};

test('011 owns exactly eight terminal rows with exact targets and 5/2/1 split', async () => {
  const ledgers = {
    'green-book': await readJson('src/data/quant-interview/coverage/green-book.json'),
    'red-book': await readJson('src/data/quant-interview/coverage/red-book.json'),
  };
  const claimed = [];
  for (const [source, fixtures] of Object.entries(expectedCoverage)) {
    const rows = new Map(ledgers[source].entries.map((entry) => [keyOf(entry), entry]));
    for (const [key, expected] of Object.entries(fixtures)) {
      const row = rows.get(key);
      assert.ok(row, `${source} missing ${key}`);
      assert.equal(row.state, expected.state, `${source} ${key} state`);
      assert.deepEqual(row.canonicalProblems, expected.canonicalProblems, `${source} ${key} Problem targets`);
      assert.deepEqual(row.canonicalKnowledge, expected.canonicalKnowledge, `${source} ${key} Knowledge targets`);
      assert.deepEqual(row.canonicalTopics, ['random-walks-markov-chains']);
      assert.ok((row.resolutionNote ?? '').trim(), `${source} ${key} missing resolution note`);
      claimed.push(row);
    }
    const ownedKeys = ledgers[source].entries
      .filter((entry) => entry.canonicalTopics?.includes('random-walks-markov-chains') && terminalStates.has(entry.state))
      .map(keyOf)
      .sort();
    assert.deepEqual(ownedKeys, Object.keys(fixtures).sort(), `${source} has extra 011 terminal ownership`);
  }
  assert.equal(claimed.length, 8);
  assert.equal(claimed.filter((row) => row.state === 'canonical-problem').length, 5);
  assert.equal(claimed.filter((row) => row.state === 'merged-duplicate').length, 2);
  assert.equal(claimed.filter((row) => row.state === 'knowledge-only').length, 1);
});

test('Red editorial overrides are exact and only required on 3.22 and 3.23', async () => {
  const red = await readJson('src/data/quant-interview/coverage/red-book.json');
  const rows = new Map(red.entries.map((entry) => [keyOf(entry), entry]));
  for (const key of ['3.2.1::3.22', '3.2.1::3.23']) {
    assert.ok((rows.get(key)?.topicOverrideReason ?? '').trim(), `${key} missing topicOverrideReason`);
    assert.match(rows.get(key).topicOverrideReason, /item-level.*stochastic-process/i);
  }
  assert.equal(rows.get('3.2.2::3.40')?.topicOverrideReason, undefined);
});

test('all three ledgers validate against real targets and 150 receives no 011 row', async () => {
  const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const problemSlugs = await markdownSlugs('src/content/problems');
  const knowledgeSlugs = await markdownSlugs('src/content/knowledge');
  const { validateCoverageLedger } = await import('../src/lib/quantInterviewCoverage.mjs');
  for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
    const ledger = await readJson(`src/data/quant-interview/coverage/${source}.json`);
    assert.doesNotThrow(() => validateCoverageLedger(ledger, {
      sourceTopicMap,
      taxonomy,
      problemSlugs,
      knowledgeSlugs,
      allowUnresolvedCanonicalRefs: false,
    }));
  }
  const q150 = await readJson('src/data/quant-interview/coverage/150-most-frequently-asked.json');
  assert.equal(q150.entries.filter((entry) => entry.canonicalTopics?.includes('random-walks-markov-chains')).length, 0);
  const aggregate = q150.entries.find((entry) => keyOf(entry) === '2.6::');
  assert.equal(aggregate?.state, 'pending');
  assert.deepEqual(aggregate?.canonicalProblems, []);
  assert.deepEqual(aggregate?.canonicalKnowledge, []);
});

test('011 uses existing section routing and creates no item-level source-map entries', async () => {
  const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
  const byKey = new Map(sourceTopicMap.entries.map((entry) => [`${entry.source}::${entry.sourceSection}`, entry]));
  assert.deepEqual(byKey.get('green-book::5.1')?.canonicalTopics, ['random-walks-markov-chains']);
  assert.deepEqual(byKey.get('red-book::3.2.1')?.canonicalTopics, ['probability-statistics']);
  assert.deepEqual(byKey.get('red-book::3.2.2')?.canonicalTopics, ['stochastic-processes-stochastic-calculus']);
  assert.equal(sourceTopicMap.entries.some((entry) => /3\.(?:22|23|40)$/.test(entry.sourceSection)), false);
});
```

- [ ] **Step 2: Run the exact-coverage test and verify RED**

```bash
node --test tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
```

Expected: earlier manifest/graph tests pass; `011 owns exactly eight terminal rows with exact targets and 5/2/1 split` fails first because Green `5.1::` is `pending` rather than `knowledge-only`. Red keys `3.22`, `3.23`, and `3.40` are also absent.

- [ ] **Step 3: Replace the five existing Green pending rows with exact terminal objects**

In `src/data/quant-interview/coverage/green-book.json`, preserve entry order and replace only the five `5.1` rows with:

```json
{
  "sourceSection": "5.1",
  "sourceItem": null,
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "knowledge-only",
  "canonicalProblems": [],
  "canonicalKnowledge": ["finite-state-markov-chains"],
  "resolutionNote": "Finite homogeneous Markov-chain theory is represented by reusable Knowledge with visible Interview Checks for matrix orientation, state structure, stationarity, hitting equations, periodicity, and positive return."
},
{
  "sourceSection": "5.1.gamblers-ruin",
  "sourceItem": null,
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "canonical-problem",
  "canonicalProblems": ["random-walk-boundary"],
  "canonicalKnowledge": ["finite-state-markov-chains", "first-step-analysis"],
  "resolutionNote": "This row establishes canonical source ownership for the existing random-walk-boundary identity, enriched once with fair, biased, deterministic, and three numeric boundary cases."
},
{
  "sourceSection": "5.1.dice-question",
  "sourceItem": null,
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "canonical-problem",
  "canonicalProblems": ["twelve-before-consecutive-sevens"],
  "canonicalKnowledge": ["finite-state-markov-chains", "markov-chain-state-compression", "first-step-analysis"],
  "resolutionNote": "The competing total-of-12 and consecutive-seven hazards form a distinct two-state streak-compression Problem with success probability 7/13."
},
{
  "sourceSection": "5.1.coin-triplets",
  "sourceItem": null,
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "canonical-problem",
  "canonicalProblems": ["coin-pattern-hitting-times"],
  "canonicalKnowledge": ["finite-state-markov-chains", "markov-chain-state-compression", "first-step-analysis"],
  "resolutionNote": "One multipart canonical Problem owns the HHH and THH waiting times, their first-hitting race, and the exact length-three second-chooser response guarantee."
},
{
  "sourceSection": "5.1.color-balls",
  "sourceItem": null,
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "canonical-problem",
  "canonicalProblems": ["random-recoloring-consensus-time"],
  "canonicalKnowledge": ["finite-state-markov-chains", "markov-chain-state-compression", "first-step-analysis"],
  "resolutionNote": "Ordered-pair recoloring from distinct initial colors is represented by backward active-lineage coalescence and the exact mean consensus time (n-1)^2."
}
```

- [ ] **Step 4: Append the exact three Red item rows**

In `src/data/quant-interview/coverage/red-book.json`, leave aggregate `3.2.1::` and `3.2.2::` pending and append these nonduplicate item keys:

```json
{
  "sourceSection": "3.2.1",
  "sourceItem": "3.22",
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "canonical-problem",
  "canonicalProblems": ["random-walk-return-time-on-cube"],
  "canonicalKnowledge": ["finite-state-markov-chains", "markov-chain-state-compression", "first-step-analysis"],
  "topicOverrideReason": "Item-level review identifies this cube first-positive-return question as finite-state stochastic-process material despite the broader editorial probability-statistics section.",
  "resolutionNote": "The cube return family is a distinct canonical Problem solved both by the finite-chain mean-return identity and by Hamming-distance compression, with expected positive return 8."
},
{
  "sourceSection": "3.2.1",
  "sourceItem": "3.23",
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "merged-duplicate",
  "canonicalProblems": ["random-walk-boundary"],
  "canonicalKnowledge": ["finite-state-markov-chains", "first-step-analysis"],
  "topicOverrideReason": "Item-level review identifies this finite absorbing-boundary walk as stochastic-process material despite the broader editorial probability-statistics section.",
  "resolutionNote": "The fair finite-plank walk has the same state space, absorbing boundaries, recurrence, and fair solution as random-walk-boundary, so it enriches that identity instead of creating a wrapper duplicate."
},
{
  "sourceSection": "3.2.2",
  "sourceItem": "3.40",
  "canonicalTopics": ["random-walks-markov-chains"],
  "state": "merged-duplicate",
  "canonicalProblems": ["random-walk-boundary"],
  "canonicalKnowledge": ["finite-state-markov-chains", "first-step-analysis"],
  "resolutionNote": "The fair walk on 0 through 1000 starting at 80 is the lower-boundary complement case of random-walk-boundary and evaluates to 92/100 = 23/25 without a second public identity."
}
```

- [ ] **Step 5: Prove Green, Red, 150, routing, and validators are reconciled**

```bash
node --test tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
npm run check
npm run build
git diff --check
git diff --exit-code -- src/data/quant-interview/coverage/150-most-frequently-asked.json src/data/quant-interview/topics/source-topic-map.json
```

Expected: all workstream tests pass; exact owned keys total eight with `5/2/1`; both required Red reasons are nonempty; all three coverage validators use real targets; 150 and source-map diffs are empty; check/build/whitespace gates exit 0.

- [ ] **Step 6: Commit exact hidden ownership**

```bash
git add -- \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  src/data/quant-interview/coverage/green-book.json \
  src/data/quant-interview/coverage/red-book.json
git commit -m "test: reconcile random walks source coverage"
```

---

### Task 8: Reconcile the Exact Global Source-Neutral Regression to 63/41

**Files:**
- Modify: `tests/quant-interview-source-neutral-content.test.mjs`

**Interfaces:**
- Consumes: the exact 59-Problem array, 39-Knowledge topic map, and all six classified public pages already present from candidate intake.
- Produces: exact set equality for 63 classified Problems and 41 classified Knowledge/Technique nodes; no lower-bound assertion and no weakening of source-neutral checks.

- [ ] **Step 1: Re-run the known global regression RED before editing it**

```bash
node --test tests/quant-interview-source-neutral-content.test.mjs
```

Expected: FAIL only in `source-neutral regression discovers exactly the current 59 Problem and 39 Knowledge contracts`; the first strict length assertion reports actual `63` versus expected `59`. The new pages are already present, so changing content to restore 59 is forbidden.

- [ ] **Step 2: Add the four exact Problem slugs to the enumerated set**

In `currentProblemSlugs`, add exactly:

```text
'twelve-before-consecutive-sevens',
'coin-pattern-hitting-times',
'random-recoloring-consensus-time',
'random-walk-return-time-on-cube',
```

Do not remove or reorder away any existing slug, and do not add `random-walk-boundary` again; it is an enriched existing identity.

- [ ] **Step 3: Add the two exact Knowledge topic assignments**

In `expectedKnowledgeTopics`, add:

```text
['finite-state-markov-chains', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
['markov-chain-state-compression', ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains']],
```

- [ ] **Step 4: Replace the exact count test with the post-011 contract**

Use:

```js
test('source-neutral regression discovers exactly the current 63 Problem and 41 Knowledge contracts', async () => {
  const actualProblemSlugs = await classifiedMarkdownSlugs('src/content/problems');
  const actualKnowledgeSlugs = await classifiedMarkdownSlugs('src/content/knowledge');
  const expectedProblemSlugs = [...currentProblemSlugs].sort();
  const expectedKnowledgeSlugs = [...expectedKnowledgeTopics.keys()].sort();

  assert.equal(actualProblemSlugs.length, 63);
  assert.equal(actualKnowledgeSlugs.length, 41);
  assert.deepEqual(actualProblemSlugs, expectedProblemSlugs);
  assert.deepEqual(actualKnowledgeSlugs, expectedKnowledgeSlugs);
});
```

Retain the existing exact array/map equality, public Problem provenance exclusions, exact Knowledge topic checks, and hidden-audit validation. Do not replace equality with `>=`, a subset check, or a count-only check.

- [ ] **Step 5: Run exact-registry and full-tree GREEN**

```bash
node --test \
  tests/quant-interview-source-neutral-content.test.mjs \
  tests/quant-interview-random-walks-markov-chains-content.test.mjs \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
npm run test
npm run check
npm run build
git diff --check
```

Expected: exact source-neutral set equality passes at `63/41`; the entire test suite has zero failures; check/build and whitespace gates exit 0. If a semantic collision was discovered, stop with workstream status active and revise the approved design rather than treating `+4/+2` as a quota.

- [ ] **Step 6: Commit the exact registry reconciliation**

```bash
git add -- tests/quant-interview-source-neutral-content.test.mjs
git commit -m "test: extend source-neutral registry for Markov chains"
```

---

### Task 9: Obtain Qualified and Real CI Evidence, Remove Temporary CI, and Record Factual Closure

**Files:**
- Create temporarily, then delete before final closure: `.github/workflows/quant-interview-random-walks-markov-chains-ci.yml`
- Create: `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`
- Modify: `src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json`
- Modify: `docs/quant-interview/HANDOFF.md`
- Verify phase-safe without further weakening: `tests/quant-interview-parallel-workstream-governance.test.mjs`
- Verify phase-safe without further weakening: `tests/quant-interview-order-statistics-extremes-completion.test.mjs`
- Verify phase-safe without further weakening: `tests/quant-interview-handoff.test.mjs`

**Interfaces:**
- Consumes: the active fully reconciled `63/41` integration tree from Task 8, qualified Linux/WSL-native verification, and GitHub Actions access.
- Produces: a real successful Ubuntu/Node 24 run for an exact 40-character integrated commit, a cleanup commit whose only product delta is temporary-workflow deletion, a completed manifest/HANDOFF backed by that evidence, a final clean tree that passes fresh qualified gates, and a non-rewritten fast-forward durable post-011 state with 012 then 013 remaining.

- [ ] **Step 1: Prove the fully reconciled active tree in a qualified checkout**

In a new WSL shell, reacquire the exact integration HEAD from the real repository, load a fresh copy of the qualified-gate function from that commit, and run:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
active_sha="$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
gate_definition="$(git -C "$repo_source" show "$active_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$integration_ref" "$active_sha" $'npm ci
node --test \\
  tests/quant-interview-random-walks-markov-chains-content.test.mjs \\
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \\
  tests/quant-interview-source-neutral-content.test.mjs \\
  tests/quant-interview-parallel-workstream-governance.test.mjs \\
  tests/quant-interview-order-statistics-extremes-completion.test.mjs \\
  tests/quant-interview-handoff.test.mjs
npm run test
npm run check
npm run build'
```

Expected: every command exits 0; exact registry is `63/41`; manifest remains `active` with no `verification`; HANDOFF still names Random Walks as current; 012 and 013 manifests remain absent. This is the required qualified post-reconciliation local gate.

- [ ] **Step 2: Demonstrate missing external evidence, then add exact temporary Ubuntu/Node 24 CI**

In the coordinator integration worktree, prove the workflow is absent without allowing the intentional RED to terminate the shell:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
active_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$active_sha" =~ ^[0-9a-f]{40}$ ]]
if test -e "$integration_path/$workflow_path"; then
  echo 'expected RED was not reproduced: temporary workflow already exists' >&2
  exit 1
fi
echo "RED confirmed at $active_sha: $workflow_path is absent, so no exact external run can exist yet"
```

Expected: the explicit `RED confirmed` line prints for the validated active SHA; therefore completion metadata still cannot be written.

Use `apply_patch` to create `.github/workflows/quant-interview-random-walks-markov-chains-ci.yml` with this complete file:

```yaml
name: Quant Interview Random Walks Markov Chains CI
on:
  push:
    branches:
      - chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24
  workflow_dispatch:
permissions:
  contents: read
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run check
      - run: npm run build
```

Do not add deploy permissions, write permissions, mutators, path-rewriting steps, or a Windows runner.

- [ ] **Step 3: Commit the exact verification candidate and re-run qualified local gates at that SHA**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
test -f "$integration_path/$workflow_path"
git -C "$integration_path" add -- "$workflow_path"
git -C "$integration_path" commit -m "ci: verify random walks Markov chains integration"
verification_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")" = "$verification_sha"
test "$(git -C "$integration_path" diff-tree --no-commit-id --name-status -r "$verification_sha")" = $'A\t.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
```

Then start a new WSL shell. It must reacquire the verification SHA rather than reuse the variable above:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
verification_sha="$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git -C "$repo_source" cat-file -t "$verification_sha:$workflow_path")" = blob
gate_definition="$(git -C "$repo_source" show "$verification_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$integration_ref" "$verification_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build'
```

Expected: all commands exit 0 for the exact commit that will be sent to GitHub. Keep the manifest active and HANDOFF unchanged.

- [ ] **Step 4: Push without force and require a real successful run for the exact SHA**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
test -z "$(git -C "$integration_path" status --porcelain)"
verification_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")" = "$verification_sha"
gh auth status
repository="$(cd "$integration_path" && gh repo view --json nameWithOwner --jq .nameWithOwner)"
test -n "$repository"
git -C "$integration_path" push -u origin "$integration_ref"

run_id=''
for attempt in $(seq 1 36); do
  runs_json="$(cd "$integration_path" && gh run list \
    --workflow "$workflow_file" \
    --branch "$integration_ref" \
    --commit "$verification_sha" \
    --limit 20 \
    --json databaseId,headSha,headBranch,status,conclusion,workflowName)"
  selected="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_BRANCH="$integration_ref" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const match = runs.find((run) =>
  run.headSha === process.env.QI011_EXPECTED_SHA &&
  run.headBranch === process.env.QI011_EXPECTED_BRANCH &&
  run.workflowName === process.env.QI011_EXPECTED_WORKFLOW
);
if (match) process.stdout.write(`${match.databaseId}\t${match.status}\t${match.conclusion ?? ''}`);
NODE
)"
  if test -z "$selected"; then
    sleep 10
    continue
  fi
  IFS=$'\t' read -r run_id run_status run_conclusion <<<"$selected"
  [[ "$run_id" =~ ^[1-9][0-9]*$ ]]
  if test "$run_status" = completed; then
    test "$run_conclusion" = success
    break
  fi
  test "$run_status" = queued -o "$run_status" = in_progress -o "$run_status" = waiting -o "$run_status" = requested -o "$run_status" = pending
  run_id=''
  sleep 10
done
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]

evidence_json="$(cd "$integration_path" && gh run view "$run_id" --json databaseId,headSha,status,conclusion,jobs,workflowName)"
QI011_EVIDENCE_JSON="$evidence_json" \
QI011_EXPECTED_SHA="$verification_sha" \
QI011_EXPECTED_RUN="$run_id" \
QI011_EXPECTED_WORKFLOW="$workflow_name" \
QI011_EXPECTED_REPOSITORY="$repository" \
node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI011_EVIDENCE_JSON);
const expectedRun = Number(process.env.QI011_EXPECTED_RUN);
if (!/^[^/]+\/[^/]+$/.test(process.env.QI011_EXPECTED_REPOSITORY ?? '')) process.exit(1);
if (!Number.isInteger(expectedRun) || expectedRun <= 0 || evidence.databaseId !== expectedRun) process.exit(1);
if (!/^[0-9a-f]{40}$/.test(process.env.QI011_EXPECTED_SHA ?? '')) process.exit(1);
if (evidence.headSha !== process.env.QI011_EXPECTED_SHA) process.exit(1);
if (evidence.workflowName !== process.env.QI011_EXPECTED_WORKFLOW) process.exit(1);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
const steps = evidence.jobs.flatMap((job) => job.steps ?? []).map((step) => step.name);
for (const command of ['npm run test', 'npm run check', 'npm run build']) {
  if (!steps.some((name) => name.includes(command))) process.exit(1);
}
console.log(JSON.stringify({ commit: evidence.headSha, runId: evidence.databaseId, conclusion: evidence.conclusion }));
NODE
```

Expected: the bounded loop finds the exact workflow, branch, and head SHA within six minutes, waits until it is `completed`, and accepts only `success`; the final JSON contains a 40-character commit and positive run id. A timeout, failed/cancelled run, ambiguous environment, or mismatched workflow/SHA blocks closure. If any product, coverage, graph, or exact-registry correction is made after this run, repeat Steps 3-4 on a new verification commit.

- [ ] **Step 5: Remove temporary CI while 011 is still active and prove cleanup-only GREEN**

Use one new WSL shell. Reacquire the verification commit and successful run, prove the final-tree absence condition is currently RED, delete only the temporary workflow through Git history, commit that deletion, and run a fresh qualified gate at the cleanup SHA:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
test -z "$(git -C "$integration_path" status --porcelain)"
verification_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
test -f "$integration_path/$workflow_path"
if test ! -e "$integration_path/$workflow_path"; then
  echo 'expected absence RED was not reproduced' >&2
  exit 1
fi
echo "RED confirmed at $verification_sha: temporary workflow is still present"

runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
selected="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
run_id="$selected"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]

git -C "$integration_path" rm -- "$workflow_path"
test "$(git -C "$integration_path" diff --name-status "$verification_sha")" = $'D\t.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
git -C "$integration_path" add -u -- "$workflow_path"
git -C "$integration_path" commit -m "chore: remove random walks integration CI"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$verification_sha" "$cleanup_sha"
test "$(git -C "$integration_path" rev-list --count "$verification_sha..$cleanup_sha")" = 1
test "$(git -C "$integration_path" diff --name-status "$verification_sha..$cleanup_sha")" = $'D\t.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
test ! -e "$integration_path/$workflow_path"
test -z "$(git -C "$integration_path" status --porcelain)"

gate_definition="$(git -C "$repo_source" show "$cleanup_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$integration_ref" "$cleanup_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build\ntest ! -e .github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
```

Expected: the positive run is reacquired from GitHub, the cleanup commit is the only commit after the verification SHA, its only delta is the workflow deletion, the manifest remains active, and the fresh LF-normalized checkout passes test/check/build with the workflow absent. No stored shell variable is needed by a later step.

- [ ] **Step 6: Write the completion contract and verify RED before sealing state**

Create `tests/quant-interview-random-walks-markov-chains-completion.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const workstreamPath = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

test('workstream 011 closes only with real exact verification evidence', async () => {
  const workstream = await readJson(workstreamPath);
  assert.equal(workstream.status, 'complete');
  assert.match(workstream.verification?.commit ?? '', /^[0-9a-f]{40}$/);
  assert.ok(Number.isInteger(workstream.verification?.runId));
  assert.ok(workstream.verification.runId > 0);
  assert.deepEqual(workstream.verification?.commands, ['npm run test', 'npm run check', 'npm run build']);
  assert.equal(workstream.verification?.conclusion, 'success');
});

test('HANDOFF records exact 011 closure and advances only to 012', async () => {
  const workstream = await readJson(workstreamPath);
  const handoff = await readFile('docs/quant-interview/HANDOFF.md', 'utf8');
  if (workstream.status !== 'complete') {
    assert.equal(workstream.status, 'active');
    return;
  }
  assert.match(handoff, /stochastic-processes-random-walks-markov-chains-011/);
  assert.match(handoff, new RegExp(workstream.verification.commit));
  assert.match(handoff, new RegExp(String(workstream.verification.runId)));
  for (const slug of [
    'finite-state-markov-chains',
    'markov-chain-state-compression',
    'twelve-before-consecutive-sevens',
    'coin-pattern-hitting-times',
    'random-recoloring-consensus-time',
    'random-walk-return-time-on-cube',
    'random-walk-boundary',
  ]) assert.match(handoff, new RegExp(slug));
  assert.match(handoff, /8[^\n]*(?:terminal|claimed|coverage|source)/i);
  assert.match(handoff, /5[^\n]*canonical-problem/i);
  assert.match(handoff, /2[^\n]*merged-duplicate/i);
  assert.match(handoff, /1[^\n]*knowledge-only/i);
  assert.match(handoff, /63 canonical Problems/i);
  assert.match(handoff, /41 explicitly topic-classified|41 topic-classified/i);
  assert.match(handoff, /150[^\n]*(?:reviewed-no-new-ownership|no new ownership|no new coverage)/i);
  const current = handoff.split(/Current bounded topic:/i)[1]?.split(/## /)[0] ?? '';
  assert.match(current, /Calculus & Differential Equations/i);
  assert.match(current, /Limits & Derivatives/i);
  assert.doesNotMatch(current, /Random Walks & Markov Chains|Reasoning & Communication/i);
  const coordination = handoff.split(/## Parallel workstream coordination/i)[1]?.split(/## /)[0] ?? '';
  assert.match(coordination, /completed queue entry[^\n]*011/i);
  assert.match(coordination, /remaining integration queue[^\n]*012[^\n]*013/i);
});

test('temporary 011 CI is absent from the completed tree', async () => {
  await assert.rejects(access('.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'));
});
```

Run:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
completion_test='tests/quant-interview-random-walks-markov-chains-completion.test.mjs'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
verification_sha="$(git -C "$integration_path" log --diff-filter=A -1 --format=%H -- "$workflow_path")"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$verification_sha" "$cleanup_sha"
runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
test "$(git -C "$integration_path" status --short)" = "?? $completion_test"
cd "$integration_path"
set +e
node --test "$completion_test" > .qi011-completion-red.log 2>&1
red_exit=$?
set -e
test "$red_exit" -ne 0
grep -F 'not ok 1 - workstream 011 closes only with real exact verification evidence' .qi011-completion-red.log
grep -E '^# fail 1$' .qi011-completion-red.log
rm -- .qi011-completion-red.log
```

Expected: the script exits 0 only after proving the test command itself failed with exactly one failed subtest, `workstream 011 closes only with real exact verification evidence`, because manifest status is still `active`; the HANDOFF phase-safe test and workflow-absence test pass.

- [ ] **Step 7: Re-read evidence and prove it still applies before writing durable facts**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
completion_test='tests/quant-interview-random-walks-markov-chains-completion.test.mjs'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
verification_sha="$(git -C "$integration_path" log --diff-filter=A -1 --format=%H -- "$workflow_path")"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$verification_sha" "$cleanup_sha"
test "$(git -C "$integration_path" rev-list --count "$verification_sha..$cleanup_sha")" = 1
test "$(git -C "$integration_path" diff --name-status "$verification_sha..$cleanup_sha")" = $'D\t.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
test ! -e "$integration_path/$workflow_path"
test "$(git -C "$integration_path" status --short)" = "?? $completion_test"
gh auth status
repository="$(cd "$integration_path" && gh repo view --json nameWithOwner --jq .nameWithOwner)"
test -n "$repository"
runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
evidence_json="$(cd "$integration_path" && gh run view "$run_id" --json databaseId,headSha,status,conclusion,workflowName)"
QI011_EVIDENCE_JSON="$evidence_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_RUN="$run_id" QI011_EXPECTED_WORKFLOW="$workflow_name" QI011_EXPECTED_REPOSITORY="$repository" node --input-type=module <<'NODE'
const evidence = JSON.parse(process.env.QI011_EVIDENCE_JSON);
const runId = Number(process.env.QI011_EXPECTED_RUN);
if (!/^[^/]+\/[^/]+$/.test(process.env.QI011_EXPECTED_REPOSITORY ?? '')) process.exit(1);
if (!/^[0-9a-f]{40}$/.test(process.env.QI011_EXPECTED_SHA ?? '')) process.exit(1);
if (!Number.isInteger(runId) || runId <= 0 || evidence.databaseId !== runId) process.exit(1);
if (evidence.headSha !== process.env.QI011_EXPECTED_SHA || evidence.workflowName !== process.env.QI011_EXPECTED_WORKFLOW) process.exit(1);
if (evidence.status !== 'completed' || evidence.conclusion !== 'success') process.exit(1);
NODE
```

Expected: the exact verification commit and positive run id are reacquired without prior-shell state; the only committed delta through `cleanup_sha` is the workflow deletion; the only uncommitted file is the RED completion contract; GitHub still reports the exact SHA, completed status, and success. Any other delta blocks sealing.

- [ ] **Step 8: Deterministically seal the manifest and HANDOFF with reacquired evidence**

Run this self-contained script from a new WSL shell. It validates the repository, branch, cleanup ancestry, absent workflow, exact GitHub evidence, active manifest, and exact post-010 HANDOFF anchors before computing either output. It then writes stable two-space JSON and LF Markdown, rereads both files, and rejects unresolved marker tokens.

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
completion_test='tests/quant-interview-random-walks-markov-chains-completion.test.mjs'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
verification_sha="$(git -C "$integration_path" log --diff-filter=A -1 --format=%H -- "$workflow_path")"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$verification_sha" "$cleanup_sha"
test "$(git -C "$integration_path" rev-list --count "$verification_sha..$cleanup_sha")" = 1
test "$(git -C "$integration_path" diff --name-status "$verification_sha..$cleanup_sha")" = $'D\t.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
test ! -e "$integration_path/$workflow_path"
test "$(git -C "$integration_path" status --short)" = "?? $completion_test"
gh auth status
repository="$(cd "$integration_path" && gh repo view --json nameWithOwner --jq .nameWithOwner)"
test -n "$repository"
runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
evidence_json="$(cd "$integration_path" && gh run view "$run_id" --json databaseId,headSha,status,conclusion,jobs,workflowName)"

cd "$integration_path"
QI011_EVIDENCE_JSON="$evidence_json" \
QI011_EXPECTED_COMMIT="$verification_sha" \
QI011_EXPECTED_RUN="$run_id" \
QI011_EXPECTED_WORKFLOW="$workflow_name" \
QI011_EXPECTED_REPOSITORY="$repository" \
node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const manifestPath = 'src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json';
const handoffPath = 'docs/quant-interview/HANDOFF.md';
const verifiedCommit = process.env.QI011_EXPECTED_COMMIT ?? '';
const runId = Number(process.env.QI011_EXPECTED_RUN);
const evidence = JSON.parse(process.env.QI011_EVIDENCE_JSON ?? '{}');
assert.match(process.env.QI011_EXPECTED_REPOSITORY ?? '', /^[^/]+\/[^/]+$/);
assert.match(verifiedCommit, /^[0-9a-f]{40}$/);
assert.ok(Number.isInteger(runId) && runId > 0);
assert.equal(evidence.databaseId, runId);
assert.equal(evidence.headSha, verifiedCommit);
assert.equal(evidence.workflowName, process.env.QI011_EXPECTED_WORKFLOW);
assert.equal(evidence.status, 'completed');
assert.equal(evidence.conclusion, 'success');
const stepNames = evidence.jobs.flatMap((job) => job.steps ?? []).map((step) => step.name);
for (const command of ['npm run test', 'npm run check', 'npm run build']) {
  assert.ok(stepNames.some((name) => name.includes(command)), `evidence missing ${command}`);
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
assert.equal(manifest.id, 'stochastic-processes-random-walks-markov-chains-011');
assert.equal(manifest.status, 'active');
assert.equal(Object.hasOwn(manifest, 'verification'), false);
manifest.status = 'complete';
manifest.verification = {
  commit: verifiedCommit,
  runId,
  commands: ['npm run test', 'npm run check', 'npm run build'],
  conclusion: 'success',
};
const manifestOut = `${JSON.stringify(manifest, null, 2)}\n`;

const handoffRaw = await readFile(handoffPath, 'utf8');
assert.doesNotMatch(handoffRaw.replaceAll('\r\n', ''), /\r/);
let handoffOut = handoffRaw.replaceAll('\r\n', '\n');
assert.doesNotMatch(handoffOut, /\r/);
function replaceExactlyOnce(input, before, after, label) {
  const first = input.indexOf(before);
  assert.notEqual(first, -1, `missing HANDOFF anchor: ${label}`);
  assert.equal(input.indexOf(before, first + before.length), -1, `duplicate HANDOFF anchor: ${label}`);
  return `${input.slice(0, first)}${after}${input.slice(first + before.length)}`;
}

const oldCorpus = `## Public corpus state after ten workstreams

The current source-neutral regression contract discovers exactly **59 canonical Problems** and **39 explicitly topic-classified Knowledge / Technique nodes**.`;
const completedEleven = `## Completed cross-book workstream 11

\`stochastic-processes-random-walks-markov-chains-011\`

Scope: **Stochastic Processes & Stochastic Calculus → Random Walks & Markov Chains**.

Content-complete verification:

- commit \`${verifiedCommit}\`
- GitHub Actions run \`${runId}\`
- commands: \`npm run test\`, \`npm run check\`, \`npm run build\`
- conclusion: success

The machine-readable workstream is \`status: complete\` and stores exactly this real verification evidence.

### Canonical Knowledge

- \`finite-state-markov-chains\` — transition matrices, communicating and closed classes, stationarity, periodicity, hitting equations, and positive return.
- \`markov-chain-state-compression\` — sufficient streak/suffix states, strong lumpability, Hamming symmetry, target preservation, and backward lineages.

### Canonical Problems and enriched identity

- \`twelve-before-consecutive-sevens\`
- \`coin-pattern-hitting-times\`
- \`random-recoloring-consensus-time\`
- \`random-walk-return-time-on-cube\`
- \`random-walk-boundary\` — enriched in place as the existing absorbing-boundary identity.

All four new Problems are independently authored, source-neutral, solved, and S3+. The existing boundary page retains its slug, problem id, and canonical topics.

### Cross-book semantic decisions and graph boundaries

Exactly **8 terminal claimed source rows** are closed: **5 Green plus 3 Red**. The exact state split is **5 \`canonical-problem\` / 2 \`merged-duplicate\` / 1 \`knowledge-only\`**. Green gambler's ruin owns the existing \`random-walk-boundary\` identity; both Red boundary rows are merged duplicates of that same identity.

The 150-question review of items 10-29 is \`reviewed-no-new-ownership\`: terminal items 1-9 remain unchanged, no 150 coverage row was added, and aggregate \`2.6::\` remains \`pending\`.

The finite-chain and state-compression Knowledge nodes link reciprocally through first-step analysis. Dice and coin pages link to their older expectation/combinatorial neighbors, and cube return links reciprocally with the boundary walk. Every older page retains its prior canonical topic ownership.

Martingales and optional stopping, Brownian motion, Itô calculus, SDEs, continuous-time chains, general dynamic programming, and optimal stopping remain outside workstream 011.

## Public corpus state after eleven workstreams

The current source-neutral regression contract discovers exactly **63 canonical Problems** and **41 explicitly topic-classified Knowledge / Technique nodes**.`;
handoffOut = replaceExactlyOnce(handoffOut, oldCorpus, completedEleven, 'post-010 corpus checkpoint');

const orderStatisticsHistory = `Historical transition marker: **Order Statistics & Extremes** is fully closed. Its two canonical Knowledge nodes, four S3+ Problems, five terminal hidden source rows, four-canonical-plus-one-merged state split, cross-source uniform-extrema merge, Random Ants collision-relabeling boundary, reciprocal public graph links, exact 59/39 source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.`;
const randomWalkHistory = `Historical transition marker: **Random Walks & Markov Chains** is fully closed. Its two canonical Knowledge nodes, four new S3+ Problems, enriched absorbing-boundary identity, eight terminal hidden source rows, exact 5/2/1 state split, reciprocal public graph links, 63/41 source-neutral corpus contract, and real verification evidence are durable repository state. This paragraph records lineage only and does not authorize reopening that bounded topic.`;
handoffOut = replaceExactlyOnce(handoffOut, orderStatisticsHistory, `${orderStatisticsHistory}\n\n${randomWalkHistory}`, 'historical transition marker');

const oldCurrent = `Current bounded topic:

**Stochastic Processes & Stochastic Calculus → Random Walks & Markov Chains.**

Proceed by resolving random-walk and Markov-chain material across all three verified sources before authoring. Reuse existing conditioning and first-step-analysis Knowledge where appropriate; distinguish genuine state-transition machinery from one-step expectation recursions, martingales, and continuous-time process wrappers; preserve prior semantic ownership instead of reopening closed workstreams.`;
const newCurrent = `Current bounded topic:

**Calculus & Differential Equations → Limits & Derivatives.**

Coordinator integration proceeds in serialized order: workstream 012 before workstream 013. Preserve completed Random Walks & Markov Chains ownership, exact corpus counts, and shared-state history while reviewing the bounded Limits & Derivatives evidence pool.`;
handoffOut = replaceExactlyOnce(handoffOut, oldCurrent, newCurrent, 'current bounded topic');

const activeRow = '| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | active |';
const completeRow = '| 1 | 011 | `random-walks-markov-chains` | `chatgpt/quant-interview-workstream-random-walks-markov-chains-2026-08-23` | complete |';
handoffOut = replaceExactlyOnce(handoffOut, activeRow, completeRow, '011 reservation state');
const oldQueue = 'Integration queue: **011 → 012 → 013**. A candidate stays `active` during implementation and is not `complete` until the coordinator integrates it on the latest durable base, reconciles shared state, obtains fresh local and real CI verification for the exact commit, and records factual closure here.';
const newQueue = 'Completed queue entry: **011**. Remaining integration queue: **012 → 013**. A candidate stays `active` during implementation and is not `complete` until the coordinator integrates it on the latest durable base, reconciles shared state, obtains fresh local and real CI verification for the exact commit, and records factual closure here.';
handoffOut = replaceExactlyOnce(handoffOut, oldQueue, newQueue, 'serialized integration queue');

const forbidden = [
  ['T', 'BD'].join(''),
  ['T', 'ODO'].join(''),
  ['verification', 'Sha'].join(''),
  ['successful', 'RunId'].join(''),
  '<' + 'commit' + '>',
  '<' + 'run' + '>',
];
for (const token of forbidden) {
  assert.equal(manifestOut.includes(token), false, `manifest contains unresolved marker ${token}`);
  assert.equal(handoffOut.includes(token), false, `HANDOFF contains unresolved marker ${token}`);
}
assert.match(handoffOut, new RegExp(verifiedCommit));
assert.match(handoffOut, new RegExp(String(runId)));
assert.match(handoffOut, /63 canonical Problems/);
assert.match(handoffOut, /41 explicitly topic-classified Knowledge/);
assert.match(handoffOut, /Remaining integration queue: \*\*012 → 013\*\*/);

await Promise.all([
  writeFile(manifestPath, manifestOut, 'utf8'),
  writeFile(handoffPath, handoffOut, 'utf8'),
]);
const [manifestCheck, handoffCheck] = await Promise.all([
  readFile(manifestPath, 'utf8'),
  readFile(handoffPath, 'utf8'),
]);
assert.equal(manifestCheck, manifestOut);
assert.equal(handoffCheck, handoffOut);
assert.doesNotMatch(handoffCheck, /\r/);
for (const token of forbidden) {
  assert.equal(manifestCheck.includes(token), false);
  assert.equal(handoffCheck.includes(token), false);
}
console.log(JSON.stringify({ commit: verifiedCommit, runId, manifest: manifestPath, handoff: handoffPath }));
NODE
```

Expected: the final JSON prints the literal validated evidence and both paths. The script changes only manifest status/evidence and the finished HANDOFF sections shown above; it preserves every earlier historical section and makes no 150-ledger, taxonomy, source-map, 012, or 013 claim.

- [ ] **Step 9: Run completion/lifecycle/full GREEN as a local diagnostic before committing**

This worktree-on-`/mnt/c` run is diagnostic only; authoritative final evidence comes from Step 11's fresh qualified checkout. The block reacquires the exact verification run and rejects any unexpected dirty path before testing:

```bash
set -euo pipefail
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
manifest_path='src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
workflow_commit="$(git -C "$integration_path" log --diff-filter=A -1 --format=%H -- "$workflow_path")"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$workflow_commit" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$workflow_commit" "$cleanup_sha"
test ! -e "$integration_path/$workflow_path"
evidence_fields="$(QI011_MANIFEST_PATH="$integration_path/$manifest_path" node --input-type=module <<'NODE'
import { readFile } from 'node:fs/promises';
const workstream = JSON.parse(await readFile(process.env.QI011_MANIFEST_PATH, 'utf8'));
const commit = workstream.verification?.commit ?? '';
const runId = workstream.verification?.runId;
if (workstream.status !== 'complete' || !/^[0-9a-f]{40}$/.test(commit) || !Number.isInteger(runId) || runId <= 0) process.exit(1);
process.stdout.write(`${commit}\t${runId}`);
NODE
)"
IFS=$'\t' read -r verification_sha run_id <<<"$evidence_fields"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
test "$verification_sha" = "$workflow_commit"
runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_RUN="$run_id" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const runId = Number(process.env.QI011_EXPECTED_RUN);
const run = runs.find((item) => item.databaseId === runId);
if (!run || run.headSha !== process.env.QI011_EXPECTED_SHA || run.workflowName !== process.env.QI011_EXPECTED_WORKFLOW || run.status !== 'completed' || run.conclusion !== 'success') process.exit(1);
NODE
expected_status=$' M docs/quant-interview/HANDOFF.md\n M src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json\n?? tests/quant-interview-random-walks-markov-chains-completion.test.mjs'
test "$(git -C "$integration_path" status --short)" = "$expected_status"
cd "$integration_path"
node --test \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs \
  tests/quant-interview-parallel-workstream-governance.test.mjs \
  tests/quant-interview-order-statistics-extremes-completion.test.mjs \
  tests/quant-interview-handoff.test.mjs
npm run test
npm run check
npm run build
test ! -e .github/workflows/quant-interview-random-walks-markov-chains-ci.yml
git diff --check
```

Expected: every focused and full test passes; check/build/absence/whitespace gates exit 0; 010 remains durable history; 011 is complete with exact evidence; current topic is 012; remaining queue is 012 then 013; 012/013 manifests remain absent.

- [ ] **Step 10: Commit only the three factual-closure files**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
integration_path='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/quant-interview-integration-random-walks-markov-chains-011'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
test "$(git -C "$integration_path" symbolic-ref --short HEAD)" = "$integration_ref"
cleanup_sha="$(git -C "$integration_path" rev-parse HEAD)"
verification_sha="$(git -C "$integration_path" log --diff-filter=A -1 --format=%H -- "$workflow_path")"
[[ "$cleanup_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
git -C "$integration_path" merge-base --is-ancestor "$verification_sha" "$cleanup_sha"
runs_json="$(cd "$integration_path" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
test ! -e "$integration_path/$workflow_path"
expected_status=$' M docs/quant-interview/HANDOFF.md\n M src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json\n?? tests/quant-interview-random-walks-markov-chains-completion.test.mjs'
test "$(git -C "$integration_path" status --short)" = "$expected_status"
git -C "$integration_path" add -- \
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs \
  src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json \
  docs/quant-interview/HANDOFF.md
git -C "$integration_path" commit -m "docs: complete random walks Markov chains workstream"
closure_sha="$(git -C "$integration_path" rev-parse HEAD)"
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
test "$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")" = "$closure_sha"
test -z "$(git -C "$integration_path" status --porcelain)"
test ! -e "$integration_path/$workflow_path"
```

Expected: the positive evidence is reacquired, exactly the three listed files are committed, the temporary workflow remains absent, and the integration worktree is clean.

- [ ] **Step 11: Verify the exact closure commit in a fresh qualified checkout**

Start a new WSL shell and reacquire every input:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_path='.github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
closure_sha="$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")"
verification_sha="$(git -C "$repo_source" log --diff-filter=A -1 --format=%H "$closure_sha" -- "$workflow_path")"
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
runs_json="$(cd "$repo_source" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
run_id="$(QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const run = runs.find((item) => item.headSha === process.env.QI011_EXPECTED_SHA && item.workflowName === process.env.QI011_EXPECTED_WORKFLOW && item.status === 'completed' && item.conclusion === 'success');
if (run) process.stdout.write(String(run.databaseId));
NODE
)"
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
gate_definition="$(git -C "$repo_source" show "$closure_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$integration_ref" "$closure_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build\ntest ! -e .github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
```

Expected: all commands exit 0. A failure requires a corrective commit and another fresh qualified run; never amend or rewrite the closure commit.

- [ ] **Step 12: Review the final allowlisted diff and forbidden no-delta surfaces**

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
git -C "$repo_source" fetch origin "$durable_ref"
durable_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
remote_durable_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
closure_sha="$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")"
[[ "$durable_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$remote_durable_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
test "$durable_sha" = "$remote_durable_sha"
git -C "$repo_source" merge-base --is-ancestor "$durable_sha" "$closure_sha"
expected_final_files=(
  docs/quant-interview/HANDOFF.md
  docs/superpowers/specs/2026-08-24-quant-interview-random-walks-markov-chains-design.md
  docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md
  src/content/knowledge/concepts/finite-state-markov-chains.md
  src/content/knowledge/concepts/markov-chain-state-compression.md
  src/content/knowledge/concepts/first-step-analysis.md
  src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md
  src/content/problems/stochastic-processes/coin-pattern-hitting-times.md
  src/content/problems/stochastic-processes/random-recoloring-consensus-time.md
  src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md
  src/content/problems/stochastic-processes/random-walk-boundary.md
  src/content/problems/probability/recursive-dice-game-expected-payoff.md
  src/content/problems/probability/expected-pattern-count-by-indicators.md
  src/content/problems/probability/no-consecutive-heads-in-n-tosses.md
  src/data/quant-interview/coverage/green-book.json
  src/data/quant-interview/coverage/red-book.json
  src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json
  tests/quant-interview-random-walks-markov-chains-content.test.mjs
  tests/quant-interview-random-walks-markov-chains-workstream.test.mjs
  tests/quant-interview-random-walks-markov-chains-completion.test.mjs
  tests/quant-interview-source-neutral-content.test.mjs
  tests/quant-interview-parallel-workstream-governance.test.mjs
  tests/quant-interview-order-statistics-extremes-completion.test.mjs
  tests/quant-interview-handoff.test.mjs
)
diff -u \
  <(printf '%s\n' "${expected_final_files[@]}" | sort) \
  <(git -C "$repo_source" diff --name-only "$durable_sha..$closure_sha" | sort)
git -C "$repo_source" diff --check "$durable_sha..$closure_sha"
git -C "$repo_source" diff --exit-code "$durable_sha..$closure_sha" -- \
  src/data/quant-interview/coverage/150-most-frequently-asked.json \
  src/data/quant-interview/topics/source-topic-map.json \
  src/data/quant-interview/topics/taxonomy.json
if git -C "$repo_source" cat-file -e "$closure_sha:.github/workflows/quant-interview-random-walks-markov-chains-ci.yml" 2>/dev/null; then
  echo 'temporary workflow survived in the closure tree' >&2
  exit 1
fi
```

Expected: exact allowlist equality, no whitespace errors, no 150/source-map/taxonomy delta, and no temporary CI. Review every allowed diff semantically; an allowlist match does not excuse incorrect content.

- [ ] **Step 13: Fast-forward only the durable coordinator branch and verify the exact post-011 state**

In a new WSL shell, fetch the named durable ref explicitly, compare the fetched ref to `ls-remote`, validate ancestry to the exact integration closure, and fast-forward only the already-existing clean durable worktree:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
test -n "${WSL_DISTRO_NAME:-}"
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
git -C "$repo_source" fetch origin "$durable_ref"
fetched_durable_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
remote_durable_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
closure_sha="$(git -C "$repo_source" rev-parse "refs/heads/$integration_ref^{commit}")"
local_durable_sha="$(git -C "$repo_source" rev-parse "refs/heads/$durable_ref^{commit}")"
[[ "$fetched_durable_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$remote_durable_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$closure_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$local_durable_sha" =~ ^[0-9a-f]{40}$ ]]
test "$fetched_durable_sha" = "$remote_durable_sha"
test "$local_durable_sha" = "$remote_durable_sha"
git -C "$repo_source" merge-base --is-ancestor "$remote_durable_sha" "$closure_sha"

durable_worktree="$(git -C "$repo_source" worktree list --porcelain | awk -v ref="refs/heads/$durable_ref" '
  $1 == "worktree" { path = substr($0, 10) }
  $1 == "branch" && $2 == ref { print path }
')"
test -n "$durable_worktree"
durable_worktree="$(realpath "$durable_worktree")"
case "$durable_worktree" in
  "$repo_source"|/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/worktrees/*) ;;
  *) echo "unexpected durable worktree: $durable_worktree" >&2; exit 1 ;;
esac
test "$(git -C "$durable_worktree" symbolic-ref --short HEAD)" = "$durable_ref"
test -z "$(git -C "$durable_worktree" status --porcelain)"
git -C "$durable_worktree" merge --ff-only "$integration_ref"
test "$(git -C "$durable_worktree" rev-parse HEAD)" = "$closure_sha"
git -C "$durable_worktree" push origin "$durable_ref"
git -C "$repo_source" fetch origin "$durable_ref"
post_011_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
post_remote_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
[[ "$post_011_sha" =~ ^[0-9a-f]{40}$ ]]
test "$post_011_sha" = "$closure_sha"
test "$post_remote_sha" = "$closure_sha"
test "$(git -C "$durable_worktree" rev-parse HEAD)" = "$closure_sha"
```

Expected: if any ref equality or ancestry assertion fails, do not merge, rebase, reset, force-push, or overwrite files. Return to Task 4, reconcile onto the new durable SHA, and repeat every affected local and CI gate.

Finally, start another new WSL shell. Reacquire the updated durable SHA, the completed manifest's evidence, and the exact successful run, then invoke the qualified gate at the named durable ref:

```bash
set -euo pipefail
repo_source='/mnt/c/Users/Lorien/Documents/Codex/2026-08-23/referenced-chatgpt-conversation-this-is-an/work/lorien-lab.github.io'
plan_path='docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md'
manifest_path='src/data/quant-interview/workstreams/stochastic-processes-random-walks-markov-chains-011.json'
durable_ref='chatgpt/quant-interview-workstream-combinatorial-probability-2026-08-17'
integration_ref='chatgpt/quant-interview-integration-random-walks-markov-chains-011-2026-08-24'
workflow_file='quant-interview-random-walks-markov-chains-ci.yml'
workflow_name='Quant Interview Random Walks Markov Chains CI'
test "$(git -C "$repo_source" rev-parse --is-inside-work-tree)" = true
git -C "$repo_source" fetch origin "$durable_ref"
post_011_sha="$(git -C "$repo_source" rev-parse "refs/remotes/origin/$durable_ref^{commit}")"
remote_sha="$(git -C "$repo_source" ls-remote --exit-code --heads origin "refs/heads/$durable_ref" | awk 'NR==1 {print $1}')"
[[ "$post_011_sha" =~ ^[0-9a-f]{40}$ ]]
test "$post_011_sha" = "$remote_sha"
manifest_json="$(git -C "$repo_source" show "$post_011_sha:$manifest_path")"
evidence_fields="$(QI011_MANIFEST_JSON="$manifest_json" node --input-type=module <<'NODE'
const workstream = JSON.parse(process.env.QI011_MANIFEST_JSON);
if (workstream.status !== 'complete') process.exit(1);
const commit = workstream.verification?.commit ?? '';
const runId = workstream.verification?.runId;
if (!/^[0-9a-f]{40}$/.test(commit) || !Number.isInteger(runId) || runId <= 0) process.exit(1);
process.stdout.write(`${commit}\t${runId}`);
NODE
)"
IFS=$'\t' read -r verification_sha run_id <<<"$evidence_fields"
[[ "$verification_sha" =~ ^[0-9a-f]{40}$ ]]
[[ "$run_id" =~ ^[1-9][0-9]*$ ]]
runs_json="$(cd "$repo_source" && gh run list --workflow "$workflow_file" --branch "$integration_ref" --commit "$verification_sha" --limit 20 --json databaseId,headSha,status,conclusion,workflowName)"
QI011_RUNS_JSON="$runs_json" QI011_EXPECTED_SHA="$verification_sha" QI011_EXPECTED_RUN="$run_id" QI011_EXPECTED_WORKFLOW="$workflow_name" node --input-type=module <<'NODE'
const runs = JSON.parse(process.env.QI011_RUNS_JSON);
const runId = Number(process.env.QI011_EXPECTED_RUN);
const match = runs.find((run) => run.databaseId === runId);
if (!match || match.headSha !== process.env.QI011_EXPECTED_SHA || match.workflowName !== process.env.QI011_EXPECTED_WORKFLOW || match.status !== 'completed' || match.conclusion !== 'success') process.exit(1);
NODE
gate_definition="$(git -C "$repo_source" show "$post_011_sha:$plan_path" | awk '/^run_qi011_qualified_gate\(\) \($/{emit=1} emit{print} emit && /^\)$/{emit=0}')"
test -n "$gate_definition"
eval "$gate_definition"
unset gate_definition
run_qi011_qualified_gate "origin/$durable_ref" "$post_011_sha" $'npm ci\nnpm run test\nnpm run check\nnpm run build\ntest ! -e .github/workflows/quant-interview-random-walks-markov-chains-ci.yml'
```

Expected: all commands exit 0 on the exact durable post-011 SHA. Only now report authoritative 011 completion, the real verification SHA/run id, exact eight-row `5/2/1` closure, `63/41` checkpoint, clean CI removal, and remaining serialized queue 012 then 013. Never touch `main`.

---

## Final Self-Review Checklist

```text
[ ] exactly 9 task headings appear, ordered Task 1 through Task 9
[ ] Phase A diff is exactly seven candidate-created files and no base-existing/shared edit
[ ] candidate report says active and non-authoritative
[ ] finite-chain Knowledge covers row convention, structure, stationarity/periodicity, hitting equations, positive return, and failure cases
[ ] state-compression Knowledge covers streak/suffix fallback, Hamming symmetry, strong lumpability, target preservation, and backward lineages
[ ] dice Problem derives the exact two-state system and 7/13
[ ] coin Problem derives 14, 8, 1/8, and all eight response-table rows with minimum 2/3
[ ] recoloring Problem freezes ordered distinct pairs, no-change updates, distinct initial colors, (n-1)^2, n=1, and replacement-sampling contrast
[ ] cube Problem defines positive return and derives 8 by stationarity and Hamming distance
[ ] random-walk-boundary retains slug/id and includes fair, biased, deterministic, 1/2, 4/7, and 23/25 cases without optional stopping
[ ] reciprocal links are exact and all older canonical topic arrays are retained
[ ] manifest has exact Green/Red/150 sections and page ranges, with 150 items 10-29 reviewed-no-new-ownership
[ ] exactly eight terminal rows exist with split 5/2/1 and exact canonical targets
[ ] Red 3.22 and 3.23 have override reasons; Red 3.40 does not require one
[ ] no 150 coverage row, taxonomy delta, or source-topic-map delta exists
[ ] exact source-neutral set equality is 63 Problems / 41 Knowledge
[ ] 010 completion, governance, workstream, HANDOFF, and 011 completion tests remain phase-safe
[ ] qualified baseline, candidate, integrated, cleanup, final closure, and post-fast-forward gates are recorded from native Linux or WSL-native LF checkouts
[ ] real GitHub run is Ubuntu/Node 24, successful, positive-id, and attached to the exact verification commit
[ ] temporary CI is absent before status becomes complete
[ ] final fresh npm run test/check/build pass on the clean closure and durable post-011 SHA
[ ] HANDOFF records exact factual evidence, 8-row 5/2/1 closure, 63/41, 150 no ownership, current 012, and remaining 012 then 013
[ ] no main change, force push, reset, rebase, amend, or durable-history rewrite occurs
```

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-24-quant-interview-random-walks-markov-chains.md`.

Use **Subagent-Driven execution (recommended)** with `superpowers:subagent-driven-development`: a fresh implementer and independent review at every task gate, candidate/coordinator roles kept separate, and no Phase B work until the exact Task 3 report is accepted. Inline execution is also possible with `superpowers:executing-plans`, but it must preserve the same phase boundary, task order, RED/GREEN evidence, and serialized coordinator authority.
