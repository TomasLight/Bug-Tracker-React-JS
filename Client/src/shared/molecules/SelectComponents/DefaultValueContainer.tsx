import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { ValueContainerProps } from "react-select/src/components/containers";

import { makeStyles } from "@material-ui/core";

import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    valueContainer: {
        display: "flex",
        flexWrap: "nowrap",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        flex: 1,
        alignItems: "center",
    },
}));

type Props = ValueContainerProps<SelectFieldOption>;

const DefaultValueContainer: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        ...rest
    } = props;

    const classes = useStyles();

    return (
        <components.ValueContainer {...rest} className={classes.valueContainer}>
            {children}
        </components.ValueContainer>
    );
};

export { DefaultValueContainer };
