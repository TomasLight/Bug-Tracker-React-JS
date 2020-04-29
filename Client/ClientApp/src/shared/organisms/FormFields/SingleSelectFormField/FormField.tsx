import React, { FocusEvent, FunctionComponent, useMemo, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import { ActionMeta, ActionTypes, InputActionMeta } from "react-select/src/types";

import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { ISingleSelectProps, SingleSelect } from "@shared/organisms/Fields/Select/SingleSelect";
import { StateManager } from "./StateManager";

interface ISelectFormFieldProps extends ISingleSelectProps {
    newOption?: () => IFieldOption;
    sideOnChange?: (value: any, actionType?: ActionTypes) => void;
    clearOnBlur?: boolean;
}

type ExportedProps = ISelectFormFieldProps;
type Props = ExportedProps & FieldRenderProps<any, HTMLInputElement>;

const FormField: FunctionComponent<Props> = (props: Props) => {
    const {
        input: { name, onChange, onFocus, onBlur, value, ...restInput },
        sideOnChange,
        options,
        meta,
        newOption = () => new SelectFieldOption(),
        onInputChange,
        clearOnBlur = false,
        ...rest
    } = props;

    const [ stateManager ] = useState<StateManager>(new StateManager(newOption()));
    const [ stateValue, setStateValue ] = useState<any>(value);
    const [ isInputChanged, setIsInputChanged ] = useState<boolean>(false);

    const displayedValue: IFieldOption = useMemo(() => {
        const fieldOption = stateManager.getDisplayedSingleValue(options, value);

        if (!fieldOption.isEquals(stateValue)) {
            const selectedValue = fieldOption.getValue();
            setStateValue(selectedValue);
        }
        return fieldOption;
    }, [ options, value ]);

    const handleOnChange = (option: IFieldOption, action: ActionMeta<IFieldOption>) => {
        if (rest.readOnly || rest.disabled) {
            return;
        }

        const selectedOption = stateManager.getSelectedSingleOption(option, action);
        const selectedValue = selectedOption.getValue();

        setStateValue(selectedValue);
        onChange(selectedValue);
        if (typeof sideOnChange === "function") {
            sideOnChange(selectedValue, action.action);
        }

        setIsInputChanged(false);
    };

    // for validation on blur
    // if we start type, we should call onChange to trigger validation and
    // mark field as last focused
    const handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
        setIsInputChanged(true);
        if (typeof onInputChange === "function" && actionMeta.action === "input-change") {
            onInputChange(newValue, actionMeta);
            // trigger for field validation
            onChange(stateValue);
        }
    };

    const handleOnBlur = (event: FocusEvent<any>) => {
        onBlur(event);
        if (typeof rest.onBlur === "function") {
            rest.onBlur(event);
        }
        if (clearOnBlur && isInputChanged) {
            const option = newOption();
            handleOnChange(option.emptyOption(), { action: "clear" });
        }
        setIsInputChanged(false);
    };

    let areErrorsDisplayed = false;
    if (meta.error) {
        areErrorsDisplayed = true;
    }
    if (meta.dirtySinceLastSubmit) {
        areErrorsDisplayed = false;
    }
    const shrink = stateManager.isSingleShrink(meta, displayedValue);

    return (
        <SingleSelect
            {...restInput}
            {...rest}

            active={meta.active}
            shrink={shrink}
            helperText={areErrorsDisplayed ? meta.error || meta.submitError : undefined}
            error={areErrorsDisplayed}

            options={options}
            getOptionLabel={(option: IFieldOption) => option.title}
            getOptionValue={(option: IFieldOption<any>) => option.id}

            value={displayedValue}
            onChange={handleOnChange}
            onFocus={onFocus}
            onBlur={handleOnBlur}
            onInputChange={handleInputChange}
        />
    );
};

export { FormField, ExportedProps as FormFieldProps };
