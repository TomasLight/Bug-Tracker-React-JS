import { appUrls } from "@app/routing/appUrls";
import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@State";
import { Dispatch } from "redux";

import { IIssueColumnProps, IIssueColumnCallProps, IssueColumn, IIssueColumnOwnProps } from "./IssueColumn";

const mapStateToProps = (state: State): IIssueColumnProps => {
    return {
        issues: state.issuesStore.issues,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IIssueColumnCallProps => {
    return {
        openIssueByLink: (issueId: number) => dispatch(push(appUrls.getIssuePath(issueId))),
    };
};

const IssuesColumnContainer: ComponentType<IIssueColumnOwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueColumn);

export { IssuesColumnContainer };
