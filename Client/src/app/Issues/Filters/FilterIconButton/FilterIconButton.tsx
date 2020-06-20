import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

const transition = "200ms cubic-bezier(0.09, 0.2, 0.6, 0.93) 0ms";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        transition: `backgroundColor ${transition}, color ${transition}`,
    },
    default: {
        backgroundColor: "transparent",
        color: theme.colors.primary.main,

        "&:hover": {
            backgroundColor: theme.colors.primary.outline.hover,
        },
    },
    active: {
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.text,

        "&:hover": {
            backgroundColor: theme.colors.primary.hover,
        },
    },

    iconRoot: {
        transition: `transform ${transition}`,
    },
    iconDefault: {
        transform: "rotate(0deg)",
    },
    iconActive: {
        transform: "rotate(90deg)",
    },
}));

export interface IFilterIconButtonProps {
    isActive: boolean;
}

export interface IFilterIconButtonCallProps {
    onClick: () => void;
}

type Props = IFilterIconButtonProps & IFilterIconButtonCallProps;

const FilterIconButton: FunctionComponent<Props> = (props) => {
    const {
        isActive,
        onClick,
    } = props;

    const classes = useStyles();

    return (
        <IconButton
            onClick={onClick}
            color={"primary"}
            classes={{
                root: classes.root,
                colorPrimary: isActive ? classes.active : classes.default,
            }}
        >
            <FilterList
                className={clsx(
                    classes.iconRoot,
                    isActive ? classes.iconActive : classes.iconDefault
                )}
            />
        </IconButton>
    );
};

export { FilterIconButton };
