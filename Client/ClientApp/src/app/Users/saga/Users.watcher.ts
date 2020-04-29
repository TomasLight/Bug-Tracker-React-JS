import { UsersActions } from "@app/Users/redux/Users.actions";
import { UsersSaga } from "@app/Users/saga/Users.saga";
import { WatcherBase } from "@utils/saga/WatcherBase";

export class UsersWatcher extends WatcherBase {
    constructor() {
        super();
        this.watchLatest(
            UsersActions.LOAD_USERS,
            UsersSaga.loadUsers
        );
        this.watchLatest(
            UsersActions.LOAD_USER,
            UsersSaga.loadUser
        );
        this.watchLatest(
            UsersActions.LOAD_CURRENT_USER,
            UsersSaga.loadCurrentUser
        );
    }
}
