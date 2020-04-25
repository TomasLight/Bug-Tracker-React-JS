import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

import { Drawer, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        width: 464,
    },
}));

export interface IIssuePanelProps {
    isOpen: boolean;
}

export interface IIssuePanelCallProps {
    close: () => void;
}

type Props = IIssuePanelProps & IIssuePanelCallProps;

const IssuePanel: FunctionComponent<Props> = (props) => {
    const {
        isOpen,
        close,
    } = props;
    const classes = useStyles();

    return (
        <Drawer anchor={"right"} open={isOpen} onClose={close}>
            <Grid item container className={classes.root} justify={"space-between"} alignItems={"center"}>
                todo: issue details
            </Grid>
        </Drawer>
    );
};

export { IssuePanel };
