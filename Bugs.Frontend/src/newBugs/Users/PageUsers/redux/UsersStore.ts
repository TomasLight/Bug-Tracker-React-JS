import {UserDTO} from "@models/users/UserDTO";

export class UsersStore {
    public disabled: boolean;
    public users: Array<UserDTO>;

    public static initialState: UsersStore = {
        disabled: false,
        users: []
    };
}