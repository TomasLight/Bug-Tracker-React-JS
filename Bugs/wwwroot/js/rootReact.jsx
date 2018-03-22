class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.NewBug = this.NewBug.bind(this);
        this.BugList = this.BugList.bind(this);

        this.NewUser = this.NewUser.bind(this);
        this.UserList = this.UserList.bind(this);
    }
    NewBug() {
        this.props.renderEditBug(0);
    }
    BugList() {
        this.props.renderBugList();
    }
    NewUser() {
        this.props.renderEditUser(0);
    }
    UserList() {
        this.props.renderUserList();
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
function Load(url, callback, isAsync = true) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, isAsync);
    xhr.onload = function () {
        callback(JSON.parse(xhr.responseText));
    }.bind(this);
    xhr.send();
}

function Send(postData, postUrl, callback) {
    $.ajax({
        url: postUrl,
        type: "POST",
        data: postData,
        success: function (data) {
            callback();
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

var _actualPagePath;
var _homePath;
var _variesBugPath;
var _historiesPath;
var _saveBug;
var _userListPath;
var _editUserPath;
var _saveUserPath;

function ActualPage(actualPagePath,
                    homePath, 
                    variesBugPath, historiesPath, saveBug,
                    userListPath, editUserPath, saveUserPath) {

    _actualPagePath = actualPagePath;
    _homePath = homePath;
    _variesBugPath = variesBugPath;
    _historiesPath = historiesPath;
    _saveBug = saveBug;
    _userListPath = userListPath;
    _editUserPath = editUserPath;
    _saveUserPath = saveUserPath;

    RenderNavBar();
    Load(actualPagePath, function (data) {
        if (data == "BugList") {
            RenderBugList();
        }
        else if (data == "UserList") {
            RenderUserList();
        }
        else if (data == "NewBug") {
            RenderEditBug(0);
        }
        else if (data.actualPage == "VariesBug") {
            RenderEditBug(data.bugId);
        }
        else if (data == "NewUser") {
            RenderEditUser(0);
        }
        else if (data.actualPage == "EditUser") {
            RenderEditUser(data.userId);
        }
    }, true);
}

function RenderNavBar() {
    ReactDOM.render(
        <NavBar renderBugList={RenderBugList} renderEditBug={RenderEditBug}
                renderUserList={RenderUserList} renderEditUser={RenderEditUser} />,
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

function RenderUserList() {
    Load(_userListPath, function (data) {
        ReactDOM.render(
            <UserList users={data} renderEditUser={RenderEditUser} />,
            document.getElementById("content")
        );
    }, true);
}

function RenderEditUser(userId) {
    var url = _editUserPath + "?userId=" + userId;
    Load(url, function (data) {
        var user = new UserModel(data);
        ReactDOM.render(
            <EditUser user={user} renderUserList={RenderUserList} />,
            document.getElementById("content")
        );
    }, true);
}