import * as React from "react";
import {HistoryDTO} from "../../../../../models/histories/HistoryDTO";
import {StatusEnum} from "../../../../../models/enums/StatusEnum";
import {Status} from "./Status/Status";

export interface IHistoryProps {
    history: HistoryDTO;
}

type Props = IHistoryProps;


export const History: React.FunctionComponent<Props> = (props: Props) => {

    const {history} = props;
    const statusNames = Object.keys(StatusEnum);
    const status = statusNames[history.status - 1];
    const date = Date.parse(history.dateUpdate as any);
    const dateFormat = new Date(date).toDateString();
    return (
        <div>
            <div>
                {dateFormat}
            </div>
            <div>
                {history.updater.firstName} {history.updater.lastName}
            </div>
            <Status status={status} statusComment={history.statusComment}/>
        </div>
    );
};