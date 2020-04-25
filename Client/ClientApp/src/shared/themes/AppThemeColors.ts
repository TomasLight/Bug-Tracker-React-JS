import { AppThemeColors as Colors } from "mui-app-theme";
import { IButtonColor } from "mui-app-theme/dist/colors";

export class AppThemeColors extends Colors {
    constructor() {
        super();

        this.primary = this.createButtonColor(
            [255, 160, 0],
            [255, 143, 0],
            true
        );
        this.secondary = this.createButtonColor(
            [0, 121, 107],
            [0, 105, 92],
            false
        );
        this.destructive = this.createButtonColor(
            [220, 0, 53],
            [205, 0, 49],
            false
        );

        this.warning = {
            main: "rgba(255, 238, 88)",
            text: "rgba(0, 0, 0, 0.87)",
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
    }

    private createButtonColor(main: number[], hover: number[], isBlackText: boolean): IButtonColor {
        const whiteText = "rgba(255, 255, 255, 0.87)";
        const blackText = "rgba(0, 0, 0, 0.87)";

        return {
            main: `rgba(${main.join(",")})`,
            hover: `rgba(${hover.join(",")})`,
            text: isBlackText ? blackText : whiteText,

            outline: {
                main: "rgba(255, 255, 255)",
                hover: `rgba(${main.join(",")}, 0.8)`,
            },
            disabled: {
                main: `rgba(${main.join(",")}, 0.12)`,
                text: `rgba(${main.join(",")}, 0.38)`,
            },
        };
    }
}
