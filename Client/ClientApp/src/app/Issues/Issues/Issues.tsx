import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { Status } from "@app/Issues/models/Status";

import { IssuesColumnContainer } from "./IssueColumn/IssueColumn.container";

const useStyles = makeStyles((theme: IAppTheme) => ({
    issues: {
        flexGrow: 1,
        padding: "16px 24px",
        overflow: "auto",
    },
}));

export interface IIssueOwnProps {
    openIssue: (issueId: number) => void;
}

type Props = IIssueOwnProps;

const Issues: FunctionComponent<Props> = (props) => {
    const {
        openIssue,
    } = props;

    const classes = useStyles();

    return (
        <Grid item container wrap={"nowrap"} className={classes.issues}>
            <IssuesColumnContainer openIssue={openIssue} status={Status.New} />
            <IssuesColumnContainer openIssue={openIssue} status={Status.InProgress} />
            <IssuesColumnContainer openIssue={openIssue} status={Status.InPerReview} />
            <IssuesColumnContainer openIssue={openIssue} status={Status.ReadyForQA} />
            <IssuesColumnContainer openIssue={openIssue} status={Status.QA} />
            <IssuesColumnContainer openIssue={openIssue} status={Status.Closed} />
        </Grid>
    );
};

export { Issues };
