import { Translate } from "@utils/translates/Translate";
import { IAppTheme } from "mui-app-theme";
import { SnackbarProvider, WithSnackbarProps } from "notistack";
import React, { createRef, FunctionComponent, PropsWithChildren } from "react";

import { Button, makeStyles } from "@material-ui/core";

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
    const snackbarRef = createRef<WithSnackbarProps>();

    const SnackButton = (key: number) => {
        const onClickDismiss = () => {
            snackbarRef.current.closeSnackbar(key);
        };
        return (
            <Button onClick={onClickDismiss} variant={"contained"}>
                {Translate.getString("Dismiss")}
            </Button>
        );
    };

    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            classes={{
                variantSuccess: classes.variantSuccess,
                variantInfo: classes.variantInfo,
                variantWarning: classes.variantWarning,
                variantError: classes.variantError,
            }}
            ref={snackbarRef}
            action={SnackButton}
        >
            {children}
        </SnackbarProvider>
    );
};

export { AppSnackbarProvider };
