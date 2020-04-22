import { IActiveColor } from "@shared/themes/colors/IActiveColor";
import { IBorderColor } from "@shared/themes/colors/IBorderColor";
import { IColor } from "@shared/themes/colors/IColor";
import { ITextColor } from "@shared/themes/colors/ITextColor";
import { IAppThemeColors } from "@shared/themes/IAppThemeColors";

export class AppThemeColors implements IAppThemeColors {
    public default: IActiveColor;
    public primary: IActiveColor;
    public secondary: IActiveColor;
    public destructive: IActiveColor;

    public text: ITextColor;
    public border: IBorderColor;

    public success: IColor;
    public info: IColor;
    public warning: IColor;
    public error: IColor;

    public background: string;
    public surface: string;

    constructor() {
        this.default = {
            main: "rgba(224, 224, 224)",
            hover: "rgba(213, 213, 213)",
            text: "rgba(0, 0, 0, 0.87)",

            outline: {
                main: "rgba(255, 255, 255)",
                hover: "rgba(0, 0, 0, 0.08)",
            },
            disabled: {
                main: "rgba(0, 0, 0, 0.12)",
                text: "rgba(0, 0, 0, 0.38)",
            },
        };

        this.primary = {
            main: "rgba(224, 224, 224)",
            hover: "rgba(213, 213, 213)",
            text: "rgba(0, 0, 0, 0.87)",

            outline: {
                main: "rgba(255, 255, 255)",
                hover: "rgba(0, 0, 0, 0.08)",
            },
            disabled: {
                main: "rgba(0, 0, 0, 0.12)",
                text: "rgba(0, 0, 0, 0.38)",
            },
        };

        this.secondary = {
            main: "rgba(224, 224, 224)",
            hover: "rgba(213, 213, 213)",
            text: "rgba(0, 0, 0, 0.87)",

            outline: {
                main: "rgba(255, 255, 255)",
                hover: "rgba(0, 0, 0, 0.08)",
            },
            disabled: {
                main: "rgba(0, 0, 0, 0.12)",
                text: "rgba(0, 0, 0, 0.38)",
            },
        };

        this.destructive = {
            main: "rgba(224, 224, 224)",
            hover: "rgba(213, 213, 213)",
            text: "rgba(0, 0, 0, 0.87)",

            outline: {
                main: "rgba(255, 255, 255)",
                hover: "rgba(0, 0, 0, 0.08)",
            },
            disabled: {
                main: "rgba(0, 0, 0, 0.12)",
                text: "rgba(0, 0, 0, 0.38)",
            },
        };

        this.success = {
            main: "rgba(67, 160, 71)",
            text: "rgba(255, 255, 255)",
        };

        this.error = {
            main: "rgba(176, 0, 32)",
            text: "rgba(255, 255, 255)",
        };

        this.info = {
            main: "rgba(41, 121, 255)",
            text: "rgba(255, 255, 255)",
        };

        this.warning = {
            main: "rgba(255, 160, 0)",
            text: "rgba(255, 255, 255)",
        };

        this.text = {
            strong: "rgba(0, 0, 0, 0.87)",
            medium: "rgba(0, 0, 0, 0.60)",
            light: "rgba(0, 0, 0, 0.38)",
            disabled: "rgba(0, 0, 0, 0.12)",
        };
        this.border = {
            primary: this.primary.main,
            secondary: this.secondary.main,
            destructive: this.destructive.main,
            error: this.error.main,
            main: "rgba(117, 117, 117)",
            light: "rgba(189, 189, 189)",
            dark: "rgba(33, 33, 33)",
            disabled: this.text.disabled,
        };

        this.background = "rgba(255, 255, 255)";
        this.surface = "rgba(250, 250, 250)";

    }
}
