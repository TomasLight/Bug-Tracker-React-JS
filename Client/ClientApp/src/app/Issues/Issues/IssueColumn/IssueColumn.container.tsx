import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { appUrls } from "@app/routing/appUrls";
import { IssuesStoreSelectors } from "@app/selectors/Issues.store.selectors";
import { State } from "@State";
import { Dispatch } from "redux";

import { IIssueColumnProps, IIssueColumnCallProps, IssueColumn, IIssueColumnOwnProps } from "./IssueColumn";

const mapStateToProps = (state: State): IIssueColumnProps => {
    return {
        issues: IssuesStoreSelectors.filteredIssues(state),
        users: state.usersStore.users,
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
