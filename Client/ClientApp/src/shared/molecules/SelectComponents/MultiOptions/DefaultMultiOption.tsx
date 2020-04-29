import clsx from "clsx";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";
import { components, OptionProps } from "react-select";

import {
    Checkbox,
    makeStyles,
    MenuItem, Tooltip
} from "@material-ui/core";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    tooltip: {
        fontSize: "0.8rem",
    },
    option: {
        height: "100%",
    },
    selected: {
        backgroundColor: theme.colors.default.disabled.main,
    },
}));

type Props = OptionProps<IFieldOption[]>;

const DefaultMultiOption: FunctionComponent<Props> = (props) => {
    const {
        children,
        selectProps: {
            withCheckBox = false,
            value,
        },
        isSelected,
    } = props;
    const classes = useStyles();
    const option: IFieldOption = props.data;
    const selectedOptions = value as IFieldOption[];

    let className = classes.option;
    const optionIndex = selectedOptions.indexOf(option);
    if (optionIndex > -1) {
        className = clsx(className, classes.selected);
    }

    return (
        <components.Option {...props}>
            <Tooltip title={children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
                <MenuItem className={className}>
                    {withCheckBox && (
                        <Checkbox
                            color={"primary"}
                            checked={isSelected}
                            disableRipple
                        />
                    )}
                    <Typography size={400} color={"strong"} noWrap={true}>
                        {children}
                    </Typography>
                </MenuItem>
            </Tooltip>
        </components.Option>
    );
};

export { DefaultMultiOption };
