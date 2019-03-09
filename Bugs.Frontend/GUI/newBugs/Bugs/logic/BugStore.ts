import {AnyAction} from "redux";

export interface IBugStore {

}

const initialState: IBugStore = {

};

export const BugStore = (state: IBugStore = initialState, action: AnyAction): IBugStore => {
    switch(action.type) {

    }
    return state;
};