import { IFieldOption } from "../Options/IFieldOption";
import { OptionValueType } from "../Options/OptionValueType";

export class SelectFieldOption<TOptionValue = OptionValueType>
    implements IFieldOption<TOptionValue, TOptionValue> {

    public id: TOptionValue;
    public title: string;

    constructor(option?: { id: any; title: any }) {
        if (option === undefined) {
            this.id = this.emptySingleValue();
            this.title = "";
        }
        else {
            this.id = option.id;
            this.title = option.title;
        }
    }

    public emptySingleValue(): any {
        return "";
    }

    public emptyMultiValue(): TOptionValue[] {
        return [];
    }

    public emptyOption(): SelectFieldOption<TOptionValue> {
        return new SelectFieldOption({
            id: this.emptySingleValue(),
            title: "",
        });
    }

    public isEmptyOption(): boolean {
        return this.id === this.emptySingleValue();
    }

    public isEquals(value: TOptionValue): boolean {
        return this.id === value;
    }

    public isNullOrEmptySingle(): boolean {
        return this.isNullOrEmptySingleValue(this.id);
    }

    public isNullOrEmptySingleValue(value: any): boolean {
        return value === null
            || value === undefined
            || value === this.emptySingleValue();
    }

    public isNullOrEmptyMulti(): boolean {
        return this.isNullOrEmptyMultiValue(this.id);
    }

    public isNullOrEmptyMultiValue(value: any): boolean {
        return value === null
            || value === undefined
            || Array.isArray(value) && value.length === 0
            || value === this.emptySingleValue();
    }

    public getValue(): TOptionValue {
        return this.id;
    }

    public setValue(value: TOptionValue): void {
        this.id = value;
        this.title = "";
    }
}
