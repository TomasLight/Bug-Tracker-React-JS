import { IColor } from "./IColor";
import { IOutlineColor } from "./IOutlineColor";

export interface IButtonColor extends IColor {
    hover: string;
    disabled: IColor;
    outline: IOutlineColor;
}
