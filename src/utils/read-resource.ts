import { readFileSync } from 'fs';

export class ReadResource {
    static read(year: number, day: number): string {
        return readFileSync(`./resources/${ year }/day${ day }.txt`).toString();
    }
}
