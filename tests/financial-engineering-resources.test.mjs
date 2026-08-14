import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const financialEngineeringResourceFiles = [
  'src/content/knowledge/topics/financial-engineering-learning-resources.md',
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

const approvedSourceUrls = [
  'https://www.wqu.edu/adsl',
  'https://www.wqu.edu/deep-learning-lab',
  'https://www.wqu.edu/ai-lab-computer-vision',
  'https://www.quantstart.com/articles/',
  'https://www.mlfactor.com/python.html',
  'https://www.shichuan.info/teaching/DDA3600',
  'https://www.aqr.com/Insights',
  'https://github.com/BlackArbsCEO/Adv_Fin_ML_Exercises',
  'https://christophm.github.io/interpretable-ml-book/',
  'https://github.com/QuantConnect/Lean',
  'https://www.abfr-forum.org/',
];

test('financial engineering resource cluster exposes the approved ten knowledge entries', async () => {
  for (const file of financialEngineeringResourceFiles) await access(file);
  const hub = await readFile(financialEngineeringResourceFiles[0], 'utf8');
  for (const slug of childSlugs) assert.ok(hub.includes(`- ${slug}`), `hub missing related slug ${slug}`);
});

test('financial engineering resources preserve the source learning path and WQU grouping', async () => {
  const hub = await readFile('src/content/knowledge/topics/financial-engineering-learning-resources.md', 'utf8');
  for (const label of ['Core Skills', 'Factor Investing', 'Advanced Concepts', 'Systems', 'Stay Current']) {
    assert.match(hub, new RegExp(label));
  }

  const wqu = await readFile('src/content/knowledge/tools/worldquant-university.md', 'utf8');
  for (const course of ['Applied Data Science Lab', 'Deep Learning Fundamentals Lab', 'Applied AI Lab: Deep Learning for Computer Vision']) {
    assert.match(wqu, new RegExp(course));
  }
});

test('financial engineering resources use all approved source URLs and do not publish the source PDF', async () => {
  const corpus = (await Promise.all(financialEngineeringResourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  for (const url of approvedSourceUrls) assert.ok(corpus.includes(url), `missing approved source URL ${url}`);
  assert.doesNotMatch(corpus, /FE_Good_Online_Resources\.pdf|public\/.*\.pdf/i);
});
