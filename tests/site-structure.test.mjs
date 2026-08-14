import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const requiredFiles = [
  'src/pages/index.astro',
  'src/pages/research/index.astro',
  'src/pages/projects/index.astro',
  'src/pages/notes/index.astro',
  'src/pages/cv.astro',
  'src/pages/about.astro',
  'src/components/Header.astro',
  'src/components/Hero.astro',
  'src/content.config.ts',
  '.github/workflows/deploy.yml',
  'README.md',
];

const knowledgeFiles = [
  'src/pages/knowledge/index.astro',
  'src/pages/knowledge/[...id].astro',
  'src/content/knowledge/concepts/walk-forward-validation.md',
  'src/content/knowledge/concepts/fama-macbeth-regression.md',
  'src/content/knowledge/tools/rqalpha.md',
  'src/content/knowledge/topics/automated-factor-discovery.md',
];

const reproductionFiles = [
  'src/pages/knowledge/reproductions/index.astro',
  'src/pages/knowledge/reproductions/[...id].astro',
  'src/components/ReproductionCard.astro',
  'src/components/ReproductionPipeline.astro',
  'src/components/ReproductionScore.astro',
];

test('portfolio exposes every required v1 surface', async () => {
  for (const file of requiredFiles) await access(file);
});

test('header contains the complete portfolio navigation', async () => {
  const source = await readFile('src/components/Header.astro', 'utf8');
  for (const label of ['Home', 'Research', 'Projects', 'Knowledge', 'Notes', 'CV', 'About']) {
    assert.ok(source.includes(`['${label}',`) || source.includes(`>${label}<`), `missing ${label} navigation item`);
  }
});

test('homepage positions the site around quantitative research without fabricated performance', async () => {
  const source = await readFile('src/components/Hero.astro', 'utf8');
  assert.match(source, /Turning Data Into/);
  assert.match(source, /Alpha\./);
  assert.doesNotMatch(source, /Sharpe Ratio|Annual Return|Max Drawdown|1\.87|24\.31/);
});

test('deployment workflow targets GitHub Pages', async () => {
  const source = await readFile('.github/workflows/deploy.yml', 'utf8');
  assert.match(source, /withastro\/action@v6/);
  assert.match(source, /actions\/deploy-pages/);
  assert.match(source, /pages: write/);
});

test('knowledge base exposes its content model and required surfaces', async () => {
  for (const file of knowledgeFiles) await access(file);

  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const knowledge = defineCollection/);
  for (const type of ['concept', 'paper', 'tool', 'topic']) {
    assert.ok(config.includes(`'${type}'`), `knowledge schema missing ${type} type`);
  }
  assert.match(config, /seed/);
  assert.match(config, /growing/);
  assert.match(config, /mature/);
});

test('knowledge base navigation and homepage integration are present', async () => {
  const header = await readFile('src/components/Header.astro', 'utf8');
  assert.ok(header.includes("['Knowledge', '/knowledge/']"));

  const home = await readFile('src/pages/index.astro', 'utf8');
  assert.match(home, /Knowledge Base/);
  assert.match(home, /Explore Knowledge/);
});

test('Obsidian knowledge graph is explicitly coming soon and is not a dead link', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(source, /Obsidian Knowledge Graph/);
  assert.match(source, /Coming Soon/);
  assert.doesNotMatch(source, /<a[^>]+href=[^>]*obsidian/i);
});

test('knowledge page derives counts instead of hard-coding invented corpus statistics', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.doesNotMatch(source, /184 Concepts|36 Papers|22 Tools|14 Research Topics/);
  assert.match(source, /entries\.filter|knowledge\.filter|domainCount|counts|length/);
});

test('reproduction workbench exposes its required surfaces', async () => {
  for (const file of reproductionFiles) await access(file);
});

test('reproduction collection models source, workflow, result, visibility, and scoring states', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /const reproductions = defineCollection/);
  for (const value of ['academic', 'broker']) assert.ok(config.includes(`'${value}'`), `missing source type ${value}`);
  for (const value of ['reading', 'data', 'implementation', 'validation', 'reproduction', 'extension']) assert.ok(config.includes(`'${value}'`), `missing stage ${value}`);
  for (const value of ['successful', 'partial', 'failed', 'inconclusive', 'extended']) assert.ok(config.includes(`'${value}'`), `missing result ${value}`);
  for (const value of ['public', 'partial', 'private']) assert.ok(config.includes(`'${value}'`), `missing code visibility ${value}`);
  for (const value of ['dataMatch', 'methodMatch', 'signalMatch', 'performanceMatch', 'robustness', 'reproducibility']) assert.match(config, new RegExp(value), `missing score dimension ${value}`);
});

test('knowledge base links to the reproduction workbench', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.match(source, /knowledge\/reproductions\//);
  assert.match(source, /Reproductions|Reproduction/);
});

test('reproduction workbench separates academic papers and broker reports and exposes all filters', async () => {
  const source = await readFile('src/pages/knowledge/reproductions/index.astro', 'utf8');
  assert.match(source, /Academic Papers/);
  assert.match(source, /Broker Reports/);
  assert.match(source, /source type|Source Type/i);
  assert.match(source, /research area|Research Area/i);
  assert.match(source, /stage/i);
  assert.match(source, /result/i);
  assert.match(source, /code visibility|Code Visibility/i);
});

test('reproduction workbench provides a truthful empty state and no fabricated performance examples', async () => {
  const source = await readFile('src/pages/knowledge/reproductions/index.astro', 'utf8');
  assert.match(source, /Reproduction library initialized\. Research records will appear as reproductions are completed\./);
  assert.doesNotMatch(source, /0\.054|0\.049|1\.82|1\.61|4\.33|Sharpe\s+[0-9]|Rank IC\s+[0-9]/i);
});

test('reproduction detail route guards optional artifacts instead of emitting dead links', async () => {
  const source = await readFile('src/pages/knowledge/reproductions/[...id].astro', 'utf8');
  assert.match(source, /reportHtmlPath/);
  assert.match(source, /codeVisibility/);
  assert.match(source, /Implementation Private/);
  assert.match(source, /metrics/);
  assert.match(source, /relatedKnowledge/);
  assert.match(source, /relatedNotes/);
  assert.match(source, /relatedProjects/);
});
