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
                    <button className="navbar-brand" onClick={this.BugList}>Backlog</button>
                </div>
                <div className="navbar-collapse collapse">
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li><button onClick={this.NewBug}>New bug</button></li>
                            <li><button onClick={this.NewUser}>New user</button></li>
                            <li><button onClick={this.UserList}>User list</button></li>
                            <li><button onClick={this.Logout}>Sign out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>;
    }
}