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