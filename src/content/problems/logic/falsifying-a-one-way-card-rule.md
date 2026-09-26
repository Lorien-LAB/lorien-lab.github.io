---
problemId: logic-logical-deduction-016
title: Falsifying a One-Way Card Rule
description: Determine the minimum inspections needed to test a universal implication without confusing the rule with its converse.
date: '2026-09-18'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Logic, Falsification]
tags: [Logical Deduction, Implication, Contrapositive, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [conditional-implication-contrapositive-and-falsification]
techniques: []
prerequisites: []
relatedProblems: []
family: implication-falsification
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Four cards lie on a table showing 7, 6, A, and C. Each card has a letter on one side and a number on the other. You want to test the rule:

“If a card has a vowel on one side, then it has an even number on the other side.”

Which cards must be turned over to determine whether the rule is violated? Prove that your set of inspections is both necessary and sufficient.

## Think Before Revealing

<details><summary>Hint 1</summary>Write the rule as $P\Rightarrow Q$. What is the only truth assignment that makes an implication false?</details>
<details><summary>Hint 2</summary>A visible consequent can confirm nothing about the antecedent, but a visible failure of the consequent may hide a violating antecedent.</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $P$ mean “the letter is a vowel” and $Q$ mean “the number is even.” The rule is $P\Rightarrow Q$, which is false only in the state $P\land\neg Q$.

Therefore:

- **A must be inspected.** It visibly satisfies $P$. If its hidden number is odd, the rule is violated.
- **7 must be inspected.** It visibly satisfies $\neg Q$. If its hidden letter is a vowel, the rule is violated.
- **6 need not be inspected.** It visibly satisfies $Q$. Its hidden letter may be a vowel or a consonant; both are compatible with $P\Rightarrow Q$.
- **C need not be inspected.** It visibly satisfies $\neg P$. The implication imposes no restriction on the hidden number.

Thus the necessary and sufficient inspection set is **A and 7**.

Necessity follows because either uninspected card could conceal the unique counterexample pattern: A could hide an odd number, and 7 could hide a vowel. Sufficiency follows because after both are checked, every possible instance of $P\land\neg Q$ among the four cards has been ruled out.

Equivalently, the contrapositive is $\neg Q\Rightarrow\neg P$: an odd-number card must not have a vowel on its reverse. That is why 7 matters. The converse $Q\Rightarrow P$ is not part of the rule, which is why 6 does not matter.

## Why This Problem Matters

The problem tests whether you can distinguish falsification from confirmation. Universal one-way rules are audited by searching for counterexamples, not by collecting examples that merely look supportive.

## Common Mistakes

- Turning over 6 because an even number appears in the rule.
- Turning over A but forgetting the odd-number card.
- Assuming the converse “even implies vowel.”
- Treating C as relevant despite the false antecedent.

## Extensions

- Replace the symbols with a compliance rule such as “production record implies signed approval.”
- Add a second implication and determine how the inspection set changes.
- Generalize to many visible cards and characterize the minimum audit set from $P$ and $\neg Q$ observations.

</details>
