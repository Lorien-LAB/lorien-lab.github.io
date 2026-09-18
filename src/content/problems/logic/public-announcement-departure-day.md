---
problemId: logic-logical-deduction-018
title: Public Announcement and Departure Day
description: Use common knowledge and induction to determine when marked participants act after a public announcement and repeated public non-actions.
date: '2026-09-18'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Epistemic Logic, Induction]
tags: [Logical Deduction, Common Knowledge, Public Announcement, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [common-knowledge-and-iterated-reasoning]
techniques: []
prerequisites: []
relatedProblems: [public-announcement-candidate-elimination]
family: public-announcement-induction
mathDifficulty: 2
insightDifficulty: 4
interviewDifficulty: 4
estimatedMinutes: 20
status: solved
featured: false
---

## Problem

A group of participants live under the following harmless protocol. Some participants are marked. Everyone can see whether every other participant is marked, but nobody can see their own status. All participants are perfect reasoners.

At noon on day 0, a moderator publicly announces: “At least one participant is marked.” The rules, everyone's observations, everyone's rationality, and the public announcement are common knowledge. A participant leaves at midnight as soon as they are certain that they themselves are marked. Everyone observes all departures.

If exactly $n\ge1$ participants are marked, on which night do the marked participants leave? Prove the result.

## Think Before Revealing

<details><summary>Hint 1</summary>Start with one marked participant. What does that person see immediately after the public announcement?</details>
<details><summary>Hint 2</summary>For the induction step, let a marked participant temporarily suppose they are unmarked and use the predicted behavior of the $n-1$ people they can see.</details>

<details>
<summary>Show Solution</summary>

## Solution

The marked participants all leave on **night $n$**. We prove this by induction.

### Base case: $n=1$

The unique marked participant sees no marked people. The public announcement guarantees that at least one marked participant exists. Therefore the only possibility consistent with what they see is that they themselves are marked, so they leave on night 1.

### Induction hypothesis

Assume that whenever exactly $n-1$ participants are marked, all of them leave on night $n-1$.

### Induction step

Now suppose exactly $n$ participants are marked. Pick any marked participant $A$. Participant $A$ sees exactly $n-1$ marked people.

Consider $A$'s counterfactual hypothesis: “I am unmarked.” Under that hypothesis there would be exactly $n-1$ marked participants, namely the people $A$ sees. By the induction hypothesis, those $n-1$ people would all leave on night $n-1$.

But in the actual $n$-marked state, nobody leaves before night $n$. In particular, when night $n-1$ passes without those $n-1$ people leaving, $A$ can reject the hypothesis that they are unmarked. Therefore $A$ knows they are marked.

The same reasoning applies symmetrically to every marked participant. At midnight on night $n$, all marked participants leave.

### Why the public announcement matters

When $n\ge2$, each marked participant already sees at least one marked person, so the statement “at least one is marked” may appear factually redundant. It is not epistemically redundant. The public announcement makes the existence claim common knowledge, which supplies the shared base case that every layer of the induction can rely on.

Observed non-departures are also public evidence. Each quiet night eliminates the lower-count world that would have produced departures one night earlier.

## Why This Problem Matters

The puzzle demonstrates the difference between private observation, mutual knowledge, and common knowledge. Repeated non-actions can transmit information when everyone knows that everyone is following the same rational protocol.

## Common Mistakes

- Saying the announcement adds no information because marked people can already see marks.
- Skipping the base case and appealing vaguely to “everyone reasons similarly.”
- Forgetting that a non-departure is observed by everyone and changes the next day's state of knowledge.
- Shifting the answer by one night because the noon/midnight timing convention is not stated.

## Extensions

- Change the action rule so participants act one full day after becoming certain and recompute the timing.
- Make the initial statement private rather than public and examine which induction step fails.
- Introduce imperfect observation and identify which common-knowledge assumptions are lost.

</details>
