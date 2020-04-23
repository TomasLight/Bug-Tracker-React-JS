export interface IIssueDto {
    id: number;
    type: number;
    reporterId: number;
    title: string;
    description: string;
    difficulty: number;
    priority: number;
    status: number;
    date: Date;
}
