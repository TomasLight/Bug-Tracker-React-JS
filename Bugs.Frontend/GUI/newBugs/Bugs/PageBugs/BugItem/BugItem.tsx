import * as React from "react";
import {BugDTO} from "../../logic/models/BugDTO";

export interface IBugItemProps {
    bug: BugDTO;
}

export interface IBugItemCallProps {
    onClick: (bugId: number) => void;
}

type Props = IBugItemProps & IBugItemCallProps;

export const BugItem: React.FunctionComponent<Props> = (props: Props) => {
    const {bug, onClick} = props;
    const date = Date.parse(bug.dateCreate);
    const dateFormat = new Date(date).toDateString();
    return (
        <div>
            <div className='bug-cell' onClick={() => onClick(bug.id)}>
                <div># {bug.id}</div>
                <div>{bug.name}</div>
                <div>
                    <label style={{fontStyle: 'italic'}}>
                        {bug.creator.firstName} {bug.creator.lastName}
                    </label>
                </div>
                <div>{dateFormat}</div>
            </div>
        </div>
    );
};