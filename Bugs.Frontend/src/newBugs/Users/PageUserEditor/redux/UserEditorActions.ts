import {UserDTO} from "@models/users/UserDTO";
import {createAction} from "@utils/actions/createAction";

export class UserEditorActions {
    private static readonly PREFIX = "USER_EDITOR_";

    public static readonly GET_USER = UserEditorActions.PREFIX + "GET_USER";
    public static readonly CREATE_USER = UserEditorActions.PREFIX + "CREATE_USER";
    public static readonly UPDATE_USER = UserEditorActions.PREFIX + "UPDATE_USER";
    public static readonly DELETE_USER = UserEditorActions.PREFIX + "DELETE_USER";

    public static get = (userId: number) => createAction(UserEditorActions.GET_USER, userId);
    public static create = (user: UserDTO) => createAction(UserEditorActions.CREATE_USER, user);
    public static update = (user: UserDTO) => createAction(UserEditorActions.UPDATE_USER, user);
    public static delete = (userId: number) => createAction(UserEditorActions.DELETE_USER, userId);
}