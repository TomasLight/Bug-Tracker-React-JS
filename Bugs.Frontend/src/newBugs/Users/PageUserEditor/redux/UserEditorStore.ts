import {UserDTO} from "@models/users/UserDTO";

export class UserEditorStore {
    public disabled: boolean;
    user: UserDTO;

    constructor() {
        this.disabled = false;
        this.user = new UserDTO();
    };
}