import { Direction, Theme, Transitions } from "@material-ui/core";
import { Breakpoints } from "@material-ui/core/styles/createBreakpoints";
import { Mixins } from "@material-ui/core/styles/createMixins";
import { Palette } from "@material-ui/core/styles/createPalette";
import { Spacing } from "@material-ui/core/styles/createSpacing";
import { Typography } from "@material-ui/core/styles/createTypography";
import { Overrides } from "@material-ui/core/styles/overrides";
import { ComponentsProps } from "@material-ui/core/styles/props";
import { Shadows } from "@material-ui/core/styles/shadows";
import { Shape } from "@material-ui/core/styles/shape";
import { ZIndex } from "@material-ui/core/styles/zIndex";

import { IAppTheme } from "./IAppTheme";
import { IAppThemeColors } from "./IAppThemeColors";

export class AppTheme implements Theme, IAppTheme {
    public breakpoints: Breakpoints;
    public colors: IAppThemeColors;
    public direction: Direction;
    public mixins: Mixins;
    public overrides?: Overrides;
    public palette: Palette;
    public props?: ComponentsProps;
    public shadows: Shadows;
    public shape: Shape;
    public spacing: Spacing;
    public transitions: Transitions;
    public typography: Typography;
    public zIndex: ZIndex;

    constructor(theme: Theme, colors: IAppThemeColors) {
        this.breakpoints = theme.breakpoints;
        this.direction = theme.direction;
        this.mixins = theme.mixins;
        this.overrides = theme.overrides;
        this.palette = theme.palette;
        this.props = theme.props;
        this.shadows = theme.shadows;
        this.shape = theme.shape;
        this.spacing = theme.spacing;
        this.transitions = theme.transitions;
        this.typography = theme.typography;
        this.zIndex = theme.zIndex;

        this.colors = colors;
    }
}
