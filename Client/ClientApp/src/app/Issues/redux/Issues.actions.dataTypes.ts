import { FilterItem } from "@app/Issues/models/FilterItem";

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
