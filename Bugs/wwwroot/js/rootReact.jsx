function Login(url, login, password) {
    let model = {
        login: login,
        password: password
    }
    Send(model, url, function (data) {
        if (!data)
            alert("Пользователь не найден или неверная пара логин-пароль");
        else
            ActualPage();
    }, true);
}

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { url: props.url};
        this.onEnter = this.onEnter.bind(this);
    }
    onEnter() {
        let log = this.refs.userLogin.value;
        let pass = this.refs.userPassword.value;

        if (log == "")
            alert("Введите логин");
        else if (pass == "")
            alert("Введите пароль");
        else
            Login(this.state.url, log, pass);
    }
    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.onEnter();
        }
    }
    render() {
        return <div className="login-page">
            <div>
                <h3>Enter</h3>
                <input className="bug-input" defaultValue="" ref="userLogin" placeholder="Login" onKeyPress={this.handleKeyPress} />
                <input className="bug-input" defaultValue="" ref="userPassword" placeholder="Password" type="password" onKeyPress={this.handleKeyPress} />

                <button className="bug-button" onClick={this.onEnter}>Save</button>
            </div>
        </div>;
    }
}
class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.NewBug = this.NewBug.bind(this);
        this.BugList = this.BugList.bind(this);

        this.NewUser = this.NewUser.bind(this);
        this.UserList = this.UserList.bind(this);
        
        this.Logout = this.Logout.bind(this);
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
    Logout() {
        this.props.Logout();
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
                </div>
                <div className="navbar-collapse collapse">
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><button className="btn btn-default navbar-btn" onClick={this.BugList}>Backlog</button></li>
                            <li><button className="btn btn-default navbar-btn" onClick={this.NewBug}>New bug</button></li>
                            <li><button className="btn btn-default navbar-btn" onClick={this.NewUser}>New user</button></li>
                            <li><button className="btn btn-default navbar-btn" onClick={this.UserList}>User list</button></li>
                            <li><button className="btn btn-default navbar-btn" onClick={this.Logout}>Sign out</button></li>
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
            callback(data);
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

var _actualPagePath;
var _homePath;
var _loginPath;
var _exitPath;

var _variesBugPath;
var _historiesPath;
var _saveBug;
var _userListPath;
var _editUserPath;
var _saveUserPath;

function RegPaths(actualPagePath,
                    homePath,
                    loginPath,
                    exitPath,
                    variesBugPath, historiesPath, saveBug,
                    userListPath, editUserPath, saveUserPath) {

    _actualPagePath = actualPagePath;
    _homePath = homePath;
    _loginPath = loginPath;
    _exitPath = exitPath;

    _variesBugPath = variesBugPath;
    _historiesPath = historiesPath;
    _saveBug = saveBug;
    _userListPath = userListPath;
    _editUserPath = editUserPath;
    _saveUserPath = saveUserPath;
}

function ActualPage() {
    Load(_actualPagePath, function (data) {
        if (data == "Login") {
            document.getElementById("header").innerHTML = "";
            RenderLogin();
            return;
        }

        RenderNavBar();
        switch (data) {
            case "BugList":
                RenderBugList();
                break;

            case "UserList":
                RenderUserList();
                break;

            case "NewBug":
                RenderEditBug(0);
                break;

            case "NewUser":
                RenderEditUser(0);
                break;

            case "BugList":
                break;

            default:
                if (data.actualPage == "VariesBug") {
                    RenderEditBug(data.bugId);
                }
                else if (data.actualPage == "EditUser") {
                    RenderEditUser(data.userId);
                }
                else {
                    alert("Упс. Что-то пошло не так");
                }
                break;
        }        
    }, true);
}

function RenderLogin() {
    ReactDOM.render(
        <LoginPage url={_loginPath}/>,
        document.getElementById("content")
    );
}

function Logout() {
    Send(null, _exitPath, function (data) {
        ActualPage();
    }, true);
}

function RenderNavBar() {
    ReactDOM.render(
        <NavBar renderBugList={RenderBugList} renderEditBug={RenderEditBug}
            renderUserList={RenderUserList} renderEditUser={RenderEditUser} Logout={Logout} />,
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