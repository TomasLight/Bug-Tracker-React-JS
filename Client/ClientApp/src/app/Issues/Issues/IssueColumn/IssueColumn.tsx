import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent } from "react";

import { Grid, makeStyles } from "@material-ui/core";

import { Issue } from "@app/Issues/models/Issue";
import { Status } from "@app/Issues/models/Status";
import { Translate } from "@utils/translates/Translate";

import { IssueCard } from "./IssueCard/IssueCard";

const useStyles = makeStyles((theme: IAppTheme) => ({
    column: {
        flex: 1,
        width: 232,
        paddingTop: 16,
        marginLeft: 24,

        "&:not(:first-of-type)": {
            marginLeft: 20,
        },
        "&:not(:last-of-type)": {
            marginRight: 20,
        },
    },
}));

export interface IIssueColumnOwnProps {
    issueStatus: Status;
    issues: Issue[];
    openIssue: (issueId: number) => void;
    openIssueByLink: (issueId: number) => void;
}

type Props = IIssueColumnOwnProps;

const IssueColumn: FunctionComponent<Props> = (props) => {
    const {
        issueStatus,
        issues,
        openIssue,
        openIssueByLink,
    } = props;

    const classes = useStyles();

    return (
        <Grid container direction={"column"} className={classes.column}>
            <Typography size={400}>
                {Translate.getString("issue-status", { issueStatus })}
            </Typography>

            {issues.filter((issue: Issue) => issue.status === issueStatus).map((issue: Issue) => (
                <IssueCard
                    key={`issue-${issue.id}`}
                    issue={issue}
                    openIssue={openIssue}
                    openIssueByLink={openIssueByLink}
                />
            ))}
        </Grid>
    );
};

export { IssueColumn };
