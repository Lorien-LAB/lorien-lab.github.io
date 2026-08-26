import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = async (file) => (await readFile(file, 'utf8')).replace(/\r\n?/g, '\n');
const topics = ['stochastic-processes-stochastic-calculus', 'random-walks-markov-chains'];
const sourceLeak = /Green Book|Red Book|150 (?:Most|Questions)|(?:source|PDF)\s+(?:page|section|item)|\b(?:5\.1(?:\.[a-z-]+)?|3\.2\.[12]|3\.(?:22|23|40))\b/i;

function parseInlineArray(text, field) {
  const match = text.match(new RegExp(`^${field}:\\s*\\[([^\\]]*)\\]$`, 'm'));
  assert.ok(match, `missing inline ${field}`);
  return match[1].split(',').map((item) => item.trim()).filter(Boolean);
}

function assertExactLineArray(text, field, expected) {
  assert.deepEqual(parseInlineArray(text, field), expected, `${field} is not exact`);
}

function assertSourceNeutral(text, slug) {
  assert.doesNotMatch(text, sourceLeak, `${slug} exposes audited-source identity`);
  assert.doesNotMatch(text, /^source(?:Section|Item|Page|Reference|Url)?:/mi, `${slug} exposes provenance frontmatter`);
}

function assertNoUnprotectedTeX(text, slug) {
  const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  assert.ok(frontmatter, `${slug} missing frontmatter boundary`);
  const body = text.slice(frontmatter[0].length);
  const protectedMath = [
    ...[...body.matchAll(/\\\[([\s\S]*?)\\\]/g)].map((match) => match[1]),
    ...[...body.matchAll(/\$((?:\\.|[^$\\])*)\$/g)].map((match) => match[1]),
  ];
  const prose = body
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\$(?:\\.|[^$\\])*\$/g, '');
  assert.doesNotMatch(prose, /\\[A-Za-z]+/, `${slug} contains raw TeX command outside math delimiters`);
  assert.doesNotMatch(
    prose,
    /[\p{L}\p{N})\]}](?:_(?:\{[^}\n]+\}|[\p{L}\p{N}])|\^(?:\{[^}\n]+\}|[+\-\p{L}\p{N}]))/u,
    `${slug} contains raw TeX subscript or superscript outside math delimiters`,
  );
  for (const math of protectedMath) {
    assert.doesNotMatch(math, /\\[A-Za-z]+/, `${slug} contains a TeX command that the Markdown renderer would leak`);
    assert.doesNotMatch(math, /(?<!\\)_/, `${slug} contains an unescaped subscript that Markdown could parse as emphasis`);
  }
}

test('finite-state Markov chains Knowledge freezes the finite-chain theory contract', async () => {
  const text = await read('src/content/knowledge/concepts/finite-state-markov-chains.md');
  assert.match(text, /^title: Finite-State Markov Chains$/m);
  assert.match(text, /^category: Probability$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'related', [
    'conditioning',
    'conditional-expectation-tower-property',
    'first-step-analysis',
    'markov-chain-state-compression',
  ]);
  assert.match(text, /Markov property/i);
  assert.match(text, /homogeneous/i);
  assert.match(text, /row-vector convention/i);
  assert.match(text, /P(?:\\)?_?\{?ij\}?.*(?:>=|≥|\\ge).*0/i);
  assert.match(text, /each row.*(?:one|1)/i);
  assert.match(text, /(?:μ|mu)(?:\\)?_?\{?t\+1\}?.*(?:μ|mu)(?:\\)?_?\{?t\}?.*P/i);
  assert.match(text, /(?:μ|mu)(?:\\)?_?\{?t\}?.*(?:μ|mu)(?:\\)?_?\{?0\}?.*P\^?\{?t\}?/i);
  assert.match(text, /Chapman.*Kolmogorov/i);
  assert.match(text, /P\^?\{?r\+s\}?.*P\^?\{?r\}?.*P\^?\{?s\}?/i);
  for (const term of ['reachability', 'communicate', 'closed class', 'absorbing state']) assert.match(text, new RegExp(term, 'i'));
  assert.match(text, /(?:π|pi).*=.*(?:π|pi).*P/i);
  assert.match(text, /finite irreducible chain.*unique stationary/i);
  assert.match(text, /aperiodicity.*convergence|convergence.*aperiodicity/i);
  assert.match(text, /not required.*uniqueness|uniqueness.*not require/i);
  assert.match(text, /h(?:\\)?_i.*(?:sum|∑).*P(?:\\)?_?\{?ij\}?.*h(?:\\)?_j/i);
  assert.match(text, /boundary values.*terminal states|terminal states.*boundary values/i);
  assert.match(text, /t(?:\\)?_i.*1.*(?:sum|∑).*P(?:\\)?_?\{?ij\}?.*t(?:\\)?_j/i);
  assert.match(text, /T(?:\\)?_i\^?\+.*(?:t.*(?:>=|≥).*1|starts? at time one)/i);
  assert.match(text, /E(?:\\)?_i.*T(?:\\)?_i\^?\+.*1.*(?:π|pi)(?:\\)?_i/i);
  assert.match(text, /multiple closed classes.*nonunique|nonunique.*multiple closed classes/i);
  assert.match(text, /hitting expectation.*infinite|infinite.*hitting expectation/i);
  assert.match(text, /^## Interview Checks$/m);
  for (const check of ['matrix orientation', 'stationary versus limiting', 'periodicity', 'boundary equations', 'positive return']) {
    assert.match(text, new RegExp(check, 'i'));
  }
  assert.match(text, /martingale/i);
  assert.match(text, /Brownian/i);
  assert.match(text, /It(?:ô|o)/i);
  assert.match(text, /continuous-time/i);
  assertSourceNeutral(text, 'finite-state-markov-chains');
  assertNoUnprotectedTeX(text, 'finite-state-markov-chains');
});

test('state-compression Knowledge preserves transitions and target behavior', async () => {
  const text = await read('src/content/knowledge/concepts/markov-chain-state-compression.md');
  assert.match(text, /^title: State Compression for Markov Chains$/m);
  assert.match(text, /^category: Problem Solving Techniques$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'related', [
    'finite-state-markov-chains',
    'first-step-analysis',
    'recursion-problem-solving',
  ]);
  assert.match(text, /next-state law/i);
  assert.match(text, /target event/i);
  assert.match(text, /trailing streak/i);
  assert.match(text, /longest current suffix.*prefix|longest suffix.*target prefix/i);
  assert.match(text, /mismatch.*longest.*viable suffix|fallback.*longest.*suffix/i);
  assert.match(text, /not.*empty state|rather than.*empty/i);
  assert.match(text, /Hamming distance/i);
  assert.match(text, /simple symmetric cube walk/i);
  assert.match(text, /no self-loops/i);
  assert.match(text, /neighboring vertices.*equal probability.*1\s*\/\s*d/is);
  assert.match(text, /strong lumpability/i);
  assert.match(text, /total transition probability.*every aggregate block/i);
  assert.match(text, /terminal.*success.*failure.*preserv|target status.*preserv/i);
  assert.match(text, /number of colors.*not.*sufficient|not.*sufficient.*number of colors/i);
  assert.match(text, /color-class sizes/i);
  assert.match(text, /backward active-lineage count/i);
  assert.match(text, /complete graph/i);
  assert.match(text, /all initial colors (?:are )?distinct/i);
  assert.match(text, /ordered pair.*distinct vertices.*(?:chosen|selected) uniformly/is);
  assert.match(text, /second vertex.*copies.*first vertex.*color/i);
  assert.match(text, /^## Interview Checks$/m);
  for (const check of ['valid compression', 'suffix fallback', 'symmetry', 'target preservation']) {
    assert.match(text, new RegExp(check, 'i'));
  }
  assertSourceNeutral(text, 'markov-chain-state-compression');
  assertNoUnprotectedTeX(text, 'markov-chain-state-compression');
});

function assertS3(text, id, relatedProblems) {
  assert.match(text, new RegExp(`^problemId:\\s*${id}$`, 'm'));
  assert.match(text, /^category: Stochastic Processes$/m);
  assertExactLineArray(text, 'quantInterviewTopics', topics);
  assertExactLineArray(text, 'concepts', ['finite-state-markov-chains']);
  assertExactLineArray(text, 'techniques', ['markov-chain-state-compression', 'first-step-analysis']);
  assertExactLineArray(text, 'relatedProblems', relatedProblems);
  assert.match(text, /^status: solved$/m);
  for (const heading of [
    '## Problem',
    '## Think Before Revealing',
    '## Solution',
    '## Why This Matters',
    '## Common Mistakes',
    '## Extensions',
  ]) assert.ok(text.includes(heading), `${id} missing ${heading}`);
  assert.ok((text.match(/<details>/g) ?? []).length >= 3, `${id} needs two hints and a solution disclosure`);
  assert.match(text, /<summary>Hint 1<\/summary>/);
  assert.match(text, /<summary>Hint 2<\/summary>/);
  const revealed = text.match(/<details>\s*<summary>Show Solution<\/summary>\s*([\s\S]*?)<\/details>/i);
  assert.ok(revealed, `${id} needs a Show Solution disclosure`);
  for (const heading of ['## Solution', '## Why This Matters', '## Common Mistakes', '## Extensions']) {
    assert.ok(revealed[1].includes(heading), `${id} must keep ${heading} inside Show Solution`);
  }
  const countWords = (value) => value.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  const between = (start, end) => {
    const from = text.indexOf(start);
    assert.notEqual(from, -1, `${id} missing ${start}`);
    const to = text.indexOf(end, from + start.length);
    assert.notEqual(to, -1, `${id} missing boundary ${end}`);
    return text.slice(from + start.length, to);
  };
  assert.ok(countWords(between('## Problem', '## Think Before Revealing')) >= 25, `${id} Problem is too shallow`);
  assert.ok(countWords(between('## Think Before Revealing', '<details>\n<summary>Show Solution')) >= 55, `${id} reasoning and hints are too shallow`);
  assert.ok(countWords(revealed[1]) >= 300, `${id} revealed derivation is too shallow`);
  assert.ok(countWords(between('## Why This Matters', '## Common Mistakes')) >= 35, `${id} Why This Matters is too shallow`);
  assert.ok((between('## Common Mistakes', '## Extensions').match(/^- /gm) ?? []).length >= 4, `${id} needs four concrete mistakes`);
  assert.ok((between('## Extensions', '</details>').match(/^\d+\. /gm) ?? []).length >= 2, `${id} needs two concrete extensions`);
  assertSourceNeutral(text, id);
}

test('twelve before consecutive sevens uses the exact two-state first-step system', async () => {
  const text = await read('src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md');
  assertS3(text, 'random-walks-markov-chains-001', [
    'coin-pattern-hitting-times',
    'recursive-dice-game-expected-payoff',
  ]);
  assert.match(text, /independent.*fair.*six-sided dice/i);
  assert.ok(text.includes('x = 1/36 + (29/36)x + (1/6)y'));
  assert.ok(text.includes('y = 1/36 + (29/36)x'));
  assert.ok(text.includes('x = 7/13'));
  assert.match(text, /initial state.*x/i);
  assert.match(text, /non-seven.*non-twelve.*reset|reset.*seven streak/i);
  assert.match(text, /almost surely/i);
  assert.match(text, /single-step competing hazards|not.*competing hazards/i);
});

test('coin pattern Problem freezes both waiting systems, race, and response table', async () => {
  const text = await read('src/content/problems/stochastic-processes/coin-pattern-hitting-times.md');
  assertS3(text, 'random-walks-markov-chains-002', [
    'twelve-before-consecutive-sevens',
    'expected-pattern-count-by-indicators',
    'no-consecutive-heads-in-n-tosses',
  ]);
  for (const state of ['`""`', '`H`', '`HH`', '`T`', '`TH`']) assert.ok(text.includes(state), `missing suffix state ${state}`);
  for (const equation of [
    'E_0 = 1 + (1/2)E_1 + (1/2)E_0',
    'E_1 = 1 + (1/2)E_2 + (1/2)E_0',
    'E_2 = 1 + (1/2)0 + (1/2)E_0',
    'F_0 = 1 + (1/2)F_0 + (1/2)F_1',
    'F_1 = 1 + (1/2)F_2 + (1/2)F_1',
    'F_2 = 1 + (1/2)0 + (1/2)F_1',
  ]) assert.ok(text.includes(equation), `missing first-step equation ${equation}`);
  assert.ok(text.includes('E[waiting time for HHH] = 14'));
  assert.ok(text.includes('E[waiting time for THH] = 8'));
  assert.match(text, /tail from (?:state )?`T`.*stays.*`T`/i);
  assert.ok(text.includes('P(HHH appears before THH) = 1/8'));
  assert.match(text, /first three flips.*all heads/i);
  assert.match(text, /complement\(b\)ab/i);
  const responseRows = [
    ['HHH', 'THH', '7/8'],
    ['HHT', 'THH', '3/4'],
    ['HTH', 'HHT', '2/3'],
    ['HTT', 'HHT', '2/3'],
    ['THH', 'TTH', '2/3'],
    ['THT', 'TTH', '2/3'],
    ['TTH', 'HTT', '3/4'],
    ['TTT', 'HTT', '7/8'],
  ];
  for (const row of responseRows) assert.ok(text.includes(`| \`${row[0]}\` | \`${row[1]}\` | \`${row[2]}\` |`), `missing response row ${row.join(' ')}`);
  assert.match(text, /at least `?2\/3`?/i);
  assert.match(text, /first-hitting.*fixed-horizon|fixed-horizon.*first-hitting/i);
  assert.match(text, /overlapping.*not independent|not independent.*overlapping/i);
});

const exactNewContent = [
  'src/content/knowledge/concepts/finite-state-markov-chains.md',
  'src/content/knowledge/concepts/markov-chain-state-compression.md',
  'src/content/problems/stochastic-processes/twelve-before-consecutive-sevens.md',
  'src/content/problems/stochastic-processes/coin-pattern-hitting-times.md',
  'src/content/problems/stochastic-processes/random-recoloring-consensus-time.md',
  'src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md',
];

test('candidate module exposes the exact six public paths and four Problem ids', async () => {
  const texts = await Promise.all(exactNewContent.map(read));
  assert.equal(texts.length, 6);
  const ids = texts.map((text) => text.match(/^problemId:\s*(.+)$/m)?.[1]).filter(Boolean);
  assert.deepEqual(ids, [
    'random-walks-markov-chains-001',
    'random-walks-markov-chains-002',
    'random-walks-markov-chains-003',
    'random-walks-markov-chains-004',
  ]);
  for (const [index, text] of texts.entries()) {
    assertExactLineArray(text, 'quantInterviewTopics', topics);
    assertSourceNeutral(text, exactNewContent[index]);
  }
});

test('ordered-pair recoloring uses backward lineage coalescence', async () => {
  const text = await read('src/content/problems/stochastic-processes/random-recoloring-consensus-time.md');
  assertS3(text, 'random-walks-markov-chains-003', []);
  assert.match(text, /n labeled balls.*n distinct colors/i);
  assert.match(text, /ordered pairs.*distinct balls|n\(n-1\).*ordered/i);
  assert.match(text, /first ball.*second ball.*color/i);
  assert.match(text, /same-colored.*counts|every update counts/i);
  assert.ok(text.includes('k(k-1) / (n(n-1))'));
  assert.ok(text.includes('n(n-1) / (k(k-1))'));
  assert.ok(text.includes('E[T] = sum_(k=2)^n n(n-1)/(k(k-1)) = (n-1)^2'));
  assert.match(text, /n\s*=\s*1.*zero steps/i);
  assert.match(text, /forward.*number of colors.*insufficient|number of colors.*not.*sufficient/i);
  assert.match(text, /distinct initial colors.*(?:needed|required)|ancestry equivalence.*distinct/i);
  assert.match(text, /with replacement.*n\(n-1\)/i);
});

test('cube Problem distinguishes positive return and gives both exact methods', async () => {
  const text = await read('src/content/problems/stochastic-processes/random-walk-return-time-on-cube.md');
  assertS3(text, 'random-walks-markov-chains-004', ['random-walk-boundary']);
  assert.match(text, /eight cube vertices/i);
  assert.match(text, /three neighbors.*uniform|uniformly.*three neighbors/i);
  assert.ok(text.includes('T_v^+ = min{t >= 1 : X_t = v}'));
  assert.match(text, /ordinary hitting time.*zero/i);
  assert.match(text, /connected.*3-regular|3-regular.*connected/i);
  assert.match(text, /uniform.*eight vertices/i);
  assert.ok(text.includes('E_v[T_v^+] = 1/pi_v = 8'));
  assert.match(text, /bipartite.*periodic/i);
  assert.match(text, /periodicity.*does not invalidate|does not invalidate.*periodic/i);
  assert.ok(text.includes('E_1 = 1 + (2/3)E_2'));
  assert.ok(text.includes('E_2 = 1 + (2/3)E_1 + (1/3)E_3'));
  assert.ok(text.includes('E_3 = 1 + E_2'));
  assert.ok(text.includes('E_1 = 7'));
  assert.ok(text.includes('E_v[T_v^+] = 1 + E_1 = 8'));
});
