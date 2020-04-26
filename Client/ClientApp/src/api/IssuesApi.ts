import { IssueDto } from "@api/models/issues/responses/IssueDto";
import { ApiBase } from "@utils/api/ApiBase";

export class IssuesApi extends ApiBase {
    public static getIssues() {
        return this.get<IssueDto[]>("/api/issues");
    }
}
