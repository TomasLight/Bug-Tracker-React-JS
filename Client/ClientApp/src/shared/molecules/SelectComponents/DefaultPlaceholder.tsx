import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { PlaceholderProps } from "react-select/src/components/Placeholder";

import { makeStyles } from "@material-ui/core";
import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        color: theme.colors.default.text,
    },
    error: {
        color: theme.colors.error.main,
    },
}));

type Props = PlaceholderProps<SelectFieldOption>;

const DefaultPlaceholder: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        selectProps: { error, required },
    } = props;

    const classes = useStyles();

    return (
        <components.Placeholder {...props}>
            <Typography className={clsx(classes.root, error ? classes.error : "")}>
                {children}
                {required ? (
                    <span> *</span>
                ) : ""}
            </Typography>
        </components.Placeholder>
    );
};

export { DefaultPlaceholder };
