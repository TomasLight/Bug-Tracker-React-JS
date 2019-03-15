import {AnyAction} from "redux";
import {BugDTO} from "../../../../models/bugs/BugDTO";

export interface IBugEditorStore {
    bug: BugDTO;
}

const initialState: IBugEditorStore = {
    bug: new BugDTO()
};

export const BugEditorStore = (state: IBugEditorStore = initialState, action: AnyAction): IBugEditorStore => {
    switch(action.type) {

    }
    return state;
};