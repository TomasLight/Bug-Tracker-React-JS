import * as React from 'react';
import loadable from '@loadable/component';


export class LoadableComponents {
    private static LoadingComponent = <div>loading...</div>;

    constructor(props: any) {

    }

    private readonly PageLoginComponent = loadable(() => import("../PageLogin/PageLogin"), {
        fallback: LoadableComponents.LoadingComponent
    });

    public PageLogin = () => <this.PageLoginComponent/>;
}