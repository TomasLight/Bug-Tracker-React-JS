import {AnyAction} from "redux";

export function createAction(actionType: string, payload: any = {}): AnyAction {
    return {
        type: actionType,
        payload: {
            ...payload
        }
    }
}