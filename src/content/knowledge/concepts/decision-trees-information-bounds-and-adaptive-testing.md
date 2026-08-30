---
title: Decision Trees, Information Bounds & Adaptive Testing
description: Design adaptive tests as decision trees, derive outcome-capacity lower bounds, verify every leaf, and certify ranking or selection decisions.
date: '2026-08-30'
type: concept
domain: Mathematics & Statistics
category: Problem Solving Techniques
status: growing
tags: [Decision Trees, Information Bounds, Adaptive Testing, Interview]
quantInterviewTopics: [logic-brainteasers-discrete-reasoning, logical-deduction]
featured: false
related: [logical-deduction-constraint-propagation-and-case-elimination, small-cases-recurrence-and-structural-simplification]
relatedNotes: []
---

## Core Idea

An adaptive testing strategy is a decision tree. Each internal node chooses a legal test based on earlier outcomes, each branch records one possible result, and each leaf makes a certified decision. A sound solution first proves that enough outcomes exist, then constructs a tree whose leaves distinguish exactly the required cases.

The tree makes both lower bounds and strategy errors visible. If two legal states reach the same leaf but require different answers, the strategy has not learned enough.

## Decision Tree Model

Represent the unknown situation as a finite set of legal states. At every node, choose a test whose possible outcomes divide the states still consistent with the path. The next test may depend on the observed branch; that dependency is what makes the strategy adaptive.

Label each branch with its outcome and retain only the states compatible with that outcome. A leaf is valid only when the information on its path certifies the requested result, not merely a plausible guess.

## Information Capacity

If a test has branching factor $b$ and the strategy permits depth $d$, it has at most $b^d$ outcome paths, or leaves. Thus distinguishing $N$ possibilities requires enough capacity that $b^d \ge N$ when every node can realize all $b$ outcomes.

This is a lower bound, not a construction. Physical rules, allowed comparisons, unequal subset sizes, and impossible outcomes can reduce the useful capacity. Near the top of a tree, favor balanced legal branches: they keep the largest remaining subtree as small as possible while respecting the test's legality.

## Adaptive Strategy Design

Start with the lower bound, then choose a first test that partitions the legal states as evenly as the rules permit. For each outcome, design the next test only for the survivors on that branch. Do not force the same second test on branches that contain different possibilities.

At each node, write the remaining states, the legal tests, and the reason the selected test is useful. A branch may need a different comparison, group, or threshold because earlier evidence changes which alternatives remain.

## Ranking and Selection Certificates

Ranking tasks require a certificate for the requested conclusion. To name a maximum, every other candidate must have a recorded path of losses to that candidate. To identify the top few, the comparison history must rule out every outsider, not just display a favorable local order.

Treat comparisons as directed evidence: an edge from a winner to a loser certifies that relation. The resulting partial order may be sufficient for a selected rank even when it does not determine a complete ordering. State exactly which ranks are certified and which pairs remain unresolved.

## Verification Workflow

1. Define the legal state space and the decision required at a leaf.
2. Count the maximum outcomes available at each depth to establish an information lower bound.
3. Draw each test node, including all legal outcomes and the states that survive each branch.
4. Check that every chosen test is legal for the survivors at that node.
5. Confirm that every legal state reaches a leaf and every leaf corresponds to exactly one certified answer.
6. For ranking or selection, verify that the comparison certificate excludes every candidate that could otherwise change the result.
7. Inspect the deepest branch to ensure its remaining cases fit within the tests left.
8. State whether the strategy is optimal, merely sufficient, or blocked by a stronger lower bound.

## Recognition Signals

Use decision trees when each observation has a limited number of outcomes, later actions may depend on earlier ones, or the question asks for a minimum number of tests, comparisons, trials, or measurements. They are especially useful for distinguishing one exceptional item, selecting a rank, or finding a guaranteed answer under worst-case outcomes.

## Common Mistakes

- Counting nominal outcomes that are not legal or reachable on a branch.
- Treating a capacity lower bound as a complete strategy.
- Using a fixed sequence of tests when adaptation can reduce the worst case.
- Leaving a leaf with several states that require different answers.
- Calling a ranking settled after proving only one local comparison.
- Optimizing average depth when the prompt requires a worst-case guarantee.

## Interview Checks

1. A test has ternary outcomes and there are 24 possible states. Derive the information lower bound and decide whether three tests can be enough before proposing a strategy.
2. You may compare two items at a time and need the maximum of eight distinct values. Construct a comparison certificate that proves why the selected item is maximal.
3. A balance test has three outcomes, but one outcome is impossible when the two groups have unequal sizes. Explain how this changes the branching factor and the capacity calculation.
4. Design an adaptive two-round testing strategy for a finite set of candidates, and show the survivors after every possible first-round outcome.
5. A partial order is known from pairwise comparisons. State what additional evidence is needed to certify the top three without determining the entire order.
6. A proposed tree has a leaf reached by two states with different required actions. Identify the verification failure and describe one way to split that leaf legally.
7. For a selection problem with a worst-case test limit, compare a balanced first partition with a legal but highly unbalanced one and explain the effect on the deepest branch.
8. Given a completed decision tree, verify that every legal state reaches exactly one leaf and that each leaf's conclusion is justified by the path evidence.
