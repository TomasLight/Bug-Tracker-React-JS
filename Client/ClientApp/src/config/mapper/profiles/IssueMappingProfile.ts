import { IIssueDto } from "@api/models/issues/responses/IssueDto";
import { Issue } from "@app/Issues/models/Issue";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class IssueMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<IIssueDto>(),
                nameof<Issue>(),
                IssueMappingProfile.mapIIssueDtoToIssue
            ),
        ];
    }

    private static mapIIssueDtoToIssue(dto: IIssueDto): Issue {
        const issue = MappingProfileBase.autoMap(dto, new Issue());
        return issue;
    }
}
