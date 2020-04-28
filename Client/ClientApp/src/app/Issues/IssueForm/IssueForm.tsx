import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Avatar, Button, Grid, makeStyles } from "@material-ui/core";

import { IIssue, Issue } from "@app/Issues/models/Issue";
import { IssueValidator } from "@app/Issues/validation/IssueValidator";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { Form } from "@shared/organisms/Form/Form";
import { TextFormField } from "@shared/organisms/FormFields/TextFormField/TextFormField";
import { IssuePriorityIcon } from "@app/Issues/IssuePriorityIcon/IssuePriorityIcon";
import { IssueTypeIcon } from "@app/Issues/IssueTypeIcon/IssueTypeIcon";
import { UserSelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/UserSelectFieldOption";
import { SingleSelectFormFieldWithIcons } from "@shared/organisms/FormFields/SingleSelectFormField/SingleSelectFormFieldWithIcons";
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
        overflowY: "scroll",
    },
    marginTop: {
        marginTop: 34,
    },
    marginRight: {
        marginRight: 24,
    },
    select: {
        width: 200,
    },
    avatar: {
        padding: "9px 8px 9px 0",
        height: 36,
        width: 36,
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 8,
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

    issueTypeOptions: IFieldOption[];
    priorityOptions: IFieldOption[];
    assignOptions: UserSelectFieldOption[];
    reporterOptions: UserSelectFieldOption[];
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

        issueTypeOptions,
        priorityOptions,
        assignOptions,
        reporterOptions,

        submit,
    } = props;
    const classes = useStyles();

    const ref = useRef<HTMLDivElement>(null);
    const [ rightPadding, setRightPadding ] = useState<number>(16);

    useEffect(() => {
        if (!ref || !ref.current) {
            return;
        }
        const scrollbarWidth = ref.current.offsetWidth - ref.current.clientWidth;
        const padding = Math.max(0, 16 - scrollbarWidth);
        setRightPadding(padding);
    }, [ ref, ref.current ]);

    const validate = (formValues: IIssue) => {
        const validator = new IssueValidator();
        const modelState = validator.validate(formValues);
        if (modelState.isInvalid()) {
            return modelState.getErrors();
        }
    };

    const renderUserAvatar = (option: UserSelectFieldOption) => (
        <Avatar alt={option.title} src={option.avatarUrl()} className={classes.avatar}/>
    );

    const renderIssueTypeIcon = (option: IFieldOption<number>) => (
        <IssueTypeIcon issueType={option.id} className={classes.icon}/>
    );

    const renderPriorityIcon = (option: IFieldOption<number>) => (
        <IssuePriorityIcon priority={option.id} className={classes.icon}/>
    );

    return (
        <Form
            initialValues={issue}
            submit={submit}
            validate={validate}
            className={clsx(classes.form, className)}
        >
            <Grid
                ref={ref}
                item
                container
                direction={"column"}
                wrap={"nowrap"}
                className={classes.fields}
                style={{
                    padding: `12px ${rightPadding}px 16px 24px`,
                }}
            >
                <Grid item container justify={"space-between"}>
                    <SingleSelectFormFieldWithIcons
                        name={nameof<Issue>((o) => o.type)}
                        label={Translate.getString("Type")}
                        options={issueTypeOptions}
                        renderIcon={renderIssueTypeIcon}
                        className={clsx(classes.select, classes.marginRight)}
                    />

                    <SingleSelectFormFieldWithIcons
                        name={nameof<Issue>((o) => o.priority)}
                        label={Translate.getString("Priority")}
                        options={priorityOptions}
                        renderIcon={renderPriorityIcon}
                        className={classes.select}
                    />
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
                    <SingleSelectFormFieldWithIcons
                        name={nameof<Issue>((o) => o.assignedUserId)}
                        label={Translate.getString("Assign")}
                        options={assignOptions}
                        renderIcon={renderUserAvatar}
                        newOption={() => new UserSelectFieldOption()}
                        className={clsx(classes.select, classes.marginRight)}
                    />

                    {isReporterDisplayed && (
                        <SingleSelectFormFieldWithIcons
                            name={nameof<Issue>((o) => o.reporterId)}
                            label={Translate.getString("Reporter")}
                            options={reporterOptions}
                            renderIcon={renderUserAvatar}
                            newOption={() => new UserSelectFieldOption()}
                            readOnly
                            className={classes.select}
                        />
                    )}
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
