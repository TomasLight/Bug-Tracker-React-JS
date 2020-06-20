import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { OptionProps } from "react-select/src/components/Option";

import {
    makeStyles,
    MenuItem, Tooltip, Typography
} from "@material-ui/core";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    tooltip: {
        fontSize: "0.8rem",
    },
    option: {
        height: "100%",
    },
}));

type Props = OptionProps<IFieldOption>;

const DefaultSingleOption: FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <components.Option {...props}>
            <Tooltip title={props.children} enterDelay={1000} classes={{ tooltip: classes.tooltip }}>
                <MenuItem className={classes.option}>
                    <Typography variant={"body1"} noWrap={true}>
                        {props.children}
                    </Typography>
                </MenuItem>
            </Tooltip>
        </components.Option>
    );
};

export { DefaultSingleOption };
