import {BugDTO} from "@models/bugs/BugDTO";

export class BugsStore {
    bugs: Array<BugDTO>;
    disabled: boolean;

    constructor() {
        this.disabled = false;
        this.bugs = [];
    };
}