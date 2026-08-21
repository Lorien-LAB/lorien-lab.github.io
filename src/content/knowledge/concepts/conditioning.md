---
title: Conditioning
description: Conditional probability as a changed probability model, with chain rules, partitions, observation protocols, and first-step reasoning for interviews.
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
date: 2026-08-16
tags: [Probability, Conditional Probability, Problem Solving]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
featured: false
related: [conditional-expectation-tower-property]
relatedNotes: []
---

## Core Definition

Conditioning means updating the probability model after learning that some event or information is known. If `P(B)>0`, then

`P(A | B) = P(A ∩ B) / P(B)`.

A useful mental model is to restrict attention to the part of the sample space compatible with `B` and then renormalize probabilities inside that restricted world. The bar is not merely notation: it changes which outcomes are still possible and how they are weighted.

Equivalently, the intersection probability can be reconstructed as

`P(A ∩ B) = P(B) P(A | B)`.

## Multiplication Rule

The two-event multiplication rule is

`P(A ∩ B) = P(A) P(B | A) = P(B) P(A | B)`.

It is especially useful when a joint event is easier to build sequentially than to count directly. In an interview, ask whether the experiment naturally unfolds as a sequence of observations, draws, survival events, or state transitions.

## Chain Rule

For events `A_1,...,A_n` with the required conditioning probabilities defined,

`P(A_1 ∩ ... ∩ A_n) = P(A_1) P(A_2 | A_1) ... P(A_n | A_1 ∩ ... ∩ A_{n-1})`.

The chain rule is the probability analogue of decomposing one complicated path into a sequence of simpler conditional steps.

## Conditioning on a Partition

Let `F_1,...,F_k` form a partition of the sample space: the events are mutually exclusive and exactly one occurs. Any target event `E` can then be decomposed according to which branch of the partition occurred.

## Law of Total Probability

For a partition `F_1,...,F_k`,

`P(E) = Σ_i P(E | F_i) P(F_i)`.

This is the standard way to remove a hidden state. The partition should be chosen because each conditional branch is simpler than the original problem.

A good interview habit is to name the branches before calculating. For example, condition on which object was selected, which first move occurred, which hidden regime generated an observation, or which mutually exclusive terminal ordering happened.

## Independence Boundary

Events `A` and `B` are independent when

`P(A | B) = P(A)`

whenever the conditional probability is defined; equivalently, `P(A ∩ B)=P(A)P(B)`.

Independence is a statement about information: learning `B` does not change the probability of `A`. Do not infer independence merely because two variables look unrelated in the wording, and do not confuse it with mutual exclusivity.

Conditional independence is different again: two events can become independent after conditioning on a third variable even when they are dependent marginally, or vice versa.

## Information and Observation Protocols

A conditional probability is determined by **how the information was generated**, not only by the English sentence used to report it.

For two independent children with equally likely sexes, these are different experiments:

- you are told that **at least one child** is a boy;
- you are told that the older child is a boy;
- a **uniformly selected child** is observed and that child is a boy.

The compatible families and their weights differ, so the conditional answers need not agree. The same warning applies to named-child puzzles, medical screening, selective reporting, survival information, and any observation produced by a nonuniform selection mechanism.

Before calculating, specify:

1. the underlying states;
2. the mechanism that produces the observation;
3. the event actually being conditioned on.

If the mechanism is missing, a unique numerical answer may not be justified.

## First-Step Conditioning

**First-step conditioning** is a reusable method: condition on the first random event or next state, write a self-consistency equation, and solve it. This can simplify stopping-time, game, and recursive probability questions.

The method does not determine topic ownership by itself. If the main mathematical structure is a random walk, branching process, Markov chain, or expectation recursion, that problem should remain with its canonical stochastic-process or expectation topic even though conditioning appears inside the solution.

Expectation-side conditioning, the law of total expectation, and the tower property are developed separately in `conditional-expectation-tower-property`.

## Recognition Pattern

Look for a natural hidden state, first event, partial observation, survival event, selection mechanism, or partition that makes the remaining calculation simpler.

A strong conditioning choice usually turns one opaque probability into several transparent branches whose weights and conditional probabilities can be checked independently.

## Common Traps

- Reversing `P(A | B)` and `P(B | A)`.
- Shrinking the sample space but forgetting to renormalize.
- Treating verbal information as if its observation protocol were irrelevant.
- Multiplying probabilities without checking whether the later factor is conditional or independent.
- Applying first-step conditioning to a problem whose real difficulty belongs to a different canonical topic and then misclassifying the entire problem as “conditional probability.”

## Interview Checks

1. **Intersection reconstruction.** If `P(B)=0.4` and `P(A | B)=0.3`, what is `P(A ∩ B)`?  
   Answer: `0.4 × 0.3 = 0.12`.

2. **Partition.** If `F_1,F_2,F_3` partition the sample space, write `P(E)` without directly counting `E`.  
   Answer: `P(E)=Σ_i P(E | F_i)P(F_i)`.

3. **At least one child versus an observation.** Why can “a family has at least one child who is a boy” differ from “a uniformly selected child is observed to be a boy”?  
   Answer: they are different information protocols and induce different conditional weights on the underlying family states.

4. **Independence.** If `P(A | B)=P(A)` and `P(B)>0`, what does that say?  
   Answer: for those events, learning `B` does not change the probability of `A`; this is the conditional-probability characterization of independence.

5. **Model sufficiency.** A puzzle tells you that a family “has a child with a particular name” but does not explain naming frequency or how the fact was selected for reporting. Can you automatically assign a unique conditional probability to the other child's sex?  
   Answer: no. The observation protocol is part of the probability model.
