import { SvgIconClassKey, SvgIconProps, Theme, withStyles } from "@material-ui/core";
import { BugReport } from "@material-ui/icons";
import { Styles } from "@material-ui/styles/withStyles";
import { IAppTheme } from "mui-app-theme";
import React, { ComponentType } from "react";

const styles: Styles<Theme & IAppTheme, {}, SvgIconClassKey> = (theme: IAppTheme) => ({
    root: {
        color: theme.colors.destructive.main,
    },
    colorPrimary: {},
    colorSecondary: {},
    colorAction: {},
    colorDisabled: {},
    colorError: {},
    fontSizeInherit: {},
    fontSizeSmall: {},
    fontSizeLarge: {},
});

export const BugIcon: ComponentType<SvgIconProps> = withStyles(styles)(BugReport);
