---
problemId: 150-first-look-002
title: Missing Digit of a Power of Two
description: Determine a missing decimal digit from a large power using digit sums and modular arithmetic instead of direct computation.
date: 2026-08-16
originType: book
source: 150-most-frequently-asked
sourceSection: 'First Look: Ten Questions'
sourceChapter: '1'
sourceProblem: '2'
sourceReference: 'Chapter 1 · First Look · Question 2 · printed pp. 1, 4–6'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Number Theory, Digit Problems]
tags: [Modular Arithmetic, Number Theory, Interview]
concepts: [modular-arithmetic]
techniques: [modular-invariants]
prerequisites: []
relatedProblems: []
family: digit-congruence
mathDifficulty: 1
insightDifficulty: 2
interviewDifficulty: 2
estimatedMinutes: 5
status: solved
featured: false
---

## Problem

A certain power, `2^29`, is known to be a nine-digit decimal number whose nine digits are all distinct. Exactly one digit from `0,1,...,9` is therefore absent.

Find the absent digit without evaluating `2^29` in full.

## Think Before Revealing

The exact nine-digit value is irrelevant. Ask what information about a decimal integer is preserved when you replace the integer by the sum of its digits.

<details>
<summary>Hint 1</summary>

Modulo 9, every decimal integer is congruent to the sum of its digits.

</details>

<details>
<summary>Hint 2</summary>

If the missing digit is `x`, the nine digits that do appear have total sum `45 - x`. Also, `2^6 ≡ 1 (mod 9)`.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let the missing digit be `x`. Because the digits `0` through `9` sum to 45 and exactly one of them is absent, the digit sum of `2^29` is

`45 - x`.

For every decimal integer `n`, the number and its digit sum are congruent modulo 9. Therefore

`2^29 ≡ 45 - x (mod 9)`.

Now reduce the power without computing it. Since

`2^6 = 64 ≡ 1 (mod 9)`,

we have

`2^29 = 2^(24+5) ≡ 2^5 = 32 ≡ 5 (mod 9)`.

Hence

`45 - x ≡ 5 (mod 9)`.

Because `45 ≡ 0 (mod 9)`, this gives

`-x ≡ 5 (mod 9)`, or equivalently `x ≡ 4 (mod 9)`.

The unknown is a single decimal digit, so the only possibility is

**`x = 4`.**

## Why This Problem Matters

The interviewer is testing whether you can replace a large computation with the right invariant. The numerical exponent looks intimidating, but once you recognize the digit-sum congruence, the problem becomes a tiny residue calculation.

## Common Mistakes

- Computing `2^29` directly, which defeats the point of the question.
- Forgetting that zero is a legitimate candidate for the missing digit.
- Concluding from a congruence without intersecting it with the allowed set of decimal digits.
- Using modulo 10, which tracks only the final digit and does not connect to the sum of all digits.

## Extensions

- In base `b`, replace modulus 9 by `b - 1` and derive the corresponding digit-sum invariant.
- Ask what can be inferred if two digits are missing instead of one; a single congruence will usually leave several possibilities.
- Generalize to `a^n` by first studying the multiplicative cycle of `a` modulo 9.

</details>
