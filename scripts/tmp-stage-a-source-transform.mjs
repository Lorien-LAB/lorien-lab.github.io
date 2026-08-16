import { readFile, writeFile } from 'node:fs/promises';

const tocPath = 'src/data/quant-interview/toc/green-book.json';
const toc = JSON.parse(await readFile(tocPath, 'utf8'));
toc.tocStatus = 'source-file-verified';
toc.coverageClaim = 'verified-structure-not-problem-complete';
toc.editionStatus = 'edition-pinned';
toc.edition = 'First Edition (2008)';
toc.sourceFileEvidence = {
  pdfPageCount: 213,
  identity: 'sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5',
};
await writeFile(tocPath, `${JSON.stringify(toc, null, 2)}\n`);

const configPath = 'src/content.config.ts';
let config = await readFile(configPath, 'utf8');
if (!/const knowledge = defineCollection[\s\S]*?quantInterviewTopics:/m.test(config)) {
  const marker = '    tags: commonTags,\n    featured: z.boolean().default(false),';
  if (!config.includes(marker)) throw new Error('Knowledge schema insertion marker not found.');
  config = config.replace(marker, '    tags: commonTags,\n    quantInterviewTopics: z.array(z.string()).default([]),\n    featured: z.boolean().default(false),');
}
const problemStart = config.indexOf('const problems = defineCollection');
if (problemStart < 0) throw new Error('Problems schema not found.');
const beforeProblems = config.slice(0, problemStart);
let problemsTail = config.slice(problemStart);
if (!/quantInterviewTopics:/.test(problemsTail.split('const reproductionScore')[0])) {
  const marker = '    tags: commonTags,\n    concepts: z.array(z.string()).default([]),';
  if (!problemsTail.includes(marker)) throw new Error('Problem schema insertion marker not found.');
  problemsTail = problemsTail.replace(marker, '    tags: commonTags,\n    quantInterviewTopics: z.array(z.string()).default([]),\n    concepts: z.array(z.string()).default([]),');
}
config = beforeProblems + problemsTail;
await writeFile(configPath, config);
