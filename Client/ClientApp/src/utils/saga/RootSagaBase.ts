import { SagaMiddleware } from "redux-saga";

import { WatchFunction } from "@utils/saga/WatchFunction";
import { WatcherBase } from "@utils/saga/WatcherBase";

export class RootSagaBase {
    protected watchFunctions: WatchFunction[];

    protected addWatchers(baseWatchers: WatcherBase[]) {
        baseWatchers.forEach((watcher) => this.addWatcher(watcher));
    }

    protected addWatcher(baseWatcher: WatcherBase) {
        this.watchFunctions.push(...baseWatcher.watchFunctions);
    }

    constructor() {
        this.watchFunctions = [];
    }

    public run(sagaMiddleware: SagaMiddleware) {
        this.watchFunctions.forEach(
            sagaMiddleware.run
        );
    }
}
