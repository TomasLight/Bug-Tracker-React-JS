import { appUrls } from "@app/routing/appUrls";
import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@State";
import { Dispatch } from "redux";

import { IIssuesProps, IIssuesCallProps, Issues, IIssuesOwnProps } from "./Issues";

const mapStateToProps = (state: State): IIssuesProps => {
    return {
        issues: state.issuesStore.issues,
        issuesAreLoading: state.issuesStore.issuesAreLoading,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IIssuesCallProps => {
    return {
        openIssueByLink: (issueId: number) => dispatch(push(appUrls.getIssuePath(issueId))),
    };
};

const IssuesContainer: ComponentType<IIssuesOwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Issues);

export { IssuesContainer };
