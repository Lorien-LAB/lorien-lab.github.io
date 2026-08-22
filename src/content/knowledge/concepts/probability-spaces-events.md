---
title: Probability Spaces & Events
description: Outcomes, sample spaces, events, set operations, mutually exclusive events, and indicator encodings for interview probability problems.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-17
tags: [Probability, Sample Space, Events, Set Operations]
quantInterviewTopics: [probability-statistics, probability-foundations]
featured: false
related: [probability-axioms-derived-rules, symmetry-equiprobability-geometric-probability]
relatedNotes: []
---

## Core idea

An **outcome** is one elementary possible result of a random experiment. The **sample space** `Omega` is the collection of all outcomes. An **event** `A` is a subset of `Omega`: it is a statement that is true for some outcomes and false for the rest.

This language matters because interview questions often sound verbal at first. Turning the words into sets usually reveals which probability operation is required before any arithmetic begins.

For a fair six-sided die,

`Omega = {1,2,3,4,5,6}`.

The event “the result is even” is

`A = {2,4,6}`,

while “the result is at least 4” is

`B = {4,5,6}`.

An individual value such as `4` is an outcome; `{4,5,6}` is an event.

## Event algebra

Set operations translate compound statements directly:

- `A union B` means **A or B occurs** (possibly both).
- `A intersection B` means **A and B both occur**.
- `A^c` means **A does not occur**.

With the die example,

`A union B = {2,4,5,6}`,

`A intersection B = {4,6}`,

and

`A^c = {1,3,5}`.

A useful verbal translation is “neither A nor B”:

`(A union B)^c = A^c intersection B^c`.

That is one of De Morgan's identities and is often the cleanest way to write complement events.

## Mutually exclusive events

Events `A` and `B` are **mutually exclusive** (disjoint) when they cannot occur together:

`A intersection B = emptyset`.

For example, on one die roll the events “roll a 1” and “roll a 6” are mutually exclusive. When disjoint events are combined, there is no overlapping probability mass to subtract, so their probabilities add directly.

Mutual exclusivity is a statement about event overlap. It should not be confused with independence, which is a different relationship and is treated separately in the probability-rules Knowledge node.

## Indicator encoding

An event can also be encoded by its **indicator variable**:

`I_A(omega) = 1` if `omega in A`, and `0` otherwise.

The identity

`E[I_A] = P(A)`

is a useful bridge between events and random variables. Here it is only a bridge: expectation theory belongs to a later topic and is not developed on this page.

Indicators are valuable in interviews because they turn yes/no events into algebraic objects. Sums of indicators can count how many events occur without changing the underlying event logic.

## Modeling checklist

Before computing a probability, identify:

1. the elementary outcome;
2. the sample space;
3. the event being asked for;
4. whether the event is easier to express with a union, intersection, or complement;
5. whether any events are genuinely disjoint.

Do not assume elementary outcomes are equally likely unless the model justifies it.

## Interview Checks

- For events `A` and `B`, translate “neither A nor B” into set notation and simplify it with De Morgan's rule.
- On a fair die, let `A={1,2}` and `B={3,4}`. Explain why `A` and `B` are mutually exclusive and why their probabilities add directly.
- Express “at least one success in N trials” as the complement of a simpler event.
- Explain the difference between the outcome `4` and the event `{4,5,6}` in a die experiment.
- If `I_A` is an indicator, what values can it take, and what event does `I_A=1` represent?
