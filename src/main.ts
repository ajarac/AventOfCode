import { getAllSolutions } from './utils/solutions';

const solutions = getAllSolutions();

solutions.forEach((solution) => solution.solve());
