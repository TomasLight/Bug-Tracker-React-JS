import { IButtonColor } from "@shared/themes/colors/IButtonColor";
import { IBorderColor } from "@shared/themes/colors/IBorderColor";
import { IColor } from "@shared/themes/colors/IColor";
import { ITextColor } from "@shared/themes/colors/ITextColor";

export interface IAppThemeColors {
    default: IButtonColor;
    primary: IButtonColor;
    secondary: IButtonColor;
    destructive: IButtonColor;

    success: IColor;
    info: IColor;
    warning: IColor;
    error: IColor;

    text: ITextColor;
    border: IBorderColor;

    background: string;
    surface: string;
}
