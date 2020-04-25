import { IssueTypeIcon } from "@app/Issues/IssueTypeIcon/IssueTypeIcon";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { Card, CardContent, Grid, makeStyles } from "@material-ui/core";

import { Issue } from "@app/Issues/models/Issue";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        marginTop: 24,
    },
    cardRoot: {
        padding: "16px 8px 8px 12px",
        "&:last-child": {
            paddingBottom: 8,
        },
    },
    cardFooter: {
        paddingTop: 16,
    },
}));

export interface IIssueCardProps {
    issue: Issue;
}

export interface IIssueCardCallProps {
    openIssue: (issueId: number) => void;
    openIssueByLink: (issueId: number) => void;
}

type Props = IIssueCardProps & IIssueCardCallProps;

const IssueCard: FunctionComponent<Props> = (props) => {
    const {
        issue,
        openIssue,
        openIssueByLink,

    } = props;

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent classes={{ root: classes.cardRoot }}>
                <Typography size={300} color={"strong"} component={"p"}>
                    {issue.title}
                </Typography>
                <Grid item container justify={"space-between"} className={classes.cardFooter}>
                    <Grid item>
                        <IssueTypeIcon issueType={issue.type} />
                    </Grid>

                    <Grid item>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    return (
        <Grid container className={classes.root}>
            <Grid item container>
                <Grid item>
                    {issue.title}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { IssueCard };
