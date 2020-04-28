import React, { CSSProperties, FunctionComponent } from "react";
import ReactSelect, { Styles, Props as SelectProps } from "react-select";
import { SelectComponents } from "react-select/src/components";

import { FieldBaseProps } from "../FieldBase/FieldBase";
import { IFieldOption } from "./Options/IFieldOption";

interface ISelectProps<TOptions = any> extends SelectProps<TOptions>, FieldBaseProps {
    options: TOptions[];
    components?: Partial<SelectComponents<any>>;

    readOnly?: boolean;
    shrink?: boolean;

    name?: string;
    value?: any;
    styles?: Styles;
}

type Props = ISelectProps<IFieldOption>;

const Select: FunctionComponent<Props> = (props: Props) => {
    const {
        id,
        label,
        required,
        readOnly,
        disabled,
        isLoading,
        designVariant,
        shrink,

        input,
        styles,
        active,
        helperText,
        error,

        FieldProps = {},
        InputLabelProps = {},
        FormControlProps = {},
        FormHelperTextProps = {},
        InputProps = {},

        ...rest
    } = props;

    const overriddenStyles: Styles = {
        control: () => ({}), // none of react-select's styles are passed to <Control />
        menu: (provided: CSSProperties, state) => ({
            ...provided,
            zIndex: 2,
        }),
        option: () => ({
            height: "100%",
        }),
        valueContainer: () => ({}),
        input: (provided: CSSProperties, state) => ({
            ...provided,
            "& > div": {
                height: "100%",
            },
            "& input": {
                height: "100%",
            },
        }),

        ...styles,
    };

    const MergedFieldProps: FieldBaseProps = {
        required,
        error,
        disabled,
        inputId: id,
        label,
        helperText,
        designVariant,
        isLoading,
        ...FieldProps,
    };
    if (typeof FormControlProps.fullWidth !== "boolean") {
        FormControlProps.fullWidth = true;
    }
    InputLabelProps.shrink = shrink || input && input.value !== null && input.value !== undefined;

    return (
        <ReactSelect
            hideSelectedOptions={false}
            isSearchable
            isClearable={false}
            inputId={id}

            {...input}
            FieldProps={MergedFieldProps}
            FormControlProps={FormControlProps}
            InputLabelProps={InputLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            {...rest}
            styles={overriddenStyles}
            placeholder={""}
            isDisabled={disabled}
            readOnly={readOnly}
            isFocused={active}
        />
    );
};

export { Select, ISelectProps, Props as SelectProps };
