---
title: Small Cases, Recurrence & Structural Simplification
description: Reduce complex interview problems to valid base cases, derive recurrences or structural invariants, prove the emerging pattern, and lift it back to the original scale.
date: '2026-08-30'
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Problem Simplification, Recurrence, Induction, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification]
featured: false
related: [recursion-problem-solving, problem-framing-clarification-assumption-management, fermi-estimation-assumption-decomposition]
relatedNotes: []
---

## Core Idea

When a large problem hides its mechanism, construct the smallest cases that preserve its rules. Solve those cases exactly, describe how one valid state becomes the next, and turn the observed regularity into a proof. The simplification is useful only when it retains every rule that can change the outcome.

## Seven-Step Workflow

1. Preserve the rules, objectives, and information available to each participant while reducing the instance.
2. Specify exhaustive base cases, including terminal states and any ties.
3. Solve each base case completely rather than recording only a plausible winner.
4. Increase the instance one step at a time while keeping all constraints unchanged.
5. Record the state transitions, choices, and resources that explain each new outcome.
6. State a conjecture for the pattern, including its range and any exceptional cases.
7. Prove that the conjecture extends to the original scale by induction, invariant, or recurrence.

## Four Simplification Modes

- **Size reduction:** shrink the number of objects, rounds, agents, or dimensions without discarding a governing rule.
- **Backward induction:** begin at a known endpoint and determine which earlier choices can lead there.
- **State compression:** replace history with the minimal state variables that determine the next legal move.
- **Algebraic or geometric re-expression:** translate a verbal process into equations, parity, intervals, graphs, or spatial structure that exposes an invariant.

## From Pattern to Proof

A recurrence is valid only when every reachable non-base state maps to smaller or previously solved states, the transition covers every legal action, and the base cases close the recursion. State what happens on ties: give a deterministic tie-breaking rule or prove that the result is independent of the tie. In adversarial settings, identify each participant's preference and show why the selected move is optimal against the opponent's best response.

Use induction only after stating the exact claim. The induction hypothesis must be strong enough to handle the next state, and the inductive step must preserve the legal rules rather than merely resemble the smaller example. Track resource bounds such as remaining moves, capacity, time, or tokens; they often supply the invariant or prevent an invalid recurrence. Finally, distinguish worst-case reasoning from average-case reasoning: a guaranteed outcome needs the former, while an expected outcome needs an explicit distribution and averaging argument.

## Recognition Signals

Look for a process that repeats after one move, a terminal condition that can be solved directly, symmetry that makes labels irrelevant, or a history that can be summarized by a few variables. A useful prompt often asks who wins, whether a configuration is reachable, how many steps are required, or what changes when one item is added.

## Common Mistakes

Treating a few examples as proof can conceal exceptional cases. Other frequent errors are changing a rule during simplification, omitting a terminal state, assuming cooperative behavior in a competitive game, and applying a recurrence outside the states for which it was defined.

## Interview Checks

1. For a 15-unit cube built from smaller blocks, identify which geometric features remain relevant after reducing the side length.
2. In a container that is one quarter full, write the state variables before inferring how the next action changes them.
3. Work backward from a known endpoint when the final state is easier to characterize than the initial move.
4. Test whether a constant width creates a fall through path or a conserved quantity in the smaller configuration.
5. List every terminal state before proposing a recurrence.
6. Explain how a tie is resolved and whether that rule changes the pattern.
7. State the opponent's objective before claiming a move is forced.
8. Say whether the conclusion is worst-case, average-case, or conditional on an explicit assumption.
