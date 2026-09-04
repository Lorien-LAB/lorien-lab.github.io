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

We now classify the alternative face strips and apply a straight-line lower bound to each class. Inside any traversed face, replacing a bent portion by its planar chord cannot increase length. Unfolding the successive faces by reflection preserves every remaining segment length, so a path through a fixed strip is at least the Euclidean distance between its developed endpoints.

All developed faces lie on the unit square lattice. Put the developed copy of $A$ at $(0,0)$ and write a developed copy of $B$ as $(a,b)$. The lattice offsets with squared length below $5$ are, up to signs and swapping coordinates,

$$
(0,0),\quad(1,0),\quad(1,1),\quad(2,0).
$$

Following the cube labels across each reflected square shows what these short offsets represent: respectively the same vertex, an edge neighbor, or a vertex differing from $A$ in only two cube coordinates. None is the opposite vertex $B$, which must differ in all three coordinates. Therefore every developed image of $B$ satisfies

$$
a^2+b^2\ge 5.
$$

The face-strip classification is consequently:

| Face-strip class | Developed endpoint displacement | Straight-line lower bound |
| --- | --- | --- |
| Two adjacent endpoint faces | $(1,2)$ or $(2,1)$ | $\sqrt{5}$ |
| Other simple, non-repeating strip | Integer $(a,b)$ with $a^2+b^2\ge 5$ | At least $\sqrt{5}$ |
| Repeated-face strip or longer wrap | Shortcut between the first and last visits to a repeated face, producing a simple strip | At least $\sqrt{5}$ |

The repeated-face shortcut is legitimate because its two boundary points lie on the same square face; their straight chord stays on that face and is no longer than the intervening wrap. Thus a global minimizer may be taken to use a simple, non-repeating strip, already covered by the lattice bound. Cube rotations and reflections give symmetric 1-by-2 routes, while longer wraps cannot beat their lower bound. The feasible route attains the bound, so the shortest surface distance is $\sqrt{5}$.

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
