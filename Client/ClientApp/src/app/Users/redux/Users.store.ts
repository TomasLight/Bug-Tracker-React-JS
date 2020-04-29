import { User } from "@app/Users/models/User";

export class UsersStore {
    public users: User[];
    public usersAreLoading: boolean;

    public openedUser: User;
    public openedUserIsLoading: boolean;

    public currentUser: User;
    public currentUserIsLoading: boolean;

    constructor() {
        this.users = [];
        this.usersAreLoading = false;

        this.openedUser = null;
        this.openedUserIsLoading = false;

        this.currentUser = null;
        this.currentUserIsLoading = false;
    }
}
