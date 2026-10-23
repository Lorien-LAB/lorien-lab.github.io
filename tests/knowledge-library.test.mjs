import test from 'node:test';
import assert from 'node:assert/strict';
import { getKnowledgeDomains, knowledgeHref, readKnowledgeFilters, updateKnowledgeUrl } from '../src/lib/knowledgeLibrary.mjs';

test('domain menu covers every actual domain, including future content', () => {
  const entries = ['Finance', 'Machine Learning', 'Finance', 'Interview Strategy & Communication', 'New Field']
    .map((domain) => ({ data: { domain } }));
  assert.deepEqual(getKnowledgeDomains(entries).map(({ name, count }) => ({ name, count })), [
    { name: 'Machine Learning', count: 1 },
    { name: 'Finance', count: 2 },
    { name: 'Interview Strategy & Communication', count: 1 },
    { name: 'New Field', count: 1 },
  ]);
  assert.deepEqual(getKnowledgeDomains([]), []);
});

test('homepage domain destinations retain the category and deployment base', () => {
  assert.equal(knowledgeHref('/', 'Machine Learning'), '/knowledge/?domain=Machine+Learning#knowledge-index');
  assert.equal(knowledgeHref('/portfolio/', 'AI & Research Agents'), '/portfolio/knowledge/?domain=AI+%26+Research+Agents#knowledge-index');
});

test('valid shared filters round-trip without losing text or unrelated URL state', () => {
  const domains = [{ name: 'Machine Learning' }];
  const url = updateKnowledgeUrl('https://example.test/knowledge/?ref=home#knowledge-index', {
    q: '  factor 模型  ', domain: 'Machine Learning', type: 'topic',
  });
  assert.equal(url.searchParams.get('ref'), 'home');
  assert.equal(url.hash, '#knowledge-index');
  assert.deepEqual(readKnowledgeFilters(url.search, domains), { q: 'factor 模型', domain: 'Machine Learning', type: 'topic' });
});

test('unknown domain/type links fall back to all entries without dropping the query', () => {
  assert.deepEqual(readKnowledgeFilters('?domain=Missing&type=unknown&q=Bayes', [{ name: 'Finance' }]), {
    q: 'Bayes', domain: '', type: '',
  });
});

test('reset clears only library filter parameters', () => {
  const url = updateKnowledgeUrl('https://example.test/knowledge/?q=x&type=tool&domain=Finance&ref=home#knowledge-index', { q: '', type: '', domain: '' });
  assert.equal(url.href, 'https://example.test/knowledge/?ref=home#knowledge-index');
});
