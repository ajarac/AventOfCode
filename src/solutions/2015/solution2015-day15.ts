import { Solution } from '../../utils/solution';

class Ingredients {
    constructor(
        readonly capacity: number,
        readonly durability: number,
        readonly flavor: number,
        readonly texture: number,
        readonly calories: number
    ) {
    }
}

interface Scores {
    best: number,
    bestLight: number
}

export class Solution2015Day15 extends Solution {

    constructor() {
        super(2015, 15);
    }

    private static parseTeaspoon(data: string): Ingredients [] {
        const list: Ingredients[] = [];
        const teaspoons = data.trim().split('\n');
        for (const teaspoon of teaspoons) {
            const row = teaspoon.split(':');
            const properties = row[1].split(',').map((property) => parseInt(property.trim().split(' ')[1]));
            list.push(new Ingredients(properties[0], properties[1], properties[2], properties[3], properties[4]));
        }
        return list;
    }

    solvePart1(data: string): string {
        const {best} = this.calculate(data);
        return best.toString();
    }

    solvePart2(data: string): string {
        const {bestLight} = this.calculate(data);
        return bestLight.toString();
    }

    private calculate(data: string): Scores {
        const ingredients = Solution2015Day15.parseTeaspoon(data);
        let best = 0;
        let bestLight = 0;
        const quantities = new Array(ingredients.length).fill(0);
        const loop = true
        while (loop) {
            for (let i = 0; i < ingredients.length - 1; i++) {
                quantities[i]++;
                if (quantities[i] > 100) {
                    quantities[i] = 0;
                } else {
                    break;
                }
            }

            const quantityApplied = quantities.reduce((a, b) => a + b, 0);
            if (quantityApplied == 0)
                break;
            if (quantityApplied > 100)
                continue;

            quantities[ingredients.length - 1] = 100 - quantityApplied;

            // compute the result
            let capacity = 0;
            let durability = 0;
            let flavor = 0;
            let texture = 0;
            let calories = 0;
            for (let i = 0; i < ingredients.length; i++) {
                capacity += quantities[i] * ingredients[i].capacity;
                durability += quantities[i] * ingredients[i].durability;
                flavor += quantities[i] * ingredients[i].flavor;
                texture += quantities[i] * ingredients[i].texture;
                calories += quantities[i] * ingredients[i].calories;
            }

            const total = Math.max(0, capacity) * Math.max(0, durability) * Math.max(0, flavor) * Math.max(0, texture);
            best = Math.max(best, total);

            if (calories == 500) {
                bestLight = Math.max(total, bestLight);
            }

        }
        return {best, bestLight};
    }
}
