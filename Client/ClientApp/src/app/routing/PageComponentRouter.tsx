import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";

import { Layout } from "@app/Layout/Layout";
import { IssuesPageContainer } from "@app/Issues/IssuesPage.container";

import { appUrls } from "./appUrls";

const PageComponentRouter: FunctionComponent = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path={appUrls.rootPath} component={IssuesPageContainer}/>
            </Switch>
        </Layout>
    );
};

export { PageComponentRouter };
