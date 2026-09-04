---
problemId: logic-logical-deduction-013
title: Shortest Path on a Cube Surface
description: Unfold a unit cube to find and prove the shortest surface path between opposite vertices while separating surface, edge, and interior models.
date: '2026-09-05'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Geometry, Shortest Paths]
tags: [Logical Deduction, Geometry, Unfolding, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state, logical-deduction-constraint-propagation-and-case-elimination]
techniques: []
prerequisites: []
relatedProblems: [clock-hand-angles-and-relative-motion]
family: surface-unfolding
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Let $A$ and $B$ be opposite vertices of a unit cube. Find the length of the shortest path from $A$ to $B$ that stays on the cube's surface. Prove that the path is globally shortest, not merely shortest within one chosen net. How do the answers change if motion is restricted to cube edges or allowed through the cube's interior?

## Think Before Revealing

<details>
<summary>Hint 1</summary>

Choose two adjacent faces containing the two endpoints and unfold them along their common edge. A legal path on those faces becomes a planar path.

</details>

<details>
<summary>Hint 2</summary>

A single unfolding gives an upper bound. For a global lower bound, classify every reduced face strip and compare the endpoints of its planar development.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Write the endpoints as $A=(0,0,0)$ and $B=(1,1,1)$. The phrase "shortest path" is incomplete until the allowed region is fixed.

### Model Separation

| Model | Allowed motion | Shortest distance |
| --- | --- | --- |
| Surface | Cube faces only; crossing edges is allowed | $\sqrt{5}$ |
| Edges only | Cube edges only | $3$ |
| Interior | Any point inside the cube | $\sqrt{3}$ |

### Feasible Surface Route

Take the face $y=0$, which contains $A$, and the adjacent face $x=1$, which contains $B$. Unfold these two adjacent faces about their common edge. They form a 1-by-2 rectangle, with $A$ and $B$ at opposite rectangle corners.

The straight line segment between those corners has length

$$
\sqrt{1^2+2^2}=\sqrt{5}.
$$

It crosses the shared edge inside the rectangle, so folding back turns the segment into a legal surface path. This proves feasibility and gives an upper bound, but it does not yet prove that a different face strip is no shorter.

### Global Surface Minimality

We now classify the alternative face strips and apply a straight-line lower bound to each surviving class.

#### 1. Reduce Repeated Faces

Among all shortest surface paths, choose one that visits the fewest faces. Suppose it visits the same square face more than once. Mark the endpoint of its first visit and the start of its last visit to that face. The same square face is convex, so the straight segment joining those two points stays in the face. Replacing the intervening detour by this chord is no longer and removes at least one face visit. That contradicts the choice of path. Hence some shortest path has a simple, non-repeating strip.

The same shortcut applies when the path first enters a face incident to $B$: the straight segment from its entry point to $B$ lies in that face and is no longer than a route that leaves it. We may therefore stop at the first face incident to $B$. Any longer wrap either repeats a face or continues after that first $B$-incident face, so it cannot improve the reduced path.

#### 2. Enumerate Simple Face Strips

Every cube face is incident to exactly one of the opposite vertices $A$ and $B$. Before the first face incident to $B$, a reduced path can use only three faces incident to $A$. Because faces do not repeat and no single face contains both endpoints, the complete list has two, three, or four faces.

Unfold each finite case by reflecting successive faces across their shared edges. Once the first face axis is named $x$ and the next is named $y$, equality or inequality of the terminal axis gives the two distinct 3-face and 4-face cases below. Coordinate permutations, cube reflections, and reversing a strip cover every route within each case.

| Simple strip class | Representative strip | Developed endpoint displacement | Straight-line lower bound |
| --- | --- | --- | --- |
| 2 faces | $x=0 \to y=1$ | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |
| 3 faces, terminal repeats first axis | $x=0 \to y=0 \to x=1$ | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |
| 3 faces, all axes distinct | $x=0 \to y=0 \to z=1$ | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |
| 4 faces, terminal repeats first axis | $x=0 \to y=0 \to z=0 \to x=1$ | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |
| 4 faces, terminal repeats second axis | $x=0 \to y=0 \to z=0 \to y=1$ | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |

Unfolding preserves path length. Within each developed strip, a path is at least the straight-line distance between its endpoints, namely $\sqrt{1^2+2^2}=\sqrt{5}$. Every simple case is therefore at least $\sqrt{5}$. The repeated-face reduction transfers that bound to every surface path. The feasible route attains it, so the shortest surface distance is $\sqrt{5}$.

For edge-only travel, each of the three coordinates must change from $0$ to $1$, and one unit edge changes only one coordinate. Three edges are necessary and sufficient, so the distance is $3$.

If travel through the interior is allowed, the Euclidean chord from $A$ to $B$ is legal and has length

$$
\sqrt{1^2+1^2+1^2}=\sqrt{3}.
$$

## Why This Problem Matters

Unfolding converts a constrained three-dimensional route into a planar one, but a candidate net proves only feasibility. The separate face-strip lower bound is the logical step that upgrades a good construction into a global optimum.

## Common Mistakes

- Using the interior space diagonal even though the path must stay on the surface.
- Restricting motion to edges when crossing a face is allowed.
- Finding one short net and declaring it optimal without ruling out other face strips.
- Treating the folded endpoints as if their ordinary three-dimensional separation were a surface lower bound.

## Extensions

- Repeat the unfolding argument for a rectangular box with side lengths $p$, $q$, and $r$.
- Locate every symmetric shortest route and identify which cube edges each route crosses.
- Compare shortest paths when one or both endpoints lie in face interiors rather than at vertices.

</details>
