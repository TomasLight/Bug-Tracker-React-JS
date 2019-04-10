import {UserDTO} from "@models/users/UserDTO";
import {createAction} from "@utils/actions/createAction";

export class UsersStoreActions {
    private static readonly PREFIX = "USERS_STORE_";

    public static readonly SET_USERS = UsersStoreActions.PREFIX + "SET_USERS";
    public static readonly SET_DISABLED = UsersStoreActions.PREFIX + "SET_DISABLED";

    public static setUsers = (users: Array<UserDTO>) => createAction(UsersStoreActions.SET_USERS, users);
    public static setDisabled = (disabled: boolean) => createAction(UsersStoreActions.SET_DISABLED, disabled);
}