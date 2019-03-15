import {UserDTO} from "@models/users/UserDTO";

export class UserEditorStore {
    public disabled: boolean;
    user: UserDTO;

    public static initialState: UserEditorStore = {
        disabled: false,
        user: new UserDTO()
    };
}