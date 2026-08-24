---
title: Bounded Monotone Convergence and Fixed Points
description: Prove real recursive sequences converge through invariant bounds and monotonicity before using continuity to identify admissible fixed points.
date: 2026-08-24
type: concept
domain: Mathematics & Statistics
category: Calculus
status: growing
tags: [Calculus, Limits, Sequences]
quantInterviewTopics: [calculus-differential-equations, limits-derivatives]
featured: false
related: [indeterminate-limits-and-growth-rates]
relatedNotes: []
---

## Core Idea

A recursive sequence is not known to converge merely because its formal limit would satisfy a fixed-point equation. First prove convergence, commonly through monotonicity plus a bound or through convergent even and odd subsequences. Only after convergence is proved may continuity identify the limit.

## Bounded Monotone Convergence

Every bounded monotone real sequence converges: every increasing real sequence bounded above converges, and every decreasing real sequence bounded below converges. The proof obligation therefore has two independent parts: an induction establishing monotonicity and an induction establishing the bound.

## Invariant Intervals and Induction

For $x_{n+1}=F(x_n)$, an interval $I$ is invariant if $F(I)\subseteq I$. Prove $x_0\in I$ and the implication $x_n\in I\Rightarrow x_{n+1}\in I$. This supplies bounds but not necessarily monotonicity.

## Alternating Recurrences and Even/Odd Subsequences

If $F$ is decreasing, consecutive terms can oscillate. Study $x_{2n}$ and $x_{2n+1}$ separately. If the even terms increase, the odd terms decrease, and both remain in a common compact interval, they have limits $a$ and $b$. The recurrence then relates $a$ and $b$; a separate argument must prove $a=b$ before the full sequence converges.

## Continuity after Convergence

Once $x_n\to L$ is proved and $F$ is continuous at $L$,

\[
L=\lim x_{n+1}=\lim F(x_n)=F(L).
\]

This step comes after convergence. Reversing that order is circular.

## Fixed Points Give Candidates, Not Convergence

The equation $L=F(L)$ can have several roots, roots outside the invariant interval, or roots even when the original sequence diverges. Use positivity, bounds, and the proved trajectory to select among candidates.

## Continued-Fraction Safeguard

For

\[
c_0=2,
\qquad
c_{n+1}=2+\frac2{c_n},
\]

the map is decreasing and preserves $[2,3]$. The even subsequence increases and the odd subsequence decreases; their limits coincide. Only then does

\[
L=2+\frac2L
\]

give the admissible limit

\[
L=1+\sqrt3.
\]

## Nested-Radical Safeguard

For $a_1=\sqrt2$ and $a_{n+1}=\sqrt{2+a_n}$, prove by induction that the sequence is increasing and that $a_n<2$. Bounded monotone convergence then permits the fixed-point equation, whose positive solution is $L=2$.

## Power-Tower Safeguard

If an infinite tower is requested to equal $2$, the positive base is

\[
x=\sqrt2.
\]

For the finite towers $t_0=\sqrt2$ and $t_{n+1}=(\sqrt2)^{t_n}$, prove increasing behavior and the invariant upper bound $t_n<2$. The proved limit is $L=2$. Both $2$ and $4$ satisfy the fixed-point equation, so branch $4$ must be rejected using $L\le2$.

## Recognition Signals

- A recursive radical, continued fraction, or power tower asks for convergence before algebraic limit selection.
- A decreasing recurrence suggests alternating even/odd subsequences.
- Several fixed-point roots signal the need for positivity or an invariant interval.
- “Clearly converges” is a warning that a bound or monotonicity proof is missing.

## Common Mistakes

- Solving $L=F(L)$ before proving that a limit exists.
- Proving only boundedness or only monotonicity.
- Assuming convergent even and odd subsequences have the same limit.
- Selecting a fixed point merely because it is positive when a sharper bound is available.
- Confusing a power tower's base with its limit.

## Interview Checks

For each of the three safeguards above, state the induction base, induction step, bound, convergence theorem, fixed-point candidates, and final selection in that order.
