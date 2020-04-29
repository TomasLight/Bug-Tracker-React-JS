import { User } from "@app/Users/models/User";
import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

export class UserSelectFieldOption extends SelectFieldOption<number> {
    public readonly user: User;

    constructor(user: User = new User()) {
        super({
            id: user.id,
            title: user.name(),
        });
        this.user = user;
    }

    public emptySingleValue(): any {
        return new User().id;
    }

    public emptyOption(): UserSelectFieldOption {
        return new UserSelectFieldOption();
    }
}
