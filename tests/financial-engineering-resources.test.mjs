import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const hubFile = 'src/content/knowledge/topics/financial-engineering-learning-resources.md';

const financialEngineeringResourceFiles = [
  hubFile,
  'src/content/knowledge/tools/worldquant-university.md',
  'src/content/knowledge/tools/quantstart.md',
  'src/content/knowledge/topics/machine-learning-for-factor-investing.md',
  'src/content/knowledge/tools/dda3600-factor-investing-course-materials.md',
  'src/content/knowledge/tools/aqr-insights.md',
  'src/content/knowledge/topics/advances-in-financial-machine-learning.md',
  'src/content/knowledge/topics/interpretable-machine-learning.md',
  'src/content/knowledge/tools/quantconnect-lean.md',
  'src/content/knowledge/tools/ai-big-data-finance-research-forum.md',
];

const childSlugs = [
  'worldquant-university',
  'quantstart',
  'machine-learning-for-factor-investing',
  'dda3600-factor-investing-course-materials',
  'aqr-insights',
  'advances-in-financial-machine-learning',
  'interpretable-machine-learning',
  'quantconnect-lean',
  'ai-big-data-finance-research-forum',
];

const officialUrls = new Map([
  ['src/content/knowledge/tools/worldquant-university.md', 'https://www.wqu.edu/'],
  ['src/content/knowledge/tools/quantstart.md', 'https://www.quantstart.com/articles/'],
  ['src/content/knowledge/topics/machine-learning-for-factor-investing.md', 'https://www.mlfactor.com/'],
  ['src/content/knowledge/tools/dda3600-factor-investing-course-materials.md', 'https://www.shichuan.info/teaching/DDA3600'],
  ['src/content/knowledge/tools/aqr-insights.md', 'https://www.aqr.com/Insights'],
  ['src/content/knowledge/topics/advances-in-financial-machine-learning.md', 'https://uat.store.wiley.com/en-us/advances-in-financial-machine-learning-p-9781119482086'],
  ['src/content/knowledge/topics/interpretable-machine-learning.md', 'https://christophm.github.io/interpretable-ml-book/'],
  ['src/content/knowledge/tools/quantconnect-lean.md', 'https://github.com/QuantConnect/Lean'],
  ['src/content/knowledge/tools/ai-big-data-finance-research-forum.md', 'https://www.abfr-forum.org/'],
]);

test('financial engineering resource cluster exposes the approved ten knowledge entries', async () => {
  for (const file of financialEngineeringResourceFiles) await access(file);
  const hub = await readFile(hubFile, 'utf8');
  for (const slug of childSlugs) assert.ok(hub.includes(`- ${slug}`), `hub missing related slug ${slug}`);
});

test('financial engineering hub prominently attributes Prof. Chuan Shi and links every child entry', async () => {
  const hub = await readFile(hubFile, 'utf8');
  for (const phrase of ['Source acknowledgement', 'Prof. Chuan Shi', '石川教授', 'adapted from', 'https://www.shichuan.info/']) {
    assert.ok(hub.includes(phrase), `hub missing attribution element: ${phrase}`);
  }
  for (const slug of childSlugs) {
    assert.ok(hub.includes(`/knowledge/${slug}/`), `hub missing internal Knowledge link for ${slug}`);
  }
});

test('financial engineering resources preserve the source learning path and WQU grouping', async () => {
  const hub = await readFile(hubFile, 'utf8');
  for (const label of ['Core Skills', 'Factor Investing', 'Advanced Concepts', 'Systems', 'Stay Current']) {
    assert.match(hub, new RegExp(label));
  }

  const wqu = await readFile('src/content/knowledge/tools/worldquant-university.md', 'utf8');
  for (const course of ['Applied Data Science Lab', 'Deep Learning Fundamentals Lab', 'Applied AI Lab: Deep Learning for Computer Vision', 'Computer Vision Lab']) {
    assert.match(wqu, new RegExp(course));
  }
  for (const url of [
    'https://www.wqu.edu/data-science-lab',
    'https://www.wqu.edu/deep-learning-lab',
    'https://www.wqu.edu/computer-vision-lab',
  ]) {
    assert.ok(wqu.includes(url), `WQU entry missing current official URL ${url}`);
  }
});

test('every child resource exposes its canonical official URL', async () => {
  for (const [file, url] of officialUrls) {
    const source = await readFile(file, 'utf8');
    assert.ok(source.includes(`officialUrl: ${url}`), `${file} missing officialUrl ${url}`);
  }
});

test('supplementary resources remain distinct from canonical official links', async () => {
  const mlfactor = await readFile('src/content/knowledge/topics/machine-learning-for-factor-investing.md', 'utf8');
  assert.ok(mlfactor.includes('officialUrl: https://www.mlfactor.com/'));
  assert.ok(mlfactor.includes('https://www.mlfactor.com/python.html'));
  assert.match(mlfactor, /Supplementary/i);

  const afml = await readFile('src/content/knowledge/topics/advances-in-financial-machine-learning.md', 'utf8');
  assert.ok(afml.includes('officialUrl: https://uat.store.wiley.com/en-us/advances-in-financial-machine-learning-p-9781119482086'));
  assert.ok(afml.includes('https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises'));
  assert.match(afml, /Supplementary/i);
});

test('knowledge schema and detail route support official-link semantics without duplicate URLs', async () => {
  const config = await readFile('src/content.config.ts', 'utf8');
  assert.match(config, /officialUrl:\s*z\.string\(\)\.url\(\)\.optional\(\)/);

  const route = await readFile('src/pages/knowledge/[...id].astro', 'utf8');
  assert.match(route, /officialUrl/);
  assert.match(route, /Official Website/);
  assert.match(route, /Official Resource/);
  assert.match(route, /Set<string>|new Set/);
});

test('financial engineering resources do not publish the uploaded source PDF', async () => {
  const corpus = (await Promise.all(financialEngineeringResourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  assert.doesNotMatch(corpus, /FE_Good_Online_Resources\.pdf|public\/.*FE_Good_Online_Resources.*\.pdf/i);
});
