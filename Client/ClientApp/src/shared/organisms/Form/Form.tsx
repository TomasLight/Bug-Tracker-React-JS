import { FormSubscription, ValidationErrors } from "final-form";
import React, { FunctionComponent, KeyboardEvent } from "react";
import { Form as FinalForm } from "react-final-form";

export interface IAppFormProps<FormValues = any> {
    submit: (formValues: FormValues) => void;
    initialValues?: FormValues;
    className?: any;
    validate?: (
        values: FormValues
    ) => ValidationErrors | Promise<ValidationErrors> | undefined;
    validateOnBlur?: boolean;
}

type Props = IAppFormProps;

const Form: FunctionComponent<Props> = (props) => {
    const { submit, children, className, ...rest } = props;

    const formSubscription: FormSubscription = {
        submitting: true,
    };

    return (
        <FinalForm
            onSubmit={submit}
            subscription={formSubscription}
            {...rest}
        >
            {({ handleSubmit }) => {
                const onKeyPress = (event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                        handleSubmit();
                    }
                };

                return (
                    <form
                        onSubmit={handleSubmit}
                        onKeyPress={onKeyPress}
                        className={className}
                        noValidate
                    >
                        {children}
                    </form>
                );
            }}
        </FinalForm>
    );
};

export { Form };
