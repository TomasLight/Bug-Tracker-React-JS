import * as React from "react";

export interface IStatusProps {
    status: string;
    statusComment: string;
}

type Props = IStatusProps;

export const Status: React.FunctionComponent<Props> = (props: Props) => {

    const {status, statusComment} = props;
    if (status == null) {
        return (
            <></>
        );
    }

    return (
        <div>
            <label>new status:</label> {status}
            <p>
                <label>comment:</label> {statusComment}
            </p>
        </div>
    );
};