import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { Avatar, Card, CardActionArea, CardActions, CardContent, Grid, makeStyles } from "@material-ui/core";

import { Issue } from "@app/Issues/models/Issue";
import { IssuePriorityIcon } from "@app/Issues/IssuePriorityIcon/IssuePriorityIcon";
import { IssueTypeIcon } from "@app/Issues/IssueTypeIcon/IssueTypeIcon";
import { User } from "@app/Users/models/User";

const useStyles = makeStyles((theme: IAppTheme) => ({
    card: {
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
    iconMargin: {
        marginLeft: 12,
    },
    issueId: {
        cursor: "pointer",
        marginRight: 12,
    },
    avatar: {
        height: 24,
        width: 24,
    },
    rightFooterContainer: {
        width: "auto",
    },
}));

export interface IIssueCardProps {
    issue: Issue;
    assignedUser: User;
}

export interface IIssueCardCallProps {
    openIssue: (issueId: number) => void;
    openIssueByLink: (issueId: number) => void;
}

type Props = IIssueCardProps & IIssueCardCallProps;

const IssueCard: FunctionComponent<Props> = (props) => {
    const {
        issue,
        assignedUser,
        openIssue,
        openIssueByLink,
    } = props;

    const classes = useStyles();
    const handleOpenIssue = () => openIssue(issue.id);
    const handleOpenIssueByLink = () => openIssueByLink(issue.id);
    const user = assignedUser || User.Undefined();

    return (
        <Card classes={{ root: classes.card }}>
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
                        <IssuePriorityIcon priority={issue.priority} className={classes.iconMargin}/>
                    </Grid>

                    <Grid item container className={classes.rightFooterContainer} alignItems={"center"}>
                        <Typography onClick={handleOpenIssueByLink} className={classes.issueId}>
                            {`Id-${issue.id}`}
                        </Typography>

                        <Avatar alt={user.name()} src={user.avatarUrl()} className={classes.avatar}/>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export { IssueCard };
