import * as React from "react";
import {Callback} from "../../utils/interfaces/Callback";
import {UserDTO} from "../logic/models/UserDTO";


export interface IPageUserEditorProps {
    user: UserDTO;
}

export interface IPageUserEditorCallProps {
    load: () => void;
    openUsers: Callback;
    // save: (user: UserDTO) => void;
}

type Props = IPageUserEditorProps & IPageUserEditorCallProps;

class State {
    isNew: boolean;
}

export class PageUserEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isNew: props.user.id == 0
        };
    }

    componentDidMount(): void {
        this.props.load();
    }

    onSave = () => {
        // if (this.refs.userFirstName.value == "") {
        //     alert("Введите имя");
        // } else if (this.refs.userLastName.value == "") {
        //     alert("Введите фамилию");
        // } else if (this.isNew && this.refs.userLogin.value == "") {
        //     alert("Введите логин");
        // } else if (this.isNew && this.refs.userPassword.value == "") {
        //     alert("Введите пароль");
        // } else if (this.refs.userPassword.value !== this.refs.userConfirmPassword.value) {
        //     alert("Пароли должны совпадать");
        // } else {
        //     props.save(this.state.id,
        //         this.refs.userFirstName.value,
        //         this.refs.userLastName.value,
        //         this.refs.userLogin.value,
        //         this.refs.userPassword.value,
        //         this.state.renderUserList);
        // }
    };

    render() {
        const {user} = this.props;
        const {isNew} = this.state;

        return (
            <div>
                <div className="user-info-container">
                    <div>
                        <h4> User #{user.id} </h4>
                        <div>
                            <label>First name</label>
                            <input className="bug-input" defaultValue={user.firstName} ref="userFirstName"/>
                        </div>
                        <div>
                            <label>Last name</label>
                            <input className="bug-input" defaultValue={user.lastName} ref="userLastName"/>
                        </div>
                        <div>
                            <label>Login</label>
                            <input className="bug-input" defaultValue={user.login} ref="userLogin" disabled={!isNew}/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input className="bug-input" defaultValue="" ref="userPassword" type="password"/>
                        </div>
                        <div>
                            <label>Confirm password</label>
                            <input className="bug-input" defaultValue="" ref="userConfirmPassword" type="password"/>
                        </div>
                    </div>

                    <button className="bug-button" onClick={this.onSave}>Save</button>
                </div>
            </div>
        );
    }
}
