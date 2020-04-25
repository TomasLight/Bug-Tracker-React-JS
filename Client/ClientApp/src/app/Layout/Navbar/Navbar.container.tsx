import { State } from "@State";
import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    Navbar,
    INavbarProps,
    INavbarCallProps, INavbarOwnProps
} from "./Navbar";

const mapStateToProps = (state: State): INavbarProps => {
    return {
        location: state.router.location,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): INavbarCallProps => {
    return {
        redirect: (url) => dispatch(push(url)),
    };
};

const NavbarContainer: ComponentType<INavbarOwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);

export { NavbarContainer };
