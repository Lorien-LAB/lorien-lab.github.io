---
problemId: logic-invariance-001
title: Ant Collisions and Identity Swapping
description: Count endpoint arrivals and pairwise collisions by replacing identical ants that bounce on contact with straight-through ghost trajectories.
date: 2026-08-16
domain: Mathematics & Statistics
category: Brainteasers
subcategories: [Invariants, Collision Problems]
tags: [Brainteasers, Invariants, Collisions, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, invariants-state-transformations]
concepts: []
techniques: [identity-swapping-invariance]
prerequisites: []
relatedProblems: []
family: particle-collision-invariance
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 7
status: solved
featured: false
---

## Problem

Along a straight segment, 20 identical ants begin near Alice's end moving toward Bob, while 50 identical ants begin near Bob's end moving toward Alice. All move at the same constant speed. Initially every Alice-side ant lies to the left of every Bob-side ant, and the starting positions are generic enough that no three ants collide simultaneously.

Whenever two ants meet head-on, both immediately reverse direction.

How many ants eventually leave through Bob's end, how many leave through Alice's end, and how many pairwise collision events occur?

## Think Before Revealing

Tracking individual ants after every bounce creates unnecessary bookkeeping. Ask whether there is another description that produces exactly the same sequence of unlabeled positions.

<details>
<summary>Hint 1</summary>

For two identical ants with equal speed, a bounce is observationally equivalent to the two ants passing through each other if you exchange their identities.

</details>

<details>
<summary>Hint 2</summary>

Draw straight ghost trajectories instead of reflected physical trajectories. Then count endpoint arrivals from the ghost directions and count intersections between the 20 right-moving and 50 left-moving trajectories.

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1 — replace bounces by straight-through trajectories

Consider one head-on encounter. Immediately before the collision, one ant moves right and one moves left. Immediately after an elastic bounce, one ant again moves right and one moves left. Because the ants are identical, the unlabeled position process is exactly the same as if both ants had simply passed through each other.

So erase every bounce and draw all trajectories as straight lines.

In that ghost picture, the 20 trajectories that begin on Alice's side continue to Bob's end, while the 50 trajectories that begin on Bob's side continue to Alice's end. Therefore

- **20 ants leave through Bob's end**;
- **50 ants leave through Alice's end**.

Now count collisions. Initially every right-moving trajectory is to the left of every left-moving trajectory. Since all ants have equal speed, each right-moving ghost trajectory crosses each left-moving ghost trajectory exactly once. There are

`20 x 50 = 1000`

such cross-group pairs, so the physical system has **1000 pairwise collisions**.

### Method 2 — labels move through collisions

Imagine each ant carries a message identifying its original side. At a physical collision, swap the two messages while the ants bounce. The messages then continue exactly as if they had passed straight through one another.

Each of the 20 Alice messages reaches Bob, and each of the 50 Bob messages reaches Alice. Moreover, every Alice message crosses every Bob message once, so there are again `20 x 50 = 1000` collision events.

## Why This Problem Matters

The arithmetic is trivial after the right representation is chosen. The interviewer is testing whether you can recognize an invariance under relabeling and replace a complicated interacting system by noninteracting ghost trajectories.

## Common Mistakes

- Simulating collisions one by one instead of changing representation.
- Thinking that a physical ant must continue toward the endpoint it originally faced after a collision; individual identities do not follow the straight ghost paths.
- Counting only endpoint arrivals and forgetting that the collision count requires counting trajectory intersections.
- Ignoring simultaneous multi-particle collisions. The formulation excludes them so that a collision event is unambiguously pairwise.

## Extensions

- With `m` right-moving and `n` left-moving particles under the same ordering assumptions, the collision count is `mn`.
- If particles have unequal speeds, the pass-through relabeling idea may still help for endpoint counts, but not every opposite-direction pair is guaranteed to intersect.
- The same device appears in one-dimensional hard-particle systems, queueing/order arguments, and puzzles about people or tokens exchanging identities on contact.

</details>
