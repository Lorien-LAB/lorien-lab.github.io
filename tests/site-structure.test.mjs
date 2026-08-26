import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const requiredFiles = [
  'src/pages/index.astro',
  'src/pages/research-projects/index.astro',
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
  'src/pages/projects/reproductions/index.astro',
  'src/pages/projects/reproductions/[...id].astro',
  'src/components/ReproductionCard.astro',
  'src/components/ReproductionPipeline.astro',
  'src/components/ReproductionScore.astro',
];

const legacyReproductionPages = [
  'src/pages/knowledge/reproductions/index.astro',
  'src/pages/knowledge/reproductions/[...id].astro',
];

test('portfolio exposes every required v1 surface', async () => {
  for (const file of requiredFiles) await access(file);
});

test('header contains the complete portfolio navigation with one merged research and projects entry', async () => {
  const source = await readFile('src/components/Header.astro', 'utf8');
  for (const label of ['Home', 'Research & Projects', 'Knowledge', 'Notes', 'CV', 'About']) {
    assert.ok(source.includes(`['${label}',`) || source.includes(`>${label}<`), `missing ${label} navigation item`);
  }
  assert.ok(!source.includes("['Research', '/research/']"));
  assert.ok(!source.includes("['Projects', '/projects/']"));
  assert.match(source, /研究与项目/);
});

test('homepage positions the site around quantitative research without fabricated performance', async () => {
  const source = await readFile('src/components/Hero.astro', 'utf8');
  assert.match(source, /Turning Data Into/);
  assert.match(source, /Alpha\./);
  assert.doesNotMatch(source, /Sharpe Ratio|Annual Return|Max Drawdown|1\.87|24\.31/);
  assert.match(source, /research-projects\//);
  assert.match(source, /cv\//);
  assert.doesNotMatch(source, /hero-visual|signal-chart|research-panel|class="bars"|hero-grid-bg|hero-meta/);
});

test('homepage keeps the research portfolio compact and removes redundant closing promos', async () => {
  const source = await readFile('src/pages/index.astro', 'utf8');
  assert.doesNotMatch(source, /focus-section|contact-strip|Current Focus/);
});

test('portfolio cards prioritize research content over decorative filler', async () => {
  const projectCard = await readFile('src/components/ProjectCard.astro', 'utf8');
  const researchCard = await readFile('src/components/ResearchCard.astro', 'utf8');
  const knowledgeCard = await readFile('src/components/KnowledgeCard.astro', 'utf8');

  assert.doesNotMatch(projectCard, /project-visual/);
  for (const source of [projectCard, researchCard, knowledgeCard]) assert.match(source, /tags\.slice\(0, 3\)/);
});

test('global density adjustments are scoped to desktop viewports', async () => {
  const source = await readFile('src/styles/global.css', 'utf8');
  const desktopRules = source.match(/@media \(min-width: 901px\) \{([\s\S]*?)\n\}/)?.[1] ?? '';

  assert.match(desktopRules, /\.section \{ padding: 48px 0; \}/);
  assert.match(desktopRules, /\.page-hero h1/);
  assert.match(source, /^\.section \{ padding: 58px 0; \}$/m);
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

test('knowledge landing presents real library content without decorative graph placeholders', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.doesNotMatch(source, /Obsidian Knowledge Graph|Coming Soon|network-grid|obsidian-preview|obsidian-section/);
  assert.match(source, /count > 0|filter\(\(\[, count\]\) => count > 0\)/);
});

test('knowledge page derives counts instead of hard-coding invented corpus statistics', async () => {
  const source = await readFile('src/pages/knowledge/index.astro', 'utf8');
  assert.doesNotMatch(source, /184 Concepts|36 Papers|22 Tools|14 Research Topics/);
  assert.match(source, /entries\.filter|knowledge\.filter|domainCount|counts|length/);
});

test('knowledge landing keeps learning resources and no longer owns reproductions', async () => {
  await access('src/components/LearningResourcesGateway.astro');
  const gateway = await readFile('src/components/LearningResourcesGateway.astro', 'utf8');
  const page = await readFile('src/pages/knowledge/index.astro', 'utf8');

  for (const text of [
    'Financial Engineering Learning Resources',
    'Prof. Chuan Shi',
    '石川教授',
    'https://www.shichuan.info/',
    'Core Skills',
    'Factor Investing',
    'Advanced Concepts',
    'Systems',
    'Stay Current',
    'Explore learning resources',
  ]) assert.ok(gateway.includes(text), `gateway missing ${text}`);

  assert.match(page, /import LearningResourcesGateway/);
  assert.match(page, /knowledge\/financial-engineering-learning-resources\//);
  assert.match(page, /<LearningResourcesGateway/);
  assert.doesNotMatch(page, /import ReproductionGateway/);
  assert.doesNotMatch(page, /<ReproductionGateway/);
  assert.match(page, /entries\.map/);
});

test('research and projects landing is the first-class reproduction gateway', async () => {
  const page = await readFile('src/pages/research-projects/index.astro', 'utf8');
  assert.match(page, /import ReproductionGateway/);
  assert.match(page, /projects\/reproductions\//);
  assert.match(page, /<ReproductionGateway/);
  assert.match(page, /ProjectCard/);
  assert.match(page, /ResearchCard/);
  assert.doesNotMatch(page, /portfolio-index/);
});

test('reproduction workbench canonical route files live under projects only', async () => {
  for (const file of reproductionFiles) await access(file);
  for (const file of legacyReproductionPages) {
    await assert.rejects(() => access(file), { code: 'ENOENT' }, `legacy active route should be removed: ${file}`);
  }
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

test('reproduction cards and detail navigation use projects canonical URLs', async () => {
  const card = await readFile('src/components/ReproductionCard.astro', 'utf8');
  const detail = await readFile('src/pages/projects/reproductions/[...id].astro', 'utf8');
  assert.match(card, /projects\/reproductions\/\$\{slug\}\//);
  assert.doesNotMatch(card, /knowledge\/reproductions\/\$\{slug\}/);
  assert.match(detail, /projects\/reproductions\//);
  assert.doesNotMatch(detail, /knowledge\/reproductions\//);
});

test('Astro redirects preserve legacy portfolio landing and knowledge reproduction URLs', async () => {
  const config = await readFile('astro.config.mjs', 'utf8');
  assert.match(config, /redirects\s*:/);
  assert.match(config, /['"]\/research['"]\s*:\s*['"]\/research-projects['"]/);
  assert.match(config, /['"]\/projects['"]\s*:\s*['"]\/research-projects['"]/);
  assert.match(config, /['"]\/knowledge\/reproductions['"]\s*:\s*['"]\/projects\/reproductions['"]/);
  assert.match(config, /['"]\/knowledge\/reproductions\/\[\.\.\.id\]['"]\s*:\s*['"]\/projects\/reproductions\/\[\.\.\.id\]['"]/);
  assert.match(config, /output:\s*'static'/);
});

test('current README documents projects as the reproduction canonical namespace', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.match(readme, /Projects/);
  assert.match(readme, /Website record:\s+\/projects\/reproductions\/<slug>\//);
  assert.doesNotMatch(readme, /Website record:\s+\/knowledge\/reproductions\/<slug>\//);
});

test('reproduction workbench separates academic papers and broker reports and exposes all filters', async () => {
  const source = await readFile('src/pages/projects/reproductions/index.astro', 'utf8');
  assert.match(source, /Academic Papers/);
  assert.match(source, /Broker Reports/);
  assert.match(source, /source type|Source Type/i);
  assert.match(source, /research area|Research Area/i);
  assert.match(source, /stage/i);
  assert.match(source, /result/i);
  assert.match(source, /code visibility|Code Visibility/i);
});

test('reproduction workbench provides a truthful empty state and no fabricated performance examples', async () => {
  const source = await readFile('src/pages/projects/reproductions/index.astro', 'utf8');
  assert.match(source, /Reproduction library initialized\./);
  assert.match(source, /Research records will appear as reproductions are completed\./);
  assert.doesNotMatch(source, /0\.054|0\.049|1\.82|1\.61|4\.33|Sharpe\s+[0-9]|Rank IC\s+[0-9]/i);
});

test('reproduction detail route guards optional artifacts instead of emitting dead links', async () => {
  const source = await readFile('src/pages/projects/reproductions/[...id].astro', 'utf8');
  assert.match(source, /reportHtmlPath/);
  assert.match(source, /codeVisibility/);
  assert.match(source, /Implementation Private/);
  assert.match(source, /metrics/);
  assert.match(source, /relatedKnowledge/);
  assert.match(source, /relatedNotes/);
  assert.match(source, /relatedProjects/);
});
