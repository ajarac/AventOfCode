import { Solution } from '../../utils/solution';

export class Solution2015Day10 extends Solution {
    constructor() {
        super(2015, 10);
    }

    private static buildArrayNumbers(data: string): number[] {
        return data.trim().split('').map(Number);
    }

    solvePart1(data: string): string {
        return this.processNTimes(Solution2015Day10.buildArrayNumbers(data), 40).toString();
    }

    solvePart2(data: string): string {
        return this.processNTimes(Solution2015Day10.buildArrayNumbers(data), 50).toString();
    }

    private processNTimes(list: number[], times: number): number {
        for (let i = 0; i < times; i++) {
            list = this.process(list);
        }
        return list.length;
    }

    private process(list: number[]): number[] {
        const result = [];
        let index = 0;

        while (index < list.length) {
            let counter = 1;
            while (index < list.length - 1 && list[index] === list[index + 1]) {
                counter++;
                index++;
            }
            result.push(counter);
            result.push(list[index]);
            index++;
        }

        return result;
    }
}
