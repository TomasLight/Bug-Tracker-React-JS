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

// class EditUser extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             renderUserList: props.renderUserList,
//             id: props.user.id,
//             firstName: props.user.firstName,
//             lastName: props.user.lastName,
//             login: props.user.login,
//             password: props.user.password
//         };
//         this.isNew = this.state.id == 0;
//         this.onSave = this.onSave.bind(this);
//     }
//     onSave() {
//         if (this.refs.userFirstName.value == "") {
//             alert("Введите имя");
//         }
//         else if (this.refs.userLastName.value == "") {
//             alert("Введите фамилию");
//         }
//         else if (this.isNew && this.refs.userLogin.value == "") {
//             alert("Введите логин");
//         }
//         else if (this.isNew && this.refs.userPassword.value == "") {
//             alert("Введите пароль");
//         }
//         else if (this.refs.userPassword.value !== this.refs.userConfirmPassword.value) {
//             alert("Пароли должны совпадать");
//         }
//         else {
//             SaveUser(this.state.id,
//                 this.refs.userFirstName.value,
//                 this.refs.userLastName.value,
//                 this.refs.userLogin.value,
//                 this.refs.userPassword.value,
//                 this.state.renderUserList);
//         }
//     }
//     render() {
//         return <div>
//             <div className="user-info-container">
//                 <div>
//                     <h4> User #{this.state.id} </h4>
//                     <div>
//                         <label>First name</label>
//                         <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.firstName} ref="userFirstName" />
//                     </div>
//                     <div>
//                         <label>Last name</label>
//                         <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.lastName} ref="userLastName" />
//                     </div>
//                     <div>
//                         <label>Login</label>
//                         <input className="bug-input" key={globalElementIndex++} defaultValue={this.state.login} ref="userLogin" disabled={!this.isNew} />
//                     </div>
//                     <div>
//                         <label>Password</label>
//                         <input className="bug-input" key={globalElementIndex++} defaultValue="" ref="userPassword" type="password" />
//                     </div>
//                     <div>
//                         <label>Confirm password</label>
//                         <input className="bug-input" key={globalElementIndex++} defaultValue="" ref="userConfirmPassword" type="password" />
//                     </div>
//                 </div>
//
//                 <button className="bug-button" onClick={this.onSave}>Save</button>
//             </div>
//         </div>;
//     }
// }