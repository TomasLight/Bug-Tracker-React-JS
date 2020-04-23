import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";
import { Status } from "@app/Issues/models/Status";
import { Difficulty } from "@app/Issues/models/Difficulty";

export class Issue {
    public id: number;
    public type: IssueType;
    public reporterId: number;
    public title: string;
    public description: string;
    public urgency: Difficulty;
    public severity: Priority;
    public status: Status;
    public date: Date;

    constructor() {
        this.id = null;
        this.type = IssueType.NA;
        this.reporterId = null;
        this.title = "";
        this.description = "";
        this.urgency = Difficulty.NA;
        this.severity = Priority.NA;
        this.status = Status.NA;
        this.date = new Date();
    }
}
