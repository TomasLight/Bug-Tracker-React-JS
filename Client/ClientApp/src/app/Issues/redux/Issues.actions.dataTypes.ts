import { FilterItem } from "@app/Issues/models/FilterItem";
import { IIssue } from "@app/Issues/models/Issue";
import { User } from "@app/Users/models/User";

export interface IFilterChangeData {
    filterItem: FilterItem;
}

export interface IUserListChangeData {
    users: User[];
}

export interface IOpenIssueToEditCreateData {
    openIssuePanel: () => void;
}

export interface IOpenIssueToEditData {
    issueId: number;
    openIssuePanel: () => void;
}

export interface ICloseIssueData {
    closeIssuePanel: () => void;
}

export interface ISaveIssueData {
    formValues: IIssue;
    closeIssuePanel: () => void;
}
