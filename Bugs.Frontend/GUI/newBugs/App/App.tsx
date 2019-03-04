import * as React from "react";
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';

import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import {History} from "history";
import createBrowserHistory from "history/createBrowserHistory";

import {PageComponentRouter} from "./PageComponentRouter";
import {createReducers} from "./logic/createReducers";
import {Layout} from "../Layout/Layout";

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
    constructor(props: Props) {
        super(props);
    }
    render () {
        const pageComponentRouter = new PageComponentRouter(this.props);
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Layout>
                        {pageComponentRouter.GetRoutes()}
                    </Layout>
                </ConnectedRouter>
            </Provider>
        );
    }
}

