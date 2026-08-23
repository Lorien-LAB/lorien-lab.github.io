---
title: Common Probability Distributions
description: Recognize standard discrete and continuous distributions from their generating mechanisms, supports, and defining probability functions.
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
date: 2026-08-18
tags: [Probability, Random Variables, Distributions]
quantInterviewTopics: [probability-statistics, random-variables-distributions]
featured: false
related: [expectation-variance-covariance-algebra, moments-moment-generating-functions, order-statistics-basics]
relatedNotes: [Scalar moment identities organize distribution summaries., Moment-generating functions provide a systematic route to higher moments when they exist., Uniform and Beta families recur naturally in order-statistic distributions.]
---

## Core Idea

In interviews, knowing a distribution means more than remembering a formula. The highest-value skill is to recognize the **mechanism** that generates the random variable, identify its support and parameters, and then derive whatever property is needed.

A useful first question is:

> Is this variable a count, a trial index, a waiting time, a bounded proportion, or an approximately Gaussian aggregate?

That classification often identifies the relevant family before any calculation begins.

## Discrete Uniform

A discrete uniform variable assigns equal mass to each value in a finite set such as `{a,a+1,...,b}`.

If there are `m=b-a+1` possible values,

`P(X=x)=1/m` on the support.

**Recognition pattern:** a finite list of equally likely numerical outcomes.

## Binomial

`X~Binomial(n,p)` counts successes in `n` independent Bernoulli trials, each with success probability `p`.

Support: `{0,1,...,n}`.

PMF:

`P(X=k)=C(n,k)p^k(1-p)^(n-k)`.

**Recognition pattern:** fixed number of independent trials; count how many succeed.

Do not confuse Binomial with Negative Binomial. Binomial fixes the number of trials and randomizes the number of successes.

## Poisson Distribution

`X~Poisson(lambda)` is a nonnegative integer-valued count with

`P(X=k)=exp(-lambda) lambda^k/k!`, `k=0,1,2,...`.

Here `lambda` is the expected count in the modeled interval under this parameterization.

**Recognition pattern:** a count of relatively sparse events over a fixed exposure window when a constant-rate model is appropriate.

A Poisson **distribution** is a random-variable model for a count. A full Poisson **process** contains additional time-indexed stochastic structure and is a different level of modeling.

## Geometric

A Geometric variable records the trial number of the first success in independent Bernoulli trials with probability `p`.

Using support `{1,2,...}`,

`P(X=k)=(1-p)^(k-1)p`.

**Recognition pattern:** “How many trials until the first success?”

The Geometric distribution is the discrete memoryless distribution:

`P(X>s+t | X>s)=P(X>t)`

when the support convention is handled consistently.

Be explicit about whether the successful trial is included. Some texts instead count failures before the first success and use support `{0,1,...}`.

## Negative Binomial

A Negative Binomial variable extends the Geometric family by recording how long it takes to reach the `r`-th success.

With `X` defined as the trial number of the `r`-th success,

`P(X=k)=C(k-1,r-1)p^r(1-p)^(k-r)`, `k=r,r+1,...`.

**Recognition pattern:** continue independent Bernoulli trials until a fixed number of successes has occurred.

## Continuous Uniform

`X~U(a,b)` spreads probability evenly across `[a,b]`.

Density:

`f_X(x)=1/(b-a)` for `a<=x<=b`.

**Recognition pattern:** a location or time is chosen uniformly from a continuous interval.

For two independent uniforms, geometry in a rectangle or square is often the fastest way to compute probabilities.

## Normal / Gaussian

`X~N(mu,sigma^2)` has density

`f_X(x)=1/(sigma sqrt(2 pi)) * exp(-(x-mu)^2/(2 sigma^2))`.

**Recognition pattern:** symmetric noise around a location, linear combinations inside a Gaussian model, or limiting fluctuations justified by a central limit theorem.

Standardization converts the variable to

`Z=(X-mu)/sigma ~ N(0,1)`.

Do not infer Normality merely from symmetry, a bell-shaped histogram, or knowledge of only the first two moments.

## Exponential

`T~Exp(lambda)` with rate `lambda>0` has support `[0,infinity)` and density

`f_T(t)=lambda exp(-lambda t)`, `t>=0`.

Survival function:

`P(T>t)=exp(-lambda t)`.

**Recognition pattern:** nonnegative waiting time under a constant-hazard model.

Its defining interview property is **memorylessness**:

`P(T>s+t | T>s)=P(T>t)`.

Thus, after already waiting `s`, the remaining waiting time has the same distribution as a fresh exponential wait. This is a property of the Exponential model, not of an arbitrary waiting-time distribution.

## Gamma

A Gamma variable models a positive accumulated waiting time or positive skewed quantity. Under the rate parameterization with shape `alpha` and rate `lambda`, a common density is

`f_X(x)=lambda^alpha x^(alpha-1) exp(-lambda x)/Gamma(alpha)`, `x>=0`.

When `alpha` is a positive integer, Gamma naturally describes the waiting time until a specified number of constant-rate arrivals.

**Recognition pattern:** sums of compatible exponential waiting times or positive skewed durations.

Always check whether a problem uses a **rate** or **scale** parameterization.

## Beta

`X~Beta(alpha,beta)` lives on `(0,1)` with density proportional to

`x^(alpha-1)(1-x)^(beta-1)`.

**Recognition pattern:** a random probability, fraction, bounded proportion, or a flexible distribution constrained to the unit interval.

Changing `alpha` and `beta` can create symmetric, skewed, U-shaped, or concentrated densities.

## Cauchy and the Moment-Existence Warning

The standard Cauchy density is

`f_X(x)=1/[pi(1+x^2)]`.

It is symmetric around zero, but its tails are so heavy that the usual expectation does **not** exist. The symmetric principal value being zero is not the same as a proper finite expectation.

Its variance also does not exist.

This makes Cauchy a valuable interview counterexample:

- symmetry does not guarantee a finite mean;
- a density integrating to one does not guarantee finite moments;
- algebra involving `E[X]` or `Var(X)` is invalid until existence is justified.

## Recognition Map

A compact classification guide:

- fixed `n`, count successes -> **Binomial**;
- count events in a fixed exposure interval -> **Poisson distribution**;
- trials until first success -> **Geometric**;
- trials until `r` successes -> **Negative Binomial**;
- equal chance over a bounded interval -> **Uniform**;
- nonnegative constant-hazard waiting time -> **Exponential**;
- accumulated positive waiting time -> **Gamma**;
- probability/proportion on `(0,1)` -> **Beta**;
- Gaussian linear structure or justified limiting fluctuations -> **Normal**;
- very heavy-tailed symmetric counterexample -> **Cauchy**.

## Parameterization Traps

Before using a memorized formula, state the convention.

- Exponential/Gamma may use **rate** `lambda` or **scale** `theta=1/lambda`.
- Normal may be written `N(mu,sigma^2)` or occasionally with the second parameter described as the standard deviation.
- Geometric may count trials including the success or failures before success.
- Negative Binomial has several equivalent counting conventions.

Clear definitions are more valuable than guessing which convention an interviewer intended.

## Common Mistakes

- Treating a Poisson count distribution and a Poisson process as interchangeable objects.
- Using means instead of rates in exponential competition formulas without converting them.
- Assuming every waiting-time model is memoryless.
- Forgetting support, especially for Gamma, Beta, and count distributions.
- Applying moment formulas to a Cauchy variable without first checking moment existence.
- Memorizing a PMF/PDF but failing to explain the generating mechanism.

## Interview Checks

1. **Binomial versus Poisson.** One hundred independent orders each fill with probability `0.02`. What exact count model is natural? Under what approximation regime might a Poisson distribution also be useful?
2. **Geometric recognition.** A strategy succeeds independently each day with probability `p`. What distribution describes the day of the first success, and which support convention are you using?
3. **Exponential definition.** State the density and survival function of `Exp(lambda)`, then prove the memoryless identity from the survival function.
4. **Rate versus mean.** If an Exponential waiting time has mean `10`, what is its rate?
5. **Poisson distribution.** State the support and PMF of a Poisson random variable and explain why this statement alone does not define a stochastic process.
6. **Cauchy trap.** The standard Cauchy density is symmetric. Why is it incorrect to conclude automatically that `E[X]=0`?
7. **Beta recognition.** Why is Beta a more natural generic family for a random probability than a Normal distribution?
8. **Parameter conventions.** Give two common definitions of a Geometric variable and explain how the support changes.
