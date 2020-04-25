import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@State";

import { IssuesActions } from "./redux/Issues.actions";
import { IIssuesPageProps, IIssuesPageCallProps, IssuesPage } from "./IssuesPage";

const mapStateToProps = (state: State): IIssuesPageProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IIssuesPageCallProps => {
    return {
        loadIssues: () => dispatch(IssuesActions.loadIssues()),
        openIssueToCreate: (openIssuePanel) => dispatch(IssuesActions.openIssueToCreate({
            openIssuePanel,
        })),
        openIssueToEdit: (issueId, openIssuePanel) => dispatch(IssuesActions.openIssueToEdit({
            issueId,
            openIssuePanel,
        })),
        closeIssue: (closeIssuePanel) => dispatch(IssuesActions.closeIssue({
            closeIssuePanel,
        })),
    };
};

const IssuesPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuesPage);

export { IssuesPageContainer };
