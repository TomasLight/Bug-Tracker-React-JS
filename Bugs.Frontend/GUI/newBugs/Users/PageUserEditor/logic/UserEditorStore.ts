import {AnyAction} from "redux";
import {UserDTO} from "../../logic/models/UserDTO";

export interface IUserEditorStore {
    user: UserDTO;
}

const initialState: IUserEditorStore = {
    user: new UserDTO()
};

export const UserEditorStore = (state: IUserEditorStore = initialState, action: AnyAction): IUserEditorStore => {
    switch(action.type) {

    }
    return state;
};