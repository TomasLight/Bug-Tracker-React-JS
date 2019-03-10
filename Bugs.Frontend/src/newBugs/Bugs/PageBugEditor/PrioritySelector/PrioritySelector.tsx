import * as React from "react";
import {UrgencyEnum} from "../../logic/models/UrgencyEnum";

export interface IPrioritySelectorProps {
    selectedPriority: UrgencyEnum;
}

export interface IPrioritySelectorCallProps {

}

type Props = IPrioritySelectorProps & IPrioritySelectorCallProps;

class State {

}

export class PrioritySelector extends React.Component<Props, State> {
    onChange = (e) => {
        // let nextState = Object.assign({}, this.state, { selectedPriority: e.target.value });
        // this.setState(nextState);
    };

    render() {
        const {selectedPriority} = this.props;
        const priorityNames = Object.keys(UrgencyEnum);

        return (
            <select className="selectpicker bug-select" value={selectedPriority} onChange={this.onChange}>
                {
                    priorityNames.map((priorityName: string) => {
                        return (
                            <option key={"urgency-" + UrgencyEnum[priorityName]} value={UrgencyEnum[priorityName]}>
                                {priorityName}
                            </option>
                        );
                    })
                }
            </select>
        );
    }
}