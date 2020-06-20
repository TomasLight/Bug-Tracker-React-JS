import { expect, test } from "@jest/globals";

import { Status } from "@app/Issues/models/Status";
import { Translate } from "@utils/translates/Translate";

test("Translate simple", () => {
    const translatedString = Translate.getString("Test string");
    expect(translatedString).toBe("Test string");
});

test("Translate issue statuses", () => {
    const newIssue = Translate.getString("issue-status", { status: Status.New });
    expect(newIssue).toBe("Open");

    const reopened = Translate.getString("issue-status", { status: Status.Reopened });
    expect(reopened).toBe("Open");

    const inProgress = Translate.getString("issue-status", { status: Status.InProgress });
    expect(inProgress).toBe("In Progress");

    const inPerReview = Translate.getString("issue-status", { status: Status.InPerReview });
    expect(inPerReview).toBe("In Per Review");

    const readyForQA = Translate.getString("issue-status", { status: Status.ReadyForQA });
    expect(readyForQA).toBe("Ready For QA");

    const QA = Translate.getString("issue-status", { status: Status.QA });
    expect(QA).toBe("QA");

    const closed = Translate.getString("issue-status", { status: Status.Closed });
    expect(closed).toBe("Done");

    const exception = () => Translate.getString("issue-status", { status: Status.NA });
    expect(exception).toThrow();
});
