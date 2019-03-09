import {combineReducers, Reducer} from "redux";
import {connectRouter, LocationChangeAction, RouterState} from "connected-react-router";
import {History} from "history";

import {BugStore, IBugStore} from "../../Bugs/logic/BugStore";
import {BugEditorStore, IBugEditorStore} from "../../Bugs/PageBugEditor/logic/BugEditorStore";
import {UserStore, IUserStore} from "../../Users/PageUsers/logic/UserStore";
import {UserEditorStore, IUserEditorStore} from "../../Users/PageUserEditor/logic/UserEditorStore";

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