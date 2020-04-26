import { FilterIconButton } from "@app/Issues/Filters/FilterIconButton/FilterIconButton";
import { FilterItem } from "@app/Issues/models/FilterItem";
import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent, useState } from "react";

import { Grid, makeStyles } from "@material-ui/core";

// import { Status } from "@app/Issues/models/Status";

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

export interface IFiltersProps {
    // filter: any;
    // filterItems: FilterItem[];
}

export interface IFiltersCallProps {
    // onChange: (filterItem: FilterItem) => void;
}

type Props = IFiltersProps & IFiltersCallProps;

const Filters: FunctionComponent<Props> = (props) => {
    const {} = props;

    const classes = useStyles();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Grid container className={classes.column} justify={"flex-end"}>
            <Grid item container>
                
            </Grid>

            <FilterIconButton
                isActive={isOpen}
                onClick={toggle}
            />
        </Grid>
    );
};

export { Filters };
