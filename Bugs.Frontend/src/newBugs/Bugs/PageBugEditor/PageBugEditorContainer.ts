import {AnyAction, Dispatch} from "redux";
import {connect} from "react-redux";
import {match, withRouter} from "react-router";
import {push} from "connected-react-router";

import {Reducers} from "@reducers";
import {urls} from "@core/App/PageComponentRouter";
import {BugEditorActions} from "@core/Bugs/PageBugEditor/redux/BugEditorActions";
import {BugDTO} from "@models/bugs/BugDTO";
import {PageBugEditor, IBugEditorProps, IBugEditorCallProps} from "./PageBugEditor";

const mapStateToProps = (state: Reducers, ownProps: IBugEditorProps): IBugEditorProps => {
    return {
        apiUrl: ownProps.apiUrl,
        bug: state.bugEditorStore.bug
    };
};

type OwnCallProps = IBugEditorCallProps & {
    match: match<any>
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: OwnCallProps): IBugEditorCallProps => {
        return {
            load: () => dispatch(BugEditorActions.get(ownProps.match.params.id)),
            renderBugList: () => dispatch(push(urls.bugListPath)),
            save: (bug: BugDTO) => dispatch(BugEditorActions.update(bug))
        };
    };

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageBugEditor);

const PageBugEditorContainer = withRouter(connector);
export default PageBugEditorContainer;