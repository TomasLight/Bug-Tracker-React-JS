import {AnyAction} from "redux";

import {UsersStoreActions} from "@core/Users/PageUsers/redux/UsersStore.actions";
import {UsersStore} from "@core/Users/PageUsers/redux/UsersStore";
import {getNewState} from "@utils/stores/getNewState";
import {nameof} from "@utils/nameof";

export const UsersStoreReducer = (state: UsersStore = new UsersStore(), action: AnyAction): UsersStore => {
    switch(action.type) {
        case UsersStoreActions.SET_DISABLED:
            return getNewState(state, action, nameof(() => state.disabled));

        case UsersStoreActions.SET_USERS:
            return getNewState(state, action, nameof(() => state.users));
    }
    return state;
};