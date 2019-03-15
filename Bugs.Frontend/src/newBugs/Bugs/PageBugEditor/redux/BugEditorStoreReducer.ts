import {AnyAction} from "redux";

import {BugEditorActionsToStore} from "@core/Bugs/PageBugEditor/redux/BugEditorActionsToStore";
import {BugEditorStore} from "@core/Bugs/PageBugEditor/redux/BugEditorStore";
import {getNewState} from "@utils/stores/getNewState";
import {nameof} from "@utils/nameof";

export const BugEditorStoreReducer = (state: BugEditorStore = BugEditorStore.initialState, action: AnyAction): BugEditorStore => {
    switch(action.type) {
        case BugEditorActionsToStore.SET_DISABLED:
            return getNewState(state, action, nameof(() => state.disabled));

        case BugEditorActionsToStore.SET_BUG:
            return getNewState(state, action, nameof(() => state.bug));
    }
    return state;
};