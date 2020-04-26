import { UserDto } from "@api/models/Users/responses/UserDto";
import { UsersApi } from "@api/UsersApi";
import { User } from "@app/Users/models/User";
import { UsersActions } from "@app/Users/redux/Users.actions";
import { ILoadUserData } from "@app/Users/redux/Users.actions.dataTypes";
import { UsersStore } from "@app/Users/redux/Users.store";
import { put } from "@redux-saga/core/effects";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";
import { AppAction } from "@utils/redux/AppAction";
import { SagaBase } from "@utils/saga/SagaBase";

export class UsersSaga extends SagaBase {
    private static* updateStore(partialStore: Partial<UsersStore>) {
        yield put(UsersActions.updateStore(partialStore));
    }

    public static* loadUsers(action: AppAction) {
        yield UsersSaga.updateStore({
            usersAreLoading: true,
        });

        const response: ApiResponse<UserDto[]> = yield UsersApi.getUsers();
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                usersAreLoading: false,
            });
            yield  SagaBase.displayClientError(response);
            return;
        }

        const users = response.data.map((dto: UserDto) => Mapper.map<User>(
            nameof<UserDto>(),
            nameof<User>(),
            dto
        ));

        yield UsersSaga.updateStore({
            users,
            usersAreLoading: false,
        });
    }

    public static* loadUser(action: AppAction<ILoadUserData>) {
        yield UsersSaga.updateStore({
            openedUserIsLoading: true,
        });

        const response: ApiResponse<UserDto> = yield UsersApi.getUserById(action.payload.userId);
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                openedUserIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const user = Mapper.map<User>(
            nameof<UserDto>(),
            nameof<User>(),
            response.data
        );

        yield UsersSaga.updateStore({
            openedUser: user,
            openedUserIsLoading: false,
        });
    }

    public static* loadCurrentUser(action: AppAction) {
        yield UsersSaga.updateStore({
            currentUserIsLoading: true,
        });

        const response: ApiResponse<UserDto> = yield UsersApi.getCurrentUser();
        if (response.hasError()) {
            yield UsersSaga.updateStore({
                currentUserIsLoading: false,
            });
            yield SagaBase.displayClientError(response);
            return;
        }

        const user = Mapper.map<User>(
            nameof<UserDto>(),
            nameof<User>(),
            response.data
        );

        yield UsersSaga.updateStore({
            currentUser: user,
            currentUserIsLoading: false,
        });
    }
}
