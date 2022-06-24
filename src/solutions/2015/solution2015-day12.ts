import { Solution } from '../../utils/solution';

enum Type {
    String,
    Number,
    Array,
    Object
}


export class Solution2015Day12 extends Solution {

    private dictionary = {
        [Type.Object]: (data, avoid: string) => {
            let result = 0;
            const keys = Object.keys(data);
            for (const key of keys) {
                if (key === avoid || data[key] === avoid) {
                    return 0;
                }
                result += this.calculate(key, avoid);
                result += this.calculate(data[key], avoid);
            }
            return result;
        },
        [Type.Array]: (data, avoid: string) => {
            let result = 0;
            for (const item of data) {
                result += this.calculate(item, avoid);
            }
            return result;
        },
        [Type.Number]: (data) => data,
        [Type.String]: (data) => 0
    };

    constructor() {
        super(2015, 12);
    }

    solvePart1(data: string): string {
        const json = JSON.parse(data);
        return this.calculate(json).toString();
    }

    solvePart2(data: string): string {
        const json = JSON.parse(data);
        return this.calculate(json, 'red').toString();
    }

    private calculate(data: any, avoid: string = null) {
        const type = this.getType(data);
        return this.dictionary[type](data, avoid);
    }

    private getType(data: any): Type {
        if (Array.isArray(data)) {
            return Type.Array;
        }
        if (Number.isSafeInteger(data)) {
            return Type.Number;
        }
        if (typeof data === 'string') {
            return Type.String;
        }
        return Type.Object;
    }
}
