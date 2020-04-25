import { Notification } from "@app/Notifier/Notification";
import { NotifierActions } from "@app/Notifier/redux/Notifier.actions";
import { put } from "@redux-saga/core/effects";
import { ApiResponse } from "@utils/api/ApiResponse";

export class SagaBase {
    protected static* displayClientError(response: ApiResponse) {
        const notification = new Notification(response);
        yield put(NotifierActions.enqueueSnackbar(notification));
    }
}
