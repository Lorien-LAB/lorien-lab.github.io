# Financial Engineering Learning Resources Design

## Goal

Add the user-provided *A Curated Guide to Financial Engineering Resources* (Chuan Shi, November 2025) to the existing Lorien Lab Knowledge Base as a connected learning-resource cluster rather than as a reproduction record or a single flat note.

The source describes free online resources for quantitative finance and organizes them around core skills, factor investing, advanced machine learning, system building, and frontier research/community. The implementation must preserve that source framing and must not silently add unsupported rankings, claims, metrics, or recommendations.

## Scope

Create exactly ten Knowledge entries:

1. one hub `topic` entry: **Financial Engineering Learning Resources**;
2. nine child resource entries:
   - WorldQuant University
   - QuantStart
   - Machine Learning for Factor Investing
   - DDA3600 Factor Investing Course Materials
   - AQR Insights
   - Advances in Financial Machine Learning
   - Interpretable Machine Learning
   - QuantConnect LEAN
   - AI & Big Data in Finance Research Forum

No new content collection, page type, route, component family, or visual redesign is required. All entries use the existing `knowledge` collection and existing `/knowledge/<slug>/` detail route.

## Source-of-Truth Rules

The uploaded PDF is the source of truth for this feature.

Implementation must preserve the source's terminology, organization, links, and stated descriptions. Do not use general model knowledge to fill gaps. In particular:

- do not invent ratings, rankings, difficulty levels, prerequisites, costs, or learning outcomes;
- do not claim a resource is current, maintained, official, production-ready, or industry-standard beyond what the source itself says;
- do not add external links that are not present in the PDF;
- do not turn the PDF into a hosted public source document unless separately requested;
- do not create fabricated relationships merely to make the knowledge graph look denser.

The source states that the listed resources are freely available online. This claim may be preserved as source-derived wording in the hub entry, but it should be attributed to the guide rather than independently re-verified in this content-only task.

## Information Architecture

### Hub entry

Path:

```text
src/content/knowledge/topics/financial-engineering-learning-resources.md
```

Frontmatter:

```yaml
title: Financial Engineering Learning Resources
description: A structured learning map for quantitative finance resources spanning core skills, factor investing, financial machine learning, system building, and frontier research.
type: topic
domain: Research Infrastructure
category: Learning Resources
status: growing
date: 2025-11-01
tags:
  - Financial Engineering
  - Quantitative Finance
  - Learning Resources
  - Factor Investing
  - Machine Learning
  - Research Infrastructure
featured: false
related:
  - worldquant-university
  - quantstart
  - machine-learning-for-factor-investing
  - dda3600-factor-investing-course-materials
  - aqr-insights
  - advances-in-financial-machine-learning
  - interpretable-machine-learning
  - quantconnect-lean
  - ai-big-data-finance-research-forum
relatedNotes: []
```

The hub body must:

- credit Chuan Shi and the November 2025 guide;
- explain that the source compiles free online resources for quantitative finance;
- preserve the source's five-step recommended learning path;
- link conceptually to the nine child Knowledge entries by name;
- distinguish source-derived descriptions from Lorien Lab's structural organization.

### Child entry status

All nine child resource nodes use `status: seed` in v1 because this ingestion adds concise source-derived summaries rather than mature independent Lorien Lab research notes. They can later evolve to `growing` or `mature` as original notes, comparisons, usage experience, or research links are added.

## Child Entries

### 1. WorldQuant University

Path:

```text
src/content/knowledge/tools/worldquant-university.md
```

Classification:

```yaml
type: tool
domain: Research Infrastructure
category: Learning Resources
status: seed
```

The PDF groups three WorldQuant University courses under one heading, and the website must preserve that grouping rather than creating three separate Knowledge nodes:

- Applied Data Science Lab — `https://www.wqu.edu/adsl`
- Deep Learning Fundamentals Lab — `https://www.wqu.edu/deep-learning-lab`
- Applied AI Lab: Deep Learning for Computer Vision — `https://www.wqu.edu/ai-lab-computer-vision`

Source-derived descriptions:

- Applied Data Science Lab: project-based course covering the complete data science workflow.
- Deep Learning Fundamentals Lab: foundation in neural networks and deep learning architectures.
- Applied AI Lab: advanced applications of deep learning in visual data analysis.

Do not set `toolUrl` to a guessed WorldQuant University homepage because the source only supplies the three course URLs.

### 2. QuantStart

Path:

```text
src/content/knowledge/tools/quantstart.md
```

Classification:

```yaml
type: tool
domain: Research Infrastructure
category: Learning Resources
status: seed
toolUrl: https://www.quantstart.com/articles/
```

Preserve the source description: comprehensive tutorials across quantitative trading and investing, useful for practical programming skills and understanding real-world trading systems.

### 3. Machine Learning for Factor Investing

Path:

```text
src/content/knowledge/topics/machine-learning-for-factor-investing.md
```

Classification:

```yaml
type: topic
domain: Machine Learning
category: Factor Investing
status: seed
sourceUrl: https://www.mlfactor.com/python.html
```

The current Knowledge schema has no `book` type, so this resource is represented as a `topic` rather than misclassified as a paper. Preserve the source description: a free book with code and data for combining modern machine learning with traditional factor investing.

### 4. DDA3600 Factor Investing Course Materials

Path:

```text
src/content/knowledge/tools/dda3600-factor-investing-course-materials.md
```

Classification:

```yaml
type: tool
domain: Quantitative Finance
category: Factor Investing
status: seed
toolUrl: https://www.shichuan.info/teaching/DDA3600
```

Preserve the source description: university course materials providing theoretical foundation and an academic framework for factor investing.

### 5. AQR Insights

Path:

```text
src/content/knowledge/tools/aqr-insights.md
```

Classification:

```yaml
type: tool
domain: Quantitative Finance
category: Industry Research
status: seed
toolUrl: https://www.aqr.com/Insights
```

Preserve the guide's framing: industry insights used to develop macroeconomic perspective and understand real-world factor applications. The implementation must not independently strengthen the guide's qualitative wording into a ranking claim.

### 6. Advances in Financial Machine Learning

Path:

```text
src/content/knowledge/topics/advances-in-financial-machine-learning.md
```

Classification:

```yaml
type: topic
domain: Machine Learning
category: Financial ML
status: seed
sourceUrl: https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises
```

The source points to an exercise repository associated with Marcos López de Prado's work. The current Knowledge schema has no `book` type, so use `topic`. Preserve the source emphasis on avoiding common pitfalls in financial data analysis and learning advanced financial-machine-learning methodologies.

### 7. Interpretable Machine Learning

Path:

```text
src/content/knowledge/topics/interpretable-machine-learning.md
```

Classification:

```yaml
type: topic
domain: Machine Learning
category: Model Interpretability
status: seed
sourceUrl: https://christophm.github.io/interpretable-ml-book/
```

Represent the book as a `topic` under the current schema. Preserve the source's emphasis on model interpretability and reliable model deployment without adding claims not present in the guide.

### 8. QuantConnect LEAN

Path:

```text
src/content/knowledge/tools/quantconnect-lean.md
```

Classification:

```yaml
type: tool
domain: Research Infrastructure
category: Backtesting
status: seed
toolUrl: https://github.com/QuantConnect/Lean
```

Preserve the source description: an open-source algorithmic trading engine useful for studying backtesting, event-driven architecture, and asset modeling in real systems.

### 9. AI & Big Data in Finance Research Forum

Path:

```text
src/content/knowledge/tools/ai-big-data-finance-research-forum.md
```

Classification:

```yaml
type: tool
domain: Research Infrastructure
category: Research Community
status: seed
toolUrl: https://www.abfr-forum.org/
```

Preserve the source framing: webinars connecting academic research with industry practice and supporting awareness of developments at the academic-industry frontier.

## Learning Path

The hub entry must preserve the source's five-step recommended path in this order:

1. **Core Skills** — WorldQuant University courses and QuantStart articles.
2. **Factor Investing** — Machine Learning for Factor Investing and DDA3600, complemented by AQR Insights.
3. **Advanced Concepts** — Advances in Financial Machine Learning and Interpretable Machine Learning.
4. **Systems** — QuantConnect LEAN for system architecture and practical implementation study.
5. **Stay Current** — AI & Big Data in Finance Research Forum webinars.

The website may format these steps for readability but must not reorder or reinterpret the underlying sequence.

## Relationship Model

The hub's `related` field contains all nine child slugs.

Child entries should each link back to `financial-engineering-learning-resources` through their own `related` field. Additional cross-links between children are intentionally omitted in v1 unless they are directly supported by the source structure.

`relatedNotes` remains empty for all ten entries unless an already-existing note has an explicit, defensible relationship. This feature does not create new Notes.

## Dates

The guide is dated November 2025 but does not provide a day. Use `2025-11-01` as a normalized metadata date for this imported resource cluster. This is a repository normalization convention, not a claim that the guide was published on November 1.

The body attribution should say only `November 2025`.

## Tags

Tags should remain descriptive and conservative. Each child entry should use 3–6 tags drawn from the source subject matter, such as:

- Quantitative Finance
- Financial Engineering
- Data Science
- Deep Learning
- Factor Investing
- Machine Learning
- Model Interpretability
- Backtesting
- Algorithmic Trading
- Research Community

Do not add unsupported vendor, asset-class, performance, or difficulty tags.

## Empty / Missing Metadata

Do not invent:

- authors for resources where the PDF does not provide them;
- `year` fields for books/resources unless represented explicitly by the source;
- `paperUrl` for non-paper entries;
- `language` unless directly stated;
- `sourceUrl` or `toolUrl` where the PDF does not provide a suitable canonical link.

Optional fields should be omitted rather than filled with guesses.

## Testing

Update the existing site structure tests so they verify:

- the hub file exists;
- all nine child files exist;
- the hub includes all nine canonical slugs;
- WorldQuant University remains one entry and contains all three course links;
- the source URLs listed in the PDF are represented in the intended entries;
- no new Knowledge type is added solely for books;
- the site still passes `npm test`, `npm run check`, and `npm run build`.

The test must not assert fabricated content or force unrelated styling changes.

## Deployment

Implementation should occur on the `financial-engineering-resources-v1` feature branch. After tests and production build pass, merge to `main` only with user approval. Existing GitHub Pages deployment remains unchanged.
