import { FieldSubscription } from "final-form";
import React, { FunctionComponent } from "react";
import { Field } from "react-final-form";

import { SingleOptionWithIcon } from "@shared/molecules/SelectComponents/ComponentsWithIcon/SingleOptionWithIcon";
import { SingleValueWithIcon } from "@shared/molecules/SelectComponents/ComponentsWithIcon/SingleValueWithIcon";
import { DefaultFieldSubscription } from "../DefaultFieldSubscription";
import { FormField, FormFieldProps } from "./FormField";

type Props = FormFieldProps & {
    name: string;
    subscription?: FieldSubscription;
};

const SingleSelectFormFieldWithIcons: FunctionComponent<Props> = (props: Props) => {
    const {
        name,
        subscription = DefaultFieldSubscription,
        ...rest
    } = props;

    return (
        <Field
            name={name}
            component={FormField}
            components={{
                Option: SingleOptionWithIcon,
                SingleValue: SingleValueWithIcon,
                ...rest.components,
            }}
            {...rest}
        />
    );
};

export { SingleSelectFormFieldWithIcons, Props as SingleSelectFormFieldWithIconsProps };
