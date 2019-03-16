import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";

import {Reducers} from "@reducers";
import {UsersActions} from "@core/Users/PageUsers/redux/saga/UsersActions";
import {PageUsers, IPageUsersCallProps, IPageUsersProps} from "./PageUsers";

const mapStateToProps = (state: Reducers, ownProps: IPageUsersProps): IPageUsersProps => {
    return {
        users: state.usersStore.users
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IPageUsersCallProps): IPageUsersCallProps => {
    return {
        load: () => dispatch(UsersActions.get())
    };
};

const PageUsersContainer = connect(
    mapStateToProps,
   mapDispatchToProps
)(PageUsers);

export default PageUsersContainer;