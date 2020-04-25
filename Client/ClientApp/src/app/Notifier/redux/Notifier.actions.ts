import { createAction } from "@utils/redux/createAction";
import { Guid } from "@utils/Guid";
import { Notification } from "../Notification";

export class NotifierActions {
    public static readonly PREFIX = "NOTIFIER_";

    public static readonly ENQUEUE_SNACKBAR = NotifierActions.PREFIX + "ENQUEUE_SNACKBAR";
    public static readonly REMOVE_SNACKBAR = NotifierActions.PREFIX + "REMOVE_SNACKBAR";

    public static enqueueSnackbar = (notification: Notification) =>
        createAction(NotifierActions.ENQUEUE_SNACKBAR, {
            ...notification,
            key: Guid.generate(),
        });

    public static removeSnackbar = (key: string) =>
        createAction(NotifierActions.REMOVE_SNACKBAR, { key });
}
