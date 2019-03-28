import {takeLatest, ForkEffect} from "redux-saga/effects";

import {UsersActions} from "@core/Users/PageUsers/redux/saga/UsersActions";
import {UsersSaga} from "@core/Users/PageUsers/redux/saga/UsersSaga";

export class UsersSagaWatcher {
    public static* watchGetUsers(): IterableIterator<ForkEffect> {
        yield takeLatest(UsersActions.GET_USERS, UsersSaga.getUsers)
    }

    public static get wathcers(): Array<() => IterableIterator<ForkEffect>> {
        return [
            UsersSagaWatcher.watchGetUsers
        ];
    }
}