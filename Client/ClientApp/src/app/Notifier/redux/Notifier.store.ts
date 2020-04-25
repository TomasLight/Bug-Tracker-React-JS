import { Notification } from "../Notification";

export class NotifierStore {
    public notifications: Notification[];

    constructor() {
        this.notifications = [];
    }
}
