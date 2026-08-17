---
problemId: combinatorial-probability-006
title: Probability That One Random Subset Contains Another
description: Encode two independently chosen random subsets element by element and reduce a global containment event to four local membership states.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Combinatorial Probability, Random Subsets]
tags: [Probability, Combinatorics, Sets, Independence, Interview]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
concepts: [finite-combinatorial-probability-modeling, counting-permutations-combinations]
techniques: []
prerequisites: [probability-spaces-events]
relatedProblems: []
family: elementwise-membership-counting
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Let `S` be a set with `n` elements. Choose subsets `A` and `B` **independently and uniformly** from the `2^n` subsets of `S`.

What is the probability that

`A subseteq B`?

## Think Before Revealing

Instead of counting whole subsets first, look at one ground-set element and record whether it belongs to `A` and whether it belongs to `B`.

<details>
<summary>Hint 1</summary>

For a fixed element, the membership indicators `(1_A, 1_B)` have four equally likely states:

`(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`.

</details>

<details>
<summary>Hint 2</summary>

Containment fails exactly when some element is in `A` but not in `B`. Which one of the four states is therefore forbidden?

</details>

<details>
<summary>Show Solution</summary>

## Solution

For each element `x` of `S`, record the pair

`(1{x in A}, 1{x in B})`.

Because `A` and `B` are chosen independently and uniformly, each element has four equiprobable membership states:

- `(0,0)`: in neither subset;
- `(0,1)`: only in `B`;
- `(1,0)`: only in `A`;
- `(1,1)`: in both.

The condition `A subseteq B` says that no element may belong to `A` while being absent from `B`. Therefore exactly one local state is forbidden:

`(1,0)`.

The other three states are allowed. Since membership choices are independent across the `n` ground-set elements, the probability that every element chooses an allowed state is

`P(A subseteq B) = (3/4)^n`.

### Equivalent counting argument

There are

`2^n * 2^n = 4^n`

ordered pairs `(A,B)` in total.

For each ground-set element, a pair satisfying `A subseteq B` may assign one of only three states: neither, `B` only, or both. Therefore there are

`3^n`

favorable ordered pairs, again giving

`3^n / 4^n = (3/4)^n`.

### A third derivation by conditioning on B

If `|B|=k`, then `A subseteq B` precisely when `A` is one of the `2^k` subsets of `B`. Because `A` is uniform over all `2^n` subsets,

`P(A subseteq B | |B|=k) = 2^k / 2^n`.

Also

`P(|B|=k) = C(n,k)/2^n`.

So

`P(A subseteq B) = sum_{k=0}^n [C(n,k)/2^n][2^k/2^n]`.

Using the binomial theorem,

`sum_{k=0}^n C(n,k)2^k = 3^n`,

which recovers `(3/4)^n`.

The elementwise-state solution is the cleanest because it reveals the local forbidden pattern immediately.

## Why This Problem Matters

This is a powerful modeling pattern: a global set relation can often be expressed as independent local constraints on membership indicators.

The same idea appears in Boolean models, random graphs, feature-selection masks, bit strings, reliability systems, and product probability spaces. It also demonstrates when counting by `4^n` outcomes is preferable to summing over subset sizes.

## Common Mistakes

**Treating `A subseteq B` as symmetric with `A=B`.** Containment permits elements to belong to `B` but not `A`; the state `(0,1)` is allowed.

**Forbidding the wrong local state.** The only forbidden state is `(1,0)`, meaning in `A` but not in `B`.

**Forgetting that `(A,B)` is an ordered pair.** The total sample space has `4^n` possibilities, not something like `C(2^n,2)`.

**Assuming the answer is `(1/2)^n`.** For each element, three of four states satisfy the local containment requirement, not two.

## Extensions & Variants

- Find `P(A subset B)` for **strict** containment.
- Find `P(A=B)` and compare its decay rate with `(3/4)^n`.
- For three independent random subsets, find the probability `A subseteq B subseteq C` by counting allowed membership states per element.
- Let each element enter `A` with probability `p` and `B` with probability `q` independently; derive the non-uniform analogue.
- Condition on fixed sizes `|A|=a` and `|B|=b` and compute the containment probability using combinations.

</details>
