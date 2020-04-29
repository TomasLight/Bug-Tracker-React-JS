import { IIssue } from "@app/Issues/models/Issue";
import { IssueType } from "@app/Issues/models/IssueType";
import { Priority } from "@app/Issues/models/Priority";
import { Translate } from "@utils/translates/Translate";
import { IValidator, ModelState } from "model-state-validation";

export class IssueValidator implements IValidator<IIssue> {
    public validateForm(model: IIssue) {
        const modelState = this.validate(model);
        return modelState.getErrors();
    }

    public validate(model: IIssue): ModelState {
        const modelState = new ModelState();

        if (this.titleIsInvalid(model.title)) {
            modelState.addError(
                nameof<IIssue>((o) => o.title),
                Translate.getString("Required field")
            );
        }

        if (this.assignedUserIdIsInvalid(model.assignedUserId)) {
            modelState.addError(
                nameof<IIssue>((o) => o.assignedUserId),
                Translate.getString("Required field")
            );
        }

        if (this.reporterIdIsInvalid(model.id, model.reporterId)) {
            modelState.addError(
                nameof<IIssue>((o) => o.reporterId),
                Translate.getString("Required field")
            );
        }

        if (this.issueTypeIsInvalid(model.type)) {
            modelState.addError(
                nameof<IIssue>((o) => o.type),
                Translate.getString("Required field")
            );
        }

        if (this.priorityIsInvalid(model.priority)) {
            modelState.addError(
                nameof<IIssue>((o) => o.priority),
                Translate.getString("Required field")
            );
        }

        return modelState;
    }

    private titleIsInvalid(title: any): boolean {
        return typeof title !== "string"
            || title.length === 0;
    }

    private assignedUserIdIsInvalid(assignedUserId: any): boolean {
        return typeof assignedUserId !== "number"
            || assignedUserId === 0;
    }

    private reporterIdIsInvalid(issueId: any, reporterId: any): boolean {
        const isNewIssue = typeof issueId !== "number" || issueId === 0;
        if (isNewIssue) {
            return false;
        }
        return typeof reporterId !== "number"
            || reporterId === 0;
    }

    private issueTypeIsInvalid(issueType: any): boolean {
        return typeof issueType !== "number"
            || issueType === IssueType.NA;
    }

    private priorityIsInvalid(priority: any): boolean {
        return typeof priority !== "number"
            || priority === Priority.NA;
    }
}
