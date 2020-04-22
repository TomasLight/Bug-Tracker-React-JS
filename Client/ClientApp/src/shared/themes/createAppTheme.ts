import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { AppTheme } from "./AppTheme";
import { AppThemeColors } from "./AppThemeColors";
import { IAppTheme } from "./IAppTheme";
import { IAppThemeColors } from "./IAppThemeColors";
import { overrideMaterialUIPalette } from "./overrides/overrideMaterialUIPalette";
import { overrideMaterialUIStyles } from "./overrides/overrideMaterialUIStyles";

export function createAppTheme(): IAppTheme {
    let themeColors: IAppThemeColors = new AppThemeColors();

    const overriddenPalette = overrideMaterialUIPalette(themeColors);
    const overriddenStyles = overrideMaterialUIStyles(themeColors);

    const muiTheme = createMuiTheme({
        palette: overriddenPalette,
        overrides: overriddenStyles,
    });

    const appTheme: IAppTheme = new AppTheme(
        muiTheme,
        themeColors,
    );
    return appTheme;
}
