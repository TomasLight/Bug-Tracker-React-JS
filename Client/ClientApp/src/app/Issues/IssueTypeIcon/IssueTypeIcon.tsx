import { SvgIconProps } from "@material-ui/core";
// why it no works? webpack freezes when 70% in FlagDependencyExportsPlugin
// import { BugIcon, InvestigationIcon, TaskIcon } from "@shared/atoms/icons";
import { BugIcon } from "@shared/atoms/icons/IssueTypes/BugIcon";
import { InvestigationIcon } from "@shared/atoms/icons/IssueTypes/InvestigationIcon";
import { TaskIcon } from "@shared/atoms/icons/IssueTypes/TaskIcon";
import { IssueType } from "@app/Issues/models/IssueType";
import React, { FunctionComponent } from "react";

export interface IIssueCardProps {
    issueType: IssueType;
}

type Props = IIssueCardProps & SvgIconProps;

const IssueTypeIcon: FunctionComponent<Props> = (props) => {
    const { issueType, ...rest } = props;

    switch (issueType) {
        case IssueType.Task:
            return <TaskIcon {...rest}/>;

        case IssueType.Investigation:
            return <InvestigationIcon {...rest}/>;

        case IssueType.Defect:
        case IssueType.Bug:
            return <BugIcon {...rest}/>;

        default:
            throw Error(`Unsupported issue type (${issueType}) for IssueTypeIcon`);
    }
};

export { IssueTypeIcon };
