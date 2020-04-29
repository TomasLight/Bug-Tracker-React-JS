import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { IndicatorProps } from "react-select/src/components/indicators";

import { makeStyles } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    default: {
        color: theme.colors.text.medium,
    },
    active: {
        color: theme.colors.text.medium,
    },
    disabled: {
        color: theme.colors.text.disabled,
    },
    error: {
        borderColor: theme.colors.error.main,
    },
}));

type Props = IndicatorProps<IFieldOption>;

const DefaultDropdownIndicator: FunctionComponent<Props> = (props: Props) => {
    const { selectProps: { menuIsOpen, isDisabled, readOnly }, isFocused } = props;

    const classes = useStyles();

    if (readOnly) {
        return null;
    }

    let className = classes.default;
    if (isFocused) {
        className = classes.active;
    }
    if (isDisabled) {
        className = classes.disabled;
    }

    return (
        <components.DropdownIndicator {...props}>
            {menuIsOpen
                ? <ExpandLess className={className}/>
                : <ExpandMore className={className}/>
            }
        </components.DropdownIndicator>
    );
};

export { DefaultDropdownIndicator };
