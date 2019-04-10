import {createAction} from "@utils/actions/createAction";

export class UsersSagaActions {
    private static readonly PREFIX = "USERS_";

    public static readonly GET_USERS = UsersSagaActions.PREFIX + "GET_USERS";

    public static get = () => createAction(UsersSagaActions.GET_USERS);
}