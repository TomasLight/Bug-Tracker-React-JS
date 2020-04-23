import { Overrides } from "@material-ui/core/styles/overrides";
import { IAppThemeColors } from "@shared/themes/IAppThemeColors";

export function overrideInput(colors: IAppThemeColors): Overrides {
    return {
        MuiInputBase: {
            root: {
                color: colors.text.medium,
                "&$focused": {
                    color: colors.primary.main,
                },
                "&$disabled": {
                    color: colors.text.disabled,
                },
            },
        },

        MuiOutlinedInput: {
            root: {
                "&$disabled": {
                    color: colors.text.disabled,
                },

                "&$disabled $notchedOutline": {
                    borderColor: colors.border.disabled,
                },
            },
            notchedOutline: {
                borderColor: colors.border.main,
            },
        },
    };
}
