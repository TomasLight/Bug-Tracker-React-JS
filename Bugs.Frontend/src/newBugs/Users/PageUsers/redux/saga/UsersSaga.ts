import {AnyAction} from "redux";
import {put} from "redux-saga/effects";

import {UsersApi} from "@api/UsersApi";
import {UsersActionsToStore} from "@core/Users/PageUsers/redux/UsersActionsToStore";
import {UserDTO} from "@models/users/UserDTO";
import {HttpResponse} from "@utils/requests/HttpResponse";

export class UsersSaga {
    private static* setDisabled(disabled: boolean) {
        yield put(UsersActionsToStore.setDisabled(disabled));
    }

    private static* setUsers(users: Array<UserDTO>) {
        yield put(UsersActionsToStore.setUsers(users));
    }

    public static* getUsers() {
        yield UsersSaga.setDisabled(true);
        try {
            const response: HttpResponse<Array<UserDTO>> = yield UsersApi.getUsers();
            yield UsersSaga.setUsers(response.data);
        }
        catch (e) {
            console.log(e);
        }
        yield UsersSaga.setDisabled(false);
    }
}