import * as React from "react";

export interface ILayoutProps {
    children: any;
}

type Props = ILayoutProps;

export class Layout extends React.Component<Props> {
    render() {
        const {children} = this.props;
        return (
            <div>
                <p>Layout</p>
                {children}
            </div>
        );
    }
}