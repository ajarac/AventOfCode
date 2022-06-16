import { ReadResource } from './read-resource';

export abstract class Solution {

    protected constructor(public readonly year: number, public readonly day: number) {
    }

    solve() {
        console.log(`===== Solving ${ this.year }-${ this.day }::`);
        const data = ReadResource.read(this.year, this.day);
        const startTime1 = performance.now();
        const part1 = this.solvePart1(data);
        const endTime1 = performance.now();
        console.log(`⭐      ${ part1 } \n  Solved in: ${ endTime1 - startTime1 } ms`);

        const startTime2 = performance.now();
        const part2 = this.solvePart2(data);
        const endTime2 = performance.now();
        console.log(`⭐ ⭐    ${ part2 } \n  Solved in: ${ endTime2 - startTime2 } ms`);
    }


    abstract solvePart1(data: string): string

    abstract solvePart2(data: string): string
}
