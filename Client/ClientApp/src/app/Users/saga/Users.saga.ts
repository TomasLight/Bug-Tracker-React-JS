import { AppAction } from "app-redux-utils";
import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { put } from "@redux-saga/core/effects";

import { UsersApi } from "@api/UsersApi";
import { User } from "@app/Users/models/User";
import { UsersActions } from "@app/Users/redux/Users.actions";
import { ILoadUserData } from "@app/Users/redux/Users.actions.dataTypes";
import { UsersStore } from "@app/Users/redux/Users.store";
import { ApiResponse } from "@utils/api/ApiResponse";
import { SagaBase } from "@utils/saga/SagaBase";

export class UsersSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<UsersStore>) {
        yield put(UsersActions.updateStore(partialStore));
    }

    public static* loadUsers(action: AppAction) {
        yield UsersSaga.updateStore({
            usersAreLoading: true,
        });

        const response: ApiResponse<User[]> = yield UsersApi.getUsers();
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                usersAreLoading: false,
            });
            yield  SagaBase.displayClientError(response);
            return;
        }

        yield UsersSaga.updateStore({
            users: response.data,
            usersAreLoading: false,
        });

        yield put(IssuesActions.changeUserList({
            users: response.data,
        }));
    }

    public static* loadUser(action: AppAction<ILoadUserData>) {
        yield UsersSaga.updateStore({
            openedUserIsLoading: true,
        });

        const response: ApiResponse<User> = yield UsersApi.getUserById(action.payload.userId);
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                openedUserIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield UsersSaga.updateStore({
            openedUser: response.data,
            openedUserIsLoading: false,
        });
    }

    public static* loadCurrentUser(action: AppAction) {
        yield UsersSaga.updateStore({
            currentUserIsLoading: true,
        });

        const response: ApiResponse<User> = yield UsersApi.getCurrentUser();
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                currentUserIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        yield UsersSaga.updateStore({
            currentUser: response.data,
            currentUserIsLoading: false,
        });
    }
}
