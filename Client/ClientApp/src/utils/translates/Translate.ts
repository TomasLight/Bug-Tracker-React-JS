import { Status } from "@app/Issues/models/Status";

export class Translate {
    public static getString(key: string, options?: any) {
        // todo: add localization library usage of
        // for example: i18next
        if (Translate.tempDictionary.has(key)) {
            return Translate.tempDictionary.get(key)(options);
        }

        return key;
    }

    private static tempDictionary = new Map<string, (options: any) => string>([
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
                throw new Error(`Translate.getString - Invalid key for Issue status: ${options.status}`);
        }
    }
}
