---
title: Joint Extremes and Sample Range
description: Analyze the joint behavior of sample minima and maxima, derive sample ranges, and distinguish marginal extreme distributions from their dependence structure.
date: 2026-08-23
type: concept
domain: Mathematics & Statistics
category: Probability
status: growing
tags: [Probability, Statistics, Order Statistics, Extremes]
quantInterviewTopics: [probability-statistics, order-statistics-extremes]
featured: false
related: [order-statistics-basics, expectation-variance-covariance-algebra]
relatedNotes: [Marginal order-statistic formulas are the starting point for joint extremes., Scalar covariance algebra converts joint moments into dependence measures without invoking covariance-matrix PSD theory.]
---

## Core Idea

For an iid sample define

\[
L=X_{(1)},\qquad U=X_{(n)},\qquad R=U-L.
\]

Knowing the marginal laws of \(L\) and \(U\) is enough for quantities such as \(E[R]=E[U]-E[L]\), but it is **not** enough for \(Cov(L,U)\). Dependence questions require joint information.

## Joint Distribution of the Minimum and Maximum

Assume the sample is iid from a continuous CDF \(F\) with density \(f\). For \(l<u\), the joint density of the minimum and maximum is

\[
f_{L,U}(l,u)
=
n(n-1)[F(u)-F(l)]^{n-2}f(l)f(u).
\]

The factors have a direct interpretation:

- choose which observation is the minimum and which is the maximum: \(n(n-1)\) choices;
- place one observation near \(l\) and one near \(u\);
- force the remaining \(n-2\) observations into \((l,u)\).

The support condition \(l<u\) is part of the distribution, not a cosmetic detail.

## Uniform Extremes and Range

For \(U_1,\ldots,U_n\stackrel{iid}{\sim}U(0,1)\),

\[
E[U_{(n)}]=\frac{n}{n+1},
\qquad
E[U_{(1)}]=\frac{1}{n+1}.
\]

Therefore linearity of expectation immediately gives

\[
E[R]
=
E[U_{(n)}]-E[U_{(1)}]
=
\frac{n-1}{n+1}.
\]

Notice that this calculation does **not** require independence between the minimum and maximum. In fact, they are generally dependent.

## A Useful n=2 Product Identity

For any two real numbers \(x_1,x_2\),

\[
\min(x_1,x_2)\max(x_1,x_2)=x_1x_2.
\]

Thus if

\[
Y=\min(X_1,X_2),\qquad Z=\max(X_1,X_2),
\]

then

\[
YZ=X_1X_2.
\]

For independent \(U(0,1)\) variables,

\[
E[YZ]=E[X_1X_2]=\frac14.
\]

Together with the marginal moments of \(Y\) and \(Z\), this gives covariance and correlation much faster than evaluating a two-dimensional integral.

## Marginals Do Not Determine Dependence

From the marginal distributions alone you can compute \(E[L]\), \(E[U]\), \(Var(L)\), and \(Var(U)\). But

\[
Cov(L,U)=E[LU]-E[L]E[U]
\]

also needs the cross moment \(E[LU]\). This is why a joint density or a structural identity such as \(LU=X_1X_2\) matters.

This is a scalar covariance question. Covariance-matrix positive-semidefinite feasibility remains a separate Linear Algebra topic.

## Common Mistakes

- Assuming the sample minimum and maximum are independent because their marginal densities are easy to derive.
- Forgetting the support \(l<u\) in the joint density.
- Trying to compute \(E[U-L]\) from a joint density when linearity gives \(E[U]-E[L]\) immediately.
- Confusing scalar min/max correlation with covariance-matrix PSD constraints.

## Interview Checks

1. For \(n\) iid Uniform observations, derive \(E[U_{(n)}-U_{(1)}]=(n-1)/(n+1)\).
2. Why does the joint min/max density contain the factor \([F(u)-F(l)]^{n-2}\)?
3. Are the sample minimum and maximum independent? What additional quantity is needed to compute their covariance?
4. For two iid \(U(0,1)\) variables, use \(\min(X_1,X_2)\max(X_1,X_2)=X_1X_2\) to find the cross moment.
