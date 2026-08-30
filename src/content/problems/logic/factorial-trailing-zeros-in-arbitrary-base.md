---
problemId: logic-modular-arithmetic-002
title: Factorial Trailing Zeros in an Arbitrary Base
description: Count trailing zeros of a factorial in any base by prime-factor valuations, then specialize to decimal and base twelve.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Number Theory, Factorials]
tags: [Modular Arithmetic, Valuations, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, modular-arithmetic]
concepts: [modular-arithmetic, counting-permutations-combinations]
techniques: []
prerequisites: []
relatedProblems: [missing-digit-power-of-two]
family: factorial-valuations
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

For integers $n\geq 1$ and $b\geq 2$, determine the number of trailing zeros in the base-$b$ representation of $n!$. Derive a formula from the prime factorization of $b$, then use it to find the numbers of trailing zeros of $100!$ in base 10 and in base 12.

## Think Before Revealing

<details><summary>Hint 1</summary>A trailing base-$b$ zero is one complete factor of $b$. Factor $b$ into prime powers and count how many copies of each required prime occur in $n!$.</details>
<details><summary>Hint 2</summary>The multiples of $p$ contribute one factor of $p$, the multiples of $p^2$ contribute one additional factor, and so on.</details>

<details>
<summary>Show Solution</summary>

## Solution

For a prime $p$, let $v_p(m)$ denote the exponent of $p$ in the prime factorization of $m$. Every multiple of $p$ contributes at least one factor of $p$ to $n!$, every multiple of $p^2$ contributes a second, and this continues until the powers exceed $n$. Legendre's formula is therefore

$$
v_p(n!) = \sum_{k\geq 1} \left\lfloor\frac{n}{p^k}\right\rfloor.
$$

The sum is finite because all terms with $p^k>n$ are zero.

Now factor the output base as

$$
b=\prod_i p_i^{e_i}.
$$

One trailing base-$b$ zero consumes $e_i$ copies of every $p_i$. The limiting prime power determines how many complete factors of $b$ divide $n!$, so

$$
z_b(n!) = \min_{p^e\parallel b} \left\lfloor\frac{v_p(n!)}{e}\right\rfloor.
$$

Here $p^e\parallel b$ means that $p^e$ divides $b$ but $p^{e+1}$ does not.

For $100!$ in base 10, use $10=2\cdot5$:

$$
v_2(100!) = 50+25+12+6+3+1 = 97,
$$

$$
v_5(100!) = 20+4 = 24.
$$

Therefore $z_{10}(100!)=\min(97,24)=24$.

For $100!$ in base 12, use $12=2^2\cdot3$. The exponent of 2 must be divided by 2, while each factor of 3 supplies the required exponent directly:

$$
v_3(100!) = 33+11+3+1 = 48,
$$

$$
z_{12}(100!)=\min\!\left(\left\lfloor\frac{97}{2}\right\rfloor,48\right)=\min(48,48)=48.
$$

Thus $100!$ has **24 trailing zeros in base 10** and **48 trailing zeros in base 12**.

## Why This Problem Matters

The notation for a numeral base can hide a divisibility question. Prime-factor valuations turn the representation problem into exact resource accounting: each trailing zero consumes a fixed bundle of prime factors, and the scarcest required factor controls the answer.

## Common Mistakes

- Counting only multiples of $p$ and missing the extra contributions from multiples of $p^2,p^3,\ldots$.
- Using the smallest raw valuation without dividing by the exponent $e_i$ required by the base.
- Assuming factors of 2 are always irrelevant; they tie with factors of 3 for $100!$ in base 12.
- Treating the formula as an approximation even though every floor term and the final minimum are exact.

## Extensions

- Determine which prime power limits the trailing-zero count for other bases such as 18, 24, or 60.
- Invert the formula: find the smallest $n$ for which $n!$ has at least a specified number of base-$b$ trailing zeros.
- Compare $v_p(n!)$ with the base-$p$ digit-sum identity $v_p(n!)=(n-s_p(n))/(p-1)$.

</details>
