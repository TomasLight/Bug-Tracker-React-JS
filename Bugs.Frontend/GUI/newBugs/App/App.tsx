import * as React from "react";
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';


import {Route, Switch} from 'react-router';
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import createBrowserHistory from "history/createBrowserHistory";

import {LoadableComponents} from "./LoadableComponents";
import {createReducers} from "./logic/createReducers";
import {Layout} from "../Layout/Layout";

const history = createBrowserHistory();
const reducers = createReducers();
const store: any = createStore(connectRouter(history)(reducers), applyMiddleware(routerMiddleware(history)));

export const urls = {
    login: "/"
};

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
        const components = new LoadableComponents(this.props);
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route component={() =>
                            <Layout>
                                <Switch>
                                    <Route exact path={urls.login} component={components.PageLogin}/>
                                </Switch>
                            </Layout>
                        }/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

