import type { LeetCodeProblem } from '../data/leetcodeProblems';

export interface LeetCodeFilters {
  track: 'all' | 'minimum' | 'core' | 'quant';
  query: string;
  category: string;
  difficulty: string;
  week: string;
}

export const matchesLeetCodeProblem = (problem: LeetCodeProblem, filters: LeetCodeFilters): boolean => {
  const haystack = [problem.number, problem.title, problem.pattern, problem.quantApplication].join(' ').toLowerCase();
  const trackMatches = filters.track === 'all'
    || (filters.track === 'minimum' && problem.minimum25)
    || problem.track === filters.track;

  return trackMatches
    && (!filters.query.trim() || haystack.includes(filters.query.trim().toLowerCase()))
    && (!filters.category || problem.category === filters.category)
    && (!filters.difficulty || problem.difficulty === filters.difficulty)
    && (!filters.week || String(problem.week) === filters.week);
};
