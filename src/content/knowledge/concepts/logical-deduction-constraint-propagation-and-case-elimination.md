---
title: Logical Deduction, Constraint Propagation & Case Elimination
description: Represent finite candidate states, propagate private and public information, eliminate contradictions, and prove uniqueness without skipping alternatives.
date: '2026-08-30'
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Logical Deduction, Constraints, Case Analysis, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
featured: false
related: [small-cases-recurrence-and-structural-simplification, problem-framing-clarification-assumption-management, decision-trees-information-bounds-and-adaptive-testing]
relatedNotes: []
---

## Core Idea

Logical deduction becomes reliable when a verbal puzzle is represented as a finite set of candidate states. Each fact removes states that violate a necessary condition; each statement removes states that could not have produced that statement. Continue until one state remains, or until the remaining alternatives show that the conclusion is not unique.

The method is not a hunt for a clever guess. It is an auditable elimination process: declare the candidates, apply only justified constraints, and account for every surviving alternative.

## Candidate Sets and Constraints

Define a candidate state with every variable that can change the answer: an assignment, ordering, subset, count, or path. Start with an exhaustive but finite set, then translate each rule into a constraint. A constraint can exclude a state directly, restrict a variable's domain, or create a dependency between variables.

Separate necessary conditions from sufficient conditions. A necessary condition filters candidates, but satisfying it alone does not prove a state is valid. Keep a small table or list of survivors so that a later observation can be applied consistently to all of them.

## Information Partitions

Different observers may see different parts of the same state. Partition the candidate states by the private information available to each participant: two states are in the same partition if that participant cannot distinguish them.

When someone says they know, do not merely record the conclusion. Ask which private-information partition cells now have a single surviving state. When someone says they do not know, remove every state in which their cell would have been a singleton. This turns apparently conversational clues into precise filters.

## Public Announcements and Common Knowledge

A public statement is heard by all participants and becomes part of their future reasoning. After each public statement, update the common candidate set before interpreting the next statement. Everyone can then reason not only from private information but also from what everyone heard and what that implies about the others' possible knowledge.

Common knowledge matters because a statement can eliminate states even when it reveals no new private fact. Repeated announcements often alternate between eliminating singleton cells for one observer and creating singleton cells for another.

## Invariants and Contradictions

Use invariants to preserve facts that must remain true across every legal candidate, such as parity, a total count, a fixed sum, a color balance, or reachability class. An invariant can rule out a proposed state before exhaustive enumeration.

A contradiction is useful only when it follows from the stated rules. Assume a candidate or a claimed conclusion, propagate every required consequence, and reject it when it violates a constraint or invariant. Do not reject an option merely because it feels unlikely.

## Deduction Workflow

1. State the target and list the variables that define a candidate state.
2. Enumerate the finite candidate states, using symmetry only when it preserves all relevant information.
3. Translate each initial fact into a constraint and eliminate impossible states.
4. Partition the survivors by each participant's private information when knowledge claims are involved.
5. Apply every public statement to the shared survivor set, then recompute the affected partitions.
6. Use invariants and contradiction checks to remove candidates that cannot satisfy all rules.
7. Repeat propagation until no new state is removed; if several states survive, identify the missing distinguishing condition.
8. Prove uniqueness by showing the selected state survives and every alternative has been exhausted or contradicted.

## Recognition Signals

Use this method when a prompt has a small discrete state space, several interacting clues, statements about knowing or not knowing, or an answer that must be uniquely determined. It is especially useful when a puzzle asks what must be true, whether a configuration is possible, or what follows after a sequence of announcements.

## Common Mistakes

- Starting from a favored answer instead of an exhaustive candidate set.
- Treating a necessary condition as if it were sufficient.
- Updating one participant's private information but forgetting the effect of a public statement on everyone.
- Eliminating candidates without recording the rule that caused the elimination.
- Declaring a solution unique while unexamined alternatives remain.
- Using an invariant outside the conditions under which it was established.

## Interview Checks

1. A box contains 2m cards: m black and m red. Pair the cards into m pairs, and suppose every pair is either black-black, red-red, or mixed. Prove that the number of black-black pairs is the same number as the red-red pairs.
2. You have two fuses, each of which takes 60 minutes to burn completely but burns nonuniformly. Describe how to measure 45 minutes and justify why the timing works.
3. Three people receive distinct positive integers whose sum is known publicly. Specify the candidate states and explain how a sequence of public “I do not know” statements changes their private-information partitions.
4. Four tasks must be assigned to four days, with two precedence rules and one day unavailable. Enumerate the legal schedules and use the constraints to decide whether a proposed schedule is forced.
5. A collection has an even number of tokens, each labeled one of two colors. State an invariant that a legal swap preserves and use it to rule out an unreachable final count.
6. Two observers see complementary subsets of a five-item set. Give a precise condition under which one observer can truthfully announce that they know the full set.
7. In a finite logic grid, one clue says a person is not in a particular role and another says exactly one of two claims is true. Show how to propagate both constraints without assuming either claim first.
8. A proposed solution remains after several eliminations. Explain how you would prove it is unique by exhausting all remaining candidate states rather than stopping at consistency.
