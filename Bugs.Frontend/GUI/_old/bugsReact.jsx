import {Bug} from "../bugs/logic/models/Bug";

class ShortBug extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bug: new Bug(props.bug) };
        this.onEditBug = this.onEditBug.bind(this);
    }
    onEditBug() {
        this.props.onClick(this.state.bug.id);
    }
    render() {
        var date = Date.parse(this.state.bug.dateCreate);
        var dateFormat = new Date(date).toDateString();
        return (<div>
            <div className='bug-cell' onClick={this.onEditBug}>
                <div># {this.state.bug.id}</div>
                <div>{this.state.bug.name}</div>
                <div><label style={{ fontStyle: 'italic' }}>{this.state.bug.creator.firstName} {this.state.bug.creator.lastName}</label></div>
                <div>{dateFormat}</div>
            </div>
        </div>);
    }
}
var globalElementIndex = 1;

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { statusNames: [], statusValues: [], bugList: [], renderEditBug: props.renderEditBug };
    }
    loadStatusNames() {
        var thisClass = this;
        Load(this.props.apiUrl + "/GetStatusNames", function (data) {
            thisClass.setState({ statusNames: data });
        });
    }
    loadStatusValues() {
        var thisClass = this;
        Load(this.props.apiUrl + "/GetStatusValues", function (data) {
            thisClass.setState({ statusValues: data });
        });
    }
    loadBugList() {
        var thisClass = this;
        Load(this.props.apiUrl + "/Get", function (data) {
            thisClass.setState({ bugList: data });
        });
    }
    componentWillMount() {
        this.loadStatusNames();
        this.loadStatusValues();
        this.loadBugList();
    }
    render() {
        var bugList = this.state.bugList;
        var renderEditBug = this.state.renderEditBug;
        return (<div className="bug-table">
            <div className="bug-header">
                <div>
                    {
                        this.state.statusNames.map(function (item) {
                            return <div key={globalElementIndex++}>{item}</div>;
                        })
                    }
                </div>
            </div>
            <div className="bug-body">
                {
                    this.state.statusValues.map(function (status) {
                        return <div key={globalElementIndex++} className="bug-column">
                            {
                                bugList.map(function (item) {
                                    if (item.status == status) {
                                        return <ShortBug key={globalElementIndex++} bug={item} onClick={renderEditBug} />;
                                    }
                                })
                            }
                        </div>;
                    })
                }
            </div>
        </div>);
    }
}
class SelectStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedStatus: props.selectedStatus, prevStatus: props.prevStatus, commentDiv: props.commentDiv, isNew: props.isNew };
        this.onChange = this.onChange.bind(this);
        this.prevStatus = this.state.selectedStatus; 
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
        var newStr = statusNames[enumStatus.New - 1];
        var openedStr = statusNames[enumStatus.Opened - 1];
        var resolvedStr = statusNames[enumStatus.Resolved - 1];
        var closedStr = statusNames[enumStatus.Closed - 1];

        switch (this.prevStatus) {
            case enumStatus.New:
                if (this.state.isNew) {
                    return <select className="selectpicker bug-select" value={this.state.selectedStatus} onChange={this.onChange}>
                        <option key={globalElementIndex++} value={enumStatus.New}>{newStr}</option>
                    </select>;
                }
                else {
                    return <select className="selectpicker bug-select" value={this.state.selectedStatus} onChange={this.onChange}>
                        <option key={globalElementIndex++} value={enumStatus.New}>{newStr}</option>
                        <option key={globalElementIndex++} value={enumStatus.Opened}>{openedStr}</option>
                    </select>;
                }                
                break;

            case enumStatus.Opened:
                return <select className="selectpicker bug-select" value={this.state.selectedStatus} onChange={this.onChange}>
                    <option key={globalElementIndex++} value={enumStatus.Opened}>{openedStr}</option>
                    <option key={globalElementIndex++} value={enumStatus.Resolved}>{resolvedStr}</option>
                </select>;
                break;

            case enumStatus.Resolved:
                return <select className="selectpicker bug-select" value={this.state.selectedStatus} onChange={this.onChange}>
                    <option key={globalElementIndex++} value={enumStatus.Opened}>{openedStr}</option>
                    <option key={globalElementIndex++} value={enumStatus.Resolved}>{resolvedStr}</option>
                    <option key={globalElementIndex++} value={enumStatus.Closed}>{closedStr}</option>
                </select>;
                break;

            default: //  enumStatus.Closed
                return <select className="selectpicker bug-select" value={this.state.selectedStatus} onChange={this.onChange}>
                    <option key={globalElementIndex++} value={enumStatus.Closed}>{closedStr}</option>
                </select>;
                break;
        }
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
        return <select className="selectpicker bug-select" value={this.state.selectedPriority} onChange={this.onChange}>
            {
                priorityNames.map(function (priorityName) {
                    return <option key={globalElementIndex++} value={enumUrgency[priorityName]}>{priorityName}</option>;
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
        return <select className="selectpicker bug-select" value={this.state.selectedSeverity} onChange={this.onChange}>
            {
                severityNames.map(function (severityName) {
                    return <option key={globalElementIndex++} value={enumCriticality[severityName]}>{severityName}</option>;
                })
            }
        </select>;
    }
}

function SaveBug(id, name, reproSteps, priority, severity, status, statusComment, creator, dateCreate, renderFunction) {
    let model = new Bug(null);
    model.id = id;
    model.name = name;
    model.priority = priority;
    model.reproSteps = reproSteps;
    model.severity = severity;
    model.status = status;
    model.statusComment = statusComment;
    model.creator = creator;
    model.dateCreate = dateCreate;

    Send(model, _saveBug, function (data) {
        renderFunction();
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
        this.isNew = this.state.id == 0;
        this.onSave = this.onSave.bind(this);
    }
    onSave() {
        if (!this.isNew && this.prevStatus != this.state.status && this.refs.bugStatusComment.value == "") {
            alert("Заполните комментарий по изменению статуса");
        }
        else {
            let priority = parseInt(this.refs.bugPriority.state.selectedPriority);
            let severity = parseInt(this.refs.bugSeverity.state.selectedSeverity);
            let status = parseInt(this.refs.bugStatus.state.selectedStatus);
            SaveBug(this.state.id,
                this.refs.bugName.value,
                this.refs.bugReproSteps.value,
                priority,
                severity,
                status,
                this.refs.bugStatusComment.value,
                this.state.creator,
                this.state.dateCreate,
                this.state.renderBugList);
        }
    }
    componentDidMount() {
        RenderHistories(this.state.id);
    }
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
                    <textarea className="bug-input" key={globalElementIndex++} defaultValue={this.state.reproSteps} ref="bugReproSteps" ></textarea>
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
        var statusNames = Object.keys(enumStatus);
        var status = statusNames[history.status - 1];
        var date = Date.parse(history.dateUpdate);
        var dateFormat = new Date(date).toDateString();
        return <div>
            <div>
                {dateFormat}
            </div>
            <div>
                {history.updater.firstName} {history.updater.lastName}
            </div>
            <Status key={globalElementIndex++} status={status} statusComment={history.statusComment} />
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
                    return <History key={globalElementIndex++} history={history} />;
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