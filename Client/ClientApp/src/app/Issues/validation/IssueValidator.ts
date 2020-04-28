import { IIssue } from "@app/Issues/models/Issue";
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

        return modelState;
    }

    private titleIsInvalid(title: any): boolean {
        return typeof title !== "string"
            || title.length === 0;
    }
}
