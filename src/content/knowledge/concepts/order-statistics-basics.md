---
title: Order Statistics
description: Derive the distributions of sample minima, maxima, and general kth order statistics, with uniform and Beta representations for common interview problems.
date: 2026-08-23
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
tags: [Probability, Statistics, Order Statistics, Extremes]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
featured: false
related: [random-variables-cdf-pmf-pdf, random-variable-transformations-convolution, joint-extremes-and-range]
relatedNotes: [Order statistics are random variables built by sorting a sample., Probability transforms turn continuous order statistics into Beta variables., Joint extremes extend marginal min/max formulas to dependence and range questions.]
---

## Core Idea

Given iid observations \(X_1,\ldots,X_n\), write their sorted values as

\[
X_{(1)}\le X_{(2)}\le\cdots\le X_{(n)}.
\]

The parentheses matter: \(X_{(k)}\) is the **kth smallest value**, not the original observation \(X_k\). In particular, \(X_{(1)}\) is the sample minimum and \(X_{(n)}\) is the sample maximum.

The most reliable interview habit is **distribution first**: derive the CDF of the ordered quantity, then differentiate or integrate only if the question asks for a density or expectation.

## Maximum and Minimum

Let the common CDF be \(F\). Independence gives

\[
P(X_{(n)}\le x)=P(X_1\le x,\ldots,X_n\le x)=F(x)^n.
\]

Hence

\[
F_{X_{(n)}}(x)=F(x)^n.
\]

For the minimum, the complement is cleaner:

\[
P(X_{(1)}>x)=P(X_1>x,\ldots,X_n>x)=[1-F(x)]^n,
\]

so

\[
F_{X_{(1)}}(x)=1-[1-F(x)]^n.
\]

If \(F\) has density \(f\), differentiation gives

\[
f_{X_{(n)}}(x)=nF(x)^{n-1}f(x),
\]

and

\[
f_{X_{(1)}}(x)=n[1-F(x)]^{n-1}f(x).
\]

The powers come from independence. Without independence, the marginal CDF \(F\) alone does not determine the maximum or minimum law.

## General kth Order Statistic

The event \(X_{(k)}\le x\) means at least \(k\) of the \(n\) observations are at most \(x\). Since each indicator “\(X_i\le x\)” is Bernoulli with probability \(F(x)\),

\[
P(X_{(k)}\le x)
=
\sum_{j=k}^{n}{n\choose j}F(x)^j[1-F(x)]^{n-j}.
\]

For a continuous distribution, differentiating and simplifying yields

\[
f_{X_{(k)}}(x)
=
\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}[1-F(x)]^{n-k}f(x).
\]

A useful local interpretation is: one observation lands near \(x\), exactly \(k-1\) lie below it, and exactly \(n-k\) lie above it.

## Probability Integral Transform and Beta Representation

For continuous \(F\), each \(F(X_i)\) is Uniform on \((0,1)\). Sorting commutes with a monotone transform, so

\[
F(X_{(k)})\sim \operatorname{Beta}(k,n+1-k).
\]

In particular, for \(U_i\stackrel{iid}{\sim}U(0,1)\),

\[
U_{(k)}\sim \operatorname{Beta}(k,n+1-k),
\qquad
E[U_{(k)}]=\frac{k}{n+1}.
\]

This single identity contains the familiar uniform minimum and maximum expectations as \(k=1\) and \(k=n\).

## Median and Quantile Connection

For an odd sample size \(n=2m+1\), the sample median is the middle order statistic \(X_{(m+1)}\). More generally, empirical quantiles are built from ordered observations, although software packages use several finite-sample interpolation conventions. For interview work, state the convention rather than pretending there is one universal finite-sample definition.

## Boundary: iid Extremes versus Process Extremes

The formulas above concern a finite iid sample. A quantity such as

\[
\max_{0\le t\le T} B_t
\]

for Brownian motion is a continuous-time process extreme and generally requires tools such as the reflection principle or stopping-time arguments. It is not an iid order-statistic problem.

## Common Mistakes

- Writing \(F_{\max}(x)=nF(x)\) instead of \(F(x)^n\).
- Attacking \(P(\max X_i>x)\) directly when the complement \(P(\max X_i\le x)\) factorizes immediately.
- Forgetting that \(X_{(k)}\) means kth smallest, not kth largest.
- Using iid formulas when observations are dependent.
- Replacing \(E[\max X_i]\) by “max of the expectations.” These are different operations.

## Interview Checks

1. If \(X_1,\ldots,X_n\) are iid with CDF \(F\), what is the CDF of their maximum? Why is independence needed?
2. Show that the minimum CDF is \(1-[1-F(x)]^n\).
3. For iid continuous observations, derive the density of \(X_{(k)}\) by counting how many observations lie below and above \(x\).
4. If \(U_1,\ldots,U_n\sim U(0,1)\), what is \(E[U_{(k)}]\)? Answer: \(k/(n+1)\).
5. Why is the maximum of a finite iid Gaussian sample an order statistic, while the maximum of Brownian motion over an interval is not handled by this chapter?
