import { FilterItem } from "@app/Issues/models/FilterItem";
import { IIssue } from "@app/Issues/models/Issue";

export interface IFilterChangeData {
    filterItem: FilterItem;
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
