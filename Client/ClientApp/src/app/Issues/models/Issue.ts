import { IssueType } from "@app/Issues/models/IssueType";
import { Severity } from "@app/Issues/models/Severity";
import { Status } from "@app/Issues/models/Status";
import { Urgency } from "@app/Issues/models/Urgency";

export class Issue {
    public id: number;
    public type: IssueType;
    public reporterId: number;
    public title: string;
    public description: string;
    public urgency: Urgency;
    public severity: Severity;
    public status: Status;
    public date: Date;

    constructor() {
        this.id = null;
        this.type = IssueType.NA;
        this.reporterId = null;
        this.title = "";
        this.description = "";
        this.urgency = Urgency.NA;
        this.severity = Severity.NA;
        this.status = Status.NA;
        this.date = new Date();
    }
}
