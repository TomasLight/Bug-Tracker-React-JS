import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

export function isFieldOption (option: any): option is IFieldOption {
    if (typeof option !== "object" || option == null) {
        return false;
    }
    return nameof<IFieldOption>((o) => o.isNullOrEmptySingle) in option;
}
