import { readFile, writeFile } from 'node:fs/promises';

const path = 'README.md';
const text = await readFile(path, 'utf8');
const replacement = `### Quant Interview Problem Bank

For all future Quant Interview chats and agents, the repository-memory entry point is **\`docs/quant-interview/README.md\`**. Treat that documentation and the current machine-readable state as authoritative repository memory rather than relying on prior conversation history.

The Quant Interview system is now **Topic-first**. Green Book, Red Book, and 150 Questions are internal evidence sources processed together by canonical topic workstream; they are not the public hierarchy.

\`\`\`text
src/content/knowledge/                         canonical concepts and Problem Solving Techniques
src/content/problems/                          canonical Problem records
src/data/quant-interview/topics/               canonical taxonomy + hidden source-topic routing
src/data/quant-interview/coverage/             hidden source coverage / dedup audit
src/data/quant-interview/toc/                  verified source TOCs
src/data/quant-interview/*.json                source-file verification + ingestion manifests
docs/quant-interview/                          durable repository memory and Agent Protocol
\`\`\`

Canonical public Problem routes remain \`/problems/<slug>/\`. Problems never become a fifth Knowledge type. Problem-solving methods such as Conditioning, First-Step Analysis, Symmetry, and Recursion remain ordinary Knowledge entries with \`type: concept\` and \`category: Problem Solving Techniques\`.

Every source-derived public Problem uses an **independent formulation** and independently derived solution. Do not host source PDFs or scans. Do not copy answer keys or large verbatim book passages. Public Knowledge and Problems should not expose original book, chapter, question-number, or page-number provenance; that evidence lives in hidden repository infrastructure.

#### Edition-safe, Topic-first ingestion

Before a source can contribute to problem-level ingestion, **pin an exact edition**, inspect the actual source file, and record its cryptographic identity in the ingestion manifest. Source-file verification establishes source identity and structure; it does not establish complete problem coverage.

All three current sources are source-file-verified and edition-pinned. Completeness is tracked separately through the hidden coverage ledger. Source page evidence is stored as \`evidencePageRanges\`; those ranges may overlap between semantically distinct source items because physical evidence is reusable while semantic ownership remains explicit.

The canonical ingestion unit is one bounded topic/subtopic workstream across all mapped verified sources. For each workstream: resolve the source-topic mappings, read all relevant source material, inventory concepts/problems/variants/guidance, perform semantic deduplication, update canonical Knowledge first, update canonical Problems only when genuinely distinct, reconcile every inspected source item in the hidden coverage ledger, then run validation and review the topic-only diff.

Text similarity alone is not sufficient to merge Problems. Compare state, target, constraints, underlying structure, and solution insight. Equivalent questions become one canonical Problem; useful differences become alternate methods, Interview Checks, or Variants / Extensions rather than duplicate public pages.

Hints and full solutions should use native disclosure markup so a reader can attempt the Problem before revealing help:

\`\`\`html
<details>
<summary>Hint 1</summary>
A progressively stronger hint.
</details>

<details>
<summary>Show Solution</summary>
An independently derived solution.
</details>
\`\`\`

Before integration, schema validation, relationship validation, ingestion-manifest validation, taxonomy/source-topic/coverage validation, \`npm run test\`, \`npm run check\`, and \`npm run build\` must pass. Missing relationships or pending coverage must be fixed or left explicitly pending rather than hidden.

`;
const next = text.replace(/### Quant Interview Problem Bank[\s\S]*?(?=### Knowledge Base)/, replacement);
if (next === text) throw new Error('Quant Interview README section replacement marker not found.');
await writeFile(path, next);
