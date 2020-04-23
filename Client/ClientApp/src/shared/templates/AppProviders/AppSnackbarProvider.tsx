import { SnackbarProvider } from "notistack";
import React, { FunctionComponent, PropsWithChildren } from "react";

import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "@shared/themes/IAppTheme";

const useStyles = makeStyles((theme: IAppTheme) => ({
    variantSuccess: {
        backgroundColor: theme.colors.success.main,
        color: theme.colors.success.text,
    },
    variantInfo: {
        backgroundColor: theme.colors.info.main,
        color: theme.colors.info.text,
    },
    variantWarning: {
        backgroundColor: theme.colors.warning.main,
        color: theme.colors.warning.text,
    },
    variantError: {
        backgroundColor: theme.colors.error.main,
        color: theme.colors.error.text,
    },
}));

type Props = PropsWithChildren<any>;

const AppSnackbarProvider: FunctionComponent<Props> = (props: Props) => {
    const { children } = props;

    const classes = useStyles();
    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            classes={{
                variantSuccess: classes.variantSuccess,
                variantInfo: classes.variantInfo,
                variantWarning: classes.variantWarning,
                variantError: classes.variantError,
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

export { AppSnackbarProvider };
