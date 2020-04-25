import { withStyles, SvgIconClassKey, Theme, SvgIconProps } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { Styles } from "@material-ui/styles/withStyles";
import { IAppTheme } from "mui-app-theme";
import { ComponentType } from "react";

const styles: Styles<Theme & IAppTheme, {}, SvgIconClassKey> = (theme: IAppTheme) => ({
    root: {
        color: "#64DD17",
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

export const TaskIcon: ComponentType<SvgIconProps> = withStyles(styles)(CheckBox);
