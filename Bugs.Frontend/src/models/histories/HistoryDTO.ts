import {UserDTO} from "../users/UserDTO";
import {BugDTO} from "../bugs/BugDTO";
import {StatusEnum} from "../enums/StatusEnum";

export class HistoryDTO {
    bugId: number;
    userId: number;
    dateUpdate: Date;
    updater: UserDTO;
    variesBug: BugDTO;
    status: StatusEnum;
    statusComment: string;
}