import * as React from "react";
import {CriticallyEnum} from "../../../../models/enums/CriticallyEnum";

export interface ISeveritySelectorProps {
    selectedSeverity: CriticallyEnum
}

export interface ISeveritySelectorCallProps {

}

type Props = ISeveritySelectorProps & ISeveritySelectorCallProps;

class State {

}

export class SeveritySelector extends React.Component<Props, State> {
    onChange = (e) => {
        // let nextState = Object.assign({}, this.state, { selectedSeverity: e.target.value });
        // this.setState(nextState);
    };

    render() {
        const {selectedSeverity} = this.props;
        const severityNames = Object.keys(CriticallyEnum);

        return (
            <select className="selectpicker bug-select" value={selectedSeverity} onChange={this.onChange}>
                {
                    severityNames.map((severityName: string) => {
                        return (
                            <option key={"severity-" + CriticallyEnum[severityName]} value={CriticallyEnum[severityName]}>
                                {severityName}
                            </option>
                        );
                    })
                }
            </select>
        );
    }
}