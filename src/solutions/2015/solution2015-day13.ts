import { Solution } from '../../utils/solution';

interface MapSitting {
    [k: string]: { [k: string]: number };
}


export class Solution2015Day13 extends Solution {
    private static MYSELF = 'myself';

    constructor() {
        super(2015, 13);
    }

    solvePart1(data: string): string {
        const mapSitting = this.buildMap(data);
        return this.calculateHappiness(mapSitting);
    }

    solvePart2(data: string): string {
        const mapSitting = this.buildMap(data);
        const persons = Object.keys(mapSitting);
        mapSitting[Solution2015Day13.MYSELF] = {};
        for (const person of persons) {
            mapSitting[Solution2015Day13.MYSELF][person] = 0;
            mapSitting[person][Solution2015Day13.MYSELF] = 0;
        }
        return this.calculateHappiness(mapSitting);
    }

    private calculateHappiness(mapSitting: MapSitting): string {
        const totalPersons = Object.keys(mapSitting).length;
        let result = 0;
        let personSitted = new Set();
        const backTracking = (person: string, firstPerson: string, counter: number) => {
            if (personSitted.has(person)) {
                return;
            }
            personSitted.add(person);
            if (personSitted.size === totalPersons) {
                result = Math.max(result, counter + mapSitting[person][firstPerson] + mapSitting[firstPerson][person]);
                personSitted.delete(person);
                return;
            }

            for (const personToSit in mapSitting[person]) {
                backTracking(personToSit, firstPerson, counter + mapSitting[person][personToSit] + mapSitting[personToSit][person]);
            }
            personSitted.delete(person);
        };

        for (const person in mapSitting) {
            backTracking(person, person, 0);
        }

        return result.toString();
    }

    private buildMap(data: string): MapSitting {
        const map: MapSitting = {};
        const pairs = data.trim().split('\n');
        for (const pair of pairs) {
            const words = pair.split(' ');
            const person1 = words[0];
            const person2 = words[words.length - 1].replace('.', '');
            let happines = parseInt(words[3]);
            if (words[2] === 'lose') {
                happines *= -1;
            }
            map[person1] = map[person1] || {};
            map[person1][person2] = happines;
        }

        return map;
    }
}
