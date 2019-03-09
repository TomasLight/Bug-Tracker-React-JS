// class UserRow extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = { user: props.user, userFields: props.userFields, renderEditUser: props.renderEditUser };
//         this.onClick = this.onClick.bind(this);
//     }
//     onClick() {
//         let userId = this.state.user.id;
//         this.state.renderEditUser(userId);
//     }
//     render() {
//         var userFields = this.state.userFields;
//         var user = this.state.user;
//         return <tr className='user-row' onClick={this.onClick}>
//             {
//                 userFields.map(function (field) {
//                     return <td key={globalElementIndex++}>{user[field]}</td>;
//                 })
//             }
//         </tr>;
//     }
// }
//
// class UserList extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = { users: props.users, renderEditUser: props.renderEditUser };
//     }
//     render() {
//         var userList = this.state.users;
//         var renderEditUser = this.state.renderEditUser;
//         var userFields = Object.keys(userList[0]);
//         return (<table className="table users">
//             <thead>
//                 <tr>
//                     {
//                         userFields.map(function (field) {
//                             return <th key={globalElementIndex++}>{field}</th>;
//                         })
//                     }
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     userList.map(function (user) {
//                         return <UserRow key={globalElementIndex++} user={user} userFields={userFields} renderEditUser={renderEditUser}/>;
//                     })
//                 }
//             </tbody>
//         </table>);
//     }
// }