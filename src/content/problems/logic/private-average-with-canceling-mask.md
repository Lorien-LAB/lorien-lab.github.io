---
problemId: logic-logical-deduction-011
title: Private Average with a Canceling Mask
description: Compute a group average through a masked running sum, prove exact cancellation, and state the protocol's limited privacy model.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Protocol Design, Algebraic Masking]
tags: [Logical Deduction, Privacy, Protocols, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state, problem-framing-clarification-assumption-management]
techniques: []
prerequisites: []
relatedProblems: [message-delivery-with-independent-padlocks]
family: masked-aggregation
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 12
status: solved
featured: false
---

## Problem

Eight neutral participants hold private values `s_1` through `s_8` and want to publish their exact average without directly announcing their individual values. They may communicate only around a private ring channel: participant 1 sends to participant 2, then onward through participant 8, which returns to participant 1. Arithmetic is exact. Participant 1 may choose a mask `r` known only to that participant. Give a protocol, prove that it returns the exact average, and state precisely what privacy it does and does not provide.

Assume every participant is honest and non-colluding. The private channel hides a message from people outside its two endpoints; it does not add any broader security property.

## Think Before Revealing

<details><summary>Hint 1</summary>Start the running value with an extra term that only participant 1 can later remove.</details>
<details><summary>Hint 2</summary>Write the message after each participant as the previous message plus that participant's input.</details>

<details>
<summary>Show Solution</summary>

## Solution

Participant 1 chooses `r`, adds `s_1`, and sends the result privately to participant 2. Each later participant adds only that participant's own value before forwarding the running value. Participant 8 returns the final running value to participant 1. Participant 1 subtracts `r`, divides by `8`, and publishes the resulting aggregate average.

The symbolic transcript is:

1. `m_1 = r + s_1`
2. `m_2 = r + s_1 + s_2`
3. `...`
4. `m_8 = r + sum_{i=1}^{8} s_i`
5. `m_8 - r = sum_{i=1}^{8} s_i`
6. `(m_8 - r) / 8 = (sum_{i=1}^{8} s_i) / 8`

Each forwarding step preserves the earlier terms and appends exactly one new input. By induction, the value returned by participant 8 is `r + sum_{i=1}^{8} s_i`. Since participant 1 knows `r`, subtraction cancels the mask exactly; division by `8` is therefore the requested average.

This is a deliberately limited privacy model. Honest, non-colluding participants use private channels around the ring, and the mask is known only to participant 1. For a single participant numbered 2 through 8, the sent-minus-received difference reveals only that participant's own input. Participant 1 is different: its sent-minus-received value is `m_1 - m_8 = -sum_{i=2}^{8} s_i`, the negative aggregate of the other seven inputs. The public aggregate and any side information may still reveal individual values. This small protocol does not address collusion, dishonest inputs, authentication, auditing, or a general secure-aggregation setting.

## Why This Problem Matters

The key reframing is to carry an extra latent term through a running sum and remove it only after every input has been included. In an interview, state both the invariant and the assumptions: algebraic cancellation proves correctness, while the communication and behavior assumptions define the narrow privacy claim.

## Common Mistakes

- Starting the ring with `s_1` rather than `r + s_1`, which exposes the first value to participant 2.
- Forgetting to subtract `r` before dividing, which leaves the published average shifted by `r / 8`.
- Treating a private channel as if it prevents endpoint observations or protects against collusion.
- Assuming the protocol detects dishonest inputs or verifies that every participant followed the prescribed step.

## Extensions

- Change the threat model so some participants may collude, then identify what additional assumptions or mechanisms would need analysis.
- Permit a participant to send an arbitrary value and ask what validation goal would be required before trusting the published result.
- Generalize the algebra to `n` participants and distinguish the cancellation proof from any privacy claim under a different channel model.

</details>
