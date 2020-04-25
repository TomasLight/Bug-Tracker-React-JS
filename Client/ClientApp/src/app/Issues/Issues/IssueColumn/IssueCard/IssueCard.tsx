import { IssueTypeIcon } from "@app/Issues/IssueTypeIcon/IssueTypeIcon";
import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { Card, CardActionArea, CardActions, CardContent, Grid, makeStyles } from "@material-ui/core";

import { Issue } from "@app/Issues/models/Issue";

const useStyles = makeStyles((theme: IAppTheme) => ({
    root: {
        marginTop: 24,
        padding: 0,
    },
    cardRoot: {
        padding: 0,
        "&:last-child": {
            paddingBottom: 8,
        },
    },
    cardContent: {
        padding: "16px 8px 16px 12px",
    },
    cardFooter: {
        padding: "0px 8px 8px 12px",
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
    const handleOpenIssue = () => openIssue(issue.id);
    const handleOpenIssueByLink = () => openIssueByLink(issue.id);

    return (
        <Card classes={{ root: classes.root }}>
            <CardActionArea onClick={handleOpenIssue} className={classes.cardContent}>
                <CardContent classes={{ root: classes.cardRoot }}>
                    <Typography size={300} color={"strong"} component={"p"}>
                        {issue.title}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions className={classes.cardFooter}>
                <Grid item container justify={"space-between"} alignItems={"center"}>
                    <Grid item>
                        <IssueTypeIcon issueType={issue.type}/>
                    </Grid>

                    <Grid item>
                        <Typography onClick={handleOpenIssueByLink}>
                            {`Id-${issue.id}`}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export { IssueCard };
