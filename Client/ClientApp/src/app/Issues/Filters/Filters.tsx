import { IAppTheme } from "mui-app-theme";
import React, { FunctionComponent, useState } from "react";

import { ClickAwayListener, Grid, makeStyles } from "@material-ui/core";

import { FilterItem } from "@app/Issues/models/FilterItem";
import { FilterIconButton } from "./FilterIconButton/FilterIconButton";
import { FilterItemButton } from "./FilterItemButton/FilterItemButton";

const useStyles = makeStyles((theme: IAppTheme) => ({
    autoWidth: {
        width: "auto",
    },
}));

export interface IFiltersProps {
    filterItems: FilterItem[];
}

export interface IFiltersCallProps {
    onChange: (filterItem: FilterItem) => void;
}

type Props = IFiltersProps & IFiltersCallProps;

const Filters: FunctionComponent<Props> = (props) => {
    const {
        filterItems,
        onChange,
    } = props;

    const classes = useStyles();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    return (
        <ClickAwayListener onClickAway={close}>
            <Grid container className={classes.autoWidth} justify={"flex-end"}>
                {filterItems.map((item: FilterItem) => (
                    <FilterItemButton
                        key={item.toString()}
                        isOpen={isOpen}
                        item={item}
                        onClick={onChange}
                    />
                ))}

                <FilterIconButton
                    isActive={isOpen}
                    onClick={toggle}
                />
            </Grid>
        </ClickAwayListener>
    );
};

export { Filters };
