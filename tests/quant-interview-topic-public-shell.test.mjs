import test from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const hub = 'src/pages/knowledge/quant-interview/index.astro';
const bank = 'src/pages/problems/index.astro';
const detail = 'src/layouts/ProblemLayout.astro';
const repositoryRoot = path.resolve();
const publicCollections = new Set(['knowledge', 'problems']);
const publicBareImports = new Set(['astro:content']);
const publicLocalFiles = new Set([
  hub,
  'src/pages/knowledge/quant-interview/directory.astro',
  bank,
  'src/pages/problems/[...slug].astro',
  detail,
  'src/components/ProblemCard.astro',
  'src/layouts/BaseLayout.astro',
  'src/components/Header.astro',
  'src/components/Footer.astro',
  'src/components/LanguageToggle.astro',
  'src/components/VisitCounter.astro',
  'src/components/TagList.astro',
  'src/components/ProblemDifficulty.astro',
  'src/components/QuantInterviewTopicCard.astro',
  'src/lib/problemRelations.ts',
  'src/lib/quantInterviewPublicTopics.ts',
  'src/lib/quantInterviewKnowledgeDirectory.mjs',
  'src/lib/visitCounter.mjs',
  'src/styles/global.css',
  'src/data/quant-interview/topics/taxonomy.json',
  'src/data/quant-interview/topics/knowledge-catalog.json',
]);
const publicShellRoots = [
  hub,
  bank,
  detail,
  'src/pages/problems/[...slug].astro',
  'src/components/ProblemCard.astro',
  'src/pages/knowledge/quant-interview/directory.astro',
];
const staticImportPattern = /(?:\b(?:import|export)\s+(?:type\s+)?[^;]*?\s+from\s*|\bimport\s*)['"]([^'"]+)['"]/g;
const dynamicImportPattern = /\bimport\s*\(\s*([^\r\n)]+)\s*\)/g;
const collectionCallPattern = /\bgetCollection\s*\(\s*([^\r\n)]+)\s*\)/g;
const stringLiteralPattern = /^(['"])([^'"]+)\1$/;
const localExtensions = ['.astro', '.ts', '.js', '.mjs', '.json', '.css'];

const legacySourcePages = [
  'src/pages/knowledge/quant-interview/sources/index.astro',
  'src/pages/knowledge/quant-interview/sources/[...slug].astro',
];

const isRepositoryPath = (candidate) => {
  const relative = path.relative(repositoryRoot, candidate);
  return relative && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
};

const repositoryPath = (candidate) => path.relative(repositoryRoot, candidate).replaceAll('\\', '/');

async function resolveLocalImport(from, specifier) {
  const base = path.resolve(path.dirname(from), specifier);
  const candidates = path.extname(base)
    ? [base]
    : [
      base,
      ...localExtensions.map((extension) => `${base}${extension}`),
      ...localExtensions.map((extension) => path.join(base, `index${extension}`)),
    ];
  for (const candidate of candidates) {
    if (!isRepositoryPath(candidate)) continue;
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error?.code)) throw error;
    }
  }
  throw new Error(`unresolved public import from ${repositoryPath(from)}: ${specifier}`);
}

async function assertPublicShellGraph(root, { additionalAllowedFiles = [] } = {}) {
  const allowedFiles = new Set(publicLocalFiles);
  for (const file of additionalAllowedFiles) allowedFiles.add(repositoryPath(path.resolve(file)));
  const pending = [path.resolve(root)];
  const visited = new Set();
  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || visited.has(current)) continue;
    const relativeCurrent = repositoryPath(current);
    if (!allowedFiles.has(relativeCurrent)) {
      throw new Error(`public import not allowlisted: ${relativeCurrent}`);
    }
    visited.add(current);
    const source = await readFile(current, 'utf8');

    for (const match of source.matchAll(collectionCallPattern)) {
      const literal = match[1].trim().match(stringLiteralPattern);
      if (!literal) throw new Error(`public collection name must be a string literal: ${relativeCurrent}`);
      if (!publicCollections.has(literal[2])) throw new Error(`public collection not allowlisted: ${literal[2]}`);
    }

    const specifiers = [...source.matchAll(staticImportPattern)].map((match) => match[1]);
    for (const match of source.matchAll(dynamicImportPattern)) {
      const literal = match[1].trim().match(stringLiteralPattern);
      if (!literal) throw new Error(`public dynamic import must use a string literal: ${relativeCurrent}`);
      specifiers.push(literal[2]);
    }
    for (const specifier of specifiers) {
      if (!specifier.startsWith('.')) {
        if (!publicBareImports.has(specifier)) throw new Error(`public bare import not allowlisted: ${specifier}`);
        continue;
      }
      const dependency = await resolveLocalImport(current, specifier);
      const relativeDependency = repositoryPath(dependency);
      if (!allowedFiles.has(relativeDependency)) {
        throw new Error(`public import not allowlisted: ${relativeDependency}`);
      }
      pending.push(dependency);
    }
  }
  return new Set([...visited].map(repositoryPath));
}

async function createPublicShellFixture(t, files) {
  const fixtureDirectory = await mkdtemp(path.resolve('tests', '.public-shell-'));
  t.after(() => rm(fixtureDirectory, { recursive: true, force: true }));
  for (const [relativeFile, source] of Object.entries(files)) {
    const target = path.join(fixtureDirectory, relativeFile);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source, 'utf8');
  }
  return {
    fixtureDirectory,
    root: path.join(fixtureDirectory, 'directory.astro'),
    allowedFixtureFiles: Object.keys(files).map((relativeFile) => path.join(fixtureDirectory, relativeFile)),
  };
}

test('public topic primitives depend only on the canonical taxonomy', async () => {
  const loader = await readFile('src/lib/quantInterviewPublicTopics.ts', 'utf8');
  const card = await readFile('src/components/QuantInterviewTopicCard.astro', 'utf8');
  assert.match(loader, /topics\/taxonomy\.json/);
  assert.match(loader, /flattenPublicQuantInterviewTopics/);
  assert.doesNotMatch(loader, /source-topic-map|quant-interview\/coverage|quantInterviewCoverage/);
  assert.match(card, /knowledgeCount/);
  assert.match(card, /problemCount/);
  assert.match(card, /\?topic=/);
  assert.doesNotMatch(card, /problemSources|quant-interview\/coverage|quantInterviewCoverage/);
});

test('Quant Interview hub is Topic-first and source-neutral', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /Learn by Topic/i);
  assert.match(text, /QuantInterviewTopicCard/);
  assert.doesNotMatch(text, /Explore Sources|sourceStats|source-grid|All sources/i);
  assert.doesNotMatch(text, /getCollection\(['"]problemSources['"]\)/);
});

test('migrated content activates dynamic topic counts instead of hard-coded topic totals', async () => {
  const text = await readFile(hub, 'utf8');
  assert.match(text, /entry\.data\.quantInterviewTopics\.some/);
  assert.match(text, /knowledgeCount:/);
  assert.match(text, /problemCount:/);
  assert.match(text, /descendantIds/);

  const problemFiles = await readdir('src/content/problems', { recursive: true });
  const knowledgeFiles = await readdir('src/content/knowledge', { recursive: true });
  const classifiedProblems = [];
  const classifiedKnowledge = [];
  for (const file of problemFiles.filter((name) => String(name).endsWith('.md'))) {
    const source = await readFile(`src/content/problems/${file}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(source)) classifiedProblems.push(file);
  }
  for (const file of knowledgeFiles.filter((name) => String(name).endsWith('.md'))) {
    const source = await readFile(`src/content/knowledge/${file}`, 'utf8');
    if (/^quantInterviewTopics:\s*\[[^\]]+\]$/m.test(source)) classifiedKnowledge.push(file);
  }
  assert.ok(classifiedProblems.length >= 6, 'expected migrated canonical Problems to drive topic counts');
  assert.ok(classifiedKnowledge.length >= 12, 'expected migrated reusable Knowledge to drive topic counts');
});

test('Problem Bank filters by topic, not source', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /data-topic-filter/);
  assert.match(text, /data-topics/);
  assert.doesNotMatch(text, /data-source-filter|All sources|sourceOptions|sourceBySlug/);
});

test('Problem Bank expands topic ancestry and supports taxonomy-backed query prefiltering', async () => {
  const text = await readFile(bank, 'utf8');
  assert.match(text, /flattenPublicQuantInterviewTopics/);
  assert.match(text, /expandTopicIdsWithAncestors\(problem\.data\.quantInterviewTopics\)/);
  assert.match(text, /new URLSearchParams\(window\.location\.search\)/);
  assert.match(text, /get\(['"]topic['"]\)/);
  assert.match(text, /topic\.value = requestedTopic/);
});

test('Problem detail renders no public source provenance', async () => {
  const text = await readFile(detail, 'utf8');
  assert.doesNotMatch(text, /sourceLine|sourceReference|shortTitle|source-line/);
});

test('public topic shell import graph matches the explicit public allowlist', async () => {
  const observedFiles = new Set();
  for (const root of publicShellRoots) {
    const visited = await assertPublicShellGraph(root);
    for (const file of visited) observedFiles.add(file);
  }
  assert.deepEqual([...observedFiles].sort(), [...publicLocalFiles].sort());
});

const prohibitedStaticImports = [
  ['Green Book source manifest', 'src/data/quant-interview/green-book.json'],
  ['Red Book source manifest', 'src/data/quant-interview/red-book.json'],
  ['150 Questions source manifest', 'src/data/quant-interview/150-most-frequently-asked.json'],
  ['Green Book verified TOC', 'src/data/quant-interview/toc/green-book.json'],
  ['Red Book verified TOC', 'src/data/quant-interview/toc/red-book.json'],
  ['150 Questions verified TOC', 'src/data/quant-interview/toc/150-most-frequently-asked.json'],
  ['source-topic mapping', 'src/data/quant-interview/topics/source-topic-map.json'],
  ['coverage ledger', 'src/data/quant-interview/coverage/green-book.json'],
  ['workstream manifest', 'src/data/quant-interview/workstreams/probability-statistics-probability-foundations-005.json'],
  ['internal directory generator', 'scripts/generate-quant-interview-knowledge-directory.mjs'],
];

for (const [name, target] of prohibitedStaticImports) {
  test(`public shell guard rejects ${name}`, async (t) => {
    const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
      'directory.astro': `import '../../${target}';\n`,
    });
    await assert.rejects(
      assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
      new RegExp(`public import not allowlisted: ${target.replaceAll('/', '\\/').replaceAll('.', '\\.')}`),
    );
  });
}

test('public shell guard rejects literal dynamic imports', async (t) => {
  const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
    'directory.astro': "await import('../../src/data/quant-interview/green-book.json');\n",
  });
  await assert.rejects(
    assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
    /public import not allowlisted: src\/data\/quant-interview\/green-book\.json/,
  );
});

test('public shell guard rejects multiline internal generator imports', async (t) => {
  const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
    'directory.astro': "import {\n  buildInternalDirectoryModel,\n} from '../../scripts/generate-quant-interview-knowledge-directory.mjs';\n",
  });
  await assert.rejects(
    assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
    /public import not allowlisted: scripts\/generate-quant-interview-knowledge-directory\.mjs/,
  );
});

test('public shell guard rejects non-literal dynamic imports', async (t) => {
  const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
    'directory.astro': "const target = '../../src/data/quant-interview/green-book.json';\nawait import(target);\n",
  });
  await assert.rejects(
    assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
    /public dynamic import must use a string literal/,
  );
});

test('public shell guard resolves directory-index imports before enforcing the allowlist', async (t) => {
  const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
    'directory.astro': "import './bridge';\n",
    'bridge/index.mjs': "import '../../../src/data/quant-interview/toc/green-book.json';\n",
  });
  await assert.rejects(
    assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
    /public import not allowlisted: src\/data\/quant-interview\/toc\/green-book\.json/,
  );
});

test('public shell guard rejects private content collections', async (t) => {
  const { root, allowedFixtureFiles } = await createPublicShellFixture(t, {
    'directory.astro': "import { getCollection } from 'astro:content';\nawait getCollection('problemSources');\n",
  });
  await assert.rejects(
    assertPublicShellGraph(root, { additionalAllowedFiles: allowedFixtureFiles }),
    /public collection not allowlisted: problemSources/,
  );
});

test('legacy source routes are retired and redirected to the Topic-first hub', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /knowledge\/quant-interview\/sources/);
  assert.match(config, /knowledge\/quant-interview/);
  for (const path of legacySourcePages) {
    await assert.rejects(access(path));
  }
});
