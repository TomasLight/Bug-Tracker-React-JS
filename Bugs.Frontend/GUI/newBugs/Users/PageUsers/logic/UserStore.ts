import {AnyAction} from "redux";
import {UserDTO} from "../../logic/models/UserDTO";

export interface IUserStore {
    users: Array<UserDTO>;
}

const initialState: IUserStore = {
    users: []
};

export const UserStore = (state: IUserStore = initialState, action: AnyAction): IUserStore => {
    switch(action.type) {

    }
    return state;
};