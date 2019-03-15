import {UserDTO} from "@models/users/UserDTO";
import {createAction} from "@utils/actions/createAction";

export class UsersActionsToStore {
    private static readonly PREFIX = "USERS_STORE_";

    public static readonly SET_USERS = UsersActionsToStore.PREFIX + "SET_USERS";
    public static readonly SET_DISABLED = UsersActionsToStore.PREFIX + "SET_DISABLED";

    public static setUsers = (users: Array<UserDTO>) => createAction(UsersActionsToStore.SET_USERS, users);
    public static setDisabled = (disabled: boolean) => createAction(UsersActionsToStore.SET_DISABLED, disabled);
}