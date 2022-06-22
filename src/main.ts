import { getAllSolutions } from './utils/solutions';

const solutions = getAllSolutions();
let total = 0
for(const solution of solutions) {
    total += solution.solve()
}
console.log(`TOTAL ALL SOLUTIONS:: ${total / 1000} s`)
