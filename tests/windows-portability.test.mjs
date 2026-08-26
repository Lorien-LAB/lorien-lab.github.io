import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('repository text files are pinned to LF checkouts', async () => {
  const attributes = await readFile('.gitattributes', 'utf8');
  assert.match(attributes, /^\* text=auto eol=lf$/m);
});

test('recursive markdown paths match on POSIX and Windows', () => {
  const slug = 'example-entry';
  const matchesSlug = (file) => String(file).replaceAll('\\', '/').endsWith(`/${slug}.md`);

  assert.equal(matchesSlug(`concepts/${slug}.md`), true);
  assert.equal(matchesSlug(`concepts\\${slug}.md`), true);
});
