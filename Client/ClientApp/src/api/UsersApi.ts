import { UserDto } from "@api/models/Users/responses/UserDto";
import { ApiBase } from "@utils/api/ApiBase";

export class UsersApi extends ApiBase {
    public static getUsers() {
        return this.get<UserDto[]>("/api/users");
    }

    public static getUserById(userId: number) {
        return this.get<UserDto>(`/api/users/${userId}`);
    }

    public static getCurrentUser() {
        return this.get<UserDto>("/api/users/current");
    }
}
