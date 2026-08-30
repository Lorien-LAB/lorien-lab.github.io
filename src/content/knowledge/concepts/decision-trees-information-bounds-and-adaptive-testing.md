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

Start with the lower bound, then choose a first test that partitions the legal states as evenly as the rules permit. For each outcome, design the next test only for the survivors on that branch. Different branches may require different legal second tests; do not force the same second test on branches that contain different possibilities.

At each node, write the remaining states, the legal tests, and the reason the selected test is useful. A branch may need a different comparison, group, or threshold because earlier evidence changes which alternatives remain.

## Ranking and Selection Certificates

Ranking tasks require a comparison certificate for the requested conclusion. To name a maximum, every other candidate must have a recorded path of losses to that candidate. To identify the top few, the comparison history must rule out every outsider, not just display a favorable local order.

Treat comparisons as directed evidence: an edge from a winner to a loser certifies that relation. The resulting partial order may be sufficient for a selected rank even when it does not determine a complete ordering. State exactly which ranks are certified and which pairs remain unresolved.

## Verification Workflow

1. Define the legal state space and the decision required at a leaf.
2. Count the maximum outcomes available at each depth to establish an information lower bound.
3. Draw each test node, including all legal outcomes and the states that survive each branch.
4. Check that every chosen test is legal for the survivors at that node.
5. Confirm that every legal state reaches a leaf and each leaf corresponds to exactly one certified answer.
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

1. A test has ternary outcomes and there are 24 possible states. Derive the information lower bound, decide whether three tests can be enough, and state what a strategy must still prove.
2. You may compare two labeled items at a time, and items 1 through 8 have distinct values. Construct a comparison certificate that proves the selected maximum is maximal by showing a loss path from every other item.
3. Six labeled candidates contain exactly one heavier candidate. A balance test compares two groups and has left-heavy, right-heavy, or balanced outcomes, but the balanced outcome is impossible when the groups have unequal sizes. State the legal operation, derive the effective branching factor, and recalculate the capacity bound.
4. 12 candidates labeled 1 through 12 contain exactly one heavier candidate. Split them into three labeled groups of four each; a legal test compares one group of four against another group of four and has left-heavy, right-heavy, or balanced outcomes. For a two-round adaptive strategy, list the survivors after each first-test outcome and determine whether the remaining candidates can be separated by one legal second test.
5. A partial order contains the certified comparisons A>B, A>C, and D>E, while every other pair is unresolved. To certify the top three, state the additional comparisons required and the comparison certificate that excludes every non-top-three candidate.
6. A proposed tree has one leaf reached by legal states $s_1$ and $s_2$, but its required actions are accept for $s_1$ and reject for $s_2$. Identify the verification failure and specify a legal test with its outcomes that would split the leaf.
7. Nine possible states must be selected using tests with three outcomes. Compare a balanced first test that leaves three states per outcome with a legal unbalanced first test that leaves seven, one, and one states; determine the worst-case remaining capacity needed on the deepest branch.
8. Audit this binary tree: the root has Left and Right outcomes; Left leads to leaves LL and LR, and Right leads to leaves RL and RR. The table is `LL: {s1}, LR: {s2}, RL: {s3}, RR: {s4}` for the four legal states. Verify that exactly one leaf is reached by each state and that each leaf's conclusion is justified by its path evidence.
