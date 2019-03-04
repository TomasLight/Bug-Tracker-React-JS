import * as React from "react";

import {urls} from "../../App/PageComponentRouter";

export interface INavBarProps {

}

export interface INavBarCallProps {
    redirect: (path: string) => void;
    logout: () => void;
}

type Props = INavBarProps & INavBarCallProps;

class State {

}

export class NavBar extends React.Component<Props, State> {

    Login = () => {
        this.props.redirect(urls.loginPath);
    };

    NewBug = () => {
        this.props.redirect(urls.editBugLink(0));
    };

    BugList = () => {
        this.props.redirect(urls.bugListPath);
    };

    NewUser = () => {
        this.props.redirect(urls.editUserLink(0));
    };

    UserList = () => {
        this.props.redirect(urls.userListPath);
    };

    render() {
        const {logout} = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse">
                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <button className="btn btn-default navbar-btn" onClick={this.Login}>
                                        Login
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-default navbar-btn" onClick={this.BugList}>
                                        Backlog
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-default navbar-btn" onClick={this.NewBug}>
                                        New bug
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-default navbar-btn" onClick={this.NewUser}>
                                        New user
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-default navbar-btn" onClick={this.UserList}>
                                        User list
                                    </button>
                                </li>
                                {/*<li>
                                    <button className="btn btn-default navbar-btn" onClick={logout}>
                                        Sign out
                                    </button>
                                </li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}