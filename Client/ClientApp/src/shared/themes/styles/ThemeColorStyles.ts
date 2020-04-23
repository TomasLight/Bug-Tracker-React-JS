import { ClassNameMap } from "@material-ui/styles";
import { useInfoColorStyles } from "./InfoColorStyles";
import { InfoColorVariant } from "./InfoColorVariant";
import { useMainColorStyles } from "./MainColorStyles";
import { MainColorVariant } from "./MainColorVariant";
import { useTextColorStyles } from "./TextColorStyles";
import { TextColorVariant } from "./TextColorVariant";

type ColorVariant =
    | TextColorVariant
    | MainColorVariant
    | InfoColorVariant;

export const useThemeColorStyles = (props?: any): ClassNameMap<ColorVariant> => ({
    ...useMainColorStyles(props),
    ...useInfoColorStyles(props),
    ...useTextColorStyles(props),
});
