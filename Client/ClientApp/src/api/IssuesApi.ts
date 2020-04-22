import { call } from "@redux-saga/core/effects";

import { ApiBase } from "@utils/api/ApiBase";

export class IssuesApi extends ApiBase {
    public static getIssues() {
        return call(this.get, "/api/issues");
    }
}
