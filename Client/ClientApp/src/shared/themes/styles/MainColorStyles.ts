import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "@shared/themes/IAppTheme";
import { MainColorVariant } from "./MainColorVariant";

export const useMainColorStyles = makeStyles<IAppTheme, MainColorVariant>((theme: IAppTheme) => ({
    default: {
        color: theme.colors.default.main,
    },
    "default.text": {
        color: theme.colors.default.text,
    },

    primary: {
        color: theme.colors.primary.main,
    },
    "primary.text": {
        color: theme.colors.primary.text,
    },

    secondary: {
        color: theme.colors.secondary.main,
    },
    "secondary.text": {
        color: theme.colors.secondary.text,
    },

    destructive: {
        color: theme.colors.destructive.main,
    },
    "destructive.text": {
        color: theme.colors.destructive.text,
    },
}));
