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

export const collections = { research, projects, notes };
