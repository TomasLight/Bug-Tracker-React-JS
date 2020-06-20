import { Issue } from "@app/Issues/models/Issue";
import { IssueFilter } from "@app/Issues/models/IssueFilter";
import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";
import { IconSelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/IconSelectFieldOption";
import { UserSelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/UserSelectFieldOption";
import { Translate } from "@utils/translates/Translate";

export class IssuesStore {
    public issues: Issue[];
    public issuesAreLoading: boolean;

    public openedIssue: Issue;
    public openedIssueIsLoading: boolean;
    public openedIssueIsSaving: boolean;

    public filter: IssueFilter;

    public issueTypeOptions: IconSelectFieldOption[];
    public priorityOptions: IconSelectFieldOption[];
    public assignOptions: UserSelectFieldOption[];
    public reporterOptions: UserSelectFieldOption[];

    constructor() {
        this.issues = [];
        this.issuesAreLoading = false;

        this.openedIssue = new Issue();
        this.openedIssueIsLoading = false;
        this.openedIssueIsSaving = false;

        this.filter = new IssueFilter();

        this.issueTypeOptions = [
            new IconSelectFieldOption({
                id: IssueType.Task,
                title: Translate.getString("Task"),
            }),
            new IconSelectFieldOption({
                id: IssueType.Investigation,
                title: Translate.getString("Investigation"),
            }),
            new IconSelectFieldOption({
                id: IssueType.Bug,
                title: Translate.getString("Bug"),
            }),
        ];
        this.priorityOptions = [
            new IconSelectFieldOption({
                id: Priority.Critical,
                title: Translate.getString("Critical"),
            }),
            new IconSelectFieldOption({
                id: Priority.High,
                title: Translate.getString("High"),
            }),
            new IconSelectFieldOption({
                id: Priority.Medium,
                title: Translate.getString("Medium"),
            }),
            new IconSelectFieldOption({
                id: Priority.Low,
                title: Translate.getString("Low"),
            }),
            new IconSelectFieldOption({
                id: Priority.OnHold,
                title: Translate.getString("On Hold"),
            }),
        ];
        this.assignOptions = [];
        this.reporterOptions = [];
    }
}
