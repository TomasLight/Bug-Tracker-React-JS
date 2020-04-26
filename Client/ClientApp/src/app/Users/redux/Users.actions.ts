import { ILoadUserData } from "@app/Users/redux/Users.actions.dataTypes";
import { UsersStore } from "@app/Users/redux/Users.store";
import { createAction, createActionWithCallback } from "@utils/redux/createAction";

export class UsersActions {
    public static readonly PREFIX = "USERS_";
    public static readonly UPDATE_STORE = UsersActions.PREFIX + "UPDATE_STORE";

    public static readonly LOAD_USERS = UsersActions.PREFIX + "LOAD_USERS";
    public static readonly LOAD_USER = UsersActions.PREFIX + "LOAD_USER";
    public static readonly LOAD_CURRENT_USER = UsersActions.PREFIX + "LOAD_CURRENT_USER";

    public static updateStore = (partialStore: Partial<UsersStore>) =>
        createAction(UsersActions.UPDATE_STORE, partialStore);

    public static loadUsers = () => createActionWithCallback(UsersActions.LOAD_USERS);

    public static loadUser = (data: ILoadUserData) =>
        createAction(UsersActions.LOAD_USER, data);

    public static loadCurrentUser = () => createActionWithCallback(UsersActions.LOAD_CURRENT_USER);
}
