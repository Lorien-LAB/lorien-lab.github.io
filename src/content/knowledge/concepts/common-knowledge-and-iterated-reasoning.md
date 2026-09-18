---
title: Common Knowledge & Iterated Reasoning
description: Model public announcements, mutual knowledge, observed non-actions, and induction when each round changes what every participant can infer.
date: '2026-09-18'
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Epistemic Logic, Common Knowledge, Public Announcements, Induction, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
featured: false
related: [logical-deduction-constraint-propagation-and-case-elimination]
relatedNotes: []
---

## Core Idea

A fact can be known by everyone without being common knowledge. Common knowledge means everyone knows it, everyone knows that everyone knows it, and so on through every finite level. Public announcements matter because they update the shared information state at all of those levels at once.

In repeated-reasoning puzzles, an observed non-action is itself public evidence. If a participant was expected to act under a lower-order hypothesis and does not, everyone can eliminate that hypothesis before the next round.

## Information Partitions and Public Updates

Represent the world as a set of possible states. Each participant has an information partition: states in the same cell are indistinguishable from that participant's private observation.

A truthful public announcement removes every state in which the statement would be false. Because everyone hears the announcement and knows that everyone hears it, all participants update to the same reduced public state space before applying their private information again.

## Mutual Knowledge versus Common Knowledge

Mutual knowledge means each participant individually knows a fact. That does not necessarily imply that one participant knows that the others know it.

A public statement can change reasoning even when it appears to reveal a fact already visible to each participant. What changes is the hierarchy of beliefs: the statement establishes a common starting point for iterated deductions.

## Iterated Non-Action

Suppose a protocol says that a participant acts as soon as a condition becomes certain. If nobody acts in round 1, that public non-action rules out all states in which someone would have been certain immediately. If nobody acts in round 2, everyone may rule out states that would have produced certainty after one round, and so on.

The clock convention must be explicit. State when observations are made, when deductions occur, and when actions happen; otherwise an otherwise correct induction can be shifted by one round.

## Induction Template

For a family indexed by an integer $n\ge1$:

1. Prove the base case $n=1$.
2. Assume the protocol outcome is known for $n-1$.
3. Consider what a participant in an $n$-state would infer under the hypothesis that they are not part of the distinguished group.
4. Under that hypothesis, the others would form an $n-1$ state and would act according to the induction hypothesis.
5. When the predicted action does not happen, eliminate the hypothesis.
6. Conclude the $n$-case and record the exact round.

## Common Mistakes

- Treating a visible fact as automatically common knowledge.
- Forgetting that “nothing happened” can be informative.
- Using induction without stating the participant's counterfactual hypothesis.
- Mixing observations before and after a public update.
- Leaving the action-time convention implicit.

## Interview Checks

1. Give an example of a fact that two people both know but that is not common knowledge.
2. In a two-state public-announcement model, write the survivor set after a truthful announcement that eliminates one state.
3. Explain why a public non-action can remove states even though no new private signal was observed.
4. State the base case and induction step for a protocol where exactly $n$ participants act on round $n$.
5. Construct a timing convention with observations at noon and actions at midnight, then explain how one day of non-action becomes evidence.
6. Compare a private message sent independently to every participant with one public announcement. Why can the resulting higher-order knowledge differ?
