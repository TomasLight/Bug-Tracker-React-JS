function Load(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.onload = function () {
        callback(JSON.parse(xhr.responseText));
    }.bind(this);
    xhr.send();
}

var globalElementIndex = 1;

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
        //this.onClick = this.onClick.bind(this);
    }
    NewBug() {
        //this.props.onRemove(this.state.data);
    }
    BugList() {
        //this.props.onRemove(this.state.data);
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

class Bug extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bug: props.bug };

        this.onEditBug = this.onEditBug.bind(this.state.bug.Id);
    }
    onEditBug(bugId) {
        var test = 1;
    }
    render() {
        return <div>
            <div className='bug-cell' onClick={this.onEditBug}>
                    <div># {this.state.bug.id}</div>
                    <div>{this.state.bug.name}</div>
                </div>
            </div>;
    }
}

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


class BugList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { statusNames: [], statusValues: [], bugList: [] };

        //this.onAddPhone = this.onAddPhone.bind(this);
        //this.onRemovePhone = this.onRemovePhone.bind(this);
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
    //// добавление объекта
    //onAddPhone(phone) {
    //    if (phone) {

    //        var data = JSON.stringify({ "name": phone.name, "price": phone.price });
    //        var xhr = new XMLHttpRequest();

    //        xhr.open("post", this.props.apiUrl, true);
    //        xhr.setRequestHeader("Content-type", "application/json");
    //        xhr.onload = function () {
    //            if (xhr.status == 200) {
    //                this.loadData();
    //            }
    //        }.bind(this);
    //        xhr.send(data);
    //    }
    //}
    //// удаление объекта
    //onRemovePhone(phone) {

    //    if (phone) {
    //        var url = this.props.apiUrl + "/" + phone.id;

    //        var xhr = new XMLHttpRequest();
    //        xhr.open("delete", url, true);
    //        xhr.setRequestHeader("Content-Type", "application/json");
    //        xhr.onload = function () {
    //            if (xhr.status == 200) {
    //                this.loadData();
    //            }
    //        }.bind(this);
    //        xhr.send();
    //    }
    //}
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
                                            return <Bug key={globalElementIndex++} bug={item} />;
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

ReactDOM.render(
    <NavBar />,
    document.getElementById("header")
);
ReactDOM.render(
    <BugList apiUrl="/Home" />,
    document.getElementById("content")
);