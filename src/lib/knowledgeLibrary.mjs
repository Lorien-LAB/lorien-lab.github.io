import { domainLabelsZh } from '../data/i18n/knowledgeUi.mjs';

export function getKnowledgeDomains(entries) {
  const counts = new Map();
  for (const { data } of entries) counts.set(data.domain, (counts.get(data.domain) ?? 0) + 1);
  const names = [...Object.keys(domainLabelsZh), ...counts.keys()].filter((name, index, all) =>
    counts.has(name) && all.indexOf(name) === index);
  return names.map((name) => ({ name, zh: domainLabelsZh[name] ?? name, count: counts.get(name) }));
}

export function knowledgeHref(base, domain) {
  const params = new URLSearchParams({ domain });
  return `${base.replace(/\/?$/, '/')}knowledge/?${params}#knowledge-index`;
}

export function readKnowledgeFilters(search, domains) {
  const params = new URLSearchParams(search);
  const domain = params.get('domain') ?? '';
  const type = params.get('type') ?? '';
  return {
    q: (params.get('q') ?? '').trim(),
    domain: domains.some(({ name }) => name === domain) ? domain : '',
    type: ['concept', 'paper', 'tool', 'topic'].includes(type) ? type : '',
  };
}

export function updateKnowledgeUrl(url, filters) {
  const result = new URL(url);
  for (const key of ['q', 'type', 'domain']) {
    const value = (filters[key] ?? '').trim();
    if (value) result.searchParams.set(key, value);
    else result.searchParams.delete(key);
  }
  return result;
}
