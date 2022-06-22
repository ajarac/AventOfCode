import { Solution } from '../../utils/solution';

class Password {
    private static avoidLetters = new Set().add(this.getCode('i')).add(this.getCode('o')).add(this.getCode('l'));
    private password: number[];

    constructor(content: string) {
        this.password = content.split('').map(Password.getCode);
    }

    private static getCode(letter: string): number {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    calculateNext() {
        this.sum();
        while (!this.isValid()) {
            this.sum();
        }
    }

    toString(): string {
        return String.fromCharCode(...this.password.map((l) => l + 'a'.charCodeAt(0)));
    }

    private sum() {
        let carry = 1;
        let index = this.password.length - 1;
        while (carry > 0) {
            if (this.password[index] === 25) {
                this.password[index] = 0;
                carry++;
            } else {
                this.password[index]++;
            }
            carry--;
            index--;
        }
    }

    private isValid(): boolean {
        return !this.hasAnyAvoidLetter() && this.hasIncreaseLetters() && this.hasTwoPairs();
    }

    private hasAnyAvoidLetter(): boolean {
        return this.password.some((letter) => Password.avoidLetters.has(letter));
    }

    private hasIncreaseLetters(): boolean {
        for (let i = 1; i < this.password.length - 1; i++) {
            if (this.password[i - 1] + 1 === this.password[i] && this.password[i] + 1 === this.password[i + 1]) {
                return true;
            }
        }
        return false;
    }

    private hasTwoPairs(): boolean {
        const set = new Set();
        let counterPairs = 0;
        for (let i = 1; i < this.password.length; i++) {
            if (!set.has(this.password[i]) && this.password[i - 1] === this.password[i]) {
                counterPairs++;
                set.add(this.password[i]);
            }
        }
        return counterPairs >= 2;
    }
}

export class Solution2015Day11 extends Solution {

    constructor() {
        super(2015, 11);
    }

    solvePart1(data: string): string {
        return this.calculateNTimes(data, 1);
    }

    solvePart2(data: string): string {
        return this.calculateNTimes(data, 2);
    }

    private calculateNTimes(data: string, times: number): string {
        const password = new Password(data.trim());
        for (let i = 0; i < times; i++) {
            password.calculateNext();
        }
        return password.toString();
    }

}
