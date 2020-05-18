import { AppAction } from "app-redux-utils";
import { History } from "history";
import { LOCATION_CHANGE } from "react-router-redux";

import { HistoryStore } from "./History.store";

export const HistoryReducer = (
    state: HistoryStore = new HistoryStore(),
    action: AppAction<History>
): HistoryStore => {

    if (action.type === LOCATION_CHANGE) {
        state.history.push(action.payload.location);
    }

    return state;
};
