import { Issue } from "@app/Issues/models/Issue";
import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { StoreSelectorBase } from "@app/selectors/StoreSelectorBase";
import { State } from "@State";

export class IssuesStoreSelectors extends StoreSelectorBase {
    public static* getStore() {
        const state: State = yield StoreSelectorBase.getState();
        return state.issuesStore;
    }

    public static* filter() {
        const store: IssuesStore = yield IssuesStoreSelectors.getStore();
        return store.filter;
    }

    public static filteredIssues(state: State): Issue[] {
        const store: IssuesStore = state.issuesStore;

        const filter = store.filter;
        if (!filter.any()) {
            return store.issues;
        }

        const issueTypeContains = filter.getIssueTypeFilter();
        const priorityContains = filter.getPriorityFilter();

        const issues: Issue[] = store.issues.filter((issue: Issue) => {
            if (!issueTypeContains(issue.type)) {
                return false;
            }

            if (!priorityContains(issue.priority)) {
                return false;
            }

            return true;
        });

        return issues;
    }
}
