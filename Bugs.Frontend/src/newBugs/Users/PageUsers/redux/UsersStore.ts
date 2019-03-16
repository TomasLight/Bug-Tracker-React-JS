import {UserDTO} from "@models/users/UserDTO";

export class UsersStore {
    public disabled: boolean;
    public users: Array<UserDTO>;

    constructor() {
        this.disabled = false;
        this.users = [];
    };
}