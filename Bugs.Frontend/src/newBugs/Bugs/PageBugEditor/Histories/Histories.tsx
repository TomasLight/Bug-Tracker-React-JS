import * as React from "react";

import {HistoryDTO} from "../../../../models/histories/HistoryDTO";
import {History} from "./History/History";

export interface IHistoriesProps {
    histories: Array<HistoryDTO>;
}

type Props = IHistoriesProps;

export const Histories: React.FunctionComponent<IHistoriesProps> = (props: Props) => {

    const {histories} = props;
    return (
        <div>
            {
                histories.map((bugHistory: HistoryDTO) => {
                    return (
                        <History history={bugHistory} key={"history-" + bugHistory.bugId + "-" + bugHistory.userId}/>
                    );
                })
            }
        </div>
    );
};