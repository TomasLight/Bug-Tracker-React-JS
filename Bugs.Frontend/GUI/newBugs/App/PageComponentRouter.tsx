import * as React from 'react';
import {Route, Switch} from "react-router";
import loadable from '@loadable/component';

export const urls = {
    login: "/"
};

export class PageComponentRouter {
    private static LoadingComponent = <div>loading...</div>;

    constructor(props: any) {

    }

    private readonly PageLogin = loadable(() => import("../PageLogin/PageLogin"), {
        fallback: PageComponentRouter.LoadingComponent
    });

    public GetRoutes() {
        const {PageLogin} = this;
        return (
            <Switch>
                <Route exact path={urls.login} component={() => <PageLogin/>}/>
            </Switch>
        );
    };
}