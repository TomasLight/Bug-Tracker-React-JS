import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {History} from "history";

import {BugsStoreReducer} from "@core/Bugs/PageBugs/redux/BugsStoreReducer";
import {BugEditorStoreReducer} from "@core/Bugs/PageBugEditor/redux/BugEditorStoreReducer";
import {UsersStoreReducer} from "@core/Users/PageUsers/redux/UsersStoreReducer";
import {UserEditorStoreReducer} from "@core/Users/PageUserEditor/redux/UserEditorStoreReducer";

export function createReducers(history: History) {
    return combineReducers({
        router: connectRouter(history),

        BugsStoreReducer,
        BugEditorStoreReducer,

        UsersStoreReducer,
        UserEditorStoreReducer
    });
}