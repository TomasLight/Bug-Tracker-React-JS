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