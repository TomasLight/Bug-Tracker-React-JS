import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent, PropsWithChildren } from "react";

const adornmentSize = 48;
const useStyles = makeStyles((theme: IAppTheme) => ({
    customAdornment: {
        position: "absolute",
        right: 8,
        display: "block",
        margin: 0,
        boxSizing: "border-box",
        zIndex: 1,
        top: `calc(50% - ${(adornmentSize / 2)}px)`,
    },
}));

type Props = PropsWithChildren<any>;

const CustomEndAdornment: FunctionComponent<Props> = (props: Props) => {
    const {
        children,
    } = props;

    const classes = useStyles({});

    return (
        <div className={classes.customAdornment}>
            {children}
        </div>
    );
};

export { CustomEndAdornment };
