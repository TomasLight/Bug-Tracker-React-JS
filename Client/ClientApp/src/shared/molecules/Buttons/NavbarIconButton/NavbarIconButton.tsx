import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { IconButton, IconButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        "&:not(first-of-type)": {
            marginTop: 20,
        },
    },
    default: {
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.text,

        "&:hover": {
            backgroundColor: theme.colors.primary.hover,
        },
    },
    // todo: change color binding
    active: {
        backgroundColor: theme.colors.primary.disabled.main,
        color: theme.colors.primary.disabled.text,

        "&:hover": {
            backgroundColor: theme.colors.primary.disabled.main,
        },
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
        <IconButton className={className} {...rest}>
            {children}
        </IconButton>
    );
};

export { NavbarIconButton };
