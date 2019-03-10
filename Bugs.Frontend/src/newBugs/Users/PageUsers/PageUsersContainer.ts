import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";

import {IReducers} from "@reducer";
import {PageUsers, IPageUsersCallProps, IPageUsersProps} from "./PageUsers";

const mapStateToProps = (state: IReducers, ownProps: IPageUsersProps): IPageUsersProps => {
    return {
        users: state.UserStore.users
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IPageUsersCallProps): IPageUsersCallProps => {
    return {
        load: () => {}
    };
};

const PageUsersContainer = connect(
    mapStateToProps,
   mapDispatchToProps
)(PageUsers);

export default PageUsersContainer;