import { Solution } from '../../utils/solution';

interface MapRoutes {
    [k: string]: { [k: string]: number };
}

interface Routes {
    min: number,
    max: number
}

export class Solution2015Day9 extends Solution {

    constructor() {
        super(2015, 9);
    }

    solvePart1(data: string): string {
        const {citiesSet, mapRoutes} = this.buildMetaData(data);
        const {min} = this.calculateRoutes(citiesSet, mapRoutes);
        return min.toString();
    }

    solvePart2(data: string): string {
        const {citiesSet, mapRoutes} = this.buildMetaData(data);
        const {max} = this.calculateRoutes(citiesSet, mapRoutes);
        return max.toString();
    }

    private calculateRoutes(citiesSet: Set<string>, mapRoutes: MapRoutes): Routes {
        const visited = new Set();
        let minRoute = Number.MAX_VALUE;
        let maxRoute = 0;

        const backtracking = (cityA, counterRoute) => {
            if (visited.has(cityA)) {
                return;
            }
            visited.add(cityA);
            if (visited.size === citiesSet.size) {
                minRoute = Math.min(minRoute, counterRoute);
                maxRoute = Math.max(maxRoute, counterRoute);
                visited.delete(cityA);
                return;
            }

            for (const cityB in mapRoutes[cityA]) {
                backtracking(cityB, counterRoute + mapRoutes[cityA][cityB]);
            }
            visited.delete(cityA);
        };

        for (const city of citiesSet.values()) {
            backtracking(city, 0);
        }

        return {min: minRoute, max: maxRoute};
    }

    private buildMetaData(data: string) {
        const citiesSet = new Set<string>();
        const mapRoutes: MapRoutes = {};
        const trips = data.trim().split('\n');
        for (const trip of trips) {
            const split = trip.split('=');
            const cities = split[0].split('to');
            const cityA = cities[0].trim();
            const cityB = cities[1].trim();
            const cost = parseInt(split[1].trim());
            citiesSet.add(cityA).add(cityB);
            mapRoutes[cityA] = mapRoutes[cityA] || {};
            mapRoutes[cityB] = mapRoutes[cityB] || {};
            mapRoutes[cityA][cityB] = cost;
            mapRoutes[cityB][cityA] = cost;
        }
        return {citiesSet, mapRoutes};
    }
}
