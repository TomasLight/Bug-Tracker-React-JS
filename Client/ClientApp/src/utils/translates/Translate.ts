import { Status } from "@app/Issues/models/Status";
import { Dictionary } from "@tomas_light/dictionary";

export class Translate {
    public static getString(key: string, options?: any) {
        // todo: add localization library usage of
        // for example: i18next
        if (Translate.tempDictionary.containsKey(key)) {
            return Translate.tempDictionary.get(key)(options);
        }

        return key;
    }

    private static tempDictionary = Dictionary.fromArray<string, (options: any) => string>([
        [ "issue-status", Translate.getIssueStatusText ],
    ]);

    private static getIssueStatusText(options: { status: Status }): string {
        switch (options.status) {
            case Status.New:
            case Status.Reopened:
                return "Open";

            case Status.InProgress:
                return "In Progress";

            case Status.InPerReview:
                return "In Per Review";

            case Status.ReadyForQA:
                return "Ready For QA";

            case Status.QA:
                return "QA";

            case Status.Closed:
                return "Done";

            default:
                throw Error(`Translate.getString - Invalid key for Issue status: ${options.status}`);
        }
    }
}
