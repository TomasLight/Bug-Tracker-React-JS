import {combineReducers} from "redux";
import {BugStore, IBugStore} from "../../Bugs/logic/BugStore";

export interface Reducers {
    BugStore: IBugStore
}

export function createReducers() {
    return combineReducers({
        BugStore
    });
}