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