import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core";

import { Loader, LoaderProps } from "@shared/molecules/Loaders/Loader";

const loaderSize = 24;
const useStyles = makeStyles((theme: IAppTheme) => ({
    loader: {
        position: "absolute",
        bottom: 0,
        display: "block",
        margin: 0,
        boxSizing: "border-box",
        zIndex: 1,
        top: `calc(50% - ${(loaderSize / 2)}px)`,
        right: (props: { right: number | string }) => props.right,
    },
}));

export interface IFieldLoadingIndicatorProps extends LoaderProps {
    right?: number | string;
}

type Props = IFieldLoadingIndicatorProps;

const FieldLoadingIndicator: FunctionComponent<Props> = (props: Props) => {
    const {
        isLoading,
        right = 12,
        ...rest
    } = props;

    const classes = useStyles({ right });

    return (
        <Loader
            isLoading={isLoading}
            size={loaderSize}
            className={classes.loader}
            {...rest}
        />
    );
};

export { FieldLoadingIndicator };
