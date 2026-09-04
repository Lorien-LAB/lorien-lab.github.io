---
problemId: logic-logical-deduction-012
title: Clock Hand Angles and Relative Motion
description: Compute clock-hand separations with continuous angular motion and locate neighboring coincidence times by relative speed.
date: '2026-09-05'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Relative Motion, Modular Angles]
tags: [Logical Deduction, Clocks, Relative Motion, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [logical-deduction-constraint-propagation-and-case-elimination, small-cases-recurrence-and-structural-simplification]
techniques: []
prerequisites: []
relatedProblems: [shortest-path-on-cube-surface]
family: clock-relative-motion
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Use an ideal continuous 12-hour analog clock: both hands move smoothly, a full turn is 360 degrees, and all times below are measured in minutes after 12:00. At 3:15 and at 4:15, find the smaller separation between the hands. Then find the two coincidence times immediately before and after 3:15.

## Think Before Revealing

<details>
<summary>Hint 1</summary>

Do not freeze the hour hand at its numeral. Express the minute hand and the hour hand as angles from 12 using the number of completed hours and minutes.

</details>

<details>
<summary>Hint 2</summary>

For coincidences, compare the hands' angular speeds. Consecutive meetings are separated by one full relative revolution; then select the two that bracket 3:15.

</details>

<details>
<summary>Show Solution</summary>

## Solution

Let $h$ be the completed hour number modulo 12 and let $m$ be the number of minutes after that hour. The minute hand advances 360 degrees in 60 minutes, so its angle from 12 is

$$
6m.
$$

The hour hand advances 30 degrees per hour and half a degree per minute, so its angle is

$$
30h+0.5m.
$$

Their unsigned separation is

$$
\delta=\left|6m-(30h+0.5m)\right|\pmod {360}.
$$

An analog-clock question normally asks for the smaller separation, so normalize it as

$$
\min(\delta,360-\delta).
$$

At 3:15, the minute hand is at $6(15)=90$ degrees and the hour hand is at $30(3)+0.5(15)=97.5$ degrees. The smaller angle is therefore **7.5 degrees**.

At 4:15, the minute hand is again at 90 degrees, while the hour hand is at $30(4)+0.5(15)=127.5$ degrees. The smaller angle is **37.5 degrees**.

For the coincidence times, the minute hand gains on the hour hand at **5.5 degrees per minute**:

$$
6-0.5=5.5\text{ degrees per minute}.
$$

It takes $360/5.5=720/11$ minutes to gain a full turn, so coincidences occur at integer multiples of $720/11$ minutes after 12:00. Since 3:15 is 195 minutes after 12:00, the independent bounds

$$
\frac{1440}{11}<195<\frac{2160}{11}
$$

identify the adjacent meetings. The coincidence immediately before 3:15 is **1440/11 minutes after 12:00**, and the one immediately after is **2160/11 minutes after 12:00**.

## Why This Problem Matters

The trap is treating the hour hand as stationary between numerals. Modeling both hands continuously turns a visual puzzle into two linear motions, and the same relative-speed idea applies to runners on a track, rotating sensors, and cyclic schedules.

## Common Mistakes

- Using $30h$ alone for the hour hand and omitting its motion during the current hour.
- Reporting the larger arc when the conventional clock angle is the smaller one.
- Solving one coincidence time but not checking which neighboring multiples surround the requested clock time.
- Mixing clock readings with minutes after 12:00 without stating the reference point.

## Extensions

- Find the time between any two consecutive meetings by dividing a full turn by the hands' relative angular speed.
- Replace the 12-hour dial with a dial having $n$ equal sectors and derive the corresponding hand-angle formulas.
- Include a seconds hand and determine when all three hands coincide.

</details>
