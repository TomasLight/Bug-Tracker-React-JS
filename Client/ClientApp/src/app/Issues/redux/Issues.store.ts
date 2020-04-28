import { Issue } from "@app/Issues/models/Issue";
import { IssueFilter } from "@app/Issues/models/IssueFilter";
import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";
import { SelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/SelectFieldOption";
import { UserSelectFieldOption } from "@shared/organisms/Fields/Select/FieldOptions/UserSelectFieldOption";
import { IFieldOption } from "@shared/organisms/Fields/Select/Options/IFieldOption";
import { Translate } from "@utils/translates/Translate";

export class IssuesStore {
    public issues: Issue[];
    public issuesAreLoading: boolean;

    public openedIssue: Issue;
    public openedIssueIsLoading: boolean;
    public openedIssueIsSaving: boolean;

    public filter: IssueFilter;

    public issueTypeOptions: IFieldOption[];
    public priorityOptions: IFieldOption[];
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
            new SelectFieldOption({
                id: IssueType.Task,
                title: Translate.getString("Task"),
            }),
            new SelectFieldOption({
                id: IssueType.Investigation,
                title: Translate.getString("Investigation"),
            }),
            new SelectFieldOption({
                id: IssueType.Bug,
                title: Translate.getString("Bug"),
            }),
        ];
        this.priorityOptions = [
            new SelectFieldOption({
                id: Priority.Critical,
                title: Translate.getString("Critical"),
            }),
            new SelectFieldOption({
                id: Priority.High,
                title: Translate.getString("High"),
            }),
            new SelectFieldOption({
                id: Priority.Medium,
                title: Translate.getString("Medium"),
            }),
            new SelectFieldOption({
                id: Priority.Low,
                title: Translate.getString("Low"),
            }),
            new SelectFieldOption({
                id: Priority.OnHold,
                title: Translate.getString("On Hold"),
            }),
        ];
        this.assignOptions = [];
        this.reporterOptions = [];
    }
}
