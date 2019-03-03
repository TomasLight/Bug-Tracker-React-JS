import {AnyAction} from "redux";

export interface IBugStore {

}

export const BugStore = (state: IBugStore, action: AnyAction): IBugStore => {
    switch(action.type) {

    }
    return state;
};