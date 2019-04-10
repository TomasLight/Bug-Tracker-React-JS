import {takeLatest, ForkEffect} from "redux-saga/effects";

import {UsersSagaActions} from "@core/Users/PageUsers/redux/saga/UsersSaga.actions";
import {UsersSaga} from "@core/Users/PageUsers/redux/saga/UsersSaga";

export class UsersSagaWatcher {
    public static* watchGetUsers(): IterableIterator<ForkEffect> {
        yield takeLatest(UsersSagaActions.GET_USERS, UsersSaga.getUsers)
    }

    public static get wathcers(): Array<() => IterableIterator<ForkEffect>> {
        return [
            UsersSagaWatcher.watchGetUsers
        ];
    }
}