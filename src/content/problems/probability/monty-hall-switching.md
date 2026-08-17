---
problemId: conditional-probability-bayes-003
title: Monty Hall and an Informed Reveal
description: Model the host's information policy explicitly and show why switching keeps the original two-door probability mass.
date: 2026-08-17
domain: Mathematics & Statistics
category: Probability
subcategories: [Conditional Probability, Information]
tags: [Probability, Conditioning, Bayes, Interview]
quantInterviewTopics: [probability-statistics, conditional-probability-bayes]
concepts: [conditioning]
techniques: []
prerequisites: []
relatedProblems: []
family: informed-reveal
mathDifficulty: 2
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

There are three closed doors. Exactly one hides a prize and the other two do not. You choose one door.

The host follows this policy:

- the host **knows where the prize is**;
- after your choice, the host **always opens an unchosen door that does not contain the prize**;
- when two losing doors are available, either may be chosen according to a fixed rule that does not move the prize;
- the host **always offers you the chance to switch** to the one remaining unopened door.

Should you stay or switch, and what is the probability of winning under each strategy?

## Think Before Revealing

Your first choice was made before seeing any information. What probability did that door have of being correct at that moment, and what probability belonged to the two-door set you did not choose?

<details>
<summary>Hint 1</summary>

Your original door has probability `1/3` of hiding the prize. The prize is in the other two doors with total probability `2/3`.

</details>

<details>
<summary>Hint 2</summary>

The host's reveal is constrained by knowledge of the prize. Opening a known losing door does not turn your original `1/3` choice into a `1/2` choice.

</details>

<details>
<summary>Show Solution</summary>

## Solution

The original choice is correct with probability

`P(original prize)=1/3`.

It is wrong with probability

`P(original wrong)=2/3`.

Now condition on these two cases.

### Case 1: the original choice is correct

This occurs with probability `1/3`. Both unchosen doors are losing doors, so the host can reveal one of them. If you switch, you move away from the prize and lose.

### Case 2: the original choice is wrong

This occurs with probability `2/3`. Among the two unchosen doors, one hides the prize and one is a losing door. Because the host knows the prize location and must reveal a losing door, the host is forced to remove the losing alternative. The only remaining unopened door is the prize door. If you switch, you win.

Therefore

`P(win by staying)=1/3`,

and

`P(win by switching)=2/3`.

The host has not created new prize probability by opening a door. Instead, the informed reveal tells you which member of the original `2/3` unchosen set can be discarded without discarding the prize.

### Conditional-probability view

Let `C` denote that your initial choice is correct and let `R` denote the host's policy-constrained reveal. Under the stated rules, the event `R` occurs whether `C` is true or false; it is not an uninformed random elimination. The reveal mechanism depends on the hidden prize location, which is exactly why the remaining unchosen door inherits the advantage of the original unchosen set.

## Why This Problem Matters

The interview lesson is not merely “switch because the answer is `2/3`.” The real lesson is that **the information-generation mechanism is part of the probability model**. A knowledgeable agent who selectively reveals information produces a different conditional distribution from a random uninformed reveal.

The same structure appears in censored data, selective disclosure, missing-not-at-random observations, and trading signals that are only published after filters have been applied.

## Common Mistakes

- Saying “two doors remain, so each is `1/2`” without modeling how one door was removed.
- Forgetting that the original choice remains correct only with probability `1/3`.
- Treating the host as if the host might accidentally reveal the prize.
- Omitting the assumptions that the host always reveals a loser and always offers a switch.
- Using the standard `2/3` result when the reveal policy is actually different.

## Extensions & Variants

If an **uninformed person randomly opens** one of the two unchosen doors and you merely happen to observe that it is empty, that is a different experiment. The random opener could have exposed the prize, so conditioning on the lucky empty reveal changes the sample space differently.

Likewise, if the host sometimes offers a switch and sometimes does not, or chooses whether to offer based on the prize location, the offer itself carries information. The correct answer must then condition on the full host policy rather than reuse `2/3` automatically.

With `N` doors, if you choose one and an informed host opens `N-2` known losing doors while always leaving exactly one alternative unopened, your initial choice retains probability `1/N` and the remaining alternative has probability `(N-1)/N`.

</details>
