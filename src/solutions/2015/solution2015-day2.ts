import { Solution } from '../../utils/solution';

export class Solution2015Day2 extends Solution {

    constructor() {
        super(2015, 2);
    }

    solvePart1(data: string): string {
        const rows = data.split('\n');
        let result = 0;
        let index = 0;
        while (rows[index] != '') {
            const box = rows[index].split('x').map(Number).sort((a, b) => a - b);
            result += (3 * box[0] * box[1] + 2 * box[1] * box[2] + 2 * box[2] * box[0]);
            index++;
        }
        return result.toString();
    }

    solvePart2(data: string): string {
        const rows = data.split('\n');
        let result = 0;
        let index = 0;
        while (rows[index] != '') {
            const box = rows[index].split('x').map(Number).sort((a, b) => a - b);
            result += (2 * box[0] + 2 * box[1] + box[0] * box[1] * box[2]);
            index++;
        }
        return result.toString();
    }

}
