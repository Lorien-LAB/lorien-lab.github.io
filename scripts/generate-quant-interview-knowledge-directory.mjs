import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  buildPublicKnowledgeDirectory,
  flattenTaxonomy,
} from '../src/lib/quantInterviewKnowledgeDirectory.mjs';
import { getNextPendingItem } from '../src/lib/quantInterviewMasterDirectory.mjs';

const SOURCE_ORDER = ['green-book', 'red-book', '150-most-frequently-asked'];
const SOURCE_LABELS = {
  'green-book': 'Green Book',
  'red-book': 'Red Book',
  '150-most-frequently-asked': '150 Questions',
};
const sectionCollator = new Intl.Collator('en', { numeric: true });

function topicSets(taxonomy, publicTopics) {
  const flat = flattenTaxonomy(taxonomy ?? { topics: publicTopics });
  const descendants = new Map(flat.map((topic) => [topic.id, new Set()]));
  for (const topic of flat) {
    for (const ancestor of topic.path) descendants.get(ancestor).add(topic.id);
  }
  return { descendants, topicIds: new Set(flat.map((topic) => topic.id)) };
}

function validateCoverageTopics(coverageLedgers, topicIds) {
  for (const ledger of Object.values(coverageLedgers ?? {})) {
    for (const entry of ledger.entries ?? []) {
      for (const topicId of entry.canonicalTopics ?? []) {
        if (!topicIds.has(topicId)) throw new Error(`unknown coverage taxonomy topic: ${topicId}`);
      }
    }
  }
}

function intersectsTopicSet(topicIds, descendantIds) {
  return (topicIds ?? []).some((topicId) => descendantIds.has(topicId));
}

function sourceSections(entries, descendantIds, source) {
  return [...new Set(
    entries
      .filter((entry) => entry.source === source && entry.role === 'content')
      .filter((entry) => intersectsTopicSet(entry.canonicalTopics, descendantIds))
      .map((entry) => entry.sourceSection),
  )].sort(sectionCollator.compare);
}

function coverageCounts(entries, descendantIds) {
  const counts = {};
  for (const entry of entries ?? []) {
    if (!intersectsTopicSet(entry.canonicalTopics, descendantIds)) continue;
    counts[entry.state] = (counts[entry.state] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function internalFields(id, inputs, descendants) {
  const descendantIds = descendants.get(id);
  const sources = Object.fromEntries(SOURCE_ORDER.map((source) => [
    source,
    sourceSections(inputs.sourceTopicMap.entries ?? [], descendantIds, source),
  ]));
  const coverage = Object.fromEntries(SOURCE_ORDER.map((source) => [
    source,
    coverageCounts(inputs.coverageLedgers[source]?.entries, descendantIds),
  ]));
  const workstreams = (inputs.workstreams ?? [])
    .filter((workstream) => ['active', 'complete'].includes(workstream.status))
    .filter((workstream) => intersectsTopicSet(workstream.canonicalTopics, descendantIds))
    .map(({ id: workstreamId, status }) => ({ id: workstreamId, status }))
    .sort((left, right) => left.id.localeCompare(right.id));
  const masterItems = (inputs.masterDirectory?.items ?? [])
    .filter((item) => item.primaryTopic === id)
    .map(({
      key,
      source,
      sourceSection,
      sourceItem,
      questionPages,
      solutionPages,
      state,
      canonicalProblems,
      canonicalKnowledge,
      workstream,
    }) => ({
      key,
      source,
      sourceSection,
      sourceItem,
      questionPages,
      solutionPages,
      state,
      canonicalProblems,
      canonicalKnowledge,
      workstream,
    }));
  return { sources, coverage, workstreams, masterItems };
}

/**
 * Projects public curriculum nodes with repository-internal source and workstream state.
 * @param {object} inputs
 */
export function buildInternalDirectoryModel(inputs) {
  const { descendants, topicIds } = topicSets(inputs.taxonomy, inputs.publicDirectory.topics);
  validateCoverageTopics(inputs.coverageLedgers, topicIds);
  const project = (node) => ({
    ...node,
    ...internalFields(node.id, inputs, descendants),
    children: (node.children ?? []).map(project),
  });
  const masterItems = inputs.masterDirectory?.items ?? [];
  const next = getNextPendingItem(inputs.masterDirectory);
  const terminal = masterItems.filter((item) => item.state !== 'pending').length;
  return {
    totals: { ...inputs.publicDirectory.totals },
    problemTotal: new Set((inputs.problemRecords ?? []).map((record) => record.slug)).size,
    masterSummary: {
      total: masterItems.length,
      pending: masterItems.length - terminal,
      terminal,
      firstPendingKey: next?.key ?? null,
    },
    topics: inputs.publicDirectory.topics.map(project),
  };
}

function markdownList(values) {
  return values.length > 0 ? values.map((value) => `\`${value}\``).join(', ') : 'None';
}

function moduleRows(modules) {
  return modules.map((module) => {
    const prerequisites = module.prerequisites?.length
      ? module.prerequisites.map((prerequisite) => `\`${prerequisite.slug}\``).join(', ')
      : 'None';
    return `| ${module.learningOrder} | ${module.status} | \`${module.slug}\` | ${prerequisites} |`;
  });
}

function pageRanges(ranges) {
  return ranges.length
    ? ranges.map(({ startPage, endPage }) => startPage === endPage ? `${startPage}` : `${startPage}–${endPage}`).join(', ')
    : 'None';
}

function masterRows(items) {
  return items.map((item) => {
    const targets = [...item.canonicalProblems, ...item.canonicalKnowledge];
    return `| \`${item.key}\` | \`${item.state}\` | ${pageRanges(item.questionPages)} | ${pageRanges(item.solutionPages)} | ${markdownList(targets)} |`;
  });
}

function renderNode(node, depth, parentNumber = []) {
  const sectionParts = [...parentNumber, String(node.order).padStart(2, '0')];
  const sectionNumber = sectionParts.join('.');
  const heading = '#'.repeat(depth + 2);
  const lines = [
    `${heading} ${sectionNumber}. ${node.title}`,
    '',
    `- Curriculum: ${node.modules.filter((module) => module.status === 'published').length} published / ${node.modules.filter((module) => module.status === 'planned').length} planned`,
    `- Problems: ${node.problemCount}`,
    `- Green Book sections: ${markdownList(node.sources['green-book'])}`,
    `- Red Book sections: ${markdownList(node.sources['red-book'])}`,
    `- 150 Questions sections: ${markdownList(node.sources['150-most-frequently-asked'])}`,
    `- Workstreams: ${node.workstreams.length ? node.workstreams.map((workstream) => `\`${workstream.id}\` (${workstream.status})`).join(', ') : 'None'}`,
    '',
    `${'#'.repeat(depth + 3)} Modules`,
    '',
    '| Order | State | Slug | Prerequisites |',
    '|---:|---|---|---|',
    ...(moduleRows(node.modules)),
    '',
    `${'#'.repeat(depth + 3)} Coverage records`,
    '',
    ...SOURCE_ORDER.map((source) => {
      const counts = Object.entries(node.coverage[source]);
      return `- ${SOURCE_LABELS[source]}: ${counts.length ? counts.map(([state, count]) => `\`${state}\`: ${count}`).join(', ') : 'None'}`;
    }),
  ];
  if (node.masterItems.length > 0) {
    lines.push(
      '',
      `${'#'.repeat(depth + 3)} Master queue records`,
      '',
      '| Key | State | Question pages | Solution pages | Targets |',
      '|---|---|---:|---:|---|',
      ...masterRows(node.masterItems),
    );
  }
  for (const child of node.children ?? []) {
    lines.push('', '', renderNode(child, depth + 1, sectionParts));
  }
  return lines.join('\n');
}

/** @param {object} model */
export function renderInternalDirectoryMarkdown(model) {
  const lines = [
    '# Quant Interview Knowledge Directory',
    '',
    '> Generated from repository state. Do not edit manually.',
    '>',
    '> Source-file or TOC verification does not imply complete problem-level coverage. Counts below are exact repository records, never whole-book completion percentages.',
    '',
    '## Summary',
    '',
    `- Published Knowledge: ${model.totals.published}`,
    `- Planned Knowledge: ${model.totals.planned}`,
    `- Canonical Problems: ${model.problemTotal}`,
    `- Master records: ${model.masterSummary.total}`,
    `- Terminal master records: ${model.masterSummary.terminal}`,
    `- Pending master records: ${model.masterSummary.pending}`,
    `- First pending: ${model.masterSummary.firstPendingKey ? `\`${model.masterSummary.firstPendingKey}\`` : 'None'}`,
  ];
  for (const topic of model.topics) lines.push('', '', renderNode(topic, 0));
  return `${lines.join('\n')}\n`;
}

function frontmatterArray(text, field) {
  const value = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'))?.[1] ?? '';
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

async function readContentRecords(repoRoot, relativeDirectory, project, filterClassified = false) {
  const directory = path.join(repoRoot, relativeDirectory);
  const files = await readdir(directory, { recursive: true });
  const markdownFiles = files.filter((file) => String(file).endsWith('.md'));
  const records = await Promise.all(markdownFiles.map(async (file) => {
    const normalized = String(file).replaceAll('\\', '/');
    const text = await readFile(path.join(directory, normalized), 'utf8');
    return project({ slug: path.basename(normalized, '.md'), text });
  }));
  return records
    .filter((record) => !filterClassified || record.canonicalTopics?.length > 0)
    .sort((left, right) => left.slug.localeCompare(right.slug));
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

/** @param {string} repoRoot */
export async function loadRepositoryDirectoryInputs(repoRoot = process.cwd()) {
  const dataRoot = path.join(repoRoot, 'src', 'data', 'quant-interview');
  const workstreamDirectory = path.join(dataRoot, 'workstreams');
  const [catalog, taxonomy, sourceTopicMap, masterDirectory, greenCoverage, redCoverage, questionsCoverage, knowledgeRecords, problemRecords, workstreamFiles] = await Promise.all([
    readJson(path.join(dataRoot, 'topics', 'knowledge-catalog.json')),
    readJson(path.join(dataRoot, 'topics', 'taxonomy.json')),
    readJson(path.join(dataRoot, 'topics', 'source-topic-map.json')),
    readJson(path.join(dataRoot, 'master-directory.json')),
    readJson(path.join(dataRoot, 'coverage', 'green-book.json')),
    readJson(path.join(dataRoot, 'coverage', 'red-book.json')),
    readJson(path.join(dataRoot, 'coverage', '150-most-frequently-asked.json')),
    readContentRecords(repoRoot, path.join('src', 'content', 'knowledge'), ({ slug, text }) => ({
      slug,
      title: text.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? '',
      canonicalTopics: frontmatterArray(text, 'quantInterviewTopics'),
    }), true),
    readContentRecords(repoRoot, path.join('src', 'content', 'problems'), ({ slug, text }) => ({
      slug,
      canonicalTopics: frontmatterArray(text, 'quantInterviewTopics'),
      concepts: frontmatterArray(text, 'concepts'),
      techniques: frontmatterArray(text, 'techniques'),
      prerequisites: frontmatterArray(text, 'prerequisites'),
    })),
    readdir(workstreamDirectory),
  ]);
  const workstreams = await Promise.all(
    workstreamFiles.filter((file) => file.endsWith('.json')).sort().map((file) => readJson(path.join(workstreamDirectory, file))),
  );
  return {
    taxonomy,
    problemRecords,
    sourceTopicMap,
    masterDirectory,
    coverageLedgers: {
      'green-book': greenCoverage,
      'red-book': redCoverage,
      '150-most-frequently-asked': questionsCoverage,
    },
    workstreams,
    publicDirectory: buildPublicKnowledgeDirectory({ catalog, taxonomy, knowledgeRecords, problemRecords, base: '/' }),
  };
}

function usage() {
  return 'Usage: node scripts/generate-quant-interview-knowledge-directory.mjs (--write|--check) [--repo-root <path>] [--output <path>]';
}

function parseArguments(argv) {
  let mode;
  let repoRoot = process.cwd();
  let output;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--write' || argument === '--check') {
      if (mode) throw new Error(usage());
      mode = argument;
      continue;
    }
    if (argument === '--repo-root' || argument === '--output') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(usage());
      if (argument === '--repo-root') repoRoot = value;
      else output = value;
      index += 1;
      continue;
    }
    throw new Error(usage());
  }
  if (!mode) throw new Error(usage());
  const resolvedRepoRoot = path.resolve(repoRoot);
  return {
    mode,
    repoRoot: resolvedRepoRoot,
    output: output ? path.resolve(resolvedRepoRoot, output) : path.join(resolvedRepoRoot, 'docs', 'quant-interview', 'KNOWLEDGE_DIRECTORY.md'),
  };
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  const inputs = await loadRepositoryDirectoryInputs(options.repoRoot);
  const markdown = renderInternalDirectoryMarkdown(buildInternalDirectoryModel(inputs));
  if (options.mode === '--write') {
    await writeFile(options.output, markdown, 'utf8');
    return;
  }
  let existing;
  try {
    existing = await readFile(options.output, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('Knowledge directory is stale; run npm run knowledge:directory');
    }
    throw error;
  }
  if (existing !== markdown) throw new Error('Knowledge directory is stale; run npm run knowledge:directory');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
