import { createAction } from "app-redux-utils";

import {
    ICloseIssueData, IFilterChangeData,
    IOpenIssueToEditCreateData,
    IOpenIssueToEditData, ISaveIssueData, IUserListChangeData
} from "@app/Issues/redux/Issues.actions.dataTypes";
import { IssuesStore } from "@app/Issues/redux/Issues.store";

export class IssuesActions {
    public static readonly PREFIX = "ISSUES_";
    public static readonly UPDATE_STORE = IssuesActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_ISSUES = IssuesActions.PREFIX + "LOAD_ISSUES";
    public static readonly OPEN_ISSUE_TO_CREATE = IssuesActions.PREFIX + "OPEN_ISSUE_TO_CREATE";
    public static readonly OPEN_ISSUE_TO_EDIT = IssuesActions.PREFIX + "OPEN_ISSUE_TO_EDIT";
    public static readonly SAVE_ISSUE = IssuesActions.PREFIX + "SAVE_ISSUE";
    public static readonly CLOSE_ISSUE = IssuesActions.PREFIX + "CLOSE_ISSUE";

    public static readonly CHANGE_ISSUE_FILTER = IssuesActions.PREFIX + "CHANGE_ISSUE_FILTER";
    public static readonly CHANGE_USERS_LIST = IssuesActions.PREFIX + "CHANGE_USERS_LIST";

    public static updateStore = (partialStore: Partial<IssuesStore>) =>
        createAction(IssuesActions.UPDATE_STORE, partialStore);

    public static loadIssues = () => createAction(IssuesActions.LOAD_ISSUES);

    public static openIssueToCreate = (data: IOpenIssueToEditCreateData) =>
        createAction(IssuesActions.OPEN_ISSUE_TO_CREATE, data);

    public static openIssueToEdit = (data: IOpenIssueToEditData) =>
        createAction(IssuesActions.OPEN_ISSUE_TO_EDIT, data);

    public static saveIssue = (data: ISaveIssueData) =>
        createAction(IssuesActions.SAVE_ISSUE, data);

    public static closeIssue = (data: ICloseIssueData) =>
        createAction(IssuesActions.CLOSE_ISSUE, data);

    public static changeIssueFilter = (data: IFilterChangeData) =>
        createAction(IssuesActions.CHANGE_ISSUE_FILTER, data);

    public static changeUserList = (data: IUserListChangeData) =>
        createAction(IssuesActions.CHANGE_USERS_LIST, data);
}
