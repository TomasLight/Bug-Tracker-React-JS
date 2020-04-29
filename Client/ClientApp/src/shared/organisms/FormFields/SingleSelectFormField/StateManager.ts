import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { isFieldOption } from "@shared/organisms/Fields/Select/Options/isFieldOption";
import { FieldMetaState } from "react-final-form";
import { ActionMeta } from "react-select/src/types";

export class StateManager {
    private readonly optionInstance: IFieldOption;

    constructor(optionInstance: IFieldOption) {
        this.optionInstance = optionInstance;
    }

    public isEmptySingleValue = (valueOrOption: IFieldOption | any): boolean => {
        if (isFieldOption(valueOrOption)) {
            return valueOrOption.isNullOrEmptySingle();
        }

        return this.optionInstance.isNullOrEmptySingleValue(valueOrOption);
    };

    public isEmptyMultiValue = (value): boolean => {
        return this.optionInstance.isNullOrEmptyMultiValue(value);
    };

    public getDisplayedSingleValue = (options: IFieldOption[], value: any)
        : IFieldOption => {

        if (this.isEmptySingleValue(value)) {
            return this.optionInstance.emptyOption();
        }

        const selectedOption: IFieldOption = options.find(
            (option: IFieldOption) => option.isEquals(value)
        );

        if (selectedOption !== undefined) {
            return selectedOption;
        }
        return this.optionInstance.emptyOption();
    };

    public getDisplayedMultiValue = (options: IFieldOption[], value: any[])
        : IFieldOption[] => {

        if (this.optionInstance.isNullOrEmptyMultiValue(value)) {
            return [];
        }

        const selectedOptions: IFieldOption[] = options.filter(
            (option: IFieldOption) =>
                value.some((val) => option.isEquals(val))
        );
        return selectedOptions;
    };

    public getSelectedSingleOption = (option: IFieldOption, action: ActionMeta<IFieldOption>): IFieldOption => {
        let selectedOption: IFieldOption;

        if (option == null || action.action === "clear") {
            selectedOption = this.optionInstance.emptyOption();
        }
        else {
            selectedOption = option;
        }

        return selectedOption;
    };

    public getSelectedMultiValues = (
        selectedOptions: IFieldOption[],
        action: ActionMeta<IFieldOption[]>
    ): any[] => {
        let selectedValues: any[];

        if (selectedOptions == null || action.action === "clear") {
            selectedValues = this.optionInstance.emptyMultiValue();
        }
        else {
            selectedValues = selectedOptions.map((option: IFieldOption) => option.getValue());
        }

        return selectedValues;
    };

    public isSingleShrink = (meta: FieldMetaState<any>, value: IFieldOption): boolean => {
        return meta.active || meta.modified || !this.isEmptySingleValue(value);
    };
}
