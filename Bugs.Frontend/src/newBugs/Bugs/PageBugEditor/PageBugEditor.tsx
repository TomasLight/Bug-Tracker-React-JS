import * as React from "react";

import {Callback} from "utils/interfaces/Callback";

import {BugDTO} from "../../../models/bugs/BugDTO";
import {StatusEnum} from "../../../models/enums/StatusEnum";
import {StatusSelector} from "./StatusSelector/StatusSelector";
import {PrioritySelector} from "./PrioritySelector/PrioritySelector";
import {SeveritySelector} from "./SeveritySelector/SeveritySelector";
import {Histories} from "./Histories/Histories";

export interface IBugEditorProps {
    apiUrl: string;
    bug: BugDTO;
}

export interface IBugEditorCallProps {
    load: () => void;
    save: (bug: BugDTO) => void;
    renderBugList: Callback;
}

type Props = IBugEditorProps & IBugEditorCallProps;

class State {
    isNew: boolean;
    prevStatus: StatusEnum;
}

export class PageBugEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const {bug} = props;
        this.state = {
            isNew: bug.id === 0,
            prevStatus: bug.status
        };
    }

    componentDidMount() {
        this.props.load();
        // RenderHistories(this.state.bug.id);
    }

    onSave = () => {
        // const {isNew, prevStatus} = this.state;
        // const {bug, save, renderBugList} = this.props;
        //
        // if (!isNew && prevStatus != bug.status && this.refs.bugStatusComment.value == "") {
        //     alert("Заполните комментарий по изменению статуса");
        // } else {
        //     let priority = parseInt(this.refs.bugPriority.state.selectedPriority);
        //     let severity = parseInt(this.refs.bugSeverity.state.selectedSeverity);
        //     let status = parseInt(this.refs.bugStatus.state.selectedStatus);
        //
        //     const changedBug = new BugDTO();
        //     changedBug.id = bug.id;
        //     changedBug.name = this.refs.bugName.value;
        //     changedBug.reproSteps = this.refs.bugReproSteps.value;
        //     changedBug.priority = priority;
        //     changedBug.severity = severity;
        //     changedBug.status = status;
        //     changedBug.statusComment = this.refs.bugStatusComment.value;
        //     changedBug.creator = bug.creator;
        //     changedBug.dateCreate = bug.dateCreate;
        //
        //     save(changedBug);
        //     renderBugList();
        // }
    };

    render() {
        const {bug} = this.props;
        const {isNew, prevStatus} = this.state;

        const date = Date.parse(bug.dateCreate);
        const dateFormat = new Date(date).toDateString();
        return (
            <div>
                <div className="bug-info-container">
                    <div>
                        <div className="bug-name">
                            <div>
                                <label>Create by:</label> {bug.creator.firstName} {bug.creator.lastName}
                                <label>Date of create:</label> {dateFormat}
                            </div>
                            <h4>
                                Bug #{bug.id}
                            </h4>
                            <input className="bug-input" defaultValue={bug.name} ref="bugName"/>
                        </div>

                        <div className="bug-status">
                            <label>
                                State
                            </label>
                            <StatusSelector selectedStatus={bug.status}
                                            prevStatus={prevStatus}
                                            commentDiv={this.refs.statusComment}
                                            ref="bugStatus"
                                            isNew={isNew}/>
                        </div>

                        <div id="commentDiv" ref="statusComment" className="notDisplay">
                            <label>
                                Comment
                            </label>
                            <input className="bug-input" defaultValue={bug.statusComment} ref="bugStatusComment"/>
                        </div>

                        <div className="bug-priority">
                            <label>
                                Priority
                            </label>
                            <PrioritySelector selectedPriority={bug.priority} ref="bugPriority"/>
                        </div>

                        <div className="bug-severity">
                            <label>
                                Severity
                            </label>
                            <SeveritySelector selectedSeverity={bug.severity} ref="bugSeverity"/>
                        </div>
                    </div>

                    <div className="bug-description">
                        <h4>
                            Repro steps
                        </h4>
                        <textarea className="bug-input" defaultValue={bug.reproSteps} ref="bugReproSteps"/>
                    </div>

                    <button className="bug-button" onClick={this.onSave}>Save</button>

                    <div className="history-container">
                        <h4>
                            History changes
                        </h4>
                        <Histories histories={[]}/>
                    </div>
                </div>
            </div>
        );
    }
}


// function RenderHistories(bugId) {
//     return;
//     const url = _historiesPath + "?bugId=" + bugId;
//     TempAjax.Get(url, function (data) {
//         ReactDOM.render(
//             <Histories histories={data} />,
//             document.getElementById("historyContainer")
//         );
//     }, true);
// }