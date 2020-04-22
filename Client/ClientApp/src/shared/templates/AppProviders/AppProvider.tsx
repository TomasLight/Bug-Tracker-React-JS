import { createAppTheme } from "@shared/themes/createAppTheme";
import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";

import withTheme from "@material-ui/core/styles/withTheme";
import { ThemeProvider } from "@material-ui/styles";

import { LoaderBlock } from "@shared/molecules/Loaders/LoaderBlock";

import { AppSnackbarProvider } from "./AppSnackbarProvider";

export interface IAppProviderProps {
    appIsInitialized: boolean;
}

export interface IAppProviderCallProps {
    initialize: () => void;
}

type Props = PropsWithChildren<IAppProviderProps & IAppProviderCallProps>;

const AppProvider: FunctionComponent<Props> = (props: Props) => {
    const {
        appIsInitialized,
        children,

        initialize,
    } = props;

    useEffect(() => {
        initialize();
    }, []);

    if (!appIsInitialized) {
        return (
            <LoaderBlock isLoading={true}/>
        );
    }

    const appTheme = createAppTheme();

    return (
        <ThemeProvider theme={appTheme}>
            <AppSnackbarProvider>
                {children}
            </AppSnackbarProvider>
        </ThemeProvider>
    );
};

const appWithTheme: React.ComponentType = withTheme(AppProvider);
export { appWithTheme as AppProvider };
