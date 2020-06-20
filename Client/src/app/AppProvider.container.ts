import { ComponentType } from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { State } from "@State";
import {
    AppProvider,
    IAppProviderCallProps,
    IAppProviderProps
} from "@shared/templates/AppProvider/AppProvider";
import { AppProviderActions } from "@shared/templates/AppProvider/redux/AppProvider.actions";

const mapStateToProps = (state: State): IAppProviderProps => {
    return {
        appIsInitialized: state.appProviderStore.initialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IAppProviderCallProps => {
    return {
        initialize: () => dispatch(AppProviderActions.initializedApp()),
    };
};

const AppProviderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppProvider);

export { AppProviderContainer };
