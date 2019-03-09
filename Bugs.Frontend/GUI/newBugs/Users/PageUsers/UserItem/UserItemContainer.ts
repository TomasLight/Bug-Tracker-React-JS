import {connect} from "react-redux";
import {IReducers} from "../../../App/logic/createReducers";
import {UserItem, IUserItemProps, IUserItemCallProps} from "./UserItem";
import {AnyAction, Dispatch} from "redux";
import {push} from "connected-react-router";
import {urls} from "../../../App/PageComponentRouter";


const mapStateToProps = (state: IReducers, ownProps: IUserItemProps): IUserItemProps => {
    return {
        user: ownProps.user,
        userProperties: ownProps.userProperties
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IUserItemCallProps): IUserItemCallProps => {
    return {
        openUser: (userId: number) => dispatch(push(urls.editUserLink(userId)))
    };
};

export const UserItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserItem);