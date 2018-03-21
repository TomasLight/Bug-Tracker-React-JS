var keyIndex = globalElementIndex++ || 100;

class SelectStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStatus: props.selectedStatus, prevStatus: props.prevStatus, commentDiv: props.commentDiv };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        var nextState = Object.assign({}, this.state, { selectedStatus: e.target.value });
        this.setState(nextState);

        let stateInt = parseInt(nextState.selectedStatus);
        if (stateInt != this.state.prevStatus) {
            commentDiv.className = "";
        }
        else {
            commentDiv.className = "notDisplay";
        }
    }
    render() {
        var statusNames = Object.keys(enumStatus);
        return <select value={this.state.selectedStatus} onChange={this.onChange}>
            {
                statusNames.map(function (statusName) {
                    return <option key={keyIndex++} value={enumStatus[statusName]}>{statusName}</option>;
                })
            }
        </select>;
    }
}

class SelectPriority extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedPriority: props.selectedPriority };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        let nextState = Object.assign({}, this.state, { selectedPriority: e.target.value });
        this.setState(nextState);
    }
    render() {
        var priorityNames = Object.keys(enumUrgency);
        return <select value={this.state.selectedPriority} onChange={this.onChange}>
            {
                priorityNames.map(function (priorityName) {
                    return <option key={keyIndex++} value={enumUrgency[priorityName]}>{priorityName}</option>;
                })
            }
        </select>;
    }
}

class SelectSeverity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedSeverity: props.selectedSeverity };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        let nextState = Object.assign({}, this.state, { selectedSeverity: e.target.value });
        this.setState(nextState);
    }
    render() {
        var severityNames = Object.keys(enumCriticality);
        return <select value={this.state.selectedSeverity} onChange={this.onChange}>
            {
                severityNames.map(function (severityName) {
                    return <option key={keyIndex++} value={enumCriticality[severityName]}>{severityName}</option>;
                })
            }
        </select>;
    }
}

function SaveBug(id, name, reproSteps, priority, severity, status, statusComment) {
    let model = new BugModel(null);
    model.id = id;
    model.name = name;
    model.priority = priority;
    model.reproSteps = reproSteps;
    model.severity = severity;
    model.status = status;
    model.statusComment = statusComment;

    Send(model, _saveBug, function (data) {
        RenderBugList();
    }, true);
}

class EditBug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            renderBugList: props.renderBugList,
            id: props.bug.id,
            name: props.bug.name,
            status: props.bug.status,
            statusComment: "",
            priority: props.bug.priority,
            severity: props.bug.severity,
            reproSteps: props.bug.reproSteps,
            creator: props.bug.creator,
            dateCreate: props.bug.dateCreate
        };
        this.prevStatus = this.state.status;
        this.onSave = this.onSave.bind(this);
    }
    onSave() {
        let priority = parseInt(this.refs.bugPriority.state.selectedPriority);
        let severity = parseInt(this.refs.bugSeverity.state.selectedSeverity);
        let status = parseInt(this.refs.bugStatus.state.selectedStatus);
        SaveBug(this.state.id,
            this.refs.bugName.value,
            this.refs.bugReproSteps.value,
            priority,
            severity,
            status,
            this.refs.bugStatusComment.value);
    }
    componentDidMount() {
        RenderHistories(this.state.id);
    }
    render() {
        return <div>
            <div className="bug-info-container">
                <div>
                    <div className="bug-name">
                        <div>
                            <label>Create by:</label> {this.state.creator.firstName} {this.state.creator.lastName}
                            <label>Date of create:</label> {this.state.creator.dateCreate}
                        </div>
                        <h4>
                            Bug #{this.state.id}
                        </h4>
                        <input key={keyIndex++} name="Name" defaultValue={this.state.name} ref="bugName" />
                    </div>
                    <div className="bug-status">
                        <label>
                            State
                        </label>
                        <SelectStatus key={keyIndex++} selectedStatus={this.state.status} prevStatus={this.prevStatus} commentDiv={this.refs.statusComment} ref="bugStatus" />
                    </div>
                    <div id="commentDiv" ref="statusComment" className="notDisplay">
                        <label>
                            Comment
                        </label>
                        <input key={keyIndex++} name="Name" defaultValue={this.state.statusComment} ref="bugStatusComment" />
                    </div>
                    <div className="bug-priority">
                        <label>
                            Priority
                        </label>
                        <SelectPriority key={keyIndex++} selectedPriority={this.state.priority} ref="bugPriority" />
                    </div>
                    <div className="bug-severity">
                        <label>
                            Severity
                        </label>
                        <SelectSeverity key={keyIndex++} selectedSeverity={this.state.severity} ref="bugSeverity" />
                    </div>
                </div>

                <div className="bug-description">
                    <h4>
                        Repro steps
                    </h4>
                    <textarea key={keyIndex++} name="ReproSteps" defaultValue={this.state.reproSteps} ref="bugReproSteps" ></textarea>
                </div>

                <button onClick={this.onSave}>Save</button>

                <div className="history-container">
                    <h4>
                        History changes
                    </h4>
                    <div id="historyContainer"></div>
                </div>
            </div>

            <div>
                <a onClick={this.state.renderBugList}>Back to List</a>
            </div>
        </div>;
    }
}


class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: props.status, statusComment: props.statusComment };
    }
    render() {
        var status = this.state.status;
        if (status != null) {
            return <div>
                <label>new status:</label> {status}
                <p>
                    <label>comment:</label> {this.state.statusComment}
                </p>
            </div>;
        }
        else return <div></div>;
    }
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = { history: props.history };
    }
    render() {
        var history = this.state.history;
        return <div>
            <div>
                {history.dateUpdate}
            </div>
            <div>
                {history.updater.firstName} {history.updater.lastName}
            </div>
            <Status key={keyIndex++} status={history.status} statusComment={history.statusComment} />
        </div>;
    }
}

class Histories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { histories: props.histories };
    }
    render() {
        return <div>
            {
                this.state.histories.map(function (history) {
                    return <History key={keyIndex++} history={history} />;
                })
            }
        </div>
    }
}

function RenderHistories(bugId) {
    var url = _historiesPath + "?bugId=" + bugId;
    Load(url, function (data) {
        ReactDOM.render(
            <Histories histories={data} />,
            document.getElementById("historyContainer")
        );
    }, true);    
}