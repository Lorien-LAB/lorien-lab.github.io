# Financial Resources Official Links & Attribution Design

## Goal

Refine the existing Financial Engineering Learning Resources knowledge cluster so that:

1. every resource node exposes a clearly identified canonical official link;
2. the hub page begins with a prominent acknowledgement that the learning map is adapted from **Prof. Chuan Shi (石川教授)**'s *A Curated Guide to Financial Engineering Resources* (November 2025);
3. supplementary links are explicitly distinguished from official/canonical resources;
4. the original uploaded PDF remains unhosted.

This is a targeted content/metadata refinement. It does not redesign the Knowledge Base or change its routing model.

## Source Boundaries

Two evidence layers are allowed and must remain distinguishable:

- **Guide-derived content:** titles, resource selection, descriptions, and the five-stage learning path come from the uploaded guide.
- **Externally verified official links:** canonical current URLs may be updated using the relevant official organization/author/publisher website when the guide's URL is a subpage, old route, or supplementary repository.

Do not rewrite the guide's substantive recommendations based on outside research. External verification is only for attribution and link canonicalization.

## Prof. Chuan Shi Attribution

The hub entry `src/content/knowledge/topics/financial-engineering-learning-resources.md` must open with a visible acknowledgement before the rest of the guide content.

Required wording, with minor typographic changes allowed:

> **Source acknowledgement.** This learning map is adapted from **Prof. Chuan Shi (石川教授)**'s *A Curated Guide to Financial Engineering Resources* (November 2025). The resource selection, descriptions, and recommended learning path originate from Prof. Shi's guide; Lorien Lab restructures them as connected Knowledge Base entries and adds verified official links for navigation.

`Prof. Chuan Shi (石川教授)` should link to his official personal academic website:

```text
https://www.shichuan.info/
```

Do not imply that the Lorien Lab page is authored by Prof. Shi or officially endorsed by him. Use `adapted from`, `based on`, or equivalent attribution language.

## Knowledge Schema

Add one optional field to the existing `knowledge` schema:

```ts
officialUrl: z.string().url().optional(),
```

Purpose:

- `officialUrl` means the canonical first-party page for the resource;
- `toolUrl` retains its existing general tool-link semantics for older entries;
- `paperUrl` retains its existing paper-link semantics;
- `sourceUrl` remains a generic source/reference URL and must not be relabeled globally as official.

This avoids overloading `sourceUrl` and prevents future non-official references from being mislabeled.

## Knowledge Detail Page

Modify `src/pages/knowledge/[...id].astro` so `officialUrl` is rendered first in `Sources & Links`.

Label rules:

- `type: tool` → `Official Website`
- any other type → `Official Resource`

Existing `paperUrl`, `toolUrl`, and `sourceUrl` links continue to render with their existing labels.

If two fields contain the exact same URL, render the URL once only. Prefer `officialUrl` over the lower-priority duplicate.

No visual redesign is required; use the existing `Sources & Links` relation block.

## Canonical Official URLs

### WorldQuant University

Entry: `src/content/knowledge/tools/worldquant-university.md`

```yaml
officialUrl: https://www.wqu.edu/
```

The body must list all three WQU resources from the guide and link to their current first-party pages:

```text
Applied Data Science Lab
https://www.wqu.edu/data-science-lab

Deep Learning Fundamentals Lab
https://www.wqu.edu/deep-learning-lab

Applied AI Lab: Deep Learning for Computer Vision
current official WQU page: https://www.wqu.edu/computer-vision-lab
```

Preserve the guide's original course naming in source-derived prose. It is acceptable to note that WQU's current page is titled `Computer Vision Lab`.

### QuantStart

Entry: `src/content/knowledge/tools/quantstart.md`

```yaml
officialUrl: https://www.quantstart.com/articles/
```

This points directly to the official article collection referenced by the guide.

### Machine Learning for Factor Investing

Entry: `src/content/knowledge/topics/machine-learning-for-factor-investing.md`

```yaml
officialUrl: https://www.mlfactor.com/
```

The guide's coding page remains useful but is secondary:

```text
Supplementary code/notebooks from the book site:
https://www.mlfactor.com/python.html
```

Do not describe the supplementary page as the canonical homepage.

### DDA3600 Factor Investing Course Materials

Entry: `src/content/knowledge/tools/dda3600-factor-investing-course-materials.md`

```yaml
officialUrl: https://www.shichuan.info/teaching/DDA3600
```

### AQR Insights

Entry: `src/content/knowledge/tools/aqr-insights.md`

```yaml
officialUrl: https://www.aqr.com/Insights
```

### Advances in Financial Machine Learning

Entry: `src/content/knowledge/topics/advances-in-financial-machine-learning.md`

Canonical official resource is the publisher page:

```yaml
officialUrl: https://uat.store.wiley.com/en-us/advances-in-financial-machine-learning-p-9781119482086
```

The GitHub repository supplied by the guide is retained in the Markdown body and explicitly labeled supplementary exercises:

```text
Supplementary exercises referenced by Prof. Shi's guide:
https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises
```

Do not call that GitHub repository official book code unless first-party evidence establishes that status.

### Interpretable Machine Learning

Entry: `src/content/knowledge/topics/interpretable-machine-learning.md`

```yaml
officialUrl: https://christophm.github.io/interpretable-ml-book/
```

### QuantConnect LEAN

Entry: `src/content/knowledge/tools/quantconnect-lean.md`

```yaml
officialUrl: https://github.com/QuantConnect/Lean
```

The repository is owned by the QuantConnect GitHub organization and is the guide's referenced LEAN resource.

### AI & Big Data in Finance Research Forum

Entry: `src/content/knowledge/tools/ai-big-data-finance-research-forum.md`

```yaml
officialUrl: https://www.abfr-forum.org/
```

## Hub Resource Links

The hub page should not force readers to open each child entry just to reach a resource. Each resource name in the five learning-path sections should be linked internally to its Lorien Lab Knowledge entry.

The official external links remain on the child detail pages. This preserves the Knowledge Base as the navigation layer while keeping source attribution and resource metadata in one place.

## Testing

Extend the existing financial-resources tests to verify:

1. the hub contains `Prof. Chuan Shi`, `石川教授`, `adapted from`, and `https://www.shichuan.info/`;
2. all nine child entries contain the expected `officialUrl` values;
3. WQU contains all three current official WQU URLs;
4. AFML contains the Wiley official URL and separately retains the GitHub exercises URL;
5. MLFactor contains the canonical homepage and the `/python.html` supplementary URL;
6. the Knowledge detail route renders `officialUrl` and the labels `Official Website` / `Official Resource`;
7. the uploaded PDF is not present in `public/` or committed as a site asset;
8. `npm test`, `npm run check`, and `npm run build` pass.

## Non-Goals

This change does not:

- host or publish the original PDF;
- add new Knowledge entry types;
- redesign the Knowledge landing page;
- add ratings, difficulty levels, rankings, or personal endorsements;
- claim Prof. Shi endorses Lorien Lab;
- replace the guide's learning path with a new one;
- independently reassess whether every resource is still free.

## Acceptance Criteria

The change is complete when a visitor can:

1. immediately see that the hub originates from Prof. Chuan Shi's guide;
2. click Prof. Shi's name to his official academic site;
3. open any of the nine resource nodes and find a clearly labeled official first-party link;
4. distinguish official resources from supplementary code/exercise links;
5. navigate the hub to each internal resource node without dead links;
6. build the entire static site without schema or route errors.
