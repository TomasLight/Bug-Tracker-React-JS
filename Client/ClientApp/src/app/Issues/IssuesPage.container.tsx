import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@State";

import { IssuesActions } from "./redux/Issues.actions";
import { IIssuesPageProps, IIssuesPageCallProps, IssuesPage } from "./IssuesPage";

const mapStateToProps = (state: State): IIssuesPageProps => {
    return {
        issues: state.issuesStore.issues,
        issuesAreLoading: state.issuesStore.issuesAreLoading,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IIssuesPageCallProps => {
    return {
        loadIssues: () => dispatch(IssuesActions.loadIssues()),
    };
};

const IssuesPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesPage);

export { IssuesPageContainer };
