const enumUrgency = Object.freeze({
    "First": 1,
    "Second": 2,
    "Third": 3,
    "Fourth": 4
})
const enumCriticality = Object.freeze({
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "Critical": 4
})
const enumStatus = Object.freeze({
    "New": 1,
    "Opened": 2,
    "Resolved": 3,
    "Closed": 4
})

class UserModel {
    constructor(user) {
        if (user == null) {
            this.id = 0;
            this.firstName = "";
            this.lastName = "";
        }
        else {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
        }
    }
}

class BugModel {
    constructor(bug) {
        if (bug == null) {
            this.id = 0;
            this.name = "";
            this.priority = enumUrgency.Fourth;
            this.reproSteps = "";
            this.severity = enumCriticality.Low;
            this.status = enumStatus.New;
            this.statusComment = "";
            this.creator = new UserModel(null);
            this.dateCreate = "";
            this.histories = [];
        }
        else {
            this.id = bug.id;
            this.name = bug.name;
            this.priority = bug.priority;
            this.reproSteps = bug.reproSteps;
            this.severity = bug.severity;
            this.status = bug.status;
            this.statusComment = bug.statusComment;
            this.creator = bug.creator;
            this.dateCreate = bug.dateCreate;
            this.histories = bug.histories;
        }        
    }
}
class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
        this.BugList = this.BugList.bind(this);
    }
    NewBug() {
        //this.props.onRemove(this.state.data);
    }
    BugList() {
        this.props.renderBugList();
    }
    NewUser() {
        //this.props.onRemove(this.state.data);
    }
    UserList() {
        //this.props.onRemove(this.state.data);
    }
    SignOut() {
        //this.props.onRemove(this.state.data);
    }
    render() {
        return <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <button className="navbar-brand" onClick={this.BugList}>Backlog</button>
                </div>
                <div className="navbar-collapse collapse">
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><button onClick={this.NewBug}>New bug</button></li>
                            <li><button onClick={this.NewUser}>New user</button></li>
                            <li><button onClick={this.UserList}>User list</button></li>
                            <li><button onClick={this.SignOut}>Sign out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>;
    }
}
class ShortBug extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bug: new BugModel(props.bug) };
        this.onEditBug = this.onEditBug.bind(this);
    }
    onEditBug() {
        this.props.onClick(this.state.bug.id);
    }
    render() {
        return (<div>
            <div className='bug-cell' onClick={this.onEditBug}>
                <div># {this.state.bug.id}</div>
                <div>{this.state.bug.name}</div>
                <div>{this.state.bug.creator.firstName} {this.state.bug.creator.lastName}</div>
                <div>{this.state.bug.dateCreate}</div>
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
function Load(url, callback, isAsync = true) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, isAsync);
    xhr.onload = function () {
        callback(JSON.parse(xhr.responseText));
    }.bind(this);
    xhr.send();
}

function Send(data, url, callback) {
    //var sendData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function () {
        if (xhr.status == 200) {
            callback();
        }
    }.bind(this);
    xhr.send(data);
}

var _actualPagePath;
var _homePath;
var _variesBugPath;
var _historiesPath;
var _saveBug;

function ActualPage(actualPagePath, homePath, variesBugPath, historiesPath, saveBug) {
    _actualPagePath = actualPagePath;
    _homePath = homePath;
    _variesBugPath = variesBugPath;
    _historiesPath = historiesPath;
    _saveBug = saveBug;

    RenderNavBar();
    Load(actualPagePath, function (data) {
        if (data == "BugList") {
            RenderBugList();
        }
        else if (data.actualPage == "VariesBug") {
            RenderEditBug(data.bugId);
        }
    }, true);
}

function RenderNavBar() {
    ReactDOM.render(
        <NavBar renderBugList={RenderBugList} />,
        document.getElementById("header")
    );
}

function RenderBugList() {
    ReactDOM.render(
        <BugList apiUrl={_homePath} renderEditBug={RenderEditBug}/>,
        document.getElementById("content")
    );
}

function RenderEditBug(bugId) {
    var url = _variesBugPath + "?bugId=" + bugId;
    Load(url, function (data) {
        var variesBag = new BugModel(data);
        ReactDOM.render(
            <EditBug bug={variesBag} renderBugList={RenderBugList} />,
            document.getElementById("content")
        );
    }, true);    
}