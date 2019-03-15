import * as React from "react";
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';

import {ConnectedRouter, routerMiddleware, push} from 'connected-react-router';
import {History} from "history";
import createBrowserHistory from "history/createBrowserHistory";

import {createReducers} from "@reducers";
import {PageComponentRouter} from "./PageComponentRouter";

const history: History = createBrowserHistory();
const middleware = applyMiddleware(routerMiddleware(history));
const store = createStore(
    createReducers(history),
    middleware
);

interface IAppProps {

}

type Props = IAppProps;
class State {

}

export class App extends React.Component<Props, State> {
    render () {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <PageComponentRouter/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

