import { Reducer } from "app-redux-utils";

import { AppProviderActions } from "./AppProvider.actions";
import { AppProviderStore } from "./AppProvider.store";

export const AppProviderReducer = Reducer(new AppProviderStore(), AppProviderActions.UPDATE_STORE);
