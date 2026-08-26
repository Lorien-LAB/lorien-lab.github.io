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
