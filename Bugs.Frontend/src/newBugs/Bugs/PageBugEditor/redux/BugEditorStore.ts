import {BugDTO} from "@models/bugs/BugDTO";

export class BugEditorStore {
    bug: BugDTO;
    disabled: boolean;

    constructor() {
        this.disabled = false;
        this.bug = new BugDTO();
    };
}