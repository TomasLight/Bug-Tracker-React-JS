import { IOption } from "./IOption";
import { OptionValueType } from "./OptionValueType";

export interface IFieldOption<TOptionValue = OptionValueType, TInnerValue = OptionValueType>
    extends IOption<TOptionValue> {

    emptySingleValue(): TOptionValue;
    emptyMultiValue(): TOptionValue[];

    emptyOption(): IFieldOption<TOptionValue, TInnerValue>;
    isEmptyOption(): boolean;

    isNullOrEmptySingle(): boolean;
    isNullOrEmptySingleValue(value: any): boolean;

    isNullOrEmptyMulti(): boolean;
    isNullOrEmptyMultiValue(value: any): boolean;

    isEquals(value: TInnerValue): boolean;
    getValue(): TInnerValue;
    setValue(value: TInnerValue): void;
}
