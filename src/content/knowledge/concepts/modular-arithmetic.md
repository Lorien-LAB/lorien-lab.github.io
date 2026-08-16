---
title: Modular Arithmetic
description: Arithmetic with congruence classes, useful for divisibility, digit, cycle, and remainder problems in quantitative interviews.
type: concept
domain: Mathematics & Statistics
category: Discrete Mathematics
status: growing
date: 2026-08-16
tags: [Number Theory, Modular Arithmetic, Interview]
featured: false
related: [modular-invariants]
relatedNotes: []
---

## Core idea

Two integers are congruent modulo `m` when they leave the same remainder after division by `m`. Congruences respect addition, subtraction, and multiplication, which lets large calculations collapse to small residue calculations.

## Base-10 digit-sum rule

Because `10 ≡ 1 (mod 9)`, every decimal integer is congruent modulo 9 to the sum of its digits. The same idea generalizes: in base `b`, the digit sum is congruent to the number modulo `b - 1`.

## Recognition pattern

Look for powers with repeating residues, divisibility questions, unknown digits, cyclic processes, or statements where the exact number is enormous but only a remainder matters.

## Common trap

A congruence usually narrows the possibilities rather than determining an integer uniquely. Use domain restrictions—such as “the unknown is a single decimal digit”—to finish the argument.
