---
title: Inclusion–Exclusion & Derangements
description: Inclusion–exclusion for overlapping finite events, fixed-point complements, and the derangement formula for permutations with no fixed points.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Inclusion-Exclusion, Derangements, Permutations]
quantInterviewTopics: [probability-statistics, combinatorial-probability]
featured: false
related: [counting-permutations-combinations, finite-combinatorial-probability-modeling, probability-axioms-derived-rules]
relatedNotes: []
---

## Core idea

When several “bad” properties can occur simultaneously, adding their counts overcounts intersections. The **inclusion–exclusion principle** corrects that overlap systematically.

For finite sets `A_1, ..., A_n`,

`|A_1 union ... union A_n| = sum_i |A_i| - sum_{i<j}|A_i intersection A_j| + sum_{i<j<k}|A_i intersection A_j intersection A_k| - ...`.

The signs alternate because an outcome belonging to several sets is repeatedly added and subtracted until its net contribution is exactly one.

In probability, the same identity applies to event probabilities. In combinatorial probability it is especially useful when the complement of the desired event is a union of overlapping fixed-point events.

## Fixed points in permutations

A permutation of `n` labeled objects has a **fixed point** at position `i` if object `i` remains in its original position.

Let `A_i` be the set of permutations fixing position `i`. Then the event “at least one fixed point” is

`A_1 union ... union A_n`.

A permutation with **no fixed points** is called a **derangement**. Thus derangements are the complement of this union.

If we force any particular set of `k` positions to be fixed, the remaining `n-k` objects can be permuted freely in `(n-k)!` ways. There are `C(n,k)` choices of which `k` positions are forced to be fixed.

## Derangement formula

Applying inclusion–exclusion gives

`!n = n! - C(n,1)(n-1)! + C(n,2)(n-2)! - ... + (-1)^n`.

Since `C(n,k)(n-k)! = n!/k!`, this becomes the compact formula

`!n = n! sum_{k=0}^n (-1)^k/k!`.

Therefore, for a uniformly random permutation,

`P(no fixed points) = !n / n! = sum_{k=0}^n (-1)^k/k!`.

As `n` grows, this probability approaches `e^(-1)`.

## Five-object example

For five labeled objects,

`!5 = 5!(1 - 1 + 1/2! - 1/3! + 1/4! - 1/5!) = 44`.

There are `5! = 120` total permutations, so

`P(no object is in its original position) = 44/120 = 11/30`.

The value `44` is not the main fact to memorize. The reusable structure is: define one bad event per fixed point, apply inclusion–exclusion, and take the complement.

## A second recurrence

Derangements also satisfy

`!n = (n-1)(!(n-1) + !(n-2))`,

with `!0=1` and `!1=0`.

One way to see this is to track where object 1 goes. Suppose it goes to position `j`. Either object `j` goes to position 1, leaving a derangement of `n-2` remaining objects, or it does not, which can be reduced to a derangement of `n-1` objects. There are `n-1` choices for `j`.

The recurrence is useful computationally, while inclusion–exclusion makes the relationship to fixed-point events transparent.

## When inclusion–exclusion is worth using

Use it when:

- the target is “none of these overlapping bad events”;
- intersections have a simple uniform structure;
- direct enumeration would require many overlapping cases;
- a complement turns the target into a union.

Do not invoke the full formula reflexively. If the events are disjoint, ordinary addition is enough; if a simple sequential complement exists, that may be shorter.

## Common failure modes

**Subtracting bad cases once and stopping.** Pairwise intersections were then subtracted twice and must be added back.

**Confusing a fixed point with an unchanged relative order.** A fixed point is specifically `pi(i)=i`.

**Using `n!/e` as an exact formula.** The nearest integer to `n!/e` equals `!n` for positive `n`, but the finite alternating sum is the exact derivation.

**Memorizing `!5=44` without the event structure.** Interviews often change `n` or ask for a partial restriction; the inclusion–exclusion setup is what transfers.

## Interview Checks

- Use inclusion–exclusion to derive `!4` and verify that it equals `9`.
- For a random permutation of five objects, explain why the probability of no fixed points is `44/120 = 11/30`.
- Define the bad events that turn a “nothing stays in place” problem into an inclusion–exclusion calculation.
- Why does forcing `k` specified fixed points leave `(n-k)!` compatible permutations?
- Explain why `!n/n!` approaches `e^(-1)` as `n` increases.
