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
            </div>
        </div>);
    }
}
var globalElementIndex = 1;

class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { statusNames: [], statusValues: [], bugList: [], renderEditBug: props.renderEditBug };
        //this.onAddPhone = this.onAddPhone.bind(this);
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
    componentDidMount() {
        this.loadStatusNames();
        this.loadStatusValues();
        this.loadBugList();
    }
    render() {
        var bugList = this.state.bugList;
        var renderBL = this.state.renderEditBug;
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
                                        return <ShortBug key={globalElementIndex++} bug={item} onClick={renderBL} />;
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
//import BugModel from './classes/BugModel';
//import { NavBar } from './components/NavBar';
//import { ShortBug } from './components/ShortBug';

function Load(url, callback, isAsync = true) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, isAsync);
    xhr.onload = function () {
        callback(JSON.parse(xhr.responseText));
    }.bind(this);
    xhr.send();
}

function Send(data, url, callback) {
    var sendData = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.open("post", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function () {
        if (xhr.status == 200) {
            callback();
        }
    }.bind(this);
    xhr.send(sendData);
}

function ActualPage() {
    Load("/Home/GetActualPage", function (data) {
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
        <BugList apiUrl="/Home" renderEditBug={RenderEditBug}/>,
        document.getElementById("content")
    );
}

function RenderEditBug(bugId) {
    var url = "/Home/VariesBug?bugId=" + bugId;
    Load(url, function (data) {
        var variesBag = new BugModel(data);
        ReactDOM.render(
            <EditBug bug={variesBag} renderBugList={RenderBugList} />,
            document.getElementById("content")
        );
    }, true);    
}

RenderNavBar();
ActualPage();


/*
<div class="bug-info-container">
    <div>
        <div class="bug-name">
            <h4>
                Bug #@Model.Id
            </h4>
            <input name="Name" value="@Model.Name" />
        </div>
        <div class="bug-status">
            <label>
                State
            </label>
            <select asp-for="Status" asp-items="@(SelectList)ViewBag.Status"></select>
        </div>
        <div class="bug-priority">
            <label>
                Priority
            </label>
            <select asp-for="Priority" asp-items="@(SelectList)ViewBag.Priority"></select>
        </div>
        <div class="bug-severity">
            <label>
                Severity
            </label>
            <select asp-for="Severity" asp-items="@(SelectList)ViewBag.Severity"></select>
        </div>
    </div>
    <div class="bug-description">
        <h4>
            Repro steps
        </h4>
        <textarea name="ReproSteps">@Model.ReproSteps</textarea>
    </div>
    <div class="history-container">
        <h4>
            History changes
        </h4>
        <div>
            @foreach (HistoryViewModel history in Model.Histories.OrderBy(h => h.DateUpdate))
            {
                <div>
                    <div>
                        @history.DateUpdate
                    </div>
                    <div>
                        @history.Updater.FirstName @history.Updater.LastName
                    </div>
                    @if (history.Status != null)
                    {
                        <div>
                            <label>set new status:</label> @history.Status
                            <p>
                                <label>comment:</label> @history.StatusComment
                            </p>
                        </div>
                    }
                    @if (history.ReproSteps != null)
                    {
                        <div>
                            <label>set new description:</label> @history.ReproSteps
                        </div>
                    }
                    @if (history.Priority != null)
                    {
                        <div>
                            <label>set new priority:</label> @Html.DisplayFor(d => history.Priority)
                        </div>
                    }
                    @if (history.Severity != null)
                    {
                        <div>
                            <label>set new severity:</label> @Html.DisplayFor(d => history.Severity)

                        </div>
                    }
                </div>
            }
        </div>
    </div>
</div>

<div>
    <a asp-action="Index">Back to List</a>
</div>
 */


//class PhoneForm extends React.Component {

//    constructor(props) {
//        super(props);
//        this.state = { name: "", price: 0 };

//        this.onSubmit = this.onSubmit.bind(this);
//        this.onNameChange = this.onNameChange.bind(this);
//        this.onPriceChange = this.onPriceChange.bind(this);
//    }
//    onNameChange(e) {
//        this.setState({ name: e.target.value });
//    }
//    onPriceChange(e) {
//        this.setState({ price: e.target.value });
//    }
//    onSubmit(e) {
//        e.preventDefault();
//        var phoneName = this.state.name.trim();
//        var phonePrice = this.state.price;
//        if (!phoneName || phonePrice <= 0) {
//            return;
//        }
//        this.props.onPhoneSubmit({ name: phoneName, price: phonePrice });
//        this.setState({ name: "", price: 0 });
//    }
//    render() {
//        return (
//            <form onSubmit={this.onSubmit}>
//                <p>
//                    <input type="text"
//                        placeholder="Модель телефона"
//                        value={this.state.name}
//                        onChange={this.onNameChange} />
//                </p>
//                <p>
//                    <input type="number"
//                        placeholder="Цена"
//                        value={this.state.price}
//                        onChange={this.onPriceChange} />
//                </p>
//                <input type="submit" value="Сохранить" />
//            </form>
//        );
//    }
//}