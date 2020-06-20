import { State } from "@State";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { IPanelProps, IPanelCallProps, Panel } from "@shared/organisms/Panel/Panel";
import { Translate } from "@utils/translates/Translate";

const mapStateToProps = (state: State, ownProps: IPanelProps): IPanelProps => {
    const issue = state.issuesStore.openedIssue;
    return {
        ...ownProps,
        title: issue.isNew()
            ? Translate.getString("Create issue")
            : Translate.getString("Edit issue"),
    };
};

type Props = IPanelCallProps & {
    isOpen: boolean;
};

const IssuesPanelContainer: ComponentType<Props> = connect(
    mapStateToProps
)(Panel);

export { IssuesPanelContainer };
