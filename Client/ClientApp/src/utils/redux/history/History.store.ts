import { RouteHistory } from "./RouteHistory";

export class HistoryStore {
    public history: RouteHistory;

    constructor() {
        this.history = new RouteHistory();
    }
}
