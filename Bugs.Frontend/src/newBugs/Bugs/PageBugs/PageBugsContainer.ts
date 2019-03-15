import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";
import {push} from "connected-react-router";

import {Reducers} from "@reducers";
import {urls} from "@core/App/PageComponentRouter";
import {BugsActions} from "@core/Bugs/PageBugs/redux/BugsActions";
import {PageBugs, IPageBugsCallProps, IPageBugsProps} from "./PageBugs";


const mapStateToProps = (state: Reducers, ownProps: IPageBugsProps): IPageBugsProps => {
    return {
        bugs: state.bugsStore.bugs
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: IPageBugsCallProps): IPageBugsCallProps => {
    return {
        load: () => dispatch(BugsActions.get()),
        openBug: (userId: number) => dispatch(push(urls.editUserLink(userId)))
    };
};

const PageBugsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageBugs);

export default PageBugsContainer;