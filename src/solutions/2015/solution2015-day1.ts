import { Solution } from '../../utils/solution';

export class Solution2015Day1 extends Solution {
    constructor() {
        super(2015, 1);
    }

    solvePart1(data: string): string {
        let floor = 0;
        for (const letter of data) {
            if (letter === '(') {
                floor++;
            } else if (letter === ')') {
                floor--;
            }
        }
        return floor.toString();
    }

    solvePart2(data: string): string {
        let floor = 0;
        let index = 0;
        while (floor > -1) {
            if (data[index] === '(') {
                floor++;
            } else if (data[index] === ')') {
                floor--;
            }
            index++;
        }
        return (index).toString();
    }
}
