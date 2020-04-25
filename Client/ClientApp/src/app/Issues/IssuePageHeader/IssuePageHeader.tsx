import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { Grid, makeStyles } from "@material-ui/core";

import { Translate } from "@utils/translates/Translate";

const useStyles = makeStyles((theme: IAppTheme) =>({
    root: {
        height: 96,
        paddingTop: 24,
        paddingBottom: 16,
    },
    title: {
        paddingLeft: 24,
    },
}));

export interface IIssuePageHeaderProps {
    // TODO: filters
}

export interface IIssuePageHeaderCallProps {
    // TODO: filters
}

type Props = IIssuePageHeaderProps & IIssuePageHeaderCallProps;

const IssuePageHeader: FunctionComponent<Props> = (props) => {
    const classes = useStyles();

    return (
        <Grid item container className={classes.root} justify={"space-between"} alignItems={"center"}>
            <Typography size={700} color={"strong"} className={classes.title} component={"p"}>
                {Translate.getString("Issues")}
            </Typography>

            <Grid item>
                todo: filters and search
            </Grid>
        </Grid>
    );
};

export { IssuePageHeader };
