import { AppAction } from "app-redux-utils";
import { IssuesApi } from "@api/IssuesApi";
import { IssuesStoreSelectors } from "@app/selectors/Issues.store.selectors";
import { User } from "@app/Users/models/User";
import { put } from "@redux-saga/core/effects";
import { UserSelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/UserSelectFieldOption";

import { ApiResponse } from "@utils/api/ApiResponse";
import { SagaBase } from "@utils/saga/SagaBase";
import { Issue } from "../models/Issue";

import { IssueFilter } from "../models/IssueFilter";
import { IssuesActions } from "../redux/Issues.actions";
import {
    ICloseIssueData,
    IFilterChangeData,
    IOpenIssueToEditCreateData,
    IOpenIssueToEditData,
    ISaveIssueData,
    IUserListChangeData
} from "../redux/Issues.actions.dataTypes";
import { IssuesStore } from "../redux/Issues.store";

export class IssuesSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<IssuesStore>) {
        yield put(IssuesActions.updateStore(partialStore));
    }

    public static* loadIssues(action: AppAction) {
        yield IssuesSaga.updateStore({
            issuesAreLoading: true,
        });

        const response: ApiResponse<Issue[]> = yield IssuesApi.getIssues();
        if (response.hasError()) {
            yield IssuesSaga.updateStore({
                issuesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield IssuesSaga.updateStore({
            issuesAreLoading: false,
            issues: response.data,
        });
    }

    public static* openIssueToCreate(action: AppAction<IOpenIssueToEditCreateData>) {
        yield IssuesSaga.updateStore({
            openedIssue: new Issue(),
        });
        action.payload.openIssuePanel();
    }

    public static* openIssueToEdit(action: AppAction<IOpenIssueToEditData>) {
        const { issueId, openIssuePanel } = action.payload;
        yield IssuesSaga.updateStore({
            openedIssueIsLoading: true,
        });

        yield IssuesSaga.preloadIssue(issueId);

        const response: ApiResponse<Issue> = yield IssuesApi.getIssue(issueId);
        if (response.hasError()) {
            yield IssuesSaga.updateStore({
                openedIssueIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield IssuesSaga.updateStore({
            openedIssue: response.data,
            openedIssueIsLoading: false,
        });

        openIssuePanel();

        yield IssuesSaga.updateIssueInStore(response.data);
    }

    private static* preloadIssue(issueId: number) {
        const issue: Issue = yield IssuesStoreSelectors.getIssueById(issueId);
        if (issue) {
            yield IssuesSaga.updateStore({
                openedIssue: issue,
            });
        }
    }

    private static* updateIssueInStore(changedIssue: Issue) {
        let storedIssues: Issue[] = yield IssuesStoreSelectors.issues();
        storedIssues = storedIssues.filter((issue: Issue) => issue.id !== changedIssue.id);
        storedIssues.push(changedIssue);

        yield IssuesSaga.updateStore({
            issues: storedIssues,
        });
    }

    public static* saveIssue(action: AppAction<ISaveIssueData>) {
        const { formValues, closeIssuePanel } = action.payload;

        const issue = new Issue(formValues);
        if (issue.isNew()) {
            yield IssuesSaga.createIssue(issue);
        }
        else {
            yield IssuesSaga.updateIssue(issue);
        }

        closeIssuePanel();
    }

    private static* createIssue(issue: Issue) {
        const response: ApiResponse<Issue> = yield IssuesApi.createIssue(issue);
        if (response.hasError()) {
            yield SagaBase.displayClientError(response);
            return;
        }

        yield IssuesSaga.updateIssueInStore(response.data);
    }

    private static* updateIssue(issue: Issue) {
        const response: ApiResponse<Issue> = yield IssuesApi.updateIssue(issue);
        if (response.hasError()) {
            yield SagaBase.displayClientError(response);
            return;
        }

        yield IssuesSaga.updateIssueInStore(response.data);
    }

    public static* closeIssue(action: AppAction<ICloseIssueData>) {
        action.payload.closeIssuePanel();
    }

    public static* changeIssueFilter(action: AppAction<IFilterChangeData>) {
        let filter: IssueFilter = yield IssuesStoreSelectors.filter();
        filter = filter.reassignReference();
        filter.toggleItemActivation(action.payload.filterItem);

        yield IssuesSaga.updateStore({
            filter,
        });
    }

    public static* changeUserList(action: AppAction<IUserListChangeData>) {
        const { users } = action.payload;

        const userOptions = users.map((user: User) => new UserSelectFieldOption(user));

        yield IssuesSaga.updateStore({
            assignOptions: userOptions,
            reporterOptions: userOptions,
        });
    }
}
