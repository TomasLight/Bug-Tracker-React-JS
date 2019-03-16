import * as React from "react";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'

import {ConnectedRouter, routerMiddleware, push} from 'connected-react-router';
import {History} from "history";
import createBrowserHistory from "history/createBrowserHistory";

import {createReducers} from "@reducers";
import {UsersSagaWatcher} from "@core/Users/PageUsers/redux/saga/UsersSagaWatcher";
import {PageComponentRouter} from "./PageComponentRouter";

const history: History = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const store = createStore(
    createReducers(history),
    middleware
);
sagaMiddleware.run(UsersSagaWatcher.watchGetUsers);

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

