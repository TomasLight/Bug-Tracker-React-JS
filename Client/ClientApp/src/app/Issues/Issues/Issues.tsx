import { IIssueColumnOwnProps, IssueColumn } from "@app/Issues/Issues/IssueColumn/IssueColumn";

import { Issue } from "@app/Issues/models/Issue";
import { Status } from "@app/Issues/models/Status";

import { Grid, makeStyles } from "@material-ui/core";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme: IAppTheme) => ({
    issues: {
        padding: "16px 24px",
        overflow: "auto",
    },
}));

export interface IIssuesOwnProps {
    openIssue: (issueId: number) => void;
}

export interface IIssuesProps {
    issues: Issue[];
    issuesAreLoading: boolean;
}

export interface IIssuesCallProps {
    openIssueByLink: (issueId: number) => void;
}

type Props = IIssuesOwnProps & IIssuesProps & IIssuesCallProps;

const Issues: FunctionComponent<Props> = (props) => {
    const {
        issues,
        issuesAreLoading,
        openIssue,
        openIssueByLink,

    } = props;

    const classes = useStyles();

    const columnProps: IIssueColumnOwnProps = {
        issueStatus: Status.NA,
        issues,
        openIssue,
        openIssueByLink,
    };

    return (
        <Grid item>
            <Grid container wrap={"nowrap"} className={classes.issues}>
                <IssueColumn {...columnProps} issueStatus={Status.New}/>

                <IssueColumn {...columnProps} issueStatus={Status.InProgress}/>

                <IssueColumn {...columnProps} issueStatus={Status.InPerReview}/>

                <IssueColumn {...columnProps} issueStatus={Status.ReadyForQA}/>

                <IssueColumn {...columnProps} issueStatus={Status.QA}/>

                <IssueColumn {...columnProps} issueStatus={Status.Closed}/>
            </Grid>
        </Grid>
    );
};

export { Issues };
