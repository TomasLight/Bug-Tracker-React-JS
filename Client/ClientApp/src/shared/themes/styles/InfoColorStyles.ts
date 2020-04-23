import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "@shared/themes/IAppTheme";
import { InfoColorVariant } from "./InfoColorVariant";

export const useInfoColorStyles = makeStyles<IAppTheme, InfoColorVariant>((theme: IAppTheme) => ({
    success: {
        color: theme.colors.success.main,
    },
    "success.text": {
        color: theme.colors.success.text,
    },

    info: {
        color: theme.colors.info.main,
    },
    "info.text": {
        color: theme.colors.info.text,
    },

    warning: {
        color: theme.colors.warning.main,
    },
    "warning.text": {
        color: theme.colors.warning.text,
    },

    error: {
        color: theme.colors.error.main,
    },
    "error.text": {
        color: theme.colors.error.text,
    },
}));
