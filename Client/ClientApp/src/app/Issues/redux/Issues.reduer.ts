import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { Reducer } from "@utils/redux/Reducer";

export const IssuesReducer = Reducer(new IssuesStore(), IssuesActions.UPDATE_STORE);
