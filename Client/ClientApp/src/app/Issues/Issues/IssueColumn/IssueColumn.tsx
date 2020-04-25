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
        borderRightWidth: 2,
        borderRightStyle: "dashed",
        borderRightColor: "transparent",
        boxSizing: "content-box",

        flexShrink: 0,
        paddingTop: 16,
        width: 232,

        "&:not(:first-of-type)": {
            paddingLeft: 20,
        },
        "&:not(:last-of-type)": {
            borderRightColor: theme.colors.secondary.disabled.main,
            paddingRight: 20,
        },
    },
}));

export interface IIssueColumnOwnProps {
    status: Status;
    openIssue: (issueId: number) => void;
}

export interface IIssueColumnProps {
    issues: Issue[];
}

export interface IIssueColumnCallProps {
    openIssueByLink: (issueId: number) => void;
}

type Props = IIssueColumnOwnProps & IIssueColumnProps & IIssueColumnCallProps;

const IssueColumn: FunctionComponent<Props> = (props) => {
    const {
        status,
        issues,
        openIssue,
        openIssueByLink,
    } = props;

    const classes = useStyles();

    return (
        <Grid container direction={"column"} className={classes.column}>
            <Typography size={400}>
                {Translate.getString("issue-status", { status })}
            </Typography>

            {issues.filter((issue: Issue) => issue.status === status).map((issue: Issue) => (
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
