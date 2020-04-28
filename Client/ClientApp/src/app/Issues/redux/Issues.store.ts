import { Issue } from "@app/Issues/models/Issue";
import { IssueFilter } from "@app/Issues/models/IssueFilter";

export class IssuesStore {
    public issues: Issue[];
    public issuesAreLoading: boolean;

    public openedIssue: Issue;
    public openedIssueIsLoading: boolean;
    public openedIssueIsSaving: boolean;

    public filter: IssueFilter;

    constructor() {
        this.issues = [];
        this.issuesAreLoading = false;

        this.openedIssue = new Issue();
        this.openedIssueIsLoading = false;
        this.openedIssueIsSaving = false;

        this.filter = new IssueFilter();
    }
}
