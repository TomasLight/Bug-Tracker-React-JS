import React, { FunctionComponent } from "react";
import { FormControl, InputLabelProps, FormControlProps as MuiFormControlProps } from "@material-ui/core";

import { FieldError, IFieldErrorProps } from "@shared/molecules/FieldError/FieldError";
import {
    FieldLoadingIndicator,
    IFieldLoadingIndicatorProps
} from "@shared/molecules/FieldLoadingIndicator/FieldLoadingIndicator";
import { CustomEndAdornment } from "@shared/molecules/CustomEndAdornment/CustomEndAdornment";
import { Guid } from "@utils/Guid";

import {
    FieldProps,
} from "./FieldProps";
import { FieldLabel } from "./FieldLabel";
import { getHelperTextId } from "./getHelperTextId";
import { getLabelTextId } from "./getLabelTextId";

export interface IFieldBaseProps extends FieldProps {
    inputId?: string;
}

type Props = IFieldBaseProps & {
    className?: string;
    FormControlProps?: Partial<MuiFormControlProps>;
    FormHelperTextProps?: Partial<IFieldErrorProps>;
    InputLabelProps?: InputLabelProps;
    FieldLoadingIndicatorProps?: Partial<IFieldLoadingIndicatorProps>;
    customEndAdornment?: Element;
};

const FieldBase: FunctionComponent<Props> = (props) => {
    const {
        inputId = Guid.generate(),
        label,
        helperText,

        children,

        disabled = false,
        error = false,
        required = false,
        isLoading = false,

        className,
        FormControlProps,
        FormHelperTextProps,
        InputLabelProps,
        FieldLoadingIndicatorProps,
        customEndAdornment,
    } = props;

    const helperTextId = getHelperTextId(inputId);
    const labelId = getLabelTextId(inputId);

    return (
        <FormControl
            className={className}
            {...FormControlProps}
            disabled={disabled}
            error={error}
            required={required}
            variant="outlined"
        >
            <FieldLabel
                label={label}
                InputLabelProps={InputLabelProps}
                inputId={inputId}
                id={labelId}
                disabled={disabled}
            />

            {children}

            {Boolean(customEndAdornment) && (
                <CustomEndAdornment>
                    {customEndAdornment}
                </CustomEndAdornment>
            )}

            <FieldError
                id={helperTextId}
                show={Boolean(helperText || error)}
                error={error}
                text={helperText}
                {...FormHelperTextProps}
            />

            <FieldLoadingIndicator
                isLoading={isLoading}
                right={17}
                {...FieldLoadingIndicatorProps}
            />
        </FormControl>
    );
};

export { FieldBase, Props as FieldBaseProps };
