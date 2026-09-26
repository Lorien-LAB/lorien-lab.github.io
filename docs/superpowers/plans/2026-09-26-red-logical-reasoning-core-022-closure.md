# Red Logical Reasoning Core 022 Closure Plan

> **For agentic workers:** Execute this plan in the isolated 022 closure worktree. The coordinator owns all edits, exact evidence, and integration.

**Goal:** Repair the reviewed 022 reasoning gaps, prove the exact active and final trees, record factual closure, and merge PR #12 into `main`.

**Architecture:** Keep the approved 022 corpus and six source dispositions. Improve only the published reasoning and module tests, then follow the existing active-SHA → workflow-removal → completion-evidence lifecycle used by Workstream 021.

**Tech Stack:** Astro 5, Markdown, Node 24, npm, GitHub Actions, Windows and WSL.

## Global Constraints

- Base is PR #12 head `71a81f3f5961877f6a8c67e1c0125849ca450de6` on `main` `9e87cb2825588ad475d72e5173e5b21118078ad2`.
- Work only in `codex/red-core-022-closure`; preserve the dirty local 022 worktree and all untracked main files.
- Do not extract new source content, create Workstream 023, change the six dispositions, or alter the 101 Problem / 61 Knowledge contract.
- Use the five ordered repository gates: `npm test`, `npm run knowledge:directory:check`, `npm run master:directory:check`, `npm run check`, `npm run build`. Run browser regression after the build.
- Never invent SHA, CI run, environment, or closure proof. Push only fast-forward updates to the existing PR branch.

## Task 1: Repair review findings

**Files:**
- Modify `tests/quant-interview-red-logical-reasoning-core-workstream.test.mjs`.
- Modify `src/content/problems/logic/public-announcement-departure-day.md`.
- Modify `src/content/knowledge/concepts/conditional-implication-contrapositive-and-falsification.md`.
- Modify `src/content/knowledge/concepts/common-knowledge-and-iterated-reasoning.md`.

- [x] Replace the tautological reasoning assertions with independently derived, literal expected outcomes for scale, cards, announcement timing, and rectangle symmetry. Verify test sensitivity with a deliberate temporary mutation, then restore it.
- [x] Replace the circular departure proof with a strong induction that establishes quiet histories before night `n`, and specify when midnight decisions and their outcomes are observed.
- [x] Make six conditional-logic checks concrete propositions with observable candidates; make six common-knowledge checks self-contained with state, observation, action, and timing rules where needed.
- [x] Manually review the revised proof and six checks in each Knowledge page against the design. Do not add brittle prose-matching tests or duplicate existing 12-object or page-hash regressions.
- [x] Run the focused test, `git diff --check`, then the full Windows gates and browser suite; review the topic-only diff.

## Task 2: Prove the immutable active commit

- [ ] Commit the bounded repair and this plan. Record its exact full SHA.
- [ ] In a fresh WSL native-LF detached worktree at that SHA, use Node 24, `npm ci`, inspect line endings, and run the five ordered gates. Remove that proof worktree after recording the result.
- [ ] Fast-forward push the exact active commit to `codex/quant-interview-red-logical-reasoning-core-022` and confirm both GitHub validation jobs succeed with matching `head_sha`.

## Task 3: Remove the temporary workflow and prove the final tree

**Files:**
- Delete `.github/workflows/quant-interview-red-logical-reasoning-core-022-temporary.yml` in its own commit.

- [ ] Verify the temporary workflow path is absent and commit only that deletion.
- [ ] Run the five ordered gates in a fresh WSL native-LF Node 24 worktree at the removal SHA and record the workflow-free proof.

## Task 4: Record closure and integrate

**Files:**
- Modify `src/data/quant-interview/workstreams/logic-brainteasers-discrete-reasoning-red-logical-reasoning-core-022.json`.
- Modify `docs/quant-interview/HANDOFF.md` and the current-state lifecycle tests.

- [ ] Write completion assertions using the real active SHA, CI run ID, workflow path, environment, and final-tree proof; confirm they fail while the workstream is still active.
- [ ] Change 022 to `complete` with `preClosureActiveGate`, `verification`, and `finalTreeGate` matching the 021 schema; update HANDOFF without adding 023.
- [ ] Run focused and full Windows gates, browser regression, and scope review; commit and fast-forward push the closure.
- [ ] Confirm final PR checks, mark PR #12 ready, merge it into `main`, and independently confirm main validation and Pages deployment for the merge SHA.
- [ ] Fast-forward the main checkout without touching its untracked files. Recheck all worktree statuses and report exact evidence and limits.
