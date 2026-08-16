import taxonomy from '../data/quant-interview/topics/taxonomy.json';

export type QuantInterviewTopic = {
  id: string;
  title: string;
  order: number;
  children?: QuantInterviewTopic[];
};

export type QuantInterviewTaxonomy = {
  version: number;
  topics: QuantInterviewTopic[];
};

export const getQuantInterviewTaxonomy = () => taxonomy as QuantInterviewTaxonomy;

export function flattenPublicQuantInterviewTopics() {
  const rows: Array<QuantInterviewTopic & { parentId: string | null }> = [];

  const visit = (items: QuantInterviewTopic[], parentId: string | null) => {
    for (const item of [...items].sort((a, b) => a.order - b.order)) {
      rows.push({ ...item, parentId });
      if (item.children) visit(item.children, item.id);
    }
  };

  visit(getQuantInterviewTaxonomy().topics, null);
  return rows;
}
