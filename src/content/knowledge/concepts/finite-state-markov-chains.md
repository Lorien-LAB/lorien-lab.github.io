---
title: Finite-State Markov Chains
description: Model finite stochastic systems with transition matrices, communicating classes, stationarity, and first-step equations for hitting and return questions.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-24
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
featured: false
related: [conditioning, conditional-expectation-tower-property, first-step-analysis, markov-chain-state-compression]
relatedNotes: []
---

## Markov property and transition law

For a finite state space $S$, the Markov property says that, conditional on the current state, the next-state law does not depend on the earlier path. A homogeneous chain uses the same transition law at every time.

Under the row-vector convention, $P\_{ij} ≥ 0$, each row of $P$ sums to one, $μ\_{t+1}=μ\_tP$, and $μ\_t=μ\_0P^t$. Matrix powers give multi-step transitions, and $P^{r+s}=P^rP^s$ is the Chapman–Kolmogorov relation.

## State structure

Reachability from state $i$ to state $j$ means $(P^t)\_{ij}>0$ for some integer $t≥0$. States $i$ and $j$ communicate when each is reachable from the other; mutual communication partitions the state space into communicating classes. A class is closed when no one-step transition leaves it. An absorbing state is a one-state closed class, equivalently a state with $P\_{ii}=1$. These distinctions identify which targets can be hit and which terminal behavior can persist.

## Stationarity and periodicity

A stationary law satisfies $π=π P$. A finite irreducible chain has a unique stationary law. Aperiodicity is needed for ordinary convergence to stationarity; it is not required for uniqueness or for the mean positive-return identity. Multiple closed classes can make stationary laws nonunique.

## First-step equations

For hitting a target before failure, first assign boundary value $1$ to target states and $0$ to failure states; these are the boundary values on all terminal states. On every nonterminal state, conditioning on the next step gives the harmonic equations

\[
h\_i=∑\_j P\_{ij}h\_j.
\]

For expected hitting time, set $t\_i=0$ on the target and solve

\[
t\_i=1+∑\_j P\_{ij}t\_j
\]

off the target. Finiteness and uniqueness require the modeled target to be reached under the relevant conditions; otherwise a hitting expectation can be infinite.

## Mean positive return

With $T\_i^+=min\{t≥1:X\_t=i\}$, a finite irreducible chain satisfies $E\_i[T\_i^+]=1/π\_i$. Positive return starts at time one and is not the time-zero hitting time.

## Interview Checks

- **Matrix orientation:** Under the row-vector convention, which side of $P$ multiplies the distribution?
- **Stationary versus limiting:** Why can $π=π P$ hold even when $μ\_t$ does not converge?
- **Periodicity:** Which claims need aperiodicity, and which only need finite irreducibility?
- **Boundary equations:** Which values are fixed before writing harmonic or hitting-time equations?
- **Positive return:** Why is $T\_i^+$ defined with $t≥1$?

## Scope boundary

This finite discrete-time toolkit does not develop martingales, Brownian motion, Itô calculus, or continuous-time chains.
