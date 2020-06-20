import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { IndicatorProps } from "react-select/src/components/indicators";

import { IconButton, makeStyles } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    padding: {
        padding: 6,
    },
}));

type Props = IndicatorProps<IFieldOption>;

const DefaultClearIndicator: FunctionComponent<Props> = ({ clearValue }) => {
    const classes = useStyles();
    return (
        <IconButton
            onClick={clearValue}
            className={classes.padding}
        >
            <Close/>
        </IconButton>
    );
};

export { DefaultClearIndicator };
