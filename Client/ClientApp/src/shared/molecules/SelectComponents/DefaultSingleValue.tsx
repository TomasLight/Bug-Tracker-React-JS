import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";
import { SingleValueProps } from "react-select";

import { makeStyles } from "@material-ui/core";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    singleValue: {
        marginLeft: 2,
        marginRight: 2,
    },
    noValueWrap: {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
}));

type Props = SingleValueProps<IFieldOption>;

const DefaultSingleValue: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        selectProps,
    } = props;

    const classes = useStyles();
    let valueClass = classes.singleValue;

    if (selectProps.noValueWrap) {
        valueClass = clsx(classes.noValueWrap, valueClass);
    }

    return (
        <Typography
            className={valueClass}
            size={300}
            color={selectProps.isDisabled
                ? "disabled"
                : selectProps.isFocused
                    ? "primary"
                    : "medium"
            }
        >
            {children}
        </Typography>
    );
};

export { DefaultSingleValue };
