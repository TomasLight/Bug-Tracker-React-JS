import {AnyAction} from "redux";

import {UsersActionsToStore} from "@core/Users/PageUsers/redux/UsersActionsToStore";
import {UsersStore} from "@core/Users/PageUsers/redux/UsersStore";
import {getNewState} from "@utils/stores/getNewState";
import {nameof} from "@utils/nameof";

export const UsersStoreReducer = (state: UsersStore = UsersStore.initialState, action: AnyAction): UsersStore => {
    switch(action.type) {
        case UsersActionsToStore.SET_DISABLED:
            return getNewState(state, action, nameof(() => state.disabled));

        case UsersActionsToStore.SET_USERS:
            return getNewState(state, action, nameof(() => state.users));
    }
    return state;
};