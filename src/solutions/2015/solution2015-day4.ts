import { MD5 } from 'crypto-js';
import { Solution } from '../../utils/solution';

export class Solution2015Day4 extends Solution {
    constructor() {
        super(2015, 4);
    }

    solvePart1(data: string): string {
        let index = 0;
        const secret = data.trim();
        while (!this.isValidHash(secret, index, 5)) {
            index++;
        }
        return index.toString();
    }

    solvePart2(data: string): string {
        let index = 0;
        const secret = data.trim();
        while (!this.isValidHash(secret, index, 6)) {
            index++;
        }
        return index.toString();
    }

    isValidHash(secret: string, num: number, numOfZeros: number): boolean {
        const hash = MD5(secret + num).toString();
        for (let i = 0; i < numOfZeros; i++) {
            if (hash[i] !== '0') {
                return false;
            }
        }
        return true;
    }
}
