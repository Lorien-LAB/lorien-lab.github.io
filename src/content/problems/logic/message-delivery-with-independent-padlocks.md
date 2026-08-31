---
problemId: logic-logical-deduction-008
title: Message Delivery with Independent Padlocks
description: Deliver a document through an untrusted courier using two independent padlocks without ever sending the box unlocked.
date: '2026-08-31'
domain: Mathematics & Statistics
category: Discrete Mathematics
subcategories: [Protocol Design, State Transitions]
tags: [Logical Deduction, Protocols, Brainteasers, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
concepts: [constraint-reframing-and-latent-state]
techniques: []
prerequisites: []
relatedProblems: [two-guards-one-question, private-average-with-canceling-mask]
family: independent-lock-protocol
mathDifficulty: 1
insightDifficulty: 3
interviewDifficulty: 3
estimatedMinutes: 10
status: solved
featured: false
---

## Problem

A sender must deliver a document to a recipient through an untrusted courier. The sender and recipient each own a padlock and key, but neither has the other's key. The box accepts both the sender's and recipient's padlocks. Give a procedure that never sends the box unlocked and leaves it openable by the recipient.

This constrained procedure does not provide authentication, tamper evidence, or general cryptographic security. It only tracks which independently owned locks keep the box closed during each courier transit.

## Think Before Revealing

<details><summary>Hint 1</summary>Make the first courier transit with the sender's lock already attached.</details>
<details><summary>Hint 2</summary>Before a lock is removed, arrange for the other person's lock to remain on the box.</details>

<details>
<summary>Show Solution</summary>

## Solution

Only the sender can remove the sender's lock, and only the recipient can remove the recipient's lock. The sender first places the document in the box and attaches the sender's lock. The recipient then adds the recipient's lock without removing the sender's. Once the box returns, the sender removes the sender's lock, leaving only the recipient's lock for the final delivery.

Every courier transit has at least one lock:

| Transit | From | To | Locks on the box |
| --- | --- | --- | --- |
| 1 | sender | recipient | `sender` |
| 2 | recipient | sender | `sender, recipient` |
| 3 | sender | recipient | `recipient` |

After transit 3, the recipient removes the recipient's lock and opens the box. The courier never receives an unlocked box, and no party needs the other party's key.

## Why This Problem Matters

The useful reframing is to separate transport from access. The box can change hands while one owner’s lock remains in place, so the two independent keys do not need to be shared.

## Common Mistakes

- Sending the box back after the recipient removes the sender's lock, which would leave an unlocked transit.
- Assuming either person can remove the other person's lock.
- Claiming protections beyond the stated locked-box condition.

## Extensions

- Require several recipients to add locks and determine a delivery sequence that preserves at least one lock on every transit.
- Allow a fixed set of return trips and minimize the number of courier transits.
- Represent each box state as the set of locks currently attached and draw its transition graph.

</details>
