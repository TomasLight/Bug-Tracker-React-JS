import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";
import { Status } from "@app/Issues/models/Status";

export interface IIssue {
    id: number;
    type: IssueType;
    reporterId: number;
    assignedUserId: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    date: Date;
}

export class Issue implements IIssue {
    public id: number;
    public type: IssueType;
    public reporterId: number;
    public assignedUserId: number;
    public title: string;
    public description: string;
    public priority: Priority;
    public status: Status;
    public date: Date;

    constructor(issue?: IIssue) {
        if (!issue) {
            this.id = null;
            this.type = IssueType.Task;
            this.reporterId = null;
            this.assignedUserId = null;
            this.title = "";
            this.description = "";
            this.priority = Priority.Medium;
            this.status = Status.New;
            this.date = new Date();
        }
        else {
            this.copy(issue);
        }
    }

    public copy(issue: IIssue): void {
        this.id = issue.id;
        this.type = issue.type;
        this.reporterId = issue.reporterId;
        this.assignedUserId = issue.assignedUserId;
        this.title = issue.title;
        this.description = issue.description;
        this.priority = issue.priority;
        this.status = issue.status;
        this.date = issue.date;
    }

    public compare(right: Issue): number {
        return Issue.compare(this, right);
    }

    public static compare(left: Issue, right: Issue): number {
        if (left.id > right.id) {
            return 1;
        }

        if (left.id < right.id) {
            return -1;
        }

        return 0;
    }

    public isNew(): boolean {
        return typeof this.id !== "number";
    }
}
