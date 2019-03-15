import {UserDTO} from "@models/users/UserDTO";
import {createAction} from "@utils/actions/createAction";

export class UserEditorActionsToStore {
    private static readonly PREFIX = "USER_EDITOR_STORE_";

    public static readonly SET_USER = UserEditorActionsToStore.PREFIX + "SET_USER";
    public static readonly SET_DISABLED = UserEditorActionsToStore.PREFIX + "SET_DISABLED";

    public static setUser = (user: UserDTO) => createAction(UserEditorActionsToStore.SET_USER, user);
    public static setDisabled = (disabled: boolean) => createAction(UserEditorActionsToStore.SET_DISABLED, disabled);
}