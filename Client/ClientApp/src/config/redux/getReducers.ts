import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ReducersMapObject } from "redux";

import { State } from "@State";
import { NotifierReducer } from "@app/Notifier/redux/Notifier.reducer";
import { HistoryReducer } from "@utils/redux/history/History.reducer";
import { AppProviderReducer } from "@shared/templates/AppProvider/redux/AppProvider.reducer";

import { IssuesReducer } from "@app/Issues/redux/Issues.reducer";
import { UsersReducer } from "@app/Users/redux/Users.reducer";

export function getReducers(history: History): ReducersMapObject<State, any> {
    return {
        router: connectRouter(history),
        historyStore: HistoryReducer,
        appProviderStore: AppProviderReducer,
        notifierStore: NotifierReducer,

        issuesStore: IssuesReducer,
        usersStore: UsersReducer,
    };
}
