import {AnyAction} from "redux";
import {BugDTO} from "../../../models/bugs/BugDTO";

export interface IBugStore {
    bugs: Array<BugDTO>;
}

const initialState: IBugStore = {
    bugs: []
};

export const BugStore = (state: IBugStore = initialState, action: AnyAction): IBugStore => {
    switch(action.type) {

    }
    return state;
};