import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/data/quant-interview/toc/green-book.json';
const toc = JSON.parse(await readFile(path, 'utf8'));
toc.tocStatus = 'source-file-verified';
toc.coverageClaim = 'verified-structure-not-problem-complete';
toc.editionStatus = 'edition-pinned';
toc.edition = 'First Edition (2008)';
toc.sourceFileEvidence = {
  pdfPageCount: 213,
  identity: 'sha256:89a637408fc57164c3ee4ef19fb36688a58dfb37b91ef1471d11df82d6d0e3f5',
};
await writeFile(path, `${JSON.stringify(toc, null, 2)}\n`);
