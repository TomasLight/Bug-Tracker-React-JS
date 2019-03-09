import * as React from "react";

import {UserDTO} from "../logic/models/UserDTO";
import {Callback} from "../../utils/types/Callback";
import {UserItemContainer} from "./UserItem/UserItemContainer";

export interface IPageUsersProps {
    users: Array<UserDTO>;
}

export interface IPageUsersCallProps {
    load: Callback;
}

type Props = IPageUsersProps & IPageUsersCallProps;

class State {

}

export class PageUsers extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {users: props.users, renderEditUser: props.renderEditUser};
    }

    componentDidMount(): void {
        this.props.load();
    }

    render(): React.ReactNode {
        const {users} = this.props;

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