import { IColor } from "./IColor";
import { IOutlineColor } from "./IOutlineColor";

export interface IActiveColor extends IColor {
    hover: string;
    disabled: IColor;
    outline: IOutlineColor;
}
