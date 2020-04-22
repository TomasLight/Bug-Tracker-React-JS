export interface IIssueDto {
    id: number;
    type: number;
    reporterId: number;
    title: string;
    description: string;
    urgency: number;
    severity: number;
    status: number;
    date: Date;
}