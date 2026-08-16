import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { validateCoverageLedger } from '../src/lib/quantInterviewCoverage.mjs';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');
const sourceTopicMap = await readJson('src/data/quant-interview/topics/source-topic-map.json');
await mkdir('src/data/quant-interview/coverage', { recursive: true });

for (const source of ['green-book', 'red-book', '150-most-frequently-asked']) {
  const entries = sourceTopicMap.entries
    .filter((entry) => entry.source === source)
    .map((entry) => ({
      sourceSection: entry.sourceSection,
      sourceItem: null,
      canonicalTopics: entry.canonicalTopics,
      state: entry.role === 'content' ? 'pending' : 'non-content-frontmatter',
      canonicalProblems: [],
      canonicalKnowledge: [],
    }));
  const ledger = { source, version: 1, entries };
  validateCoverageLedger(ledger, {
    sourceTopicMap,
    taxonomy,
    problemSlugs: new Set(),
    knowledgeSlugs: new Set(),
    allowUnresolvedCanonicalRefs: true,
  });
  await writeFile(`src/data/quant-interview/coverage/${source}.json`, `${JSON.stringify(ledger, null, 2)}\n`);
  console.log(`${source}: ${entries.length} coverage records`);
}
