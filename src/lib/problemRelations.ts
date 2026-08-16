import type { CollectionEntry } from 'astro:content';

type Problem = CollectionEntry<'problems'>;
type ProblemSource = CollectionEntry<'problemSources'>;
type Knowledge = CollectionEntry<'knowledge'>;

export const slugOf = (id: string) => id.split('/').pop() ?? id;

export function getProblemsForKnowledgeSlug(problems: Problem[], knowledgeSlug: string) {
  return problems.filter((problem) =>
    problem.data.concepts.includes(knowledgeSlug) ||
    problem.data.techniques.includes(knowledgeSlug) ||
    problem.data.prerequisites.includes(knowledgeSlug)
  );
}

export function getSourceForProblem(problem: Problem, sources: ProblemSource[]) {
  if (!problem.data.source) return undefined;
  return sources.find((source) => slugOf(source.id) === problem.data.source);
}

export function getProblemsForSource(problems: Problem[], sourceSlug: string) {
  return problems
    .filter((problem) => problem.data.source === sourceSlug)
    .sort((a, b) => {
      const section = (a.data.sourceSection ?? '').localeCompare(
        b.data.sourceSection ?? '', undefined, { numeric: true },
      );
      if (section !== 0) return section;
      return (a.data.sourceProblem ?? a.data.problemId).localeCompare(
        b.data.sourceProblem ?? b.data.problemId, undefined, { numeric: true },
      );
    });
}

export function validateProblemRelationships(
  problems: Problem[],
  sources: ProblemSource[],
  knowledge: Knowledge[],
) {
  const problemSlugs = new Set(problems.map((problem) => slugOf(problem.id)));
  const problemIds = new Set<string>();
  const sourceSlugs = new Set(sources.map((source) => slugOf(source.id)));
  const knowledgeBySlug = new Map(knowledge.map((entry) => [slugOf(entry.id), entry]));
  const sourceProblemKeys = new Set<string>();
  const errors: string[] = [];

  for (const problem of problems) {
    const slug = slugOf(problem.id);

    if (problemIds.has(problem.data.problemId)) errors.push(`duplicate problemId: ${problem.data.problemId}`);
    problemIds.add(problem.data.problemId);

    if (problem.data.source && !sourceSlugs.has(problem.data.source)) {
      errors.push(`${slug}: unresolved source ${problem.data.source}`);
    }

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

    if (problem.data.source && problem.data.sourceProblem) {
      const key = `${problem.data.source}:${problem.data.sourceSection ?? ''}:${problem.data.sourceProblem}`;
      if (sourceProblemKeys.has(key)) errors.push(`${slug}: duplicate source problem key ${key}`);
      sourceProblemKeys.add(key);
    }
  }

  if (errors.length) throw new Error(`Problem relationship validation failed:\n${errors.join('\n')}`);
}
