import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonTags = z.array(z.string()).default([]);
const difficulty = z.number().int().min(1).max(5);

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(), description: z.string(), category: z.string(), status: z.string(),
    date: z.coerce.date(), tags: commonTags, featured: z.boolean().default(false), repoUrl: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(), description: z.string(), status: z.string(), date: z.coerce.date(), tags: commonTags,
    featured: z.boolean().default(false), repoUrl: z.string().url().optional(), docsUrl: z.string().url().optional(),
    metrics: z.record(z.string(), z.string()).optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(), tags: commonTags,
    category: z.string(), draft: z.boolean().default(false),
  }),
});

const knowledge = defineCollection({
  loader: glob({ base: './src/content/knowledge', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['concept', 'paper', 'tool', 'topic']),
    domain: z.string(),
    category: z.string(),
    status: z.enum(['seed', 'growing', 'mature']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: commonTags,
    featured: z.boolean().default(false),
    related: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([]),
    officialUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    authors: z.array(z.string()).optional(),
    year: z.number().int().optional(),
    paperUrl: z.string().url().optional(),
    language: z.string().optional(),
    toolUrl: z.string().url().optional(),
  }),
});

const problemSources = defineCollection({
  loader: glob({ base: './src/content/problem-sources', pattern: '**/*.md' }),
  schema: z.object({
    shortTitle: z.string(),
    displayTitle: z.string(),
    canonicalTitle: z.string(),
    aliases: z.array(z.string()).default([]),
    sourceType: z.enum(['book', 'interview', 'public-archive', 'original']),
    description: z.string(),
    authors: z.array(z.string()).optional(),
    publisher: z.string().optional(),
    year: z.number().int().min(1900).max(2100).optional(),
    edition: z.string().optional(),
    editionStatus: z.enum(['work-identified', 'edition-pinned']),
    ingestionStatus: z.enum(['source-only', 'manifest-ready', 'ingesting', 'complete']),
    bibliographicUrl: z.string().url().optional(),
    officialUrl: z.string().url().optional(),
    publisherUrl: z.string().url().optional(),
    isbn: z.string().optional(),
  }).superRefine((source, ctx) => {
    if (source.editionStatus === 'edition-pinned' && !source.edition) {
      ctx.addIssue({
        code: 'custom',
        path: ['edition'],
        message: 'Edition-pinned sources require an exact edition label.',
      });
    }
  }),
});

const problems = defineCollection({
  loader: glob({ base: './src/content/problems', pattern: '**/*.md' }),
  schema: z.object({
    problemId: z.string().min(1),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    originType: z.enum(['book', 'interview', 'original', 'public-archive']),
    source: z.string().optional(),
    sourceSection: z.string().optional(),
    sourceChapter: z.string().optional(),
    sourceProblem: z.string().optional(),
    sourceReference: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    domain: z.string(),
    category: z.string(),
    subcategories: z.array(z.string()).default([]),
    tags: commonTags,
    concepts: z.array(z.string()).default([]),
    techniques: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    relatedProblems: z.array(z.string()).default([]),
    family: z.string().optional(),
    mathDifficulty: difficulty,
    insightDifficulty: difficulty,
    interviewDifficulty: difficulty,
    estimatedMinutes: z.number().int().positive().optional(),
    status: z.enum(['draft', 'reviewed', 'solved', 'extended']),
    featured: z.boolean().default(false),
  }).superRefine((problem, ctx) => {
    if (problem.originType !== 'original' && !problem.source) {
      ctx.addIssue({
        code: 'custom',
        path: ['source'],
        message: 'Source-derived problems require a source slug.',
      });
    }
  }),
});

const reproductionScore = z.object({
  dataMatch: z.number().min(0).max(5).optional(),
  methodMatch: z.number().min(0).max(5).optional(),
  signalMatch: z.number().min(0).max(5).optional(),
  performanceMatch: z.number().min(0).max(5).optional(),
  robustness: z.number().min(0).max(5).optional(),
  reproducibility: z.number().min(0).max(5).optional(),
});

const reproductionMetric = z.object({
  name: z.string(),
  original: z.string(),
  reproduced: z.string(),
  difference: z.string().optional(),
});

const reproductionCaseStudy = z.object({
  shortTitle: z.string(),
  subtitle: z.string().optional(),
  verdicts: z.array(z.object({
    label: z.string(),
    status: z.enum(['reproduced', 'partial', 'not-reproduced', 'extension']),
    evidence: z.string(),
  })).default([]),
  factorEvidence: z.array(z.object({
    factor: z.string(),
    paper: z.string(),
    reproduced: z.string(),
    note: z.string().optional(),
  })).default([]),
  strategyFlow: z.array(z.string()).default([]),
  limitations: z.array(z.object({
    title: z.string(),
    detail: z.string(),
  })).default([]),
  extension: z.object({
    title: z.string(),
    thesis: z.string(),
    metrics: z.array(z.object({
      label: z.string(),
      paper: z.string().optional(),
      baseline: z.string().optional(),
      extension: z.string(),
    })).default([]),
    caution: z.string().optional(),
  }).optional(),
});

const reproductionBase = z.object({
  slug: z.string().min(1),
  title: z.string(),
  description: z.string(),
  researchArea: z.string(),
  stage: z.enum(['reading', 'data', 'implementation', 'validation', 'reproduction', 'extension']),
  result: z.enum(['successful', 'partial', 'failed', 'inconclusive', 'extended']),
  resultSummary: z.string().optional(),
  codeVisibility: z.enum(['public', 'partial', 'private']),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: commonTags,
  featured: z.boolean().default(false),
  assetClass: z.string().optional(),
  market: z.string().optional(),
  frequency: z.string().optional(),
  dataAvailability: z.string().optional(),
  reportHtmlPath: z.string().regex(/^\/reports\/[A-Za-z0-9._\/-]+\/?$/).optional(),
  sourceUrl: z.string().url().optional(),
  codeUrl: z.string().url().optional(),
  notebookUrl: z.string().url().optional(),
  configurationUrl: z.string().url().optional(),
  resultsUrl: z.string().url().optional(),
  score: reproductionScore.optional(),
  metrics: z.array(reproductionMetric).default([]),
  relatedKnowledge: z.array(z.string()).default([]),
  relatedNotes: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  caseStudy: reproductionCaseStudy.optional(),
});

const academicReproduction = reproductionBase.extend({
  sourceType: z.literal('academic'),
  authors: z.array(z.string()).min(1),
  year: z.number().int().min(1900).max(2100),
  venue: z.string().optional(),
  journal: z.string().optional(),
  conference: z.string().optional(),
  doi: z.string().optional(),
  ssrn: z.string().optional(),
  arxiv: z.string().optional(),
  paperUrl: z.string().url().optional(),
});

const brokerReproduction = reproductionBase.extend({
  sourceType: z.literal('broker'),
  broker: z.string(),
  analysts: z.array(z.string()).min(1),
  publishDate: z.coerce.date(),
  series: z.string().optional(),
  reportNumber: z.string().optional(),
});

const reproductions = defineCollection({
  loader: glob({ base: './src/content/reproductions', pattern: '**/*.md' }),
  schema: z.discriminatedUnion('sourceType', [academicReproduction, brokerReproduction]),
});

export const collections = { research, projects, notes, knowledge, reproductions, problems, problemSources };
