---
problemId: logic-logical-deduction-015
title: Snow-Removal Start Time from a Distance Ratio
description: Infer an unknown start time from two consecutive distance intervals when clearing speed is inversely proportional to elapsed accumulation time.
date: '2026-09-18'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Modeling, Differential Equations]
tags: [Logical Deduction, Rate Model, Integration, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction, calculus-differential-equations, ordinary-differential-equations]
concepts: [constraint-reframing-and-latent-state]
techniques: []
prerequisites: []
relatedProblems: []
family: latent-start-time-rate-model
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 20
status: solved
featured: false
---

## Problem

A snow-clearing vehicle starts work at noon. Snow has been falling at a constant accumulation rate since some unknown time before noon. Assume the vehicle's clearing speed is inversely proportional to the current snow depth, so after (t) hours of snowfall its speed has the form (v(t)=k/t) for some constant (k>0).

During the hour from noon to 1 p.m. the vehicle travels exactly twice as far as it does from 1 p.m. to 2 p.m. When did the snowfall begin?

## Think Before Revealing

<details><summary>Hint 1</summary>Let (x>0) be the number of hours that snow has already been falling at noon. Express each one-hour distance as an integral in elapsed-snow time.</details>
<details><summary>Hint 2</summary>After cancelling (k), exponentiate the logarithmic distance equation before solving for the positive root.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let (x>0) be the elapsed snowfall time at noon. Then the two distances are

[
D_1=\int_x^{x+1}\frac{k}{t},dt
   =k\log\frac{x+1}{x},
]

and

[
D_2=\int_{x+1}^{x+2}\frac{k}{t},dt
   =k\log\frac{x+2}{x+1}.
]

The condition (D_1=2D_2) gives

[
\log\frac{x+1}{x}
=2\log\frac{x+2}{x+1}.
]

Exponentiating,

[
\frac{x+1}{x}
=\left(\frac{x+2}{x+1}\right)^2.
]

Cross-multiplying yields

[
(x+1)^3=x(x+2)^2.
]

After expansion and cancellation,

[
x^2+x-1=0.
]

Thus

[
x=\frac{-1\pm\sqrt5}{2}.
]

Elapsed time must be positive, so

[
x=\frac{\sqrt5-1}{2}\approx0.618034\text{ hours}.
]

That is about 37.08 minutes before noon, so the snowfall began at approximately **11:22:55 a.m.**

The negative algebraic root is rejected because it would place the start of snowfall after noon and would also make the assumed elapsed-time model invalid over the first integration interval.

## Why This Problem Matters

The main step is not algebra but state choice. Measuring time from the hidden start event converts the story into two adjacent integrals whose ratio removes the unknown proportionality constant.

## Common Mistakes

- Treating speed as constant within each hour.
- Measuring (t) from noon rather than from the start of snowfall.
- Equating point speeds instead of integrated distances.
- Keeping the negative quadratic root despite the physical constraint (x>0).

## Extensions

- Replace the distance ratio 2 by a general (r>0) and derive the equation for (x).
- Replace (v(t)=k/t) by (v(t)=kt^{-\alpha}) and study identifiability of (x) and (alpha).
- Use intervals of unequal lengths and determine which ratios still identify a unique positive start time.

</details>
