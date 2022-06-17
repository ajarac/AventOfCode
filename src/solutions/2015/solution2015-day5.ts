import { Solution } from '../../utils/solution';

export class Solution2015Day5 extends Solution {
    private vocals = new Set([ 'a', 'e', 'i', 'o', 'u' ]);
    private badPairs = new Set([ 'ab', 'cd', 'pq', 'xy' ]);

    constructor() {
        super(2015, 5);
    }

    solvePart1(data: string): string {
        let niceWords = 0;
        const words = data.split('\n');
        for (const word of words) {
            if (this.isNiceWord1(word)) {
                niceWords++;
            }
        }
        return niceWords.toString();
    }

    solvePart2(data: string): string {
        let niceWords = 0;
        const words = data.split('\n');
        for (const word of words) {
            if (this.isNiceWord2(word)) {
                niceWords++;
            }
        }
        return niceWords.toString();
    }

    private isNiceWord1(word: string): boolean {
        let counterVocals = 0;
        let containDouble = false;
        for (let i = 0; i < word.length; i++) {
            if (this.vocals.has(word[i])) {
                counterVocals++;
            }
            if (i > 0 && !containDouble && word[i - 1] == word[i]) {
                containDouble = true;
            }
            if (i > 0 && this.badPairs.has(`${ word[i - 1] }${ word[i] }`)) {
                return false;
            }
        }
        return counterVocals >= 3 && containDouble;
    }

    private isNiceWord2(word: string): boolean {
        const size = word.length;
        const mapPair = new Map<string, number>();
        let hasPair = false;
        let overlapped = false;
        for (let i = 0; i < size; i++) {
            if (i > 0 && !hasPair) {
                const pair = word[i - 1] + word[i];
                if (mapPair.has(pair) && mapPair.get(pair) < (i - 1)) {
                    hasPair = true;
                } else if (!mapPair.has(pair)) {
                    mapPair.set(word[i - 1] + word[i], i);
                }
            }
            if (!overlapped && i > 0 && i < size - 1 && word[i - 1] === word[i + 1]) {
                overlapped = true;
            }
        }
        return overlapped && hasPair;
    }
}
