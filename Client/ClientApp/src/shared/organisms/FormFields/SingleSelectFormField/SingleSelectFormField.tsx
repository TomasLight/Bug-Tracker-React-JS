import { FieldSubscription } from "final-form";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";

import { DefaultFieldSubscription } from "../DefaultFieldSubscription";
import { FormField, FormFieldProps } from "./FormField";

type Props = FormFieldProps & {
    name: string;
    subscription?: FieldSubscription;
};

const SingleSelectFormField: FunctionComponent<Props> = (props: Props) => {
    const {
        name,
        subscription = DefaultFieldSubscription,
        ...rest
    } = props;

    return (
        <Field
            name={name}
            component={FormField}
            {...rest}
        />
    );
};

export { SingleSelectFormField, Props as SingleSelectFormFieldProps };
