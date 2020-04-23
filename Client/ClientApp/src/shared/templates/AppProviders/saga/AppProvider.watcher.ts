import { WatcherBase } from "@utils/saga/WatcherBase";

import { AppProviderActions } from "../redux/AppProvider.actions";
import { AppProviderSaga } from "./AppProvider.saga";

export class AppProviderWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchEvery(
            AppProviderActions.INCREMENT_INITIALIZED_ACTIONS,
            AppProviderSaga.incrementInitializedActions
        );
        this.watchLatest(
            AppProviderActions.INITIALIZE_APP,
            AppProviderSaga.initializeApp
        );
    }
}
