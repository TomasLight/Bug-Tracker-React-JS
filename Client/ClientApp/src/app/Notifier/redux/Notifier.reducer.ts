import { Translate } from "@utils/translates/Translate";
import { AppAction } from "app-redux-utils";

import { Notification } from "../Notification";
import { NotifierActions } from "./Notifier.actions";
import { NotifierStore } from "./Notifier.store";

export const NotifierReducer = (
    state: NotifierStore = new NotifierStore(),
    action: AppAction<Notification>
): NotifierStore => {
    switch (action.type) {
        case NotifierActions.REMOVE_SNACKBAR:
            const notifications = state.notifications.filter(
                (notification) => notification.key !== action.payload.key
            );

            return { notifications };

        case NotifierActions.ENQUEUE_SNACKBAR: {
            if (action.payload.message instanceof Error) {
                action.payload.message = action.payload.message.message;
            }
            else if (typeof action.payload.message !== "string") {
                action.payload.message = Translate.getString("Oops! Something was wrong...");
            }

            const notifications = [
                ...state.notifications,
                action.payload,
            ];

            return { notifications };
        }

        default:
            return state;
    }
};
