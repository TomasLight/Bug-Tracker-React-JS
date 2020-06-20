import { Reducer } from "app-redux-utils";

import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IssuesStore } from "@app/Issues/redux/Issues.store";

export const IssuesReducer = Reducer(new IssuesStore(), IssuesActions.UPDATE_STORE);
