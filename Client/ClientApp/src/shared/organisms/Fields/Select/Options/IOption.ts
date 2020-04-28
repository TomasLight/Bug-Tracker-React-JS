import { OptionValueType } from "./OptionValueType";

export interface IOption<TOptionValue = OptionValueType> {
    id: TOptionValue;
    title: string;
}
