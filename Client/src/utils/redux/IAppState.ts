import { NotifierStore } from "@app/Notifier/redux/Notifier.store";
import { RouterState } from "connected-react-router";

export interface IAppState {
    router: RouterState;
    notifierStore: NotifierStore;
}
