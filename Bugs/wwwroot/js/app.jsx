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