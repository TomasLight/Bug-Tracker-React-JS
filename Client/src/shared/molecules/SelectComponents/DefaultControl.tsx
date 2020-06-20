import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { ControlProps } from "react-select/src/components/Control";

import { makeStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles/withStyles/withStyles";

import { FieldBase, FieldBaseProps } from "@shared/organisms/Fields/FieldBase/FieldBase";
import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";
import { Props as SelectProps } from "react-select/src/Select";

type ControlClassKey =
    | "root"
    | "focused"
    | "error"
    | "disabled";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
        padding: "0 8px",
        height: 52,
        display: "flex",
        overflowX: "hidden",

        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.colors.border.main,
        borderRadius: 4,

        "&$focused": {
            borderColor: theme.colors.border.primary,
        },
        "&$error": {
            borderColor: theme.colors.border.error,
        },
        "&$disabled": {
            borderColor: theme.colors.border.disabled,
        },
    },
    focused: {},
    error: {},
    disabled: {},
}), { name: "mui-select" });

export interface IDefaultControlProps extends FieldBaseProps {
    selectProps?: SelectProps<IFieldOption> & {
        classes?: Partial<ClassNameMap<ControlClassKey>>;
    };
}

type Props = ControlProps<SelectFieldOption> & IDefaultControlProps;

const DefaultControl: FunctionComponent<Props> = (props: Props) => {
    const {
        selectProps: {
            classes,
            isFocused,

            FieldProps = {},
            FormControlProps = {},
            FormHelperTextProps = {},
            InputLabelProps = {},
            FieldLoadingIndicatorProps = {},
        },
        isDisabled,
    } = props;

    const _classes = useStyles();
    let className = clsx({
        [_classes.root]: true,
        [_classes.error]: Boolean(FieldProps.error),
        [_classes.focused]: Boolean(isFocused),
        [_classes.disabled]: Boolean(isDisabled),
    });
    if (classes) {
        className = clsx(
            className,
            {
                [classes.root]: true,
                [classes.error]: Boolean(FieldProps.error),
                [classes.focused]: Boolean(isFocused),
                [classes.disabled]: Boolean(isDisabled),
            }
        );
    }

    return (
        <FieldBase
            {...FieldProps}

            FormControlProps={FormControlProps}
            InputLabelProps={{
                ...InputLabelProps,
                focused: isFocused,
            }}
            FormHelperTextProps={FormHelperTextProps}
            FieldLoadingIndicatorProps={FieldLoadingIndicatorProps}
        >
            <components.Control {...props} className={className}/>
        </FieldBase>
    );
};

export { DefaultControl };
