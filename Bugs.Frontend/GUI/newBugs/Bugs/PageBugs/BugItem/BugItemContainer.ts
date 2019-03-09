import {connect} from "react-redux";
import {AnyAction, Dispatch} from "redux";
import {push} from "connected-react-router";
import {BugItem, IBugItemProps, IBugItemCallProps} from "./BugItem";
import {IReducers} from "../../../App/logic/createReducers";
import {urls} from "../../../App/PageComponentRouter";


const mapStateToProps = (state: IReducers, ownProps: IBugItemProps): IBugItemProps => {
    return {
        bug: ownProps.bug
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IBugItemCallProps): IBugItemCallProps => {
    return {
        onClick: (bugId: number) => dispatch(push(urls.editBugLink(bugId)))
    };
};

export const BugItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BugItem);