import { Priority } from "@app/Issues/models/Priority";
import { SvgIconProps } from "@material-ui/core";
// why it no works? webpack freezes when 70% in FlagDependencyExportsPlugin
// import {
//     CriticalPriorityIcon,
//     HighPriorityIcon,
//     LowPriorityIcon,
//     MediumPriorityIcon,
//     OnHoldPriorityIcon
// } from "@shared/atoms/icons";
import { CriticalPriorityIcon } from "@shared/atoms/icons/Priorities/CriticalPriorityIcon";
import { HighPriorityIcon } from "@shared/atoms/icons/Priorities/HighPriorityIcon";
import { MediumPriorityIcon } from "@shared/atoms/icons/Priorities/MediumPriorityIcon";
import { LowPriorityIcon } from "@shared/atoms/icons/Priorities/LowPriorityIcon";
import { OnHoldPriorityIcon } from "@shared/atoms/icons/Priorities/OnHoldPriorityIcon";
import React, { FunctionComponent } from "react";

export interface IIssueCardProps {
    priority: Priority;
}

type Props = IIssueCardProps & SvgIconProps;

const IssuePriorityIcon: FunctionComponent<Props> = (props) => {
    const { priority, ...rest } = props;

    switch (priority) {
        case Priority.Critical:
            return <CriticalPriorityIcon {...rest}/>;

        case Priority.High:
            return <HighPriorityIcon {...rest}/>;

        case Priority.Medium:
            return <MediumPriorityIcon {...rest}/>;

        case Priority.Low:
            return <LowPriorityIcon {...rest}/>;

        case Priority.OnHold:
            return <OnHoldPriorityIcon {...rest}/>;

        default:
            throw Error(`Unsupported issue priority (${priority}) for IssuePriorityIcon`);
    }
};

export { IssuePriorityIcon };
