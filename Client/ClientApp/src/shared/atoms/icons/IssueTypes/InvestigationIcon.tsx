import { SvgIconProps } from "@material-ui/core";
import { EmojiObjects } from "@material-ui/icons";
import React, { FunctionComponent } from "react";

type Props = SvgIconProps;

const InvestigationIcon: FunctionComponent<Props> = (props) => (
    <EmojiObjects color={"primary"} {...props}/>
);

export { InvestigationIcon };
