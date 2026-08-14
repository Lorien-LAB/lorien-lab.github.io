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
    sourceUrl: z.string().url().optional(),
    authors: z.array(z.string()).optional(),
    year: z.number().int().optional(),
    paperUrl: z.string().url().optional(),
    language: z.string().optional(),
    toolUrl: z.string().url().optional(),
  }),
});

export const collections = { research, projects, notes, knowledge };
