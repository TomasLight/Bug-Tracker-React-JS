import {AnyAction} from "redux";

import {UserEditorActionsToStore} from "@core/Users/PageUserEditor/redux/UserEditorActionsToStore";
import {UserEditorStore} from "@core/Users/PageUserEditor/redux/UserEditorStore";
import {getNewState} from "@utils/stores/getNewState";
import {nameof} from "@utils/nameof";

export const UserEditorStoreReducer = (state: UserEditorStore = UserEditorStore.initialState, action: AnyAction): UserEditorStore => {
    switch(action.type) {
        case UserEditorActionsToStore.SET_DISABLED:
            return getNewState(state, action, nameof(() => state.disabled));

        case UserEditorActionsToStore.SET_USER:
            return getNewState(state, action, nameof(() => state.user));
    }
    return state;
};