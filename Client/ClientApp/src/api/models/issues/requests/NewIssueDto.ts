export interface NewIssueDto {
    type: number;
    title: string;
    description: string;
    priority: number;
    status: number;
    assignedUserId: number;
}
