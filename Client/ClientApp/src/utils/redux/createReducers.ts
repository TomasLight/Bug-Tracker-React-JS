import { History } from "history";
import { combineReducers, Reducer, ReducersMapObject } from "redux";

export function createReducers<TReducers>(
    history: History,
    getReducers: (history: History) => ReducersMapObject<TReducers, any>
): Reducer<TReducers> {

    const reducers = getReducers(history);
    return combineReducers<TReducers>(reducers);
}
