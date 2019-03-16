import {AnyAction} from "redux";

import {BugsActionsToStore} from "@core/Bugs/PageBugs/redux/BugsActionsToStore";
import {BugsStore} from "@core/Bugs/PageBugs/redux/BugsStore";
import {getNewState} from "@utils/stores/getNewState";
import {nameof} from "@utils/nameof";

export const BugsStoreReducer = (state: BugsStore = new BugsStore(), action: AnyAction): BugsStore => {
    switch(action.type) {
        case BugsActionsToStore.SET_DISABLED:
            return getNewState(state, action, nameof(() => state.disabled));

        case BugsActionsToStore.SET_BUGS:
            return getNewState(state, action, nameof(() => state.bugs));
    }
    return state;
};