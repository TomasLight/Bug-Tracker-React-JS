import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@State";
import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { IIssue } from "@app/Issues/models/Issue";
import { Translate } from "@utils/translates/Translate";

import { IIssueFormProps, IIssueFormCallProps, IIssueFormOwnProps, IssueForm } from "./IssueForm";

interface IOwnProps extends IIssueFormOwnProps {
    closePanel: () => void;
}

const mapStateToProps = (state: State): IIssueFormProps => {
    const issue = state.issuesStore.openedIssue;
    if (issue.isNew()) {
        return {
            issue,
            buttonText: Translate.getString("Create"),
            isReporterDisplayed: false,
        };
    }

    return {
        issue,
        buttonText: Translate.getString("Save"),
        isReporterDisplayed: true,
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOwnProps): IIssueFormCallProps => {
    return {
        submit: (formValues: IIssue) => dispatch(IssuesActions.saveIssue({
            formValues,
            closeIssuePanel: ownProps.closePanel,
        })),
    };
};

const IssuesFormContainer: ComponentType<IOwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(IssueForm);

export { IssuesFormContainer };
