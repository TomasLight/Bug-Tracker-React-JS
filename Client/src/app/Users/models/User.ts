export class User {
    public id: number;
    public login: string;
    public password: string;
    public lastName: string;
    public firstName: string;
    public avatar: string;

    constructor(user?: User) {
        if (!user) {
            this.id = null;
            this.login = "";
            this.password = "";
            this.lastName = "";
            this.firstName = "";
            this.avatar = "";
        }
        else {
            this.copy(user);
        }
    }

    public name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public avatarUrl(): string {
        return `/images/${this.avatar}`;
    }

    private copy(user: User) {
        this.id = user.id;
        this.login = user.login;
        this.password = user.password;
        this.lastName = user.lastName;
        this.firstName = user.firstName;
        this.avatar = user.avatar;
    }

    public static undefinedAvatarUrl(): string {
        return `/images/Undefined.png`;
    }
}
