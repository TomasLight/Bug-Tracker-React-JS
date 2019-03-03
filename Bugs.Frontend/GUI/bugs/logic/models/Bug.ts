import {Urgency} from "./Urgency";
import {Criticality} from "./Criticality";
import {Status} from "./Status";
import {User} from "../../../users/logic/models/User";

export class Bug {
    id: number;
    name: string;
    priority: Urgency;
    reproSteps: string;
    severity: Criticality;
    status: Status;
    statusComment: string;
    creator = new User(null);
    dateCreate: string;
    histories = [];
    
    constructor(bug: Bug) {
        if (bug == null) {
            this.id = 0;
            this.name = "";
            this.priority = Urgency.Fourth;
            this.reproSteps = "";
            this.severity = Criticality.Low;
            this.status = Status.New;
            this.statusComment = "";
            this.creator = new User(null);
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