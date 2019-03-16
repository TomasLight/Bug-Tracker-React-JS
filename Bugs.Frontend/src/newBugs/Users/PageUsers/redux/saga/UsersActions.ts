import {createAction} from "@utils/actions/createAction";

export class UsersActions {
    private static readonly PREFIX = "USERS_";

    public static readonly GET_USERS = UsersActions.PREFIX + "GET_USERS";

    public static get = () => createAction(UsersActions.GET_USERS);
}