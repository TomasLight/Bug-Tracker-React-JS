import { Issue } from "@app/Issues/models/Issue";
import { Grid } from "@material-ui/core";
import { Translate } from "@utils/translates/Translate";
import React, { FunctionComponent, useEffect } from "react";

export interface IIssuesPageProps {
    issues: Issue[];
    issuesAreLoading: boolean;
}

export interface IIssuesPageCallProps {
    loadIssues: () => void;
}

type Props = IIssuesPageProps & IIssuesPageCallProps;

const IssuesPage: FunctionComponent<Props> = (props) => {
    const {issues, issuesAreLoading, loadIssues} = props;

    useEffect(() => {
        loadIssues();
    }, []);

    return (
        <Grid container direction={"column"}>
            <Grid item>
                {Translate.getString("Issues page")}
            </Grid>
            <Grid item container direction={"column"}>
                {issues.map((issue: Issue) => (
                    <Grid item container key={`issue-${issue.id}`}>
                        <Grid item>
                            {issue.id}
                        </Grid>
                        <Grid item>
                            {issue.title}
                        </Grid>
                        <Grid item>
                            {issue.description}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export { IssuesPage };
