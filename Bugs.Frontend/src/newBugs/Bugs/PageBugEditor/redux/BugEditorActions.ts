import {BugDTO} from "@models/bugs/BugDTO";
import {createAction} from "@utils/actions/createAction";

export class BugEditorActions {
    private static readonly PREFIX = "BUG_EDITOR_";

    public static readonly GET_BUG = BugEditorActions.PREFIX + "GET_BUG";
    public static readonly CREATE_BUG = BugEditorActions.PREFIX + "CREATE_BUG";
    public static readonly UPDATE_BUG = BugEditorActions.PREFIX + "UPDATE_BUG";
    public static readonly DELETE_BUG = BugEditorActions.PREFIX + "DELETE_BUG";

    public static get = (bugId: number) => createAction(BugEditorActions.GET_BUG, bugId);
    public static create = (bug: BugDTO) => createAction(BugEditorActions.CREATE_BUG, bug);
    public static update = (bug: BugDTO) => createAction(BugEditorActions.UPDATE_BUG, bug);
    public static delete = (bugId: number) => createAction(BugEditorActions.DELETE_BUG, bugId);
}