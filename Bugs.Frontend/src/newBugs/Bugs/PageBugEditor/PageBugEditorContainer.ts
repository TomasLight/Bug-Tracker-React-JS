import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";
import {match, withRouter} from "react-router";

import {IReducers} from "../../App/logic/createReducers";
import {BugDTO} from "../logic/models/BugDTO";
import {PageBugEditor, IBugEditorProps, IBugEditorCallProps} from "./PageBugEditor";

const mapStateToProps = (state: IReducers, ownProps: IBugEditorProps): IBugEditorProps => {
    return {
        apiUrl: ownProps.apiUrl,
        bug: state.BugEditorStore.bug
    };
};

type OwnCallProps = IBugEditorCallProps & {
    match: match<any>
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: OwnCallProps): IBugEditorCallProps => {
        return {
            load: () => {ownProps.match.params.id},
            renderBugList: () => {},
            save: (bug: BugDTO) => {}
        };
    };

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageBugEditor);

export const PageBugEditorContainer = withRouter(connector);