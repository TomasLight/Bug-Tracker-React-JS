import { withStyles, SvgIconClassKey, Theme, SvgIconProps } from "@material-ui/core";
import { Schedule } from "@material-ui/icons";
import { Styles } from "@material-ui/styles/withStyles";
import { IAppTheme } from "mui-app-theme";
import { ComponentType } from "react";

const styles: Styles<Theme & IAppTheme, {}, SvgIconClassKey> = (theme: IAppTheme) => ({
    root: {
        color: theme.colors.text.medium,
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

export const OnHoldPriorityIcon: ComponentType<SvgIconProps> = withStyles(styles)(Schedule);
