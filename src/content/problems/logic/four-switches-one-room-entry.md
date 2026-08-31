---
problemId: logic-logical-deduction-010
title: Four Switches with One Room Entry
description: Encode four possible controlling switches into the bulb's light and thermal state so one room entry identifies the correct switch.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Decision Trees, State Encoding]
tags: [Logical Deduction, Information, Brainteasers, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state, decision-trees-information-bounds-and-adaptive-testing]
techniques: []
prerequisites: []
relatedProblems: [two-guards-one-question, top-three-from-batched-races]
family: latent-state-identification
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

Outside a closed room are four labeled switches, all initially off. Inside is one ordinary incandescent bulb. Exactly one switch controls the bulb; the other three do nothing. You may operate the switches in any order but may enter the room exactly once. Once inside, you may look at the bulb and carefully touch it.

Give a procedure that identifies the controlling switch in that one entry. State the assumptions that make the light and temperature observations reliable, and explain why no entry cannot identify the switch.

## Think Before Revealing

<details><summary>Hint 1</summary>At entry, a bulb can reveal more than whether current flows through it.</details>
<details><summary>Hint 2</summary>Use present electrical state and recent thermal history as two binary observations.</details>

<details>
<summary>Show Solution</summary>

## Solution

Use the switches to encode four distinct combinations of present state and thermal history:

1. Turn switches 1 and 2 on long enough to heat the bulb if either controls it.
2. Turn switch 2 off and switch 3 on immediately before entry.
3. Switch 1 remains on and switch 4 remains off.

Enter the room and observe whether the bulb is lit, then whether it is hot. The four signatures decode the controlling switch:

| Switch | State at entry | Thermal state |
|---|---|---|
| 1 | `on` | `hot` |
| 2 | `off` | `hot` |
| 3 | `on` | `cold` |
| 4 | `off` | `cold` |

Thus a lit, hot bulb identifies switch 1; an unlit, hot bulb identifies switch 2; a lit, cold bulb identifies switch 3; and an unlit, cold bulb identifies switch 4. Present electrical state tells whether the controlling switch is currently on. Thermal history distinguishes the two switches that share that electrical state.

This schedule assumes bulbs switched on long enough become perceptibly hot and remain hot until entry, while a bulb never switched on remains perceptibly cold. It also assumes switch 3 has been on too briefly to become perceptibly hot, and that the observer can reliably distinguish hot from cold without waiting long enough for the useful heat difference to disappear. These are the relevant timing assumptions; no further engineering detail is needed.

With zero entries, every possible controlling switch gives the same outside observations: the switches can be set, but the bulb's resulting light and heat cannot be observed. Zero entries cannot identify the controlling switch because no outcome distinguishes the four hypotheses.

## Why This Problem Matters

The constraint is not merely “one observation.” It is an invitation to design that observation. By preserving both a current-state bit and a history bit, one room entry can carry four distinguishable outcomes.

## Common Mistakes

- Using only on and off positions, which creates at most two observed bulb states.
- Turning all heated switches off together, leaving no way to distinguish their thermal histories.
- Forgetting that switch 3 must be turned on only immediately before entry so its bulb is lit but still cold.
- Assuming that the word “hot” is meaningful without stating a wait time and a reliable temperature distinction.

## Extensions

- Ask how many candidate switches can be identified if only light, not temperature, is observable.
- Add a second independently observable physical property and count the signatures it creates.
- Replace the bulb with a device that retains a different measurable trace of its earlier electrical state.

</details>
