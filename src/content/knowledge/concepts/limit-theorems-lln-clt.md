---
title: Law of Large Numbers and Central Limit Theorem
description: Distinguish the law of large numbers from the central limit theorem and reason about convergence of sums and sample averages.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
tags: [Probability, Random Variables, Distributions]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
related: []
relatedNotes: []
---

## Core Idea

The **Law of Large Numbers (LLN)** and the **Central Limit Theorem (CLT)** answer different questions about repeated random sampling.

- The LLN tells us **where an average goes** as the sample size grows.
- The CLT tells us the **scale and limiting shape of the fluctuations** around that average.

Confusing these statements is a common interview mistake. The LLN is a consistency result; the classical CLT is a distributional approximation result after centering and `sqrt(n)` scaling.

## Setup

Let

`X_1,X_2,...`

be independent identically distributed random variables with common mean

`mu=E[X_i]`.

Define

`S_n=X_1+...+X_n`

and the sample average

`Xbar_n=S_n/n`.

The exact assumptions needed depend on the version of the theorem. In interview settings, state the classical assumptions you are using instead of treating “LLN” or “CLT” as assumption-free slogans.

## Convergence in Probability

A sequence `Y_n` converges in probability to `Y`, written

`Y_n -> Y in probability`,

if for every `epsilon>0`,

`P(|Y_n-Y|>epsilon) -> 0`.

Interpretation: for large `n`, the probability of being materially far from `Y` becomes small.

This is the convergence mode used in the **Weak Law of Large Numbers**.

## Almost Sure Convergence

`Y_n` converges almost surely to `Y` if

`P(lim_{n->infinity} Y_n = Y)=1`.

This is a stronger pathwise statement. Except on an event of probability zero, the realized sequence itself eventually converges to the target.

Almost sure convergence implies convergence in probability.

## Weak Law of Large Numbers

Under standard iid assumptions with finite mean, a classical weak law states

`Xbar_n -> mu in probability`.

Equivalently, for every `epsilon>0`,

`P(|Xbar_n-mu|>epsilon) -> 0`.

So averaging many observations stabilizes the sample mean around the population mean.

The weak law does **not** say that the sample mean equals `mu` for finite `n`, nor does it describe the exact distribution of the error.

## Strong Law of Large Numbers

A standard strong law states, under suitable integrability assumptions,

`Xbar_n -> mu almost surely`.

The strong law therefore strengthens the mode of convergence from probability to almost sure convergence.

At interview level, the conceptual distinction matters more than reciting the most general technical assumptions:

- **weak law:** deviations larger than `epsilon` become unlikely;
- **strong law:** almost every infinite sample path has averages converging to `mu`.

## Convergence in Distribution

A sequence `Y_n` converges in distribution to `Y` if its CDFs converge to the CDF of `Y` at continuity points of the limiting CDF:

`F_{Y_n}(x) -> F_Y(x)`.

This is weaker than convergence in probability when both variables live on the same probability space.

Convergence in distribution describes the asymptotic shape of a distribution. It does not generally say that `Y_n` becomes close to `Y` outcome by outcome.

## Classical Central Limit Theorem

Suppose `X_1,X_2,...` are iid with finite mean `mu` and **finite variance**

`Var(X_i)=sigma^2`, `0<sigma^2<infinity`.

Then

`(S_n-n mu)/(sigma sqrt(n)) -> N(0,1) in distribution`.

Equivalently,

`sqrt(n)(Xbar_n-mu)/sigma -> N(0,1) in distribution`.

The `sqrt(n)` scaling is essential. Typical sample-mean fluctuations are of order `1/sqrt(n)`.

## What the CLT Actually Gives

For large `n`, the sample mean is approximately distributed as

`Xbar_n ≈ N(mu, sigma^2/n)`

under the classical iid finite-variance setup.

This approximation is striking because the original observations need not be Normal. The limiting Gaussian shape emerges after summing or averaging many independent contributions under appropriate assumptions.

But the CLT is a limiting statement. It does **not** claim that the finite-sample distribution is exactly Normal.

## LLN Versus CLT

A compact comparison:

| Question | LLN | CLT |
|---|---|---|
| What happens to `Xbar_n`? | approaches `mu` | fluctuations around `mu` become Gaussian after scaling |
| Main object | level of the sample mean | centered and scaled error |
| Typical scaling | none | `sqrt(n)` |
| Common convergence mode | probability or almost surely | distribution |
| Gives an approximate finite-sample shape? | no | yes, asymptotically |

The two theorems complement each other rather than compete.

## Why the Variance Shrinks Like `1/n`

If the observations are independent with variance `sigma^2`, then

`Var(Xbar_n)=Var(S_n/n)=sigma^2/n`.

So the standard deviation of the average is

`sigma/sqrt(n)`.

This explains why `sqrt(n)` is the natural normalization in the classical CLT.

The calculation itself is moment algebra, but here it serves to explain the distributional scaling rather than to make variance computation the topic.

## Heavy Tails and the Classical CLT Boundary

The classical iid CLT stated above assumes finite variance.

A heavy-tailed distribution can violate this assumption. For example, the standard Cauchy distribution has no finite variance and even lacks a proper finite expectation. Its sample average does not obey the classical Gaussian CLT in the usual way.

This does not mean every infinite-variance problem has no limit theorem. More general stable-law and domain-of-attraction results exist, but they are separate from the classical interview statement.

## Independence and Identical Distribution

The clean textbook form assumes iid observations, but there are broader CLTs for non-identically distributed or weakly dependent sequences.

In an interview, avoid saying “the CLT works for any large sample.” State the assumptions supporting the version you invoke.

Useful follow-up questions include:

- Are the observations independent?
- Is the variance finite?
- Is one observation dominating the sum?
- Is the sample large relative to the skewness or tail heaviness of the underlying distribution?

## Characteristic Functions and MGFs

Characteristic functions are a standard proof tool for convergence in distribution because sums of independent variables turn products of characteristic functions into manageable expressions.

Moment generating functions can play a similar role when they exist in a neighborhood of zero.

For this Knowledge node, the main takeaway is structural: transforms can characterize distributions and simplify sums. Direct calculation of higher moments is a separate expectation-focused task.

## Common Mistakes

- Saying the LLN implies the data themselves become less random.
- Saying the CLT makes the original observations Normal.
- Forgetting to center by `mu` before applying the CLT.
- Forgetting the `sqrt(n)` scaling.
- Treating convergence in distribution as pathwise convergence.
- Claiming strong and weak laws are the same statement.
- Applying the classical CLT without checking the finite variance assumption.
- Assuming “large `n`” guarantees a good Normal approximation regardless of extreme skewness or heavy tails.

## Interview Checks

1. **One-sentence distinction.** State the LLN and CLT in one sentence each without using them interchangeably.
2. **Weak Law.** What does `Xbar_n -> mu in probability` mean in terms of `P(|Xbar_n-mu|>epsilon)`?
3. **Strong Law.** How does almost sure convergence in the Strong Law differ from the Weak Law’s convergence in probability?
4. **Scaling.** Why is the CLT normalization `sqrt(n)(Xbar_n-mu)` rather than `n(Xbar_n-mu)`?
5. **Convergence mode.** Does convergence in distribution imply convergence in probability? Explain why not in general.
6. **Finite-sample warning.** If the CLT applies, is `Xbar_n` exactly Normal for a finite `n`? When would it be exact?
7. **Heavy-tail boundary.** Why should a Cauchy-distributed sample make you question the classical finite-variance CLT?
8. **Assumption check.** Before invoking a Normal approximation for a sum, which independence, tail, and variance assumptions would you ask about?
