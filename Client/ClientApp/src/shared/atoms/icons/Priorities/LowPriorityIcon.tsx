import { withStyles, SvgIconClassKey, Theme, SvgIconProps } from "@material-ui/core";
import { TrendingDown } from "@material-ui/icons";
import { Styles } from "@material-ui/styles/withStyles";
import { IAppTheme } from "mui-app-theme";
import { ComponentType } from "react";

const styles: Styles<Theme & IAppTheme, {}, SvgIconClassKey> = (theme: IAppTheme) => ({
    root: {
        color: theme.colors.success.main,
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

export const LowPriorityIcon: ComponentType<SvgIconProps> = withStyles(styles)(TrendingDown);
