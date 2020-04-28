import { IAppTheme } from "mui-app-theme";
import { Typography } from "mui-typography";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Fab, Grid, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { Translate } from "@utils/translates/Translate";
import { IssuesFormContainer } from "@app/Issues/IssueForm/IssueForm.container";
import { IssuesPanelContainer } from "@app/Issues/IssuePanel/IssuesPanel.container";
import { PanelHeaderHeight } from "@shared/organisms/Panel/Panel";
import { Issues } from "./Issues/Issues";
import { FiltersContainer } from "@app/Issues/Filters/Filters.container";

const useStyles = makeStyles((theme: IAppTheme) => ({
    page: {
        minHeight: "100%",
    },
    header: {
        height: 96,
        padding: "24px 24px 16px",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 24,
        zIndex: 1,
    },
    form: {
        height: `calc(100% - ${PanelHeaderHeight}px)`,
    },
}));

export interface IIssuesPageCallProps {
    loadIssues: () => void;
    openIssueToCreate: (openIssuePanel) => void;
    openIssueToEdit: (issueId: number, openIssuePanel: () => void) => void;
    closeIssue: (closeIssuePanel: () => void) => void;
}

type Props = IIssuesPageCallProps;

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
            <Grid
                item
                container
                justify={"space-between"}
                alignItems={"center"}
                className={classes.header}
            >
                <Typography size={700} color={"strong"} component={"p"}>
                    {Translate.getString("Issues")}
                </Typography>

                <FiltersContainer/>
            </Grid>

            <Issues openIssue={openIssue}/>

            <Fab
                color="primary"
                aria-label="add"
                onClick={createIssue}
                className={classes.addButton}
            >
                <Add/>
            </Fab>

            <IssuesPanelContainer isOpen={isOpen} close={onCloseIssue}>
                <IssuesFormContainer closePanel={close} className={classes.form}/>
            </IssuesPanelContainer>
        </Grid>
    );
};

export { IssuesPage };
