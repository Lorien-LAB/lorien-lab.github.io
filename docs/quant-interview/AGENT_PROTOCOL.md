# Quant Interview Agent Protocol

## 1. Authority

**Do not trust conversational memory** as the source of truth. Current repository files and validated source evidence are authoritative.

## 2. Startup sequence

1. Read `docs/quant-interview/README.md`.
2. Read `docs/quant-interview/HANDOFF.md`.
3. Resolve the target source, chapter/section, and one bounded batch.
4. Read the target source record, target manifest, target TOC subtree, relevant Knowledge, and validation utilities only.
5. Compare the working branch with `main`.

## 3. Branch discipline

Use a **task-specific branch** for changes unless the user explicitly authorizes a direct `main` update. Never force-update `main`.

A source-ingestion branch should be scoped to one coherent batch or one infrastructure change.

## 4. Batch discipline

The batch is the canonical unit of work. Process **one bounded batch** at a time.

A batch should identify:

- stable batch ID;
- source slug;
- chapter/section;
- page range only after edition + source-file verification;
- expected problem scope;
- status;
- completion commit.

Never ask an Agent to generate an entire book in one batch.

## 5. Source gate

Before problem-level ingestion:

1. verify work identity;
2. inspect the actual source file;
3. verify exact edition;
4. align TOC/page numbering;
5. pin `sourceFile` in the manifest;
6. create bounded batches;
7. run the ingestion validator.

A user-supplied TOC is a valid structural seed, not proof of complete problem-level coverage.

## 6. Ontology-first authoring

Before writing a source-derived Problem, determine what it tests.

### Concept

Reusable domain knowledge, for example:

- Conditional Probability
- Bayes' Theorem
- Positive Semidefinite Matrix
- Put-Call Parity

### Technique

Reusable problem-solving method stored as Knowledge with:

```yaml
type: concept
category: Problem Solving Techniques
```

Examples:

- Conditioning
- First-Step Analysis
- Symmetry
- Recursion
- Proof by Contradiction

Before creating any Concept or Technique, search existing Knowledge and reuse the canonical slug when semantically equivalent.

## 7. Problem pipeline

```text
Source evidence
→ problem identity
→ independent formulation
→ Concept mapping
→ Technique mapping
→ prerequisite mapping
→ difficulty
→ independent derivation
→ alternative methods when useful
→ progressive hints
→ common mistakes
→ extensions / variants
→ family / related problems
→ relationship validation
→ editorial review
→ publish
```

Do not write an answer first and retroactively invent ontology links.

## 8. Copyright boundary

Allowed public output:

- independent problem formulations;
- independent derivations;
- short provenance metadata;
- concepts, techniques, difficulty, families, variants, references.

Do not publish source PDFs/scans, large verbatim passages, copied answer keys, or a book-substitution mirror.

## 9. End-of-batch protocol

Before completing a batch:

1. validate source relationships and manifests;
2. run `npm run test`;
3. run `npm run check`;
4. run `npm run build`;
5. review the diff against `main`;
6. update `docs/quant-interview/HANDOFF.md` with current operational state only;
7. commit the batch.

Do not claim completion when verification fails.
