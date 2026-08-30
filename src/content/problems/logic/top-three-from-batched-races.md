---
problemId: logic-logical-deduction-004
title: Top Three from Batched Races
description: Find the three fastest of twenty-five distinct constant-speed racers with five lanes, no timing, and the minimum number of races.
date: '2026-08-30'
domain: Computer Science
category: Algorithms
subcategories: [Selection, Partial Orders]
tags: [Logical Deduction, Selection, Lower Bounds, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, algorithms-data-structures-cpp, algorithmic-complexity]
concepts: [decision-trees-information-bounds-and-adaptive-testing]
techniques: []
prerequisites: []
relatedProblems: [minimum-comparisons-for-both-extremes, twelve-object-balance-scale-diagnosis]
family: batched-selection
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Twenty-five racers have distinct, constant speeds. A race has exactly five lanes, at most five racers may compete at once, and it reveals only their finishing order: no times are recorded or compared across races.

Find the fastest three racers with the minimum possible number of races. Give a strategy, justify every elimination from the first six races, and explain why their results do not yet determine the podium.

## Think Before Revealing

<details><summary>Hint 1</summary>Race five disjoint groups, then race their winners. Rename groups after the winners' race so that the winning group is A, the next is B, and so on.</details>
<details><summary>Hint 2</summary>A racer is eliminated from the top three once the known partial order places at least three racers ahead. Keep the overall winner aside and race the five remaining candidates.</details>

<details>
<summary>Show Solution</summary>

## Solution

Use five races to cover all 25 racers, one group per race. Within each group, label racers by finishing position. Race the five group winners in race 6, then rename the groups in that winners' finishing order. The normalized first-six-race orders are:

| Race | Fastest to slowest |
|:---:|:---|
| 1 | `A1 > A2 > A3 > A4 > A5` |
| 2 | `B1 > B2 > B3 > B4 > B5` |
| 3 | `C1 > C2 > C3 > C4 > C5` |
| 4 | `D1 > D2 > D3 > D4 > D5` |
| 5 | `E1 > E2 > E3 > E4 > E5` |
| 6 | `A1 > B1 > C1 > D1 > E1` |

Read every `>` as a directed partial-order edge and include all consequences of transitivity. In particular, A1 beat every other group winner and is ahead of every racer through those winners, so A1 is certified first overall. Any other racer with at least three known predecessors cannot occupy the top three. The complete elimination certificate is:

| Racer | Known faster racers | Verdict |
|:---:|:---|:---:|
| `A1` | `none` | Certified first |
| `A2` | `A1` | Keep |
| `A3` | `A1, A2` | Keep |
| `A4` | `A1, A2, A3` | Eliminate |
| `A5` | `A1, A2, A3, A4` | Eliminate |
| `B1` | `A1` | Keep |
| `B2` | `A1, B1` | Keep |
| `B3` | `A1, B1, B2` | Eliminate |
| `B4` | `A1, B1, B2, B3` | Eliminate |
| `B5` | `A1, B1, B2, B3, B4` | Eliminate |
| `C1` | `A1, B1` | Keep |
| `C2` | `A1, B1, C1` | Eliminate |
| `C3` | `A1, B1, C1, C2` | Eliminate |
| `C4` | `A1, B1, C1, C2, C3` | Eliminate |
| `C5` | `A1, B1, C1, C2, C3, C4` | Eliminate |
| `D1` | `A1, B1, C1` | Eliminate |
| `D2` | `A1, B1, C1, D1` | Eliminate |
| `D3` | `A1, B1, C1, D1, D2` | Eliminate |
| `D4` | `A1, B1, C1, D1, D2, D3` | Eliminate |
| `D5` | `A1, B1, C1, D1, D2, D3, D4` | Eliminate |
| `E1` | `A1, B1, C1, D1` | Eliminate |
| `E2` | `A1, B1, C1, D1, E1` | Eliminate |
| `E3` | `A1, B1, C1, D1, E1, E2` | Eliminate |
| `E4` | `A1, B1, C1, D1, E1, E2, E3` | Eliminate |
| `E5` | `A1, B1, C1, D1, E1, E2, E3, E4` | Eliminate |

Candidate set: `A1, A2, A3, B1, B2, C1`.

A1 already owns first place, so race the other five candidates once. For a normalized example result, record the final race as follows:

Final race: `A2 > A3 > B1 > B2 > C1`.

Whatever the actual order of that race, its first two finishers join A1 to form the ordered top three. The strategy therefore uses **seven races**.

To prove that seven is the global minimum, consider an adversary that places every still-unbeaten entrant ahead of every entrant that already has a loss. This rule respects all previous results: no already-beaten racer can have a known win over a still-unbeaten racer. A five-racer race can give first losses to at most four unbeaten racers. If even one entrant was already beaten, at most four entrants are unbeaten and their winner remains unbeaten, so the race gives at most three first losses.

Certifying the fastest racer requires 24 first losses, one for everyone except the champion. Six races can supply at most $6\cdot4=24$, so equality is necessary: all five entrants must be unbeaten in each of the six races. After five races exactly five racers remain unbeaten, and race 6 must compare all five of them.

At least one race-6 finalist won an earlier race; the adversary may make such a finalist win race 6. The runner-up from that winner's earlier race could not race again under the equality case, because that racer already had a loss. That earlier runner-up and the runner-up in race 6 have both lost to the final winner, but they are incomparable with each other. Either can be second in a total speed order consistent with all six results. Therefore six races cannot even certify second place, so they cannot certify the top three.

It remains to show why race 7 carries information that the first six lack. The following two candidate orders both extend every comparison edge from the normalized first six races:

Order A: `A1 > A2 > A3 > B1 > B2 > C1`.

Order B: `A1 > B1 > B2 > C1 > A2 > A3`.

Order A has podium `A1, A2, A3`, while Order B has podium `A1, B1, B2`. All racers eliminated by the table can be inserted below these candidates while preserving their group and winners' orders. Thus both worlds are consistent with every first-six-race observation but yield different top threes. Those observations cannot certify the podium; the seventh race distinguishes the surviving alternatives and matches the seven-race construction.

## Why This Problem Matters

The useful object is not a collection of race results but the transitive partial order they induce. Selection becomes a certificate problem: keep exactly the racers who do not yet have three proved predecessors, and spend the final test only on unresolved comparisons.

## Common Mistakes

- Racing the five winners and then keeping every runner-up, even when the winners' order already eliminates most groups.
- Discarding A3 because A3 finished third in one heat; A3 can still be third overall.
- Including C2, although A1, B1, and C1 are already certified faster.
- Claiming six races suffice without exhibiting a unique podium, or claiming seven are necessary without two compatible counterorders.

## Extensions

- Generalize the candidate certificate to finding the fastest $k$ racers with batches of size $m$.
- Store the partial order as a directed acyclic graph and compute each racer's transitive predecessors automatically.
- Ask how the strategy changes if race times are available or if speeds may vary between races.

</details>
