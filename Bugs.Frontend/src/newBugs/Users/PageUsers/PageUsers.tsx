import * as React from "react";

import {UserDTO} from "@models/users/UserDTO";
import {Callback} from "@utils/interfaces/Callback";

import {UserItemContainer} from "./UserItem/UserItemContainer";

export interface IPageUsersProps {
    users: Array<UserDTO>;
}

export interface IPageUsersCallProps {
    load: Callback;
}

type Props = IPageUsersProps & IPageUsersCallProps;

class State {
    users: Array<UserDTO>;
}

export class PageUsers extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            users: props.users
        };
    }

    public componentDidMount(): void {
        this.props.load();
    }

    public render(): React.ReactNode {
        const {users} = this.props;

        if (users == null || users.length == null || users.length === 0) {
            return <></>;
        }

        const userProperties = Object.keys(users[0]);
        return (
            <table className="table users">
                <thead>
                    <tr>
                        {
                            userProperties.map((propertyName: string) => {
                                return (
                                    <th key={"user-field-" + propertyName}>
                                        {propertyName}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user: UserDTO) => {
                        return (
                            <UserItemContainer key={"user-" + user.id}
                                               user={user}
                                               userProperties={userProperties}/>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
}