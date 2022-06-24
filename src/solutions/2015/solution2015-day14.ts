import { Solution } from '../../utils/solution';

class Fly {
    private readonly timeCycle: number;

    constructor(
        public readonly name: string,
        private readonly velocity: number,
        private readonly secFlying: number,
        private readonly secResting: number
    ) {
        this.timeCycle = secFlying + secResting;
    }

    static fromRowString(flyRaw: string): Fly {
        const row = flyRaw.replace('.', '').split(' ');
        return new Fly(row[0], parseInt(row[3]), parseInt(row[6]), parseInt(row[13]));
    }

    calculateDistance(seconds: number) {
        const cycles = Math.floor(seconds / (this.timeCycle));
        let residual = seconds % this.timeCycle;
        if (residual > this.secFlying) {
            residual = this.secFlying;
        }
        return cycles * this.velocity * this.secFlying + this.velocity * residual;
    }
}

export class Solution2015Day14 extends Solution {
    constructor() {
        super(2015, 14);
    }

    private static buildFlies(data: string): Fly[] {
        const flies: Fly[] = [];
        const fliesRaw = data.trim().split('\n');
        for (const flyRaw of fliesRaw) {
            flies.push(Fly.fromRowString(flyRaw));
        }
        return flies;
    }

    solvePart1(data: string): string {
        const fliesDistance = Solution2015Day14.buildFlies(data).map(fly => fly.calculateDistance(2503));
        return Math.max(...fliesDistance).toString();
    }

    solvePart2(data: string): string {
        const map: Map<string, number> = new Map<string, number>();
        const flyes: Fly[] = Solution2015Day14.buildFlies(data);
        for (const fly of flyes) {
            map.set(fly.name, 0);
        }
        
        for (let i = 1; i <= 2503; i++) {
            let winner = 0;
            let max = 0;
            for (let j = 0; j < flyes.length; j++) {
                const distance = flyes[j].calculateDistance(i);
                if (max < distance) {
                    winner = j;
                    max = distance;
                }
            }
            const name = flyes[winner].name;
            map.set(name, map.get(name) + 1);
        }
        let max = 0;
        for (const value of map.values()) {
            max = Math.max(max, value);
        }
        return max.toString();
    }
}
