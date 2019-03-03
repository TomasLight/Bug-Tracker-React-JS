export class User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    password: string;

    constructor(user: User) {
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