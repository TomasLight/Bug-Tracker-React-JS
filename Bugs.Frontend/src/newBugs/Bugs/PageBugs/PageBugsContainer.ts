import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";
import {push} from "connected-react-router";

import {IReducers} from "@reducer";
import {urls} from "@core/App/PageComponentRouter";
import {PageBugs, IPageBugsCallProps, IPageBugsProps} from "./PageBugs";


const mapStateToProps = (state: IReducers, ownProps: IPageBugsProps): IPageBugsProps => {
    return {
        bugs: state.BugStore.bugs
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IPageBugsCallProps): IPageBugsCallProps => {
    return {
        load: () => {},
        openBug: (userId: number) => dispatch(push(urls.editUserLink(userId)))
    };
};

const PageBugsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageBugs);

export default PageBugsContainer;