import {BugDTO} from "@models/bugs/BugDTO";

export class BugsStore {
    bugs: Array<BugDTO>;
    disabled: boolean;

    public static initialState: BugsStore = {
        disabled: false,
        bugs: []
    };
}