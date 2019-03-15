import {combineReducers, Reducer} from "redux";
import {connectRouter, LocationChangeAction, RouterState} from "connected-react-router";
import {History} from "history";

import {BugStore, IBugStore} from "@core/Bugs/redux/BugStore";
import {BugEditorStore, IBugEditorStore} from "@core/Bugs/PageBugEditor/redux/BugEditorStore";
import {UserStore, IUserStore} from "@core/Users/PageUsers/redux/UserStore";
import {UserEditorStore, IUserEditorStore} from "@core/Users/PageUserEditor/redux/UserEditorStore";

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