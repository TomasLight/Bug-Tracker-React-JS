import * as React from "react";
import {StatusEnum} from "../../../../models/enums/StatusEnum";

export interface IStatusSelectorProps {
    selectedStatus: StatusEnum,
    prevStatus: StatusEnum,
    commentDiv: any,
    isNew: boolean;
}

export interface IStatusSelectorCallProps {

}

type Props = IStatusSelectorProps & IStatusSelectorCallProps;

class State {

}

export class StatusSelector extends React.Component<Props, State> {

    onChange = (e) => {
        const {prevStatus, commentDiv} = this.props;

        // const nextState = Object.assign({}, this.state, {selectedStatus: e.target.value});
        // this.setState(nextState);

        let stateInt = parseInt(e.target.value);
        if (stateInt != prevStatus) {
            commentDiv.className = "";
        } else {
            commentDiv.className = "notDisplay";
        }
    };

    render() {
        const {selectedStatus, prevStatus, isNew} = this.props;

        const statusNames = Object.keys(StatusEnum);
        const newStr = statusNames[StatusEnum.New - 1];
        const openedStr = statusNames[StatusEnum.Opened - 1];
        const resolvedStr = statusNames[StatusEnum.Resolved - 1];
        const closedStr = statusNames[StatusEnum.Closed - 1];

        switch (prevStatus) {
            case StatusEnum.New:
                if (isNew) {
                    return (
                        <select className="selectpicker bug-select" value={selectedStatus} onChange={this.onChange}>
                            <option value={StatusEnum.New}>{newStr}</option>
                        </select>
                    );
                } else {
                    return (
                        <select className="selectpicker bug-select" value={selectedStatus} onChange={this.onChange}>
                            <option value={StatusEnum.New}>{newStr}</option>
                            <option value={StatusEnum.Opened}>{openedStr}</option>
                        </select>
                    );
                }

            case StatusEnum.Opened:
                return (
                    <select className="selectpicker bug-select" value={selectedStatus} onChange={this.onChange}>
                        <option value={StatusEnum.Opened}>{openedStr}</option>
                        <option value={StatusEnum.Resolved}>{resolvedStr}</option>
                    </select>
                );

            case StatusEnum.Resolved:
                return (
                    <select className="selectpicker bug-select" value={selectedStatus} onChange={this.onChange}>
                        <option value={StatusEnum.Opened}>{openedStr}</option>
                        <option value={StatusEnum.Resolved}>{resolvedStr}</option>
                        <option value={StatusEnum.Closed}>{closedStr}</option>
                    </select>
                );

            default: //  StatusEnum.Closed
                return (
                    <select className="selectpicker bug-select" value={selectedStatus} onChange={this.onChange}>
                        <option value={StatusEnum.Closed}>{closedStr}</option>
                    </select>
                );
        }
    }
}