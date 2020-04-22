import { Issue } from "@app/Issues/models/Issue";

export class IssuesStore {
    public issues: Issue[];
    public issuesAreLoading: boolean;

    constructor() {
        this.issues = [];
        this.issuesAreLoading = false;
    }
}
