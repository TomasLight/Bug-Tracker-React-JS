import { NavbarIconButton } from "@shared/molecules/Buttons/NavbarIconButton/NavbarIconButton";
import { Location } from "history";
import React, { FunctionComponent } from "react";

interface INavbarButtonProp {
    location: Location;
    url: string;
    exact?: boolean;
}

interface INavbarButtonCallProp {
    redirect: (url) => void;
}

type Props = INavbarButtonProp & INavbarButtonCallProp;

const NavbarButton: FunctionComponent<Props> = (props) => {
    const {
        children,
        location,
        url,
        exact = false,
        redirect,
    } = props;

    const isActive = exact
        ? location.pathname === url
        : location.pathname.startsWith(url);

    const handleRedirect = () => {
        if (!isActive) {
            redirect(url);
        }
    };

    return (
        <NavbarIconButton isActive={isActive} onClick={handleRedirect}>
            {children}
        </NavbarIconButton>
    );
};

export { NavbarButton, Props as NavbarButtonProps };
