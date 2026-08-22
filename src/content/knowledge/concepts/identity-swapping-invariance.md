---
title: Identity-Swapping Invariance
description: A problem-solving technique for identical-particle collision problems that replaces elastic reversals by straight-through trajectories with labels exchanged.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Invariants, Brainteasers, Collisions]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, invariants-state-transformations]
featured: false
related: []
relatedNotes: []
---

## Core idea

When two indistinguishable particles moving at the same speed collide head-on and reverse direction, the unlabeled configuration after the collision is identical to the configuration obtained by letting the particles pass through each other.

Equivalently, keep the straight trajectories and exchange the particle labels at each crossing.

## Recognition pattern

Use this transformation when a problem asks for endpoint counts, total crossings, or aggregate behavior of identical walkers whose only interaction is to reverse direction on pairwise collision.

## Why it works

The physical positions after a collision are the same under the two descriptions. The bounce model preserves individual labels but reverses velocities; the pass-through model preserves velocities but swaps which label occupies which outgoing trajectory.

For aggregate questions that do not depend on the microscopic identity history, the straight-through representation is usually much simpler.

## Common trap

The transformation does not automatically determine the number of collisions. To count collisions, you must still count trajectory crossings under assumptions that make those crossings well-defined, and simultaneous multi-particle collisions may require separate treatment.
