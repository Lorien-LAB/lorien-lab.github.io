---
title: State Compression for Markov Chains
description: Construct sufficient Markov states for streaks, patterns, symmetric walks, and coalescing systems while preserving transitions and terminal events.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-24
tags: [Probability, Stochastic Processes, Markov Chains, State Compression, Problem Solving]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
featured: false
related: [finite-state-markov-chains, first-step-analysis, recursion-problem-solving]
relatedNotes: []
---

## Sufficiency test

A compressed state is valid only when it preserves every fact needed for both the next-state law and the target event. Terminal success and failure status must be preserved as well as transition probabilities.

## Streak and pattern states

A streak problem retains the relevant trailing streak, such as whether the preceding roll was a seven. A pattern problem retains the longest current suffix that is also a prefix of a target pattern. On a mismatch, fall back to the longest still-viable suffix rather than automatically returning to the empty state.

## Symmetry and lumpability

Symmetry can aggregate microstates. For the simple symmetric cube walk on $\{0,1\}^d$, there are no self-loops: at each step one of the $d$ coordinates is chosen uniformly, so all $d$ neighboring vertices receive equal probability $1/d$. Hamming distance from a fixed reference vertex is sufficient because vertices at the same distance have the same transition totals between distance levels. The formal property is strong lumpability: a partition $(B\_1,…,B\_m)$ is strongly lumpable when, for every pair $x,x'∈B\_a$ and every block $B\_b$,

\[
∑\_{y∈B\_b}P(x,y)=∑\_{y∈B\_b}P(x',y).
\]

That equality makes the total transition probability into every aggregate block independent of the chosen representative. Terminal success and failure status are preserved by the aggregation as well.

## Recoloring example

Consider the following fixed protocol on a complete graph, starting with all initial colors distinct. At each step, an ordered pair $(u,v)$ of distinct vertices is chosen uniformly; the second vertex $v$ copies the first vertex $u$'s color. In this model, the forward number of colors is not a sufficient Markov state because transition probabilities depend on the color-class sizes. The backward active-lineage count is sufficient: only ancestry coalescences matter, giving a valid one-dimensional compression. This sufficiency claim depends on the stated complete-graph and uniform ordered-pair protocol; different update rules require a new lumpability check.

## Interview Checks

- **Valid compression:** Does the proposed state determine the next-state law?
- **Suffix fallback:** After a mismatch, what is the longest suffix that remains a target prefix?
- **Symmetry:** Do all microstates in one block send equal total probability to every other block?
- **Target preservation:** Can success and failure be distinguished after aggregation?
