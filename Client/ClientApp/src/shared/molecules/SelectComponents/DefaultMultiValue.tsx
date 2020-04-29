import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { components } from "react-select";
import { MultiValueProps } from "react-select/src/components/MultiValue";

import { makeStyles } from "@material-ui/core";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";

const useStyles = makeStyles((theme: IAppTheme) => ({
    multiValue: {
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        marginLeft: 2,
        marginRight: 2,
    },
}));

type Props = MultiValueProps<IFieldOption>;

const DefaultMultiValue: FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
    return (
        <components.MultiValue
            {...props}
            className={classes.multiValue}
        />
    );
};

export { DefaultMultiValue };
