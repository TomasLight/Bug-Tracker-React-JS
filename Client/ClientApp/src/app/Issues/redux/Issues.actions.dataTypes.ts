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
