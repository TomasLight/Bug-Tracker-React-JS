import { makeStyles } from "@material-ui/core";
import { IAppTheme } from "@shared/themes/IAppTheme";
import { TypographySizeVariant } from "./TypographySizeVariant";

export const useTypographySizeStyles = makeStyles<IAppTheme, TypographySizeVariant>((theme: IAppTheme) => ({
    "50": {
        fontSize: 10,
        letterSpacing: "0.03333em",
        lineHeight: "14px",
    },
    "100": {
        fontSize: 12,
        lineHeight: "16px",
    },
    "175": {
        fontSize: 13.5,
        lineHeight: "18px",
    },
    "200": {
        fontSize: 14,
        letterSpacing: "0.01071em",
        lineHeight: "20px",
    },
    "300": {
        fontSize: 16,
        letterSpacing: "0.00938em",
        lineHeight: "22px",
    },
    "400": {
        fontSize: 18,
        letterSpacing: "0em",
        lineHeight: "25px",
    },
    "700": {
        fontSize: 24,
        letterSpacing: "-0.00833em",
        lineHeight: "34px",
    },
}));
