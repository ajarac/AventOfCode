import { Solution } from '../../utils/solution';

enum ActionType {
    TURN_ON,
    TURN_OFF,
    TOGGLE
}

interface Action {
    type: ActionType,
    from: [ number, number ],
    to: [ number, number ]
}

export class Solution2015Day6 extends Solution {

    constructor() {
        super(2015, 6);
    }

    private static getAction(input: string): ActionType {
        switch (true) {
            case input.includes('toggle'):
                return ActionType.TOGGLE;
            case input.includes('on'):
                return ActionType.TURN_ON;
            case input.includes('off'):
                return ActionType.TURN_OFF;
        }

    }

    private static parseAction(input: string): Action {
        const splitted = input.split('through');
        const action = Solution2015Day6.getAction(splitted[0]);
        const part1 = splitted[0].split(' ');
        const from = part1[part1.length - 2].split(',').map(value => value.trim()).map(Number) as [ number, number ];
        const to = splitted[1].split(',').map(value => value.trim()).map(Number) as [ number, number ];
        return {type: action, from, to};
    }

    private static doAction1(grid: number[][], action: Action) {
        for (let row = action.from[0]; row <= action.to[0]; row++) {
            for (let column = action.from[1]; column <= action.to[1]; column++) {
                switch (action.type) {
                    case ActionType.TOGGLE:
                        grid[row][column] = grid[row][column] === 1 ? 0 : 1;
                        break;
                    case ActionType.TURN_ON:
                        grid[row][column] = 1;
                        break;
                    case ActionType.TURN_OFF:
                        grid[row][column] = 0;
                        break;
                }
            }
        }
    }

    private static doAction2(grid: number[][], action: Action) {
        for (let row = action.from[0]; row <= action.to[0]; row++) {
            for (let column = action.from[1]; column <= action.to[1]; column++) {
                switch (action.type) {
                    case ActionType.TOGGLE:
                        grid[row][column] += 2;
                        break;
                    case ActionType.TURN_ON:
                        grid[row][column]++;
                        break;
                    case ActionType.TURN_OFF:
                        if (grid[row][column] > 0) {
                            grid[row][column]--;
                        }
                        break;
                }
            }
        }
    }

    solvePart1(data: string): string {
        return this.common(data, Solution2015Day6.doAction1).toString();
    }

    solvePart2(data: string): string {
        return this.common(data, Solution2015Day6.doAction2).toString();
    }

    private common(data: string, actionFunc: (grid: number[][], action: Action) => void): number {
        const grid = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
        const actions = data.split('\n').filter(((value) => value != ''));
        for (const actionData of actions) {
            const action = Solution2015Day6.parseAction(actionData);
            actionFunc(grid, action);
        }
        let counter = 0;
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row].length; column++) {
                counter += grid[row][column];
            }
        }
        return counter;
    }
}
