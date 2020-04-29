import { INotification } from "../Notification";

export class NotifierStore {
    public notifications: INotification[];

    constructor() {
        this.notifications = [];
    }
}
