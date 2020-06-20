import { select } from "redux-saga/effects";

import { State } from "@State";

export class AppProviderSelectors {
    public static* getStore() {
        const state: State = yield select();
        return state.appProviderStore;
    }
}
