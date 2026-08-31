---
problemId: logic-logical-deduction-007
title: Two Guards, Two Doors, One Question
description: Design one yes-or-no question that identifies the desirable door when one guard always lies and the other always tells the truth.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Boolean Logic, Case Analysis]
tags: [Logical Deduction, Truth Tables, Brainteasers, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state, logical-deduction-constraint-propagation-and-case-elimination]
techniques: []
prerequisites: []
relatedProblems: [two-cube-calendar-digit-labeling, message-delivery-with-independent-padlocks]
family: truth-liar-questions
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Two doors stand before you. Exactly one is desirable. One guard always lies, and the other always tells the truth; you do not know which guard is which. You may ask one yes-or-no question to either guard. Find a question and a response rule that identify the desirable door.

Ask either guard: “If I asked the other guard whether the door you are standing by is the desirable door, would the other guard say yes?” If the answer is yes, choose the other door; if the answer is no, choose the door guarded by the person you asked.

Each guard's behavior is deterministic: one always lies and one always tells the truth. The two doors, the guards' behavior rules, and the fact that exactly one door is desirable are common knowledge.

## Think Before Revealing

<details><summary>Hint 1</summary>Ask about the other guard's answer rather than asking directly about a door.</details>
<details><summary>Hint 2</summary>Track whether the chosen guard reverses the other guard's answer once or twice.</details>

<details>
<summary>Show Solution</summary>

## Solution

Use the nested question in the prompt. It makes the answer `Yes` exactly when the chosen guard's door is bad, so reverse that answer: choose the selected guard's door after `No`, and choose the other door after `Yes`.

The four cases are:

| Chosen guard | Chosen door | Other would say yes? | Chosen answer yes? | Choose chosen door? |
| --- | --- | --- | --- | --- |
| Liar | Bad | No | Yes | No |
| Liar | Good | Yes | No | Yes |
| Truthful | Bad | Yes | Yes | No |
| Truthful | Good | No | No | Yes |

For a truthful chosen guard, the answer repeats what the other guard would say. For a lying chosen guard, it reverses that answer. Since the other guard has the opposite behavior, both cases produce the same final signal: `Yes` means the chosen door is bad, while `No` means it is good.

## Why This Problem Matters

Nested questions turn an unknown truthfulness type into a predictable double transformation. Listing the cases makes the invariant visible: the question produces a response tied to the door, not to the identity of the guard.

## Common Mistakes

- Asking one guard directly whether that guard's door is desirable, which leaves the unknown truthfulness unresolved.
- Asking what the other guard would say but then following `Yes` instead of reversing it.
- Treating the guards as probabilistic rather than using their deterministic rules.

## Extensions

- Change the question so it refers to the other door and derive the corresponding response rule.
- Add a third guard with a stated behavior pattern and determine what can still be inferred.
- Replace truthfulness with a binary device that deterministically inverts selected answers.

</details>
