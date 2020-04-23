import { makeStyles } from "@material-ui/styles";
import { IAppTheme } from "@shared/themes/IAppTheme";

export type TypographyClassNameKeys =
    | "root"
    | "noWrap"
    | "bold";

export const useTypographyStyles = makeStyles<IAppTheme, TypographyClassNameKeys>((theme: IAppTheme) => ({
    root: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    },
    noWrap: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
    },
    bold: {
        fontWeight: "bold",
    },
}));
