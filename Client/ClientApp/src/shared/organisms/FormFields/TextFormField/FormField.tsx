import React, { ChangeEvent, FunctionComponent } from "react";
import { FieldRenderProps } from "react-final-form";

import { TextField, ITextFieldProps } from "../../Fields/TextField";

interface ITextFormFieldProps {
    sideOnChange?: (value) => void;
}

type ExportedProps = ITextFormFieldProps & ITextFieldProps;
type Props = ExportedProps & FieldRenderProps<any, HTMLInputElement>;

const FormField: FunctionComponent<Props> = (props: Props) => {
    const {
        input: { name, onChange, value, ...restInput },
        sideOnChange,
        meta,
        ...rest
    } = props;

    let areErrorsDisplayed = false;
    if (meta.error) {
        areErrorsDisplayed = true;
    }
    if (meta.dirtySinceLastSubmit) {
        areErrorsDisplayed = false;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (rest.readOnly || rest.disabled) {
            return;
        }

        onChange(event.target.value);
        if (typeof sideOnChange === "function") {
            sideOnChange(event.target.value);
        }
    };

    return (
        <TextField
            {...restInput}
            {...rest}

            helperText={areErrorsDisplayed ? meta.error || meta.submitError : rest.helperText}
            error={areErrorsDisplayed}

            value={value}
            inputProps={{
                ...restInput,
                ...rest.inputProps,
            }}
            InputProps={{
                name,
                ...rest.InputProps,
            }}
            onChange={handleOnChange}
        />
    );
};

export { FormField, ExportedProps as FormFieldProps };
