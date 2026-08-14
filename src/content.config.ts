import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const commonTags = z.array(z.string()).default([]);

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

export const collections = { research, projects, notes, knowledge, reproductions };
