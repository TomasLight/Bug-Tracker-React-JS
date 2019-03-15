import {createAction} from "@utils/actions/createAction";

export class BugsActions {
    private static readonly PREFIX = "BUGS_";

    public static readonly GET_BUGS = BugsActions.PREFIX + "GET_BUGS";

    public static get = () => createAction(BugsActions.GET_BUGS);

 }