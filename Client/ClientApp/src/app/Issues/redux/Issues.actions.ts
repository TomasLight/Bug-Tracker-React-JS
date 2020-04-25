import {
    ICloseIssueData,
    IOpenIssueToEditCreateData,
    IOpenIssueToEditData
} from "@app/Issues/redux/Issues.actions.dataTypes";
import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { createAction } from "@utils/redux/createAction";

export class IssuesActions {
    public static readonly PREFIX = "ISSUES_";
    public static readonly UPDATE_STORE = IssuesActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_ISSUES = IssuesActions.PREFIX + "LOAD_ISSUES";
    public static readonly OPEN_ISSUE_TO_CREATE = IssuesActions.PREFIX + "OPEN_ISSUE_TO_CREATE";
    public static readonly OPEN_ISSUE_TO_EDIT = IssuesActions.PREFIX + "OPEN_ISSUE_TO_EDIT";
    public static readonly CLOSE_ISSUE = IssuesActions.PREFIX + "CLOSE_ISSUE";

    public static updateStore = (partialStore: Partial<IssuesStore>) =>
        createAction(IssuesActions.UPDATE_STORE, partialStore);

    public static loadIssues = () => createAction(IssuesActions.LOAD_ISSUES);

    public static openIssueToCreate = (data: IOpenIssueToEditCreateData) =>
        createAction(IssuesActions.OPEN_ISSUE_TO_CREATE, data);

    public static openIssueToEdit = (data: IOpenIssueToEditData) =>
        createAction(IssuesActions.OPEN_ISSUE_TO_EDIT, data);

    public static closeIssue = (data: ICloseIssueData) =>
        createAction(IssuesActions.CLOSE_ISSUE, data);
}
