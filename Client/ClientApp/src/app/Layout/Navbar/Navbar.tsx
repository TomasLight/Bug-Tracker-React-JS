import { Location } from "history";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { Grid } from "@material-ui/core";
import { BugReport, People, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

import { NavbarButton } from "@app/Layout/Navbar/NavbarButton/NavbarButton";
import { appUrls } from "@app/routing/appUrls";
import { Logo } from "@shared/atoms/icons/Logo";
import { NavbarIconButton } from "@shared/molecules/Buttons/NavbarIconButton/NavbarIconButton";

const useStyles = makeStyles((theme: IAppTheme) => ({
    navbar: {
        backgroundColor: theme.colors.secondary.main,
        padding: 24,
        width: 96,
    },
    logo: {
        cursor: "pointer",
        height: 48,
        width: 48,
    },
}));

export interface INavbarProps {
    location: Location;
}

export interface INavbarCallProps {
    redirect: (url) => void;
}

type Props = INavbarProps & INavbarCallProps;

const Navbar: FunctionComponent<Props> = (props) => {
    const { location, redirect } = props;
    const classes = useStyles();

    const redirectToRoot = () => {
        redirect(appUrls.rootPath);
    };

    const navigationProps: INavbarProps & INavbarCallProps = {
        location,
        redirect,
    };

    return (
        <Grid item container className={classes.navbar} justify={"space-between"}>
            <Grid item container direction={"column"}>
                <Logo
                    classes={{
                        root: classes.logo,
                    }}
                    onClick={redirectToRoot}
                />

                <NavbarButton url={appUrls.issuesPath} {...navigationProps}>
                    <BugReport/>
                </NavbarButton>

                <NavbarButton url={appUrls.usersPath} {...navigationProps}>
                    <People/>
                </NavbarButton>
            </Grid>

            <Grid item container direction={"column"} justify={"flex-end"}>
                <NavbarIconButton isActive={false}>
                    <ExitToApp/>
                </NavbarIconButton>
            </Grid>
        </Grid>
    );
};

export { Navbar };
