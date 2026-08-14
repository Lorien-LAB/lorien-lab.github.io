# Personal Knowledge Base Design

## Goal

Add a first-class `Knowledge Base` section to Lorien Lab's existing Astro portfolio while keeping the current `Notes` section intact. The Knowledge Base is a structured, public research library; Notes remain long-form essays, methodology write-ups, experiments, and paper-reading articles.

The Knowledge Base must also reserve a future external entry point for Obsidian Publish. Until an Obsidian Publish URL exists, the site shows `Obsidian Knowledge Graph · Coming Soon` as non-clickable status text and never renders a dead link.

## Product Positioning

The Knowledge Base should feel like a lightweight research operating system rather than another blog archive.

Primary goals:

- make quantitative-finance knowledge easy to browse by domain;
- distinguish reusable concepts from long-form Notes;
- support structured entries for concepts, papers, tools, and research topics;
- expose relationships among entries without requiring a full graph visualization in v1;
- keep all public content Markdown-first and agent-friendly;
- leave room for a later Obsidian Publish / graph integration without rewriting the content model.

## Information Architecture

### Top-level navigation

Add `Knowledge Base` to the existing site navigation.

Canonical route:

- `/knowledge/`

Existing top-level sections remain unchanged:

- Home
- Research
- Projects
- Notes
- CV
- About

### Knowledge domains

The Knowledge Base landing page organizes entries into these initial domains:

1. Quantitative Finance
   - Factor Investing
   - Asset Pricing
   - Portfolio Construction
   - Futures & Derivatives
   - CTA / Systematic Trading
   - Market Microstructure
   - Risk Management

2. Mathematics & Statistics
   - Probability
   - Stochastic Processes
   - Optimization
   - Time Series
   - Econometrics
   - Linear Algebra
   - Numerical Methods

3. Machine Learning
   - Tree Models
   - Deep Learning
   - Representation Learning
   - Time-Series ML
   - Reinforcement Learning
   - Model Validation

4. AI & Research Agents
   - LLM
   - Agent Architecture
   - Loop Engineering
   - RAG / Knowledge Systems
   - Genetic Programming
   - Automated Factor Discovery

5. Research Infrastructure
   - Backtesting
   - Data Engineering
   - Factor Libraries
   - Experiment Tracking
   - Quant Platforms
   - Research Workflows

These domain labels are navigation taxonomy, not hard-coded counts. The UI must not display fabricated statistics. If counts are shown, they must be derived from actual content at build time.

## Content Model

Create a new Astro content collection named `knowledge`, backed by Markdown files under:

```text
src/content/knowledge/
├── concepts/
├── papers/
├── tools/
└── topics/
```

Every knowledge item has a single canonical detail page under `/knowledge/<slug>/` regardless of storage subfolder.

### Shared fields

Each Markdown entry must support:

- `title: string`
- `description: string`
- `type: concept | paper | tool | topic`
- `domain: string`
- `category: string`
- `status: seed | growing | mature`
- `date: Date`
- `updated: Date` optional
- `tags: string[]`
- `featured: boolean`
- `related: string[]` optional, containing knowledge-entry slugs
- `relatedNotes: string[]` optional, containing note-entry slugs
- `sourceUrl: string` optional

### Type-specific optional fields

Paper entries may additionally define:

- `authors: string[]`
- `year: number`
- `paperUrl: string`

Tool entries may additionally define:

- `language: string`
- `toolUrl: string`

Topic entries are intended for broader synthesis pages connecting several concepts, papers, tools, and Notes.

### Public entry types

#### Concept

Designed for compact, durable knowledge such as `Fama-MacBeth Regression`, `Walk-Forward Validation`, or `Information Coefficient`.

Recommended body structure:

- What it is
- Why it matters
- Core equations / mechanism
- Assumptions
- Implementation notes
- Common pitfalls
- Related knowledge
- Sources

#### Paper

Recommended body structure:

- Research question
- Method
- Data
- Key findings
- My takeaways
- Reproducibility / implementation notes
- Related concepts

#### Tool

Recommended body structure:

- What it solves
- Strengths
- Limitations
- When I use it
- Related tools / methods

#### Research Topic

Recommended body structure:

- Scope
- Core questions
- Key concepts
- Important papers
- Methods / tools
- Open questions
- Related Notes / Projects

The schemas should permit flexible Markdown bodies. These headings are authoring guidance, not mandatory frontmatter fields.

## Knowledge Base Landing Page

### Hero

The first viewport presents the Knowledge Base as a connected research library.

Suggested copy direction:

- label: `Knowledge Base`
- title: `A connected research library.`
- description: a concise sentence covering quantitative finance, mathematics, machine learning, and research systems.

Do not invent content counts. Derived counts may be displayed only when there are enough real entries to make them useful.

### Primary actions

- `Browse Knowledge` or equivalent internal navigation action.
- `Obsidian Knowledge Graph · Coming Soon` displayed as status text or disabled-looking non-interactive UI.

No `href` is attached to the Obsidian element until a real Publish URL is configured.

### Knowledge domains section

Show the five major domains as open, editorial navigation blocks rather than a dense bento grid. Each domain displays representative category labels and the number of real entries if available.

Clicking a domain uses a query/hash/filter approach on the landing page in v1 rather than creating five separate domain routes. The implementation should remain simple and static-first.

### Featured knowledge

Show a small set of `featured: true` items. Each card exposes:

- type
- title
- description
- domain/category
- maturity status
- selected tags

The design should visually differentiate Concept / Paper / Tool / Topic using typography and small labels rather than four unrelated card systems.

### Knowledge index

Below featured items, show all entries in a compact searchable/filterable index.

V1 filtering requirements:

- type filter
- domain filter
- text search over title, description, tags, domain, category

This can use lightweight client-side JavaScript because the knowledge corpus is initially small. No external search service is required.

The page remains useful with JavaScript disabled: all entries are still rendered and linked; filters/search are progressive enhancement.

### Obsidian section

At the bottom of the landing page, show:

- heading: `Obsidian Knowledge Graph`
- visible status: `Coming Soon`
- one or two sentences explaining that the full research graph is maintained in Obsidian and may later be published.

The component must be intentionally non-clickable until a real public URL exists.

## Knowledge Detail Page

All knowledge types share one article shell consistent with the existing site.

Header must show:

- type
- domain/category
- title
- description
- updated/date
- maturity status
- tags

Body renders Markdown.

A side or footer relationship area displays, when present:

- Related Knowledge
- Related Notes
- Source / Paper / Tool links

Broken relationships must fail safely: if a related slug does not resolve, omit the corresponding link rather than generating a broken URL.

## Relationship to Notes

`Notes` remains an independent collection and top-level navigation item.

The distinction is semantic:

- Knowledge Base = structured, reusable, concise knowledge objects.
- Notes = long-form arguments, experiments, methodology, paper reading, and research narratives.

Cross-links are encouraged.

Example:

- Knowledge entry: `Walk-Forward Validation`
- Note: `Why Walk-Forward Validation Matters in Futures Spread Research`

The knowledge entry can list that Note under `relatedNotes`; the Note system does not need schema changes in v1.

## Homepage Integration

Add a new Knowledge section between `Featured Projects` and `Latest Research Notes`.

Homepage order becomes:

1. Research
2. Featured Projects
3. Knowledge Base
4. Latest Research Notes
5. Current Focus
6. Contact

The Knowledge homepage section should include:

- concise explanation
- the five knowledge domains
- up to three featured knowledge entries, or domain links when there are fewer than three entries
- CTA: `Explore Knowledge →`

Existing Notes section remains visible and is renumbered accordingly.

## Header and Navigation

Add `Knowledge Base` to desktop and mobile navigation.

Because the current header is already dense, use the visible label `Knowledge` in the header while the page and SEO title use `Knowledge Base`.

The canonical route remains `/knowledge/`.

## Initial Seed Content

V1 should ship with a small set of real, non-fabricated seed entries based on topics already represented in Lorien Lab's public research profile.

Create these four initial entries:

1. `Walk-Forward Validation` — Concept — Quantitative Finance / Model Validation
2. `Fama-MacBeth Regression` — Concept — Quantitative Finance / Asset Pricing
3. `RQAlpha` — Tool — Research Infrastructure / Quant Platforms
4. `Automated Factor Discovery` — Research Topic — AI & Research Agents / Automated Factor Discovery

The entries should be conservative educational summaries and should not invent performance claims, citations, or sources that are not present in the site's existing public material. Source links are omitted unless a verified URL is already available.

## Visual Design

Keep the existing site's visual language:

- dark quantitative-research header / hero language
- teal/green accent
- mono labels
- restrained borders and surfaces
- editorial whitespace
- light/dark theme compatibility

Knowledge Base should feel denser than Research/Projects but lighter than an admin dashboard.

Preferred motifs:

- taxonomy rails
- indexed rows
- relationship arrows
- subtle node/connection hints
- compact metadata

Avoid:

- large fake graph visualization in v1
- decorative node clutter
- oversized dashboard cards
- fabricated statistics
- fake search results
- disabled controls that look clickable

## Data Flow

Build-time:

1. Astro loads Markdown from `src/content/knowledge/**` through the `knowledge` collection.
2. Landing page derives domains, types, counts, featured entries, and search metadata from collection data.
3. Static paths generate one detail page per knowledge entry.
4. Relationship slugs are resolved against the loaded knowledge and notes collections.

Browser:

1. All knowledge entries are rendered in the initial HTML.
2. A small script reads filter/search controls.
3. Matching items are shown/hidden locally.
4. No network call, database, or search backend is required.

## Error Handling

- Unknown knowledge detail route uses normal static 404 behavior.
- Missing optional metadata does not break rendering.
- Invalid `sourceUrl`, `paperUrl`, or `toolUrl` is rejected by the Astro schema at build time.
- Invalid `type` or `status` is rejected by the schema at build time.
- Unresolved `related` / `relatedNotes` slugs are omitted from rendered relationship links.
- Empty domains are not shown as having counts greater than zero.
- Obsidian section remains non-interactive until a verified public URL is introduced in a future change.

## Testing

Extend the existing Node smoke-test layer to verify:

- the `knowledge` collection exists in `src/content.config.ts`;
- all four supported knowledge types are accepted by the schema;
- `/knowledge/` landing page exists;
- a dynamic knowledge detail route exists;
- Header includes `Knowledge` navigation;
- homepage links to `/knowledge/`;
- the Obsidian Coming Soon element contains no external href;
- at least the four seed entries exist;
- no fabricated static content-count strings are hard-coded.

GitHub Actions remains the production build verification for Astro compilation and Pages deployment.

## Accessibility

- Search input has a real label or accessible name.
- Filter controls are keyboard-operable native controls.
- Type/status distinctions never rely on color alone.
- Obsidian Coming Soon UI must not be announced as a link or button.
- Knowledge cards/rows use semantic links with visible focus states.
- Search/filter results remain understandable when reduced motion is enabled.

## SEO

- Landing title: `Knowledge Base · Lorien Lab`
- Detail title: `<Entry Title> · Lorien Lab`
- Each detail description uses the entry frontmatter description.
- Canonical URLs continue to use the existing BaseLayout mechanism.

## Performance and Scope Constraints

V1 stays static-first and intentionally avoids:

- external databases
- server-side search
- Algolia or other hosted search
- authentication
- private Obsidian content synchronization
- graph-layout libraries
- live Obsidian integration
- automatic import from the local Obsidian vault

A future Obsidian Publish URL can be introduced as configuration and surfaced in the existing Obsidian section without changing the core knowledge collection.

## Success Criteria

The feature is complete when:

- `Knowledge` is a first-class navigation destination;
- `/knowledge/` presents taxonomy, featured entries, search/filtering, and Obsidian Coming Soon status;
- Concept, Paper, Tool, and Topic are supported by one validated content model;
- detail pages render relationships to other knowledge entries and Notes;
- the homepage includes a Knowledge Base section without removing Notes;
- four real seed entries demonstrate the system;
- GitHub Actions builds and deploys successfully;
- existing Research, Projects, Notes, CV, About, theme, and PDF CV behavior remain intact.
