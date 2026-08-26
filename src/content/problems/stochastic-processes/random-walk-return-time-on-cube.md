---
problemId: random-walks-markov-chains-004
title: Random Walk Return Time on the Cube
description: Compute the first positive return time on the cube using stationarity and Hamming-distance state compression.
date: 2026-08-24
domain: Mathematics & Statistics
category: Stochastic Processes
subcategories: [Random Walks, Markov Chains]
tags: [Probability, Stochastic Processes, Markov Chains, Interview]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
concepts: [finite-state-markov-chains]
techniques: [markov-chain-state-compression, first-step-analysis]
prerequisites: []
relatedProblems: [random-walk-boundary]
family: finite-graph-return-time
mathDifficulty: 3
insightDifficulty: 3
interviewDifficulty: 4
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

On the eight cube vertices, start at vertex (v). At every step choose one of the current vertex's three neighbors uniformly. Find the expected first positive return time

```text
T_v^+ = min{t >= 1 : X_t = v}
```

The ordinary hitting time at the starting vertex would be zero; this question starts counting at time one.

## Think Before Revealing

There are two short routes. A connected regular graph has a uniform stationary law, which controls mean positive return. Independently, cube symmetry lets us compress vertices by Hamming distance from (v) and solve three first-step equations.

<details>
<summary>Hint 1</summary>

For the stationary route, recall that a finite irreducible chain has mean positive return (1/pi_v). Decide whether the cube's period affects that identity or only affects convergence of time marginals.

</details>

<details>
<summary>Hint 2</summary>

For the direct route, let (E_d) be the expected remaining hitting time from distance (d). A vertex at distance (d) has (d) edges toward distance (d-1) and (3-d) edges toward distance (d+1).

</details>

<details>
<summary>Show Solution</summary>

## Solution

### Stationary-law method

The cube graph is connected and 3-regular, so the simple walk is irreducible. For an undirected graph, the stationary mass of a vertex is proportional to its degree. Every cube vertex has degree three, so the stationary law is uniform on the eight vertices: (pi_v=1/8). The finite irreducible mean positive-return identity therefore gives

```text
E_v[T_v^+] = 1/pi_v = 8
```

The cube is bipartite and has period two. That periodicity prevents ordinary convergence from every starting state at every time, but it does not invalidate the stationary law or the mean positive-return identity. No artificial self-loop is needed.

### Hamming-distance method

Let (E_d) be the expected time to hit (v) from Hamming distance (d), with (E_0=0). At distance one, one of three edges hits (v) and two go to distance two. At distance two, two edges go to distance one and one goes to distance three. From the antipode at distance three, every edge goes to distance two. First-step analysis gives

```text
E_1 = 1 + (2/3)E_2
E_2 = 1 + (2/3)E_1 + (1/3)E_3
E_3 = 1 + E_2
```

Substitute (E_3=1+E_2) into the middle equation. After collecting terms, (E_2=2+E_1). The first equation then becomes (E_1=1+(2/3)(2+E_1)), so (E_1/3=7/3) and

```text
E_1 = 7
```

The original return clock starts at (v), not at distance one. Its first move always spends one step and reaches distance one, hence

```text
E_v[T_v^+] = 1 + E_1 = 8
```

Both methods compute the same positive return quantity. The first exposes a structural theorem; the second checks it through an explicit compressed chain.

## Why This Matters

The example separates three ideas that are often conflated: time-zero hitting, first positive return, and convergence to stationarity. It also demonstrates two complementary interview methods. A stationary-law identity can give the answer immediately, while a symmetry-based first-step system verifies the state model and arithmetic.

## Common Mistakes

- Answering zero by using the ordinary hitting time at the starting vertex instead of (T_v^+).
- Adding a self-loop even though the stated walk always chooses one of three neighbors.
- Claiming period two invalidates the stationary law or the mean positive-return identity.
- Forgetting the initial one step when converting (E_1=7) into the return time from (v).

## Extensions

1. On the (d)-dimensional hypercube, use regularity to show that the mean positive return to a fixed vertex is (2^d), then build the distance-chain recurrence as a check.
2. On a connected nonregular undirected graph, replace the uniform law by (pi_v=deg(v)/(2|E|)) and compare return times at vertices of different degrees.
3. Add laziness with a specified self-loop probability and identify which conclusions change: periodicity disappears, but the stationary law and mean return remain the same.

</details>
