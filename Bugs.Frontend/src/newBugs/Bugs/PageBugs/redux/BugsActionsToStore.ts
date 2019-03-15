import {BugDTO} from "@models/bugs/BugDTO";
import {createAction} from "@utils/actions/createAction";

export class BugsActionsToStore {
    private static readonly PREFIX = "BUGS_STORE_";

    public static readonly SET_BUGS = BugsActionsToStore.PREFIX + "SET_BUGS";
    public static readonly SET_DISABLED = BugsActionsToStore.PREFIX + "SET_DISABLED";

    public static setBugs = (bugs: Array<BugDTO>) => createAction(BugsActionsToStore.SET_BUGS, bugs);
    public static setDisabled = (disabled: boolean) => createAction(BugsActionsToStore.SET_DISABLED, disabled);
}