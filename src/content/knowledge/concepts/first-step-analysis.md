---
title: First-Step Analysis
description: A state-decomposition technique that conditions on the first transition and turns stochastic-process questions into recursive equations.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Probability, Stochastic Processes, Problem Solving]
quantInterviewTopics: [stochastic-processes-stochastic-calculus, random-walks-markov-chains]
featured: false
related: [conditional-expectation-tower-property]
relatedNotes: []
---

## Core idea

Describe the quantity of interest from each state, condition on the first transition, and express the current state value as a weighted combination of future-state values.

## Recognition pattern

Use first-step analysis when a process restarts from a new state after one move and the same quantity can be defined recursively on those states.

## Common trap

The recursion is incomplete without correct boundary or terminal conditions. A valid state equation with incorrect boundaries still produces a wrong answer.
