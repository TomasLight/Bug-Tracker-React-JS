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
        const {data, errorMessage} = yield UsersApi.getUsers();
        debugger;
        if (data) {
            yield UsersSaga.setUsers(data);
        }
        else {
            console.log(errorMessage);
        }

        yield UsersSaga.setDisabled(false);
    }
}