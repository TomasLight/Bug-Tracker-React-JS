import {BugDTO} from "@models/bugs/BugDTO";

export class BugEditorStore {
    bug: BugDTO;
    disabled: boolean;

    public static initialState: BugEditorStore = {
        disabled: false,
        bug: new BugDTO()
    };
}