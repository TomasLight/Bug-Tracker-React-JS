import * as React from "react";

import {BugDTO} from "@models/bugs/BugDTO";
import {StatusEnum} from "@models/enums/StatusEnum";
import {Callback} from "@utils/interfaces/Callback";

import {BugItemContainer} from "./BugItem/BugItemContainer";

export interface IPageBugsProps {
    // apiUrl: string;
    bugs: Array<BugDTO>;
}

export interface IPageBugsCallProps {
    load: Callback;
    openBug: (userId: number) => void;
}

type Props = IPageBugsProps & IPageBugsCallProps;

class State {

}

export class PageBugs extends React.Component<Props, State> {
    // constructor(props: Props) {
    //     super(props);
    //     this.state = {statusNames: [], statusValues: [], bugList: [], renderEditBug: props.renderEditBug};
    // }

    componentDidMount(): void {
        this.props.load();
    }

    loadStatusNames() {
        // const thisClass = this;
        // Load(this.props.apiUrl + "/GetStatusNames", function (data) {
        //     thisClass.setState({statusNames: data});
        // });
    }

    loadStatusValues() {
        // const thisClass = this;
        // Load(this.props.apiUrl + "/GetStatusValues", function (data) {
        //     thisClass.setState({statusValues: data});
        // });
    }

    loadBugList() {
        // const thisClass = this;
        // Load(this.props.apiUrl + "/Get", function (data) {
        //     thisClass.setState({bugList: data});
        // });
    }

    componentWillMount() {
        this.loadStatusNames();
        this.loadStatusValues();
        this.loadBugList();
    }

    render() {
        const {bugs} = this.props;
        const statusNames: Array<string> = Object.keys(StatusEnum);

        return (
            <div className="bug-table">
                <div className="bug-header">
                    <div>
                        {
                            statusNames.map((name: string) => {
                                return (
                                    <div key={"status-name-" + name}>
                                        {name}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="bug-body">
                    {
                        statusNames.map((name: string) => {
                            const status: StatusEnum = StatusEnum[name];
                            return (
                                <div key={"status-value-" + status} className="bug-column">
                                    {
                                        bugs.map((bug: BugDTO) => {
                                            if (bug.status == status) {
                                                return (
                                                    <BugItemContainer key={"bug-" + bug.id} bug={bug}/>
                                                );
                                            }
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}