import { Issue } from "@app/Issues/models/Issue";

export class IssuesStore {
    public issues: Issue[];
    public issuesAreLoading: boolean;

    public openedIssue: Issue;
    public openedIssueIsSaving: boolean;

    constructor() {
        this.issues = [];
        this.issuesAreLoading = false;

        this.openedIssue = null;
        this.openedIssueIsSaving = false;
    }
}
