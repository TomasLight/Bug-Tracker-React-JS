import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "@shared/themes/IAppTheme";
import { TextColorVariant } from "./TextColorVariant";

export const useTextColorStyles = makeStyles<IAppTheme, TextColorVariant>((theme: IAppTheme) => ({
    strong: {
        color: theme.colors.text.strong,
    },
    medium: {
        color: theme.colors.text.medium,
    },
    light: {
        color: theme.colors.text.light,
    },
    disabled: {
        color: theme.colors.text.disabled,
    },
}));
