import { NewIssueDto } from "@api/models/issues/requests/NewIssueDto";
import { UpdateIssueDto } from "@api/models/issues/requests/UpdateIssueDto";
import { Issue } from "@app/Issues/models/Issue";
import { ApiBase } from "@utils/api/ApiBase";
import { ApiResponse } from "@utils/api/ApiResponse";
import { Mapper } from "@utils/mapping/Mapper";
import { IssueDto } from "./models/issues/responses/IssueDto";

export class IssuesApi extends ApiBase {
    public static async getIssues(): Promise<ApiResponse<Issue[]>> {
        const response = await this.get<IssueDto[]>("/api/issues");
        if (response.data) {
            response.data = response.data.map((dto: IssueDto) => Mapper.map<Issue>(
                nameof<IssueDto>(),
                nameof<Issue>(),
                dto
            ));
        }
        return response as ApiResponse<Issue[]>;
    }

    public static async getIssue(issueId: number): Promise<ApiResponse<Issue>> {
        const response = await this.get<IssueDto>(`/api/issues/${issueId}`);
        if (response.data) {
            response.data = Mapper.map<Issue>(
                nameof<IssueDto>(),
                nameof<Issue>(),
                response.data
            );
        }
        return response as ApiResponse<Issue>;
    }

    public static async createIssue(issue: Issue): Promise<ApiResponse<Issue>> {
        const dto = Mapper.map<Issue>(
            nameof<Issue>(),
            nameof<NewIssueDto>(),
            issue
        );

        const response = await this.post<IssueDto>("/api/issue/", dto);
        if (response.data) {
            response.data = Mapper.map<Issue>(
                nameof<IssueDto>(),
                nameof<Issue>(),
                response.data
            );
        }
        return response as ApiResponse<Issue>;
    }

    public static async updateIssue(issue: Issue): Promise<ApiResponse<Issue>> {
        const dto = Mapper.map<Issue>(
            nameof<Issue>(),
            nameof<UpdateIssueDto>(),
            issue
        );

        const response = await this.put<IssueDto>("/api/issue/", dto);
        if (response.data) {
            response.data = Mapper.map<Issue>(
                nameof<IssueDto>(),
                nameof<Issue>(),
                response.data
            );
        }
        return response as ApiResponse<Issue>;
    }

    public static deleteIssue(issueId: number): Promise<ApiResponse> {
        return this.delete(`/api/issues/${issueId}`);
    }
}
