import { NewIssueDto } from "@api/models/issues/requests/NewIssueDto";
import { UpdateIssueDto } from "@api/models/issues/requests/UpdateIssueDto";
import { IssueDto } from "@api/models/issues/responses/IssueDto";
import { Issue } from "@app/Issues/models/Issue";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class IssueMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IssueDto>(),
                nameof<Issue>(),
                IssueMappingProfile.mapIssueDtoToIssue
            ),
            new MapFunction(
                nameof<Issue>(),
                nameof<NewIssueDto>(),
                IssueMappingProfile.mapIssueToNewIssueDto
            ),
            new MapFunction(
                nameof<Issue>(),
                nameof<UpdateIssueDto>(),
                IssueMappingProfile.mapIssueToUpdateIssueDto
            ),
        ];
    }

    private static mapIssueDtoToIssue(dto: IssueDto): Issue {
        const issue = MappingProfileBase.autoMap(dto, new Issue());
        return issue;
    }

    private static mapIssueToNewIssueDto(issue: Issue): NewIssueDto {
        const dto = MappingProfileBase.autoMap<Issue, NewIssueDto>(issue, {} as any);
        return dto;
    }

    private static mapIssueToUpdateIssueDto(issue: Issue): UpdateIssueDto {
        const dto = MappingProfileBase.autoMap<Issue, UpdateIssueDto>(issue, {} as any);
        return dto;
    }
}
