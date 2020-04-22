import { put } from "@redux-saga/core/effects";

import { ApiResponse } from "@utils/api/ApiResponse";
import { AppAction } from "@utils/redux/AppAction";
import { DebugApi } from "@api/DebugApi";
import { IssuesApi } from "@api/IssuesApi";
import { IIssueDto } from "@api/models/issues/responses/IssueDto";
import { Issue } from "@app/Issues/models/Issue";
import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { NotifierActions } from "@app/Notifier/redux/Notifier.actions";
import { Notification } from "@app/Notifier/Notification";
import { Mapper } from "@utils/mapping/Mapper";
import { SagaBase } from "@utils/saga/SagaBase";

export class IssuesSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<IssuesStore>) {
        yield put(IssuesActions.updateStore(partialStore));
    }

    public static* loadIssues(action: AppAction) {
        yield IssuesSaga.updateStore({
            issuesAreLoading: true,
        });

        const response: ApiResponse<IIssueDto[]> = yield IssuesApi.getIssues();
        // const response: ApiResponse<IIssueDto[]> = yield DebugApi.getError();
        // debugger;
        if (response.hasError()) {
            yield IssuesSaga.updateStore({
                issuesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const issues: Issue[] = response.data.map((dto: IIssueDto) => Mapper.map<Issue>(
            nameof<IIssueDto>(),
            nameof<Issue>(),
            dto
        ));

        yield IssuesSaga.updateStore({
            issuesAreLoading: false,
            issues,
        });
    }
}
