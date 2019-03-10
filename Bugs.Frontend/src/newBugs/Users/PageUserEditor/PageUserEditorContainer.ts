import {AnyAction, Dispatch} from "redux";
import{connect} from "react-redux";
import {push} from "connected-react-router";
import {match, withRouter} from "react-router";

import {IReducers} from "@reducer";
import {urls} from "@core/App/PageComponentRouter";
import {IPageUserEditorCallProps, IPageUserEditorProps, PageUserEditor} from "./PageUserEditor";


const mapStateToProps = (state: IReducers, ownProps: IPageUserEditorProps): IPageUserEditorProps => {
    return {
        user: state.UserEditorStore.user
    };
};

type OwnCallProps = IPageUserEditorCallProps & {
    match: match<any>
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: OwnCallProps): IPageUserEditorCallProps => {
    return {
        load: () => {ownProps.match.params.id},
        openUsers: () => dispatch(push(urls.userListPath))
    };
};

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageUserEditor);

const PageUserEditorContainer = withRouter(connector);
export default PageUserEditorContainer;