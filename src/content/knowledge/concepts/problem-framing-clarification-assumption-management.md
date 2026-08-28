---
title: Problem Framing, Clarification & Assumption Management
description: Frame underspecified interview problems by separating facts, constraints, unknowns, and success conditions before asking high-value questions or stating provisional assumptions.
date: 2026-08-24
type: concept
domain: Interview Strategy & Communication
category: Problem Solving Techniques
status: growing
tags: [Interview, Problem Solving, Communication, Assumptions]
quantInterviewTopics: [interview-strategy-communication, reasoning-communication]
featured: false
related: [structured-think-aloud-reasoning, quant-interview-preparation-breadth-and-practice]
relatedNotes: []
---

## Core Idea

An underspecified prompt is not permission to guess silently. Before selecting a method, make the problem's decision, evidence, constraints, unknowns, and success conditions visible. The aim is a shared model that can be corrected early.

A good frame is compact enough to say aloud and precise enough that a changed assumption visibly changes the route.

Problem framing and structured think-aloud reasoning are paired skills: framing determines what must be reasoned about, and structured explanation makes that framing and the resulting reasoning inspectable to the interviewer. A frame that is never stated cannot be audited, and an explanation without a visible frame is unstable; the two are practiced together.

## Compact Framing Protocol

1. **Restate the decision or target quantity.** Say what must be chosen, estimated, proved, or explained.
2. **Separate known facts, constraints, unknowns, and success conditions.** Do not blend supplied information with your interpretation.
3. **Ask the clarifying question with the greatest effect on the solution path.** Prefer one question that changes the model over several low-impact details.
4. **If an answer is unavailable, label a defensible assumption as provisional and state its consequence.** Explain which branch of the analysis it enables.
5. **Invite correction, then revise the model before proceeding.** Feedback changes the frame; it is not an interruption to ignore.

For example: “We need an estimate of peak capacity. We know the average arrival rate and latency target, but not burstiness. Does the target apply at the average or a high percentile? If that is unavailable, I will provisionally assume a stated burst multiplier; that makes capacity scale by the same factor. Please correct that assumption before I size the system.”

## Recognition Signals

Use this protocol when:

- the requested output could mean a decision, an estimate, or a proof;
- a missing constraint would select a different solution family;
- terms such as “fast,” “likely,” or “optimal” lack a success measure;
- the data supports several plausible models;
- the interviewer challenges the objective or supplies a new condition.

## Explicit Assumption versus Unsupported Claim

An **explicit assumption** is labeled, defensible, revisable, and paired with a consequence: “Assume arrivals are independent for this first model; then variance grows linearly with the interval.”

An **unsupported claim** hides uncertainty as fact: “Arrivals are independent.” It gives the listener no way to audit the choice or revise the result.

The distinction is not certainty. It is traceability. A provisional model can be useful precisely because everyone can see what would invalidate it.

## Common Mistakes

- Solving a familiar version of the prompt before stating the actual objective.
- Asking many factual questions without prioritizing the one that changes the route.
- Calling a convenient guess “obvious” instead of labeling it provisional.
- Listing assumptions without stating their consequences.
- Defending the first frame after feedback reveals a missing constraint.
- Treating clarification as delay rather than part of the solution.

## Interview Checks

1. A capacity prompt gives average demand but no service-level target. Identify the missing constraint that most affects the model.
2. A request says to choose the “best” estimator. Select one useful clarification that would distinguish the available routes.
3. State a provisional assumption about missing dependence information and explain one consequence for the calculation.
4. New feedback invalidates your original objective. Show how you would revise the frame before continuing.
