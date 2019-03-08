import {connect} from "react-redux";
import {withRouter} from "react-router";

import {IReducers} from "../../App/logic/createReducers";
import {BugDTO} from "../logic/models/BugDTO";
import {PageBugEditor, IBugEditorProps, IBugEditorCallProps} from "./PageBugEditor";

const mapStateToProps = (state: IReducers, ownProps): IBugEditorProps => {
    return {
        apiUrl: ownProps.apiUrl,
        bug: state.BugEditorStore.bug,
        routerBugId: ownProps.match.params.id
    };
};

const mapDispatchToProps = (dispatch, ownProps): IBugEditorCallProps => {
        return {
            load: (bugId: number) => {},
            renderBugList: () => {},
            save: (bug: BugDTO) => {}
        };
    };

export const PageBugEditorContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PageBugEditor));