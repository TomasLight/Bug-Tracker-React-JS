import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IssuesSaga } from "@app/Issues/saga/Issues.saga";
import { WatcherBase } from "@utils/saga/WatcherBase";

export class IssuesWatcher extends WatcherBase {
    constructor() {
        super();

        this.watchLatest(
            IssuesActions.LOAD_ISSUES,
            IssuesSaga.loadIssues
        );

        this.watchLatest(
            IssuesActions.OPEN_ISSUE_TO_CREATE,
            IssuesSaga.openIssueToCreate
        );
        this.watchLatest(
            IssuesActions.OPEN_ISSUE_TO_EDIT,
            IssuesSaga.openIssueToEdit
        );
        this.watchLatest(
            IssuesActions.CLOSE_ISSUE,
            IssuesSaga.closeIssue
        );
    }
}
