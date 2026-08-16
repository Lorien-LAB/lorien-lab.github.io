import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { validateSourceTopicMap } from '../src/lib/quantInterviewTopics.mjs';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const tocPaths = {
  'green-book': 'src/data/quant-interview/toc/green-book.json',
  'red-book': 'src/data/quant-interview/toc/red-book.json',
  '150-most-frequently-asked': 'src/data/quant-interview/toc/150-most-frequently-asked.json',
};
const tocBySource = Object.fromEntries(await Promise.all(Object.entries(tocPaths).map(async ([source, path]) => [source, await readJson(path)])));
const taxonomy = await readJson('src/data/quant-interview/topics/taxonomy.json');

// The old Green TOC seed omitted one visible TOC item. Keep source-file-verified state truthful.
const findNode = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
};
const green41 = findNode(tocBySource['green-book'].sections, '4.1');
if (!green41) throw new Error('Green 4.1 not found.');
green41.children ??= [];
if (!green41.children.some((node) => node.title === 'N points on a circle')) {
  green41.children.push({ id: '4.1.n-points-on-a-circle', title: 'N points on a circle', titleZh: '圆上的 N 个点', kind: 'problem-label' });
  await writeFile(tocPaths['green-book'], `${JSON.stringify(tocBySource['green-book'], null, 2)}\n`);
}

const E = (source, sourceSection, role, canonicalTopics = []) => ({ source, sourceSection, role, canonicalTopics });
const TECH_TOPICS = [
  'logic-brainteasers-discrete-reasoning',
  'calculus-differential-equations',
  'linear-algebra-matrix-methods',
  'probability-statistics',
  'stochastic-processes-stochastic-calculus',
  'derivatives-options-no-arbitrage',
  'fixed-income-rates-general-finance',
  'monte-carlo-numerical-methods',
  'algorithms-data-structures-cpp',
];

function greenSectionTopics(id) {
  const exact = {
    '1.1':['interview-preparation'], '1.2':['interview-preparation'],
    '1.3':['reasoning-communication'], '1.4':['reasoning-communication'], '1.5':['reasoning-communication'],
    '2.1':['problem-simplification'], '2.2':['logical-deduction'], '2.3':['logical-deduction'],
    '2.4':['symmetry'], '2.5':['summation-combinatorial-puzzles'], '2.6':['pigeonhole-principle'],
    '2.7':['modular-arithmetic'], '2.8':['mathematical-induction'], '2.9':['proof-by-contradiction'],
    '3.1':['limits-derivatives'], '3.2':['integration'], '3.3':['multivariable-calculus'],
    '3.4':['taylor-newton-optimization'], '3.5':['ordinary-differential-equations'],
    '3.6.1':['vectors-linear-systems'], '3.6.2':['matrix-decompositions'],
    '3.6.3':['determinants-eigenvalues'], '3.6.4':['positive-semidefinite-matrices'], '3.6.5':['matrix-decompositions'],
    '4.1':['probability-foundations'], '4.2':['combinatorial-probability'], '4.3':['conditional-probability-bayes'],
    '4.4':['random-variables-distributions'], '4.5':['expectation-variance-covariance'], '4.6':['order-statistics-extremes'],
    '5.1':['random-walks-markov-chains'], '5.2':['martingales-stopping-times'], '5.3':['dynamic-programming-algorithms'],
    '5.4':['brownian-motion','ito-stochastic-calculus','stochastic-differential-equations'],
    '6.1':['no-arbitrage-option-properties','black-scholes'], '6.2':['option-greeks'], '6.3':['option-portfolios-exotics'],
    '6.4':['portfolio-risk','bonds-yields-discounting','duration-convexity','forwards-futures-swaps','interest-rate-models'],
    '7.1':['algorithmic-complexity','sorting-searching','data-structures'], '7.2':['algorithmic-complexity'],
    '7.3':['monte-carlo-simulation','root-finding-numerical-integration','finite-difference-methods'],
  };
  return exact[id];
}

function greenProblemTopics(node, parentId, inherited) {
  const title = node.title.toLowerCase();
  if (parentId === '6.4') {
    if (title.includes('portfolio') || title.includes('value at risk')) return ['portfolio-risk'];
    if (title.includes('duration') || title.includes('convexity')) return ['duration-convexity'];
    if (title.includes('forward') || title.includes('future')) return ['forwards-futures-swaps'];
    if (title.includes('interest rate')) return ['interest-rate-models'];
  }
  if (parentId === '7.1') {
    if (title.includes('sort') || title.includes('search')) return ['sorting-searching'];
    if (title.includes('fibonacci') || title.includes('maximum contiguous')) return ['dynamic-programming-algorithms'];
    if (title.includes('unique')) return ['data-structures'];
    return ['algorithmic-complexity'];
  }
  if (parentId === '7.3') {
    if (title.includes('monte carlo')) return ['monte-carlo-simulation'];
    if (title.includes('finite difference')) return ['finite-difference-methods'];
  }
  return inherited;
}

function classifyGreen(node, parentEntry, parentId) {
  if (['preface','bibliography','index'].includes(node.id)) return E('green-book', node.id, 'non-content');
  if (/^\d+$/.test(node.id) || ['3.6'].includes(node.id)) return E('green-book', node.id, 'container');
  const direct = greenSectionTopics(node.id);
  if (direct) return E('green-book', node.id, 'content', direct);
  if (node.kind === 'problem-label') {
    const inherited = parentEntry?.role === 'content' ? parentEntry.canonicalTopics : [];
    const topics = greenProblemTopics(node, parentId, inherited);
    if (!topics.length) throw new Error(`No Green problem topic inheritance for ${node.id}`);
    return E('green-book', node.id, 'content', topics);
  }
  if (parentEntry?.role === 'content') return E('green-book', node.id, 'content', parentEntry.canonicalTopics);
  if (node.children?.length) return E('green-book', node.id, 'container');
  throw new Error(`Unclassified Green TOC node ${node.id}: ${node.title}`);
}

function classifyRed(node) {
  const id = node.id;
  if (['bibliography','index'].includes(id)) return E('red-book', id, 'non-content');
  if (id === '1' || id === '2' || id === '3' || id === '6') return E('red-book', id, 'container');
  if (/^1\./.test(id)) {
    const topic = ['1.10','1.11'].includes(id) ? 'interview-preparation' : id === '1.12' ? 'reasoning-communication' : 'interview-process-formats';
    return E('red-book', id, 'content', [topic]);
  }
  if (id === '2.1') return E('red-book', id, 'content', ['derivatives-options-no-arbitrage']);
  if (id === '2.2' || id === '2.3') return E('red-book', id, 'container');
  const optionLeaf = id.match(/^2\.[23]\.([1-7])$/);
  if (optionLeaf) {
    const topics = {
      '1':['black-scholes'], '2':['no-arbitrage-option-properties'], '3':['replication-hedging'], '4':['option-greeks'],
      '5':['derivatives-options-no-arbitrage'], '6':['trees-monte-carlo-options'], '7':['incomplete-markets'],
    };
    return E('red-book', id, 'content', topics[optionLeaf[1]]);
  }
  if (id === '3.1') return E('red-book', id, 'content', ['probability-statistics']);
  if (id === '3.2' || id === '3.3') return E('red-book', id, 'container');
  if (/^3\.[23]\.1$/.test(id)) return E('red-book', id, 'content', ['probability-statistics']);
  if (/^3\.[23]\.2$/.test(id)) return E('red-book', id, 'content', ['stochastic-processes-stochastic-calculus']);
  if (id === '4') return E('red-book', id, 'content', ['bonds-yields-discounting','duration-convexity','forwards-futures-swaps','interest-rate-models']);
  if (/^4\./.test(id)) return E('red-book', id, 'container');
  if (id === '5') return E('red-book', id, 'content', ['monte-carlo-simulation','root-finding-numerical-integration','finite-difference-methods','algorithmic-complexity']);
  if (/^5\./.test(id)) return E('red-book', id, 'container');
  if (id === '6.1') return E('red-book', id, 'content', ['calculus-differential-equations']);
  if (id === '6.2' || id === '6.3') return E('red-book', id, 'container');
  if (/^6\.[23]\.1$/.test(id)) return E('red-book', id, 'content', ['calculus-differential-equations','linear-algebra-matrix-methods']);
  if (/^6\.[23]\.2$/.test(id)) return E('red-book', id, 'content', ['integration']);
  if (id === '7') return E('red-book', id, 'content', ['algorithms-data-structures-cpp','data-structures','cpp-language-memory','object-oriented-cpp']);
  if (/^7\./.test(id)) return E('red-book', id, 'container');
  if (id === '8') return E('red-book', id, 'content', ['logic-brainteasers-discrete-reasoning']);
  if (/^8\./.test(id)) return E('red-book', id, 'container');
  if (id === '9') return E('red-book', id, 'content', ['interview-strategy-communication']);
  if (id === '9.1') return E('red-book', id, 'container');
  if (id === '9.2') return E('red-book', id, 'content', ['soft-interview']);
  if (id === '9.3') return E('red-book', id, 'content', ['interview-preparation','fixed-income-rates-general-finance']);
  if (id === '10') return E('red-book', id, 'content', TECH_TOPICS);
  if (id === '10.1') return E('red-book', id, 'container');
  if (id === '10.2') return E('red-book', id, 'content', TECH_TOPICS);
  throw new Error(`Unclassified Red TOC node ${id}: ${node.title}`);
}

function classify150(node) {
  const id = node.id;
  if (id === 'preface' || id === 'bibliography') return E('150-most-frequently-asked', id, 'non-content');
  if (id === '1') return E('150-most-frequently-asked', id, 'content', TECH_TOPICS);
  if (id === '2' || id === '3') return E('150-most-frequently-asked', id, 'container');
  const leaf = id.match(/^[23]\.([1-7])$/);
  if (leaf) {
    const topics = {
      '1':['calculus-differential-equations'],
      '2':['linear-algebra-matrix-methods'],
      '3':['derivatives-options-no-arbitrage','fixed-income-rates-general-finance'],
      '4':['algorithms-data-structures-cpp'],
      '5':['monte-carlo-numerical-methods'],
      '6':['probability-statistics','stochastic-processes-stochastic-calculus'],
      '7':['logic-brainteasers-discrete-reasoning'],
    };
    return E('150-most-frequently-asked', id, 'content', topics[leaf[1]]);
  }
  throw new Error(`Unclassified 150 Questions TOC node ${id}: ${node.title}`);
}

const entries = [];
function walk(source, nodes, parentEntry = null, parentId = null) {
  for (const node of nodes) {
    const current = source === 'green-book'
      ? classifyGreen(node, parentEntry, parentId)
      : source === 'red-book'
        ? classifyRed(node)
        : classify150(node);
    entries.push(current);
    if (node.children) walk(source, node.children, current, node.id);
  }
}
for (const [source, toc] of Object.entries(tocBySource)) walk(source, toc.sections);

const map = { version: 1, entries };
validateSourceTopicMap(map, taxonomy, tocBySource);
await mkdir('src/data/quant-interview/topics', { recursive: true });
await writeFile('src/data/quant-interview/topics/source-topic-map.json', `${JSON.stringify(map, null, 2)}\n`);
console.log(`Generated ${entries.length} source-topic entries.`);
