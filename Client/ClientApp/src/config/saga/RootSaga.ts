import { IssuesWatcher } from "@app/Issues/saga/Issues.watcher";
import { AppProviderWatcher } from "@shared/templates/AppProviders/saga/AppProvider.watcher";
import { RootSagaBase } from "@utils/saga/RootSagaBase";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),
            new IssuesWatcher(),
        ]);
    }
}
