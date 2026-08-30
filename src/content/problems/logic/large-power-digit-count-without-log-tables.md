---
problemId: logic-problem-simplification-004
title: Digit Count of a Large Power Without Log Tables
description: Determine the decimal digit count of a large power by rewriting it near a power of ten and proving strict elementary bounds.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Inequalities, Number Sense]
tags: [Powers, Bounds, Problem Simplification, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification]
concepts: [small-cases-recurrence-and-structural-simplification]
techniques: []
prerequisites: []
relatedProblems: [minimum-comparisons-for-both-extremes]
family: large-power-bounds
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

Determine the number of decimal digits in $125^{100}$ without using logarithm tables or a numerical approximation. Prove strict bounds that force the digit count.

## Think Before Revealing

<details><summary>Hint 1</summary>Use $1.024=128/125$ to rewrite the power as an exact power of ten divided by a much smaller correction factor.</details>
<details><summary>Hint 2</summary>For the correction factor, expand $(1+3/125)^{30}$ and dominate its binomial coefficients by a geometric series.</details>

<details>
<summary>Show Solution</summary>

## Solution

The useful nearby ratio is exact:

$$
1.024=\frac{128}{125}=\frac{2^7}{5^3}.
$$

Raising it to the thirtieth power gives $1.024^{30}=2^{210}/5^{90}$. Therefore

$$
\frac{10^{210}}{1.024^{30}}
=\frac{2^{210}5^{210}}{2^{210}/5^{90}}
=5^{300}
=125^{100}.
$$

In compact notation, this identity is 125^100=10^210/1.024^30.

It remains to bound the correction factor strictly. The lower bound is immediate because $1.024>1$, so $1.024^{30}>1$. For the upper bound, the binomial theorem and $\binom{30}{k}\leq30^k$ give

$$
\begin{aligned}
1.024^{30}
&=\left(1+\frac{3}{125}\right)^{30} \\
&=\sum_{k=0}^{30}\binom{30}{k}\left(\frac{3}{125}\right)^k \\
&\leq\sum_{k=0}^{30}\left(\frac{18}{25}\right)^k \\
&<\sum_{k=0}^{\infty}\left(\frac{18}{25}\right)^k
=\frac{1}{1-18/25}
=\frac{25}{7}
<10.
\end{aligned}
$$

Thus the strict geometric bound is 1<1.024^30<10. Dividing $10^{210}$ by this positive quantity reverses neither inequality: the denominator being greater than 1 gives $125^{100}<10^{210}$, while its being less than 10 gives $125^{100}>10^{209}$. Hence

$$
10^{209}<125^{100}<10^{210}.
$$

Equivalently, 10^209<125^100<10^210. Every positive integer strictly between these consecutive powers of ten has 210 digits, so $125^{100}$ has 210 digits.

## Why This Problem Matters

The main step is not large-number arithmetic but choosing a representation that exposes a nearby power of ten. Exact algebra followed by deliberately loose strict bounds is often enough to settle a discrete question such as a digit count.

## Common Mistakes

- Finding a plausible decimal estimate without proving that the value stays strictly between consecutive powers of ten.
- Proving only the upper bound on the correction factor; both sides are needed after division.
- Treating $1.024^{30}<10$ as obvious instead of supplying an elementary inequality.
- Losing strictness by replacing the finite binomial sum with an inadequately justified bound.

## Extensions

- Apply the same approach to powers whose prime factorization can be balanced against $2^a5^a=10^a$.
- Tighten the geometric estimate by using sharper bounds for the first few binomial coefficients.
- Determine leading-digit intervals by trapping the correction factor between closer rational bounds.

</details>
