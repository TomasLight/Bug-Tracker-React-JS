import { IssuePanel } from "@app/Issues/IssuePanel/IssuePanel";
import { IssuesContainer } from "@app/Issues/Issues/Issues.container";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Fab, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { IssuePageHeaderContainer } from "./IssuePageHeader/IssuesPageHeader.container";

const useStyles = makeStyles((theme: IAppTheme) => ({
    page: {
        minHeight: "100%",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 24,
        zIndex: 1,
    },
}));

export interface IIssuesPageProps {
}

export interface IIssuesPageCallProps {
    loadIssues: () => void;
    openIssueToCreate: (openIssuePanel) => void;
    openIssueToEdit: (issueId: number, openIssuePanel: () => void) => void;
    closeIssue: (closeIssuePanel: () => void) => void;
}

type Props = IIssuesPageProps & IIssuesPageCallProps;

const IssuesPage: FunctionComponent<Props> = (props) => {
    const {
        loadIssues,
        openIssueToCreate,
        openIssueToEdit,
        closeIssue,
    } = props;

    const classes = useStyles();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const createIssue = () =>
        openIssueToCreate(() => setIsOpen(true));

    const openIssue = (issueId: number) =>
        openIssueToEdit(issueId, () => setIsOpen(true));

    const onCloseIssue = () => closeIssue(() => setIsOpen(false));

    useEffect(() => {
        loadIssues();
    }, []);

    return (
        <Grid container direction={"column"} className={classes.page}>
            <IssuePageHeaderContainer/>

            <IssuesContainer openIssue={openIssue}/>

            <Fab color="primary" aria-label="add" onClick={createIssue} className={classes.addButton}>
                <Add/>
            </Fab>
            <IssuePanel isOpen={isOpen} close={onCloseIssue}/>
        </Grid>
    );
};

export { IssuesPage };
