import {call, CallEffect} from "redux-saga/effects";

import {UserDTO} from "@models/users/UserDTO";
import {Http} from "@utils/requests/Http";
import {HttpResponse} from "@utils/requests/HttpResponse";

export class UsersApi {
    public static getUsers() {
        return call(Http.get, "api/users");
    }

    public static getUser(userId: number): CallEffect {
        return call(Http.get, `api/users/${userId}`);
    }

    public static postUser(user: UserDTO): CallEffect {
        return call(Http.post, "api/users", user);
    }

    public static putUser(user: UserDTO): CallEffect {
        return call(Http.put, `api/users/${user.id}`, user);
    }

    public static deleteUser(userId: number): CallEffect {
        return call(Http.delete, `api/users/${userId}`);
    }
}