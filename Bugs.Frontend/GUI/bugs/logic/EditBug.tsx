import * as React from "react";
import {Bug} from "./models/Bug";
import {TempAjax} from "../../utils/temp/TempAjax";
import {Status} from "./models/Status";

interface IEditBugProps {
    apiUrl: string;
    statusComment: string;
    bug: Bug;
}

interface IEditBugCallProps {
    renderBugList: () => void;
}

type Props = IEditBugProps & IEditBugCallProps;

class State {
    isNew: boolean;
    prevStatus: Status;
}

export class EditBug extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const {bug} = props;
        this.state = {
            isNew: bug.id === 0,
            prevStatus: bug.status
        };
    }

    componentDidMount() {
        RenderHistories(this.state.bug.id);
    }
    
    onSave = () => {
        const {isNew, prevStatus} = this.state;
        const {bug} = this.props;
        
        if (!isNew && prevStatus != bug.status && this.refs.bugStatusComment.value == "") {
            alert("Заполните комментарий по изменению статуса");
        }
        else {
            let priority = parseInt(this.refs.bugPriority.state.selectedPriority);
            let severity = parseInt(this.refs.bugSeverity.state.selectedSeverity);
            let status = parseInt(this.refs.bugStatus.state.selectedStatus);
            SaveBug(bug.id,
                this.refs.bugName.value,
                this.refs.bugReproSteps.value,
                priority,
                severity,
                status,
                this.refs.bugStatusComment.value,
                bug.creator,
                bug.dateCreate,
                bug.renderBugList);
        }
    };
    
    render() {
        var date = Date.parse(this.state.dateCreate);
        var dateFormat = new Date(date).toDateString();
        return <div>
            <div className="bug-info-container">
                <div>
                    <div className="bug-name">
                        <div>
                            <label>Create by:</label> {this.state.creator.firstName} {this.state.creator.lastName}
                            <label>Date of create:</label> {dateFormat}
                        </div>
                        <h4>
                            Bug #{this.state.id}
                        </h4>
                        <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.name} ref="bugName" />
                    </div>
                    <div className="bug-status">
                        <label>
                            State
                        </label>
                        <SelectStatus key={globalElementIndex++} selectedStatus={this.state.status} prevStatus={this.prevStatus}
                                      commentDiv={this.refs.statusComment} ref="bugStatus" disable={this.state.id == 0} isNew={this.isNew}/>
                    </div>
                    <div id="commentDiv" ref="statusComment" className="notDisplay">
                        <label>
                            Comment
                        </label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.statusComment} ref="bugStatusComment" />
                    </div>
                    <div className="bug-priority">
                        <label>
                            Priority
                        </label>
                        <SelectPriority key={globalElementIndex++} selectedPriority={this.state.priority} ref="bugPriority" />
                    </div>
                    <div className="bug-severity">
                        <label>
                            Severity
                        </label>
                        <SelectSeverity key={globalElementIndex++} selectedSeverity={this.state.severity} ref="bugSeverity" />
                    </div>
                </div>

                <div className="bug-description">
                    <h4>
                        Repro steps
                    </h4>
                    <textarea className="bug-input" key={globalElementIndex++} defaultValue={this.state.reproSteps} ref="bugReproSteps"></textarea>
                </div>

                <button className="bug-button" onClick={this.onSave}>Save</button>

                <div className="history-container">
                    <h4>
                        History changes
                    </h4>
                    <div id="historyContainer"></div>
                </div>
            </div>
        </div>;
    }
}



function RenderHistories(bugId) {
    return;
    const url = _historiesPath + "?bugId=" + bugId;
    TempAjax.Get(url, function (data) {
        ReactDOM.render(
            <Histories histories={data} />,
            document.getElementById("historyContainer")
        );
    }, true);
}