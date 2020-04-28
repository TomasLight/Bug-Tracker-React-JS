import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: IAppTheme) => ({
    text: {
        position: "absolute",
        bottom: 0,
        display: "block",
        width: "100%",
        margin: 0,
        padding: "4px 12px",
        boxSizing: "border-box",
    },
    errorText: {
        color: theme.colors.error.main,
    },
    helpText: {
        color: theme.colors.text.medium,
    },

    hidden: {
        visibility: "hidden",
    },
}));

export interface IFieldErrorProps {
    id?: string;
    show: boolean;
    error: boolean;
    text: string;
}

type Props = IFieldErrorProps;

const FieldError: FunctionComponent<Props> = (props: Props) => {
    const {
        show,
        error,
        text,
        ...rest
    } = props;

    const classes = useStyles({});

    return (
        <Typography
            size={175}
            className={clsx(
                classes.text,
                error ? classes.errorText : classes.helpText,
                show ? "" : classes.hidden
            )}
            {...rest}
        >
            {text}
        </Typography>
    );
};

export { FieldError };
