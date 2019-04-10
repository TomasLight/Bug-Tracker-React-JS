import {put} from "redux-saga/effects";

import {UsersApi} from "@api/UsersApi";
import {UsersStoreActions} from "@core/Users/PageUsers/redux/UsersStore.actions";
import {UserDTO} from "@models/users/UserDTO";
import {HttpResponse} from "@utils/requests/HttpResponse";

export class UsersSaga {
    private static* setDisabled(disabled: boolean) {
        yield put(UsersStoreActions.setDisabled(disabled));
    }

    private static* setUsers(users: Array<UserDTO>) {
        yield put(UsersStoreActions.setUsers(users));
    }

    public static* getUsers() {
        yield UsersSaga.setDisabled(true);
        const response: HttpResponse<Array<UserDTO>> = yield UsersApi.getUsers();
        if (response.data) {
            yield UsersSaga.setUsers(response.data);
        }
        else {
            console.log(response.errorMessage);
        }

        yield UsersSaga.setDisabled(false);
    }
}