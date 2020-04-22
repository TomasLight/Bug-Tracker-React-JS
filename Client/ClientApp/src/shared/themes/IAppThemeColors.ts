import { IActiveColor } from "@shared/themes/colors/IActiveColor";
import { IBorderColor } from "@shared/themes/colors/IBorderColor";
import { IColor } from "@shared/themes/colors/IColor";
import { ITextColor } from "@shared/themes/colors/ITextColor";

export interface IAppThemeColors {
    default: IActiveColor;
    primary: IActiveColor;
    secondary: IActiveColor;
    destructive: IActiveColor;

    success: IColor;
    info: IColor;
    warning: IColor;
    error: IColor;

    text: ITextColor;
    border: IBorderColor;

    background: string;
    surface: string;
}