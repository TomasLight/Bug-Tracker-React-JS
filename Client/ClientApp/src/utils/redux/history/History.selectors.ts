import { select } from "redux-saga/effects";

import { State } from "@State";
import { HistoryStore } from "./History.store";

export class HistorySelectors {
    public static* getStore() {
        const state: State = yield select();
        return state.historyStore;
    }

    public static* getHistory() {
        const store: HistoryStore = yield HistorySelectors.getStore();
        return store.history;
    }
}
