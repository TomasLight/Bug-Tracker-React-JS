import React, { FunctionComponent } from "react";

import { InputBaseComponentProps, OutlinedInput, OutlinedInputProps, } from "@material-ui/core";

import { Guid } from "@utils/Guid";
import { FieldBase, FieldBaseProps } from "./FieldBase/FieldBase";
import { getHelperTextId } from "./FieldBase/getHelperTextId";

export interface ITextFieldProps extends FieldBaseProps {
    value?: any;
    onChange?: (value: any) => void;
    InputProps?: Partial<OutlinedInputProps>;
    inputProps?: Partial<InputBaseComponentProps>;
}

type Props = ITextFieldProps;

const TextField: FunctionComponent<Props> = (props) => {
    const {
        id = Guid.generate(),
        value,
        onChange,

        disabled = false,
        error = false,
        required = false,

        inputProps,
        InputProps = {},

        ...rest
    } = props;

    const helperTextId = getHelperTextId(id);

    return (
        <FieldBase
            disabled={disabled}
            error={error}
            required={required}
            inputId={id}
            {...rest}
        >
            <OutlinedInput
                value={value}
                labelWidth={0}
                aria-describedby={helperTextId}
                id={id}
                required={required}
                inputProps={inputProps}
                {...InputProps}
                onChange={onChange}
            />
        </FieldBase>
    );
};

export { TextField };
