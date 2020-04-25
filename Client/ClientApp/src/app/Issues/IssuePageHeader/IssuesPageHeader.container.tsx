import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@State";

import { IIssuePageHeaderProps, IIssuePageHeaderCallProps, IssuePageHeader } from "./IssuePageHeader";

const mapStateToProps = (state: State): IIssuePageHeaderProps => {
    return {
        // TODO: filters
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IIssuePageHeaderCallProps => {
    return {
        // TODO: filters
    };
};

const IssuePageHeaderContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(IssuePageHeader);

export { IssuePageHeaderContainer };
