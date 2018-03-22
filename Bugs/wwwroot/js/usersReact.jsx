class UserModel {
    constructor(user) {
        if (user == null) {
            this.id = 0;
            this.firstName = "";
            this.lastName = "";
            this.login = "";
            this.password = "";
        }
        else {
            this.id = user.id;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.login = user.login;
            this.password = user.password;
        }
    }
}
class UserRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: props.user, userFields: props.userFields, renderEditUser: props.renderEditUser };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let userId = this.state.user.id;
        this.state.renderEditUser(userId);
    }
    render() {
        var userFields = this.state.userFields;
        var user = this.state.user;
        return <tr className='user-row' onClick={this.onClick}>
            {
                userFields.map(function (field) {
                    return <td key={globalElementIndex++}>{user[field]}</td>;
                })
            }
        </tr>;
    }
}

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: props.users, renderEditUser: props.renderEditUser };
    }
    render() {
        var userList = this.state.users;
        var renderEditUser = this.state.renderEditUser;
        var userFields = Object.keys(userList[0]);
        return (<table className="table users">
            <thead>
                <tr>
                    {
                        userFields.map(function (field) {
                            return <th key={globalElementIndex++}>{field}</th>;
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    userList.map(function (user) {
                        return <UserRow key={globalElementIndex++} user={user} userFields={userFields} renderEditUser={renderEditUser}/>;
                    })
                }
            </tbody>
        </table>);
    }
}
function SaveUser(id, firstName, lastName, login, password, renderFunction) {
    let model = new UserModel(null);
    model.id = id;
    model.firstName = firstName;
    model.lastName = lastName;
    model.login = login;
    model.password = password;

    Send(model, _saveUserPath, function (data) {
        renderFunction();
    }, true);
}

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderUserList: props.renderUserList,
            id: props.user.id,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            login: props.user.login,
            password: props.user.password
        };
        this.isNew = this.state.id == 0;
        this.onSave = this.onSave.bind(this);
    }
    onSave() {
        if (this.refs.userFirstName.value == "") {
            alert("Введите имя");
        }
        else if (this.refs.userLastName.value == "") {
            alert("Введите фамилию");
        }
        else if (this.isNew && this.refs.userLogin.value == "") {
            alert("Введите логин");
        }
        else if (this.isNew && this.refs.userPassword.value == "") {
            alert("Введите пароль");
        }
        else if (this.refs.userPassword.value !== this.refs.userConfirmPassword.value) {
            alert("Пароли должны совпадать");
        }
        else {
            SaveUser(this.state.id,
                this.refs.userFirstName.value,
                this.refs.userLastName.value,
                this.refs.userLogin.value,
                this.refs.userPassword.value,
                this.state.renderUserList);
        }
    }
    render() {
        return <div>
            <div className="user-info-container">
                <div>
                    <h4> User #{this.state.id} </h4>
                    <div>
                        <label>First name</label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.firstName} ref="userFirstName" />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.lastName} ref="userLastName" />
                    </div>
                    <div>
                        <label>Login</label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.login} ref="userLogin" disabled={!this.isNew} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue="" ref="userPassword" type="password" />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <input className="bug-input" key={globalElementIndex++} defaultValue="" ref="userConfirmPassword" type="password" />
                    </div>
                </div>

                <button className="bug-button" onClick={this.onSave}>Save</button>
            </div>
        </div>;
    }
}