import { createReducers } from "app-redux-utils";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";

import withTheme from "@material-ui/core/styles/withTheme";

import { configureApp } from "@config/configureApp";
import { getReducers } from "@config/redux/getReducers";
import { RootSaga } from "@config/saga/RootSaga";
import { State } from "@State";
import { AppProviderContainer } from "./AppProvider.container";
import { PageComponentRouter } from "./routing/PageComponentRouter";

export const { store, history } = configureApp(
    (history: History) => createReducers<State>(getReducers, history),
    new RootSaga()
);

const App: FunctionComponent = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppProviderContainer>
                    <PageComponentRouter/>
                </AppProviderContainer>
            </ConnectedRouter>
        </Provider>
    );
};

const appWithTheme: React.ComponentType = withTheme(App);
export { appWithTheme as App };
