import { withSnackbar, WithSnackbarProps } from "notistack";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Notification } from "./Notification";

export interface INotifierProps {
    notifications: Notification[];
}

export interface INotifierCallProps extends WithSnackbarProps {
    removeSnackbar: (key: string) => void;
}

type Props = INotifierProps & INotifierCallProps;

const Notifier: FunctionComponent<Props> = (props: Props) => {
    const {
        notifications = [],
        enqueueSnackbar,
        removeSnackbar,
    } = props;

    const [displayedNotifications, setDisplayedNotifications] = useState<Notification[]>([]);

    const showNotification = (notification: Notification) => {
        enqueueSnackbar(notification.message, notification.options);
    };

    const removeNotificationByKey = (notificationKey: string) => {
        removeSnackbar(notificationKey);
    };

    useEffect(() => {
        const storedNotifications: Notification[] = notifications;

        notifications.forEach((notification) => {
            const notificationAlreadyDisplayed = displayedNotifications.some((displayedNotification) =>
                displayedNotification.key === notification.key
            );
            if (notificationAlreadyDisplayed) {
                return;
            }

            showNotification(notification);

            // Keep track of snackbars that we've displayed
            storedNotifications.push(notification);

            removeNotificationByKey(notification.key);
        });
        setDisplayedNotifications(storedNotifications);
    }, [notifications]);

    return <></>;
};

const componentWithSnackbar = withSnackbar(Notifier);
export { componentWithSnackbar as Notifier };
