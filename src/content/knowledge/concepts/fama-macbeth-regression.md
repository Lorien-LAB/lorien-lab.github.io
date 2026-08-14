---
title: Fama–MacBeth Regression
description: A two-stage asset-pricing procedure that estimates exposures through time and then tests whether those exposures are priced in the cross-section.
type: concept
domain: Quantitative Finance
category: Asset Pricing
status: mature
date: 2026-08-14
tags:
  - asset pricing
  - cross-sectional regression
  - factor models
  - econometrics
featured: true
related: []
relatedNotes: []
---

## What it is

Fama–MacBeth regression is a two-stage framework for testing cross-sectional asset-pricing relationships. In a common implementation, the first stage estimates each asset or portfolio's exposure to one or more risk factors. The second stage repeatedly regresses realized returns on those estimated exposures across assets.

## Why it matters

The method separates **risk exposure estimation** from **cross-sectional pricing**. It is useful when the research question is not merely whether a factor explains time-series variation, but whether bearing that factor exposure is associated with a return premium across assets.

## Core mechanism

For asset or portfolio \(i\), the first-stage time-series regression estimates factor loadings such as \(\beta_i\). At each later date \(t\), a cross-sectional regression can be written schematically as

\[
R_{i,t} = \gamma_{0,t} + \gamma_{1,t}\hat\beta_i + \varepsilon_{i,t}.
\]

The sequence of cross-sectional coefficients \(\gamma_{1,t}\) is then averaged through time. In multi-factor applications, the same logic extends to several estimated exposures or characteristics.

## Assumptions and interpretation

The quality of the second stage depends on the first-stage exposure estimates, the cross-sectional specification, and the dependence structure of the estimated risk premia. Statistical significance should therefore be interpreted with attention to estimation error, serial dependence, sample construction, and the economic meaning of the factor.

## Common pitfalls

- treating estimated betas as error-free inputs;
- using an unstable or too-short first-stage window;
- confusing a significant time-series beta with a priced cross-sectional premium;
- ignoring changing factor definitions or universe composition;
- interpreting a single specification as conclusive evidence of an anomaly.

## In this research portfolio

The framework is relevant to Lorien Lab's A-share CAPM and low-beta anomaly work, where time-series risk estimates and cross-sectional return tests are used as distinct stages of the empirical design.
