---
problemId: logic-logical-deduction-019
title: Bisecting a Rectangular Frame with One Line
description: Use central symmetry to construct a single line that bisects the area between an outer rectangle and an inner rectangle.
date: '2026-09-18'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Geometry, Symmetry]
tags: [Logical Deduction, Central Symmetry, Geometry, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, symmetry]
concepts: [constraint-reframing-and-latent-state]
techniques: []
prerequisites: []
relatedProblems: []
family: central-symmetry-bisection
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A smaller rectangle lies completely inside a larger rectangle. Their sides may have different lengths and the smaller rectangle need not be concentric with the larger one.

Construct one infinite straight line that divides the area inside the larger rectangle but outside the smaller rectangle into two equal parts. Prove the construction. Discuss separately the case in which the two rectangle centers coincide.

## Think Before Revealing

<details><summary>Hint 1</summary>Any line through the center of a rectangle interacts with a 180-degree rotation in a useful way.</details>
<details><summary>Hint 2</summary>If the same line bisects both rectangles, subtract the two equal-area statements.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $O$ be the center of the outer rectangle and $I$ the center of the inner rectangle.

If $O\ne I$, draw the unique infinite line through both centers.

A rectangle is centrally symmetric about its center: rotation by 180 degrees maps the rectangle onto itself. Any line through the center is preserved as a set by that rotation, while the two open half-planes on opposite sides of the line are exchanged. The rotation is area-preserving, so the portions of the rectangle on the two sides of the line have equal area.

Therefore the line $OI$:

- bisects the area of the outer rectangle because it passes through $O$;
- bisects the area of the inner rectangle because it passes through $I$.

Let the outer areas on the two sides be $A/2$ and $A/2$, and the inner areas be $a/2$ and $a/2$. The rectangular-frame areas are then

$$
\frac{A}{2}-\frac{a}{2}
\quad\text{and}\quad
\frac{A}{2}-\frac{a}{2},
$$

so they are equal. Hence the line through the two centers bisects the frame.

If $O=I$, uniqueness disappears. **Every** line through the common center bisects both rectangles by the same central-symmetry argument, so every such line bisects their area difference.

The construction is an existence argument, not generally a uniqueness theorem. When the centers differ, the line through both centers is a guaranteed solution; special configurations may admit additional bisecting lines.

## Why This Problem Matters

Subtracting two symmetry statements is simpler than integrating the irregular frame directly. The hidden state is not the boundary shape but the two centers that let one line bisect both component areas simultaneously.

## Common Mistakes

- Assuming the rectangles must be concentric.
- Claiming that only horizontal or vertical center lines bisect a rectangle.
- Bisecting the outer rectangle but forgetting to bisect the removed inner area.
- Claiming uniqueness without considering coincident centers or additional geometric symmetries.

## Extensions

- Replace the rectangles by any two centrally symmetric planar regions, one contained in the other.
- Investigate when additional bisecting lines exist beyond the line of centers.
- Extend the argument to volume bisection of nested centrally symmetric solids by a plane through both centers.

</details>
