---
title: Probability Axioms & Derived Rules
description: The probability axioms, complement and addition rules, monotonicity, De Morgan manipulations, and the distinction between disjointness and independence.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Axioms, Independence, Event Algebra]
quantInterviewTopics: [probability-statistics, probability-foundations]
featured: false
related: [probability-spaces-events, symmetry-equiprobability-geometric-probability, conditioning]
relatedNotes: []
---

## Core idea

Probability is not a collection of unrelated formulas. A small set of axioms determines the elementary event rules used repeatedly in interview problems. Knowing which rules are primitive and which are derived makes complement, union, and independence arguments easier to audit.

## Probability axioms

For a probability measure `P` on a sample space `Omega`:

1. **Nonnegativity:** `P(A) >= 0` for every event `A`.
2. **Normalization:** `P(Omega) = 1`.
3. **Countable additivity:** for pairwise disjoint events `A_1,A_2,...`,

   `P(union_i A_i) = sum_i P(A_i)`.

Finite additivity for disjoint events is the finite special case used most often in interviews.

## Derived rules

### Empty event

Because `Omega` and `emptyset` form a disjoint decomposition of `Omega`,

`P(emptyset) = 0`.

### Complement rule

`A` and `A^c` are disjoint and their union is `Omega`, so

`P(A) + P(A^c) = 1`,

hence

`P(A^c) = 1 - P(A)`.

This is why “at least one” questions are often easier as one minus “none.”

### Monotonicity

If `A subseteq B`, write `B` as the disjoint union of `A` and `B \ A`. Nonnegativity then gives

`P(A) <= P(B)`.

### Two-event addition rule

The overlap in `A union B` would be counted twice by `P(A)+P(B)`, so

`P(A union B) = P(A) + P(B) - P(A intersection B)`.

When `A` and `B` are mutually exclusive, the intersection term is zero and the formula reduces to direct addition.

### De Morgan rules

Complements exchange unions and intersections:

`(A union B)^c = A^c intersection B^c`,

`(A intersection B)^c = A^c union B^c`.

These identities are especially useful when the complement has a simpler probabilistic description.

## Mutually exclusive versus independent

The two concepts answer different questions.

**Mutually exclusive** means the events cannot occur together:

`A intersection B = emptyset`.

**Independent** means knowing whether one event occurs does not create multiplicative interaction in their joint probability:

`P(A intersection B) = P(A)P(B)`.

If `A` and `B` are mutually exclusive and both have **positive probability**, then

`P(A intersection B) = 0`,

while

`P(A)P(B) > 0`.

Therefore positive-probability mutually exclusive events are **not independent**.

A degenerate exception is possible when one event has probability zero. For example, if `P(A)=0` and `A` is disjoint from `B`, then

`P(A intersection B)=0=P(A)P(B)`.

So disjointness and independence can coexist only in such zero-probability degeneracies, not in the ordinary positive-probability case.

## Repeated independent trials at the Foundations boundary

If trials are independent and a single trial misses an event with probability `q`, then all `N` trials miss with probability

`q^N`.

Combined with the complement rule,

`P(at least one hit) = 1 - q^N`.

This is the amount of independence needed in Probability Foundations. Conditional-probability machinery belongs to a later topic.

## Interview Checks

- Starting only from normalization and disjoint additivity, derive `P(A^c)=1-P(A)`.
- Derive `P(A union B)=P(A)+P(B)-P(A intersection B)` by partitioning the union into disjoint pieces.
- Explain why two mutually exclusive events with positive probability must be dependent rather than independent.
- Give a zero-probability example in which two events can be both disjoint and independent.
- If one independent trial succeeds with probability `p`, express the probability of at least one success in `N` trials without expanding a union of `N` events.
