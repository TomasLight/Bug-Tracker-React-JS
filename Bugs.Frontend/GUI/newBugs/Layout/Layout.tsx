import * as React from "react";
import {NavBar} from "./NavBar/NavBar";

export interface ILayoutProps {
    children: any;

    redirect: (path: string) => void;
}

type Props = ILayoutProps;

export class Layout extends React.Component<Props> {
    render() {
        const {children, redirect} = this.props;
        return (
            <>
                <NavBar redirect={redirect} logout={() => {}}/>
                <div>
                    {children}
                </div>
            </>
        );
    }
}