import { Solution } from '../../utils/solution';
import { posix } from 'path';

interface Ingredients {
     capacity: number;
     durability: number;
     flavor: number;
     texture: number;
     calories: number;
}

interface Scores {
    best: number,
    bestLight: number
}
interface DictIngredients {
    [k: string]: Ingredients
}

interface CounterIngredient {
    name: string
    amount: number
}

export class Solution2015Day15 extends Solution {

    constructor() {
        super(2015, 15);
    }

    private static parseTeaspoon(data: string): DictIngredients{
        const ingredients = {};

        data.split('\n').forEach(function(ingredient) {
            const match = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/.exec(ingredient);
            ingredients[match[1]] = {
                name:       match[1],
                capacity:   parseInt(match[2]),
                durability: parseInt(match[3]),
                flavor:     parseInt(match[4]),
                texture:    parseInt(match[5]),
                calories:   parseInt(match[6])
            };
        });
        return ingredients
    }

    solvePart1(data: string): string {
        const {best} = this.common(data);
        return best.toString();
    }

    solvePart2(data: string): string {
    
        const {bestLight} = this.common(data);
        return bestLight.toString();
    }

    private common(data: string): Scores {
        const ingredients: DictIngredients = Solution2015Day15.parseTeaspoon(data)
        const names = Object.keys(ingredients)
        const possibilities = this.getRemainderPossibilities(names, 100);  
        const score = {
            best: 0,
            bestLight: 0
        }
        for (const possibility of possibilities) {
           score.best = Math.max(score.best, this.calculate(possibility, ingredients))
           score.bestLight = Math.max(score.bestLight, this.calculate(possibility, ingredients, 500)) 
        }  
        return score
    }
    
    private calculate(list: CounterIngredient[], ingredients: DictIngredients, requiredCalories: number = null): number {
        let capacity = 0
        let durability = 0
        let  flavor = 0
        let texture = 0
        let calories = 0;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            capacity   += ingredients[item.name].capacity   * item.amount;
            durability += ingredients[item.name].durability * item.amount;
            flavor     += ingredients[item.name].flavor     * item.amount;
            texture    += ingredients[item.name].texture    * item.amount;
            calories   += ingredients[item.name].calories   * item.amount;
        }
    
        if (capacity <= 0 || durability <= 0 || flavor <= 0 || texture <= 0)
            return 0;
    
        if (requiredCalories && calories !== requiredCalories)
            return 0;
    
        return capacity * durability * flavor * texture;
    }

    private getRemainderPossibilities(ingredientNames: string[],  total: number, n: number = null): CounterIngredient[][] {
        n = n || 0;
        const spaces = (new Array(n * 4 + 1)).join(' ');
    
        const possibilities = [];
    
        if (n === ingredientNames.length - 1) {
            return [[{
                name: ingredientNames[n],
                amount: total
            }]];
        } else {
            for (let i = total; i >= 0; i--) {
                const item = {
                    name: ingredientNames[n],
                    amount: i
                };
    
                if (i !== total) {
                    const remainder = this.getRemainderPossibilities(ingredientNames,total - i, n + 1);
                    if (!remainder.length) {
                        console.log(spaces, 'debg:', total - i, n + 1);
                    }
                    remainder.forEach(function(list) {
                        if (i !== 0) {
                            list.unshift(item);
                        }
                        possibilities.push(list);
                    });
                } else {
                    possibilities.push([item]);
                }
            }
        }
    
        return possibilities;
    }
}
