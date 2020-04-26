import { put } from "@redux-saga/core/effects";

import { ApiResponse } from "@utils/api/ApiResponse";
import { AppAction } from "@utils/redux/AppAction";
import { IssuesApi } from "@api/IssuesApi";
import { IssueDto } from "@api/models/issues/responses/IssueDto";
import { NotifierActions } from "@app/Notifier/redux/Notifier.actions";
import { Notification } from "@app/Notifier/Notification";
import { Mapper } from "@utils/mapping/Mapper";
import { SagaBase } from "@utils/saga/SagaBase";

import { Issue } from "../models/Issue";
import {
    ICloseIssueData,
    IOpenIssueToEditCreateData,
    IOpenIssueToEditData
} from "../redux/Issues.actions.dataTypes";
import { IssuesActions } from "../redux/Issues.actions";
import { IssuesStore } from "../redux/Issues.store";

export class IssuesSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<IssuesStore>) {
        yield put(IssuesActions.updateStore(partialStore));
    }

    public static* loadIssues(action: AppAction) {
        yield IssuesSaga.updateStore({
            issuesAreLoading: true,
        });

        const response: ApiResponse<IssueDto[]> = yield IssuesApi.getIssues();
        if (response.hasError()) {
            yield IssuesSaga.updateStore({
                issuesAreLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const issues: Issue[] = response.data.map((dto: IssueDto) => Mapper.map<Issue>(
            nameof<IssueDto>(),
            nameof<Issue>(),
            dto
        ));

        yield IssuesSaga.updateStore({
            issuesAreLoading: false,
            issues,
        });
    }

    public static* openIssueToCreate(action: AppAction<IOpenIssueToEditCreateData>) {
        action.payload.openIssuePanel();
    }

    public static* openIssueToEdit(action: AppAction<IOpenIssueToEditData>) {
        action.payload.openIssuePanel();
    }

    public static* closeIssue(action: AppAction<ICloseIssueData>) {
        action.payload.closeIssuePanel();
    }
}
