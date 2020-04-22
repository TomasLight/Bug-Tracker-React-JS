import { Overrides } from "@material-ui/core/styles/overrides";
import { IAppThemeColors } from "@shared/themes/IAppThemeColors";

export function overrideButton(colors: IAppThemeColors): Overrides {
    return {
        MuiButton: {
            containedPrimary: {
                backgroundColor: colors.primary.main,
                color: colors.primary.text,

                "&:hover": {
                    backgroundColor: colors.primary.hover,
                },

                "&$disabled": {
                    backgroundColor: colors.primary.disabled.main,
                    color: colors.primary.disabled.text,
                },
            },
            containedSecondary: {
                backgroundColor: colors.secondary.main,
                color: colors.secondary.text,

                "&:hover": {
                    backgroundColor: colors.secondary.hover,
                },
            },

            outlinedPrimary: {
                borderColor: colors.border.primary,
                color: colors.primary.main,

                "&:hover": {
                    backgroundColor: colors.primary.outline.hover,
                },
            },
            outlinedSecondary: {
                borderColor: colors.border.secondary,
                color: colors.secondary.main,

                "&:hover": {
                    backgroundColor: colors.secondary.outline.hover,
                },
            },

            textPrimary: {
                color: colors.primary.main,

                "&:hover": {
                    backgroundColor: colors.primary.outline.hover,
                },
            },
            textSecondary: {
                color: colors.secondary.main,

                "&:hover": {
                    backgroundColor: colors.secondary.outline.hover,
                },
            },
        },

        MuiIconButton: {
            root: {
                color: colors.text.medium,
                "&$disabled": {
                    color: colors.text.disabled,
                },
            },
        },
    };
}
