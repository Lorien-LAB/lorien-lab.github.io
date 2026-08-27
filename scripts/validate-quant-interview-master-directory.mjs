import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateMasterDirectory } from '../src/lib/quantInterviewMasterDirectory.mjs';

const SOURCES = [
  'green-book',
  'red-book',
  '150-most-frequently-asked',
];

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

async function readContentSlugs(directory, requireQuantTopics = false) {
  const files = await readdir(directory, { recursive: true });
  const slugs = new Set();
  for (const file of files.filter((entry) => String(entry).endsWith('.md'))) {
    const text = await readFile(path.join(directory, String(file)), 'utf8');
    if (requireQuantTopics && !/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(text)) continue;
    slugs.add(path.basename(String(file), '.md'));
  }
  return slugs;
}

function flattenTocSections(sections, output = new Set()) {
  for (const section of sections ?? []) {
    output.add(section.id);
    flattenTocSections(section.children, output);
  }
  return output;
}

export async function loadMasterDirectoryRepository(repoRoot = process.cwd()) {
  const dataRoot = path.join(repoRoot, 'src', 'data', 'quant-interview');
  const [directory, taxonomy, sourceTopicMap, ...sourceInputs] = await Promise.all([
    readJson(path.join(dataRoot, 'master-directory.json')),
    readJson(path.join(dataRoot, 'topics', 'taxonomy.json')),
    readJson(path.join(dataRoot, 'topics', 'source-topic-map.json')),
    ...SOURCES.flatMap((source) => [
      readJson(path.join(dataRoot, `${source}.json`)),
      readJson(path.join(dataRoot, 'toc', `${source}.json`)),
      readJson(path.join(dataRoot, 'coverage', `${source}.json`)),
    ]),
  ]);

  const sourceManifests = {};
  const tocs = {};
  const coverageLedgers = {};
  SOURCES.forEach((source, index) => {
    sourceManifests[source] = sourceInputs[index * 3];
    tocs[source] = sourceInputs[index * 3 + 1];
    coverageLedgers[source] = sourceInputs[index * 3 + 2];
  });

  const workstreamDirectory = path.join(dataRoot, 'workstreams');
  const workstreamFiles = (await readdir(workstreamDirectory))
    .filter((file) => file.endsWith('.json'))
    .sort();
  const workstreams = await Promise.all(
    workstreamFiles.map((file) => readJson(path.join(workstreamDirectory, file))),
  );

  return {
    directory,
    taxonomy,
    sourceTopicMap,
    sourceManifests,
    tocs,
    coverageLedgers,
    workstreams,
    problemSlugs: await readContentSlugs(path.join(repoRoot, 'src', 'content', 'problems')),
    knowledgeSlugs: await readContentSlugs(
      path.join(repoRoot, 'src', 'content', 'knowledge'),
      true,
    ),
  };
}

export function validateMasterDirectoryRepository(inputs) {
  const sourceIds = new Set(Object.keys(inputs.sourceManifests));
  const sourceSections = new Map(
    Object.entries(inputs.tocs)
      .map(([source, toc]) => [source, flattenTocSections(toc.sections)]),
  );

  validateMasterDirectory(inputs.directory, {
    taxonomy: inputs.taxonomy,
    sourceIds,
    sourceSections,
    problemSlugs: inputs.problemSlugs,
    knowledgeSlugs: inputs.knowledgeSlugs,
    workstreamIds: new Set(inputs.workstreams.map(({ id }) => id)),
  });

  for (const [source, sectionIds] of sourceSections) {
    const sourceNodes = inputs.directory.nodes.filter((node) => node.source === source);
    const sourceItems = inputs.directory.items.filter((item) => item.source === source);
    if (sourceNodes.length === 0 || sourceItems.length === 0) {
      throw new Error(`Master directory is missing ${source} enumeration.`);
    }
    for (const sectionId of sectionIds) {
      if (!sourceNodes.some((node) => node.sourceSection === sectionId)
        && !sourceItems.some((item) => item.sourceSection === sectionId)) {
        throw new Error(`Master directory is missing ${source} section ${sectionId}.`);
      }
    }
  }

  return true;
}

async function main() {
  if (process.argv.slice(2).join(' ') !== '--check') {
    throw new Error('Usage: node scripts/validate-quant-interview-master-directory.mjs --check');
  }
  validateMasterDirectoryRepository(await loadMasterDirectoryRepository(process.cwd()));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
