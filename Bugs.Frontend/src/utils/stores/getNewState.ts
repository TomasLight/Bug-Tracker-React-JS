import {AnyAction} from "redux";

export function getNewState<TStore>(state: TStore, action: AnyAction, updatedProperty: string): TStore {
    return {
        ...state,
        [updatedProperty]: action.payload
    };
}