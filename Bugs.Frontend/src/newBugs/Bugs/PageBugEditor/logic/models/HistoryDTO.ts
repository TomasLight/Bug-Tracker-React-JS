import {UserDTO} from "../../../../Users/logic/models/UserDTO";
import {BugDTO} from "../../../logic/models/BugDTO";
import {StatusEnum} from "../../../logic/models/StatusEnum";

export class HistoryDTO {
    bugId: number;
    userId: number;
    dateUpdate: Date;
    updater: UserDTO;
    variesBug: BugDTO;
    status: StatusEnum;
    statusComment: string;
}