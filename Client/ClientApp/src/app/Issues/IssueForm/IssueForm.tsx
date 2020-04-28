import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";

import { IIssue, Issue } from "@app/Issues/models/Issue";
import { IssueValidator } from "@app/Issues/validation/IssueValidator";
import { Form } from "@shared/organisms/Form/Form";
import { TextFormField } from "@shared/organisms/FormFields/TextFormField/TextFormField";
import { Translate } from "@utils/translates/Translate";

const useStyles = makeStyles((theme: IAppTheme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
    },
    fields: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 16,
        marginBottom: 16,
        overflowY: "auto",
    },
    marginTop: {
        marginTop: 34,
    },
    buttonContainer: {
        paddingRight: 16,
        paddingBottom: 16,
    },
}));

export interface IIssueFormOwnProps {
    className: string;
}

export interface IIssueFormProps {
    issue: Issue;
    buttonText: string;
    isReporterDisplayed: boolean;
}

export interface IIssueFormCallProps {
    submit: (formValues: IIssue) => void;
}

type Props = IIssueFormOwnProps & IIssueFormProps & IIssueFormCallProps;

const IssueForm: FunctionComponent<Props> = (props) => {
    const {
        className,
        issue,
        buttonText,
        isReporterDisplayed,
        submit,
    } = props;
    const classes = useStyles();

    const validate = (formValues: IIssue) => {
        const validator = new IssueValidator();
        const modelState = validator.validate(formValues);
        if (modelState.isInvalid()) {
            return modelState.getErrors();
        }
    };

    return (
        <Form
            initialValues={issue}
            submit={submit}
            validate={validate}
            className={clsx(classes.form, className)}
        >
            <Grid item container direction={"column"} wrap={"nowrap"} className={classes.fields}>
                <Grid item container>
                    type and priority
                </Grid>

                <TextFormField
                    name={nameof<Issue>((o) => o.title)}
                    label={Translate.getString("Title")}
                    className={classes.marginTop}
                />

                <TextFormField
                    name={nameof<Issue>((o) => o.description)}
                    label={Translate.getString("Description")}
                    className={classes.marginTop}
                    InputProps={{
                        multiline: true,
                    }}
                />

                <Grid item container className={classes.marginTop}>
                    assign and reporter
                </Grid>
            </Grid>

            <Grid item container justify={"flex-end"} className={classes.buttonContainer}>
                <Button color={"primary"} variant={"contained"} type={"submit"}>
                    {buttonText}
                </Button>
            </Grid>
        </Form>
    );
};

export { IssueForm };
