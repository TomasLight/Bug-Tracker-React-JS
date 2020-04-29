import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { IconButton, makeStyles, SvgIconProps } from "@material-ui/core";

import { FilterItem } from "@app/Issues/models/FilterItem";
import { FilterItemType } from "@app/Issues/models/FilterItemType";
import { IssuePriorityIcon } from "@app/Issues/IssuePriorityIcon/IssuePriorityIcon";
import { IssueTypeIcon } from "@app/Issues/IssueTypeIcon/IssueTypeIcon";

const transition = "200ms cubic-bezier(0.09, 0.2, 0.6, 0.93) 0ms";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        borderRadius: "50%",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 10,
        transition: `width ${transition}`,

        marginRight: 8,
        "&:nth-last-child(2)": {
            marginRight: 16,
        },
    },

    default: {
        borderColor: "transparent",
    },
    active: {
        borderColor: theme.colors.secondary.main,
    },
}));

export interface IFilterItemButtonProps {
    item: FilterItem;
    isOpen: boolean;
}

export interface IFilterItemButtonCallProps {
    onClick: (item: FilterItem) => void;
}

type Props = IFilterItemButtonProps & IFilterItemButtonCallProps;

const FilterItemButton: FunctionComponent<Props> = (props) => {
    const {
        item,
        isOpen,
        onClick,
    } = props;

    const classes = useStyles();

    if (!isOpen && !item.isActive) {
        return null;
    }

    const handleClick = () => onClick(item);

    const IconComponent: FunctionComponent = () => {
        switch (item.type) {
            case FilterItemType.IssueType:
                return <IssueTypeIcon issueType={item.value}/>;

            case FilterItemType.Priority:
                return <IssuePriorityIcon priority={item.value}/>;

            case FilterItemType.AssignedUser:
            default:
                throw new Error(`Not implemented icon component for ${nameof<FilterItemType>()} (${item.type})`);
        }
    };

    return (
        <IconButton
            onClick={handleClick}
            color={"primary"}
            classes={{
                root: classes.root,
                colorPrimary: item.isActive ? classes.active : classes.default,
            }}
        >
            <IconComponent/>
        </IconButton>
    );
};

export { FilterItemButton };
