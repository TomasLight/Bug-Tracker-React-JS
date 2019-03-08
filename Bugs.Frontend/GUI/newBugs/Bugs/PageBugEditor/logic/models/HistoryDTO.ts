import {User} from "../../../../Users/logic/models/User";
import {BugDTO} from "../../../logic/models/BugDTO";
import {StatusEnum} from "../../../logic/models/StatusEnum";

export class HistoryDTO {
    bugId: number;
    userId: number;
    dateUpdate: Date;
    updater: User;
    variesBug: BugDTO;
    status: StatusEnum;
    statusComment: string;
}