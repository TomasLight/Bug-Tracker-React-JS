import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        backgroundColor: theme.colors.secondary.main,
        color: theme.colors.secondary.text,
        "&:hover": {
            backgroundColor: theme.colors.secondary.hover,
        },

        borderRadius: "50%",
        borderWidth: 2,
        borderStyle: "solid",

        "&:not(first-of-type)": {
            marginTop: 20,
        },
    },

    default: {
        borderColor: "transparent",
    },
    active: {
        borderColor: theme.colors.primary.main,
    },
}));

interface INavbarButtonProp {
    isActive: boolean;
}

type Props = INavbarButtonProp & IconButtonProps;

const NavbarIconButton: FunctionComponent<Props> = (props) => {
    const {
        isActive,
        children,
        ...rest
    } = props;

    const classes = useStyles();

    let className = classes.root;
    if (isActive) {
        className = clsx(className, classes.active);
    }
    else {
        className = clsx(className, classes.default);
    }

    return (
        <IconButton className={className} color={"secondary"} {...rest}>
            {children}
        </IconButton>
    );
};

export { NavbarIconButton };
