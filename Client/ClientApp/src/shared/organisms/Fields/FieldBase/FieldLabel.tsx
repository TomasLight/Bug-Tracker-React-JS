import clsx from "clsx";
import React, { FunctionComponent } from "react";
import { IAppTheme, useThemeColorStyles } from "mui-app-theme";

import { InputLabel, InputLabelProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: IAppTheme) => ({
    shrinkLabel: {
        backgroundColor: theme.colors.background,
        margin: "0 -5px",
        padding: "0 5px",
    },
}));

interface IFieldLabelProps {
    label: string;
    inputId: string;
    id?: string;
    disabled?: boolean;
    InputLabelProps?: InputLabelProps;
}

type Props = IFieldLabelProps;

const FieldLabel: FunctionComponent<Props> = (props) => {
    const {
        label,
        inputId,
        id,
        disabled,
        InputLabelProps: {
            color,
            className,
            ...rest
        } = {
            color: "default",
            className: "",
        },
    } = props;

    const classes = useStyles();
    const colorClassName = useThemeColorStyles()[color];
    const _className = clsx(className, colorClassName);

    if (!label) {
        return null;
    }

    return (
        <InputLabel
            {...rest}
            htmlFor={inputId}
            id={id}
            variant={"outlined"}
            classes={{
                shrink: classes.shrinkLabel,
            }}
            disabled={disabled}
            className={_className}
        >
            {label}
        </InputLabel>
    );
};

export { FieldLabel };
