import { Overrides } from "@material-ui/core/styles/overrides";
import { IAppThemeColors } from "@shared/themes/IAppThemeColors";

export function overrideCheckbox(colors: IAppThemeColors): Overrides {
    return {
        MuiCheckbox: {
            root: {
                padding: 12,
            },
            colorPrimary: {
                "&$checked": {
                    color: colors.primary.main,
                },
            },
            colorSecondary: {
                "&$checked": {
                    color: colors.secondary.main,
                },
            },
        },
    };
}
