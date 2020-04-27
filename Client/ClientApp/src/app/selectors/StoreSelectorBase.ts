import { select } from "@redux-saga/core/effects";
import { State } from "@State";

export class StoreSelectorBase {
    protected static getState() {
        return select((state: State) => state);
    }
}
