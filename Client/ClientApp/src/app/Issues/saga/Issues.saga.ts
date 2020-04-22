import { put } from "@redux-saga/core/effects";

import { IssuesApi } from "@api/IssuesApi";
import { IIssueDto } from "@api/models/issues/responses/IssueDto";
import { Issue } from "@app/Issues/models/Issue";
import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IssuesStore } from "@app/Issues/redux/Issues.store";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";
import { AppAction } from "@utils/redux/AppAction";
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
        if (response.statusCode !== 200) {

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
