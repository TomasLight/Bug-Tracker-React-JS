import {BugDTO} from "@models/bugs/BugDTO";
import {createAction} from "@utils/actions/createAction";

export class BugEditorActionsToStore {
    private static readonly PREFIX = "BUG_EDITOR_STORE_";

    public static readonly SET_BUG = BugEditorActionsToStore.PREFIX + "SET_BUG";
    public static readonly SET_DISABLED = BugEditorActionsToStore.PREFIX + "SET_DISABLED";

    public static setBug = (bug: BugDTO) => createAction(BugEditorActionsToStore.SET_BUG, bug);
    public static setDisabled = (disabled: boolean) => createAction(BugEditorActionsToStore.SET_DISABLED, disabled);
}