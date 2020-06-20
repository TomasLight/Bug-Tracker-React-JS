import { IssuesActions } from "@app/Issues/redux/Issues.actions";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@State";
import { Dispatch } from "redux";

import { FilterItem } from "@app/Issues/models/FilterItem";
import { IFiltersProps, IFiltersCallProps, Filters } from "./Filters";

const mapStateToProps = (state: State): IFiltersProps => {
    return {
        filterItems: state.issuesStore.filter.filterItems,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IFiltersCallProps => {
    return {
        onChange: (filterItem: FilterItem) => dispatch(IssuesActions.changeIssueFilter({
            filterItem,
        })),
    };
};

const FiltersContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);

export { FiltersContainer };
