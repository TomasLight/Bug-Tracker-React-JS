import { User } from "@app/Users/models/User";
import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

export class UserSelectFieldOption extends SelectFieldOption<number> {
    private readonly user: User;

    constructor(user: User = User.Undefined()) {
        super({
            id: user.id,
            title: user.name(),
        });
        this.user = user;
    }

    public avatarUrl = () => this.user.avatarUrl();
}
