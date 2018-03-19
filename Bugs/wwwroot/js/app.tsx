import * as React from 'react';
import * as BugModelModule from './classes/BugModel';
import { NavBar } from './components/NavBar';
import { ShortBug } from './components/ShortBug';

function Load(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
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

function RenderNavBar() {
    ReactDOM.render(
        <NavBar renderBugList={RenderBugList} />,
        document.getElementById("header")
    );
}

function RenderBugList() {
    ReactDOM.render(
        <BugList apiUrl="/Home" />,
        document.getElementById("content")
    );
}

var globalElementIndex = 1;



class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { statusNames: [], statusValues: [], bugList: [] };
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
        return <div className="bug-table">
                    <div className="bug-header">
                        <div>
                            {
                                this.state.statusNames.map(function(item) {                     
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
                                            return <ShortBug key={globalElementIndex++} bug={item} />;
                                        }
                                    })
                                }
                            </div>;
                        })
                    }
                    </div>
                </div>;
    }
}

class EditBug extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bug: new BugModelModule.BugModel(props.bug) };
    }
    render() {
        return;
    }
}

RenderNavBar();
RenderBugList();


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