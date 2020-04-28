import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent, ReactElement } from "react";
import { components, OptionProps } from "react-select";

import { makeStyles, MenuItem, Tooltip } from "@material-ui/core";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    tooltip: {
        fontSize: "0.8rem",
    },
    option: {
        height: "100%",
    },
    iconWrapper: {
        padding: 12,
        "&:hover": {
            background: theme.colors.default.outline.hover,
            borderRadius: "50%",
        },
    },
}));

export interface ISingleOptionWithIconProps {
    selectProps: {
        icon?: ReactElement;
        renderIcon?: (option: IFieldOption) => ReactElement;
    };
}

type Props = OptionProps<IFieldOption> & ISingleOptionWithIconProps;

const SingleOptionWithIcon: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
        data,
        selectProps: { icon, renderIcon },
    } = props;

    const classes = useStyles();

    return (
        <components.Option {...props}>
            <Tooltip title={children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
                <MenuItem className={classes.option}>
                    {
                        icon
                            ? (
                                <span className={classes.iconWrapper}>
                                    {icon}
                                </span>
                            )
                            : renderIcon(data)
                    }
                    <Typography size={400} color={"strong"} noWrap={true}>
                        {children}
                    </Typography>
                </MenuItem>
            </Tooltip>
        </components.Option>
    );
};

export { SingleOptionWithIcon };
