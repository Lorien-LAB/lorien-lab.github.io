---
title: Recursion for Problem Solving
description: A reusable technique that defines a quantity in terms of smaller states, subproblems, or neighboring values and solves the resulting recurrence.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Recursion, Dynamic Programming, Problem Solving]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning]
featured: false
related: []
relatedNotes: []
---

## Core idea

Replace one difficult object with a relation among simpler versions of the same object. Once the recurrence and its boundary conditions are correct, solve them algebraically or compute them systematically.

## Recognition pattern

Look for repeated state structure, a natural reduction in size, or neighboring states whose answers determine the current answer.

## Common trap

A recurrence is not a solution by itself. Check base cases, uniqueness, and whether the recurrence covers every reachable state before simplifying it.
