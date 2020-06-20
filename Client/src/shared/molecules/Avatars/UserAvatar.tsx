import React, { FunctionComponent } from "react";
import { Avatar, AvatarProps } from "@material-ui/core";

import { User } from "@app/Users/models/User";

export interface IUserAvatarProps {
    user: User;
}

type Props = IUserAvatarProps & AvatarProps;

const UserAvatar: FunctionComponent<Props> = (props) => {
    const {
        user,
        ...rest
    } = props;

    if (!user) {
        return (
            <Avatar alt={"Undefined"} src={User.undefinedAvatarUrl()} {...rest}/>
        );
    }

    if (!user.avatar) {
        return (
            <Avatar alt={user.name()} {...rest}>
                {user.name()[0]}
            </Avatar>
        );
    }

    return (
        <Avatar alt={user.name()} src={user.avatarUrl()} {...rest}/>
    );
};

export { UserAvatar };
