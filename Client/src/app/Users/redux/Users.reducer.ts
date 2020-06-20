import { UsersActions } from "@app/Users/redux/Users.actions";
import { UsersStore } from "@app/Users/redux/Users.store";
import { Reducer } from "app-redux-utils";

export const UsersReducer = Reducer(new UsersStore(), UsersActions.UPDATE_STORE);
