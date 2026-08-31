---
title: Modular Invariants
description: A problem-solving technique that tracks a quantity modulo a carefully chosen integer instead of computing the full state.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Problem Solving, Invariants, Modular Arithmetic]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, modular-arithmetic, invariants-state-transformations]
featured: false
related: [modular-arithmetic, constraint-reframing-and-latent-state]
relatedNotes: []
---

## Core idea

When exact values are unwieldy, search for a residue class that is preserved or easy to update. A well-chosen modulus can expose the only feasible answer without reconstructing the entire object.

## Canonical pattern

1. Identify the unknown quantity and its allowed set.
2. Pick a modulus suggested by the structure: digit base, parity, cycle length, or divisibility.
3. Reduce every known term modulo that modulus.
4. Solve the resulting congruence.
5. Intersect the congruence class with the original allowed set.

## Recognition pattern

Digit puzzles naturally suggest modulus 9 or 11; parity arguments suggest modulus 2; repeating powers suggest a modulus whose multiplicative cycle is short.

## Common trap

Do not confuse “equal modulo `m`” with ordinary equality. The final domain restriction is often the step that turns a residue into a unique answer.
