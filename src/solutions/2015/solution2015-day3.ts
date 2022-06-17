import { Solution } from '../../utils/solution';

interface Position {
    row: number;
    column: number;
}

export class Solution2015Day3 extends Solution {
    private static mapMoves = {
        '>': (position) => position.row++,
        '<': (position) => position.row--,
        '^': (position) => position.column++,
        'v': (position) => position.column--
    };

    constructor() {
        super(2015, 3);
    }

    private static getKey({row, column}: Position): string {
        return `${ row }-${ column }`;
    }

    solvePart1(data: string): string {
        data = data.trim();
        const set = new Set();
        const position = {row: 0, column: 0};
        set.add(Solution2015Day3.getKey(position));
        for (const move of data) {
            Solution2015Day3.mapMoves[move](position);
            set.add(Solution2015Day3.getKey(position));
        }
        return set.size.toString();
    }

    solvePart2(data: string): string {
        data = data.trim();
        const set = new Set();
        const positionSanta = {row: 0, column: 0};
        const positionRobot = {row: 0, column: 0};
        set.add(Solution2015Day3.getKey(positionSanta));
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                Solution2015Day3.mapMoves[data[i]](positionSanta);
                set.add(Solution2015Day3.getKey(positionSanta));
            } else {
                Solution2015Day3.mapMoves[data[i]](positionRobot);
                set.add(Solution2015Day3.getKey(positionRobot));
            }
        }
        return set.size.toString();
    }
}
