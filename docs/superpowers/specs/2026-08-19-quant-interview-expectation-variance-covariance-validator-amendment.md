# Expectation, Variance & Covariance Design — Validator Amendment

Date: 2026-08-19  
Applies to: `docs/superpowers/specs/2026-08-19-quant-interview-expectation-variance-covariance-design.md`

## Purpose

This amendment corrects one internal machine-representation detail discovered while preparing the implementation plan. It does **not** change any user-approved mathematical ownership, public Knowledge/Problem design, source-neutrality rule, source-row count, or corpus-count expectation.

## Constraint discovered

`src/lib/quantInterviewCoverage.mjs` permits an item-level `topicOverrideReason` only when `sourceItem` is non-null. A section-level coverage row (`sourceItem: null`) must have `canonicalTopics` exactly equal to the matching `source-topic-map.json` entry.

Green `4.4.normal-moments` is currently represented as its own mapped source section with `sourceItem: null`. Its current source-topic mapping is `random-variables-distributions`, while the approved semantic owner is `expectation-variance-covariance`.

Therefore the original spec instruction to use an item-level override for this row is not implementable under the existing validator.

## Corrected implementation contract

Make exactly one narrow source-map correction:

```json
{
  "source": "green-book",
  "sourceSection": "4.4.normal-moments",
  "role": "content",
  "canonicalTopics": [
    "expectation-variance-covariance"
  ]
}
```

Then resolve the existing section-level coverage row:

```json
{
  "sourceSection": "4.4.normal-moments",
  "sourceItem": null,
  "canonicalTopics": [
    "expectation-variance-covariance"
  ],
  "state": "variant",
  "canonicalProblems": [
    "normal-mgf-and-moments"
  ],
  "canonicalKnowledge": [
    "moments-moment-generating-functions"
  ],
  "resolutionNote": "Standard-normal MGF and moment calculations enrich the general Normal MGF/moments canonical Problem; workstream 008 intentionally left this expectation-heavy identity for the Expectation, Variance & Covariance workstream."
}
```

No `topicOverrideReason` is required or permitted for this section-level row after the source-map correction.

## File-scope correction

The implementation may therefore modify:

`src/data/quant-interview/topics/source-topic-map.json`

**only** for the exact `green-book::4.4.normal-moments` entry above. No other taxonomy or source-map restructuring is authorized by this amendment.

All other requirements of the approved design spec remain unchanged.
