export class User {
    public id: number;
    public login: string;
    public password: string;
    public lastName: string;
    public firstName: string;
    public avatar: string;

    constructor() {
        this.id = null;
        this.login = "";
        this.password = "";
        this.lastName = "";
        this.firstName = "";
        this.avatar = "";
    }

    public name(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
