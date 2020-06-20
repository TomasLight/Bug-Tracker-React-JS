import { withStyles, SvgIconClassKey, Theme, SvgIconProps } from "@material-ui/core";
import { TrendingUp } from "@material-ui/icons";
import { Styles } from "@material-ui/styles/withStyles";
import { IAppTheme } from "mui-app-theme";
import { ComponentType } from "react";

const styles: Styles<Theme & IAppTheme, {}, SvgIconClassKey> = (theme: IAppTheme) => ({
    root: {
        color: theme.colors.primary.main,
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

export const HighPriorityIcon: ComponentType<SvgIconProps> = withStyles(styles)(TrendingUp);
