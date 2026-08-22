import type { CollectionEntry } from 'astro:content';

type Problem = CollectionEntry<'problems'>;
type Knowledge = CollectionEntry<'knowledge'>;

export const slugOf = (id: string) => id.split('/').pop() ?? id;

export function getProblemsForKnowledgeSlug(problems: Problem[], knowledgeSlug: string) {
  return problems.filter((problem) =>
    problem.data.concepts.includes(knowledgeSlug) ||
    problem.data.techniques.includes(knowledgeSlug) ||
    problem.data.prerequisites.includes(knowledgeSlug)
  );
}

export function validateProblemRelationships(
  problems: Problem[],
  knowledge: Knowledge[],
) {
  const problemSlugs = new Set(problems.map((problem) => slugOf(problem.id)));
  const problemIds = new Set<string>();
  const knowledgeBySlug = new Map(knowledge.map((entry) => [slugOf(entry.id), entry]));
  const errors: string[] = [];

  for (const problem of problems) {
    const slug = slugOf(problem.id);

    if (problemIds.has(problem.data.problemId)) errors.push(`duplicate problemId: ${problem.data.problemId}`);
    problemIds.add(problem.data.problemId);

    for (const concept of [...problem.data.concepts, ...problem.data.prerequisites]) {
      if (!knowledgeBySlug.has(concept)) errors.push(`${slug}: unresolved knowledge ${concept}`);
    }

    for (const technique of problem.data.techniques) {
      const entry = knowledgeBySlug.get(technique);
      if (!entry) errors.push(`${slug}: unresolved technique ${technique}`);
      else if (entry.data.type !== 'concept' || entry.data.category !== 'Problem Solving Techniques') {
        errors.push(`${slug}: technique ${technique} is not a Problem Solving Techniques concept`);
      }
    }

    for (const related of problem.data.relatedProblems) {
      if (!problemSlugs.has(related)) errors.push(`${slug}: unresolved related problem ${related}`);
    }
  }

  if (errors.length) throw new Error(`Problem relationship validation failed:\n${errors.join('\n')}`);
}
