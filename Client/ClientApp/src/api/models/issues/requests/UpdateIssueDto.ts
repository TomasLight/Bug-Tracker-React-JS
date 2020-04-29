import { NewIssueDto } from "./NewIssueDto";

export interface UpdateIssueDto extends NewIssueDto {
    id: number;
}
