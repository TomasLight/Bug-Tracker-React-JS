var keyIndex = globalElementIndex++ || 100;

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: props.status, statusComment: props.statusComment };
    }
    render() {
        var s = this.state.status;
        if (s != null) {
            return <div>
                <label>new status:</label> {s}
                <p>
                    <label>comment:</label> {this.state.statusComment}
                </p>
            </div>;
        }
        else return <div></div>;
    }
}

class ReproSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reproSteps: props.reproSteps };
    }
    render() {
        var rs = this.state.reproSteps;
        if (rs != null) {
            return <div>
                <label>new description:</label> {rs}
            </div>;
        }
        else return <div></div>;
    }
}

class Priority extends React.Component {
    constructor(props) {
        super(props);
        this.state = { priority: props.priority };
    }
    render() {
        var prior = this.state.priority;
        if (prior != null) {
            return <div>
                <label>new priority:</label> {prior}
            </div>;
        }
        else return <div></div>;
    }
}

class Severity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { severity: props.severity };
    }
    render() {
        var sev = this.state.severity;
        if (sev != null) {
            return <div>
                <label>new severity:</label> {sev}
            </div>;
        }
        else return <div></div>;
    }
}

class SelectStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStatus: props.selectedStatus, onChangeCallback: props.onChangeCallback };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        var nextState = Object.assign({}, this.state, { selectedStatus: e.target.value });
        this.setState(nextState, function () {
            this.state.onChangeCallback(parseInt(nextState.selectedStatus));
        });
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

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = { history: props.history };
    }
    render() {
        return <div>
            <div>
                {this.state.history.dateUpdate}
            </div>
            <div>
                {this.state.history.updater.firstName} {this.state.history.updater.lastName}
            </div>
            <Status key={keyIndex++} status={this.state.history.status} statusComment={this.state.history.statusComment} />
            <ReproSteps key={keyIndex++} reproSteps={this.state.history.reproSteps} />
            <Priority key={keyIndex++} priority={this.state.history.priority} />
            <Severity key={keyIndex++} severity={this.state.history.severity} />
        </div>;
    }
}

class EditBug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl: props.apiUrl,
            renderBugList: props.renderBugList,
            bug: props.bug, // not use
            id: props.bug.id,
            name: props.bug.name,
            status: props.bug.status,
            statusComment: "",
            priority: props.bug.priority,
            severity: props.bug.severity,
            reproSteps: props.bug.reproSteps,
            histories: props.bug.histories
        };
        this.prevStatus = this.state.status;
        this.state.isNewStatus = false;
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }
    onChangeStatus(newValue) {
        let isNewStatus = newValue !== this.prevStatus;
        this.setState({ isNewStatus: isNewStatus });
    }
    render() {
        return <div>
            <div className="bug-info-container">
                <div>
                    <div className="bug-name">
                        <h4>
                            Bug #{this.state.id}
                        </h4>
                        <input key={keyIndex++} name="Name" defaultValue={this.state.name}/>
                    </div>
                    <div className="bug-status">
                        <label>
                            State
                        </label>
                        <SelectStatus key={keyIndex++} selectedStatus={this.state.status} onChangeCallback={this.onChangeStatus} />
                    </div>
                    <div id="commentDiv" style={{ display: this.state.isNewStatus ? 'unset' : 'none' }}>
                        <label>
                            Comment
                        </label>
                        <input key={keyIndex++} name="Name" defaultValue={this.state.statusComment} />
                    </div>
                    <div className="bug-priority">
                        <label>
                            Priority
                        </label>
                        <SelectPriority key={keyIndex++} selectedPriority={this.state.priority} />
                    </div>
                    <div className="bug-severity">
                        <label>
                            Severity
                        </label>
                        <SelectSeverity key={keyIndex++} selectedSeverity={this.state.severity} />
                    </div>
                </div>
                <div className="bug-description">
                    <h4>
                        Repro steps
                    </h4>
                    <textarea key={keyIndex++} name="ReproSteps" defaultValue={this.state.reproSteps}></textarea>
                </div>
                <div className="history-container">
                    <h4>
                        History changes
                    </h4>
                    <div>
                        {
                            this.state.histories.map(function (history) {
                                return <History key={keyIndex++} history={history} />;
                            })
                        }
                    </div>
                </div>
            </div>

            <div>
                <a onClick={this.state.renderBugList}>Back to List</a>
            </div>
        </div>;
    }
}