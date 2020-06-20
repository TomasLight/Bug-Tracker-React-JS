import { AppProviderWatcher } from "@shared/templates/AppProvider/saga/AppProvider.watcher";
import { RootSagaBase } from "@utils/saga/RootSagaBase";

import { IssuesWatcher } from "@app/Issues/saga/Issues.watcher";
import { UsersWatcher } from "@app/Users/saga/Users.watcher";

export class RootSaga extends RootSagaBase {
    constructor() {
        super();

        this.addWatchers([
            new AppProviderWatcher(),

            new IssuesWatcher(),
            new UsersWatcher(),
        ]);
    }
}
