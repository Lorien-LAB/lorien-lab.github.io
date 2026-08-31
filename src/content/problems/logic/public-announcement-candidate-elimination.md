---
problemId: logic-logical-deduction-002
title: Public-Announcement Candidate Elimination
description: Update a finite candidate set after successive truthful public statements about private information until one state remains.
date: '2026-08-30'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Epistemic Logic, Case Elimination]
tags: [Logical Deduction, Public Information, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [logical-deduction-constraint-propagation-and-case-elimination]
techniques: []
prerequisites: []
relatedProblems: [bridge-crossing-minimum-time]
family: public-announcement-elimination
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 15
status: solved
featured: false
---

## Problem

A public board lists the possible states

`{(A,3), (A,6), (A,9), (B,3), (B,8), (C,2), (C,6), (D,2), (D,5), (D,9)}`.

The Letter Holder is privately told the letter in the true state, while the Number Holder is privately told its number. Each participant is perfectly rational and truthful. The candidate list, the rules, their rationality, and every public statement are common knowledge.

They make these statements in order:

1. Letter Holder: “I do not know the state, and I know that Number Holder does not know it.”
2. Number Holder: “After hearing that, I now know the state.”
3. Letter Holder: “After hearing that, I now know the state.”

Update the shared candidate set after every statement and identify the true state.

## Think Before Revealing

<details><summary>Hint 1</summary>Group the current candidates into cells with the same private letter or the same private number. Knowing means that the relevant cell has one member.</details>
<details><summary>Hint 2</summary>After each public statement, discard every state from which that statement would be false, then rebuild both participants' information cells using only the survivors.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let `S0` be the public initial set. A statement removes a candidate exactly when a rational holder with the stated private information could not truthfully make that statement. The successive shared sets are:

| Stage | Candidate set |
|:---:|:---|
| `S0` | `{(A,3), (A,6), (A,9), (B,3), (B,8), (C,2), (C,6), (D,2), (D,5), (D,9)}` |
| `S1` | `{(A,3), (A,6), (A,9), (C,2), (C,6)}` |
| `S2` | `{(A,3), (A,9), (C,2)}` |
| `S3` | `{(C,2)}` |

Here is why each filter is valid.

For the first statement, Letter Holder must have more than one candidate with the observed letter, or the opening “I do not know” would be false. More strongly, every number paired with that letter must occur in at least two candidates of `S0`; otherwise Letter Holder would consider a state in which Number Holder knew immediately and could not claim to know that Number Holder did not know.

- For A, the possible numbers 3, 6, and 9 each occur twice in `S0`, so the entire A cell survives.
- For C, the possible numbers 2 and 6 each occur twice, so the entire C cell survives.
- B is eliminated because 8 occurs only in `(B,8)`.
- D is eliminated because 5 occurs only in `(D,5)`.

This gives `S1`.

Number Holder's second statement is interpreted relative to the newly public set `S1`, not the original board. In `S1`, numbers 3, 9, and 2 each occur once, while 6 occurs twice. Therefore the two candidates carrying 6 are eliminated, leaving `S2 = {(A,3), (A,9), (C,2)}`.

Letter Holder now recomputes the letter cells in `S2`. Letter A still has two candidates, `(A,3)` and `(A,9)`, but letter C has only `(C,2)`. The third statement is truthful only in the singleton C cell, so `S3 = {(C,2)}`. The unique true state is **(C, 2)**.

## Why This Problem Matters

Public information changes the state space from which later knowledge is evaluated. The central skill is not guessing what a speaker meant; it is repeatedly rebuilding information partitions after truthful statements become common knowledge.

## Common Mistakes

- Treating “I know that the other person does not know” as merely “I do not know.”
- Evaluating the second or third statement against the original candidate set instead of the current survivor set.
- Eliminating only the visibly unique number 8 and overlooking that the whole B letter cell must support the first statement.
- Stopping at a consistent state without proving that every alternative has been removed.

## Extensions

- Change one candidate on the public board and recompute all three announcements to test the sensitivity of the conclusion.
- Reverse which holder speaks first and compare the resulting information filters.
- Continue with a larger finite relation and implement each announcement as a predicate over current information cells.

</details>
