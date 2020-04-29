import { UsersActions } from "@app/Users/redux/Users.actions";
import { UsersStore } from "@app/Users/redux/Users.store";
import { Reducer } from "@utils/redux/Reducer";

export const UsersReducer = Reducer(new UsersStore(), UsersActions.UPDATE_STORE);
