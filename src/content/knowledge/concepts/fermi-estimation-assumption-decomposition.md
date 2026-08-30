---
title: Fermi Estimation & Assumption Decomposition
description: Build auditable Fermi estimates by defining units, decomposing assumptions, bounding sensitive factors, cross-checking independently, and planning validation.
date: '2026-08-30'
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Fermi Estimation, Assumptions, Sensitivity, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, problem-simplification]
featured: false
related: [small-cases-recurrence-and-structural-simplification, problem-framing-clarification-assumption-management]
relatedNotes: []
---

## Core Idea

A Fermi estimate is an auditable model, not a recalled fact. Define the quantity, decompose it into assumptions, calculate a defensible range, and make the uncertainty visible enough for another person to challenge or update it.

## Define the Estimate

State the target quantity, unit, time horizon, and boundary before calculating. For example, distinguish transactions per day in one service area from customers currently present across a region. Record what is included, excluded, and held constant so the answer does not drift as the reasoning develops.

## Assumption Tree

Use a multiplicative assumption tree that separates drivers:

```text
annual demand = eligible population × participation rate × uses per participant per year
```

Keep the branches independently discussable. If geography, customer segment, capacity, or frequency changes, update the relevant branch rather than hiding several claims inside one large number.

## Ranges and Units

For each uncertain driver, give a low, base, and high value with units. Convert units at each multiplication and test dimensions at the end. Distinguish a stock, such as active accounts at a point in time, from a flow, such as new accounts per month; dividing or multiplying by time is meaningful only when the two are not confused.

## Sensitivity

Rank assumptions by sensitivity: vary one driver across its credible range and observe how much the final estimate moves. Spend explanation time on the few high-sensitivity assumptions, not on minor inputs that cannot materially change the conclusion.

## Independent Cross-Check

Build an independent cross-check from a different driver, such as capacity, spending, physical footprint, or staffing. Reconcile disagreement by finding the assumption or boundary that differs, then revise the range rather than averaging incompatible models.

## Validation Plan

End with a current-data validation plan: name the authoritative or first-party dataset to consult, the observation that would most reduce uncertainty, and the assumption to replace first. This turns the estimate into a decision-ready hypothesis rather than a static answer.

## Common Mistakes

Memorized answers hide assumptions and make adaptation difficult. False precision—reporting many digits from rough inputs—suggests certainty the model does not possess. Other errors include mixing stock with flow, omitting units, and treating a convenient guess as an evidence-backed range.

## Interview Checks

1. Define the relevant locations and the geographic boundary before estimating demand.
2. Separate the number of locations from the visits per location and the time period.
3. Ask whether specialized providers change the eligible population or the participation rate.
4. State low, base, and high assumptions with units before giving a midpoint.
5. Produce an independent capacity-based cross-check and explain any disagreement.
6. Identify the single highest-sensitivity input and the current datum needed to validate it.
