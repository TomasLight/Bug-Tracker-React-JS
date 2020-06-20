import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

export interface ISwitchableFieldOption extends IFieldOption {
    isDisabled: boolean;
}
