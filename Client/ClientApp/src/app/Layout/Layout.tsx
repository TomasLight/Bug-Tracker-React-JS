import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import {
    Grid,
    makeStyles
} from "@material-ui/core";

import { NavbarContainer } from "@app/Layout/Navbar/Navbar.container";

const navbarWidth = 96;

const useStyles = makeStyles((theme: IAppTheme) => ({
        root: {
            height: "100%",
        },
        container: {
            backgroundColor: theme.colors.background,
            boxSizing: "border-box",
            flex: 1,
            minHeight: "100%",
            maxWidth: `calc(100% - ${navbarWidth}px)`,
        },
    })
);

const Layout: FunctionComponent = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container wrap={"nowrap"} className={classes.root}>
            <NavbarContainer width={navbarWidth}/>
            <Grid item className={classes.container}>
                {children}
            </Grid>
        </Grid>
    );
};

export { Layout };
