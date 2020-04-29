import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IssuesActions } from "./redux/Issues.actions";
import { IIssuesPageCallProps, IssuesPage } from "./IssuesPage";

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
    null,
    mapDispatchToProps
)(IssuesPage);

export { IssuesPageContainer };
