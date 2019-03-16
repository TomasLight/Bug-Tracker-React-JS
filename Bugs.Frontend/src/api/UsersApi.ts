import {call} from "redux-saga/effects";

import {UserDTO} from "@models/users/UserDTO";
import {Http} from "@utils/requests/Http";

export class UsersApi {
    public static getUsers() {
        return call(Http.get, "api/users");
    }

    public static getUser(userId: number) {
        return call(Http.get, `api/users/${userId}`);
    }

    public static postUser(user: UserDTO) {
        return call(Http.post, "api/users", user);
    }

    public static putUser(user: UserDTO) {
        return call(Http.put, `api/users/${user.id}`, user);
    }

    public static deleteUser(userId: number) {
        return call(Http.delete, `api/users/${userId}`);
    }
}