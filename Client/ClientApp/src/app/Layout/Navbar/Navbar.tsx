import { Location } from "history";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { Grid, makeStyles } from "@material-ui/core";
import { BugReport, People, ExitToApp } from "@material-ui/icons";

import { User } from "@app/Users/models/User";
import { UserAvatar } from "@shared/molecules/Avatars/UserAvatar";
import { NavbarButton, NavbarButtonProps } from "@app/Layout/Navbar/NavbarButton/NavbarButton";
import { appUrls } from "@app/routing/appUrls";
import { Logo } from "@shared/atoms/icons/Logo";
import { NavbarIconButton } from "@shared/molecules/Buttons/NavbarIconButton/NavbarIconButton";

const useStyles = makeStyles((theme: IAppTheme) => ({
    navbar: {
        backgroundColor: theme.colors.secondary.main,
        padding: 24,
        width: (width: number) => width,
    },
    logo: {
        cursor: "pointer",
        height: 48,
        width: 48,
    },
    avatar: {
        height: 48,
        width: 48,
        cursor: "pointer",
    },
}));

export interface INavbarOwnProps {
    width: number;
}

export interface INavbarProps {
    currentUser: User;
    location: Location;
}

export interface INavbarCallProps {
    redirect: (url) => void;
}

type Props = INavbarOwnProps & INavbarProps & INavbarCallProps;

const Navbar: FunctionComponent<Props> = (props) => {
    const {
        currentUser,
        location,
        redirect,
        width,
    } = props;
    const classes = useStyles(width);

    const redirectToRoot = () => {
        redirect(appUrls.rootPath);
    };

    const navigationProps: NavbarButtonProps = {
        url: "",
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

                <NavbarButton {...navigationProps} url={appUrls.issuesPath} exact>
                    <BugReport/>
                </NavbarButton>

                <NavbarButton {...navigationProps} url={appUrls.usersPath} exact>
                    <People/>
                </NavbarButton>
            </Grid>

            <Grid item container direction={"column"} justify={"flex-end"}>
                <UserAvatar user={currentUser} className={classes.avatar}/>

                <NavbarIconButton isActive={false}>
                    <ExitToApp/>
                </NavbarIconButton>
            </Grid>
        </Grid>
    );
};

export { Navbar };
