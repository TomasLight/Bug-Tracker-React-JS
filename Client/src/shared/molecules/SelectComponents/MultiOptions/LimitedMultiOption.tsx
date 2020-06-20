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
import { ISwitchableFieldOption } from "@shared/organisms/Fields/Select/Options/ISwitchableFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    tooltip: {
        fontSize: "0.8rem",
    },
    option: {
        height: "100%",
    },
    selected: {
        backgroundColor: theme.colors.default.hover,
    },
    disabled: {
        color: theme.colors.default.disabled.text,
        "&:hover": {
            color: theme.colors.default.disabled.text,
        },
    },
}));

type Props = OptionProps<ISwitchableFieldOption>;

const LimitedMultiOption: FunctionComponent<Props> = (props) => {
    const {
        children,
        selectProps: {
            maxValuesCount,
            withCheckBox = false,
            value,
        },
        isSelected,
        innerProps,
    } = props;
    const classes = useStyles();
    const option: ISwitchableFieldOption = props.data;
    const selectedOptions = value as ISwitchableFieldOption[];

    let className = classes.option;
    const optionIndex = selectedOptions.indexOf(option);

    if (optionIndex > -1) {
        className = clsx(classes.option, classes.selected);
    }

    const isOptionDisabled = optionIndex === -1 && (option.isDisabled || selectedOptions.length === maxValuesCount);

    if (isOptionDisabled) {
        className = clsx(classes.option, classes.disabled);
        innerProps.onClick = () => undefined;
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

export { LimitedMultiOption };
