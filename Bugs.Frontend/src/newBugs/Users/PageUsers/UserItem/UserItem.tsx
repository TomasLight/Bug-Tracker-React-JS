import * as React from "react";
import {UserDTO} from "../../../../models/users/UserDTO";

export interface IUserItemProps {
    user: UserDTO;
    userProperties: Array<string>;
}

export interface IUserItemCallProps {
    openUser: (userId: number) => void;
}

type Props = IUserItemProps & IUserItemCallProps;

export const UserItem: React.FunctionComponent<Props> = (props: Props) => {
    const {user, userProperties, openUser} = props;

    return (
        <tr className='user-row' onClick={() => openUser(user.id)}>
            {
                userProperties.map((property: string) => {
                    return (
                        <td key={"user-item-" + user.id + "-prop-" + property}>
                            {user[property]}
                        </td>
                    );
                })
            }
        </tr>
    );
};