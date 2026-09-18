---
problemId: logic-logical-deduction-017
title: Anchor Overboard and Water Level
description: Compare buoyant displacement before and after a dense object leaves a floating boat and becomes fully submerged.
date: '2026-09-18'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Physical Reasoning, Displacement]
tags: [Logical Deduction, Archimedes Principle, Reframing, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state]
techniques: []
prerequisites: []
relatedProblems: []
family: displacement-comparison
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

A boat floats in a pool while carrying a dense anchor of mass (m) and density (ho_a). The water density is (ho_w), with (ho_a>ho_w). The anchor is then lowered overboard and comes to rest fully submerged in the pool.

Assume the pool has fixed horizontal area, the boat returns to equilibrium, the anchor does not touch the boat after release, and transient waves are ignored. Does the equilibrium water level rise, fall, or stay the same?

## Think Before Revealing

<details><summary>Hint 1</summary>While the anchor is in the floating boat, ask how much extra water volume must be displaced to support its weight.</details>
<details><summary>Hint 2</summary>After release, compare that former displacement with the physical volume of the submerged anchor.</details>

<details>
<summary>Show Solution</summary>

## Solution

While the anchor is carried by the floating boat, Archimedes' principle requires the boat to displace extra water whose weight equals the anchor's weight. The extra displaced volume attributable to the anchor is therefore

[
V_{\text{carried}}=\frac{m}{\rho_w}.
]

After the anchor is removed, the boat is lighter by mass (m), so its required displacement decreases by exactly that amount. The submerged anchor now displaces only its own physical volume,

[
V_{\text{submerged}}=\frac{m}{\rho_a}.
]

Because the anchor is denser than water,

[
\rho_a>\rho_w
\quad\Longrightarrow\quad
\frac{m}{\rho_a}<\frac{m}{\rho_w}.
]

Hence the total displaced water volume decreases by

[
\Delta V
=\frac{m}{\rho_a}-\frac{m}{\rho_w}<0.
]

With a fixed pool footprint, lower displaced volume means a lower equilibrium water level. Therefore the **water level falls**.

The conclusion depends on the anchor sinking and being denser than water. A floating object behaves differently because, while floating, it already displaces water equal to its own weight.

## Why This Problem Matters

The reliable state variable is displaced volume, not the visual position of the object. Separating “weight-supported displacement” from “physical-volume displacement” turns a verbal puzzle into one inequality.

## Common Mistakes

- Assuming any object moved into the water must raise the level.
- Comparing the anchor's volume with the boat's total volume rather than with the displacement required by the anchor's weight.
- Forgetting that the boat becomes lighter after release.
- Ignoring the density condition that makes the sign definite.

## Extensions

- Analyze an object with density below water that floats after leaving the boat.
- Let the anchor remain suspended from the boat while submerged and compare the equilibrium.
- Include a pool of nonconstant cross-sectional area and translate displacement change into height change.

</details>
