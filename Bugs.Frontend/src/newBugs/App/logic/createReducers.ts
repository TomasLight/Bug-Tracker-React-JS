import {combineReducers, Reducer} from "redux";
import {connectRouter, LocationChangeAction, RouterState} from "connected-react-router";
import {History} from "history";

import {BugStore, IBugStore} from "@core/Bugs/logic/BugStore";
import {BugEditorStore, IBugEditorStore} from "@core/Bugs/PageBugEditor/logic/BugEditorStore";
import {UserStore, IUserStore} from "@core/Users/PageUsers/logic/UserStore";
import {UserEditorStore, IUserEditorStore} from "@core/Users/PageUserEditor/logic/UserEditorStore";

export interface IReducers {
    router: Reducer<RouterState, LocationChangeAction>;
    BugStore: IBugStore;
    BugEditorStore: IBugEditorStore;
    UserStore: IUserStore;
    UserEditorStore: IUserEditorStore;
}

export function createReducers(history: History) {
    return combineReducers({
        router: connectRouter(history),
        BugStore,
        BugEditorStore,
        UserStore,
        UserEditorStore
    });
}