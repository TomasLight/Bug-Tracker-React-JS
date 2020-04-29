import { Reducer } from "@utils/redux/Reducer";

import { AppProviderActions } from "./AppProvider.actions";
import { AppProviderStore } from "./AppProvider.store";

export const AppProviderReducer = Reducer(new AppProviderStore(), AppProviderActions.UPDATE_STORE);
