import { Location } from "history";

export class RouteHistory {
    private readonly paths: Location[];

    constructor() {
        this.paths = [];
    }

    public get current(): Location {
        if (this.paths.length === 0) {
            return null;
        }

        return this.paths[this.paths.length - 1];
    }

    public get previous(): Location {
        if (this.paths.length < 2) {
            return null;
        }

        return this.paths[this.paths.length - 2];
    }

    public push(path: Location) {
        return this.paths.push(path);
    }
}
