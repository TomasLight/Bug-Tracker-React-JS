import * as React from 'react';
import {Route, RouteComponentProps, Switch} from "react-router";
import loadable from '@loadable/component';

import {Layout} from "../Layout/Layout";

export const urls = {
    loginPath: "/",
    bugListPath: "/bugs",
    userListPath: "/users",
    editUserPath: "/users/:id",
    editBugPath: "/bugs/:id",

    editUserLink: (userId: number) => "/users/" + userId,
    editBugLink: (bugId: number) => "/bugs/" + bugId
};

export interface IPageComponentRouterProps {

}

export class PageComponentRouter extends React.Component<IPageComponentRouterProps> {
    private static LoadingComponent = <div>loading...</div>;

    private readonly PageLogin = loadable(() => import("../PageLogin/PageLogin"), {
        fallback: PageComponentRouter.LoadingComponent
    });

    private readonly PageBugs = loadable(() => import("../Bugs/PageBugs/PageBugs"), {
        fallback: PageComponentRouter.LoadingComponent
    });

    private readonly PageBugEditor = loadable(() => import("../Bugs/PageBugEditor/PageBugEditorContainer"), {
        fallback: PageComponentRouter.LoadingComponent
    });

    render() {
        const {} = this.props;
        const {
            PageLogin,
            PageBugs,
            PageBugEditor
        } = this;

        return (
            <Layout>
                <Switch>
                    <Route exact path={urls.loginPath} component={() => <PageLogin/>}/>
                    <Route exact path={urls.bugListPath} component={() => <PageBugs/>}/>
                    <Route exact path={urls.editBugPath}
                           component={(props: RouteComponentProps<{id: string}>) => <PageBugEditor/>}/>
                </Switch>
            </Layout>
        );
    };
}