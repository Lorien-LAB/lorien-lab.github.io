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

Define finite candidate states with every variable that can change the answer: an assignment, ordering, subset, count, or path. Start with an exhaustive set, then translate each rule into a constraint. A constraint can exclude a state directly, restrict a variable's domain, or create a dependency between variables.

Separate necessary conditions from sufficient conditions. A necessary condition filters candidates, but satisfying it alone does not prove a state is valid. Keep a small table or list of survivors so that a later observation can be applied consistently to all of them.

## Information Partitions

Different observers may see different parts of the same state. Partition the candidate states by the private information available to each participant: two states are in the same partition if that participant cannot distinguish them.

When someone says they know, do not merely record the conclusion. Ask which private-information partition cells now have a single surviving state. When someone says they do not know, remove every state in which their cell would have been a singleton. This turns apparently conversational clues into precise filters.

## Public Announcements and Common Knowledge

A public statement is heard by all participants and becomes part of their future reasoning. Apply each public statement to the shared survivor set, then recompute the private-information partitions before interpreting the next statement. Everyone can then reason not only from private information but also from what everyone heard and what that implies about the others' possible knowledge.

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
2. You have two fuses, each of which takes 60 minutes to burn completely but burns nonuniformly. Either end of either fuse may be lit, and multiple ends may be ignited simultaneously at time zero or later. Construct a procedure to measure 45 minutes and justify every timing step.
3. A public board lists four candidate triples $(A,B,C)$: $(0,0,0)$, $(1,0,0)$, $(0,1,1)$, and $(1,0,1)$. A sees B and C, B sees A and C, and C sees A and B. A publicly says “I do not know my value”; B publicly says “I know my value.” Update the candidate set after each statement and list the remaining candidate states.
4. Tasks A, B, C, and D must each be assigned to a distinct working day in a week containing Monday, Tuesday, Wednesday, Thursday, and Friday. A must be before B and C must be before D; Wednesday unavailable. Enumerate the legal schedules and determine whether assigning A to Monday is forced.
5. Six tokens occupy positions 1 through 6, with three black and three red initially. A legal move swaps the colors on adjacent positions. State the color-count invariant, apply the legal move definition, and determine whether an all black configuration is reachable.
6. Two observers receive complementary subsets of the five-item set $\{p,q,r,s,t\}$. The legal candidate sets are every two-item subset for the first observer together with its three-item complement for the second; each observer is told only the size of their own subset. Give a precise condition under which the first observer can truthfully announce that they know the full set.
7. In a finite logic grid, three people A, B, and C receive the three roles Analyst, Builder, and Curator exactly once. The clues are that A is not the Analyst and exactly one of “B is the Builder” and “C is the Curator” is true. Propagate both constraints and determine whether the assignment is unique.
8. A finite candidate set contains six labeled states $s_1$ through $s_6$, and a proposed solution is $s_4$. Given a written list of every constraint that removes $s_1$, $s_2$, $s_3$, $s_5$, and $s_6$, verify that $s_4$ is unique by exhausting the remaining alternatives rather than stopping at consistency.
