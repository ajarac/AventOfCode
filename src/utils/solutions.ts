import { Solution2015Day1 } from '../solutions/2015/solution2015-day1';
import { Solution2015Day2 } from '../solutions/2015/solution2015-day2';
import { Solution2015Day3 } from '../solutions/2015/solution2015-day3';
import { Solution2015Day4 } from '../solutions/2015/solution2015-day4';

export function getAllSolutions() {
    return [
        new Solution2015Day1(),
        new Solution2015Day2(),
        new Solution2015Day3(),
        new Solution2015Day4()
    ];
}
