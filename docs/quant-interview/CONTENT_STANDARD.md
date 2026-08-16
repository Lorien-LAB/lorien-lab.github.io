# Quant Interview Content Standard

## 1. Goal

The public system is a reasoning library, not a copied answer bank. Every reviewed source-derived Problem should teach recognition, reasoning, and interview communication.

## 2. Required Problem structure

A reviewed Problem should include, when applicable:

```markdown
## Problem

## Think Before Revealing

<details>
<summary>Hint 1</summary>
...</details>

<details>
<summary>Hint 2</summary>
...</details>

<details>
<summary>Show Solution</summary>

## Solution

### Method 1

### Method 2

## Why This Problem Matters

## Common Mistakes

## Extensions

</details>
```

The exact number of hints/methods may vary, but finished content must not collapse into only a final answer.

## 3. Solution maturity

- **S0 — answer only**: final numerical/logical answer with no derivation.
- **S1 — derivation**: correct derivation but little intuition.
- **S2 — derivation + intuition**: explains why the derivation works.
- **S3 — interview-ready**: clear derivation plus an interview-appropriate explanation and/or genuinely useful alternative approach.
- **S4 — interview-ready + traps**: S3 plus recognition signals and Common Mistakes.
- **S5 — extension/generalization**: S4 plus meaningful variants, generalization, or broader structural insight.

Source-derived content marked `solved` or `reviewed` should target **S3+**. S0 must never be presented as finished reviewed content.

## 4. Independent formulation

Do not reproduce a book problem verbatim. Preserve the mathematical/financial identity and provenance while rewriting the public statement independently.

Do not copy source answer keys. Derive solutions independently and verify them.

## 5. Ontology quality

Every Problem should map only to concepts and techniques it genuinely uses.

Before adding a new Concept or Technique:

1. search `src/content/knowledge/`;
2. compare semantic meaning, not just title strings;
3. reuse the canonical existing slug when equivalent;
4. create a new reusable node only when the distinction matters across multiple Problems.

Avoid synonyms becoming duplicate ontology nodes.

## 6. Difficulty

Use all three existing dimensions independently:

- `mathDifficulty`: prerequisite mathematics/technical load;
- `insightDifficulty`: non-obvious reasoning leap;
- `interviewDifficulty`: difficulty under interview constraints, including recognition and communication.

Each remains an integer from 1 to 5.

## 7. Hints

Hints should be progressive:

- Hint 1: recognition cue, representation, or useful observation;
- Hint 2: stronger structural step without giving away the complete derivation;
- further hints only when the problem genuinely benefits.

## 8. Why This Problem Matters

Explain what an interviewer is testing, such as:

- recognition of conditioning;
- ability to exploit symmetry;
- state-space construction;
- stochastic-process intuition;
- replication/no-arbitrage reasoning;
- algorithmic complexity awareness;
- numerical-method trade-offs.

## 9. Common Mistakes

Record realistic failure modes, not generic warnings. Examples:

- silently assuming independence;
- double-counting outcomes;
- confusing conditional and unconditional probabilities;
- applying Black-Scholes assumptions where they do not hold;
- solving recursively without a boundary condition;
- giving correct code with the wrong asymptotic complexity.

## 10. Extensions

Extensions should add insight rather than cosmetic parameter changes. Useful extensions include:

- biased/generalized probability;
- higher-dimensional version;
- alternate stopping boundary;
- continuous-time analogue;
- algorithmic complexity improvement;
- financial interpretation or hedging implication.

## 11. Review checklist

A source-derived Problem is ready for publication only if:

- provenance is traceable;
- public statement is independently formulated;
- Concept/Technique slugs resolve;
- solution is independently derived and checked;
- maturity is S3+ for `solved`/`reviewed` status;
- hints do not immediately reveal the answer;
- Why This Problem Matters is specific;
- Common Mistakes are realistic;
- extensions, if included, are meaningful;
- tests/check/build pass.
