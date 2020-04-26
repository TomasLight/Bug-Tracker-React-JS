export interface IssueDto {
    id: number;
    type: number;
    reporterId: number;
    assignedUserId: number;
    title: string;
    description: string;
    priority: number;
    status: number;
    date: Date;
}
