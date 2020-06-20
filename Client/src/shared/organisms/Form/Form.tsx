import { FormApi, FormSubscription, SubmissionErrors } from "final-form";
import { setErrors } from "final-form-set-errors-mutator";
import { IValidator } from "model-state-validation";
import React, { FunctionComponent, KeyboardEvent } from "react";
import { Form as FinalForm } from "react-final-form";

export interface IAppFormProps<FormValues = any> {
    submit: (formValues: FormValues) => void;
    initialValues?: FormValues;
    className?: any;
    validator?: IValidator<FormValues>;
}

type Props = IAppFormProps;

const Form: FunctionComponent<Props> = (props) => {
    const { submit, children, className, validator, ...rest } = props;

    let formApi: FormApi = null;
    let wasSubmit = false;

    const formSubscription: FormSubscription = {
        submitting: true,
        dirtyFieldsSinceLastSubmit: true,
    };

    const onSubmit = (formValues: any) => {
        wasSubmit = true;
        if (!validator) {
            submit(formValues);
            return;
        }

        const modelState = validator.validate(formValues);
        if (modelState.isInvalid()) {
            formApi.pauseValidation();

            formApi.mutators.setErrors(modelState);

            if (formApi.isValidationPaused()) {
                formApi.resumeValidation();
            }
            return;
        }

        submit(formValues);
    };

    const validate = (formValues: any) => {
        if (!validator || !formApi) {
            return;
        }

        const formState = formApi.getState();
        if (formState.pristine && !formState.submitting || !wasSubmit) {
            return;
        }

        const modelState = validator.validate(formValues);
        const errors = modelState.getErrors();

        if (formState.submitting) {
            return errors;
        }

        errors[formState.active] = undefined;
        return errors;
    };

    return (
        <FinalForm
            onSubmit={onSubmit}
            validate={validate}
            subscription={formSubscription}
            mutators={{
                setErrors,
            }}
            {...rest}
        >
            {({ handleSubmit, form }) => {
                formApi = form;

                const onKeyPress = (event: KeyboardEvent) => {
                    if (event.key === "Enter" && !event.shiftKey) {
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
