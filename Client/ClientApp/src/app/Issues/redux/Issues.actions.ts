import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { createAction } from "@utils/redux/createAction";

export class IssuesActions {
    public static readonly PREFIX = "ISSUES_";
    public static readonly UPDATE_STORE = IssuesActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_ISSUES = IssuesActions.PREFIX + "LOAD_ISSUES";

    public static updateStore = (partialStore: Partial<IssuesStore>) =>
        createAction(IssuesActions.UPDATE_STORE, partialStore);

    public static loadIssues = () => createAction(IssuesActions.LOAD_ISSUES);
}
