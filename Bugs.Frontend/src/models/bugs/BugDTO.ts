import {UrgencyEnum} from "../enums/UrgencyEnum";
import {CriticallyEnum} from "../enums/CriticallyEnum";
import {StatusEnum} from "../enums/StatusEnum";
import {UserDTO} from "../users/UserDTO";

export class BugDTO {
    id: number;
    name: string;
    priority: UrgencyEnum;
    reproSteps: string;
    severity: CriticallyEnum;
    status: StatusEnum;
    statusComment: string;
    creator = new UserDTO(null);
    dateCreate: string;
    histories = [];
    
    constructor(bug: BugDTO = null) {
        if (bug == null) {
            this.id = 0;
            this.name = "";
            this.priority = UrgencyEnum.Fourth;
            this.reproSteps = "";
            this.severity = CriticallyEnum.Low;
            this.status = StatusEnum.New;
            this.statusComment = "";
            this.creator = new UserDTO(null);
            this.dateCreate = "";
            this.histories = [];
        }
        else {
            this.id = bug.id;
            this.name = bug.name;
            this.priority = bug.priority;
            this.reproSteps = bug.reproSteps;
            this.severity = bug.severity;
            this.status = bug.status;
            this.statusComment = bug.statusComment;
            this.creator = bug.creator;
            this.dateCreate = bug.dateCreate;
            this.histories = bug.histories;
        }
    }
}