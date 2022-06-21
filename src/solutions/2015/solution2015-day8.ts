import { Solution } from '../../utils/solution';

export class Solution2015Day8 extends Solution {

    constructor() {
        super(2015, 8);
    }

    solvePart1(data: string): string {
        return data
            .trim()
            .split('\n')
            .reduce((prev, curr) => prev + (curr.length - eval(curr).length), 0)
            .toString();
    }

    solvePart2(data: string): string {
        return data
            .trim()
            .split('\n')
            .reduce((prev, curr) => prev + JSON.stringify(curr).length - curr.length, 0)
            .toString();
    }
}
