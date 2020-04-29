import { Drawer, Grid, makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

export const PanelHeaderHeight: number = 72;

const useStyles = makeStyles((theme: IAppTheme) => ({
    panel: {
        height: "100%",
        width: 464,
    },
    header: {
        height: PanelHeaderHeight,
        paddingLeft: 24,
        paddingTop: 24,
        paddingBottom: 12,
        position: "relative",
    },
    close: {
        position: "absolute",
        top: 12,
        right: 0,
    },
}));

export interface IPanelProps {
    isOpen: boolean;
    title: string;
}

export interface IPanelCallProps {
    close: () => void;
}

type Props = IPanelProps & IPanelCallProps;

const Panel: FunctionComponent<Props> = (props) => {
    const {
        isOpen,
        children,
        title,
        close,
    } = props;
    const classes = useStyles();

    return (
        <Drawer anchor={"right"} open={isOpen} onClose={close}>
            <Grid container direction={"column"} className={classes.panel}>
                <Grid
                    item
                    container
                    justify={"space-between"}
                    className={classes.header}
                >
                    <Typography
                        color={"strong"}
                        size={400}
                        component={"p"}
                        noWrap={true}
                    >
                        {title}
                    </Typography>

                    <IconButton onClick={close} className={classes.close}>
                        <Close/>
                    </IconButton>
                </Grid>

                {children}
            </Grid>
        </Drawer>
    );
};

export { Panel };
